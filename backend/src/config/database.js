/**
 * Database Configuration
 * 
 * Sequelize connection configuration for MySQL database.
 * Reads environment variables from .env file.
 */

const { Sequelize } = require('sequelize');
const mysql = require('mysql2/promise');
require('dotenv').config();

const DB_NAME = process.env.DB_NAME || 'quanlykhoahoc';
const DB_USER = process.env.DB_USER || 'root';
const DB_PASSWORD = process.env.DB_PASSWORD || '';
const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_PORT = process.env.DB_PORT || 3306;

/**
 * Tạo database nếu chưa tồn tại
 */
const ensureDatabase = async () => {
  try {
    const connection = await mysql.createConnection({
      host: DB_HOST,
      port: DB_PORT,
      user: DB_USER,
      password: DB_PASSWORD
    });
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`);
    await connection.end();
    console.log(`[DB] Database "${DB_NAME}" ensured.`);
  } catch (error) {
    console.warn('[DB] Could not auto-create database:', error.message);
    console.warn('[DB] Please create the database manually or check MySQL connection.');
  }
};

// Create Sequelize instance
const sequelize = new Sequelize(
  DB_NAME,
  DB_USER,
  DB_PASSWORD,
  {
    host: DB_HOST,
    port: DB_PORT,
    dialect: 'mysql',
    logging: process.env.NODE_ENV === 'development' ? console.log : false,
    define: {
      timestamps: true,
      underscored: false,
      freezeTableName: true
    },
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

/**
 * Test database connection
 */
const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('[DB] Database connection established successfully.');
  } catch (error) {
    console.error('[DB] Unable to connect to database:', error.message);
    process.exit(1);
  }
};

module.exports = { sequelize, testConnection, ensureDatabase };
