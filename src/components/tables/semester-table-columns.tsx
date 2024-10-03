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

const TableCell = ({ getValue, row, column, table }) => {
	const initialValue = getValue();
	const columnMeta = column.columnDef.meta;
	const tableMeta = table.options.meta;
	const [value, setValue] = useState(initialValue);

	useEffect(() => {
		setValue(initialValue);
	}, [initialValue]);

	const onBlur = () => {
		tableMeta?.updateData(row.index, column.id, value);
	};

	const onSelectChange = (value: string) => {
		setValue(value);
		tableMeta?.updateData(row.index, column.id, value);
	};

	if (tableMeta?.editedRows[row.id]) {
		return columnMeta?.type === 'select' ? (
			<Select onValueChange={onSelectChange} defaultValue={initialValue}>
				<SelectTrigger>
					<SelectValue />
				</SelectTrigger>
				<SelectContent>
					{columnMeta?.options?.map(
						(option: { value: string; label: string }) => (
							<SelectItem key={option.value} value={option.value}>
								{option.label}
							</SelectItem>
						),
					)}
				</SelectContent>
			</Select>
		) : (
			<Input
				value={value}
				onChange={e => setValue(e.target.value)}
				onBlur={onBlur}
				type={columnMeta?.type || 'text'}
			/>
		);
	}

	return <p>{getValue()}</p>;
};

const EditCell = ({ row, table, onCellSave }) => {
	const meta = table.options.meta;

	const setEditedRows = (e: React.MouseEvent<HTMLButtonElement>) => {
		const elName = e.currentTarget.name;
		meta?.setEditedRows((old: []) => ({
			...old,
			[row.id]: !old[row.id],
		}));
		if (elName !== 'edit') {
			meta?.revertData(row.index, e.currentTarget.name === 'cancel');
		}
	};

	const onSave = () => {
		onCellSave(row, table);
		setEditedRows({
			currentTarget: { name: 'edit' },
		} as React.MouseEvent<HTMLButtonElement>);
	};

	return meta?.editedRows[row.id] ? (
		<div className="flex gap-2">
			<Button size={'icon'} onClick={setEditedRows} name="cancel">
				<Cross1Icon />
			</Button>
			<Button size={'icon'} onClick={onSave}>
				<SaveIcon />
			</Button>
		</div>
	) : (
		<Button size={'icon'} onClick={setEditedRows} name="edit">
			<Pencil1Icon />
		</Button>
	);
};

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
			const [open, setOpen] = useState(false);
			const { deleteSemesterAsync } = useSemester();

			return (
				<AlertDialog open={open} onOpenChange={setOpen}>
					<AlertDialogTrigger asChild>
						<Button size={'icon'}>
							<TrashIcon />
						</Button>
					</AlertDialogTrigger>
					<AlertDialogContent>
						<AlertDialogHeader>
							<AlertDialogTitle>
								Are you sure you want to delete this semester?
							</AlertDialogTitle>
						</AlertDialogHeader>
						<AlertDialogDescription>
							This action is irreversible. You will lose all data
							associated with this semester.
						</AlertDialogDescription>
						<AlertDialogFooter>
							<AlertDialogCancel asChild>
								<Button variant={'secondary'}>Cancel</Button>
							</AlertDialogCancel>
							<Button
								variant={'destructive'}
								onClick={async () => {
									await deleteSemesterAsync(
										props.row.original.vintage,
									);
									setOpen(false);
								}}
							>
								Yes
							</Button>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialog>
			);
		},
	},
];
