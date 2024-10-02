import { CreateSemesterDialog } from '@/components/dialogs/create-semster-dialog';
import { Header } from '@/components/header';
import { SemesterTable } from '@/components/tables/semester-table';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { useSemester } from '@/hooks/queries/useSemester';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/_layout/semester/')({
	component: Semester,
});

function Semester() {
	const { semesters } = useSemester();
	return (
		<>
			<ScrollArea className="max-h-full">
				<ScrollBar orientation="vertical" />
				<Header title="Semester" />
				<div className="p-6 flex flex-col gap-2">
					<CreateSemesterDialog />
					<SemesterTable semesters={semesters ?? []} />
				</div>
			</ScrollArea>
		</>
	);
}
