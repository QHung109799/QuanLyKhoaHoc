const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const Discussion = sequelize.define('discussions', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  courseId: { type: DataTypes.INTEGER, field: 'course_id', allowNull: false },
  userId: { type: DataTypes.INTEGER, field: 'user_id', allowNull: false },
  parentId: { type: DataTypes.INTEGER, field: 'parent_id', defaultValue: null },
  message: { type: DataTypes.TEXT, allowNull: false }
}, { timestamps: true, createdAt: 'created_at', updatedAt: false });
module.exports = Discussion;