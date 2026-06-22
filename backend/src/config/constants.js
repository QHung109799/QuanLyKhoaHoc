/**
 * Application Constants
 * 
 * Tập trung tất cả hằng số, enum, config mặc định
 * để dễ bảo trì và tránh hard-code.
 */

// ============================================================
// User
// ============================================================
const USER_ROLES = Object.freeze({
  ADMIN: 'admin',
  TEACHER: 'teacher',
  STUDENT: 'student',
});

const VALID_LANGUAGES = Object.freeze(['vi', 'en', 'zh', 'ja', 'de', 'fr']);

// ============================================================
// Course
// ============================================================
const COURSE_LEVELS = Object.freeze({
  BEGINNER: 'beginner',
  INTERMEDIATE: 'intermediate',
  ADVANCED: 'advanced',
});

const COURSE_STATUSES = Object.freeze({
  DRAFT: 'draft',
  PUBLISHED: 'published',
  ARCHIVED: 'archived',
});

// ============================================================
// Enrollment
// ============================================================
const ENROLLMENT_STATUSES = Object.freeze({
  ACTIVE: 'active',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
});

const PAYMENT_STATUSES = Object.freeze({
  PENDING: 'pending',
  PAID: 'paid',
  FREE: 'free',
  REFUNDED: 'refunded',
});

// ============================================================
// Payment
// ============================================================
const PAYMENT_METHODS = Object.freeze(['momo', 'vnpay', 'bank', 'paypal']);

const TRANSACTION_STATUSES = Object.freeze({
  PENDING: 'pending',
  SUCCESS: 'success',
  FAILED: 'failed',
  REFUNDED: 'refunded',
});

// ============================================================
// Notification
// ============================================================
const NOTIFICATION_TYPES = Object.freeze({
  EMAIL: 'email',
  IN_APP: 'in-app',
});

// ============================================================
// Pagination
// ============================================================
const PAGINATION = Object.freeze({
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
  MAX_LIMIT: 100,
});

// ============================================================
// File Upload
// ============================================================
const UPLOAD = Object.freeze({
  MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
  ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
  ALLOWED_DOCUMENT_TYPES: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
  ALLOWED_VIDEO_TYPES: ['video/mp4', 'video/webm'],
});

// ============================================================
// API Response Messages
// ============================================================
const MESSAGES = Object.freeze({
  // Auth
  REGISTER_SUCCESS: 'Đăng ký thành công',
  LOGIN_SUCCESS: 'Đăng nhập thành công',
  LOGOUT_SUCCESS: 'Đăng xuất thành công',
  TOKEN_EXPIRED: 'Token đã hết hạn',
  TOKEN_INVALID: 'Token không hợp lệ',
  UNAUTHORIZED: 'Không tìm thấy token xác thực',
  FORBIDDEN: 'Bạn không có quyền thực hiện hành động này',

  // User
  USER_NOT_FOUND: 'Người dùng không tồn tại',
  USER_UPDATED: 'Cập nhật người dùng thành công',
  PROFILE_UPDATED: 'Cập nhật profile thành công',
  PASSWORD_CHANGED: 'Đổi mật khẩu thành công',
  PASSWORD_INCORRECT: 'Mật khẩu cũ không đúng',
  LANGUAGE_CHANGED: 'Đổi ngôn ngữ thành công',
  LANGUAGE_INVALID: 'Ngôn ngữ không hợp lệ',
  USER_DELETED: 'Xóa người dùng thành công',

  // Course
  COURSE_NOT_FOUND: 'Khóa học không tồn tại',
  COURSE_CREATED: 'Tạo khóa học thành công',
  COURSE_UPDATED: 'Cập nhật khóa học thành công',
  COURSE_DELETED: 'Xóa khóa học thành công',
  ENROLL_SUCCESS: 'Đăng ký khóa học thành công',
  ALREADY_ENROLLED: 'Bạn đã đăng ký khóa học này rồi',

  // Payment
  PAYMENT_CREATED: 'Tạo giao dịch thành công',
  PAYMENT_UPDATED: 'Cập nhật giao dịch thành công',
  PAYMENT_NOT_FOUND: 'Giao dịch không tồn tại',
  FREE_COURSE_NO_PAYMENT: 'Khóa học miễn phí không cần thanh toán',

  // General
  NOT_FOUND: 'Không tìm thấy',
  SERVER_ERROR: 'Lỗi máy chủ nội bộ',
  SUCCESS: 'Thành công',
});

module.exports = {
  USER_ROLES,
  VALID_LANGUAGES,
  COURSE_LEVELS,
  COURSE_STATUSES,
  ENROLLMENT_STATUSES,
  PAYMENT_STATUSES,
  PAYMENT_METHODS,
  TRANSACTION_STATUSES,
  NOTIFICATION_TYPES,
  PAGINATION,
  UPLOAD,
  MESSAGES,
};