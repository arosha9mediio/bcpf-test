import "server-only";

const dictionaries = {
  en: () => import("./locales/en.json").then(module => module.default),
  ko: () => import("./locales/ko.json").then(module => module.default),
};

export const getDictionary = async (locale: "en" | "ko") => {
  return dictionaries[locale]();
};

export type Locale = keyof typeof dictionaries;