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
import { useProgram } from '@/hooks/queries/useProgram';
import { CreateProgram, CreateProgramSchema } from '@/types/program';
import { CreateProgramForm } from '../forms/create-program-form';

export const CreateProgramDialog: FC = () => {
	const [isOpen, setIsOpen] = useState(false);
	const { createProgramAsync } = useProgram();

	const form = useForm<CreateProgram>({
		resolver: zodResolver(CreateProgramSchema),
		defaultValues: {},
	});

	const onSubmit = async (data: CreateProgram) => {
		await createProgramAsync(data);
		setIsOpen(false);
	};

	const onErrors = (errors: any) => {
		console.log(errors);
	};

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>
				<Button className="w-fit">Studiengang erstellen</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Studiengang erstellen</DialogTitle>
				</DialogHeader>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit, onErrors)}>
						<div className="flex flex-col gap-2">
							<CreateProgramForm />
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