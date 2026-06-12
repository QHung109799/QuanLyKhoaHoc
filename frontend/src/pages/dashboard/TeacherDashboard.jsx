import { Link } from 'react-router-dom';
import { HiOutlineBookOpen, HiOutlineUsers, HiOutlineClipboardList } from 'react-icons/hi';

export default function TeacherDashboard() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard Giảng Viên</h1>
      <div className="grid sm:grid-cols-3 gap-6 mb-8">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Khóa học của tôi</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">0</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <HiOutlineBookOpen className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Học viên</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">0</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <HiOutlineUsers className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Bài tập chưa chấm</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">0</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
              <HiOutlineClipboardList className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>
      <div className="card">
        <h3 className="font-semibold text-gray-900 mb-4">Tạo khóa học mới</h3>
        <p className="text-gray-500 text-sm mb-4">Bắt đầu tạo khóa học mới cho học viên của bạn</p>
        <Link to="/courses" className="btn-primary inline-block">Tạo khóa học</Link>
      </div>
    </div>
  );
}