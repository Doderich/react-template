'use client';

import { ColumnDef } from '@tanstack/react-table';

import { DeleteDialog } from '../dialogs/delete-dialog';
import { useFunction } from '@/hooks/queries/useFunction';
import { Function, UpdateFunctionSchema } from '@/types/function';
import { UpdateDialog } from '../dialogs/update-dialog';
import { CreateFunctionForm } from '../forms/create-function-form';

export const columns: ColumnDef<Function>[] = [
	{
		accessorKey: 'name',
		header: 'Name',
	},
	{
		accessorKey: 'transferPeriod',
		header: 'Transferzeit',
	},
	{
		accessorKey: 'actions',
		header: 'Actions',
		cell: ({ row }) => {
			const { deleteFunctionAsync, updateFunctionAsync } = useFunction();
			return (
				<div className="flex gap-2">
					<UpdateDialog
						title="Funktion Aktualisieren"
						onSubmit={async function (data: any): Promise<void> {
							await updateFunctionAsync(data);
						}}
						schema={UpdateFunctionSchema}
						initialValues={row.original}
					>
						<CreateFunctionForm />
					</UpdateDialog>
					<DeleteDialog
						title="Funktion löschen"
						description="Möchten Sie die Funktion wirklich löschen?"
						onDelete={async () =>
							await deleteFunctionAsync(
								row.original.functionId.toString(),
							)
						}
					/>
				</div>
			);
		},
	},
];
