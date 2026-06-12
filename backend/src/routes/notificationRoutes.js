const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');
const { authenticate } = require('../middleware/authMiddleware');

// GET /api/notifications - Danh sách thông báo
router.get('/', authenticate, notificationController.getAll);

// PUT /api/notifications/:id/read - Đánh dấu đã đọc
router.put('/:id/read', authenticate, notificationController.markRead);

// PUT /api/notifications/read-all - Đánh dấu tất cả đã đọc
router.put('/read-all', authenticate, notificationController.markAllRead);

// DELETE /api/notifications/:id - Xóa thông báo
router.delete('/:id', authenticate, notificationController.remove);

module.exports = router;