'use client';

import { ColumnDef, Row } from '@tanstack/react-table';
import { DeleteDialog } from '../dialogs/delete-dialog';
import { Subject, UpdateSubjectSchema } from '@/types/subject';
import { useSubject } from '@/hooks/queries/useSubject';
import { UpdateDialog } from '../dialogs/update-dialog';
import { CreateSubjectForm } from '../forms/create-subject-form';

export const columns: ColumnDef<Subject>[] = [
	{
		accessorKey: 'subjectNumber',
		header: 'Numer',
	},
	{
		accessorKey: 'subjectNumber',
		header: 'Name',
	},
	{
		accessorKey: 'studyPrograms',
		header: 'Studiengang',
		cell: ({ row }) => {
			if (row.original.studyPrograms.length === 0) return null;

			return <p>{row.original.studyPrograms[0].name}</p>;
		},
	},
	{
		accessorKey: 'lectureType',
		header: 'Vorlesungstyp',
	},
	{
		accessorKey: 'stupoHours',
		header: 'Stupo Stunden',
	},
	{
		accessorKey: 'planHours',
		header: 'Plan Stunden',
	},
	{
		accessorKey: 'remark',
		header: 'Bemerkung',
	},
	{
		accessorKey: 'actions',
		header: 'Actions',
		cell: ({ row }) => {
			const { deleteSubjectAsync, updateSubjectAsync } = useSubject();
			return (
				<div className="flex gap-2">
					<UpdateDialog
						title="Update Subject"
						schema={UpdateSubjectSchema}
						onSubmit={async function (data: any): Promise<void> {
							await updateSubjectAsync(data);
						}}
						initialValues={{
							...row.original,
							studyPrograms:
								row.original.studyPrograms.length > 0
									? row.original.studyPrograms[0]
											.studyProgramId
									: null,
						}}
					>
						<div>
							<CreateSubjectForm />
						</div>
					</UpdateDialog>
					<DeleteDialog
						title="Delete Subject"
						description="Are you sure you want to delete this subject?"
						onDelete={async () =>
							await deleteSubjectAsync(
								row.original.subjectId.toString(),
							)
						}
					/>
				</div>
			);
		},
	},
];
