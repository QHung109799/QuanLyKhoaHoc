const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const Grade = sequelize.define('grades', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  assignmentId: { type: DataTypes.INTEGER, field: 'assignment_id', allowNull: false },
  userId: { type: DataTypes.INTEGER, field: 'user_id', allowNull: false },
  score: { type: DataTypes.DECIMAL(5, 2), defaultValue: null },
  feedback: { type: DataTypes.TEXT, defaultValue: null },
  fileUrl: { type: DataTypes.STRING(255), field: 'file_url', defaultValue: null },
  submittedAt: { type: DataTypes.DATE, field: 'submitted_at', defaultValue: null },
  gradedAt: { type: DataTypes.DATE, field: 'graded_at', defaultValue: null }
}, { timestamps: true, createdAt: 'created_at', updatedAt: 'updated_at' });
module.exports = Grade;