import { CreateFacultyDialog } from '@/components/dialogs/create-faculty-dialog';
import { Header } from '@/components/header';
import { FacultyTable } from '@/components/tables/faculty-table';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { useFaculty } from '@/hooks/queries/useFaculty';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/_layout/faculty/')({
	component: Faculty,
});

function Faculty() {
	const { faculties } = useFaculty();
	return (
		<>
			<ScrollArea className="max-h-full">
				<ScrollBar orientation="vertical" />
				<Header title="Faculty" />
				<div className="p-6 flex flex-col gap-2">
					<CreateFacultyDialog />
					<FacultyTable faculties={faculties ?? []} />
				</div>
			</ScrollArea>
		</>
	);
}
