const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');
const { authenticate } = require('../middleware/authMiddleware');

// POST /api/payments/create - Tạo giao dịch
router.post('/create', authenticate, paymentController.create);

// POST /api/payments/callback - Callback từ cổng thanh toán
router.post('/callback', paymentController.callback);

// GET /api/payments/history - Lịch sử giao dịch
router.get('/history', authenticate, paymentController.history);

module.exports = router;