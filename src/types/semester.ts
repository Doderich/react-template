import { z } from 'zod';

export const SemesterSchema = z.object({
	semesterId: z.coerce.number(),
	semesterNumber: z.number(),
	vintage: z.string(),
});
export type Semester = z.infer<typeof SemesterSchema>;

export const CreateSemesterFormSchema = z.object({
	year: z.string(),
	copy: z.boolean().default(false),
	semesterId: z.coerce.number().optional(),
});
export type CreateSemesterForm = z.infer<typeof CreateSemesterFormSchema>;

export const CreateSemesterSchema = z
	.object({
		year: z.string(),
	})
	.or(
		z.object({
			semesterId: z.number(),
			semesterNumber: z.number(),
			vintage: z.string(),
		}),
	);

export type CreateSemester = z.infer<typeof CreateSemesterSchema>;
