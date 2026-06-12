/**
 * Models Index
 * 
 * Định nghĩa tất cả các quan hệ (associations) giữa các models.
 * Quan hệ:
 *   - User 1-n Course (teacher)
 *   - User n-n Course (qua Enrollment)
 *   - User 1-n Grade
 *   - User 1-n Notification
 *   - User 1-n Payment
 *   - User 1-n Discussion
 *   - Course 1-n Lesson
 *   - Course 1-n Assignment
 *   - Course 1-n Discussion
 *   - Assignment 1-n Grade
 *   - Discussion 1-n Discussion (tự tham chiếu - replies)
 *   - Course 1-n Payment
 */

const User = require('./User');
const Course = require('./Course');
const Enrollment = require('./Enrollment');
const Lesson = require('./Lesson');
const Assignment = require('./Assignment');
const Grade = require('./Grade');
const Notification = require('./Notification');
const Payment = require('./Payment');
const Discussion = require('./Discussion');

// ==================== User Associations ====================
User.hasMany(Course, { foreignKey: 'teacherId', as: 'teachingCourses' });
Course.belongsTo(User, { foreignKey: 'teacherId', as: 'teacher' });

User.hasMany(Grade, { foreignKey: 'userId', as: 'userGrades' });
Grade.belongsTo(User, { foreignKey: 'userId', as: 'gradedUser' });

User.hasMany(Notification, { foreignKey: 'userId', as: 'userNotifications' });
Notification.belongsTo(User, { foreignKey: 'userId', as: 'notifUser' });

User.hasMany(Payment, { foreignKey: 'userId', as: 'userPayments' });
Payment.belongsTo(User, { foreignKey: 'userId', as: 'paymentUser' });

User.hasMany(Discussion, { foreignKey: 'userId', as: 'userDiscussions' });
Discussion.belongsTo(User, { foreignKey: 'userId', as: 'discussionUser' });

// ==================== Course Associations ====================
Course.hasMany(Lesson, { foreignKey: 'courseId', as: 'courseLessons' });
Lesson.belongsTo(Course, { foreignKey: 'courseId', as: 'lessonCourse' });

Course.hasMany(Assignment, { foreignKey: 'courseId', as: 'courseAssignments' });
Assignment.belongsTo(Course, { foreignKey: 'courseId', as: 'assignmentCourse' });

Course.hasMany(Payment, { foreignKey: 'courseId', as: 'coursePayments' });
Payment.belongsTo(Course, { foreignKey: 'courseId', as: 'paymentCourse' });

Course.hasMany(Discussion, { foreignKey: 'courseId', as: 'courseDiscussions' });
Discussion.belongsTo(Course, { foreignKey: 'courseId', as: 'discussionCourse' });

// ==================== Assignment Associations ====================
Assignment.hasMany(Grade, { foreignKey: 'assignmentId', as: 'assignmentGrades' });
Grade.belongsTo(Assignment, { foreignKey: 'assignmentId', as: 'gradeAssignment' });

// ==================== Discussion Self-Reference ====================
Discussion.hasMany(Discussion, { foreignKey: 'parentId', as: 'replies' });
Discussion.belongsTo(Discussion, { foreignKey: 'parentId', as: 'parent' });

// ==================== Many-to-Many: User <-> Course (via Enrollment) ====================
// Không cần hasMany/belongsTo riêng cho Enrollment vì belongsToMany đã xử lý
User.belongsToMany(Course, {
  through: Enrollment,
  foreignKey: 'userId',
  otherKey: 'courseId',
  as: 'enrolledCourses'
});
Course.belongsToMany(User, {
  through: Enrollment,
  foreignKey: 'courseId',
  otherKey: 'userId',
  as: 'courseStudents'
});

module.exports = {
  User, Course, Enrollment, Lesson,
  Assignment, Grade, Notification, Payment, Discussion
};