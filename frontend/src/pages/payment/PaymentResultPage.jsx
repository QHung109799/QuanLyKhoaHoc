import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { HiOutlineCheckCircle, HiOutlineXCircle, HiOutlineArrowLeft } from 'react-icons/hi';
import api from '../../services/api';

export default function PaymentResultPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState('processing');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const transactionId = searchParams.get('transactionId');
    const resultStatus = searchParams.get('status'); // 'success' or 'failed'

    if (!transactionId) {
      setStatus('error');
      setMessage('Thiếu thông tin giao dịch');
      return;
    }

    if (resultStatus === 'success') {
      setStatus('success');
      setMessage('Thanh toán của bạn đã được xác nhận thành công!');
    } else if (resultStatus === 'failed') {
      setStatus('failed');
      setMessage('Thanh toán không thành công. Vui lòng thử lại.');
    } else {
      // Call backend to verify if needed
      setStatus('success');
      setMessage('Giao dịch đã được xử lý.');
    }
  }, [searchParams]);

  return (
    <div className="max-w-lg mx-auto text-center py-12">
      {status === 'processing' ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
        </div>
      ) : (
        <>
          <button onClick={() => navigate('/dashboard')} className="flex items-center gap-1 text-gray-500 hover:text-gray-700 mb-6 transition-colors">
            <HiOutlineArrowLeft className="w-5 h-5" /> Về Dashboard
          </button>

          <div className={`card py-12 ${status === 'success' ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
            {status === 'success' ? (
              <>
                <HiOutlineCheckCircle className="w-24 h-24 text-green-500 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-green-700 mb-2">Thanh toán thành công!</h2>
                <p className="text-green-600 mb-2">{message}</p>
                <p className="text-gray-400 text-sm mb-8">
                  Mã giao dịch: {searchParams.get('transactionId') || 'N/A'}
                </p>
                <div className="flex justify-center gap-3">
                  <button onClick={() => navigate('/dashboard')} className="btn-primary">
                    Về Dashboard
                  </button>
                  <button onClick={() => navigate('/courses')} className="btn-secondary">
                    Khám phá thêm khóa học
                  </button>
                </div>
              </>
            ) : status === 'failed' ? (
              <>
                <HiOutlineXCircle className="w-24 h-24 text-red-500 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-red-700 mb-2">Thanh toán thất bại</h2>
                <p className="text-red-600 mb-8">{message}</p>
                <div className="flex justify-center gap-3">
                  <button onClick={() => navigate(-1)} className="btn-primary">
                    Thử lại
                  </button>
                  <button onClick={() => navigate('/dashboard')} className="btn-secondary">
                    Về Dashboard
                  </button>
                </div>
              </>
            ) : (
              <>
                <HiOutlineXCircle className="w-24 h-24 text-orange-500 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-orange-700 mb-2">Có lỗi xảy ra</h2>
                <p className="text-orange-600 mb-8">{message}</p>
                <button onClick={() => navigate('/dashboard')} className="btn-primary">
                  Về Dashboard
                </button>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}