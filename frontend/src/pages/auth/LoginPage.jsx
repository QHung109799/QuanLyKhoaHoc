import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTranslation } from 'react-i18next';
import toast from 'react-hot-toast';

export default function LoginPage() {
  const { login } = useAuth();
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) return toast.error('Vui lòng nhập đầy đủ thông tin');
    setLoading(true);
    try {
      await login(email, password);
      toast.success(t('auth.loginSuccess'));
    } catch (err) {
      toast.error(err.response?.data?.message || 'Đăng nhập thất bại');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">{t('auth.login')}</h2>
        <p className="text-gray-500 text-sm mt-1">Chào mừng bạn trở lại!</p>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">{t('auth.email')}</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
          className="input-field" placeholder="your@email.com" required />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">{t('auth.password')}</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
          className="input-field" placeholder="••••••••" required />
      </div>
      <div className="flex justify-end">
        <Link to="/forgot-password" className="text-sm text-primary-600 hover:text-primary-700 font-medium">
          {t('auth.forgotPassword')}
        </Link>
      </div>
      <button type="submit" disabled={loading} className="btn-primary w-full">
        {loading ? t('common.loading') : t('auth.login')}
      </button>
      <p className="text-center text-sm text-gray-500">
        {t('auth.noAccount')}{' '}
        <Link to="/register" className="text-primary-600 hover:text-primary-700 font-medium">{t('auth.register')}</Link>
      </p>
    </form>
  );
}