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
import { CreateFaculty, Faculty } from '@/types/faculty';
import { useProfessor } from '@/hooks/queries/useProfessor';
import { CreateProgram } from '@/types/program';
import { useFaculty } from '@/hooks/queries/useFaculty';

export const CreateProgramForm: FC = () => {
	const form = useFormContext<CreateProgram>();
	const { faculties } = useFaculty();

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
				name="stupo"
				render={({ field }) => (
					<FormItem>
						<FormLabel>Stupo</FormLabel>
						<FormControl>
							<Input placeholder="Stupo" {...field} />
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
			<FormField
				control={form.control}
				name="semester"
				render={({ field }) => (
					<FormItem>
						<FormLabel>Semester</FormLabel>
						<FormControl>
							<Input placeholder="Semester" {...field} />
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
			<FormField
				control={form.control}
				name="facultyId"
				render={({ field }) => (
					<FormItem>
						<FormLabel>Faculty</FormLabel>
						<Select onValueChange={field.onChange}>
							<FormControl>
								<SelectTrigger>
									<SelectValue placeholder="Select a Faculty" />
								</SelectTrigger>
							</FormControl>
							<SelectContent>
								{!!faculties &&
									faculties.map(faculty => {
										return (
											<SelectItem
												value={faculty.facultyId.toString()}
											>
												{faculty.abbreviation}
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
