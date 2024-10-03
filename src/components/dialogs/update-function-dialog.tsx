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
import { useFunction } from '@/hooks/queries/useFunction';
import {
	Function,
	UpdateFunction,
	UpdateFunctionSchema,
} from '@/types/function';
import { Pencil1Icon } from '@radix-ui/react-icons';
import { CreateFunctionForm } from '../forms/create-function-form';

export const UpdateFunctionDialog: FC<Function> = program => {
	const [isOpen, setIsOpen] = useState(false);
	const { updateFunctionAsync } = useFunction();

	const form = useForm<UpdateFunction>({
		resolver: zodResolver(UpdateFunctionSchema),
		defaultValues: {
			...program,
		},
	});

	const onSubmit = async (data: UpdateFunction) => {
		await updateFunctionAsync(data);
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
					<DialogTitle>Function bearbeiten</DialogTitle>
				</DialogHeader>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit, onErrors)}>
						<div className="flex flex-col gap-2">
							<CreateFunctionForm />
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
