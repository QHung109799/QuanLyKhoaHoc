const { Assignment, Grade, Course } = require('../models');

const getAssignmentsByCourse = async (courseId) => {
  return await Assignment.findAll({ where: { courseId }, order: [['created_at', 'DESC']] });
};

const getAssignmentById = async (id) => {
  const assignment = await Assignment.findByPk(id, {
    include: [{ model: Grade, as: 'grades', include: ['user'] }]
  });
  if (!assignment) throw new Error('Bài tập không tồn tại');
  return assignment;
};

const createAssignment = async (data) => {
  return await Assignment.create(data);
};

const updateAssignment = async (id, data) => {
  const assignment = await Assignment.findByPk(id);
  if (!assignment) throw new Error('Bài tập không tồn tại');
  await assignment.update(data);
  return assignment;
};

const deleteAssignment = async (id) => {
  const assignment = await Assignment.findByPk(id);
  if (!assignment) throw new Error('Bài tập không tồn tại');
  await assignment.destroy();
};

const submitAssignment = async (assignmentId, userId, fileUrl) => {
  const assignment = await Assignment.findByPk(assignmentId);
  if (!assignment) throw new Error('Bài tập không tồn tại');
  if (assignment.deadline && new Date() > new Date(assignment.deadline)) {
    throw new Error('Đã quá hạn nộp bài');
  }
  const [grade, created] = await Grade.findOrCreate({
    where: { assignmentId, userId },
    defaults: { fileUrl, submittedAt: new Date() }
  });
  if (!created) {
    grade.fileUrl = fileUrl;
    grade.submittedAt = new Date();
    await grade.save();
  }
  return grade;
};

module.exports = { getAssignmentsByCourse, getAssignmentById, createAssignment, updateAssignment, deleteAssignment, submitAssignment };