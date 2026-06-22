const courseService = require('../services/courseService');

const getAll = async (req, res) => {
  try {
    const { page = 1, limit = 12, ...filters } = req.query;
    const result = await courseService.getAllCourses(filters, parseInt(page), parseInt(limit));
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const getById = async (req, res) => {
  try {
    const course = await courseService.getCourseById(req.params.id);
    res.json({ success: true, data: course });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
};

const create = async (req, res) => {
  try {
    const course = await courseService.createCourse({ ...req.body, teacherId: req.user.id });
    res.status(201).json({ success: true, message: 'Tạo khóa học thành công', data: course });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const update = async (req, res) => {
  try {
    const course = await courseService.updateCourse(req.params.id, req.body, req.user.id);
    res.json({ success: true, message: 'Cập nhật khóa học thành công', data: course });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const remove = async (req, res) => {
  try {
    await courseService.deleteCourse(req.params.id);
    res.json({ success: true, message: 'Xóa khóa học thành công' });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const enroll = async (req, res) => {
  try {
    // Teacher và Admin không cần đăng ký - họ có quyền truy cập toàn bộ
    if (req.user.role === 'teacher' || req.user.role === 'admin') {
      // Trả về enrollment giả để frontend biết user có quyền truy cập
      return res.status(201).json({ 
        success: true, 
        message: 'Bạn có quyền truy cập toàn bộ khóa học',
        data: { 
          userId: req.user.id, 
          courseId: req.params.id,
          isAutoEnrolled: true 
        } 
      });
    }
    
    // Student phải đăng ký mới xem được
    const enrollment = await courseService.enrollCourse(req.user.id, req.params.id);
    res.status(201).json({ success: true, message: 'Đăng ký khóa học thành công', data: enrollment });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = { getAll, getById, create, update, remove, enroll };