import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { HiOutlineBookOpen, HiOutlineChartBar, HiOutlineClipboardList } from 'react-icons/hi';
import api from '../../services/api';

export default function StudentDashboard() {
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get('/courses?limit=3');
        setEnrolledCourses(res.data.data.courses || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-1">Dashboard Sinh Viên</h1>
      <p className="text-gray-500 mb-6">Tiếp tục hành trình học tập của bạn!</p>

      <div className="grid sm:grid-cols-3 gap-6 mb-8">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Đã đăng ký</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{enrolledCourses.length}</p>
            </div>
            <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
              <HiOutlineBookOpen className="w-6 h-6 text-primary-600" />
            </div>
          </div>
        </div>
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Điểm trung bình</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">-</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <HiOutlineChartBar className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Bài tập cần nộp</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">0</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
              <HiOutlineClipboardList className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-900">Khóa học gần đây</h3>
          <Link to="/courses" className="text-sm text-primary-600 font-medium">Xem tất cả</Link>
        </div>
        {loading ? (
          <p className="text-gray-400 text-sm">Đang tải...</p>
        ) : enrolledCourses.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-400 mb-4">Bạn chưa đăng ký khóa học nào</p>
            <Link to="/courses" className="btn-primary inline-block">Khám phá khóa học</Link>
          </div>
        ) : (
          <div className="space-y-3">
            {enrolledCourses.map((course) => (
              <Link key={course.id} to={`/courses/${course.id}`} className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-primary-50">
                <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center mr-3">
                  📚
                </div>
                <div>
                  <p className="font-medium text-gray-900">{course.title}</p>
                  <p className="text-sm text-gray-500">{course.teacher?.name}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}