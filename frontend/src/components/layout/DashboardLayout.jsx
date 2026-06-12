import { Outlet, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTranslation } from 'react-i18next';
import { HiOutlineHome, HiOutlineBookOpen, HiOutlineClipboardList, HiOutlineChartBar, HiOutlineUser, HiOutlineChat, HiOutlineBell, HiOutlineLogout, HiOutlineMenu, HiOutlineX, HiOutlineCreditCard } from 'react-icons/hi';
import { useState } from 'react';

const SidebarLink = ({ to, icon: Icon, label, onClick }) => {
  const location = useLocation();
  const isActive = location.pathname === to || location.pathname.startsWith(to + '/');
  return (
    <Link
      to={to}
      onClick={onClick}
      className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
        isActive
          ? 'bg-primary-50 text-primary-700 font-semibold'
          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
      }`}
    >
      <Icon className="w-5 h-5" />
      <span>{label}</span>
    </Link>
  );
};

export default function DashboardLayout() {
  const { user, logout } = useAuth();
  const { t } = useTranslation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
    { to: '/dashboard', icon: HiOutlineHome, label: t('dashboard.title') },
    { to: '/courses', icon: HiOutlineBookOpen, label: t('course.title') },
    { to: '/grades', icon: HiOutlineChartBar, label: 'Điểm số' },
    { to: '/profile', icon: HiOutlineUser, label: t('nav.profile') },
    { to: '/notifications', icon: HiOutlineBell, label: t('common.notification') },
  ];

  if (user?.role === 'student') {
    menuItems.splice(3, 0, { to: '/payment', icon: HiOutlineCreditCard, label: t('common.payment') });
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex md:flex-col md:w-64 md:fixed md:inset-y-0 bg-white border-r border-gray-200">
        <div className="flex items-center h-16 px-6 border-b border-gray-100">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">Q</span>
            </div>
            <span className="text-lg font-bold text-gray-900">{t('app.name')}</span>
          </Link>
        </div>
        <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
          {menuItems.map((item) => (
            <SidebarLink key={item.to} {...item} />
          ))}
        </nav>
        <div className="p-4 border-t border-gray-100">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
              <span className="text-primary-600 font-semibold">{user?.name?.charAt(0)?.toUpperCase()}</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">{user?.name}</p>
              <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
            </div>
          </div>
          <button onClick={logout} className="flex items-center space-x-2 text-gray-500 hover:text-red-500 w-full px-2 py-2 rounded-lg hover:bg-red-50 transition-colors">
            <HiOutlineLogout className="w-5 h-5" />
            <span className="text-sm">{t('nav.logout')}</span>
          </button>
        </div>
      </aside>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="fixed inset-0 bg-black/30" onClick={() => setSidebarOpen(false)}></div>
          <aside className="fixed inset-y-0 left-0 w-64 bg-white z-50 shadow-xl">
            <div className="flex items-center justify-between h-16 px-6 border-b">
              <span className="text-lg font-bold">{t('app.name')}</span>
              <button onClick={() => setSidebarOpen(false)}><HiOutlineX className="w-6 h-6" /></button>
            </div>
            <nav className="px-4 py-4 space-y-1">
              {menuItems.map((item) => (
                <SidebarLink key={item.to} {...item} onClick={() => setSidebarOpen(false)} />
              ))}
            </nav>
            <div className="absolute bottom-0 left-0 right-0 p-4 border-t">
              <button onClick={() => { logout(); setSidebarOpen(false); }} className="flex items-center space-x-2 text-red-500 w-full px-2 py-2">
                <HiOutlineLogout className="w-5 h-5" />
                <span>{t('nav.logout')}</span>
              </button>
            </div>
          </aside>
        </div>
      )}

      {/* Main content */}
      <div className="md:ml-64 flex-1 flex flex-col">
        {/* Top bar for mobile */}
        <div className="md:hidden bg-white border-b px-4 h-16 flex items-center justify-between sticky top-0 z-30">
          <button onClick={() => setSidebarOpen(true)}>
            <HiOutlineMenu className="w-6 h-6 text-gray-600" />
          </button>
          <span className="font-semibold">{t('app.name')}</span>
          <Link to="/notifications">
            <HiOutlineBell className="w-6 h-6 text-gray-600" />
          </Link>
        </div>

        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}