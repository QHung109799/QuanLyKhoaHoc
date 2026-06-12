import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { HiOutlineChevronLeft, HiOutlineChevronRight, HiOutlinePlay, HiOutlineDocument } from 'react-icons/hi';
import api from '../../services/api';

export default function LessonPage() {
  const { id: courseId, lessonId } = useParams();
  const [lesson, setLesson] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [lessonRes, lessonsRes] = await Promise.all([
          api.get(`/lessons/${lessonId}`),
          api.get(`/courses/${courseId}/lessons`),
        ]);
        setLesson(lessonRes.data.data);
        setLessons(lessonsRes.data.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [lessonId, courseId]);

  const currentIndex = lessons.findIndex(l => l.id === lesson?.id);
  const prevLesson = lessons[currentIndex - 1];
  const nextLesson = lessons[currentIndex + 1];

  if (loading) return <div className="flex justify-center py-20"><div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary-600"></div></div>;
  if (!lesson) return <div className="text-center py-20"><p className="text-gray-500">Bài học không tồn tại</p></div>;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <Link to={`/courses/${courseId}`} className="text-sm text-primary-600 font-medium flex items-center gap-1 hover:underline mb-2">
          <HiOutlineChevronLeft className="w-4 h-4" /> Quay lại khóa học
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">{lesson.title}</h1>
      </div>

      {/* Video Player */}
      {lesson.videoUrl && (
        <div className="card mb-6 p-0 overflow-hidden">
          <div className="aspect-video bg-gray-900 flex items-center justify-center">
            <HiOutlinePlay className="w-16 h-16 text-white/50" />
          </div>
        </div>
      )}

      {/* Content */}
      <div className="card mb-6">
        <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: lesson.content || '<p>Chưa có nội dung bài học</p>' }} />
        {lesson.fileUrl && (
          <a href={`/${lesson.fileUrl}`} target="_blank" rel="noreferrer" className="btn-secondary inline-flex items-center gap-2 mt-4">
            <HiOutlineDocument className="w-5 h-5" /> Tải tài liệu
          </a>
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
  );
}