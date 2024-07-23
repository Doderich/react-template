import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import useTheme from '@/hooks/useTheme';
import { useTranslation } from 'react-i18next';
import { CheckIcon, MoonIcon, SunIcon } from '@radix-ui/react-icons';

export function ThemeToggle() {
	const { setTheme, theme } = useTheme();
	const { t } = useTranslation('Theme');

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="outline" size="icon">
					<SunIcon className="size-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
					<MoonIcon className="absolute size-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
					<span className="sr-only">{t('change_theme')}</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuItem onClick={() => setTheme('light')}>
					{t('light')}
					{theme === 'light' && <CheckIcon className="ml-auto" />}
				</DropdownMenuItem>
				<DropdownMenuItem onClick={() => setTheme('dark')}>
					{t('dark')}
					{theme === 'dark' && <CheckIcon className="ml-auto" />}
				</DropdownMenuItem>
				<DropdownMenuItem onClick={() => setTheme('system')}>
					{t('system')}
					{theme === 'system' && <CheckIcon className="ml-auto" />}
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
