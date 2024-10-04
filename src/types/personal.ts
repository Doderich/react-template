import { z } from 'zod';
import { SemesterSchema } from './semester';

const RoleEnumSchema = z.enum(['Professor', 'Dozent']);
export type RoleEnum = z.infer<typeof RoleEnumSchema>;
export const PersonSchema = z.object({
	personId: z.number(),
	firstName: z.string(),
	surname: z.string(),
	commentary: z.string(),
	role: RoleEnumSchema,
	facultyId: z.coerce.number(),
});

export type Person = z.infer<typeof PersonSchema>;
export const ProfessorSchema = z.object({
	person: PersonSchema,
	professorId: z.number(),
	semester: SemesterSchema,
	workload: z.number(),
});
export type Professor = z.infer<typeof ProfessorSchema>;

export const CreatePersonSchema = PersonSchema.omit({ personId: true });
export type CreatePerson = z.infer<typeof CreatePersonSchema>;

export const CreateProfessorFormSchema = z.object({
	person: PersonSchema.pick({
		firstName: true,
		surname: true,
		commentary: true,
		facultyId: true,
	}),
	semester: SemesterSchema.pick({ semesterId: true }),
	workload: z.coerce.number(),
});
export type CreateProfessorForm = z.infer<typeof CreateProfessorFormSchema>;
export const CreateProfessorSchema = z.object({
	personId: z.number(),
	semester: z.number(),
	workload: z.string(),
});
export type CreateProfessor = z.infer<typeof CreateProfessorSchema>;

export const UpdateProfessorSchema = z.object({
	professorId: z.number(),
	person: PersonSchema,
	semester: SemesterSchema,
	workload: z.number(),
});

export type UpdateProfessor = z.infer<typeof UpdateProfessorSchema>;

export const DozentSchema = z.object({
	lecturerId: z.number(),
	person: PersonSchema,
	type: z.string(),
});

export type Dozent = z.infer<typeof DozentSchema>;

export const CreateDozentFormSchema = z.object({
	person: PersonSchema.pick({
		firstName: true,
		surname: true,
		commentary: true,
		facultyId: true,
	}),
	type: z.string(),
});

export type CreateDozentForm = z.infer<typeof CreateDozentFormSchema>;

export const CreateDozentSchema = z.object({
	personId: z.number(),
	type: z.string(),
});

export type CreateDozent = z.infer<typeof CreateDozentSchema>;

export const UpdateDozentSchema = z.object({
	lecturerId: z.number(),
	person: PersonSchema,
	type: z.string(),
});

export type UpdateDozent = z.infer<typeof UpdateDozentSchema>;
