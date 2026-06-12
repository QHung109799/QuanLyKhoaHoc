const express = require('express');
const router = express.Router();
const i18nController = require('../controllers/i18nController');

// GET /api/i18n/languages - Danh sách ngôn ngữ hỗ trợ
router.get('/languages', i18nController.getLanguages);

// GET /api/i18n/:lang - Lấy translations
router.get('/:lang', i18nController.getTranslations);

module.exports = router;