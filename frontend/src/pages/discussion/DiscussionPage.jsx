import { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { HiOutlinePaperAirplane } from 'react-icons/hi';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';

export default function DiscussionPage() {
  const { courseId } = useParams();
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const bottomRef = useRef(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await api.get(`/courses/${courseId}/discussions`);
        setMessages(res.data.data.discussions || []);
      } catch (err) { console.error(err); }
      finally { setLoading(false); }
    };
    fetch();
  }, [courseId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    try {
      const res = await api.post(`/courses/${courseId}/discussions`, { message });
      setMessages(prev => [res.data.data, ...prev]);
      setMessage('');
    } catch (err) {
      toast.error('Gửi tin nhắn thất bại');
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      <h1 className="text-2xl font-bold text-gray-900 mb-4">Thảo luận</h1>
      
      <div className="flex-1 overflow-y-auto mb-4 space-y-4">
        {loading ? (
          <div className="text-center py-10"><div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-600 mx-auto"></div></div>
        ) : messages.length === 0 ? (
          <div className="text-center py-10 text-gray-400">Chưa có thảo luận nào. Hãy bắt đầu!</div>
        ) : (
          messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.userId === user?.id ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-lg ${msg.userId === user?.id ? 'bg-primary-50' : 'bg-gray-50'} rounded-xl px-4 py-3`}>
                <p className="text-xs font-semibold text-gray-600 mb-1">{msg.user?.name}</p>
                <p className="text-gray-800">{msg.message}</p>
                <p className="text-xs text-gray-400 mt-1">{new Date(msg.createdAt).toLocaleTimeString('vi-VN')}</p>
                {msg.replies?.map(reply => (
                  <div key={reply.id} className="ml-4 mt-2 p-2 bg-white rounded-lg">
                    <p className="text-xs font-semibold text-gray-500">{reply.user?.name}</p>
                    <p className="text-sm text-gray-700">{reply.message}</p>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
        <div ref={bottomRef} />
      </div>

      <form onSubmit={handleSend} className="flex gap-3">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Nhập tin nhắn..."
          className="input-field flex-1"
        />
        <button type="submit" className="btn-primary px-4 flex items-center">
          <HiOutlinePaperAirplane className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
}