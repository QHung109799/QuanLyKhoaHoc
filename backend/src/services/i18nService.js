/**
 * i18n Service
 * 
 * Quản lý đa ngôn ngữ cho hệ thống.
 * Hỗ trợ: vi, en, zh, ja, de, fr
 */

const translations = {
  vi: {
    common: {
      welcome: 'Chào mừng bạn đến với Hệ thống Quản lý Khóa học',
      login: 'Đăng nhập',
      register: 'Đăng ký',
      logout: 'Đăng xuất',
      search: 'Tìm kiếm',
      save: 'Lưu',
      cancel: 'Hủy',
      delete: 'Xóa',
      edit: 'Sửa',
      create: 'Tạo mới',
      back: 'Quay lại',
      loading: 'Đang tải...',
      noData: 'Không có dữ liệu'
    },
    auth: {
      email: 'Email',
      password: 'Mật khẩu',
      confirmPassword: 'Xác nhận mật khẩu',
      forgotPassword: 'Quên mật khẩu?',
      resetPassword: 'Đặt lại mật khẩu',
      noAccount: 'Chưa có tài khoản?',
      hasAccount: 'Đã có tài khoản?'
    },
    course: {
      title: 'Khóa học',
      myCourses: 'Khóa học của tôi',
      allCourses: 'Tất cả khóa học',
      free: 'Miễn phí',
      paid: 'Trả phí',
      enroll: 'Đăng ký',
      enrolled: 'Đã đăng ký',
      teacher: 'Giảng viên',
      students: 'Học viên',
      lessons: 'Bài học',
      assignments: 'Bài tập',
      discussions: 'Thảo luận'
    },
    dashboard: {
      title: 'Bảng điều khiển',
      totalStudents: 'Tổng học viên',
      totalCourses: 'Tổng khóa học',
      totalRevenue: 'Doanh thu',
      recentEnrollments: 'Đăng ký gần đây'
    }
  },
  en: {
    common: {
      welcome: 'Welcome to Course Management System',
      login: 'Login',
      register: 'Register',
      logout: 'Logout',
      search: 'Search',
      save: 'Save',
      cancel: 'Cancel',
      delete: 'Delete',
      edit: 'Edit',
      create: 'Create',
      back: 'Back',
      loading: 'Loading...',
      noData: 'No data available'
    },
    auth: {
      email: 'Email',
      password: 'Password',
      confirmPassword: 'Confirm Password',
      forgotPassword: 'Forgot Password?',
      resetPassword: 'Reset Password',
      noAccount: "Don't have an account?",
      hasAccount: 'Already have an account?'
    },
    course: {
      title: 'Course',
      myCourses: 'My Courses',
      allCourses: 'All Courses',
      free: 'Free',
      paid: 'Paid',
      enroll: 'Enroll',
      enrolled: 'Enrolled',
      teacher: 'Teacher',
      students: 'Students',
      lessons: 'Lessons',
      assignments: 'Assignments',
      discussions: 'Discussions'
    },
    dashboard: {
      title: 'Dashboard',
      totalStudents: 'Total Students',
      totalCourses: 'Total Courses',
      totalRevenue: 'Revenue',
      recentEnrollments: 'Recent Enrollments'
    }
  },
  zh: {
    common: {
      welcome: '欢迎使用课程管理系统',
      login: '登录',
      register: '注册',
      logout: '退出',
      search: '搜索',
      save: '保存',
      cancel: '取消',
      delete: '删除',
      edit: '编辑',
      create: '创建',
      back: '返回',
      loading: '加载中...',
      noData: '暂无数据'
    },
    auth: {
      email: '邮箱',
      password: '密码',
      confirmPassword: '确认密码',
      forgotPassword: '忘记密码？',
      resetPassword: '重置密码',
      noAccount: '没有账号？',
      hasAccount: '已有账号？'
    },
    course: {
      title: '课程',
      myCourses: '我的课程',
      allCourses: '所有课程',
      free: '免费',
      paid: '付费',
      enroll: '注册',
      enrolled: '已注册',
      teacher: '讲师',
      students: '学生',
      lessons: '课时',
      assignments: '作业',
      discussions: '讨论'
    },
    dashboard: {
      title: '仪表盘',
      totalStudents: '学生总数',
      totalCourses: '课程总数',
      totalRevenue: '收入',
      recentEnrollments: '最近注册'
    }
  },
  ja: {
    common: {
      welcome: 'コース管理システムへようこそ',
      login: 'ログイン',
      register: '登録',
      logout: 'ログアウト',
      search: '検索',
      save: '保存',
      cancel: 'キャンセル',
      delete: '削除',
      edit: '編集',
      create: '作成',
      back: '戻る',
      loading: '読み込み中...',
      noData: 'データがありません'
    },
    auth: {
      email: 'メール',
      password: 'パスワード',
      confirmPassword: 'パスワード確認',
      forgotPassword: 'パスワードをお忘れですか？',
      resetPassword: 'パスワードリセット',
      noAccount: 'アカウントをお持ちでない方',
      hasAccount: 'すでにアカウントをお持ちの方'
    },
    course: {
      title: 'コース',
      myCourses: 'マイコース',
      allCourses: 'すべてのコース',
      free: '無料',
      paid: '有料',
      enroll: '登録',
      enrolled: '登録済み',
      teacher: '講師',
      students: '学生',
      lessons: 'レッスン',
      assignments: '課題',
      discussions: 'ディスカッション'
    },
    dashboard: {
      title: 'ダッシュボード',
      totalStudents: '総学生数',
      totalCourses: '総コース数',
      totalRevenue: '収益',
      recentEnrollments: '最近の登録'
    }
  },
  de: {
    common: {
      welcome: 'Willkommen beim Kursverwaltungssystem',
      login: 'Anmelden',
      register: 'Registrieren',
      logout: 'Abmelden',
      search: 'Suchen',
      save: 'Speichern',
      cancel: 'Abbrechen',
      delete: 'Löschen',
      edit: 'Bearbeiten',
      create: 'Erstellen',
      back: 'Zurück',
      loading: 'Laden...',
      noData: 'Keine Daten verfügbar'
    },
    auth: {
      email: 'E-Mail',
      password: 'Passwort',
      confirmPassword: 'Passwort bestätigen',
      forgotPassword: 'Passwort vergessen?',
      resetPassword: 'Passwort zurücksetzen',
      noAccount: 'Noch kein Konto?',
      hasAccount: 'Bereits ein Konto?'
    },
    course: {
      title: 'Kurs',
      myCourses: 'Meine Kurse',
      allCourses: 'Alle Kurse',
      free: 'Kostenlos',
      paid: 'Bezahlt',
      enroll: 'Einschreiben',
      enrolled: 'Eingeschrieben',
      teacher: 'Dozent',
      students: 'Studenten',
      lessons: 'Lektionen',
      assignments: 'Aufgaben',
      discussions: 'Diskussionen'
    },
    dashboard: {
      title: 'Dashboard',
      totalStudents: 'Gesamtstudenten',
      totalCourses: 'Gesamtkurse',
      totalRevenue: 'Einnahmen',
      recentEnrollments: 'Letzte Einschreibungen'
    }
  },
  fr: {
    common: {
      welcome: 'Bienvenue sur le Système de Gestion de Cours',
      login: 'Connexion',
      register: 'Inscription',
      logout: 'Déconnexion',
      search: 'Rechercher',
      save: 'Enregistrer',
      cancel: 'Annuler',
      delete: 'Supprimer',
      edit: 'Modifier',
      create: 'Créer',
      back: 'Retour',
      loading: 'Chargement...',
      noData: 'Aucune donnée disponible'
    },
    auth: {
      email: 'Email',
      password: 'Mot de passe',
      confirmPassword: 'Confirmer le mot de passe',
      forgotPassword: 'Mot de passe oublié?',
      resetPassword: 'Réinitialiser le mot de passe',
      noAccount: 'Pas de compte?',
      hasAccount: 'Déjà un compte?'
    },
    course: {
      title: 'Cours',
      myCourses: 'Mes cours',
      allCourses: 'Tous les cours',
      free: 'Gratuit',
      paid: 'Payant',
      enroll: 'S\'inscrire',
      enrolled: 'Inscrit',
      teacher: 'Enseignant',
      students: 'Étudiants',
      lessons: 'Leçons',
      assignments: 'Devoirs',
      discussions: 'Discussions'
    },
    dashboard: {
      title: 'Tableau de bord',
      totalStudents: 'Total étudiants',
      totalCourses: 'Total cours',
      totalRevenue: 'Revenus',
      recentEnrollments: 'Inscriptions récentes'
    }
  }
};

/**
 * Lấy tất cả translations cho một ngôn ngữ
 */
const getTranslations = (lang) => {
  if (translations[lang]) {
    return translations[lang];
  }
  return translations.vi; // Default to Vietnamese
};

/**
 * Lấy danh sách ngôn ngữ hỗ trợ
 */
const getSupportedLanguages = () => {
  return [
    { code: 'vi', name: 'Tiếng Việt', flag: '🇻🇳' },
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'zh', name: '中文', flag: '🇨🇳' },
    { code: 'ja', name: '日本語', flag: '🇯🇵' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' }
  ];
};

module.exports = { getTranslations, getSupportedLanguages };