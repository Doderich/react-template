'use client';

import { Semester } from '@/types/semester';
import { ColumnDef, Row } from '@tanstack/react-table';

export const columns: ColumnDef<{
	vintage: string;
	numberOfSemesters: number[];
}>[] = [
	{
		accessorKey: 'vintage',
		header: 'Vintage',
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
];
