import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTranslation } from 'react-i18next';
import { HiOutlineMenu, HiOutlineX, HiOutlineBell, HiOutlineUser, HiOutlineLogout } from 'react-icons/hi';
import { useState } from 'react';
import LanguageSwitch from '../common/LanguageSwitch';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">Q</span>
              </div>
              <span className="text-xl font-bold text-gray-900">{t('app.name')}</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-gray-600 hover:text-primary-600 font-medium transition-colors">
              {t('nav.home')}
            </Link>
            <Link to="/courses" className="text-gray-600 hover:text-primary-600 font-medium transition-colors">
              {t('nav.courses')}
            </Link>

            {user ? (
              <>
                <Link to="/dashboard" className="text-gray-600 hover:text-primary-600 font-medium transition-colors">
                  {t('nav.dashboard')}
                </Link>
                <Link to="/notifications" className="relative text-gray-600 hover:text-primary-600">
                  <HiOutlineBell className="w-6 h-6" />
                </Link>
                <div className="flex items-center space-x-3">
                  <Link to="/profile" className="flex items-center space-x-2 text-gray-600 hover:text-primary-600">
                    <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                      <span className="text-primary-600 font-semibold text-sm">
                        {user.name?.charAt(0)?.toUpperCase()}
                      </span>
                    </div>
                    <span className="font-medium">{user.name}</span>
                  </Link>
                  <button onClick={logout} className="text-gray-400 hover:text-red-500 transition-colors">
                    <HiOutlineLogout className="w-5 h-5" />
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-3">
                <Link to="/login" className="btn-secondary text-sm py-2">
                  {t('nav.login')}
                </Link>
                <Link to="/register" className="btn-primary text-sm py-2">
                  {t('nav.register')}
                </Link>
              </div>
            )}
            <LanguageSwitch />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <LanguageSwitch />
            <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-gray-600">
              {isOpen ? <HiOutlineX className="w-6 h-6" /> : <HiOutlineMenu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <div className="px-4 py-3 space-y-3">
            <Link to="/" className="block text-gray-600 font-medium" onClick={() => setIsOpen(false)}>{t('nav.home')}</Link>
            <Link to="/courses" className="block text-gray-600 font-medium" onClick={() => setIsOpen(false)}>{t('nav.courses')}</Link>
            {user ? (
              <>
                <Link to="/dashboard" className="block text-gray-600 font-medium" onClick={() => setIsOpen(false)}>{t('nav.dashboard')}</Link>
                <Link to="/profile" className="block text-gray-600 font-medium" onClick={() => setIsOpen(false)}>{t('nav.profile')}</Link>
                <button onClick={() => { logout(); setIsOpen(false); }} className="block text-red-500 font-medium">{t('nav.logout')}</button>
              </>
            ) : (
              <>
                <Link to="/login" className="block text-gray-600 font-medium" onClick={() => setIsOpen(false)}>{t('nav.login')}</Link>
                <Link to="/register" className="block text-primary-600 font-medium" onClick={() => setIsOpen(false)}>{t('nav.register')}</Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}