const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const Assignment = sequelize.define('assignments', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  courseId: { type: DataTypes.INTEGER, field: 'course_id', allowNull: false },
  title: { type: DataTypes.STRING(200), allowNull: false },
  description: { type: DataTypes.TEXT, defaultValue: null },
  deadline: { type: DataTypes.DATE, defaultValue: null },
  maxScore: { type: DataTypes.INTEGER, field: 'max_score', defaultValue: 100 }
}, { timestamps: true, createdAt: 'created_at', updatedAt: 'updated_at' });
module.exports = Assignment;