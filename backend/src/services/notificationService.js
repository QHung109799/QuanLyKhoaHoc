const { Notification, User } = require('../models');

const getUserNotifications = async (userId, page = 1, limit = 20) => {
  const offset = (page - 1) * limit;
  const { rows, count } = await Notification.findAndCountAll({
    where: { userId },
    limit,
    offset,
    order: [['created_at', 'DESC']]
  });
  return { notifications: rows, total: count, unread: rows.filter(n => !n.isRead).length };
};

const markAsRead = async (id, userId) => {
  const notification = await Notification.findOne({ where: { id, userId } });
  if (!notification) throw new Error('Thông báo không tồn tại');
  notification.isRead = true;
  await notification.save();
  return notification;
};

const markAllAsRead = async (userId) => {
  await Notification.update({ isRead: true }, { where: { userId, isRead: false } });
};

const createNotification = async (userId, title, message, type = 'in-app') => {
  return await Notification.create({ userId, title, message, type });
};

const deleteNotification = async (id, userId) => {
  const notification = await Notification.findOne({ where: { id, userId } });
  if (!notification) throw new Error('Thông báo không tồn tại');
  await notification.destroy();
};

module.exports = { getUserNotifications, markAsRead, markAllAsRead, createNotification, deleteNotification };