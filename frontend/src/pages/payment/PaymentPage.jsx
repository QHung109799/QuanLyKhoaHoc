import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { HiOutlineCreditCard, HiOutlineCurrencyDollar, HiOutlineCash } from 'react-icons/hi';
import api from '../../services/api';
import toast from 'react-hot-toast';

const paymentMethods = [
  { id: 'momo', name: 'MoMo', icon: HiOutlineCash, color: 'bg-pink-500' },
  { id: 'vnpay', name: 'VNPay', icon: HiOutlineCreditCard, color: 'bg-blue-500' },
  { id: 'bank', name: 'Chuyển khoản ngân hàng', icon: HiOutlineCurrencyDollar, color: 'bg-green-500' },
];

export default function PaymentPage() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [selectedMethod, setSelectedMethod] = useState('');
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    if (!selectedMethod) return toast.error('Vui lòng chọn phương thức thanh toán');
    setLoading(true);
    try {
      const res = await api.post('/payments/create', { courseId, method: selectedMethod });
      toast.success('Tạo giao dịch thành công!');
      // In production: redirect to payment gateway
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Thanh toán thất bại');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Thanh toán</h1>

      <div className="card mb-6">
        <h3 className="font-semibold text-gray-900 mb-4">Chọn phương thức thanh toán</h3>
        <div className="space-y-3">
          {paymentMethods.map((method) => (
            <button
              key={method.id}
              onClick={() => setSelectedMethod(method.id)}
              className={`w-full flex items-center p-4 rounded-xl border-2 transition-all ${
                selectedMethod === method.id
                  ? 'border-primary-500 bg-primary-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className={`w-10 h-10 ${method.color} rounded-lg flex items-center justify-center mr-4`}>
                <method.icon className="w-5 h-5 text-white" />
              </div>
              <span className="font-medium text-gray-900">{method.name}</span>
              {selectedMethod === method.id && <span className="ml-auto text-primary-600">✓</span>}
            </button>
          ))}
        </div>
      </div>

      <button onClick={handlePayment} disabled={loading || !selectedMethod} className="btn-primary w-full">
        {loading ? 'Đang xử lý...' : 'Xác nhận thanh toán'}
      </button>
    </div>
  );
}