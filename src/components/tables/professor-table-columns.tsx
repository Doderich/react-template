'use client';

import { Professor, UpdateProfessorSchema } from '@/types/personal';
import { ColumnDef } from '@tanstack/react-table';
import { UpdateDialog } from '../dialogs/update-dialog';
import { useProfessor } from '@/hooks/queries/useProfessor';
import { DeleteDialog } from '../dialogs/delete-dialog';
import { CreateProfessorForm } from '../forms/create-professor-form';

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
	{
		accessorKey: 'actions',
		header: 'Actions',
		cell: ({ row }) => {
			const { deleteProfessorAsync, updateProfessorAsync } =
				useProfessor();
			return (
				<div className="flex gap-2">
					<UpdateDialog
						title="Update Professor"
						schema={UpdateProfessorSchema}
						onSubmit={async function (data: any): Promise<void> {
							await updateProfessorAsync(data);
						}}
						initialValues={{
							...row.original,
						}}
					>
						<div>
							<CreateProfessorForm />
						</div>
					</UpdateDialog>
					<DeleteDialog
						title="Delete Professor"
						description="Wollen Sie wirklich löschen?"
						onDelete={async () =>
							await deleteProfessorAsync(row.original.professorId)
						}
					/>
				</div>
			);
		},
	},
];
