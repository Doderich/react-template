import { CreateDialog } from '@/components/dialogs/create-dialog';
import { CreateProgramForm } from '@/components/forms/create-program-form';
import { Header } from '@/components/header';
import { columns } from '@/components/tables/program-table-columns';
import { DataTable } from '@/components/ui/data-table';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { useProgram } from '@/hooks/queries/useProgram';
import { CreateProgramSchema, Program } from '@/types/program';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/_layout/program/')({
	component: ProgramPage,
});

function ProgramPage() {
	const { programs, createProgramAsync } = useProgram();
	return (
		<>
			<ScrollArea className="max-h-full">
				<ScrollBar orientation="vertical" />
				<Header title="Program" />
				<div className="p-6 flex flex-col gap-2">
					<CreateDialog
						title="Erstelle Programm"
						btnText="Erstelle Programm"
						onSubmit={async data => {
							await createProgramAsync(data);
						}}
						schema={CreateProgramSchema}
					>
						<div className="flex flex-col gap-2">
							<CreateProgramForm />
						</div>
					</CreateDialog>
					<DataTable<Program, any>
						columns={columns}
						data={programs ?? []}
					/>
				</div>
			</ScrollArea>
		</>
	);
}
