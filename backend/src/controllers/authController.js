/**
 * Auth Controller
 * 
 * Xử lý các request liên quan đến xác thực người dùng.
 * Bao gồm: register, login, forgot-password, verify-otp, reset-password.
 */

const authService = require('../services/authService');

/**
 * POST /api/auth/register
 * Đăng ký tài khoản mới
 */
const register = async (req, res) => {
  try {
    const result = await authService.register(req.body);
    res.status(201).json({
      success: true,
      message: 'Đăng ký thành công',
      data: result
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

/**
 * POST /api/auth/login
 * Đăng nhập
 */
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Vui lòng nhập email và mật khẩu'
      });
    }
    const result = await authService.login(email, password);
    res.json({
      success: true,
      message: 'Đăng nhập thành công',
      data: result
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error.message
    });
  }
};

/**
 * POST /api/auth/forgot-password
 * Quên mật khẩu - gửi mã OTP qua email
 */
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Vui lòng nhập email'
      });
    }
    const result = await authService.forgotPassword(email);
    res.json({
      success: true,
      message: result.message
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

/**
 * POST /api/auth/verify-otp
 * Xác thực mã OTP
 * Kiểm tra OTP có đúng và còn hiệu lực không.
 * Nếu đúng, trả về resetToken để đặt mật khẩu mới.
 */
const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: 'Vui lòng nhập email và mã OTP'
      });
    }
    const result = await authService.verifyOtp(email, otp);
    res.json({
      success: true,
      message: 'Xác thực OTP thành công',
      data: { resetToken: result.resetToken }
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

/**
 * POST /api/auth/reset-password
 * Đặt lại mật khẩu bằng reset token
 */
const resetPassword = async (req, res) => {
  try {
    const { token, password } = req.body;
    if (!token || !password) {
      return res.status(400).json({
        success: false,
        message: 'Thiếu token hoặc mật khẩu mới'
      });
    }
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Mật khẩu phải có ít nhất 6 ký tự'
      });
    }
    await authService.resetPassword(token, password);
    res.json({
      success: true,
      message: 'Mật khẩu đã được đặt lại thành công'
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

/**
 * POST /api/auth/refresh-token
 * Refresh JWT token
 */
const refreshToken = async (req, res) => {
  try {
    const { refreshToken: token } = req.body;
    if (!token) {
      return res.status(400).json({
        success: false,
        message: 'Thiếu refresh token'
      });
    }
    const result = await authService.refreshTokens(token);
    res.json({
      success: true,
      data: result
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error.message
    });
  }
};

/**
 * GET /api/auth/me
 * Lấy thông tin user hiện tại
 */
const getMe = async (req, res) => {
  res.json({
    success: true,
    data: { user: req.user }
  });
};

module.exports = {
  register, login, forgotPassword,
  verifyOtp, resetPassword, refreshToken, getMe
};