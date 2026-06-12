/**
 * Upload Middleware
 * 
 * Xử lý upload file (video, PDF, hình ảnh) sử dụng multer.
 * Hỗ trợ nhiều loại file và giới hạn kích thước.
 */

const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure upload directory exists
const uploadDir = process.env.UPLOAD_DIR || 'uploads';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

/**
 * Cấu hình storage cho multer
 * Lưu file vào thư mục uploads với tên duy nhất
 */
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Phân loại thư mục theo loại file
    let subDir = 'others';
    if (file.mimetype.startsWith('image/')) subDir = 'images';
    else if (file.mimetype.startsWith('video/')) subDir = 'videos';
    else if (file.mimetype === 'application/pdf') subDir = 'pdfs';

    const destPath = path.join(uploadDir, subDir);
    if (!fs.existsSync(destPath)) {
      fs.mkdirSync(destPath, { recursive: true });
    }
    cb(null, destPath);
  },
  filename: (req, file, cb) => {
    // Tạo tên file duy nhất: timestamp-randomname.extension
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, uniqueSuffix + ext);
  }
});

/**
 * Filter file theo loại
 */
const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    'image/jpeg', 'image/png', 'image/gif', 'image/webp',
    'video/mp4', 'video/webm', 'video/ogg',
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/zip', 'application/x-zip-compressed'
  ];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error(`Loại file ${file.mimetype} không được hỗ trợ`), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: parseInt(process.env.MAX_FILE_SIZE) || 10 * 1024 * 1024 // 10MB
  }
});

module.exports = upload;