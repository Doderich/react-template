import { CreateDialog } from '@/components/dialogs/create-dialog';
import { CreateSemesterForm } from '@/components/forms/create-semester-form';
import { Header } from '@/components/header';
import { columns } from '@/components/tables/semester-table-columns';
import { DataTable } from '@/components/ui/data-table';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { useSemester } from '@/hooks/queries/useSemester';
import { CreateSemesterFormSchema } from '@/types/semester';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/_layout/semester/')({
	component: Semester,
});

function Semester() {
	const { semesters, createSemesterAsync } = useSemester();
	return (
		<>
			<ScrollArea className="max-h-full">
				<ScrollBar orientation="vertical" />
				<Header title="Semester" />
				<div className="p-6 flex flex-col gap-2">
					<CreateDialog
						title="Erstelle Semester"
						btnText="Erstelle Semester"
						onSubmit={async data => {
							await createSemesterAsync(data);
						}}
						schema={CreateSemesterFormSchema}
					>
						<div className="flex flex-col gap-2">
							<CreateSemesterForm />
						</div>
					</CreateDialog>
					<DataTable<
						{
							id: string;
							vintage: string;
							numberOfSemesters: number[];
						},
						any
					>
						columns={columns}
						data={
							semesters
								? semesters.reduce(
										(
											acc: {
												id: string;
												vintage: string;
												numberOfSemesters: number[];
											}[],
											semester,
										) => {
											const prevEntry = acc.findIndex(
												entry =>
													entry.vintage ===
													semester.vintage,
											);

											if (prevEntry !== -1) {
												acc[
													prevEntry
												].numberOfSemesters.push(
													semester.semesterNumber,
												);
												return acc;
											}

											acc.push({
												id: semester.vintage,
												vintage: semester.vintage,
												numberOfSemesters: [
													semester.semesterNumber,
												],
											});
											return acc;
										},
										[],
									)
								: []
						}
					/>
				</div>
			</ScrollArea>
		</>
	);
}
