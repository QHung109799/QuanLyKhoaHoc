# ============================================================
# Dockerfile - Multi-stage build
# ============================================================
# Sử dụng BuildKit để tối ưu build
# docker build -t quanlykhoahoc .
# ============================================================

# ---- Stage 1: Install backend dependencies ----
FROM node:20-alpine AS backend-deps
WORKDIR /app/backend
COPY backend/package.json backend/package-lock.json ./
RUN npm ci --only=production

# ---- Stage 2: Install frontend dependencies & build ----
FROM node:20-alpine AS frontend-build
WORKDIR /app/frontend
COPY frontend/package.json frontend/package-lock.json ./
RUN npm ci
COPY frontend/ .
RUN npm run build

# ---- Stage 3: Production image ----
FROM node:20-alpine
WORKDIR /app

# Cài đặt curl để health check
RUN apk add --no-cache curl

# Copy backend
COPY --from=backend-deps /app/backend/node_modules ./backend/node_modules
COPY backend/ ./backend/

# Copy frontend built files
COPY --from=frontend-build /app/frontend/dist ./frontend/dist

# Tạo thư mục uploads
RUN mkdir -p backend/uploads

# Expose port
EXPOSE 5000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:5000/api/health || exit 1

# Start server
WORKDIR /app/backend
CMD ["node", "src/server.js"]