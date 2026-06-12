const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Lesson = sequelize.define('lessons', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  courseId: { type: DataTypes.INTEGER, field: 'course_id', allowNull: false },
  title: { type: DataTypes.STRING(200), allowNull: false },
  content: { type: DataTypes.TEXT, defaultValue: null },
  videoUrl: { type: DataTypes.STRING(255), field: 'video_url', defaultValue: null },
  fileUrl: { type: DataTypes.STRING(255), field: 'file_url', defaultValue: null },
  duration: { type: DataTypes.INTEGER, defaultValue: null },
  orderIndex: { type: DataTypes.INTEGER, field: 'order_index', defaultValue: 0 }
}, { timestamps: true, createdAt: 'created_at', updatedAt: 'updated_at' });

module.exports = Lesson;