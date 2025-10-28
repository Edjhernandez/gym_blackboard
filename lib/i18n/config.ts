import { getLocales } from "expo-localization";
import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./translations/en.json";
import es from "./translations/es.json";

const resources = {
  en: {
    translation: en,
  },
  es: {
    translation: es,
  },
};

const language = getLocales()[0]?.languageCode ?? "es";

i18next.use(initReactI18next).init({
  resources,
  lng: language,
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18next;
