const express = require('express');
const router = express.Router({ mergeParams: true });
const lessonController = require('../controllers/lessonController');
const { authenticate, authorize } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

// GET /api/courses/:courseId/lessons - Danh sách bài học
router.get('/', lessonController.getAll);

// GET /api/lessons/:id - Chi tiết bài học
router.get('/:id', lessonController.getById);

// POST /api/courses/:courseId/lessons - Tạo bài học
router.post('/', authenticate, authorize('teacher', 'admin'), upload.single('file'), lessonController.create);

// PUT /api/lessons/:id - Cập nhật bài học
router.put('/:id', authenticate, authorize('teacher', 'admin'), upload.single('file'), lessonController.update);

// DELETE /api/lessons/:id - Xóa bài học
router.delete('/:id', authenticate, authorize('teacher', 'admin'), lessonController.remove);

module.exports = router;