import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { HiOutlineArrowLeft } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import toast from 'react-hot-toast';

/**
 * CreateCoursePage
 * 
 * Form tạo khóa học mới cho Teacher và Admin.
 * Fields: title, description, price, isFree, category, level, language
 */

const CATEGORIES = [
  'Lập trình', 'Thiết kế', 'Kinh doanh', 'Marketing',
  'Ngoại ngữ', 'Khoa học', 'Toán học', 'Khác'
];

const LEVELS = [
  { value: 'beginner', label: 'Cơ bản' },
  { value: 'intermediate', label: 'Trung bình' },
  { value: 'advanced', label: 'Nâng cao' }
];

const LANGUAGES = [
  { value: 'vi', label: 'Tiếng Việt' },
  { value: 'en', label: 'English' },
  { value: 'zh', label: '中文' },
  { value: 'ja', label: '日本語' }
];

export default function CreateCoursePage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: '',
    description: '',
    price: 0,
    isFree: true,
    category: '',
    level: 'beginner',
    language: 'vi'
  });

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) return toast.error('Vui lòng nhập tên khóa học');
    
    setLoading(true);
    try {
      const res = await api.post('/courses', form);
      toast.success('Tạo khóa học thành công!');
      navigate(`/courses/${res.data.data.id}`);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Tạo khóa học thất bại');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <Link to="/dashboard" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <HiOutlineArrowLeft className="w-5 h-5 text-gray-600" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Tạo khóa học mới</h1>
          <p className="text-sm text-gray-500">Điền thông tin để tạo khóa học</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Tên khóa học */}
        <div className="card">
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Tên khóa học *</label>
          <input
            type="text"
            value={form.title}
            onChange={(e) => handleChange('title', e.target.value)}
            className="input-field"
            placeholder="Ví dụ: Lập trình React từ Zero đến Hero"
            required
          />
        </div>

        {/* Mô tả */}
        <div className="card">
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Mô tả khóa học</label>
          <textarea
            value={form.description}
            onChange={(e) => handleChange('description', e.target.value)}
            className="input-field min-h-[120px] resize-y"
            placeholder="Mô tả ngắn gọn về nội dung khóa học..."
            rows={4}
          />
        </div>

        {/* Giá & Miễn phí */}
        <div className="card">
          <label className="block text-sm font-medium text-gray-700 mb-3">Học phí</label>
          <div className="flex items-center gap-4 mb-3">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={form.isFree}
                onChange={(e) => {
                  handleChange('isFree', e.target.checked);
                  if (e.target.checked) handleChange('price', 0);
                }}
                className="w-4 h-4 text-primary-600 rounded"
              />
              <span className="text-sm text-gray-700">Khóa học miễn phí</span>
            </label>
          </div>
          {!form.isFree && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Giá (VNĐ)</label>
              <input
                type="number"
                value={form.price}
                onChange={(e) => handleChange('price', parseInt(e.target.value) || 0)}
                className="input-field"
                placeholder="0"
                min={0}
              />
            </div>
          )}
        </div>

        {/* Danh mục & Cấp độ */}
        <div className="card">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Danh mục</label>
              <select
                value={form.category}
                onChange={(e) => handleChange('category', e.target.value)}
                className="input-field"
              >
                <option value="">Chọn danh mục</option>
                {CATEGORIES.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Cấp độ</label>
              <select
                value={form.level}
                onChange={(e) => handleChange('level', e.target.value)}
                className="input-field"
              >
                {LEVELS.map(lvl => (
                  <option key={lvl.value} value={lvl.value}>{lvl.label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Ngôn ngữ */}
        <div className="card">
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Ngôn ngữ giảng dạy</label>
          <div className="flex gap-2">
            {LANGUAGES.map(lang => (
              <button
                key={lang.value}
                type="button"
                onClick={() => handleChange('language', lang.value)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  form.language === lang.value
                    ? 'bg-primary-500 text-white shadow-sm'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {lang.label}
              </button>
            ))}
          </div>
        </div>

        {/* Nút submit */}
        <div className="flex gap-3">
          <Link to="/dashboard" className="btn-secondary flex-1 text-center">
            Hủy
          </Link>
          <button type="submit" disabled={loading} className="btn-primary flex-1">
            {loading ? 'Đang tạo...' : 'Tạo khóa học'}
          </button>
        </div>
      </form>
    </div>
  );
}