const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');
const { authenticate, authorize } = require('../middleware/authMiddleware');

// GET /api/courses - Lấy danh sách khóa học (có filter, search, pagination)
router.get('/', courseController.getAll);

// GET /api/courses/:id - Chi tiết khóa học
router.get('/:id', courseController.getById);

// POST /api/courses - Tạo khóa học (teacher/admin)
router.post('/', authenticate, authorize('teacher', 'admin'), courseController.create);

// PUT /api/courses/:id - Cập nhật khóa học
router.put('/:id', authenticate, authorize('teacher', 'admin'), courseController.update);

// DELETE /api/courses/:id - Xóa khóa học
router.delete('/:id', authenticate, authorize('teacher', 'admin'), courseController.remove);

// POST /api/courses/:id/enroll - Đăng ký khóa học
router.post('/:id/enroll', authenticate, courseController.enroll);

module.exports = router;