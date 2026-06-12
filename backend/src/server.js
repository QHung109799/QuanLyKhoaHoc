/**
 * Server Entry Point
 * 
 * Khởi động Express server, kết nối database.
 */

const app = require('./app');
const { sequelize, testConnection, ensureDatabase } = require('./config/database');
require('./models'); // Load models & associations
require('dotenv').config();

const PORT = process.env.PORT || 5000;

/**
 * Khởi động server
 */
const startServer = async () => {
  try {
    // Tạo database nếu chưa tồn tại
    await ensureDatabase();

    // Kiểm tra kết nối database
    await testConnection();

    // Sync database (không force trong production)
    if (process.env.NODE_ENV === 'development') {
      await sequelize.sync({ alter: false });
      console.log('[DB] Database synced');
    }

    // Lắng nghe port
    app.listen(PORT, () => {
      console.log('========================================');
      console.log(`  Server: http://localhost:${PORT}`);
      console.log(`  API:    http://localhost:${PORT}/api`);
      console.log(`  Env:    ${process.env.NODE_ENV || 'development'}`);
      console.log('========================================');
    });
  } catch (error) {
    console.error('[Server] Failed to start:', error.message);
    process.exit(1);
  }
};

startServer();
