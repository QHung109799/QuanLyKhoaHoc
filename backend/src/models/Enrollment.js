const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Enrollment = sequelize.define('enrollments', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  userId: { type: DataTypes.INTEGER, field: 'user_id', allowNull: false },
  courseId: { type: DataTypes.INTEGER, field: 'course_id', allowNull: false },
  status: { type: DataTypes.ENUM('active', 'completed', 'cancelled'), defaultValue: 'active' },
  paymentStatus: { type: DataTypes.ENUM('pending', 'paid', 'free', 'refunded'), field: 'payment_status', defaultValue: 'pending' },
  enrolledAt: { type: DataTypes.DATE, field: 'enrolled_at', defaultValue: DataTypes.NOW }
}, { timestamps: false, tableName: 'enrollments' });
module.exports = Enrollment;