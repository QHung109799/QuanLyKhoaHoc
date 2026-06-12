const gradeService = require('../services/gradeService');

const getMyGrades = async (req, res) => {
  try {
    const grades = await gradeService.getGradesByUser(req.user.id);
    res.json({ success: true, data: grades });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const getByAssignment = async (req, res) => {
  try {
    const grades = await gradeService.getGradesByAssignment(req.params.assignmentId);
    res.json({ success: true, data: grades });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const gradeSubmission = async (req, res) => {
  try {
    const { score, feedback } = req.body;
    const grade = await gradeService.gradeSubmission(req.params.id, score, feedback);
    res.json({ success: true, message: 'Chấm điểm thành công', data: grade });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = { getMyGrades, getByAssignment, gradeSubmission };