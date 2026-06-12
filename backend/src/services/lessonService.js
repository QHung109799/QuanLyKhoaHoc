const { Lesson } = require('../models');

const getLessonsByCourse = async (courseId) => {
  return await Lesson.findAll({ where: { courseId }, order: [['order_index', 'ASC']] });
};

const getLessonById = async (id) => {
  const lesson = await Lesson.findByPk(id);
  if (!lesson) throw new Error('Bài học không tồn tại');
  return lesson;
};

const createLesson = async (data) => {
  return await Lesson.create(data);
};

const updateLesson = async (id, data) => {
  const lesson = await Lesson.findByPk(id);
  if (!lesson) throw new Error('Bài học không tồn tại');
  await lesson.update(data);
  return lesson;
};

const deleteLesson = async (id) => {
  const lesson = await Lesson.findByPk(id);
  if (!lesson) throw new Error('Bài học không tồn tại');
  await lesson.destroy();
};

module.exports = { getLessonsByCourse, getLessonById, createLesson, updateLesson, deleteLesson };