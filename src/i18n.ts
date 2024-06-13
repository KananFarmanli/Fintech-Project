import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import english from "./locales/en/translation.json";
import russian from "./locales/ru/translation.json";
import turkish from "./locales/tr/translation.json";

i18n.use(initReactI18next).init({
  debug: true,
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
  resources: {
    en: {
      translation: english,
    },
    ru: {
      translation: russian,
    },
    tr: {
      translation: turkish,
    },
  },
});

export default i18n;
