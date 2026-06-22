/**
 * Seed Courses Script
 *
 * Tạo khóa học mẫu với video YouTube, mô tả đầy đủ.
 * Chạy: node scripts/seed-courses.js
 */

const { sequelize } = require("../src/config/database");
const { Course, Lesson, User } = require("../src/models");

const seedCourses = async () => {
  try {
    await sequelize.authenticate();
    console.log("[Seed] Database connected");

    // Lấy teacher đầu tiên
    const teacher = await User.findOne({ where: { role: "teacher" } });
    if (!teacher) {
      console.error("[Seed] Không tìm thấy teacher. Chạy seed-users.js trước.");
      process.exit(1);
    }

    // Xóa courses cũ của teacher này
    await Course.destroy({ where: { teacherId: teacher.id } });

    // Tạo courses mẫu
    const courses = await Course.bulkCreate([
      {
        title: "Lập trình ReactJS từ A đến Z",
        description: `
          <h2>Giới thiệu khóa học</h2>
          <p>Khóa học ReactJS toàn diện từ cơ bản đến nâng cao. Bạn sẽ học được:</p>
          <ul>
            <li>JSX, Components, Props, State</li>
            <li>React Hooks (useState, useEffect, useContext...)</li>
            <li>Redux Toolkit quản lý state</li>
            <li>React Router, Axios, Form handling</li>
            <li>Deploy lên Vercel/Netlify</li>
          </ul>
          <p>Phù hợp cho người mới bắt đầu lập trình frontend.</p>
        `,
        teacherId: teacher.id,
        price: 0,
        isFree: true,
        thumbnail: "https://www.youtube.com/watch?v=w7ejDZ8SWv8",
        category: "Lập trình",
        level: "beginner",
        status: "published",
        language: "vi",
      },
      {
        title: "Node.js & Express - Xây dựng REST API",
        description: `
          <h2>Xây dựng API chuyên nghiệp với Node.js</h2>
          <p>Khóa học tập trung vào backend development:</p>
          <ul>
            <li>Node.js cơ bản và Event Loop</li>
            <li>Express.js routing, middleware</li>
            <li>MySQL với Sequelize ORM</li>
            <li>JWT Authentication</li>
            <li>Upload file, email, thanh toán</li>
          </ul>
        `,
        teacherId: teacher.id,
        price: 500000,
        isFree: false,
        thumbnail: "https://www.youtube.com/watch?v=Oe421EPjeBE",
        category: "Lập trình",
        level: "intermediate",
        status: "published",
        language: "vi",
      },
      {
        title: "Tiếng Anh giao tiếp cơ bản",
        description: `
          <h2>Nói tiếng Anh tự tin trong 30 ngày</h2>
          <p>Khóa học dành cho người mới bắt đầu:</p>
          <ul>
            <li>Phát âm chuẩn</li>
            <li>Ngữ pháp cơ bản</li>
            <li>Từ vựng thông dụng</li>
            <li>Giao tiếp hàng ngày</li>
          </ul>
        `,
        teacherId: teacher.id,
        price: 0,
        isFree: true,
        thumbnail: "https://youtu.be/Ip7PfYZI83E?si=LRxYITB0YmH6y86t",
        category: "Ngoại ngữ",
        level: "beginner",
        status: "published",
        language: "vi",
      },
    ]);

    console.log(`[Seed] Created ${courses.length} courses`);

    // Tạo lessons cho từng course
    for (const course of courses) {
      const lessons = await Lesson.bulkCreate([
        {
          courseId: course.id,
          title: "Giới thiệu khóa học",
          content:
            "<p>Chào mừng bạn đến với khóa học! Video dưới đây sẽ giới thiệu tổng quan.</p>",
          videoUrl: course.thumbnail,
          duration: 10,
          orderIndex: 1,
        },
        {
          courseId: course.id,
          title: "Bài 1: Các khái niệm cơ bản",
          content:
            "<p>Trong bài này, chúng ta sẽ tìm hiểu các khái niệm nền tảng.</p><p>Hãy xem video và làm bài tập sau khi xem xong.</p>",
          videoUrl: "https://www.youtube.com/watch?v=w7ejDZ8SWv8",
          duration: 15,
          orderIndex: 2,
        },
        {
          courseId: course.id,
          title: "Bài 2: Thực hành",
          content: "<p>Làm bài tập thực hành để củng cố kiến thức.</p>",
          videoUrl: null,
          duration: 20,
          orderIndex: 3,
        },
      ]);

      console.log(
        `[Seed] Course "${course.title}" - ${lessons.length} lessons`,
      );
    }

    console.log("[Seed] Done!");
    await sequelize.close();
    process.exit(0);
  } catch (error) {
    console.error("[Seed] Error:", error.message);
    process.exit(1);
  }
};

seedCourses();
