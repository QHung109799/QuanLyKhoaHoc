/**
 * Course Model
 * 
 * Đại diện cho khóa học trong hệ thống.
 * Quan hệ:
 *   - Course thuộc về một Teacher (User)
 *   - Course có nhiều Enrollments
 *   - Course có nhiều Lessons
 *   - Course có nhiều Assignments
 *   - Course có nhiều Discussions
 */

const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Course = sequelize.define('courses', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING(200),
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    defaultValue: null
  },
  teacherId: {
    type: DataTypes.INTEGER,
    field: 'teacher_id',
    allowNull: false
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0.00
  },
  isFree: {
    type: DataTypes.BOOLEAN,
    field: 'is_free',
    defaultValue: false
  },
  thumbnail: {
    type: DataTypes.STRING(255),
    defaultValue: null
  },
  category: {
    type: DataTypes.STRING(100),
    defaultValue: null
  },
  language: {
    type: DataTypes.STRING(50),
    defaultValue: 'vi'
  },
  level: {
    type: DataTypes.ENUM('beginner', 'intermediate', 'advanced'),
    defaultValue: 'beginner'
  },
  status: {
    type: DataTypes.ENUM('draft', 'published', 'archived'),
    defaultValue: 'published'
  }
}, {
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

module.exports = Course;