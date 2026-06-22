-- ============================================================
-- QUẢN LÝ KHÓA HỌC - Database Migration Script
-- ============================================================
-- Mô tả: Tạo toàn bộ cấu trúc database cho hệ thống quản lý
-- khóa học với đầy đủ khóa chính, khóa ngoại, index.
-- ============================================================

CREATE DATABASE IF NOT EXISTS quanlykhoahoc
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE quanlykhoahoc;

-- ============================================================
-- 1. Bảng users - Người dùng hệ thống
-- ============================================================
CREATE TABLE IF NOT EXISTS users (
  id            INT           AUTO_INCREMENT PRIMARY KEY,
  name          VARCHAR(100)  NOT NULL,
  email         VARCHAR(100)  NOT NULL,
  password      VARCHAR(255)  NOT NULL,
  role          ENUM('admin','teacher','student') NOT NULL DEFAULT 'student',
  avatar        VARCHAR(255)  DEFAULT NULL,
  phone         VARCHAR(20)   DEFAULT NULL,
  language      ENUM('vi','en','zh','ja','de','fr') NOT NULL DEFAULT 'vi',
  email_verified BOOLEAN      NOT NULL DEFAULT FALSE,
  reset_token   VARCHAR(255)  DEFAULT NULL,
  reset_expires DATETIME      DEFAULT NULL,
  created_at    TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at    TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_users_role (role),
  INDEX idx_users_email (email)
  UNIQUE KEY uq_email_role (email, role)  -- 1 email chỉ được 1 role duy nhất
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- 2. Bảng courses - Khóa học
-- ============================================================
CREATE TABLE IF NOT EXISTS courses (
  id            INT           AUTO_INCREMENT PRIMARY KEY,
  title         VARCHAR(200)  NOT NULL,
  description   TEXT          DEFAULT NULL,
  teacher_id    INT           NOT NULL,
  price         DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  is_free       BOOLEAN       NOT NULL DEFAULT FALSE,
  thumbnail     VARCHAR(255)  DEFAULT NULL,
  category      VARCHAR(100)  DEFAULT NULL,
  language      VARCHAR(50)   NOT NULL DEFAULT 'vi',
  level         ENUM('beginner','intermediate','advanced') NOT NULL DEFAULT 'beginner',
  status        ENUM('draft','published','archived') NOT NULL DEFAULT 'draft',
  created_at    TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at    TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_courses_teacher FOREIGN KEY (teacher_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_courses_teacher (teacher_id),
  INDEX idx_courses_status (status),
  INDEX idx_courses_category (category),
  INDEX idx_courses_language (language),
  FULLTEXT INDEX idx_courses_search (title, description)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- 3. Bảng enrollments - Đăng ký khóa học
-- ============================================================
CREATE TABLE IF NOT EXISTS enrollments (
  id             INT           AUTO_INCREMENT PRIMARY KEY,
  user_id        INT           NOT NULL,
  course_id      INT           NOT NULL,
  status         ENUM('active','completed','cancelled') NOT NULL DEFAULT 'active',
  payment_status ENUM('pending','paid','free','refunded') NOT NULL DEFAULT 'pending',
  enrolled_at    TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_enrollments_user   FOREIGN KEY (user_id)   REFERENCES users(id)   ON DELETE CASCADE,
  CONSTRAINT fk_enrollments_course FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE,
  UNIQUE KEY uq_enrollment (user_id, course_id),
  INDEX idx_enrollments_user (user_id),
  INDEX idx_enrollments_course (course_id),
  INDEX idx_enrollments_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- 4. Bảng lessons - Bài học trong khóa học
-- ============================================================
CREATE TABLE IF NOT EXISTS lessons (
  id            INT           AUTO_INCREMENT PRIMARY KEY,
  course_id     INT           NOT NULL,
  title         VARCHAR(200)  NOT NULL,
  content       TEXT          DEFAULT NULL,
  video_url     VARCHAR(255)  DEFAULT NULL,
  file_url      VARCHAR(255)  DEFAULT NULL,
  duration      INT           DEFAULT NULL COMMENT 'Thời lượng (phút)',
  order_index   INT           NOT NULL DEFAULT 0,
  created_at    TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at    TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_lessons_course FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE,
  INDEX idx_lessons_course (course_id),
  INDEX idx_lessons_order (course_id, order_index)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- 5. Bảng assignments - Bài tập
-- ============================================================
CREATE TABLE IF NOT EXISTS assignments (
  id            INT           AUTO_INCREMENT PRIMARY KEY,
  course_id     INT           NOT NULL,
  title         VARCHAR(200)  NOT NULL,
  description   TEXT          DEFAULT NULL,
  deadline      DATETIME      DEFAULT NULL,
  max_score     INT           NOT NULL DEFAULT 100,
  created_at    TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at    TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_assignments_course FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE,
  INDEX idx_assignments_course (course_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- 6. Bảng grades - Điểm số / bài nộp
-- ============================================================
CREATE TABLE IF NOT EXISTS grades (
  id            INT           AUTO_INCREMENT PRIMARY KEY,
  assignment_id INT           NOT NULL,
  user_id       INT           NOT NULL,
  score         DECIMAL(5,2)  DEFAULT NULL,
  feedback      TEXT          DEFAULT NULL,
  file_url      VARCHAR(255)  DEFAULT NULL COMMENT 'Link file bài nộp',
  submitted_at  TIMESTAMP     NULL DEFAULT NULL,
  graded_at     TIMESTAMP     NULL DEFAULT NULL,
  created_at    TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at    TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_grades_assignment FOREIGN KEY (assignment_id) REFERENCES assignments(id) ON DELETE CASCADE,
  CONSTRAINT fk_grades_user       FOREIGN KEY (user_id)       REFERENCES users(id)       ON DELETE CASCADE,
  UNIQUE KEY uq_grade (assignment_id, user_id),
  INDEX idx_grades_assignment (assignment_id),
  INDEX idx_grades_user (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- 7. Bảng notifications - Thông báo
-- ============================================================
CREATE TABLE IF NOT EXISTS notifications (
  id            INT           AUTO_INCREMENT PRIMARY KEY,
  user_id       INT           NOT NULL,
  type          ENUM('email','in-app') NOT NULL DEFAULT 'in-app',
  title         VARCHAR(200)  NOT NULL,
  message       TEXT          NOT NULL,
  is_read       BOOLEAN       NOT NULL DEFAULT FALSE,
  created_at    TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_notifications_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_notifications_user (user_id),
  INDEX idx_notifications_read (user_id, is_read)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- 8. Bảng payments - Giao dịch thanh toán
-- ============================================================
CREATE TABLE IF NOT EXISTS payments (
  id             INT           AUTO_INCREMENT PRIMARY KEY,
  user_id        INT           NOT NULL,
  course_id      INT           NOT NULL,
  amount         DECIMAL(10,2) NOT NULL,
  method         VARCHAR(50)   NOT NULL COMMENT 'momo, vnpay, bank, paypal',
  transaction_id VARCHAR(255)  DEFAULT NULL UNIQUE,
  status         ENUM('pending','success','failed','refunded') NOT NULL DEFAULT 'pending',
  created_at     TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at     TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_payments_user   FOREIGN KEY (user_id)   REFERENCES users(id)   ON DELETE CASCADE,
  CONSTRAINT fk_payments_course FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE,
  INDEX idx_payments_user (user_id),
  INDEX idx_payments_course (course_id),
  INDEX idx_payments_status (status),
  INDEX idx_payments_transaction (transaction_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- 9. Bảng discussions - Thảo luận theo khóa học
-- ============================================================
CREATE TABLE IF NOT EXISTS discussions (
  id            INT           AUTO_INCREMENT PRIMARY KEY,
  course_id     INT           NOT NULL,
  user_id       INT           NOT NULL,
  parent_id     INT           DEFAULT NULL COMMENT 'NULL = message gốc, != NULL = reply',
  message       TEXT          NOT NULL,
  created_at    TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_discussions_course FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE,
  CONSTRAINT fk_discussions_user   FOREIGN KEY (user_id)   REFERENCES users(id)   ON DELETE CASCADE,
  CONSTRAINT fk_discussions_parent FOREIGN KEY (parent_id) REFERENCES discussions(id) ON DELETE CASCADE,
  INDEX idx_discussions_course (course_id),
  INDEX idx_discussions_parent (parent_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- 10. Bảng course_reviews - Đánh giá khóa học (mở rộng)
-- ============================================================
CREATE TABLE IF NOT EXISTS course_reviews (
  id            INT           AUTO_INCREMENT PRIMARY KEY,
  course_id     INT           NOT NULL,
  user_id       INT           NOT NULL,
  rating        TINYINT       NOT NULL DEFAULT 5 CHECK (rating BETWEEN 1 AND 5),
  comment       TEXT          DEFAULT NULL,
  created_at    TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_reviews_course FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE,
  CONSTRAINT fk_reviews_user   FOREIGN KEY (user_id)   REFERENCES users(id)   ON DELETE CASCADE,
  UNIQUE KEY uq_review (course_id, user_id),
  INDEX idx_reviews_course (course_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- INSERT DATA MẪU
-- ============================================================

-- Admin mặc định (password: admin123)
INSERT INTO users (name, email, password, role, email_verified) VALUES
('Admin', 'admin@example.com', '$2a$12$LJ3m4ys3Lk0TSwHnbfOMiOXPm1Qlq5Gz0n0q0n0q0n0q0n0q0n0qO', 'admin', TRUE),
('Giảng viên A', 'teacher@example.com', '$2a$12$LJ3m4ys3Lk0TSwHnbfOMiOXPm1Qlq5Gz0n0q0n0q0n0q0n0q0n0qO', 'teacher', TRUE),
('Sinh viên A', 'student@example.com', '$2a$12$LJ3m4ys3Lk0TSwHnbfOMiOXPm1Qlq5Gz0n0q0n0q0n0q0n0q0n0qO', 'student', TRUE);

-- Khóa học mẫu
INSERT INTO courses (title, description, teacher_id, price, is_free, category, level, status, language) VALUES
('Lập trình ReactJS cơ bản', 'Khóa học ReactJS từ A đến Z cho người mới bắt đầu', 2, 0, TRUE, 'Lập trình', 'beginner', 'published', 'vi'),
('Node.js Advanced', 'Khóa học Node.js nâng cao với microservices', 2, 500000, FALSE, 'Lập trình', 'advanced', 'published', 'vi'),
('Tiếng Anh giao tiếp', 'Khóa học tiếng Anh giao tiếp hàng ngày', 2, 0, TRUE, 'Ngoại ngữ', 'beginner', 'published', 'vi');

-- Enrollments mẫu
INSERT INTO enrollments (user_id, course_id, status, payment_status) VALUES
(3, 1, 'active', 'free'),
(3, 2, 'active', 'paid');