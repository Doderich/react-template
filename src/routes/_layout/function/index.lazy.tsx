import { CreateDialog } from '@/components/dialogs/create-dialog';
import { CreateFunctionForm } from '@/components/forms/create-function-form';
import { Header } from '@/components/header';
import { FacultyTable } from '@/components/tables/faculty-table';
import { columns } from '@/components/tables/function-table-columns';
import { DataTable } from '@/components/ui/data-table';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { useFaculty } from '@/hooks/queries/useFaculty';
import { useFunction } from '@/hooks/queries/useFunction';
import {
	CreateFunctionSchema,
	Function,
	FunctionSchema,
} from '@/types/function';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/_layout/function/')({
	component: Faculty,
});

function Faculty() {
	const { functions, createFunctionAsync } = useFunction();
	return (
		<>
			<ScrollArea className="max-h-full">
				<ScrollBar orientation="vertical" />
				<Header title="Function" />
				<div className="p-6 flex flex-col gap-2">
					<CreateDialog
						onSubmit={async data => {
							await createFunctionAsync(data as Function);
						}}
						schema={CreateFunctionSchema}
						title="Erstelle Funktion"
						btnText="Erstelle Funktion"
					>
						<div className="flex flex-col gap-2">
							<CreateFunctionForm />
						</div>
					</CreateDialog>
					<DataTable<Function, any>
						columns={columns}
						data={functions ?? []}
					/>
				</div>
			</ScrollArea>
		</>
	);
}
