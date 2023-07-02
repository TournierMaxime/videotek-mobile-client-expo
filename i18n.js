import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import * as Localization from 'expo-localization'
import ar from './src/locales/ar/translation.json'
import de from './src/locales/de/translation.json'
import en from './src/locales/en/translation.json'
import es from './src/locales/es/translation.json'
import fr from './src/locales/fr/translation.json'
import it from './src/locales/it/translation.json'
import ja from './src/locales/ja/translation.json'
import ko from './src/locales/ko/translation.json'
import nl from './src/locales/nl/translation.json'
import pt from './src/locales/pt/translation.json'
import ru from './src/locales/ru/translation.json'
import zh from './src/locales/zh/translation.json'

const DETECTION_OPTIONS = {
  order: ['localStorage'],
  caches: ['localStorage'],
}

const langStringify = JSON.stringify(i18n.language)

const languageDetector = {
  type: 'languageDetector',
  async: true,
  detect: (callback) => {
    callback(Localization.locale.split('-')[0])
  },
  init: () => {},
  cacheUserLanguage: () => {},
}

i18n
  .use(languageDetector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: {
      ar: {
        translation: ar,
      },
      de: {
        translation: de,
      },
      en: {
        translation: en,
      },
      es: {
        translation: es,
      },
      fr: {
        translation: fr,
      },
      it: {
        translation: it,
      },
      ja: {
        translation: ja,
      },
      ko: {
        translation: ko,
      },
      nl: {
        translation: nl,
      },
      pt: {
        translation: pt,
      },
      ru: {
        translation: ru,
      },
      zh: {
        translation: zh,
      },
    },

    compatibilityJSON: 'v3',
    detection: DETECTION_OPTIONS,
    useLocalStorage: true,
    lng: langStringify,
    fallbackLng: 'en-US',
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  })

export default i18n
