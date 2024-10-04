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
import { CreateSubject } from '@/types/subject';
import { useProgram } from '@/hooks/queries/useProgram';
import { Textarea } from '../ui/textarea';

export const CreateSubjectForm: FC = () => {
	const form = useFormContext<CreateSubject>();
	const { programs } = useProgram();

	return (
		<>
			<FormField
				control={form.control}
				name="subjectNumber"
				render={({ field }) => (
					<FormItem>
						<FormLabel>Nummer</FormLabel>
						<FormControl>
							<Input
								type="number"
								placeholder="Nummer"
								{...field}
							/>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
			<FormField
				control={form.control}
				name="subjectName"
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
				name="lectureType"
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
			<FormField
				control={form.control}
				name="studyProgramId"
				render={({ field }) => (
					<FormItem>
						<FormLabel>Studiengang</FormLabel>
						<Select onValueChange={field.onChange}>
							<FormControl>
								<SelectTrigger>
									<SelectValue placeholder="Wähle einen Studiengang" />
								</SelectTrigger>
							</FormControl>
							<SelectContent>
								{!!programs &&
									programs.map(programs => {
										return (
											<SelectItem
												value={programs.studyProgramId.toString()}
											>
												{programs.abbreviation}
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
				name="stupoHours"
				render={({ field }) => (
					<FormItem>
						<FormLabel>Stupo Stunden</FormLabel>
						<FormControl>
							<Input type="number" {...field} />
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
			<FormField
				control={form.control}
				name="planHours"
				render={({ field }) => (
					<FormItem>
						<FormLabel>Studenplan Stunden</FormLabel>
						<FormControl>
							<Input type="number" {...field} />
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
			<FormField
				control={form.control}
				name="remark"
				render={({ field }) => (
					<FormItem>
						<FormLabel>Bemerkung</FormLabel>
						<FormControl>
							<Textarea placeholder="Bemerkung ..." {...field} />
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
		</>
	);
};
