import { CreateDialog } from '@/components/dialogs/create-dialog';
import { CreateDozentForm } from '@/components/forms/create-dozent-form';
import { CreateProfessorForm } from '@/components/forms/create-professor-form';
import { Header } from '@/components/header';
import { columns as Dozentcolumns } from '@/components/tables/dozenten-table-columns';
import { columns as Professorcolumns } from '@/components/tables/professor-table-columns';
import { DataTable } from '@/components/ui/data-table';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { useDozent } from '@/hooks/queries/useDozent';
import { useProfessor } from '@/hooks/queries/useProfessor';
import {
	CreateDozentSchema,
	CreateProfessorFormSchema,
	Dozent,
	Professor,
} from '@/types/personal';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/_layout/personal/')({
	component: DutyPlaner,
});

function DutyPlaner() {
	const { professors, isLoading } = useProfessor();
	const { dozenten, createDozentAsync } = useDozent();
	return (
		<>
			<ScrollArea className="max-h-full">
				<ScrollBar orientation="vertical" />
				<Header title="Personal" />
				<div className="p-6 flex flex-col gap-2">
					<h3>Professoren</h3>
					<CreateDialog
						title="Erstelle Professor"
						btnText="Erstelle Professor"
						onSubmit={async data => {
							console.log(data);
						}}
						schema={CreateProfessorFormSchema}
					>
						<div className="flex flex-col gap-2">
							<CreateProfessorForm />
						</div>
					</CreateDialog>
					<DataTable<Professor, any>
						columns={Professorcolumns}
						data={professors ?? []}
					/>
					<h3>Dozenten</h3>
					<CreateDialog
						title="Erstelle Dozent"
						btnText="Erstelle Dozent"
						onSubmit={async data => {
							await createDozentAsync(data);
						}}
						schema={CreateDozentSchema}
					>
						<div className="flex flex-col gap-2">
							<CreateDozentForm />
						</div>
					</CreateDialog>
					<DataTable<Dozent, any>
						columns={Dozentcolumns}
						data={dozenten ?? []}
					/>
				</div>
			</ScrollArea>
		</>
	);
}
