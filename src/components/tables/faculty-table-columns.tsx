'use client';

import { ColumnDef } from '@tanstack/react-table';

import { Faculty, UpdateFaculty, UpdateFacultySchema } from '@/types/faculty';
import { useFaculty } from '@/hooks/queries/useFaculty';
import { DeleteDialog } from '../dialogs/delete-dialog';
import { UpdateDialog } from '../dialogs/update-dialog';
import { CreateFacultyForm } from '../forms/create-faculty-form';

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
			const { deleteFacultyAsync, updateFacultyAsync } = useFaculty();
			return (
				<div className="flex gap-2">
					<UpdateDialog
						onSubmit={async function (
							data: UpdateFaculty,
						): Promise<void> {
							await updateFacultyAsync(data);
						}}
						schema={UpdateFacultySchema}
						title={'Update Faculty'}
						initialValues={row.original}
					>
						<CreateFacultyForm />
					</UpdateDialog>
					<DeleteDialog
						onDelete={async () =>
							await deleteFacultyAsync(
								row.original.facultyId.toString(),
							)
						}
						title={'Delete Faculty'}
						description={
							'Are you sure you want to delete this faculty?'
						}
					/>
				</div>
			);
		},
	},
];
