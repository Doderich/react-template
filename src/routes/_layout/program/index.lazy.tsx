import { CreateProgramDialog } from '@/components/dialogs/create-program-dialog';
import { CreateSemesterDialog } from '@/components/dialogs/create-semster-dialog';
import { Header } from '@/components/header';
import { ProgramTable } from '@/components/tables/program-table';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { useProgram } from '@/hooks/queries/useProgram';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/_layout/program/')({
	component: Program,
});

function Program() {
	const { programs } = useProgram();
	return (
		<>
			<ScrollArea className="max-h-full">
				<ScrollBar orientation="vertical" />
				<Header title="Program" />
				<div className="p-6 flex flex-col gap-2">
					<CreateProgramDialog />
					<ProgramTable programs={programs ?? []} />
				</div>
			</ScrollArea>
		</>
	);
}
