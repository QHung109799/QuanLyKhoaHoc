const assignmentService = require('../services/assignmentService');

const getAll = async (req, res) => {
  try {
    const assignments = await assignmentService.getAssignmentsByCourse(req.params.courseId);
    res.json({ success: true, data: assignments });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const getById = async (req, res) => {
  try {
    const assignment = await assignmentService.getAssignmentById(req.params.id);
    res.json({ success: true, data: assignment });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
};

const create = async (req, res) => {
  try {
    const assignment = await assignmentService.createAssignment({ ...req.body, courseId: req.params.courseId });
    res.status(201).json({ success: true, message: 'Tạo bài tập thành công', data: assignment });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const update = async (req, res) => {
  try {
    const assignment = await assignmentService.updateAssignment(req.params.id, req.body);
    res.json({ success: true, message: 'Cập nhật bài tập thành công', data: assignment });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const remove = async (req, res) => {
  try {
    await assignmentService.deleteAssignment(req.params.id);
    res.json({ success: true, message: 'Xóa bài tập thành công' });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const submit = async (req, res) => {
  try {
    const fileUrl = req.file ? req.file.path : null;
    const grade = await assignmentService.submitAssignment(req.params.id, req.user.id, fileUrl);
    res.json({ success: true, message: 'Nộp bài thành công', data: grade });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = { getAll, getById, create, update, remove, submit };