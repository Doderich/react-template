import { FC, useState } from 'react';
import { DataTable } from '../ui/data-table';
import { Semester } from '@/types/semester';
import { Program } from '@/types/program';
import { columns } from './program-table-columns';

export const ProgramTable: FC<{ programs: Program[] }> = ({ programs }) => {
	return <DataTable<Program, any> columns={columns} data={programs} />;
};
