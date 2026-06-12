/**
 * User Service
 * 
 * Xử lý logic nghiệp vụ liên quan đến người dùng.
 * CRUD, cập nhật profile, đổi ngôn ngữ.
 */

const { User } = require('../models');
const bcrypt = require('bcryptjs');

/**
 * Lấy danh sách tất cả users (admin only)
 */
const getAllUsers = async (page = 1, limit = 10) => {
  const offset = (page - 1) * limit;
  const { rows, count } = await User.findAndCountAll({
    attributes: { exclude: ['password', 'resetToken', 'resetExpires'] },
    limit,
    offset,
    order: [['created_at', 'DESC']]
  });
  return { users: rows, total: count, page, totalPages: Math.ceil(count / limit) };
};

/**
 * Lấy user theo ID
 */
const getUserById = async (id) => {
  const user = await User.findByPk(id, {
    attributes: { exclude: ['password', 'resetToken', 'resetExpires'] }
  });
  if (!user) throw new Error('Người dùng không tồn tại');
  return user;
};

/**
 * Cập nhật profile người dùng
 */
const updateProfile = async (userId, updateData) => {
  const user = await User.findByPk(userId);
  if (!user) throw new Error('Người dùng không tồn tại');

  const allowedFields = ['name', 'phone', 'avatar'];
  Object.keys(updateData).forEach(key => {
    if (allowedFields.includes(key)) {
      user[key] = updateData[key];
    }
  });

  await user.save();
  return user;
};

/**
 * Đổi mật khẩu
 */
const changePassword = async (userId, oldPassword, newPassword) => {
  const user = await User.findByPk(userId);
  if (!user) throw new Error('Người dùng không tồn tại');

  const isMatch = await bcrypt.compare(oldPassword, user.password);
  if (!isMatch) throw new Error('Mật khẩu cũ không đúng');

  const salt = await bcrypt.genSalt(12);
  user.password = await bcrypt.hash(newPassword, salt);
  await user.save();
};

/**
 * Đổi ngôn ngữ
 */
const changeLanguage = async (userId, language) => {
  const validLanguages = ['vi', 'en', 'zh', 'ja', 'de', 'fr'];
  if (!validLanguages.includes(language)) {
    throw new Error('Ngôn ngữ không hợp lệ');
  }

  const user = await User.findByPk(userId);
  if (!user) throw new Error('Người dùng không tồn tại');

  user.language = language;
  await user.save();
  return user;
};

/**
 * Xóa user (admin only)
 */
const deleteUser = async (userId) => {
  const user = await User.findByPk(userId);
  if (!user) throw new Error('Người dùng không tồn tại');
  await user.destroy();
};

module.exports = {
  getAllUsers, getUserById,
  updateProfile, changePassword,
  changeLanguage, deleteUser
};