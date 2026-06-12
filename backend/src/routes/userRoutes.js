const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authenticate, authorize } = require('../middleware/authMiddleware');

// GET /api/users - Lấy danh sách users (admin only)
router.get('/', authenticate, authorize('admin'), userController.getAll);

// GET /api/users/:id - Lấy user theo ID
router.get('/:id', authenticate, userController.getById);

// PUT /api/users/profile - Cập nhật profile
router.put('/profile', authenticate, userController.updateProfile);

// PUT /api/users/change-password - Đổi mật khẩu
router.put('/change-password', authenticate, userController.changePassword);

// PUT /api/users/language - Đổi ngôn ngữ
router.put('/language', authenticate, userController.changeLanguage);

// DELETE /api/users/:id - Xóa user (admin only)
router.delete('/:id', authenticate, authorize('admin'), userController.deleteUser);

module.exports = router;