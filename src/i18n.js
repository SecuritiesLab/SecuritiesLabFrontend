// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend'; // Plugin to load translations from the backend
import LanguageDetector from 'i18next-browser-languagedetector'; // Automatically detects user language

i18n
  .use(Backend) // Load translations using HTTP
  .use(LanguageDetector) // Detect user language
  .use(initReactI18next) // Bind react-i18next to i18next
  .init({
    fallbackLng: 'en', // Default language if detection fails
    debug: true, // Set to false in production
    backend: {
      loadPath: '/locales/{{lng}}/translation.json', // Path to the translation files
    },
    interpolation: {
      escapeValue: false, // React already does escaping
    },
  });

export default i18n;