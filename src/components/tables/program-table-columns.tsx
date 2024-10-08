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
import { useSemester } from '@/hooks/queries/useSemester';
import { SaveIcon } from 'lucide-react';
import {
	AlertDialog,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '../ui/alert-dialog';
import { Program, UpdateProgramSchema } from '@/types/program';
import { useProgram } from '@/hooks/queries/useProgram';
import { DeleteDialog } from '../dialogs/delete-dialog';
import { UpdateDialog } from '../dialogs/update-dialog';
import { CreateProgramForm } from '../forms/create-program-form';

export const columns: ColumnDef<Program>[] = [
	{
		accessorKey: 'name',
		header: 'Name',
	},
	{
		accessorKey: 'abbreviation',
		header: 'Abkürzung',
	},
	{
		accessorKey: 'faculty.name',
		header: 'Fakultät',
	},
	{
		accessorKey: 'stupo',
		header: 'StuPo',
	},
	{
		accessorKey: 'semester',
		header: 'Semester',
	},
	{
		accessorKey: 'actions',
		header: 'Actions',
		cell: ({ row }) => {
			const { deleteProgramAsync, updateProgramAsync } = useProgram();
			return (
				<div className="flex gap-2">
					<UpdateDialog
						title="Studiengang aktualisieren"
						onSubmit={async function (data: any): Promise<void> {
							await updateProgramAsync(data);
						}}
						schema={UpdateProgramSchema}
						initialValues={row.original}
					>
						<CreateProgramForm />
					</UpdateDialog>
					<DeleteDialog
						title="Studiengang löschen"
						description="Möchten Sie diesen Studiengang wirklich löschen?"
						onDelete={async () =>
							await deleteProgramAsync(
								row.original.studyProgramId.toString(),
							)
						}
					/>
				</div>
			);
		},
	},
];
