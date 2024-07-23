import i18n, { ResourceLanguage } from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
import enTranslation from '../../messages/en.json';
import deTranslation from '../../messages/de.json';

const resources = {
	en: enTranslation as ResourceLanguage,
	de: deTranslation as ResourceLanguage,
};

i18n.use(initReactI18next) // passes i18n down to react-i18next
	.use(LanguageDetector)
	.init({
		resources,
		supportedLngs: ['en', 'de'],
		interpolation: {
			escapeValue: false, // react already safes from xss
		},
	});

export default i18n;
