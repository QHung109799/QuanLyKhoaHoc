import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { HiOutlineChevronLeft, HiOutlineChevronRight, HiOutlinePlay, HiOutlineDocumentText, HiOutlineCheckCircle } from 'react-icons/hi';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';

export default function LessonPage() {
  const { id: courseId, lessonId } = useParams();
  const { user } = useAuth();
  const [lesson, setLesson] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [completedLessons, setCompletedLessons] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const lessonRes = await api.get(`/lessons/${lessonId}`);
        setLesson(lessonRes.data.data);
        // Lấy danh sách lessons từ course detail
        const courseRes = await api.get(`/courses/${courseId}`);
        setLessons(courseRes.data.data?.courseLessons || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [lessonId, courseId]);

  const getYoutubeEmbedUrl = (url) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? `https://www.youtube.com/embed/${match[2]}` : null;
  };

  const currentIndex = lessons.findIndex(l => l.id === lesson?.id);
  const prevLesson = lessons[currentIndex - 1];
  const nextLesson = lessons[currentIndex + 1];
  const progress = lessons.length > 0 ? Math.round((completedLessons.length / lessons.length) * 100) : 0;

  const markAsComplete = async () => {
    if (!user || completedLessons.includes(lesson.id)) return;
    try {
      await api.post(`/lessons/${lesson.id}/complete`);
      setCompletedLessons([...completedLessons, lesson.id]);
      toast.success('Đã đánh dấu hoàn thành!');
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <div className="flex justify-center py-20"><div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary-600"></div></div>;
  if (!lesson) return <div className="text-center py-20"><p className="text-gray-500">Bài học không tồn tại</p></div>;

  const youtubeUrl = getYoutubeEmbedUrl(lesson.videoUrl);
  const isCompleted = completedLessons.includes(lesson.id);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Breadcrumb */}
          <Link to={`/courses/${courseId}`} className="text-sm text-primary-600 font-medium flex items-center gap-1 hover:underline mb-4">
            <HiOutlineChevronLeft className="w-4 h-4" /> Quay lại khóa học
          </Link>

          {/* Video Player */}
          {youtubeUrl ? (
            <div className="card mb-6 p-0 overflow-hidden">
              <div className="aspect-video">
                <iframe
                  src={youtubeUrl}
                  title={lesson.title}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          ) : lesson.videoUrl ? (
            <div className="card mb-6 p-0 overflow-hidden">
              <div className="aspect-video bg-gray-900 flex items-center justify-center">
                <video controls className="w-full h-full" src={lesson.videoUrl}>
                  Trình duyệt của bạn không hỗ trợ video.
                </video>
              </div>
            </div>
          ) : null}

          {/* Lesson Title & Content */}
          <div className="card mb-6">
            <div className="flex items-start justify-between mb-4">
              <h1 className="text-2xl font-bold text-gray-900">{lesson.title}</h1>
              {isCompleted && (
                <span className="flex items-center gap-1 text-green-600 text-sm font-medium">
                  <HiOutlineCheckCircle className="w-5 h-5" /> Đã hoàn thành
                </span>
              )}
            </div>
            
            {lesson.content && (
              <div className="prose max-w-none text-gray-700 mb-6" dangerouslySetInnerHTML={{ __html: lesson.content }} />
            )}

            {lesson.fileUrl && (
              <a href={`/${lesson.fileUrl}`} target="_blank" rel="noreferrer" className="btn-secondary inline-flex items-center gap-2">
                <HiOutlineDocumentText className="w-5 h-5" /> Tải tài liệu bài học
              </a>
            )}

            {user && !isCompleted && (
              <button onClick={markAsComplete} className="btn-primary mt-4">
                Đánh dấu đã học xong
              </button>
            )}
          </div>

          {/* Navigation */}
          <div className="flex justify-between gap-4">
            {prevLesson ? (
              <Link to={`/courses/${courseId}/lessons/${prevLesson.id}`} className="btn-secondary flex items-center gap-2">
                <HiOutlineChevronLeft className="w-5 h-5" /> {prevLesson.title}
              </Link>
            ) : <div />}
            {nextLesson && (
              <Link to={`/courses/${courseId}/lessons/${nextLesson.id}`} className="btn-primary flex items-center gap-2">
                {nextLesson.title} <HiOutlineChevronRight className="w-5 h-5" />
              </Link>
            )}
          </div>
        </div>

        {/* Sidebar - Lesson List */}
        <div className="lg:col-span-1">
          <div className="card sticky top-24">
            <h3 className="font-bold text-gray-900 mb-4">Danh sách bài học</h3>
            
            {/* Progress Bar */}
            <div className="mb-4">
              <div className="flex justify-between text-sm text-gray-600 mb-1">
                <span>Tiến độ</span>
                <span>{completedLessons.length}/{lessons.length}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-primary-600 h-2 rounded-full transition-all" style={{ width: `${progress}%` }}></div>
              </div>
            </div>

            <div className="space-y-2 max-h-[600px] overflow-y-auto">
              {lessons.map((l, idx) => {
                const isCurrent = l.id === lesson.id;
                const isDone = completedLessons.includes(l.id);
                return (
                  <Link
                    key={l.id}
                    to={`/courses/${courseId}/lessons/${l.id}`}
                    className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                      isCurrent
                        ? 'bg-primary-50 border-2 border-primary-500'
                        : 'hover:bg-gray-50 border-2 border-transparent'
                    }`}
                  >
                    <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      isDone ? 'bg-green-100 text-green-600' : isCurrent ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-600'
                    }`}>
                      {isDone ? <HiOutlineCheckCircle className="w-5 h-5" /> : idx + 1}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-medium truncate ${isCurrent ? 'text-primary-700' : 'text-gray-900'}`}>
                        {l.title}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        {l.duration && <span>{l.duration} phút</span>}
                        {l.videoUrl && <HiOutlinePlay className="w-3 h-3 text-red-500" />}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}