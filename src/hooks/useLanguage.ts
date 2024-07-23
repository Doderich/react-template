import i18n, { supportedLanguages } from '@/lib/i18n';

const useLanguage = () => {
	return {
		setLanguage: (lang: string) => {
			i18n.changeLanguage(lang);
		},
		currentLanguage: () => i18n.language,
		supportedLanguages,
	};
};

export default useLanguage;
