/* eslint-disable @typescript-eslint/no-var-requires */
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { z } from "zod";
import { zodI18nMap } from "zod-i18n-map";
import zodEnTranslation from "zod-i18n-map/locales/en/zod.json";
import zodArTranslation from "zod-i18n-map/locales/ar/zod.json";

const arTranslations = require("./translations/ar.json");
const enTranslations = require("./translations/en.json");

i18n
  .use(initReactI18next)
  .init({
    compatibilityJSON: "v3",
    interpolation: {
      escapeValue: false,
    },
    fallbackLng: "en",

    resources: {
      en: {
        translation: {
          language: "English",
          justifyContent: "flex-start",
        },
        zod: zodEnTranslation,
        ...enTranslations,
      },
      ar: {
        translation: {
          language: "العربية",
          justifyContent: "flex-end",
        },
        zod: zodArTranslation,
        ...arTranslations,
      },
    },
  });

z.setErrorMap(zodI18nMap);
export default i18n;
