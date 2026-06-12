import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { HiOutlineClock, HiOutlineDocument, HiOutlineUpload } from 'react-icons/hi';
import api from '../../services/api';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';

export default function AssignmentPage() {
  const { id: courseId } = useParams();
  const { user } = useAuth();
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await api.get(`/courses/${courseId}/assignments`);
        setAssignments(res.data.data || []);
      } catch (err) { console.error(err); }
      finally { setLoading(false); }
    };
    fetch();
  }, [courseId]);

  const handleSubmit = async (assignmentId) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.onchange = async (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const formData = new FormData();
      formData.append('file', file);
      try {
        await api.post(`/assignments/${assignmentId}/submit`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        toast.success('Nộp bài thành công!');
      } catch (err) {
        toast.error(err.response?.data?.message || 'Nộp bài thất bại');
      }
    };
    input.click();
  };

  if (loading) return <div className="flex justify-center py-20"><div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary-600"></div></div>;

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Bài tập</h1>
      {assignments.length === 0 ? (
        <div className="text-center py-16"><p className="text-gray-400">Chưa có bài tập nào</p></div>
      ) : (
        <div className="space-y-4">
          {assignments.map((assignment) => (
            <div key={assignment.id} className="card">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900">{assignment.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">{assignment.description}</p>
                  <div className="flex items-center gap-4 mt-3 text-sm text-gray-400">
                    {assignment.deadline && (
                      <span className="flex items-center gap-1">
                        <HiOutlineClock className="w-4 h-4" /> Hạn: {new Date(assignment.deadline).toLocaleDateString('vi-VN')}
                      </span>
                    )}
                    <span>Tối đa: {assignment.maxScore} điểm</span>
                  </div>
                </div>
                {user?.role === 'student' && (
                  <button onClick={() => handleSubmit(assignment.id)} className="btn-secondary text-sm flex items-center gap-1">
                    <HiOutlineUpload className="w-4 h-4" /> Nộp bài
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}