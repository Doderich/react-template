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
import { Spinner } from '../ui/spinner';
import { useFaculty } from '@/hooks/queries/useFaculty';
import { Faculty, UpdateFaculty, UpdateFacultySchema } from '@/types/faculty';
import { CreateFacultyForm } from '../forms/create-faculty-form';
import { Pencil1Icon } from '@radix-ui/react-icons';

export const UpdateFacultyDialog: FC<Faculty> = faculty => {
	const [isOpen, setIsOpen] = useState(false);
	const { updateFacultyAsync } = useFaculty();

	const form = useForm<UpdateFaculty>({
		resolver: zodResolver(UpdateFacultySchema),
		defaultValues: {
			...faculty,
			dekanId: undefined,
		},
	});

	const onSubmit = async (data: UpdateFaculty) => {
		await updateFacultyAsync(data);
		setIsOpen(false);
	};

	const onErrors = (errors: any) => {
		console.log(errors);
	};

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>
				<Button size="icon">
					<Pencil1Icon />
				</Button>
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
