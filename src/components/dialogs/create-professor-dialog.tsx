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
import { CreateProfessorForm } from '../forms/create-professor-form';
import { Form } from '../ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
	CreateProfessorForm as CreateProfessorFormType,
	CreateProfessorFormSchema,
} from '@/types/personal';
import { usePerson } from '@/hooks/queries/usePerson';
import { useProfessor } from '@/hooks/queries/useProfessor';
import { Spinner } from '../ui/spinner';

export const CreateProfessorDialog: FC = () => {
	const [isOpen, setIsOpen] = useState(false);
	const { createPersonAsync, createdPerson } = usePerson();
	const { createProfessorAsync, createdProfessor } = useProfessor();

	const form = useForm<CreateProfessorFormType>({
		resolver: zodResolver(CreateProfessorFormSchema),
		defaultValues: {
			person: {
				firstName: '',
				surname: '',
				commentary: '',
			},
			workload: 0,
		},
	});

	const onSubmit = async (data: CreateProfessorFormType) => {
		await createPersonAsync({
			firstName: data.person.firstName,
			surname: data.person.surname,
			commentary: data.person.commentary,
			role: 'Professor',
			facultyId: data.person.facultyId,
		});
		if (!createdPerson) return;
		await createProfessorAsync({
			personId: createdPerson.personId,
			semester: data.semester.semesterId,
			workload: data.workload.toString(),
		});
		setIsOpen(false);
		console.log(createdProfessor);
	};

	const onErrors = (errors: any) => {
		console.log(errors);
	};

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>
				<Button className="w-fit">Professor erstellen</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Professor erstellen</DialogTitle>
				</DialogHeader>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit, onErrors)}>
						<CreateProfessorForm />
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
