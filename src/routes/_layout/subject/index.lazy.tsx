import { CreateDialog } from '@/components/dialogs/create-dialog';
import { CreateSubjectForm } from '@/components/forms/create-subject-form';
import { Header } from '@/components/header';
import { columns } from '@/components/tables/subject-table-columns';
import { DataTable } from '@/components/ui/data-table';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { useSubject } from '@/hooks/queries/useSubject';
import { CreateSubject, CreateSubjectSchema, Subject } from '@/types/subject';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/_layout/subject/')({
	component: SubjectPage,
});

function SubjectPage() {
	const { subjects, createSubjectAsync } = useSubject();
	return (
		<>
			<ScrollArea className="max-h-full">
				<ScrollBar orientation="vertical" />
				<Header title="Program" />
				<div className="p-6 flex flex-col gap-2">
					<CreateDialog
						onSubmit={async data => {
							await createSubjectAsync(data as CreateSubject);
						}}
						schema={CreateSubjectSchema}
						title="Erstelle Fach"
						btnText="Erstelle Fach"
					>
						<div className="flex flex-wrap gap-4">
							<CreateSubjectForm />
						</div>
					</CreateDialog>
					<DataTable<Subject, any>
						columns={columns}
						data={subjects ?? []}
					/>
				</div>
			</ScrollArea>
		</>
	);
}
