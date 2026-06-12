/**
 * Auth Middleware
 * 
 * Xác thực JWT token từ request header.
 * Attach user info vào req.user nếu token hợp lệ.
 */

const jwt = require('jsonwebtoken');
const { User } = require('../models');

/**
 * Xác thực người dùng - yêu cầu token hợp lệ
 */
const authenticate = async (req, res, next) => {
  try {
    // Lấy token từ header Authorization: Bearer <token>
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'Không tìm thấy token xác thực'
      });
    }

    const token = authHeader.split(' ')[1];

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Lấy thông tin user từ database
    const user = await User.findByPk(decoded.id, {
      attributes: { exclude: ['password', 'resetToken', 'resetExpires'] }
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Người dùng không tồn tại'
      });
    }

    // Attach user vào request
    req.user = user;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Token đã hết hạn',
        code: 'TOKEN_EXPIRED'
      });
    }
    return res.status(401).json({
      success: false,
      message: 'Token không hợp lệ'
    });
  }
};

/**
 * Phân quyền dựa trên role
 * @param  {...string} roles - Các role được phép truy cập
 */
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Chưa xác thực'
      });
    }
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: 'Bạn không có quyền thực hiện hành động này'
      });
    }
    next();
  };
};

module.exports = { authenticate, authorize };