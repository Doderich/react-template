import { LanguageToggle } from './language-toggle';
import { ThemeToggle } from './theme-toggle';

export const Header = () => {
	return (
		<header className="w-full flex justify-between p-2">
			<h2>Header</h2>
			<div className=" flex items-center gap-2">
				<LanguageToggle />
				<ThemeToggle />
			</div>
		</header>
	);
};
