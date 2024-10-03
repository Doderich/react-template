import {
	CreateSemesterForm as CreateSemesterFormType,
	Semester,
} from '@/types/semester';
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
import { useSemester } from '@/hooks/queries/useSemester';
import { Checkbox } from '../ui/checkbox';

export const CreateSemesterForm: FC = () => {
	const form = useFormContext<CreateSemesterFormType>();
	const { semesters } = useSemester();

	const copy = form.watch('copy');

	return (
		<>
			<FormField
				control={form.control}
				name="year"
				render={({ field }) => (
					<FormItem>
						<FormLabel>Jahrgang</FormLabel>
						<FormControl>
							<Input placeholder="Jahrgang" {...field} />
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
			<FormField
				control={form.control}
				name="copy"
				render={({ field }) => (
					<FormItem className="flex flex-row items-start space-x-3 space-y-0">
						<FormControl>
							<Checkbox
								checked={field.value}
								onCheckedChange={field.onChange}
							/>
						</FormControl>
						<div className="space-y-1 leading-none">
							<FormLabel>Copy a semester</FormLabel>
						</div>
					</FormItem>
				)}
			/>
			{copy && (
				<FormField
					control={form.control}
					name="semesterId"
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
			)}
		</>
	);
};
