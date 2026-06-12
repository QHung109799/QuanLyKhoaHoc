# QUẢN LÝ KHÓA HỌC

## 🎯 Mục tiêu

Xây dựng website quản lý khóa học với các chức năng:

- Đăng nhập, đăng ký, quên mật khẩu, reset mật khẩu
- Gửi mail xác nhận, thông báo tự động
- CRUD khóa học (tạo, xem, tìm kiếm, cập nhật, xóa)
- Quản lý trang cá nhân, cập nhật thông tin
- Thanh toán qua ví điện tử ngân hàng cho khóa học chuyên sâu
- Một số khóa học miễn phí để thử
- Giao diện thân thiện, đa ngôn ngữ (Việt, Anh, Trung, Nhật, Đức, Pháp)

## 👥 Đối tượng người dùng & phân quyền

- **Admin**: quản lý toàn bộ hệ thống, người dùng, khóa học
- **Giảng viên**: tạo và quản lý khóa học, upload bài giảng, bài tập
- **Sinh viên**: đăng ký, tham gia khóa học, làm bài tập, xem điểm

## 🖥️ Công nghệ

- Frontend: ReactJS + TailwindCSS
- Backend: Node.js (Express)
- Database: MySQL (phpMyAdmin)
- Triển khai: Vercel/Netlify (frontend), Render/Heroku (backend)

## 🎨 Frontend Pages

1. Trang chủ (Home)
2. Đăng ký (Register)
3. Đăng nhập (Login)
4. Quên mật khẩu (Forgot Password)
5. Reset mật khẩu (Reset Password)
6. Dashboard (Admin / Giảng viên / Sinh viên)
7. Danh sách khóa học (Course List)
8. Chi tiết khóa học (Course Detail)
9. Bài học (Lesson)
10. Bài tập (Assignment)
11. Điểm số (Grades)
12. Hồ sơ cá nhân (Profile)
13. Thảo luận/chat (Discussion)
14. Thanh toán (Payment)
15. Thông báo (Notifications)
16. Đa ngôn ngữ (Language Switch)

## ⚙️ Backend APIs

- Auth: register, login, forgot/reset password, email confirm, JWT
- Users: CRUD, update profile, change language
- Courses: CRUD, search, filter, enroll
- Lessons: CRUD, upload video/PDF
- Assignments: CRUD, submit, deadline
- Grades: CRUD, view, feedback
- Payments: ví điện tử ngân hàng, transaction log
- Notifications: email + in-app
- Discussions: chat theo khóa học
- i18n: API đa ngôn ngữ

## 🗄️ Database

- **users**: id, name, email, password, role, avatar, phone, language, created_at
- **courses**: id, title, description, teacher_id, price, is_free, language, created_at
- **enrollments**: id, user_id, course_id, status, payment_status
- **lessons**: id, course_id, title, content, video_url, file_url, created_at
- **assignments**: id, course_id, title, description, deadline, created_at
- **grades**: id, assignment_id, user_id, score, feedback
- **notifications**: id, user_id, type, message, status, created_at
- **payments**: id, user_id, course_id, amount, method, transaction_id, status, created_at
- **discussions**: id, course_id, user_id, message, created_at
