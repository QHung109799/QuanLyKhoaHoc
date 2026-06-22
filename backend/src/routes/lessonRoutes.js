const express = require('express');
const router = express.Router();
const lessonController = require('../controllers/lessonController');
const { authenticate, authorize } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

// GET /api/lessons?courseId=xxx - Danh sách bài học theo khóa học
router.get('/', lessonController.getAll);

// GET /api/lessons/:id - Chi tiết bài học
router.get('/:id', lessonController.getById);

// POST /api/lessons - Tạo bài học (courseId in body)
router.post('/', authenticate, authorize('teacher', 'admin'), upload.single('file'), lessonController.create);

// PUT /api/lessons/:id - Cập nhật bài học
router.put('/:id', authenticate, authorize('teacher', 'admin'), upload.single('file'), lessonController.update);

// DELETE /api/lessons/:id - Xóa bài học
router.delete('/:id', authenticate, authorize('teacher', 'admin'), lessonController.remove);

module.exports = router;