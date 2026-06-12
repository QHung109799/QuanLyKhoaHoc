import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { HiOutlineClock, HiOutlineUser, HiOutlineBookOpen, HiOutlineChat } from 'react-icons/hi';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';

export default function CourseDetailPage() {
  const { id } = useParams();
  const { t } = useTranslation();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState(false);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await api.get(`/courses/${id}`);
        setCourse(res.data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [id]);

  const handleEnroll = async () => {
    if (!user) return navigate('/login');
    setEnrolling(true);
    try {
      await api.post(`/courses/${id}/enroll`);
      toast.success('Đăng ký khóa học thành công!');
      if (course?.isFree) {
        navigate(`/courses/${id}/lessons/${course.courseLessons?.[0]?.id}`);
      } else {
        navigate(`/payment/${id}`);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Đăng ký thất bại');
    } finally {
      setEnrolling(false);
    }
  };

  if (loading) return <div className="flex justify-center py-20"><div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary-600"></div></div>;

  if (!course) return <div className="text-center py-20"><p className="text-gray-500">Khóa học không tồn tại</p></div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="card mb-6">
        <div className="h-48 bg-gradient-to-br from-primary-100 to-accent-50 rounded-xl mb-6 flex items-center justify-center">
          <span className="text-6xl">📚</span>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-3">{course.title}</h1>
        <p className="text-gray-600 mb-6 leading-relaxed">{course.description}</p>
        <div className="flex flex-wrap gap-4 mb-6 text-sm text-gray-500">
          <span className="flex items-center gap-1.5"><HiOutlineUser className="w-4 h-4" /> {course.teacher?.name}</span>
          <span className="flex items-center gap-1.5"><HiOutlineBookOpen className="w-4 h-4" /> {course.courseLessons?.length || 0} bài học</span>
          <span><span className="badge">{course.level}</span></span>
          {course.isFree ? <span className="badge-success">{t('course.free')}</span> : <span className="font-semibold text-primary-600">{Number(course.price).toLocaleString()}₫</span>}
        </div>
        <button onClick={handleEnroll} disabled={enrolling} className="btn-primary">
          {enrolling ? 'Đang xử lý...' : t('course.enroll')}
        </button>
      </div>

      {course.courseLessons?.length > 0 && (
        <div className="card mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">{t('course.lessons')}</h2>
          <div className="space-y-2">
            {course.courseLessons.map((lesson, idx) => (
              <div key={lesson.id} className="flex items-center p-3 bg-gray-50 rounded-lg">
                <span className="w-8 h-8 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-sm font-semibold mr-3">{idx + 1}</span>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{lesson.title}</p>
                  {lesson.duration && <p className="text-xs text-gray-400"><HiOutlineClock className="w-3 h-3 inline" /> {lesson.duration} phút</p>}
                </div>
                {user && <Link to={`/courses/${id}/lessons/${lesson.id}`} className="text-sm text-primary-600 font-medium">Xem</Link>}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex gap-4">
        {user && <Link to={`/discussions/${id}`} className="btn-secondary flex items-center gap-2"><HiOutlineChat className="w-5 h-5" /> {t('course.discussions')}</Link>}
        {user && <Link to={`/courses/${id}/assignments`} className="btn-secondary">{t('course.assignments')}</Link>}
      </div>
    </div>
  );
}