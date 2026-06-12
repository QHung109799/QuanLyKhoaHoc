const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const Payment = sequelize.define('payments', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  userId: { type: DataTypes.INTEGER, field: 'user_id', allowNull: false },
  courseId: { type: DataTypes.INTEGER, field: 'course_id', allowNull: false },
  amount: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  method: { type: DataTypes.STRING(50), allowNull: false },
  transactionId: { type: DataTypes.STRING(255), field: 'transaction_id', unique: true, defaultValue: null },
  status: { type: DataTypes.ENUM('pending', 'success', 'failed', 'refunded'), defaultValue: 'pending' }
}, { timestamps: true, createdAt: 'created_at', updatedAt: 'updated_at' });
module.exports = Payment;