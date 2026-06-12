import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  vi: {
    translation: {
      app: { name: 'Quản Lý Khóa Học', tagline: 'Học tập không giới hạn' },
      nav: { home: 'Trang chủ', courses: 'Khóa học', dashboard: 'Bảng điều khiển', profile: 'Hồ sơ', login: 'Đăng nhập', register: 'Đăng ký', logout: 'Đăng xuất' },
      auth: { email: 'Email', password: 'Mật khẩu', confirmPassword: 'Xác nhận mật khẩu', name: 'Họ tên', login: 'Đăng nhập', register: 'Đăng ký', forgotPassword: 'Quên mật khẩu?', resetPassword: 'Đặt lại mật khẩu', sendResetLink: 'Gửi link đặt lại', noAccount: 'Chưa có tài khoản?', hasAccount: 'Đã có tài khoản?', loginSuccess: 'Đăng nhập thành công!', registerSuccess: 'Đăng ký thành công!' },
      course: { title: 'Khóa học', myCourses: 'Khóa học của tôi', allCourses: 'Tất cả khóa học', free: 'Miễn phí', paid: 'Trả phí', enroll: 'Đăng ký ngay', enrolled: 'Đã đăng ký', teacher: 'Giảng viên', students: 'Học viên', lessons: 'Bài học', assignments: 'Bài tập', discussions: 'Thảo luận', price: 'Học phí', level: 'Trình độ', category: 'Danh mục', search: 'Tìm kiếm khóa học...', noCourses: 'Chưa có khóa học nào' },
      dashboard: { title: 'Bảng điều khiển', totalStudents: 'Tổng học viên', totalCourses: 'Tổng khóa học', totalRevenue: 'Doanh thu', recentEnrollments: 'Đăng ký gần đây', welcome: 'Chào mừng trở lại!' },
      common: { loading: 'Đang tải...', saving: 'Đang lưu...', save: 'Lưu', cancel: 'Hủy', delete: 'Xóa', edit: 'Sửa', create: 'Tạo mới', back: 'Quay lại', noData: 'Không có dữ liệu', confirm: 'Xác nhận', search: 'Tìm kiếm', filter: 'Lọc', sort: 'Sắp xếp', view: 'Xem', download: 'Tải xuống', upload: 'Tải lên', submit: 'Nộp bài', grade: 'Chấm điểm', feedback: 'Nhận xét', notification: 'Thông báo', payment: 'Thanh toán', profile: 'Hồ sơ', settings: 'Cài đặt', language: 'Ngôn ngữ' },
      footer: { rights: 'Đã đăng ký bản quyền.', contact: 'Liên hệ', about: 'Về chúng tôi', terms: 'Điều khoản', privacy: 'Bảo mật' }
    }
  },
  en: {
    translation: {
      app: { name: 'Course Management', tagline: 'Learn Without Limits' },
      nav: { home: 'Home', courses: 'Courses', dashboard: 'Dashboard', profile: 'Profile', login: 'Login', register: 'Register', logout: 'Logout' },
      auth: { email: 'Email', password: 'Password', confirmPassword: 'Confirm Password', name: 'Full Name', login: 'Login', register: 'Register', forgotPassword: 'Forgot Password?', resetPassword: 'Reset Password', sendResetLink: 'Send Reset Link', noAccount: "Don't have an account?", hasAccount: 'Already have an account?', loginSuccess: 'Login successful!', registerSuccess: 'Registration successful!' },
      course: { title: 'Course', myCourses: 'My Courses', allCourses: 'All Courses', free: 'Free', paid: 'Paid', enroll: 'Enroll Now', enrolled: 'Enrolled', teacher: 'Teacher', students: 'Students', lessons: 'Lessons', assignments: 'Assignments', discussions: 'Discussions', price: 'Price', level: 'Level', category: 'Category', search: 'Search courses...', noCourses: 'No courses available' },
      dashboard: { title: 'Dashboard', totalStudents: 'Total Students', totalCourses: 'Total Courses', totalRevenue: 'Revenue', recentEnrollments: 'Recent Enrollments', welcome: 'Welcome back!' },
      common: { loading: 'Loading...', saving: 'Saving...', save: 'Save', cancel: 'Cancel', delete: 'Delete', edit: 'Edit', create: 'Create', back: 'Back', noData: 'No data available', confirm: 'Confirm', search: 'Search', filter: 'Filter', sort: 'Sort', view: 'View', download: 'Download', upload: 'Upload', submit: 'Submit', grade: 'Grade', feedback: 'Feedback', notification: 'Notification', payment: 'Payment', profile: 'Profile', settings: 'Settings', language: 'Language' },
      footer: { rights: 'All rights reserved.', contact: 'Contact', about: 'About Us', terms: 'Terms', privacy: 'Privacy' }
    }
  },
  zh: {
    translation: {
      app: { name: '课程管理', tagline: '无限学习' },
      nav: { home: '首页', courses: '课程', dashboard: '仪表盘', profile: '个人资料', login: '登录', register: '注册', logout: '退出' },
      auth: { email: '邮箱', password: '密码', confirmPassword: '确认密码', name: '姓名', login: '登录', register: '注册', forgotPassword: '忘记密码？', resetPassword: '重置密码', sendResetLink: '发送重置链接', noAccount: '没有账号？', hasAccount: '已有账号？', loginSuccess: '登录成功！', registerSuccess: '注册成功！' },
      course: { title: '课程', myCourses: '我的课程', allCourses: '所有课程', free: '免费', paid: '付费', enroll: '立即注册', enrolled: '已注册', teacher: '讲师', students: '学生', lessons: '课时', assignments: '作业', discussions: '讨论', price: '价格', level: '级别', category: '分类', search: '搜索课程...', noCourses: '暂无课程' },
      dashboard: { title: '仪表盘', totalStudents: '学生总数', totalCourses: '课程总数', totalRevenue: '收入', recentEnrollments: '最近注册', welcome: '欢迎回来！' },
      common: { loading: '加载中...', saving: '保存中...', save: '保存', cancel: '取消', delete: '删除', edit: '编辑', create: '创建', back: '返回', noData: '暂无数据', confirm: '确认', search: '搜索', filter: '筛选', sort: '排序', view: '查看', download: '下载', upload: '上传', submit: '提交', grade: '评分', feedback: '反馈', notification: '通知', payment: '支付', profile: '资料', settings: '设置', language: '语言' },
      footer: { rights: '版权所有。', contact: '联系我们', about: '关于我们', terms: '条款', privacy: '隐私' }
    }
  },
  ja: {
    translation: {
      app: { name: 'コース管理', tagline: '限りなく学ぶ' },
      nav: { home: 'ホーム', courses: 'コース', dashboard: 'ダッシュボード', profile: 'プロフィール', login: 'ログイン', register: '登録', logout: 'ログアウト' },
      auth: { email: 'メール', password: 'パスワード', confirmPassword: 'パスワード確認', name: '氏名', login: 'ログイン', register: '登録', forgotPassword: 'パスワードをお忘れですか？', resetPassword: 'パスワードリセット', sendResetLink: 'リセットリンクを送信', noAccount: 'アカウントをお持ちでない方', hasAccount: 'すでにアカウントをお持ちの方', loginSuccess: 'ログイン成功！', registerSuccess: '登録成功！' },
      course: { title: 'コース', myCourses: 'マイコース', allCourses: 'すべてのコース', free: '無料', paid: '有料', enroll: '登録する', enrolled: '登録済み', teacher: '講師', students: '学生', lessons: 'レッスン', assignments: '課題', discussions: 'ディスカッション', price: '料金', level: 'レベル', category: 'カテゴリ', search: 'コースを検索...', noCourses: 'コースがありません' },
      dashboard: { title: 'ダッシュボード', totalStudents: '総学生数', totalCourses: '総コース数', totalRevenue: '収益', recentEnrollments: '最近の登録', welcome: 'おかえりなさい！' },
      common: { loading: '読み込み中...', saving: '保存中...', save: '保存', cancel: 'キャンセル', delete: '削除', edit: '編集', create: '作成', back: '戻る', noData: 'データがありません', confirm: '確認', search: '検索', filter: 'フィルター', sort: '並び替え', view: '表示', download: 'ダウンロード', upload: 'アップロード', submit: '提出', grade: '採点', feedback: 'フィードバック', notification: '通知', payment: '支払い', profile: 'プロフィール', settings: '設定', language: '言語' },
      footer: { rights: 'All rights reserved.', contact: 'お問い合わせ', about: '私たちについて', terms: '利用規約', privacy: 'プライバシー' }
    }
  },
  de: {
    translation: {
      app: { name: 'Kursverwaltung', tagline: 'Lernen ohne Grenzen' },
      nav: { home: 'Startseite', courses: 'Kurse', dashboard: 'Dashboard', profile: 'Profil', login: 'Anmelden', register: 'Registrieren', logout: 'Abmelden' },
      auth: { email: 'E-Mail', password: 'Passwort', confirmPassword: 'Passwort bestätigen', name: 'Vollständiger Name', login: 'Anmelden', register: 'Registrieren', forgotPassword: 'Passwort vergessen?', resetPassword: 'Passwort zurücksetzen', sendResetLink: 'Reset-Link senden', noAccount: 'Noch kein Konto?', hasAccount: 'Bereits ein Konto?', loginSuccess: 'Anmeldung erfolgreich!', registerSuccess: 'Registrierung erfolgreich!' },
      course: { title: 'Kurs', myCourses: 'Meine Kurse', allCourses: 'Alle Kurse', free: 'Kostenlos', paid: 'Bezahlt', enroll: 'Einschreiben', enrolled: 'Eingeschrieben', teacher: 'Dozent', students: 'Studenten', lessons: 'Lektionen', assignments: 'Aufgaben', discussions: 'Diskussionen', price: 'Preis', level: 'Niveau', category: 'Kategorie', search: 'Kurse suchen...', noCourses: 'Keine Kurse verfügbar' },
      dashboard: { title: 'Dashboard', totalStudents: 'Gesamtstudenten', totalCourses: 'Gesamtkurse', totalRevenue: 'Einnahmen', recentEnrollments: 'Letzte Einschreibungen', welcome: 'Willkommen zurück!' },
      common: { loading: 'Laden...', saving: 'Speichern...', save: 'Speichern', cancel: 'Abbrechen', delete: 'Löschen', edit: 'Bearbeiten', create: 'Erstellen', back: 'Zurück', noData: 'Keine Daten', confirm: 'Bestätigen', search: 'Suchen', filter: 'Filtern', sort: 'Sortieren', view: 'Ansehen', download: 'Herunterladen', upload: 'Hochladen', submit: 'Einreichen', grade: 'Bewerten', feedback: 'Feedback', notification: 'Benachrichtigung', payment: 'Zahlung', profile: 'Profil', settings: 'Einstellungen', language: 'Sprache' },
      footer: { rights: 'Alle Rechte vorbehalten.', contact: 'Kontakt', about: 'Über uns', terms: 'AGB', privacy: 'Datenschutz' }
    }
  },
  fr: {
    translation: {
      app: { name: 'Gestion de Cours', tagline: 'Apprendre sans limites' },
      nav: { home: 'Accueil', courses: 'Cours', dashboard: 'Tableau de bord', profile: 'Profil', login: 'Connexion', register: 'Inscription', logout: 'Déconnexion' },
      auth: { email: 'Email', password: 'Mot de passe', confirmPassword: 'Confirmer le mot de passe', name: 'Nom complet', login: 'Connexion', register: 'Inscription', forgotPassword: 'Mot de passe oublié?', resetPassword: 'Réinitialiser', sendResetLink: 'Envoyer le lien', noAccount: 'Pas de compte?', hasAccount: 'Déjà un compte?', loginSuccess: 'Connexion réussie!', registerSuccess: 'Inscription réussie!' },
      course: { title: 'Cours', myCourses: 'Mes cours', allCourses: 'Tous les cours', free: 'Gratuit', paid: 'Payant', enroll: "S'inscrire", enrolled: 'Inscrit', teacher: 'Enseignant', students: 'Étudiants', lessons: 'Leçons', assignments: 'Devoirs', discussions: 'Discussions', price: 'Prix', level: 'Niveau', category: 'Catégorie', search: 'Rechercher des cours...', noCourses: 'Aucun cours disponible' },
      dashboard: { title: 'Tableau de bord', totalStudents: 'Total étudiants', totalCourses: 'Total cours', totalRevenue: 'Revenus', recentEnrollments: 'Inscriptions récentes', welcome: 'Bon retour!' },
      common: { loading: 'Chargement...', saving: 'Enregistrement...', save: 'Enregistrer', cancel: 'Annuler', delete: 'Supprimer', edit: 'Modifier', create: 'Créer', back: 'Retour', noData: 'Aucune donnée', confirm: 'Confirmer', search: 'Rechercher', filter: 'Filtrer', sort: 'Trier', view: 'Voir', download: 'Télécharger', upload: 'Téléverser', submit: 'Soumettre', grade: 'Noter', feedback: 'Commentaires', notification: 'Notification', payment: 'Paiement', profile: 'Profil', settings: 'Paramètres', language: 'Langue' },
      footer: { rights: 'Tous droits réservés.', contact: 'Contact', about: 'À propos', terms: 'Conditions', privacy: 'Confidentialité' }
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'vi',
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;