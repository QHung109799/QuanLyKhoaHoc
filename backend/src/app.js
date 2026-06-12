/**
 * Express App Configuration
 * 
 * Cấu hình chính cho ứng dụng Express.
 * Setup middleware, routes, error handling.
 */

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const path = require('path');
require('dotenv').config();

const app = express();

// ==================== Middleware ====================

// Bảo mật HTTP headers
app.use(helmet({
  crossOriginResourcePolicy: { policy: 'cross-origin' }
}));

// CORS - cho phép frontend truy cập
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Logging requests (dev mode)
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Parse JSON bodies
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Rate limiting - chống tấn công brute-force
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 phút
  max: 100, // tối đa 100 request / 15 phút
  message: {
    success: false,
    message: 'Quá nhiều yêu cầu, vui lòng thử lại sau 15 phút'
  }
});
app.use('/api/auth', limiter);

// Static files - uploads
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

// ==================== Routes ====================

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/courses', require('./routes/courseRoutes'));
app.use('/api/courses/:courseId/lessons', require('./routes/lessonRoutes'));
app.use('/api/courses/:courseId/assignments', require('./routes/assignmentRoutes'));
app.use('/api/assignments', require('./routes/assignmentRoutes'));
app.use('/api/lessons', require('./routes/lessonRoutes'));
app.use('/api/grades', require('./routes/gradeRoutes'));
app.use('/api/payments', require('./routes/paymentRoutes'));
app.use('/api/notifications', require('./routes/notificationRoutes'));
app.use('/api/courses/:courseId/discussions', require('./routes/discussionRoutes'));
app.use('/api/discussions', require('./routes/discussionRoutes'));
app.use('/api/i18n', require('./routes/i18nRoutes'));

// ==================== Health Check ====================
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Server is running',
    time: new Date().toISOString(),
    environment: process.env.NODE_ENV
  });
});

// ==================== Error Handling ====================

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint không tồn tại'
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('[Error]', err.stack || err.message);
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    message: err.message || 'Lỗi máy chủ nội bộ',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

module.exports = app;