/**
 * Auth Service
 * 
 * Xử lý logic nghiệp vụ xác thực người dùng:
 * - Đăng ký, đăng nhập
 * - Quên/Reset mật khẩu (OTP-based)
 * - Xác thực email
 * - JWT & Refresh token
 */

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { User } = require('../models');
const { sendVerificationEmail, sendResetPasswordEmail, sendOtpEmail, generateOtp } = require('../utils/emailService');

/**
 * Tạo JWT access token
 * @param {Object} user - User object
 * @returns {string} JWT token
 */
const generateAccessToken = (user) => {
  return jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '15m' }
  );
};

/**
 * Tạo refresh token
 * @param {Object} user - User object
 * @returns {string} Refresh token
 */
const generateRefreshToken = (user) => {
  return jwt.sign(
    { id: user.id },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d' }
  );
};

/**
 * Đăng ký tài khoản mới
 * @param {Object} userData - { name, email, password, role }
 * @returns {Object} { user, accessToken, refreshToken }
 */
const register = async (userData) => {
  const { name, email, password, role } = userData;

  // Kiểm tra email đã tồn tại
  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) {
    throw new Error('Email đã được đăng ký');
  }

  // Hash password
  const salt = await bcrypt.genSalt(12);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Tạo user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role: role || 'student'
  });

  // Tạo verification token và gửi email
  const verifyToken = crypto.randomBytes(32).toString('hex');
  // TODO: Save verifyToken to user record
  // await sendVerificationEmail(email, verifyToken);

  // Generate tokens
  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
      language: user.language
    },
    accessToken,
    refreshToken
  };
};

/**
 * Đăng nhập
 * @param {string} email
 * @param {string} password
 * @returns {Object} { user, accessToken, refreshToken }
 */
const login = async (email, password) => {
  // Tìm user theo email
  const user = await User.findOne({ where: { email } });
  if (!user) {
    throw new Error('Email hoặc mật khẩu không đúng');
  }

  // Kiểm tra password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Email hoặc mật khẩu không đúng');
  }

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
      language: user.language,
      emailVerified: user.emailVerified
    },
    accessToken,
    refreshToken
  };
};

/**
 * Gửi mã OTP đặt lại mật khẩu
 * Tạo OTP 6 chữ số, lưu vào database, gửi email cho user.
 * OTP có hiệu lực trong 15 phút.
 * 
 * @param {string} email - Email người dùng
 * @returns {Object} { message, email } (không trả OTP để bảo mật)
 */
const forgotPassword = async (email) => {
  const user = await User.findOne({ where: { email } });
  if (!user) {
    // Không tiết lộ user có tồn tại hay không
    return { message: 'Nếu email tồn tại, mã OTP đã được gửi' };
  }

  // Tạo mã OTP 6 chữ số
  const otp = generateOtp();
  const otpExpires = new Date(Date.now() + 15 * 60 * 1000); // 15 phút

  // Lưu OTP vào database
  user.resetOtp = otp;
  user.resetOtpExpires = otpExpires;
  user.resetToken = null; // Xóa token cũ nếu có
  user.resetExpires = null;
  await user.save();

  // Gửi email OTP
  await sendOtpEmail(email, otp);
  console.log(`[Auth] OTP sent to ${email}`);

  return { message: 'Mã OTP đã được gửi đến email của bạn' };
};

/**
 * Xác thực mã OTP
 * Kiểm tra OTP có đúng và còn hiệu lực không.
 * 
 * @param {string} email - Email người dùng
 * @param {string} otp - Mã OTP 6 chữ số
 * @returns {Object} { resetToken } - Token để đặt lại mật khẩu
 */
const verifyOtp = async (email, otp) => {
  const user = await User.findOne({ where: { email } });
  if (!user) {
    throw new Error('Email không tồn tại');
  }

  // Kiểm tra OTP
  if (user.resetOtp !== otp) {
    throw new Error('Mã OTP không đúng');
  }

  // Kiểm tra hạn
  if (!user.resetOtpExpires || new Date() > new Date(user.resetOtpExpires)) {
    throw new Error('Mã OTP đã hết hạn. Vui lòng yêu cầu mã mới');
  }

  // Tạo reset token để đặt mật khẩu mới
  const resetToken = crypto.randomBytes(32).toString('hex');
  user.resetToken = resetToken;
  user.resetExpires = new Date(Date.now() + 15 * 60 * 1000); // 15 phút
  user.resetOtp = null; // Xóa OTP sau khi xác thực thành công
  user.resetOtpExpires = null;
  await user.save();

  return { resetToken };
};

/**
 * Đặt lại mật khẩu bằng reset token
 * @param {string} token - Reset token từ verifyOtp
 * @param {string} newPassword - Mật khẩu mới
 */
const resetPassword = async (token, newPassword) => {
  const user = await User.findOne({
    where: {
      resetToken: token,
      resetExpires: { [require('sequelize').Op.gt]: new Date() }
    }
  });

  if (!user) {
    throw new Error('Token không hợp lệ hoặc đã hết hạn');
  }

  // Hash password mới
  const salt = await bcrypt.genSalt(12);
  user.password = await bcrypt.hash(newPassword, salt);
  user.resetToken = null;
  user.resetExpires = null;
  user.resetOtp = null;
  user.resetOtpExpires = null;
  await user.save();
};

/**
 * Refresh token
 * @param {string} refreshToken
 * @returns {Object} { accessToken, refreshToken }
 */
const refreshTokens = async (refreshToken) => {
  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const user = await User.findByPk(decoded.id);
    if (!user) {
      throw new Error('Người dùng không tồn tại');
    }

    return {
      accessToken: generateAccessToken(user),
      refreshToken: generateRefreshToken(user)
    };
  } catch (error) {
    throw new Error('Refresh token không hợp lệ');
  }
};

module.exports = {
  register, login, forgotPassword,
  verifyOtp, resetPassword, refreshTokens,
  generateAccessToken, generateRefreshToken
};