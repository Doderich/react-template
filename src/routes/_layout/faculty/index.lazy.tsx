import { CreateDialog } from '@/components/dialogs/create-dialog';
import { CreateFacultyForm } from '@/components/forms/create-faculty-form';
import { Header } from '@/components/header';
import { columns } from '@/components/tables/faculty-table-columns';
import { DataTable } from '@/components/ui/data-table';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { useFaculty } from '@/hooks/queries/useFaculty';
import { CreateFacultySchema, Faculty } from '@/types/faculty';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/_layout/faculty/')({
	component: FacultyPage,
});

function FacultyPage() {
	const { faculties, createFacultyAsync } = useFaculty();
	return (
		<>
			<ScrollArea className="max-h-full">
				<ScrollBar orientation="vertical" />
				<Header title="Faculty" />
				<div className="p-6 flex flex-col gap-2">
					<CreateDialog
						title="Erstelle Fakultät"
						btnText="Erstelle Fakultät"
						onSubmit={async data => {
							await createFacultyAsync(data);
						}}
						schema={CreateFacultySchema}
					>
						<div className="flex flex-col gap-2">
							<CreateFacultyForm />
						</div>
					</CreateDialog>
					<DataTable<Faculty, any>
						columns={columns}
						data={faculties ?? []}
					/>
				</div>
			</ScrollArea>
		</>
	);
}
