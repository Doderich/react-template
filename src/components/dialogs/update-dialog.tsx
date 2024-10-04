import React, { FC, useState } from 'react';
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
import { CreateFacultyForm } from '../forms/create-faculty-form';
import { Spinner } from '../ui/spinner';
import { Form } from '../ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Pencil1Icon } from '@radix-ui/react-icons';

export const UpdateDialog: FC<{
	onSubmit: (data: any) => void;
	schema: Zod.Schema<any>;
	title: string;
	children: React.ReactNode;
	initialValues: any;
}> = ({ onSubmit, schema, title, initialValues, children }) => {
	const [isOpen, setIsOpen] = useState(false);
	const form = useForm({
		defaultValues: initialValues,
		resolver: zodResolver(schema),
	});

	const submit = async (data: any) => {
		await onSubmit(data);
		setIsOpen(false);
	};

	const onErrors = (errors: any) => {
		console.log(errors);
		console.log(form.getValues());
	};
	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>
				<Button size={'icon'}>
					<Pencil1Icon />
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>{title}</DialogTitle>
				</DialogHeader>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(submit, onErrors)}>
						{children}
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
								<Button type="submit">Aktualisieren</Button>
							)}
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
};
