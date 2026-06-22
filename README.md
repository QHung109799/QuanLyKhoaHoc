# 📚 QUẢN LÝ KHÓA HỌC - HỆ THỐNG HỌC TẬP TRỰC TUYẾN

![Node.js](https://img.shields.io/badge/Node.js-Express-green)
![React](https://img.shields.io/badge/React-18-blue)
![MySQL](https://img.shields.io/badge/MySQL-8.0-orange)
![TailwindCSS](https://img.shields.shields.io/badge/TailwindCSS-3.x-cyan)

## 🎯 Giới thiệu

Hệ thống quản lý khóa học trực tuyến với đầy đủ tính năng cho Admin, Teacher và Student. Hỗ trợ đa ngôn ngữ, thanh toán trực tuyến, video YouTube , và giao diện responsive.

### ✨ Tính năng nổi bật

- 🔐 **Đăng ký/Đăng nhập** với JWT + Refresh Token
- 👥 **Multi-account:** 1 email có thể tạo nhiều tài khoản (student/teacher)
- 📹 **YouTube Integration:** Xem video trực tiếp trong bài học
- 💳 **Thanh toán:** MoMo, ZaloPay, chuyển khoản ngân hàng
- 🌍 **Đa ngôn ngữ:** Tiếng Việt, English, 中文, 日本語, Deutsch, Français
- 📱 **Responsive:** Hoạt động tốt trên mobile, tablet, desktop
- 🔔 **Thông báo:** Email + In-app notifications
- 💬 **Thảo luận:** Chat theo khóa học

---

## 🚀 Cài đặt nhanh

### Yêu cầu
- Node.js v16+
- MySQL 8.0+
- npm hoặc yarn

### 1. Clone dự án
```bash
git clone https://github.com/QHung109799/QuanLyKhoaHoc.git
cd QuanLyKhoaHoc
```

### 2. Cài đặt dependencies
```bash
# Backend
cd backend
npm install

# Frontend (terminal mới)
cd frontend
npm install
```

### 3. Cấu hình Database
```bash
# Tạo database trong MySQL
mysql -u root -p
CREATE DATABASE quanlykhoahoc;

# Import schema
mysql -u root -p quanlykhoahoc < database/migration.sql
```

### 4. Cấu hình Environment
```bash
# Copy file .env.example → .env trong thư mục backend
cd backend
cp .env.example .env

# Chỉnh sửa file .env với thông tin database và email của bạn
```

### 5. Seed dữ liệu mẫu
```bash
cd backend

# Tạo users mẫu (admin, teacher, student)
node scripts/seed-users.js

# Tạo khóa học mẫu với video YouTube
node scripts/seed-courses.js
```

### 6. Chạy dự án
```bash
# Terminal 1: Backend
cd backend
npm run dev
# → http://localhost:5000

# Terminal 2: Frontend
cd frontend
npm run dev
# → http://localhost:5173
```

---

## 👥 Tài khoản Test

Sau khi chạy seed data, bạn có thể đăng nhập với các tài khoản:

| Email | Password | Vai trò | Mô tả |
|-------|----------|---------|-------|
| admin@example.com | 123456 | Admin | Quản lý toàn bộ hệ thống |
| teacher@example.com | 123456 | Teacher | Tạo và quản lý khóa học |
| student@example.com | 123456 | Student | Học viên, đăng ký khóa học |

**Hoặc đăng ký tài khoản mới** tại http://localhost:5173/register

---

## 📖 Hướng dẫn sử dụng

### 🎓 Dành cho Student

1. **Đăng ký/Đăng nhập**
   - Truy cập http://localhost:5173/register để tạo tài khoản
   - Hoặc đăng nhập với tài khoản test

2. **Khám phá khóa học**
   - V trang chủ hoặc http://localhost:5173/courses
   - Xem danh sách khóa học với thumbnail YouTube
   - Tìm kiếm theo tên khóa học

3. **Đăng ký khóa học**
   - Click vào khóa học để xem chi tiết
   - Click "Học ngay" (miễn phí) hoặc "Đăng ký học" (trả phí)
   - Khóa miễn phí: vào học ngay
   - Khóa trả phí: chuyển đến trang thanh toán

4. **Học tập**
   - Vào khóa học → chọn bài học
   - Xem video YouTube embed
   - Đọc nội dung bài học
   - Tải tài liệu PDF (nếu có)
   - Đánh dấu "Đã học xong"
   - Theo dõi tiến độ học tập

5. **Bài tập & Điểm**
   - Vào tab "Bài tập" trong khóa học
   - Xem deadline, nộp bài
   - Xem điểm và phản hồi từ giảng viên

6. **Thảo luận**
   - Vào tab "Thảo luận" trong khóa học
   - Chat với giảng viên và học viên khác

---

### 👨‍🏫 Dành cho Teacher

1. **Tạo khóa học**
   - Vào Teacher Dashboard
   - Click "Tạo khóa học mới"
   - Điền thông tin: tên, mô tả, giá, danh mục
   - Thêm YouTube URL cho thumbnail

2. **Quản lý bài học**
   - Vào khóa học → tab "Bài học"
   - Thêm bài học mới với video YouTube
   - Upload tài liệu PDF
   - Sắp xếp thứ tự bài học

3. **Theo dõi học viên**
   - Xem danh sách học viên đăng ký
   - Theo dõi tiến độ học tập
   - Chấm điểm bài tập

---

### 👨‍💼 Dành cho Admin

1. **Quản lý Users**
   - Xem danh sách tất cả users
   - Tìm kiếm, cập nhật thông tin
   - Phân quyền (admin/teacher/student)

2. **Quản lý Courses**
   - Xem tất cả khóa học
   - Phê duyệt khóa học mới
   - Xóa khóa học vi phạm

3. **Quản lý Payments**
   - Xem lịch sử thanh toán
   - Thống kê doanh thu

4. **Thống kê**
   - Số lượng users, courses, enrollments
   - Doanh thu theo thời gian

---

## 🛠️ Công nghệ sử dụng

### Backend
- **Node.js** + **Express.js** - REST API
- **MySQL** + **Sequelize ORM** - Database
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **Nodemailer** - Email service
- **Multer** - File upload

### Frontend
- **React 18** - UI Library
- **Vite** - Build tool
- **TailwindCSS** - Styling
- **React Router** - Routing
- **React i18next** - Multi-language
- **React Hot Toast** - Notifications
- **React Icons** - Icon library

---

## 📂 Cấu trúc dự án

```
QuanLyKhoaHoc/
├── backend/
│   ├── src/
│   │   ├── controllers/          # Xử lý request/response
│   │   │   ├── authController.js
│   │   │   ├── courseController.js
│   │   │   ├── lessonController.js
│   │   │   ├── userController.js
│   │   │   └── ...
│   │   ├── models/               # Database models
│   │   │   ├── User.js
│   │   │   ├── Course.js
│   │   │   ├── Lesson.js
│   │   │   └── ...
│   │   ├── routes/               # API routes
│   │   │   ├── authRoutes.js
│   │   │   ├── courseRoutes.js
│   │   │   └── ...
│   │   ├── services/             # Business logic
│   │   │   ├── authService.js
│   │   │   ├── courseService.js
│   │   │   └── ...
│   │   ├── middleware/           # Auth, validation
│   │   │   ├── authMiddleware.js
│   │   │   └── uploadMiddleware.js
│   │   ├── utils/                # Helpers
│   │   │   └── emailService.js
│   │   └── config/
│   │       └── database.js
│   ├── scripts/
│   │   ├── seed-users.js         # Tạo users mẫu
│   │   └── seed-courses.js       # Tạo courses mẫu
│   └── uploads/                  # Uploaded files
│
├── frontend/
│   ├── src/
│   │   ├── pages/                # Page components
│   │   │   ├── auth/
│   │   │   │   ├── LoginPage.jsx
│   │   │   │   ├── RegisterPage.jsx
│   │   │   │   └── ForgotPasswordPage.jsx
│   │   │   ├── course/
│   │   │   │   ├── CourseListPage.jsx
│   │   │   │   ├── CourseDetailPage.jsx
│   │   │   │   └── CreateCoursePage.jsx
│   │   │   ├── lesson/
│   │   │   │   └── LessonPage.jsx
│   │   │   ├── dashboard/
│   │   │   │   ├── AdminDashboard.jsx
│   │   │   │   ├── TeacherDashboard.jsx
│   │   │   │   └── StudentDashboard.jsx
│   │   │   └── ...
│   │   ├── components/           # Reusable components
│   │   │   ├── layout/
│   │   │   └── common/
│   │   ├── services/
│   │   │   └── api.js            # API calls
│   │   ├── context/
│   │   │   └── AuthContext.jsx   # Auth state
│   │   └── i18n/                 # Translations
│   │       └── index.js
│   └── public/
│
├── database/
│   └── migration.sql             # Database schema
│
├── README.md
├── GUIDE.md                      # Hướng dẫn chi tiết
├── API_TEST_GUIDE.md             # Hướng dẫn test API
├── docker-compose.yml
└── Dockerfile
```

---

## 🔑 Tính năng đã hoàn thành

### ✅ Authentication & Authorization
- [x] Đăng ký tài khoản (Student/Teacher/Admin)
- [x] Đăng nhập với JWT
- [x] Quên mật khẩu (OTP qua email)
- [x] Reset mật khẩu
- [x] Multi-account (1 email - nhiều role)
- [x] Refresh token tự động

### ✅ Course Management
- [x] Tạo khóa học với YouTube URL
- [x] Xem danh sách khóa học
- [x] Tìm kiếm khóa học
- [x] Chi tiết khóa học với tabs
- [x] Đăng ký khóa học (miễn phí/trả phí)
- [x] YouTube thumbnail tự động
- [x] YouTube video embed trong bài học

### ✅ Lesson Management
- [x] Tạo bài học với video YouTube
- [x] Upload tài liệu PDF
- [x] Danh sách bài học với progress bar
- [x] Đánh dấu hoàn thành
- [x] Navigation bài trước/sau

### ✅ Payment System
- [x] Thanh toán MoMo
- [x] Thanh toán ZaloPay
- [x] Chuyển khoản ngân hàng
- [x] Lịch sử thanh toán
- [x] Webhook xác nhận

### ✅ Assignment & Grades
- [x] Tạo bài tập
- [x] Nộp bài tập
- [x] Chấm điểm
- [x] Phản hồi chi tiết

### ✅ Communication
- [x] Thảo luận theo khóa học
- [x] Thông báo email
- [x] Thông báo in-app
- [x] Đa ngôn ngữ (6 ngôn ngữ)

### ✅ UI/UX
- [x] Responsive design
- [x] Dark/Light mode ready
- [x] Loading states
- [x] Error handling
- [x] Toast notifications

---

## 🚧 Tính năng đang phát triển

- [ ] Chat real-time với WebSocket
- [ ] Upload video trực tiếp (FFmpeg)
- [ ] Certificate hoàn thành khóa học
- [ ] Gamification (badge, điểm thưởng, leaderboard)
- [ ] Review & Rating khóa học
- [ ] Live streaming
- [ ] Mobile app (React Native)

---

## 🐛 Troubleshooting

### Backend không chạy
```bash
# Kiểm tra MySQL đang chạy
# Kiểm tra file .env
# Chạy lại seed data
node scripts/seed-users.js
node scripts/seed-courses.js
```

### Frontend lỗi
```bash
# Xóa cache và cài lại
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Email không gửi
- Kiểm tra Gmail SMTP credentials trong `.env`
- Bật "Less secure app access" hoặc dùng App Password
- Kiểm tra firewall/antivirus

### Video YouTube không hiển thị
- Đảm bảo URL đúng format: `https://www.youtube.com/watch?v=VIDEO_ID`
- Video phải là public
- Một số video bị hạn chế embed

---

## 📚 Tài liệu tham khảo

- **Hướng dẫn chi tiết:** Xem file [GUIDE.md](GUIDE.md)
- **API Testing Guide:** Xem file [API_TEST_GUIDE.md](API_TEST_GUIDE.md)
- **Database Schema:** Xem file [database/migration.sql](database/migration.sql)

---

## 🤝 Đóng góp

1. Fork dự án
2. Tạo branch mới (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Mở Pull Request

---

## 📞 Liên hệ

- **GitHub:** [@QHung109799](https://github.com/QHung109799/QuanLyKhoaHoc)
- **Email:** hung109799@donga.edu.vn
- **Project Link:** https://github.com/QHung109799/QuanLyKhoaHoc

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

## 🙏 Cảm ơn

- [React](https://reactjs.org/) - UI Library
- [TailwindCSS](https://tailwindcss.com/) - CSS Framework
- [Express.js](https://expressjs.com/) - Web Framework
- [Sequelize](https://sequelize.org/) - ORM
- [Vite](https://vitejs.dev/) - Build Tool

---

## ⭐ Star nếu bạn thấy hữu ích!

Nếu dự án này hữu ích cho bạn, hãy cho một ⭐ trên GitHub để ủng hộ!

---

**Phiên bản:** 1.0.0  
**Cập nhật lần cuối:** 22/06/2026