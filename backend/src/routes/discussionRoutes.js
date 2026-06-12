const express = require('express');
const router = express.Router({ mergeParams: true });
const discussionController = require('../controllers/discussionController');
const { authenticate } = require('../middleware/authMiddleware');

// GET /api/courses/:courseId/discussions - Danh sách thảo luận
router.get('/', discussionController.getAll);

// POST /api/courses/:courseId/discussions - Tạo tin nhắn
router.post('/', authenticate, discussionController.create);

// DELETE /api/discussions/:id - Xóa tin nhắn
router.delete('/:id', authenticate, discussionController.remove);

module.exports = router;