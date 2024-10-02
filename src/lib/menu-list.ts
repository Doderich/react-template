import { DotsVerticalIcon } from '@radix-ui/react-icons';
import {
	Tag,
	Users,
	Settings,
	Bookmark,
	SquarePen,
	LayoutGrid,
	LucideIcon,
	Book,
} from 'lucide-react';
import React from 'react';

type Submenu = {
	href: string;
	label: string;
	active: boolean;
};

type Menu = {
	href: string;
	label: string;
	active: boolean;
	icon: LucideIcon;
	submenus: Submenu[];
};

type Group = {
	groupLabel: string;
	menus: Menu[];
};

export function getMenuList(pathname: string): Group[] {
	return [
		{
			groupLabel: '',
			menus: [
				{
					href: '/personal',
					label: 'Personal',
					active: pathname.includes('/personal'),
					icon: Users,
					submenus: [],
				},
			],
		},
		{
			groupLabel: '',
			menus: [
				{
					href: '/semester',
					label: 'Semester',
					active: pathname.includes('/semester'),
					icon: DotsVerticalIcon as any,
					submenus: [],
				},
			],
		},
	];
}
