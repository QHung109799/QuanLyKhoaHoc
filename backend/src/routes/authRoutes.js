const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { authenticate } = require('../middleware/authMiddleware');

// POST /api/auth/register - Đăng ký
router.post('/register', authController.register);

// POST /api/auth/login - Đăng nhập
router.post('/login', authController.login);

// POST /api/auth/forgot-password - Quên mật khẩu (gửi OTP)
router.post('/forgot-password', authController.forgotPassword);

// POST /api/auth/verify-otp - Xác thực mã OTP
router.post('/verify-otp', authController.verifyOtp);

// POST /api/auth/reset-password - Reset mật khẩu (dùng resetToken từ verify-otp)
router.post('/reset-password', authController.resetPassword);

// POST /api/auth/refresh-token - Refresh JWT
router.post('/refresh-token', authController.refreshToken);

// GET /api/auth/me - Lấy thông tin user hiện tại
router.get('/me', authenticate, authController.getMe);

module.exports = router;