import { z } from 'zod';

export const FacultySchema = z.object({
	facultyId: z.number(),
	name: z.string(),
	abbreviation: z.string(),
	dekanId: z.array(z.number()),
});

export type Faculty = z.infer<typeof FacultySchema>;

export const CreateFacultySchema = z.object({
	name: z.string(),
	abbreviation: z.string(),
	dekanId: z.coerce.number().optional(),
});

export type CreateFaculty = z.infer<typeof CreateFacultySchema>;

export const UpdateFacultySchema = z.object({
	name: z.string(),
	abbreviation: z.string(),
	dekanId: z.coerce.number().optional(),
	facultyId: z.number(),
});

export type UpdateFaculty = z.infer<typeof UpdateFacultySchema>;
