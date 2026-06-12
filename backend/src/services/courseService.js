const { Op } = require('sequelize');
const { Course, User, Enrollment, Lesson } = require('../models');

const getAllCourses = async (filters = {}, page = 1, limit = 12) => {
  const where = {};
  if (filters.status) where.status = filters.status;
  if (filters.category) where.category = filters.category;
  if (filters.level) where.level = filters.level;
  if (filters.language) where.language = filters.language;
  if (filters.isFree !== undefined) where.isFree = filters.isFree === 'true';
  if (filters.search) {
    where[Op.or] = [
      { title: { [Op.like]: `%${filters.search}%` } },
      { description: { [Op.like]: `%${filters.search}%` } }
    ];
  }

  const offset = (page - 1) * limit;
  const { rows, count } = await Course.findAndCountAll({
    where,
    include: [{ model: User, as: 'teacher', attributes: ['id', 'name', 'avatar'] }],
    limit,
    offset,
    order: [['created_at', 'DESC']]
  });
  return { courses: rows, total: count, page, totalPages: Math.ceil(count / limit) };
};

const getCourseById = async (id) => {
  const course = await Course.findByPk(id, {
    include: [
      { model: User, as: 'teacher', attributes: ['id', 'name', 'avatar'] },
      { model: Lesson, as: 'courseLessons', order: [['order_index', 'ASC']] }
    ]
  });
  if (!course) throw new Error('Khóa học không tồn tại');
  return course;
};

const createCourse = async (data) => {
  return await Course.create({ ...data, teacherId: data.teacherId });
};

const updateCourse = async (id, data, userId) => {
  const course = await Course.findByPk(id);
  if (!course) throw new Error('Khóa học không tồn tại');
  if (course.teacherId !== userId && data.role !== 'admin') throw new Error('Bạn không có quyền sửa khóa học này');
  await course.update(data);
  return course;
};

const deleteCourse = async (id) => {
  const course = await Course.findByPk(id);
  if (!course) throw new Error('Khóa học không tồn tại');
  await course.destroy();
};

const enrollCourse = async (userId, courseId) => {
  const course = await Course.findByPk(courseId);
  if (!course) throw new Error('Khóa học không tồn tại');

  const existing = await Enrollment.findOne({ where: { userId, courseId } });
  if (existing) throw new Error('Bạn đã đăng ký khóa học này');

  const paymentStatus = course.isFree ? 'free' : 'pending';
  return await Enrollment.create({ userId, courseId, paymentStatus });
};

module.exports = { getAllCourses, getCourseById, createCourse, updateCourse, deleteCourse, enrollCourse };