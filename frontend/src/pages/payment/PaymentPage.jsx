import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  HiOutlineCreditCard, HiOutlineCurrencyDollar, HiOutlineCash,
  HiOutlineArrowLeft, HiOutlineExternalLink, HiOutlineCheckCircle,
  HiOutlineXCircle, HiOutlineShoppingCart
} from 'react-icons/hi';
import api from '../../services/api';
import toast from 'react-hot-toast';

const paymentMethods = [
  { id: 'momo', name: 'MoMo', icon: HiOutlineCash, color: 'bg-pink-500', description: 'Thanh toán qua ví MoMo' },
  { id: 'vnpay', name: 'VNPay', icon: HiOutlineCreditCard, color: 'bg-blue-500', description: 'Thanh toán qua VNPay (QR / ATM)' },
  { id: 'bank', name: 'Chuyển khoản ngân hàng', icon: HiOutlineCurrencyDollar, color: 'bg-green-500', description: 'Chuyển khoản trực tiếp đến tài khoản ngân hàng' },
];

export default function PaymentPage() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loadingCourse, setLoadingCourse] = useState(true);
  const [selectedMethod, setSelectedMethod] = useState('');
  const [loading, setLoading] = useState(false);
  const [paymentResult, setPaymentResult] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await api.get(`/courses/${courseId}`);
        setCourse(res.data.data);
      } catch (err) {
        toast.error('Không thể tải thông tin khóa học');
        navigate('/courses');
      } finally {
        setLoadingCourse(false);
      }
    };
    fetchCourse();
  }, [courseId, navigate]);

  const handlePayment = async () => {
    if (!selectedMethod) return toast.error('Vui lòng chọn phương thức thanh toán');
    setLoading(true);
    try {
      const res = await api.post('/payments/create', { courseId, method: selectedMethod });
      const payment = res.data.data;

      if (payment?.paymentUrl) {
        // Redirect to payment gateway (MoMo / VNPay)
        window.location.href = payment.paymentUrl;
      } else {
        // Simulated success (for testing without real gateway)
        setPaymentResult({ success: true, transactionId: payment.transactionId, message: 'Tạo giao dịch thành công!' });
        toast.success('Tạo giao dịch thành công!');
      }
    } catch (err) {
      setPaymentResult({ success: false, message: err.response?.data?.message || 'Thanh toán thất bại' });
      toast.error(err.response?.data?.message || 'Thanh toán thất bại');
    } finally {
      setLoading(false);
    }
  };

  if (loadingCourse) {
    return (
      <div className="flex justify-center py-20">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!course) return null;

  // Show payment result screen
  if (paymentResult) {
    return (
      <div className="max-w-lg mx-auto text-center">
        <div className={`card py-12 ${paymentResult.success ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
          {paymentResult.success ? (
            <>
              <HiOutlineCheckCircle className="w-20 h-20 text-green-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-green-700 mb-2">Thanh toán thành công!</h2>
              <p className="text-green-600 mb-1">Giao dịch: {paymentResult.transactionId}</p>
              <p className="text-gray-500 text-sm mb-6">Bạn có thể bắt đầu học ngay bây giờ.</p>
              <div className="flex justify-center gap-3">
                <button onClick={() => navigate(`/courses/${courseId}/lessons/${course.courseLessons?.[0]?.id}`)} className="btn-primary">
                  Bắt đầu học
                </button>
                <button onClick={() => navigate('/dashboard')} className="btn-secondary">
                  Về Dashboard
                </button>
              </div>
            </>
          ) : (
            <>
              <HiOutlineXCircle className="w-20 h-20 text-red-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-red-700 mb-2">Thanh toán thất bại</h2>
              <p className="text-red-600 mb-6">{paymentResult.message}</p>
              <div className="flex justify-center gap-3">
                <button onClick={() => setPaymentResult(null)} className="btn-primary">
                  Thử lại
                </button>
                <button onClick={() => navigate('/dashboard')} className="btn-secondary">
                  Về Dashboard
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-gray-500 hover:text-gray-700 mb-4 transition-colors">
        <HiOutlineArrowLeft className="w-5 h-5" /> Quay lại
      </button>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Thanh toán khóa học</h1>

      {/* Course Info */}
      <div className="card mb-6">
        <div className="flex items-start gap-4">
          <div className="w-20 h-20 bg-gradient-to-br from-primary-100 to-accent-50 rounded-xl flex-shrink-0 flex items-center justify-center text-3xl">
            📚
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900 text-lg truncate">{course.title}</h3>
            <p className="text-sm text-gray-500 mt-1 line-clamp-2">{course.description}</p>
            <div className="flex items-center gap-3 mt-2">
              <span className="badge">{course.level}</span>
              {course.isFree ? (
                <span className="badge-success">Miễn phí</span>
              ) : (
                <span className="text-lg font-bold text-primary-600">{Number(course.price).toLocaleString()}₫</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="card mb-6">
        <h3 className="font-semibold text-gray-900 mb-1">Chọn phương thức thanh toán</h3>
        <p className="text-sm text-gray-500 mb-4">Chọn một trong các phương thức dưới đây</p>
        <div className="space-y-3">
          {paymentMethods.map((method) => (
            <button
              key={method.id}
              onClick={() => setSelectedMethod(method.id)}
              className={`w-full flex items-center p-4 rounded-xl border-2 transition-all ${
                selectedMethod === method.id
                  ? 'border-primary-500 bg-primary-50 shadow-sm'
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              }`}
            >
              <div className={`w-12 h-12 ${method.color} rounded-xl flex items-center justify-center mr-4 flex-shrink-0`}>
                <method.icon className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1 text-left">
                <span className="font-semibold text-gray-900 block">{method.name}</span>
                <span className="text-sm text-gray-500">{method.description}</span>
              </div>
              {selectedMethod === method.id && (
                <span className="w-6 h-6 bg-primary-500 text-white rounded-full flex items-center justify-center flex-shrink-0 ml-2">
                  <HiOutlineCheckCircle className="w-4 h-4" />
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Action */}
      <div className="card bg-gray-50 border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <span className="text-gray-600">Tổng thanh toán:</span>
          <span className="text-2xl font-bold text-primary-600">
            {course.isFree ? '0₫' : `${Number(course.price).toLocaleString()}₫`}
          </span>
        </div>
        <button
          onClick={handlePayment}
          disabled={loading || !selectedMethod}
          className="btn-primary w-full flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
              Đang xử lý...
            </>
          ) : (
            <>
              <HiOutlineShoppingCart className="w-5 h-5" />
              Xác nhận thanh toán
            </>
          )}
        </button>
        {!selectedMethod && (
          <p className="text-xs text-gray-400 text-center mt-2">Vui lòng chọn phương thức thanh toán</p>
        )}
      </div>
    </div>
  );
}
