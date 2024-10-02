'use client';

import { Professor } from '@/types/personal';
import { ColumnDef } from '@tanstack/react-table';

export const columns: ColumnDef<Professor>[] = [
	{
		accessorKey: 'person.firstName',
		header: 'First Name',
	},
	{
		accessorKey: 'person.surname',
		header: 'Last Name',
	},
	{
		accessorKey: 'person.role',
		header: 'Role',
	},
	{
		accessorKey: 'person.commentary',
		header: 'Kommentar',
	},
	{
		accessorKey: 'workload',
		header: 'Workload',
	},
	{
		accessorKey: 'semester.vintage',
		header: 'Semester',
	},
];
