import { useEffect, useState } from 'react';
import api from '../../services/api';
import { HiOutlineChartBar } from 'react-icons/hi';

export default function GradesPage() {
  const [grades, setGrades] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await api.get('/grades/my');
        setGrades(res.data.data || []);
      } catch (err) { console.error(err); }
      finally { setLoading(false); }
    };
    fetch();
  }, []);

  if (loading) return <div className="flex justify-center py-20"><div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary-600"></div></div>;

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Điểm số</h1>
      {grades.length === 0 ? (
        <div className="text-center py-16">
          <HiOutlineChartBar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-400">Chưa có điểm số nào</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left p-3 text-sm font-semibold text-gray-600">Bài tập</th>
                <th className="text-left p-3 text-sm font-semibold text-gray-600">Khóa học</th>
                <th className="text-center p-3 text-sm font-semibold text-gray-600">Điểm</th>
                <th className="text-left p-3 text-sm font-semibold text-gray-600">Nhận xét</th>
                <th className="text-left p-3 text-sm font-semibold text-gray-600">Trạng thái</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {grades.map((grade) => (
                <tr key={grade.id} className="hover:bg-gray-50">
                  <td className="p-3 text-sm font-medium text-gray-900">{grade.assignment?.title}</td>
                  <td className="p-3 text-sm text-gray-500">{grade.assignment?.course?.title}</td>
                  <td className="p-3 text-center">
                    <span className={`font-semibold ${grade.score !== null ? (grade.score >= 50 ? 'text-green-600' : 'text-red-600') : 'text-gray-400'}`}>
                      {grade.score !== null ? `${grade.score}` : '-'}
                    </span>
                  </td>
                  <td className="p-3 text-sm text-gray-500">{grade.feedback || '-'}</td>
                  <td className="p-3">
                    {grade.score !== null ? (
                      <span className="badge-success">Đã chấm</span>
                    ) : grade.submittedAt ? (
                      <span className="badge-warning">Chờ chấm</span>
                    ) : (
                      <span className="badge-info">Chưa nộp</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}