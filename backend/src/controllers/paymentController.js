const paymentService = require('../services/paymentService');

const create = async (req, res) => {
  try {
    const { courseId, method } = req.body;
    const payment = await paymentService.createPayment(req.user.id, courseId, method);
    res.status(201).json({ success: true, message: 'Tạo giao dịch thành công', data: payment });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const callback = async (req, res) => {
  try {
    const { transactionId, status } = req.body;
    const payment = await paymentService.processPaymentCallback(transactionId, status);
    res.json({ success: true, message: 'Cập nhật giao dịch thành công', data: payment });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const history = async (req, res) => {
  try {
    const payments = await paymentService.getPaymentHistory(req.user.id);
    res.json({ success: true, data: payments });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = { create, callback, history };