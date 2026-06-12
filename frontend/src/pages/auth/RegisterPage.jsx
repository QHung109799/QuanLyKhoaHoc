import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTranslation } from 'react-i18next';
import toast from 'react-hot-toast';
import { HiOutlineAcademicCap, HiOutlineUserGroup, HiOutlineCog } from 'react-icons/hi';

/**
 * Danh sách vai trò có thể đăng ký
 */
const ROLES = [
  {
    value: 'student',
    label: 'Học sinh',
    description: 'Đăng ký khóa học, làm bài tập, xem điểm',
    icon: HiOutlineUserGroup,
    color: 'bg-blue-500'
  },
  {
    value: 'teacher',
    label: 'Giáo viên',
    description: 'Tạo khóa học, quản lý bài tập, chấm điểm',
    icon: HiOutlineAcademicCap,
    color: 'bg-green-500'
  },
  {
    value: 'admin',
    label: 'Quản lý',
    description: 'Quản trị toàn bộ hệ thống',
    icon: HiOutlineCog,
    color: 'bg-purple-500'
  }
];

export default function RegisterPage() {
  const { register } = useAuth();
  const { t } = useTranslation();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'student'
  });
  const [loading, setLoading] = useState(false);

  /** Cập nhật giá trị form */
  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  /** Xử lý submit form đăng ký */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) {
      return toast.error('Vui lòng nhập đầy đủ thông tin');
    }
    if (form.password !== form.confirmPassword) {
      return toast.error('Mật khẩu xác nhận không khớp');
    }
    if (form.password.length < 6) {
      return toast.error('Mật khẩu phải có ít nhất 6 ký tự');
    }
    setLoading(true);
    try {
      await register({
        name: form.name,
        email: form.email,
        password: form.password,
        role: form.role
      });
      toast.success(t('auth.registerSuccess'));
    } catch (err) {
      toast.error(err.response?.data?.message || 'Đăng ký thất bại');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">{t('auth.register')}</h2>
        <p className="text-gray-500 text-sm mt-1">Tạo tài khoản mới</p>
      </div>

      {/* Chọn vai trò */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Bạn là?</label>
        <div className="grid grid-cols-3 gap-2">
          {ROLES.map((role) => {
            const Icon = role.icon;
            const isSelected = form.role === role.value;
            return (
              <button
                key={role.value}
                type="button"
                onClick={() => handleChange('role', role.value)}
                className={`relative flex flex-col items-center p-3 rounded-xl border-2 transition-all text-center ${
                  isSelected
                    ? 'border-primary-500 bg-primary-50 shadow-sm'
                    : 'border-gray-200 hover:border-gray-300 bg-white'
                }`}
              >
                <div className={`w-10 h-10 ${role.color} rounded-lg flex items-center justify-center mb-2`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <span className={`text-sm font-medium ${isSelected ? 'text-primary-700' : 'text-gray-700'}`}>
                  {role.label}
                </span>
                <span className="text-xs text-gray-400 mt-0.5 leading-tight">{role.description}</span>
                {isSelected && (
                  <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-primary-500 rounded-full flex items-center justify-center">
                    <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Họ tên */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">{t('auth.name')}</label>
        <input
          type="text"
          value={form.name}
          onChange={(e) => handleChange('name', e.target.value)}
          className="input-field"
          placeholder="Nguyễn Văn A"
          required
        />
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">{t('auth.email')}</label>
        <input
          type="email"
          value={form.email}
          onChange={(e) => handleChange('email', e.target.value)}
          className="input-field"
          placeholder="your@email.com"
          required
        />
      </div>

      {/* Mật khẩu */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">{t('auth.password')}</label>
        <input
          type="password"
          value={form.password}
          onChange={(e) => handleChange('password', e.target.value)}
          className="input-field"
          placeholder="••••••••"
          required
        />
      </div>

      {/* Xác nhận mật khẩu */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">{t('auth.confirmPassword')}</label>
        <input
          type="password"
          value={form.confirmPassword}
          onChange={(e) => handleChange('confirmPassword', e.target.value)}
          className="input-field"
          placeholder="••••••••"
          required
        />
      </div>

      <button type="submit" disabled={loading} className="btn-primary w-full">
        {loading ? t('common.loading') : t('auth.register')}
      </button>
      <p className="text-center text-sm text-gray-500">
        {t('auth.hasAccount')}{' '}
        <Link to="/login" className="text-primary-600 hover:text-primary-700 font-medium">{t('auth.login')}</Link>
      </p>
    </form>
  );
}