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

export const CreateSemesterDialog: FC = () => {
	const [isOpen, setIsOpen] = useState(false);
	const { createSemesterAsync, createdSemester } = useSemester();

	const form = useForm<CreateSemesterFormType>({
		resolver: zodResolver(CreateSemesterFormSchema),
		defaultValues: {},
	});

	const onSubmit = async (data: CreateSemesterFormType) => {
		await createSemesterAsync(data);
		setIsOpen(false);
	};

	const onErrors = (errors: any) => {
		console.log(errors);
	};

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>
				<Button className="w-fit">Semester erstellen</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Semester erstellen</DialogTitle>
				</DialogHeader>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit, onErrors)}>
						<div className="flex flex-col gap-2">
							<CreateSemesterForm />
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
