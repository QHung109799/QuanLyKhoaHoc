const i18nService = require('../services/i18nService');

const getTranslations = async (req, res) => {
  try {
    const { lang } = req.params;
    const translations = i18nService.getTranslations(lang);
    res.json({ success: true, data: translations });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const getLanguages = async (req, res) => {
  try {
    const languages = i18nService.getSupportedLanguages();
    res.json({ success: true, data: languages });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = { getTranslations, getLanguages };