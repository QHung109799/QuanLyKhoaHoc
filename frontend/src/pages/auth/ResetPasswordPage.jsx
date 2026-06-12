import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import api from '../../services/api';
import toast from 'react-hot-toast';

export default function ResetPasswordPage() {
  const { token } = useParams();
  const { t } = useTranslation();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) return toast.error('Mật khẩu xác nhận không khớp');
    if (password.length < 6) return toast.error('Mật khẩu phải có ít nhất 6 ký tự');
    setLoading(true);
    try {
      await api.post('/auth/reset-password', { token, password });
      setDone(true);
      toast.success('Mật khẩu đã được đặt lại thành công!');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Có lỗi xảy ra');
    } finally {
      setLoading(false);
    }
  };

  if (done) {
    return (
      <div className="text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
        </div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">Đặt lại mật khẩu thành công!</h2>
        <Link to="/login" className="btn-primary inline-block mt-4">{t('auth.login')}</Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">{t('auth.resetPassword')}</h2>
        <p className="text-gray-500 text-sm mt-1">Nhập mật khẩu mới</p>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">{t('auth.password')}</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
          className="input-field" placeholder="••••••••" required />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">{t('auth.confirmPassword')}</label>
        <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
          className="input-field" placeholder="••••••••" required />
      </div>
      <button type="submit" disabled={loading} className="btn-primary w-full">
        {loading ? t('common.loading') : t('auth.resetPassword')}
      </button>
    </form>
  );
}