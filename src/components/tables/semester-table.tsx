import { FC } from 'react';
import { DataTable } from '../ui/data-table';
import { Semester } from '@/types/semester';
import { columns } from './semester-table-columns';

export const SemesterTable: FC<{ semesters: Semester[] }> = ({ semesters }) => {
	return (
		<DataTable<
			{
				vintage: string;
				numberOfSemesters: number[];
			},
			any
		>
			columns={columns}
			data={semesters.reduce(
				(
					acc: {
						vintage: string;
						numberOfSemesters: number[];
					}[],
					semester,
				) => {
					const prevEntry = acc.findIndex(
						entry => entry.vintage === semester.vintage,
					);

					if (prevEntry !== -1) {
						acc[prevEntry].numberOfSemesters.push(
							semester.semesterNumber,
						);
						return acc;
					}

					acc.push({
						vintage: semester.vintage,
						numberOfSemesters: [semester.semesterNumber],
					});
					return acc;
				},
				[],
			)}
		/>
	);
};
