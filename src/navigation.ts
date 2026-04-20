import { type ObjectValues } from "./utils/type";

export const LANGUAGE = {
  EN: "en",
  JA: "ja",
} as const;
export const fallbackLng = LANGUAGE.EN;
export type Language = ObjectValues<typeof LANGUAGE>;
export const locales = [LANGUAGE.EN, LANGUAGE.JA] as const;
export const localePrefix = "always"; // Default

export const languageLabels: Record<Language, string> = {
  en: "English",
  ja: "日本語",
};
