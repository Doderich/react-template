import { CreateDozentDialog } from '@/components/dialogs/create-dozent-dialog';
import { CreateProfessorDialog } from '@/components/dialogs/create-professor-dialog';
import { Header } from '@/components/header';
import { DozentenTable } from '@/components/tables/dozenten-table';
import { ProfessorTable } from '@/components/tables/professor-table';
import { Button } from '@/components/ui/button';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { useDozent } from '@/hooks/queries/useDozent';
import { useProfessor } from '@/hooks/queries/useProfessor';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/_layout/personal/')({
	component: DutyPlaner,
});

function DutyPlaner() {
	const { professors, isLoading } = useProfessor();
	const { dozenten } = useDozent();
	return (
		<>
			<ScrollArea className="max-h-full">
				<ScrollBar orientation="vertical" />
				<Header title="Personal" />
				<div className="p-6 flex flex-col gap-2">
					<h3>Professoren</h3>
					<CreateProfessorDialog />
					<ProfessorTable professors={professors ?? []} />
					<h3>Dozenten</h3>
					<CreateDozentDialog />
					<DozentenTable dozenten={dozenten ?? []} />
				</div>
			</ScrollArea>
		</>
	);
}
