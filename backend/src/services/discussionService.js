const { Discussion, User } = require('../models');

const getDiscussionsByCourse = async (courseId, page = 1, limit = 50) => {
  const offset = (page - 1) * limit;
  const { rows, count } = await Discussion.findAndCountAll({
    where: { courseId, parentId: null },
    include: [
      { model: User, as: 'user', attributes: ['id', 'name', 'avatar', 'role'] },
      {
        model: Discussion, as: 'replies',
        include: [{ model: User, as: 'user', attributes: ['id', 'name', 'avatar', 'role'] }],
        order: [['created_at', 'ASC']]
      }
    ],
    limit,
    offset,
    order: [['created_at', 'DESC']]
  });
  return { discussions: rows, total: count };
};

const createMessage = async (courseId, userId, message, parentId = null) => {
  return await Discussion.create({ courseId, userId, message, parentId });
};

const deleteMessage = async (id, userId) => {
  const msg = await Discussion.findByPk(id);
  if (!msg) throw new Error('Tin nhắn không tồn tại');
  if (msg.userId !== userId) throw new Error('Bạn không có quyền xóa tin nhắn này');
  await msg.destroy();
};

module.exports = { getDiscussionsByCourse, createMessage, deleteMessage };