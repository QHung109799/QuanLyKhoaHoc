const express = require('express');
const router = express.Router();
const discussionController = require('../controllers/discussionController');
const { authenticate } = require('../middleware/authMiddleware');

// GET /api/discussions?courseId=xxx - Danh sách thảo luận
router.get('/', discussionController.getAll);

// POST /api/discussions - Tạo tin nhắn (courseId in body)
router.post('/', authenticate, discussionController.create);

// DELETE /api/discussions/:id - Xóa tin nhắn
router.delete('/:id', authenticate, discussionController.remove);

module.exports = router;