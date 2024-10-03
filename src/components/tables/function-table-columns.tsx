'use client';

import { ColumnDef } from '@tanstack/react-table';

import { DeleteDialog } from '../dialogs/delete-dialog';
import { useFunction } from '@/hooks/queries/useFunction';
import { Function } from '@/types/function';
import { UpdateFunctionDialog } from '../dialogs/update-function-dialog';

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
			const { deleteFunctionAsync } = useFunction();
			return (
				<div className="flex gap-2">
					<UpdateFunctionDialog {...row.original} />
					<DeleteDialog
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
