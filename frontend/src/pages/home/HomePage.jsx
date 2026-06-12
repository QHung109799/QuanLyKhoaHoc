import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { HiOutlineAcademicCap, HiOutlineBookOpen, HiOutlineGlobe, HiOutlineChartBar } from 'react-icons/hi';

export default function HomePage() {
  const { t } = useTranslation();

  const features = [
    { icon: HiOutlineBookOpen, title: 'Đa dạng khóa học', desc: 'Hàng trăm khóa học từ cơ bản đến nâng cao' },
    { icon: HiOutlineAcademicCap, title: 'Giảng viên chất lượng', desc: 'Đội ngũ giảng viên giàu kinh nghiệm' },
    { icon: HiOutlineGlobe, title: 'Học mọi lúc mọi nơi', desc: 'Học online trên mọi thiết bị' },
    { icon: HiOutlineChartBar, title: 'Theo dõi tiến độ', desc: 'Theo dõi kết quả học tập chi tiết' },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 text-white">
        <div className="max-w-7xl mx-auto px-4 py-20 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              {t('app.tagline')}
            </h1>
            <p className="text-xl text-primary-100 mb-10">
              Nền tảng học trực tuyến hàng đầu với các khóa học chất lượng cao
              từ các giảng viên uy tín.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/courses" className="bg-white text-primary-700 font-semibold px-8 py-3.5 rounded-xl hover:bg-primary-50 transition-all shadow-lg shadow-primary-500/30">
                Khám phá khóa học
              </Link>
              <Link to="/register" className="bg-primary-500 text-white font-semibold px-8 py-3.5 rounded-xl hover:bg-primary-400 transition-all border border-primary-400">
                Bắt đầu ngay
              </Link>
            </div>
          </div>
        </div>
        <div className="h-16 bg-gradient-to-t from-gray-50"></div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Tại sao chọn chúng tôi?</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Chúng tôi mang đến trải nghiệm học tập tốt nhất cho bạn
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, idx) => (
              <div key={idx} className="card text-center">
                <div className="w-14 h-14 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-5">
                  <feature.icon className="w-7 h-7 text-primary-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-500 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Sẵn sàng bắt đầu hành trình học tập?</h2>
          <p className="text-gray-500 mb-8">Đăng ký ngay để truy cập tất cả khóa học miễn phí và trả phí</p>
          <Link to="/register" className="btn-primary text-lg px-10 py-3.5 inline-block">
            Đăng ký miễn phí
          </Link>
        </div>
      </section>
    </div>
  );
}