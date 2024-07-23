import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import useLanguage from '@/hooks/useLanguage';
import { useTranslation } from 'react-i18next';
import { CheckIcon, GlobeIcon } from '@radix-ui/react-icons';

export function LanguageToggle() {
	const { setLanguage, supportedLanguages, currentLanguage } = useLanguage();
	const { t } = useTranslation('Language');

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="outline" size="icon">
					<GlobeIcon className="size-5" />
					<span className="sr-only">{t('change_language')}</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				{supportedLanguages.map(lang => {
					return (
						<DropdownMenuItem
							key={lang}
							onClick={() => setLanguage(lang)}
						>
							{t(lang)}
							{currentLanguage() === lang && (
								<CheckIcon className="ml-auto" />
							)}
						</DropdownMenuItem>
					);
				})}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
