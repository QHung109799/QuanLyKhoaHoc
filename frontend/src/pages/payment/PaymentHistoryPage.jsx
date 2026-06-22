import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { HiOutlineClock, HiOutlineCheckCircle, HiOutlineXCircle, HiOutlineRefresh, HiOutlineArrowLeft } from 'react-icons/hi';
import api from '../../services/api';

const statusConfig = {
  pending: { label: 'Chờ xử lý', color: 'bg-yellow-100 text-yellow-800', icon: HiOutlineClock },
  success: { label: 'Thành công', color: 'bg-green-100 text-green-800', icon: HiOutlineCheckCircle },
  failed: { label: 'Thất bại', color: 'bg-red-100 text-red-800', icon: HiOutlineXCircle },
  refunded: { label: 'Đã hoàn tiền', color: 'bg-blue-100 text-blue-800', icon: HiOutlineRefresh },
};

export default function PaymentHistoryPage() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await api.get('/payments/history');
        setPayments(res.data.data);
      } catch (err) {
        console.error('Failed to load payment history:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <Link to="/dashboard" className="flex items-center gap-1 text-gray-500 hover:text-gray-700 mb-4 transition-colors">
        <HiOutlineArrowLeft className="w-5 h-5" /> Về Dashboard
      </Link>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Lịch sử giao dịch</h1>

      {payments.length === 0 ? (
        <div className="card text-center py-12">
          <div className="text-5xl mb-4">💳</div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Chưa có giao dịch nào</h3>
          <p className="text-gray-500 mb-6">Bạn chưa thực hiện giao dịch thanh toán nào.</p>
          <Link to="/courses" className="btn-primary inline-block">
            Khám phá khóa học
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {payments.map((payment) => {
            const config = statusConfig[payment.status] || statusConfig.pending;
            const StatusIcon = config.icon;

            return (
              <div key={payment.id} className="card hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-gray-900 truncate">
                        {payment.course?.title || `Khóa học #${payment.courseId}`}
                      </h3>
                      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
                        <StatusIcon className="w-3.5 h-3.5" />
                        {config.label}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-500">
                      <span>Mã GD: <span className="font-mono text-gray-700">{payment.transactionId}</span></span>
                      <span>PP: <span className="font-medium text-gray-700 uppercase">{payment.method}</span></span>
                      <span>
                        {new Date(payment.created_at).toLocaleDateString('vi-VN', {
                          year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
                        })}
                      </span>
                    </div>
                  </div>
                  <div className="text-right ml-4 flex-shrink-0">
                    <p className={`text-lg font-bold ${payment.status === 'success' ? 'text-green-600' : payment.status === 'failed' ? 'text-red-600' : 'text-gray-600'}`}>
                      {Number(payment.amount).toLocaleString()}₫
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}