const express = require('express');
const router = express.Router();
const assignmentController = require('../controllers/assignmentController');
const { authenticate, authorize } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

// GET /api/assignments?courseId=xxx - Danh sách bài tập
router.get('/', assignmentController.getAll);

// GET /api/assignments/:id - Chi tiết bài tập (đã bao gồm grades)
router.get('/:id', assignmentController.getById);

// POST /api/assignments - Tạo bài tập (courseId in body)
router.post('/', authenticate, authorize('teacher', 'admin'), assignmentController.create);

// PUT /api/assignments/:id - Cập nhật bài tập
router.put('/:id', authenticate, authorize('teacher', 'admin'), assignmentController.update);

// DELETE /api/assignments/:id - Xóa bài tập
router.delete('/:id', authenticate, authorize('teacher', 'admin'), assignmentController.remove);

// POST /api/assignments/:id/submit - Nộp bài (student)
router.post('/:id/submit', authenticate, authorize('student'), upload.single('file'), assignmentController.submit);

module.exports = router;