import { FC } from 'react';
import { useFormContext } from 'react-hook-form';
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '../ui/select';
import { CreateFaculty } from '@/types/faculty';
import { useProfessor } from '@/hooks/queries/useProfessor';

export const CreateFacultyForm: FC = () => {
	const form = useFormContext<CreateFaculty>();
	const { professors } = useProfessor();

	return (
		<>
			<FormField
				control={form.control}
				name="name"
				render={({ field }) => (
					<FormItem>
						<FormLabel>Name</FormLabel>
						<FormControl>
							<Input placeholder="Name" {...field} />
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
			<FormField
				control={form.control}
				name="abbreviation"
				render={({ field }) => (
					<FormItem>
						<FormLabel>Abkürzung</FormLabel>
						<FormControl>
							<Input placeholder="abbreviation" {...field} />
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
			<FormField
				control={form.control}
				name="dekanId"
				render={({ field }) => (
					<FormItem>
						<FormLabel>Dekan</FormLabel>
						<Select onValueChange={field.onChange}>
							<FormControl>
								<SelectTrigger>
									<SelectValue placeholder="Select a Dekan">
										{field.value &&
											professors &&
											professors.find(
												professor =>
													professor.professorId ==
													field.value,
											)?.person.surname}
									</SelectValue>
								</SelectTrigger>
							</FormControl>
							<SelectContent>
								{!!professors &&
									professors.map(professor => {
										return (
											<SelectItem
												value={professor.professorId.toString()}
											>
												{professor.person.firstName}{' '}
												{professor.person.surname}
											</SelectItem>
										);
									})}
							</SelectContent>
						</Select>
						<FormMessage />
					</FormItem>
				)}
			/>
		</>
	);
};
