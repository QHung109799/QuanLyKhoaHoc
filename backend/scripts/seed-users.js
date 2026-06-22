/**
 * Seed Users Script
 * 
 * Tạo users mới với password đã được hash đúng bằng bcrypt.
 * Chạy: node scripts/seed-users.js
 * 
 * Users được tạo:
 *   - admin@example.com / admin123 (admin)
 *   - teacher@example.com / 123456 (teacher)
 *   - student@example.com / 123456 (student)
 */

const bcrypt = require('bcryptjs');
const { sequelize } = require('../src/config/database');
const { User } = require('../src/models');

const seedUsers = async () => {
  try {
    await sequelize.authenticate();
    console.log('[Seed] Database connected');

    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash('123456', salt);
    const adminPassword = await bcrypt.hash('admin123', salt);

    // Xóa users cũ (nếu có)
    await User.destroy({ where: { email: ['admin@example.com', 'teacher@example.com', 'student@example.com'] } });

    // Tạo users mới
    const users = await User.bulkCreate([
      {
        name: 'Admin',
        email: 'admin@example.com',
        password: adminPassword,
        role: 'admin',
        emailVerified: true,
        language: 'vi'
      },
      {
        name: 'Giảng viên A',
        email: 'teacher@example.com',
        password: hashedPassword,
        role: 'teacher',
        emailVerified: true,
        language: 'vi'
      },
      {
        name: 'Sinh viên A',
        email: 'student@example.com',
        password: hashedPassword,
        role: 'student',
        emailVerified: true,
        language: 'vi'
      }
    ]);

    console.log(`[Seed] Created ${users.length} users successfully!`);
    console.log('  - admin@example.com / admin123');
    console.log('  - teacher@example.com / 123456');
    console.log('  - student@example.com / 123456');

    await sequelize.close();
    process.exit(0);
  } catch (error) {
    console.error('[Seed] Error:', error.message);
    process.exit(1);
  }
};

seedUsers();