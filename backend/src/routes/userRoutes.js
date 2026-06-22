const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authenticate, authorize } = require('../middleware/authMiddleware');

// GET /api/users - Lấy danh sách users (tạm thời mở public để test)
router.get('/', userController.getAll);

// GET /api/users/:id - Lấy user theo ID (tạm thời mở public để test)
router.get('/:id', userController.getById);

// PUT /api/users/:id - Cập nhật user theo ID (tạm thời mở public để test)
router.put('/:id', userController.updateById);

// PUT /api/users/profile - Cập nhật profile
router.put('/profile', authenticate, userController.updateProfile);

// PUT /api/users/change-password - Đổi mật khẩu
router.put('/change-password', authenticate, userController.changePassword);

// PUT /api/users/language - Đổi ngôn ngữ
router.put('/language', authenticate, userController.changeLanguage);

// DELETE /api/users/:id - Xóa user (tạm thời mở cho tất cả auth)
router.delete('/:id', authenticate, userController.deleteUser);

module.exports = router;