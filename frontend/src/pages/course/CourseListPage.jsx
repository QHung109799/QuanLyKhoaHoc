import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { HiOutlineSearch, HiOutlineFilter, HiOutlinePlay } from 'react-icons/hi';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';

const getYoutubeThumbnail = (url) => {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  if (match && match[2].length === 11) {
    return `https://img.youtube.com/vi/${match[2]}/mqdefault.jpg`;
  }
  return null;
};

export default function CourseListPage() {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await api.get(`/courses?limit=20${search ? `&search=${search}` : ''}`);
        setCourses(res.data.data.courses || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, [search]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{t('course.allCourses')}</h1>
          <p className="text-gray-500 mt-1">Khám phá các khóa học chất lượng</p>
        </div>
        <div className="relative w-full sm:w-72">
          <HiOutlineSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t('course.search')}
            className="input-field pl-10"
          />
        </div>
      </div>
      {loading ? (
        <div className="text-center py-20"><div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary-600 mx-auto"></div></div>
      ) : courses.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-400 text-lg">{t('course.noCourses')}</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => {
            const thumbnail = getYoutubeThumbnail(course.thumbnail);
            return (
              <Link key={course.id} to={`/courses/${course.id}`} className="card group">
                <div className="h-40 rounded-lg mb-4 overflow-hidden bg-gray-100 relative">
                  {thumbnail ? (
                    <>
                      <img src={thumbnail} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center">
                          <HiOutlinePlay className="w-6 h-6 text-primary-600 ml-1" />
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-primary-100 to-accent-50 flex items-center justify-center">
                      <span className="text-4xl">📚</span>
                    </div>
                  )}
                </div>
                <h3 className="font-semibold text-gray-900 group-hover:text-primary-600 transition-colors mb-2">{course.title}</h3>
                <p className="text-sm text-gray-500 mb-3 line-clamp-2">{course.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">{course.teacher?.name || 'Giảng viên'}</span>
                  {course.isFree ? (
                    <span className="badge-success">{t('course.free')}</span>
                  ) : (
                    <span className="font-semibold text-primary-600">{Number(course.price).toLocaleString()}₫</span>
                  )}
                </div>
                {user && user.role !== 'student' && (
                  <p className="text-xs text-blue-600 italic mt-2">💼 Giáo viên/Admin - Không cần đăng ký</p>
                )}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
