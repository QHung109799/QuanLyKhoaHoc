import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { HiOutlineSearch, HiOutlineFilter } from 'react-icons/hi';
import api from '../../services/api';

export default function CourseListPage() {
  const { t } = useTranslation();
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
          {courses.map((course) => (
            <Link key={course.id} to={`/courses/${course.id}`} className="card group">
              <div className="h-40 bg-gradient-to-br from-primary-100 to-primary-50 rounded-lg mb-4 flex items-center justify-center">
                <span className="text-4xl">📚</span>
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
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}