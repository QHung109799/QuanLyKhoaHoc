import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { HiOutlineUsers, HiOutlineBookOpen, HiOutlineCash, HiOutlineTrendingUp } from 'react-icons/hi';
import api from '../../services/api';

export default function AdminDashboard() {
  const { t } = useTranslation();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [usersRes, coursesRes] = await Promise.all([
          api.get('/users?limit=1'),
          api.get('/courses?limit=1'),
        ]);
        setStats({
          totalUsers: usersRes.data.data.total || 0,
          totalCourses: coursesRes.data.data.total || 0,
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const statCards = [
    { label: 'Tổng người dùng', value: stats?.totalUsers || 0, icon: HiOutlineUsers, color: 'bg-blue-500' },
    { label: 'Tổng khóa học', value: stats?.totalCourses || 0, icon: HiOutlineBookOpen, color: 'bg-green-500' },
    { label: 'Doanh thu', value: '0₫', icon: HiOutlineCash, color: 'bg-yellow-500' },
    { label: 'Học viên mới', value: '0', icon: HiOutlineTrendingUp, color: 'bg-purple-500' },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">{t('dashboard.title')} Admin</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((card, idx) => (
          <div key={idx} className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">{card.label}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{card.value}</p>
              </div>
              <div className={`w-12 h-12 ${card.color} rounded-xl flex items-center justify-center`}>
                <card.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="font-semibold text-gray-900 mb-4">Quản lý nhanh</h3>
          <div className="space-y-3">
            <Link to="/courses" className="block p-3 bg-gray-50 rounded-lg hover:bg-primary-50 transition-colors">
              <span className="font-medium text-gray-700">📚 Quản lý khóa học</span>
            </Link>
            <Link to="/profile" className="block p-3 bg-gray-50 rounded-lg hover:bg-primary-50 transition-colors">
              <span className="font-medium text-gray-700">👤 Quản lý người dùng</span>
            </Link>
            <Link to="/grades" className="block p-3 bg-gray-50 rounded-lg hover:bg-primary-50 transition-colors">
              <span className="font-medium text-gray-700">📊 Xem thống kê</span>
            </Link>
          </div>
        </div>
        <div className="card">
          <h3 className="font-semibold text-gray-900 mb-4">Hoạt động gần đây</h3>
          <p className="text-gray-500 text-sm">Chưa có hoạt động nào.</p>
        </div>
      </div>
    </div>
  );
}