import { z } from 'zod';

export const FacultySchema = z.object({
	facultyId: z.number(),
	name: z.string(),
	abbreviation: z.string(),
	dekanId: z.array(z.number()),
});

export type Faculty = z.infer<typeof FacultySchema>;
