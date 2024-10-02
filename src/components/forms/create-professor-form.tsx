import { CreateProfessorForm as CreateProfessorFormType } from '@/types/personal';
import { FC } from 'react';
import { useFormContext } from 'react-hook-form';
import {
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '../ui/select';
import { useFaculty } from '@/hooks/queries/useFaculty';
import { Faculty } from '@/types/faculty';
import { Semester } from '@/types/semester';
import { useSemester } from '@/hooks/queries/useSemester';

export const CreateProfessorForm: FC = () => {
	const form = useFormContext<CreateProfessorFormType>();
	const { faculties } = useFaculty();
	const { semesters } = useSemester();

	return (
		<>
			<FormField
				control={form.control}
				name="person.firstName"
				render={({ field }) => (
					<FormItem>
						<FormLabel>First Name</FormLabel>
						<FormControl>
							<Input placeholder="First Name" {...field} />
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
			<FormField
				control={form.control}
				name="person.surname"
				render={({ field }) => (
					<FormItem>
						<FormLabel>Family Name</FormLabel>
						<FormControl>
							<Input placeholder="Family Name" {...field} />
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
			<FormField
				control={form.control}
				name="person.commentary"
				render={({ field }) => (
					<FormItem>
						<FormLabel>Commentary</FormLabel>
						<FormControl>
							<Textarea placeholder="Commentary" {...field} />
						</FormControl>
						<FormDescription>
							This is the place for any additional information you
							want to add.
						</FormDescription>
						<FormMessage />
					</FormItem>
				)}
			/>
			<FormField
				control={form.control}
				name="person.facultyId"
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
									faculties.map((faculty: Faculty) => {
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
			<FormField
				control={form.control}
				name="semester.semesterId"
				render={({ field }) => (
					<FormItem>
						<FormLabel>Semester</FormLabel>
						<Select onValueChange={field.onChange}>
							<FormControl>
								<SelectTrigger>
									<SelectValue placeholder="Select a Semester">
										{field.value &&
											semesters &&
											semesters.find(
												(semester: Semester) =>
													semester.semesterId ===
													field.value,
											)?.vintage}
									</SelectValue>
								</SelectTrigger>
							</FormControl>
							<SelectContent>
								{!!semesters &&
									semesters
										.reduce(
											(
												acc: Semester[],
												semester: Semester,
											) => {
												if (
													!acc.find(
														(s: Semester) =>
															s.vintage ===
															semester.vintage,
													)
												) {
													acc.push(semester);
												}

												return acc;
											},
											[],
										)
										.map((semester: Semester) => {
											return (
												<SelectItem
													value={semester.semesterId.toString()}
												>
													{semester.vintage}
												</SelectItem>
											);
										})}
							</SelectContent>
						</Select>
						<FormMessage />
					</FormItem>
				)}
			/>
			<FormField
				control={form.control}
				name="workload"
				render={({ field }) => (
					<FormItem>
						<FormLabel>Workload</FormLabel>
						<FormControl>
							<Input type="number" {...field} />
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
		</>
	);
};
