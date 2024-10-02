'use client';

import { Dozent, Professor } from '@/types/personal';
import { ColumnDef } from '@tanstack/react-table';

export const columns: ColumnDef<Dozent>[] = [
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
		accessorKey: 'person.facultyId',
		header: 'Faculty',
	},
	{
		accessorKey: 'type',
		header: 'Type',
	},
];
