import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export default function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">Q</span>
            </div>
            <span className="text-lg font-bold text-gray-900">{t('app.name')}</span>
          </div>
          <div className="flex space-x-6 text-sm text-gray-500">
            <Link to="/" className="hover:text-primary-600">{t('nav.home')}</Link>
            <Link to="/courses" className="hover:text-primary-600">{t('nav.courses')}</Link>
          </div>
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} {t('app.name')}. {t('footer.rights')}
          </p>
        </div>
      </div>
    </footer>
  );
}