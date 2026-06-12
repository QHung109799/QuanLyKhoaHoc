import { useEffect, useState } from 'react';
import { HiOutlineBell, HiOutlineTrash } from 'react-icons/hi';
import api from '../../services/api';
import toast from 'react-hot-toast';

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const res = await api.get('/notifications');
      setNotifications(res.data.data.notifications || []);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  const markAsRead = async (id) => {
    try {
      await api.put(`/notifications/${id}/read`);
      setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
    } catch (err) { console.error(err); }
  };

  const markAllRead = async () => {
    try {
      await api.put('/notifications/read-all');
      setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
      toast.success('Đã đánh dấu tất cả đã đọc');
    } catch (err) { console.error(err); }
  };

  const remove = async (id) => {
    try {
      await api.delete(`/notifications/${id}`);
      setNotifications(prev => prev.filter(n => n.id !== id));
    } catch (err) { console.error(err); }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Thông báo</h1>
        {notifications.some(n => !n.isRead) && (
          <button onClick={markAllRead} className="text-sm text-primary-600 font-medium hover:underline">
            Đánh dấu tất cả đã đọc
          </button>
        )}
      </div>

      {loading ? (
        <div className="text-center py-10"><div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-600 mx-auto"></div></div>
      ) : notifications.length === 0 ? (
        <div className="text-center py-16">
          <HiOutlineBell className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-400">Không có thông báo nào</p>
        </div>
      ) : (
        <div className="space-y-2">
          {notifications.map((notif) => (
            <div
              key={notif.id}
              onClick={() => !notif.isRead && markAsRead(notif.id)}
              className={`card flex items-start gap-4 cursor-pointer ${!notif.isRead ? 'border-l-4 border-l-primary-500 bg-primary-50/30' : ''}`}
            >
              <div className={`w-10 h-10 ${notif.isRead ? 'bg-gray-100' : 'bg-primary-100'} rounded-full flex items-center justify-center flex-shrink-0`}>
                <HiOutlineBell className={`w-5 h-5 ${notif.isRead ? 'text-gray-400' : 'text-primary-600'}`} />
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-sm ${notif.isRead ? 'text-gray-500' : 'text-gray-900 font-semibold'}`}>{notif.title}</p>
                <p className="text-sm text-gray-500 mt-0.5">{notif.message}</p>
                <p className="text-xs text-gray-400 mt-1">{new Date(notif.createdAt).toLocaleString('vi-VN')}</p>
              </div>
              <button onClick={(e) => { e.stopPropagation(); remove(notif.id); }} className="text-gray-400 hover:text-red-500 transition-colors">
                <HiOutlineTrash className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}