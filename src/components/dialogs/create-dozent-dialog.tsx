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

import { usePerson } from '@/hooks/queries/usePerson';
import {
	CreateDozentForm as CreateDozentFormType,
	CreateDozentFormSchema,
} from '@/types/personal';
import { CreateDozentForm } from '../forms/create-dozent-form';
import { useDozent } from '@/hooks/queries/useDozent';
import { Spinner } from '../ui/spinner';

export const CreateDozentDialog: FC = () => {
	const [isOpen, setIsOpen] = useState(false);
	const { createPersonAsync, createdPerson } = usePerson();
	const { createDozentAsync, createdDozent } = useDozent();

	const form = useForm<CreateDozentFormType>({
		resolver: zodResolver(CreateDozentFormSchema),
		defaultValues: {
			person: {
				firstName: '',
				surname: '',
				commentary: '',
			},
			type: '',
		},
	});

	const onSubmit = async (data: CreateDozentFormType) => {
		await createPersonAsync({
			firstName: data.person.firstName,
			surname: data.person.surname,
			commentary: data.person.commentary,
			role: 'Dozent',
			facultyId: data.person.facultyId,
		});
		if (!createdPerson) return;
		await createDozentAsync({
			personId: createdPerson.personId,
			type: data.type,
		});
		console.log(createdDozent);
	};

	const onErrors = (errors: any) => {
		console.log(errors);
	};

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>
				<Button className="w-fit">Dozent erstellen</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Dozent erstellen</DialogTitle>
				</DialogHeader>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit, onErrors)}>
						<CreateDozentForm />
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
