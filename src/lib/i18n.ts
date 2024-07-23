import i18n, { ResourceLanguage } from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)

export const supportedLanguages = ['en', 'de'];
const resources = {
	en: await import('../../messages/en.json'),
	de: await import('../../messages/de.json'),
};

export type Locale = keyof typeof resources;
i18n.use(initReactI18next) // passes i18n down to react-i18next
	.use(LanguageDetector)
	.init({
		resources,
		supportedLngs: supportedLanguages,
		interpolation: {
			escapeValue: false, // react already safes from xss
		},
	});

export default i18n;
