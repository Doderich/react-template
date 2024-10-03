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
import { useProgram } from '@/hooks/queries/useProgram';
import { Program, UpdateProgram, UpdateProgramSchema } from '@/types/program';
import { CreateProgramForm } from '../forms/create-program-form';
import { Pencil1Icon } from '@radix-ui/react-icons';

export const UpdateProgramDialog: FC<Program> = program => {
	const [isOpen, setIsOpen] = useState(false);
	const { updateProgramAsync } = useProgram();

	const form = useForm<UpdateProgram>({
		resolver: zodResolver(UpdateProgramSchema),
		defaultValues: {
			...program,
		},
	});

	const onSubmit = async (data: UpdateProgram) => {
		await updateProgramAsync(data);
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
					<DialogTitle>Program bearbeiten</DialogTitle>
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
								<Button type="submit">Bestätigen</Button>
							)}
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
};
