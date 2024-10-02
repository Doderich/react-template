import { FC } from 'react';
import { DataTable } from '../ui/data-table';
import { columns } from './professor-table-columns';
import { Professor } from '@/types/personal';

export const ProfessorTable: FC<{ professors: Professor[] }> = ({
	professors,
}) => {
	return <DataTable<Professor, any> columns={columns} data={professors} />;
};
