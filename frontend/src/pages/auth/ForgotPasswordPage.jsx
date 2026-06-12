import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import api from '../../services/api';
import toast from 'react-hot-toast';

/**
 * ForgotPasswordPage
 * 
 * Flow:
 * 1. Nhập email → gửi mã OTP
 * 2. Nhập mã OTP 6 chữ số → xác thực
 * 3. Nhận resetToken → chuyển sang trang đặt mật khẩu mới
 */
export default function ForgotPasswordPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  // Flow states: 'email' | 'otp' | 'done'
  const [step, setStep] = useState('email');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);

  /** Bước 1: Gửi mã OTP qua email */
  const handleSendOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/auth/forgot-password', { email });
      toast.success('Mã OTP đã được gửi đến email của bạn!');
      setStep('otp');
      startResendCooldown();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Có lỗi xảy ra');
    } finally {
      setLoading(false);
    }
  };

  /** Bước 2: Xác thực mã OTP */
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (otp.length !== 6) {
      return toast.error('Vui lòng nhập mã OTP 6 chữ số');
    }
    setLoading(true);
    try {
      const res = await api.post('/auth/verify-otp', { email, otp });
      const resetToken = res.data?.data?.resetToken;
      if (resetToken) {
        toast.success('Xác thực OTP thành công!');
        // Chuyển sang trang đặt mật khẩu mới với resetToken
        navigate(`/reset-password/${resetToken}`);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Mã OTP không đúng hoặc đã hết hạn');
    } finally {
      setLoading(false);
    }
  };

  /** Gửi lại mã OTP */
  const handleResendOtp = async () => {
    if (resendCooldown > 0) return;
    setLoading(true);
    try {
      await api.post('/auth/forgot-password', { email });
      toast.success('Đã gửi lại mã OTP!');
      startResendCooldown();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Có lỗi xảy ra');
    } finally {
      setLoading(false);
    }
  };

  /** Đếm ngược 60s khi gửi lại OTP */
  const startResendCooldown = () => {
    setResendCooldown(60);
    const interval = setInterval(() => {
      setResendCooldown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  /** Bước 3: Hiển thị thông báo thành công */
  if (step === 'done') {
    return (
      <div className="text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">Đặt lại mật khẩu thành công!</h2>
        <Link to="/login" className="btn-primary inline-block mt-4">{t('auth.login')}</Link>
      </div>
    );
  }

  /** Form nhập mã OTP */
  if (step === 'otp') {
    return (
      <form onSubmit={handleVerifyOtp} className="space-y-5">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Nhập mã OTP</h2>
          <p className="text-gray-500 text-sm mt-1">
            Mã OTP 6 chữ số đã được gửi đến <strong className="text-gray-700">{email}</strong>
          </p>
        </div>

        {/* Hiển thị ô nhập OTP */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Mã OTP</label>
          <input
            type="text"
            value={otp}
            onChange={(e) => {
              const val = e.target.value.replace(/\D/g, '').slice(0, 6);
              setOtp(val);
            }}
            className="input-field text-center text-2xl tracking-[0.5em] font-mono"
            placeholder="000000"
            maxLength={6}
            autoFocus
            required
          />
          <p className="text-xs text-gray-400 mt-1.5 text-center">Nhập mã 6 chữ số từ email</p>
        </div>

        <button type="submit" disabled={loading || otp.length !== 6} className="btn-primary w-full">
          {loading ? t('common.loading') : 'Xác nhận OTP'}
        </button>

        {/* Gửi lại OTP */}
        <div className="text-center">
          {resendCooldown > 0 ? (
            <p className="text-sm text-gray-400">
              Gửi lại sau {resendCooldown}s
            </p>
          ) : (
            <button
              type="button"
              onClick={handleResendOtp}
              disabled={loading}
              className="text-sm text-primary-600 hover:text-primary-700 font-medium"
            >
              Gửi lại mã OTP
            </button>
          )}
        </div>

        <p className="text-center text-sm text-gray-500">
          <button
            type="button"
            onClick={() => { setStep('email'); setOtp(''); }}
            className="text-primary-600 font-medium hover:text-primary-700"
          >
            ← Quay lại nhập email
          </button>
        </p>
      </form>
    );
  }

  /** Form nhập email (bước đầu) */
  return (
    <form onSubmit={handleSendOtp} className="space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">{t('auth.forgotPassword')}</h2>
        <p className="text-gray-500 text-sm mt-1">Nhập email để nhận mã OTP đặt lại mật khẩu</p>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">{t('auth.email')}</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input-field"
          placeholder="your@email.com"
          autoFocus
          required
        />
      </div>
      <button type="submit" disabled={loading} className="btn-primary w-full">
        {loading ? t('common.loading') : 'Gửi mã OTP'}
      </button>
      <p className="text-center text-sm text-gray-500">
        <Link to="/login" className="text-primary-600 font-medium hover:text-primary-700">
          Quay lại đăng nhập
        </Link>
      </p>
    </form>
  );
}