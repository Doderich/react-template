'use client';

import { ColumnDef, Row } from '@tanstack/react-table';
import { useSemester } from '@/hooks/queries/useSemester';
import { DeleteDialog } from '../dialogs/delete-dialog';
import { EditCell, TableCell } from '../ui/data-table';

export const columns: ColumnDef<{
	id: string;
	vintage: string;
	numberOfSemesters: number[];
}>[] = [
	{
		accessorKey: 'vintage',
		header: 'Vintage',
		cell: props => {
			return <TableCell {...props} />;
		},
	},
	{
		accessorKey: 'numberOfSemesters',
		header: 'Number',
		cell: props => (
			<>
				{(props.getValue() as number[]).map((semester, index) => (
					<span key={index}>
						{index == 0 && semester + ' - '}
						{index == (props.getValue() as number[]).length - 1 &&
							semester}
					</span>
				))}
			</>
		),
	},
	{
		accessorKey: 'edit',
		header: 'Edit',
		cell: props => {
			const { updateSemester } = useSemester();

			return (
				<EditCell
					{...props}
					onCellSave={(
						row: Row<{
							vintage: string;
							numberOfSemesters: number[];
							id: string;
						}>,
					) => {
						updateSemester({
							oldVintage: row.original.id,
							newVintage: row.original.vintage,
						});
					}}
				/>
			);
		},
	},
	{
		accessorKey: 'delete',
		header: 'Delete',
		size: 5,
		cell: props => {
			const { deleteSemesterAsync } = useSemester();

			return (
				<DeleteDialog
					title={'Delete Semester'}
					description={
						'Are you sure you want to delete this semester?'
					}
					onDelete={async () => {
						await deleteSemesterAsync(props.row.original.id);
					}}
				/>
			);
		},
	},
];
