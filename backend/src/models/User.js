/**
 * User Model
 * 
 * Đại diện cho người dùng hệ thống (Admin, Teacher, Student).
 * Quan hệ:
 *   - User có nhiều Courses (với vai trò teacher)
 *   - User có nhiều Enrollments
 *   - User có nhiều Grades
 *   - User có nhiều Notifications
 *   - User có nhiều Payments
 *   - User có nhiều Discussions
 */

const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const User = sequelize.define('users', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: { notEmpty: { msg: 'Tên không được để trống' } }
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: { isEmail: { msg: 'Email không hợp lệ' } }
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  role: {
    type: DataTypes.ENUM('admin', 'teacher', 'student'),
    defaultValue: 'student'
  },
  avatar: {
    type: DataTypes.STRING(255),
    defaultValue: null
  },
  phone: {
    type: DataTypes.STRING(20),
    defaultValue: null
  },
  language: {
    type: DataTypes.ENUM('vi', 'en', 'zh', 'ja', 'de', 'fr'),
    defaultValue: 'vi'
  },
  emailVerified: {
    type: DataTypes.BOOLEAN,
    field: 'email_verified',
    defaultValue: false
  },
  resetToken: {
    type: DataTypes.STRING(255),
    field: 'reset_token',
    defaultValue: null
  },
  resetExpires: {
    type: DataTypes.DATE,
    field: 'reset_expires',
    defaultValue: null
  },
  resetOtp: {
    type: DataTypes.STRING(10),
    field: 'reset_otp',
    defaultValue: null
  },
  resetOtpExpires: {
    type: DataTypes.DATE,
    field: 'reset_otp_expires',
    defaultValue: null
  }
}, {
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

module.exports = User;