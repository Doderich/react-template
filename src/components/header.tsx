import { LanguageToggle } from './language-toggle';
import { ThemeToggle } from './theme-toggle';
import { useTranslation } from 'react-i18next';
import { FC } from 'react';

export const Header: FC<{ title: string }> = ({ title }) => {
	const { t } = useTranslation('Navigation');

	return (
		<header className="w-full flex justify-between p-2 pl-6">
			<h2>{title}</h2>
			<div className=" flex items-center justify-end gap-2">
				<LanguageToggle />
				<ThemeToggle />
			</div>
		</header>
	);
};
