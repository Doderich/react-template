import { CreateDozentForm as CreateDozentFormType } from '@/types/personal';
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

export const CreateDozentForm: FC = () => {
	const form = useFormContext<CreateDozentFormType>();
	const { faculties } = useFaculty();

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
				name="type"
				render={({ field }) => (
					<FormItem>
						<FormLabel>Type</FormLabel>
						<FormControl>
							<Input placeholder="Type" {...field} />
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
		</>
	);
};
