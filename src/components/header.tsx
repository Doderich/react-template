import { Link } from '@tanstack/react-router';
import { LanguageToggle } from './language-toggle';
import { ThemeToggle } from './theme-toggle';
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
	navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { Separator } from '@/components/ui/separator';
import { useTranslation } from 'react-i18next';

export const Header = () => {
	const { t } = useTranslation('Navigation');

	return (
		<header className="w-full flex justify-between p-2">
			<h3>{t('title')}</h3>
			<div className=" flex items-center gap-2">
				<NavigationMenu className="mx-2">
					<NavigationMenuList>
						<NavigationMenuItem>
							<NavigationMenuTrigger>
								{t('examples')}
							</NavigationMenuTrigger>
							<NavigationMenuContent className="grid gap-3 p-2 w-fit grid-cols-[1fr_1fr]">
								<Link to="/examples/react-query">
									<NavigationMenuLink
										className={navigationMenuTriggerStyle()}
									>
										{t('example_react_query')}
									</NavigationMenuLink>
								</Link>
								<Link>
									<NavigationMenuLink
										className={navigationMenuTriggerStyle()}
									>
										{t('example_tanstack_table')}
									</NavigationMenuLink>
								</Link>
								<Link>
									<NavigationMenuLink
										className={navigationMenuTriggerStyle()}
									>
										{t('example_tanstack_router')}
									</NavigationMenuLink>
								</Link>
								<Link>
									<NavigationMenuLink
										className={navigationMenuTriggerStyle()}
									>
										{t('example_react_form')}
									</NavigationMenuLink>
								</Link>
								<Link className="">
									<NavigationMenuLink
										className={navigationMenuTriggerStyle()}
									>
										{t('example_rechart')}
									</NavigationMenuLink>
								</Link>
								<Link>
									<NavigationMenuLink
										className={navigationMenuTriggerStyle()}
									>
										{t('example_authentication')}
									</NavigationMenuLink>
								</Link>
							</NavigationMenuContent>
						</NavigationMenuItem>
						<NavigationMenuItem>
							<NavigationMenuTrigger>
								{t('technologies')}
							</NavigationMenuTrigger>
							<NavigationMenuContent className="grid gap-3 p-2 w-fit grid-cols-[1fr_1fr]">
								<Link>
									<NavigationMenuLink
										className={navigationMenuTriggerStyle()}
									>
										{t('react')}
									</NavigationMenuLink>
								</Link>
								<Link>
									<NavigationMenuLink
										className={navigationMenuTriggerStyle()}
									>
										{t('vite')}
									</NavigationMenuLink>
								</Link>
								<Link>
									<NavigationMenuLink
										className={navigationMenuTriggerStyle()}
									>
										{t('tailwind')}
									</NavigationMenuLink>
								</Link>
								<Link>
									<NavigationMenuLink
										className={navigationMenuTriggerStyle()}
									>
										{t('shadcnui')}
									</NavigationMenuLink>
								</Link>
								<Link className="">
									<NavigationMenuLink
										className={navigationMenuTriggerStyle()}
									>
										{t('react_query')}
									</NavigationMenuLink>
								</Link>
								<Link>
									<NavigationMenuLink
										className={navigationMenuTriggerStyle()}
									>
										{t('react_hook_form')}
									</NavigationMenuLink>
								</Link>
								<Link>
									<NavigationMenuLink
										className={navigationMenuTriggerStyle()}
									>
										{t('recharts')}
									</NavigationMenuLink>
								</Link>
								<Link>
									<NavigationMenuLink
										className={navigationMenuTriggerStyle()}
									>
										{t('tanstack_router')}
									</NavigationMenuLink>
								</Link>
								<Link>
									<NavigationMenuLink
										className={navigationMenuTriggerStyle()}
									>
										{t('tanstack_table')}
									</NavigationMenuLink>
								</Link>
								<Link>
									<NavigationMenuLink
										className={navigationMenuTriggerStyle()}
									>
										{t('authentication')}
									</NavigationMenuLink>
								</Link>
							</NavigationMenuContent>
						</NavigationMenuItem>
					</NavigationMenuList>
				</NavigationMenu>
				<Separator orientation="vertical" />
				<LanguageToggle />
				<ThemeToggle />
			</div>
		</header>
	);
};
