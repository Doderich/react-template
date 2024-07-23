import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpBackend from 'i18next-http-backend';
import Cookies from 'js-cookie';
import en_messages from '@/messages/en.json';
import de_messages from '@/messages/de.json';

export const supportedLanguages = ['en', 'de'];
const resources = {
	en: en_messages,
	de: de_messages,
};
export type Locale = keyof typeof resources;
const languageDetector = new LanguageDetector();
languageDetector.addDetector({
	name: 'cookie',
	lookup() {
		return Cookies.get('lang');
	},
});

i18n.use(HttpBackend)
	.use(initReactI18next) // passes i18n down to react-i18next
	.use(languageDetector)
	.init({
		resources,
		supportedLngs: supportedLanguages,
		interpolation: {
			escapeValue: false, // react already safes from xss
		},
	});

export default i18n;
