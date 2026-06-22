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
// Nguyên tắc: Không mount duplicate routes,
// mỗi route module tự xử lý nested paths bên trong.

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/courses', require('./routes/courseRoutes'));
app.use('/api/lessons', require('./routes/lessonRoutes'));
app.use('/api/assignments', require('./routes/assignmentRoutes'));
app.use('/api/grades', require('./routes/gradeRoutes'));
app.use('/api/payments', require('./routes/paymentRoutes'));
app.use('/api/notifications', require('./routes/notificationRoutes'));
app.use('/api/discussions', require('./routes/discussionRoutes'));
app.use('/api/i18n', require('./routes/i18nRoutes'));

// ==================== API Root - Danh sách endpoints ====================
app.get('/api', (req, res) => {
  res.json({
    success: true,
    message: 'Quản Lý Khóa Học API',
    version: '1.0.0',
    endpoints: {
      auth: {
        'POST /api/auth/register': 'Đăng ký tài khoản',
        'POST /api/auth/login': 'Đăng nhập',
        'POST /api/auth/forgot-password': 'Quên mật khẩu (gửi OTP)',
        'POST /api/auth/verify-otp': 'Xác thực OTP',
        'POST /api/auth/reset-password': 'Đặt lại mật khẩu',
        'POST /api/auth/refresh-token': 'Refresh JWT token',
        'GET /api/auth/me': 'Thông tin user hiện tại (auth)'
      },
      users: {
        'GET /api/users': 'Danh sách users (admin)',
        'GET /api/users/:id': 'Chi tiết user (auth)',
        'PUT /api/users/profile': 'Cập nhật profile (auth)',
        'PUT /api/users/change-password': 'Đổi mật khẩu (auth)',
        'PUT /api/users/language': 'Đổi ngôn ngữ (auth)',
        'DELETE /api/users/:id': 'Xóa user (admin)'
      },
      courses: {
        'GET /api/courses': 'Danh sách khóa học',
        'GET /api/courses/:id': 'Chi tiết khóa học',
        'POST /api/courses': 'Tạo khóa học (teacher/admin)',
        'PUT /api/courses/:id': 'Cập nhật khóa học (teacher/admin)',
        'DELETE /api/courses/:id': 'Xóa khóa học (teacher/admin)',
        'POST /api/courses/:id/enroll': 'Đăng ký khóa học (auth)'
      },
      lessons: {
        'GET /api/lessons': 'Danh sách bài học',
        'GET /api/lessons/:id': 'Chi tiết bài học',
        'POST /api/courses/:courseId/lessons': 'Tạo bài học (teacher/admin)',
        'PUT /api/lessons/:id': 'Cập nhật bài học (teacher/admin)',
        'DELETE /api/lessons/:id': 'Xóa bài học (teacher/admin)'
      },
      assignments: {
        'GET /api/assignments': 'Danh sách bài tập',
        'POST /api/courses/:courseId/assignments': 'Tạo bài tập (teacher/admin)',
        'PUT /api/assignments/:id': 'Cập nhật bài tập (teacher/admin)',
        'DELETE /api/assignments/:id': 'Xóa bài tập (teacher/admin)'
      },
      grades: {
        'GET /api/grades': 'Danh sách điểm',
        'POST /api/grades': 'Tạo điểm (teacher/admin)',
        'PUT /api/grades/:id': 'Cập nhật điểm (teacher/admin)'
      },
      payments: {
        'POST /api/payments/create': 'Tạo thanh toán (auth)',
        'GET /api/payments': 'Danh sách thanh toán (auth)'
      },
      notifications: {
        'GET /api/notifications': 'Danh sách thông báo (auth)',
        'PUT /api/notifications/:id/read': 'Đánh dấu đã đọc (auth)',
        'PUT /api/notifications/read-all': 'Đánh dấu tất cả đã đọc (auth)'
      },
      discussions: {
        'GET /api/discussions': 'Danh sách thảo luận',
        'POST /api/courses/:courseId/discussions': 'Tạo thảo luận (auth)',
        'POST /api/discussions/:id/reply': 'Trả lời thảo luận (auth)'
      },
      i18n: {
        'GET /api/i18n/:lang': 'Lấy bản dịch'
      },
      health: {
        'GET /api/health': 'Kiểm tra trạng thái server'
      }
    }
  });
});

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
  // Log error
  console.error(`[${new Date().toISOString()}] ${err.statusCode || 500} - ${err.message}`);
  if (process.env.NODE_ENV === 'development') {
    console.error(err.stack);
  }

  // Mongoose/Sequelize validation error
  if (err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstraintError') {
    return res.status(400).json({
      success: false,
      message: 'Dữ liệu không hợp lệ',
      errors: err.errors?.map(e => ({ field: e.path, message: e.message }))
    });
  }

  // JSON parse error
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({
      success: false,
      message: 'Dữ liệu JSON không hợp lệ'
    });
  }

  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    message: err.isOperational ? err.message : 'Lỗi máy chủ nội bộ',
    code: err.code || null,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

module.exports = app;