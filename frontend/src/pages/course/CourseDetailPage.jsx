import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { HiOutlineClock, HiOutlineUser, HiOutlineBookOpen, HiOutlineChat, HiOutlinePlay, HiOutlineDocumentText } from 'react-icons/hi';
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
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await api.get(`/courses/${id}`);
        setCourse(res.data.data);
      } catch (err) {
        console.error(err);
        toast.error('Không thể tải thông tin khóa học');
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

  const getYoutubeEmbedUrl = (url) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? `https://www.youtube.com/embed/${match[2]}` : null;
  };

  if (loading) return <div className="flex justify-center py-20"><div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary-600"></div></div>;
  if (!course) return <div className="text-center py-20"><p className="text-gray-500">Khóa học không tồn tại</p></div>;

  const youtubeUrl = getYoutubeEmbedUrl(course.thumbnail);
  const isEnrolled = user && course.enrollment;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="card mb-8 overflow-hidden">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Left: Thumbnail/Video */}
          <div className="aspect-video bg-gray-900 rounded-xl overflow-hidden">
            {youtubeUrl ? (
              <iframe
                src={youtubeUrl}
                title={course.title}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary-100 to-accent-50">
                <span className="text-8xl">📚</span>
              </div>
            )}
          </div>

          {/* Right: Course Info */}
          <div className="flex flex-col">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{course.title}</h1>
            <p className="text-gray-600 mb-6 leading-relaxed flex-1">{course.description}</p>

            {/* Author */}
            <div className="flex items-center gap-3 mb-6 pb-6 border-b">
              <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center text-xl">
                👨‍🏫
              </div>
              <div>
                <p className="text-sm text-gray-500">Giảng viên</p>
                <p className="font-semibold text-gray-900">{course.teacher?.name || 'Chưa có giảng viên'}</p>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <HiOutlineBookOpen className="w-6 h-6 mx-auto text-primary-600 mb-1" />
                <p className="text-lg font-bold text-gray-900">{course.courseLessons?.length || 0}</p>
                <p className="text-xs text-gray-500">Bài học</p>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <HiOutlineClock className="w-6 h-6 mx-auto text-primary-600 mb-1" />
                <p className="text-lg font-bold text-gray-900">
                  {course.courseLessons?.reduce((acc, l) => acc + (l.duration || 0), 0) || 0} phút
                </p>
                <p className="text-xs text-gray-500">Tổng thời gian</p>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <span className="text-lg font-bold text-gray-900 block">
                  {course.level === 'beginner' ? 'Cơ bản' : course.level === 'intermediate' ? 'Trung cấp' : 'Nâng cao'}
                </span>
                <p className="text-xs text-gray-500">Trình độ</p>
              </div>
            </div>

            {/* Price & Action */}
            <div className="flex items-center justify-between">
              <div>
                {course.isFree ? (
                  <span className="text-2xl font-bold text-green-600">Miễn phí</span>
                ) : (
                  <span className="text-2xl font-bold text-primary-600">{Number(course.price).toLocaleString()}₫</span>
                )}
              </div>
              {isEnrolled || user?.role === 'teacher' || user?.role === 'admin' ? (
                <button onClick={() => navigate(`/courses/${id}/lessons/${course.courseLessons?.[0]?.id}`)} className="btn-primary">
                  {user?.role === 'teacher' || user?.role === 'admin' ? 'Xem khóa học' : 'Tiếp tục học'}
                </button>
              ) : user ? (
                <button onClick={handleEnroll} disabled={enrolling} className="btn-primary">
                  {enrolling ? 'Đang xử lý...' : course.isFree ? 'Học ngay' : 'Đăng ký học'}
                </button>
              ) : (
                <button onClick={() => navigate('/login')} className="btn-primary">
                  Đăng nhập để học
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b mb-6">
        <div className="flex gap-6">
          {['overview', 'lessons', 'discussions'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 px-1 font-medium transition-colors ${
                activeTab === tab
                  ? 'border-b-2 border-primary-600 text-primary-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab === 'overview' ? 'Tổng quan' : tab === 'lessons' ? 'Bài học' : 'Thảo luận'}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="card">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Mô tả khóa học</h2>
          <div className="prose max-w-none text-gray-700" dangerouslySetInnerHTML={{ __html: course.description || '<p>Chưa có mô tả</p>' }} />
          
          {course.category && (
            <div className="mt-6 pt-6 border-t">
              <span className="text-sm text-gray-500">Danh mục: </span>
              <span className="badge">{course.category}</span>
            </div>
          )}
        </div>
      )}

      {activeTab === 'lessons' && (
        <div className="card">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Danh sách bài học ({course.courseLessons?.length || 0})</h2>
          {course.courseLessons?.length > 0 ? (
            <div className="space-y-3">
              {course.courseLessons.map((lesson, idx) => (
                <div key={lesson.id} className="flex items-center p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                  <span className="w-10 h-10 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-sm font-bold mr-4">
                    {idx + 1}
                  </span>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">{lesson.title}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                      {lesson.duration && <span className="flex items-center gap-1"><HiOutlineClock className="w-4 h-4" /> {lesson.duration} phút</span>}
                      {lesson.videoUrl && <span className="flex items-center gap-1 text-red-500"><HiOutlinePlay className="w-4 h-4" /> Video</span>}
                      {lesson.fileUrl && <span className="flex items-center gap-1 text-blue-500"><HiOutlineDocumentText className="w-4 h-4" /> Tài liệu</span>}
                    </div>
                  </div>
                  {(isEnrolled || user?.role === 'teacher' || user?.role === 'admin') ? (
                    <Link to={`/courses/${id}/lessons/${lesson.id}`} className="btn-primary">
                      Học
                    </Link>
                  ) : (
                    <span className="text-sm text-gray-400">Cần đăng ký</span>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">Chưa có bài học nào</p>
          )}
        </div>
      )}

      {activeTab === 'discussions' && (
        <div className="card">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Thảo luận</h2>
          {(isEnrolled || user?.role === 'teacher' || user?.role === 'admin') ? (
            <Link to={`/discussions/${id}`} className="btn-secondary inline-flex items-center gap-2">
              <HiOutlineChat className="w-5 h-5" /> Tham gia thảo luận
            </Link>
          ) : (
            <p className="text-gray-500">Vui lòng đăng ký khóa học để tham gia thảo luận</p>
          )}
        </div>
      )}
    </div>
  );
}