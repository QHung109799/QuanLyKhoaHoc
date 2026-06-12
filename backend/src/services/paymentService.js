const { Payment, Enrollment, Course } = require('../models');
const crypto = require('crypto');

const createPayment = async (userId, courseId, method) => {
  const course = await Course.findByPk(courseId);
  if (!course) throw new Error('Khóa học không tồn tại');
  if (course.isFree) throw new Error('Khóa học miễn phí không cần thanh toán');

  const transactionId = 'TXN' + Date.now() + crypto.randomBytes(4).toString('hex').toUpperCase();
  const payment = await Payment.create({
    userId, courseId, amount: course.price, method, transactionId, status: 'pending'
  });
  return payment;
};

const processPaymentCallback = async (transactionId, status) => {
  const payment = await Payment.findOne({ where: { transactionId } });
  if (!payment) throw new Error('Giao dịch không tồn tại');

  payment.status = status === 'success' ? 'success' : 'failed';
  await payment.save();

  if (status === 'success') {
    await Enrollment.update(
      { paymentStatus: 'paid', status: 'active' },
      { where: { userId: payment.userId, courseId: payment.courseId } }
    );
  }
  return payment;
};

const getPaymentHistory = async (userId) => {
  return await Payment.findAll({
    where: { userId },
    include: [{ model: Course, as: 'course', attributes: ['id', 'title', 'thumbnail'] }],
    order: [['created_at', 'DESC']]
  });
};

module.exports = { createPayment, processPaymentCallback, getPaymentHistory };