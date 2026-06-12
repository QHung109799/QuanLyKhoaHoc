const discussionService = require('../services/discussionService');

const getAll = async (req, res) => {
  try {
    const { page = 1 } = req.query;
    const result = await discussionService.getDiscussionsByCourse(req.params.courseId, parseInt(page));
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const create = async (req, res) => {
  try {
    const { message, parentId } = req.body;
    const discussion = await discussionService.createMessage(req.params.courseId, req.user.id, message, parentId);
    res.status(201).json({ success: true, message: 'Gửi tin nhắn thành công', data: discussion });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const remove = async (req, res) => {
  try {
    await discussionService.deleteMessage(req.params.id, req.user.id);
    res.json({ success: true, message: 'Xóa tin nhắn thành công' });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = { getAll, create, remove };