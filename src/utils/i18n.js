import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import enTranslation from "../locales/translation.en.dynamic.json";
import zhTranslation from "../locales/translation.zh.dynamic.json";

export const initI18n = async () => {
  return i18n.use(initReactI18next).init({
    lng: "en",
    resources: {
      en: {
        translation: enTranslation
      },
      zh: {
        translation: zhTranslation
      }
    },
    joinArrays: "\n",
    interpolation: {
      formatSeparator: ",",
      defaultVariables: { displayName: "old", productName: "old" },
      escapeValue: false
    },
    react: {
      bindI18n: "languageChanged",
      transEmptyNodeValue: "",
      transSupportBasicHtmlNodes: true,
      transKeepBasicHtmlNodesFor: ["br", "strong", "i"],
      useSuspense: true
    }
  });
};

/**
 * set defaultVariables after i18n init
 * @param {*} variables
 */
export const setInterpolationDefaults = (variables) => {
  i18n.options.interpolation.defaultVariables = {
    ...variables
  };
};
