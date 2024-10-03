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
import { CreateFunction } from '@/types/function';

export const CreateFunctionForm: FC = () => {
	const form = useFormContext<CreateFunction>();
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
				name="transferPeriod"
				render={({ field }) => (
					<FormItem>
						<FormLabel>Transfer Zeit</FormLabel>
						<FormControl>
							<Input
								type="number"
								placeholder="Transfer Zeit"
								{...field}
							/>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
		</>
	);
};
