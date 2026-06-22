const userService = require('../services/userService');

const getAll = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const result = await userService.getAllUsers(parseInt(page), parseInt(limit));
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const getById = async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.id);
    res.json({ success: true, data: user });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
};

const updateById = async (req, res) => {
  try {
    const user = await userService.updateUserById(req.params.id, req.body);
    res.json({ success: true, message: 'Cập nhật người dùng thành công', data: user });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const updateProfile = async (req, res) => {
  try {
    const user = await userService.updateProfile(req.user.id, req.body);
    res.json({ success: true, message: 'Cập nhật thành công', data: user });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    await userService.changePassword(req.user.id, oldPassword, newPassword);
    res.json({ success: true, message: 'Đổi mật khẩu thành công' });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const changeLanguage = async (req, res) => {
  try {
    const { language } = req.body;
    const user = await userService.changeLanguage(req.user.id, language);
    res.json({ success: true, message: 'Đổi ngôn ngữ thành công', data: { language: user.language } });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    await userService.deleteUser(req.params.id);
    res.json({ success: true, message: 'Xóa người dùng thành công' });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = { getAll, getById, updateById, updateProfile, changePassword, changeLanguage, deleteUser };