const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const Notification = sequelize.define('notifications', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  userId: { type: DataTypes.INTEGER, field: 'user_id', allowNull: false },
  type: { type: DataTypes.ENUM('email', 'in-app'), defaultValue: 'in-app' },
  title: { type: DataTypes.STRING(200), allowNull: false },
  message: { type: DataTypes.TEXT, allowNull: false },
  isRead: { type: DataTypes.BOOLEAN, field: 'is_read', defaultValue: false }
}, { timestamps: true, createdAt: 'created_at', updatedAt: false });
module.exports = Notification;