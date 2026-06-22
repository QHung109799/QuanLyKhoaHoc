# 📚 HƯỚNG DẪN SỬ DỤNG HỆ THỐNG QUẢN LÝ KHÓA HỌC

## 🚀 Cài đặt & Chạy dự án

### Yêu cầu
- Node.js v16+
- MySQL 8.0+
- npm hoặc yarn

### 1. Clone repository
```bash
git clone https://github.com/QHung109799/QuanLyKhoaHoc.git
cd QuanLyKhoaHoc
```

### 2. Cài đặt Backend
```bash
cd backend
npm install
```

### 3. Cài đặt Frontend
```bash
cd frontend
npm install
```

### 4. Cấu hình Database
- Tạo database `quanlykhoahoc` trong MySQL
- Import file `database/migration.sql`
- Copy `.env.example` → `.env` và điền thông tin database

### 5. Seed dữ liệu mẫu
```bash
# Tạo users mẫu (admin, teacher, student)
cd backend
node scripts/seed-users.js

# Tạo khóa học mẫu với video YouTube
node scripts/seed-courses.js
```

### 6. Chạy Backend
```bash
cd backend
npm run dev
# Backend chạy tại http://localhost:5000
```

### 7. Chạy Frontend (terminal mới)
```bash
cd frontend
npm run dev
# Frontend chạy tại http://localhost:5173
```

---

## 👥 Tài khoản Test

| Email | Password | Role |
|-------|----------|------|
| admin@example.com | 123456 | Admin |
| teacher@example.com | 123456 | Teacher |
| student@example.com | 123456 | Student |

---

## 📖 Hướng dẫn sử dụng

### 1. Đăng ký / Đăng nhập

#### Đăng ký tài khoản mới
- Truy cập http://localhost:5173/register
- Điền thông tin: tên, email, mật khẩu, chức vụ
- **Lưu ý:** 1 email có thể đăng ký nhiều tài khoản với chức vụ khác nhau

#### Đăng nhập
- Truy cập http://localhost:5173/login
- Nhập email và mật khẩu
- Hệ thống sẽ chuyển đến dashboard tương ứng

#### Quên mật khẩu
- Click "Quên mật khẩu" trên trang login
- Nhập email → nhận OTP qua email
- Nếu email có nhiều tài khoản → chọn tài khoản cần reset
- Nhập OTP → đặt mật khẩu mới

---

### 2. Dashboard theo vai trò

#### 👨‍💼 Admin Dashboard
- **Quản lý Users:** Xem, tìm kiếm, cập nhật thông tin người dùng
- **Quản lý Courses:** Xem tất cả khóa học, phê duyệt, xóa
- **Quản lý Payments:** Xem lịch sử thanh toán
- **Thống kê:** Số users, courses, doanh thu

#### 👨‍🏫 Teacher Dashboard
- **Tạo khóa học:** Thêm khóa học mới với YouTube URL
- **Quản lý khóa học:** Sửa, xóa khóa học của mình
- **Thêm bài học:** Upload video, tài liệu PDF
- **Xem danh sách học viên:** Theo dõi tiến độ

#### 🎓 Student Dashboard
- **Khóa học của tôi:** Danh sách khóa học đã đăng ký
- **Tiến độ học tập:** % hoàn thành từng khóa
- **Bài tập & Điểm:** Xem bài tập, nộp bài, xem điểm
- **Lịch sử thanh toán:** Xem các giao dịch đã thanh toán

---

### 3. Khóa học & Bài học

#### Xem danh sách khóa học
- Truy cập http://localhost:5173/courses
- Tìm kiếm theo tên khóa học
- Click vào card để xem chi tiết

#### Chi tiết khóa học
- **Thumbnail:** Hiển thị video YouTube (nếu có)
- **Thông tin:** Giảng viên, số bài học, thời gian, trình độ
- **Tabs:**
  - **Tổng quan:** Mô tả khóa học, danh mục
  - **Bài học:** Danh sách bài học với video
  - **Thảo luận:** Chat với giảng viên và học viên khác

#### Đăng ký khóa học
- Click "Học ngay" (khóa miễn phí) hoặc "Đăng ký học" (khóa trả phí)
- Khóa miễn phí → vào học ngay
- Khóa trả phí → chuyển đến trang thanh toán

#### Học bài
- Vào khóa học → click "Học" trên bài học
- **Video Player:** Xem video YouTube embed
- **Nội dung:** Đọc nội dung bài học
- **Tài liệu:** Download file PDF (nếu có)
- **Tiến độ:** Đánh dấu "Đã học xong"
- **Navigation:** Chuyển bài trước/sau

---

### 4. Thanh toán

#### Phương thức thanh toán
- Ví điện tử (MoMo, ZaloPay)
- Chuyển khoản ngân hàng

#### Quy trình thanh toán
1. Chọn khóa học trả phí
2. Chọn phương thức thanh toán
3. Xác nhận thanh toán
4. Nhận thông báo khi thanh toán thành công
5. Được phép học khóa học

#### Lịch sử thanh toán
- Vào Profile → Payment History
- Xem tất cả giao dịch đã thực hiện

---

### 5. Bài tập & Điểm

#### Nộp bài tập
- Vào khóa học → tab Bài tập
- Xem danh sách bài tập, deadline
- Upload file bài làm
- Xem điểm và phản hồi từ giảng viên

#### Xem điểm
- Vào Grades page
- Xem điểm từng bài tập
- Xem phản hồi chi tiết

---

### 6. Thảo luận

#### Chat theo khóa học
- Vào khóa học → tab Thảo luận
- Gửi tin nhắn cho giảng viên và học viên
- Xem lịch sử chat
- Chỉ học viên đã đăng ký mới tham gia được

---

### 7. Thông báo

#### Nhận thông báo
- **Email:** OTP, reset password, thông báo khóa học
- **In-app:** Bài tập mới, điểm số, thanh toán

#### Quản lý thông báo
- Vào Notifications page
- Đánh dấu đã đọc
- Xóa thông báo

---

### 8. Đa ngôn ngữ

#### Hỗ trợ ngôn ngữ
- 🇻🇳 Tiếng Việt (mặc định)
- 🇬🇧 English
- 🇨🇳 中文
- 🇯🇵 日本語
- 🇩🇪 Deutsch
- 🇫🇷 Français

#### Cách đổi ngôn ngữ
- Click icon 🌐 ở navbar
- Chọn ngôn ngữ mong muốn
- Giao diện tự động chuyển đổi

---

## 🛠️ Cấu trúc dự án

```
QuanLyKhoaHoc/
├── backend/                 # Node.js + Express
│   ├── src/
│   │   ├── controllers/     # Xử lý request/response
│   │   ├── models/          # Sequelize models
│   │   ├── routes/          # API routes
│   │   ├── services/        # Business logic
│   │   ├── middleware/      # Auth, upload, validation
│   │   ├── utils/           # Email service, helpers
│   │   └── config/          # Database, constants
│   ├── scripts/             # Seed data scripts
│   └── uploads/             # Uploaded files
│
├── frontend/                # React + Vite + TailwindCSS
│   ├── src/
│   │   ├── pages/           # Page components
│   │   ├── components/      # Reusable components
│   │   ├── services/        # API calls
│   │   ├── context/         # Auth context
│   │   └── i18n/            # Translations
│   └── public/
│
├── database/
│   └── migration.sql        # Database schema
│
└── README.md
```

---

## 🔑 Tính năng chính

### ✅ Đã hoàn thành
- [x] Đăng ký/Đăng nhập/Quên mật khẩu
- [x] Multi-account (1 email - nhiều tài khoản)
- [x] JWT Authentication + Refresh Token
- [x] CRUD Khóa học với YouTube embed
- [x] Quản lý bài học (video, PDF)
- [x] Đăng ký khóa học (miễn phí/trả phí)
- [x] Thanh toán (MoMo, ZaloPay, ngân hàng)
- [x] Bài tập & Điểm số
- [x] Thảo luận theo khóa học
- [x] Thông báo (email + in-app)
- [x] Đa ngôn ngữ (6 ngôn ngữ)
- [x] Responsive design (mobile-friendly)

### 🚧 Đang phát triển
- [ ] Chat real-time (WebSocket)
- [ ] Upload video trực tiếp (không phải YouTube)
- [ ] Certificate hoàn thành khóa học
- [ ] Gamification (badge, điểm thưởng)
- [ ] Review & Rating khóa học

---

## 🐛 Troubleshooting

### Backend không chạy được
```bash
# Kiểm tra MySQL đã chạy chưa
# Kiểm tra file .env có đúng thông tin database không
# Chạy lại seed scripts
node scripts/seed-users.js
node scripts/seed-courses.js
```

### Frontend không load được
```bash
# Xóa node_modules và cài lại
rm -rf node_modules
npm install
# Restart dev server
npm run dev
```

### Email không gửi được
- Kiểm tra file `.env` có đúng Gmail SMTP credentials không
- Đảm bảo đã bật "Less secure app access" trên Gmail
- Hoặc dùng App Password nếu bật 2FA

### Video YouTube không hiển thị
- Kiểm tra URL YouTube có đúng format không
- Frontend tự động convert watch URL → embed URL
- Một số video bị hạn chế embed → cần dùng video public

---

## 📞 Liên hệ

- **GitHub:** https://github.com/QHung109799/QuanLyKhoaHoc
- **Email:** hung109799@donga.edu.vn

---

## 📄 License

MIT License - Xem file LICENSE để biết thêm chi tiết.

---

## 🙏 Cảm ơn

Cảm ơn bạn đã sử dụng hệ thống quản lý khóa học! Nếu có thắc mắc, vui lòng tạo Issue trên GitHub.