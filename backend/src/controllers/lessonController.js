const lessonService = require('../services/lessonService');

const getAll = async (req, res) => {
  try {
    const lessons = await lessonService.getLessonsByCourse(req.params.courseId);
    res.json({ success: true, data: lessons });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const getById = async (req, res) => {
  try {
    const lesson = await lessonService.getLessonById(req.params.id);
    res.json({ success: true, data: lesson });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
};

const create = async (req, res) => {
  try {
    const data = { ...req.body, courseId: req.params.courseId };
    if (req.file) {
      if (req.file.mimetype.startsWith('video/')) data.videoUrl = req.file.path;
      else data.fileUrl = req.file.path;
    }
    const lesson = await lessonService.createLesson(data);
    res.status(201).json({ success: true, message: 'Tạo bài học thành công', data: lesson });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const update = async (req, res) => {
  try {
    const data = req.body;
    if (req.file) {
      if (req.file.mimetype.startsWith('video/')) data.videoUrl = req.file.path;
      else data.fileUrl = req.file.path;
    }
    const lesson = await lessonService.updateLesson(req.params.id, data);
    res.json({ success: true, message: 'Cập nhật bài học thành công', data: lesson });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const remove = async (req, res) => {
  try {
    await lessonService.deleteLesson(req.params.id);
    res.json({ success: true, message: 'Xóa bài học thành công' });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = { getAll, getById, create, update, remove };