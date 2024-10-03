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

export const CreateDialog: FC<{
	onSubmit: (data: any) => void;
	schema: Zod.Schema<any>;
	btnText: string;
	title: string;
	children: React.ReactNode;
}> = ({ onSubmit, schema, btnText, title, children }) => {
	const [isOpen, setIsOpen] = useState(false);
	const form = useForm({
		defaultValues: {},
		resolver: zodResolver(schema),
	});

	const submit = async (data: any) => {
		await onSubmit(data);
		setIsOpen(false);
	};

	const onErrors = (errors: any) => {
		console.log(errors);
	};
	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>
				<Button className="w-fit">{btnText}</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>{title}</DialogTitle>
				</DialogHeader>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(submit, onErrors)}>
						<div className="flex flex-col gap-2">{children}</div>
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
