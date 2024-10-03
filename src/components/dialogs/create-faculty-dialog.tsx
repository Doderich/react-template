import { FC, useState } from 'react';
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '../ui/dialog';
import { Button } from '../ui/button';
import { Form } from '../ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CreateDozentForm } from '../forms/create-dozent-form';
import { Spinner } from '../ui/spinner';
import { useSemester } from '@/hooks/queries/useSemester';
import {
	CreateSemesterFormSchema,
	CreateSemesterForm as CreateSemesterFormType,
} from '@/types/semester';
import { CreateSemesterForm } from '../forms/create-semester-form';
import { useFaculty } from '@/hooks/queries/useFaculty';
import { CreateFaculty, CreateFacultySchema } from '@/types/faculty';
import { CreateFacultyForm } from '../forms/create-faculty-form';

export const CreateFacultyDialog: FC = () => {
	const [isOpen, setIsOpen] = useState(false);
	const { createFacultyAsync } = useFaculty();

	const form = useForm<CreateFaculty>({
		resolver: zodResolver(CreateFacultySchema),
		defaultValues: {},
	});

	const onSubmit = async (data: CreateFaculty) => {
		await createFacultyAsync(data);
		setIsOpen(false);
	};

	const onErrors = (errors: any) => {
		console.log(errors);
	};

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>
				<Button className="w-fit">Facultät erstellen</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Facultät erstellen</DialogTitle>
				</DialogHeader>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit, onErrors)}>
						<div className="flex flex-col gap-2">
							<CreateFacultyForm />
						</div>
						<DialogFooter className="mt-2">
							<DialogClose asChild>
								<Button type="button" variant={'secondary'}>
									Abbrechen
								</Button>
							</DialogClose>
							{form.formState.isSubmitting ? (
								<Button type="submit" disabled>
									<Spinner />
								</Button>
							) : (
								<Button type="submit">Erstellen</Button>
							)}
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
};
