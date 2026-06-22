import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  HiOutlineBookOpen,
  HiOutlineUsers,
  HiOutlineClipboardList,
  HiOutlinePlus,
} from "react-icons/hi";
import { useAuth } from "../../context/AuthContext";
import api from "../../services/api";

export default function TeacherDashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    courses: 0,
    students: 0,
    assignments: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [coursesRes] = await Promise.all([api.get("/courses?limit=100")]);
        setStats({
          courses: coursesRes.data.data.total || 0,
          students: 0,
          assignments: 0,
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Dashboard Giảng Viên
          </h1>
          <p className="text-sm text-gray-500 mt-1">Xin chào, {user?.name}</p>
        </div>
        <Link
          to="/create-course"
          className="btn-primary flex items-center gap-2"
        >
          <HiOutlinePlus className="w-5 h-5" />
          Tạo khóa học mới
        </Link>
      </div>

      <div className="grid sm:grid-cols-3 gap-6 mb-8">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Khóa học của tôi</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {stats.courses}
              </p>
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
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {stats.students}
              </p>
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
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {stats.assignments}
              </p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
              <HiOutlineClipboardList className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="font-semibold text-gray-900 mb-4">Quản lý nhanh</h3>
          <div className="space-y-3">
            <Link
              to="/create-course"
              className="block p-3 bg-gray-50 rounded-lg hover:bg-primary-50 transition-colors"
            >
              <span className="font-medium text-gray-700">
                ➕ Tạo khóa học mới
              </span>
            </Link>
            <Link
              to="/courses"
              className="block p-3 bg-gray-50 rounded-lg hover:bg-primary-50 transition-colors"
            >
              <span className="font-medium text-gray-700">
                📚 Xem tất cả khóa học
              </span>
            </Link>
            <Link
              to="/grades"
              className="block p-3 bg-gray-50 rounded-lg hover:bg-primary-50 transition-colors"
            >
              <span className="font-medium text-gray-700">📊 Xem điểm</span>
            </Link>
          </div>
        </div>
        <div className="card">
          <h3 className="font-semibold text-gray-900 mb-4">
            Hoạt động gần đây
          </h3>
          <p className="text-gray-500 text-sm">Chưa có hoạt động nào.</p>
        </div>
      </div>
    </div>
  );
}
