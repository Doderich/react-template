import { z } from 'zod';

export const ProgramSchema = z.object({
	studyProgramId: z.number(),
	name: z.string(),
	abbreviation: z.string(),
	stupo: z.string(),
	semester: z.number(),
	faculty: z.object({
		facultyId: z.number(),
		name: z.string(),
		abbreviation: z.string(),
		dekanId: z.array(z.number()),
	}),
});

export type Program = z.infer<typeof ProgramSchema>;

export const CreateProgramSchema = z.object({
	name: z.string(),
	abbreviation: z.string(),
	stupo: z.string(),
	semester: z.coerce.number(),
	facultyId: z.coerce.number(),
});

export type CreateProgram = z.infer<typeof CreateProgramSchema>;

export const UpdateProgramSchema = z.object({
	name: z.string(),
	abbreviation: z.string(),
	stupo: z.string(),
	semester: z.coerce.number(),
	studyProgramId: z.coerce.number(),
	facultyId: z.coerce.number(),
});

export type UpdateProgram = z.infer<typeof UpdateProgramSchema>;
