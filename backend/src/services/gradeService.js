const { Grade, Assignment, User } = require('../models');

const getGradesByUser = async (userId) => {
  return await Grade.findAll({
    where: { userId },
    include: [{ model: Assignment, as: 'assignment', include: ['course'] }],
    order: [['created_at', 'DESC']]
  });
};

const getGradesByAssignment = async (assignmentId) => {
  return await Grade.findAll({
    where: { assignmentId },
    include: [{ model: User, as: 'user', attributes: ['id', 'name', 'avatar', 'email'] }]
  });
};

const gradeSubmission = async (gradeId, score, feedback) => {
  const grade = await Grade.findByPk(gradeId);
  if (!grade) throw new Error('Bài nộp không tồn tại');
  grade.score = score;
  grade.feedback = feedback;
  grade.gradedAt = new Date();
  await grade.save();
  return grade;
};

module.exports = { getGradesByUser, getGradesByAssignment, gradeSubmission };