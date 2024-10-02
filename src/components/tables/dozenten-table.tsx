import { FC } from 'react';
import { DataTable } from '../ui/data-table';
import { Dozent } from '@/types/personal';
import { columns } from './dozenten-table-columns';

export const DozentenTable: FC<{ dozenten: Dozent[] }> = ({ dozenten }) => {
	return <DataTable<Dozent, any> columns={columns} data={dozenten} />;
};
