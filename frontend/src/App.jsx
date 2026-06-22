import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

// Layouts
import MainLayout from './components/layout/MainLayout';
import AuthLayout from './components/layout/AuthLayout';
import DashboardLayout from './components/layout/DashboardLayout';

// Pages
import HomePage from './pages/home/HomePage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage';
import ResetPasswordPage from './pages/auth/ResetPasswordPage';
import AdminDashboard from './pages/dashboard/AdminDashboard';
import TeacherDashboard from './pages/dashboard/TeacherDashboard';
import StudentDashboard from './pages/dashboard/StudentDashboard';
import CourseListPage from './pages/course/CourseListPage';
import CourseDetailPage from './pages/course/CourseDetailPage';
import LessonPage from './pages/lesson/LessonPage';
import AssignmentPage from './pages/assignment/AssignmentPage';
import GradesPage from './pages/grades/GradesPage';
import ProfilePage from './pages/profile/ProfilePage';
import DiscussionPage from './pages/discussion/DiscussionPage';
import PaymentPage from './pages/payment/PaymentPage';
import PaymentResultPage from './pages/payment/PaymentResultPage';
import PaymentHistoryPage from './pages/payment/PaymentHistoryPage';
import NotificationsPage from './pages/notifications/NotificationsPage';
import CreateCoursePage from './pages/course/CreateCoursePage';

// Protected Route Component
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();
  if (loading) return <div className="flex items-center justify-center h-screen"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div></div>;
  if (!user) return <Navigate to="/login" />;
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to={`/dashboard`} />;
  }
  return children;
};

const DashboardRouter = () => {
  const { user } = useAuth();
  if (user?.role === 'admin') return <AdminDashboard />;
  if (user?.role === 'teacher') return <TeacherDashboard />;
  return <StudentDashboard />;
};

export default function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="courses" element={<CourseListPage />} />
        <Route path="courses/:id" element={<CourseDetailPage />} />
      </Route>

      {/* Auth Routes */}
      <Route path="/" element={<AuthLayout />}>
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="forgot-password" element={<ForgotPasswordPage />} />
        <Route path="reset-password/:token" element={<ResetPasswordPage />} />
      </Route>

      {/* Protected Routes */}
      <Route path="/" element={
        <ProtectedRoute>
          <DashboardLayout />
        </ProtectedRoute>
      }>
        <Route path="dashboard" element={<DashboardRouter />} />
        <Route path="courses/:id/lessons/:lessonId" element={<LessonPage />} />
        <Route path="courses/:id/assignments" element={<AssignmentPage />} />
        <Route path="grades" element={<GradesPage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="discussions/:courseId" element={<DiscussionPage />} />
        <Route path="payment/:courseId" element={<PaymentPage />} />
        <Route path="payment/result" element={<PaymentResultPage />} />
        <Route path="payment/history" element={<PaymentHistoryPage />} />
        <Route path="notifications" element={<NotificationsPage />} />
        <Route path="create-course" element={
          <ProtectedRoute allowedRoles={['teacher', 'admin']}>
            <CreateCoursePage />
          </ProtectedRoute>
        } />
      </Route>

      {/* 404 */}
      <Route path="*" element={
        <div className="flex flex-col items-center justify-center min-h-screen">
          <h1 className="text-6xl font-bold text-gray-300">404</h1>
          <p className="text-xl text-gray-500 mt-4">Trang không tồn tại</p>
          <a href="/" className="btn-primary mt-6">Về trang chủ</a>
        </div>
      } />
    </Routes>
  );
}