import { FC, useState } from 'react';
import { DataTable } from '../ui/data-table';
import { Semester } from '@/types/semester';
import { Faculty } from '@/types/faculty';
import { columns } from './faculty-table-columns';

export const FacultyTable: FC<{ faculties: Faculty[] }> = ({ faculties }) => {
	return <DataTable<Faculty, any> columns={columns} data={faculties} />;
};
