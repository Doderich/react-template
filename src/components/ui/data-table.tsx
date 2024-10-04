'use client';

import {
	ColumnDef,
	flexRender,
	getCoreRowModel,
	useReactTable,
} from '@tanstack/react-table';

import {
	Table,
	TableBody,
	TableCell as TableCellType,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { useEffect, useState } from 'react';
import { Button } from './button';
import { Cross1Icon, Pencil1Icon } from '@radix-ui/react-icons';
import { SaveIcon } from 'lucide-react';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from './select';
import { Input } from './input';

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
}
// @ts-ignore
export const TableCell = ({ getValue, row, column, table }) => {
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
// @ts-ignore
export const EditCell = ({ row, table, onCellSave }) => {
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

export function DataTable<TData, TValue>({
	columns,
	data: defaultData,
}: DataTableProps<TData, TValue>) {
	const [data, setData] = useState(() => [...defaultData]);
	const [originalData, setOriginalData] = useState(() => [...defaultData]);
	const [editedRows, setEditedRows] = useState({});

	useEffect(() => {
		setData(defaultData);
		setOriginalData(defaultData);
	}, [defaultData]);
	console.log(data);
	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		meta: {
			editedRows,
			setEditedRows,
			revertData: (rowIndex: number, revert: boolean) => {
				if (revert) {
					setData(old =>
						old.map((row, index) =>
							index === rowIndex ? originalData[rowIndex] : row,
						),
					);
				} else {
					setOriginalData(old =>
						old.map((row, index) =>
							index === rowIndex ? data[rowIndex] : row,
						),
					);
				}
			},
			updateData: (rowIndex: number, columnId: string, value: string) => {
				setData(old =>
					old.map((row, index) => {
						if (index === rowIndex) {
							return {
								...old[rowIndex],
								[columnId]: value,
							};
						}
						return row;
					}),
				);
			},
		},
	});

	return (
		<div className="rounded-md border">
			<Table>
				<TableHeader>
					{table.getHeaderGroups().map(headerGroup => (
						<TableRow key={headerGroup.id}>
							{headerGroup.headers.map(header => {
								return (
									<TableHead key={header.id}>
										{header.isPlaceholder
											? null
											: flexRender(
													header.column.columnDef
														.header,
													header.getContext(),
												)}
									</TableHead>
								);
							})}
						</TableRow>
					))}
				</TableHeader>
				<TableBody>
					{table.getRowModel().rows?.length ? (
						table.getRowModel().rows.map(row => (
							<TableRow
								key={row.id}
								data-state={row.getIsSelected() && 'selected'}
							>
								{row.getVisibleCells().map(cell => (
									<TableCellType key={cell.id}>
										{flexRender(
											cell.column.columnDef.cell,
											cell.getContext(),
										)}
									</TableCellType>
								))}
							</TableRow>
						))
					) : (
						<TableRow>
							<TableCellType
								colSpan={columns.length}
								className="h-24 text-center"
							>
								No results.
							</TableCellType>
						</TableRow>
					)}
				</TableBody>
			</Table>
		</div>
	);
}
