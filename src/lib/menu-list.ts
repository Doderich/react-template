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
	House,
	FunctionSquareIcon,
	SchoolIcon,
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
				{
					href: '/semester',
					label: 'Semester',
					active: pathname.includes('/semester'),
					icon: DotsVerticalIcon as any,
					submenus: [],
				},
				{
					href: '/faculty',
					label: 'Facultät',
					active: pathname.includes('/faculty'),
					icon: House as any,
					submenus: [],
				},
				{
					href: '/program',
					label: 'Studiengang',
					active: pathname.includes('/program'),
					icon: Book as any,
					submenus: [],
				},
				{
					href: '/function',
					label: 'Function',
					active: pathname.includes('/function'),
					icon: FunctionSquareIcon as any,
					submenus: [],
				},
				{
					href: '/subject',
					label: 'Fach',
					active: pathname.includes('/subject'),
					icon: SchoolIcon as any,
					submenus: [],
				},
			],
		},
	];
}
