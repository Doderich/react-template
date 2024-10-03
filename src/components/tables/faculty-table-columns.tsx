'use client';

import { ColumnDef, Row } from '@tanstack/react-table';
import { Button } from '../ui/button';
import { Cross1Icon, Pencil1Icon, TrashIcon } from '@radix-ui/react-icons';
import { useEffect, useState } from 'react';
import { Input } from '../ui/input';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '../ui/select';

import { Faculty } from '@/types/faculty';
import { UpdateFacultyDialog } from '../dialogs/update-faculty-dialog';
import { useFaculty } from '@/hooks/queries/useFaculty';
import { DeleteDialog } from '../dialogs/delete-dialog';

export const columns: ColumnDef<Faculty>[] = [
	{
		accessorKey: 'name',
		header: 'Name',
	},
	{
		accessorKey: 'abbreviation',
		header: 'Abkürzung',
	},
	{
		accessorKey: 'actions',
		header: 'Actions',
		cell: ({ row }) => {
			const { deleteFacultyAsync } = useFaculty();
			return (
				<div className="flex gap-2">
					<UpdateFacultyDialog {...row.original} />
					<DeleteDialog
						onDelete={async () =>
							await deleteFacultyAsync(
								row.original.facultyId.toString(),
							)
						}
					/>
				</div>
			);
		},
	},
];
