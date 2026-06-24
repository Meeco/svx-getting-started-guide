import i18n from "i18next"
import { initReactI18next } from "react-i18next"
import LanguageDetector from "i18next-browser-languagedetector"

import en from "./locales/en/translation.json"
import ja from "./locales/ja/translation.json"

export const SUPPORTED_LANGUAGES = [
  { code: "en", label: "English" },
  { code: "ja", label: "日本語" },
] as const

export type LanguageCode = (typeof SUPPORTED_LANGUAGES)[number]["code"]

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      ja: { translation: ja },
    },
    // English is the default; fall back to it for any missing key.
    fallbackLng: "en",
    supportedLngs: ["en", "ja"],
    // Match "ja-JP" -> "ja" when auto-detecting the browser locale.
    load: "languageOnly",
    detection: {
      // Query string (?lng=ja) → saved choice → browser default.
      order: ["querystring", "localStorage", "navigator", "htmlTag"],
      lookupQuerystring: "lng",
      lookupLocalStorage: "svx-lang",
      caches: ["localStorage"],
    },
    interpolation: { escapeValue: false },
  })

// Keep <html lang> in sync for accessibility.
i18n.on("languageChanged", (lng) => {
  document.documentElement.lang = lng
})

export default i18n
