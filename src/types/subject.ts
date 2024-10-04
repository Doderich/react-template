import { z } from 'zod';
import { ProgramSchema } from './program';

export const SubjectSchema = z.object({
	subjectId: z.number(),
	subjectNumber: z.coerce.number(),
	subjectName: z.string(),
	studyPrograms: z.array(ProgramSchema),
	lectureType: z.string(),
	stupoHours: z.coerce.number(),
	planHours: z.coerce.number(),
	remark: z.string(),
});

export type Subject = z.infer<typeof SubjectSchema>;

// {"subjectNumber":"123","subjectName":"haksjdhfkajsdhf","studyProgramId":[1],"lectureType":"aalksdjf","stupoHours":"12","planHours":"13","remark":"alskdjfalskdfj"}
export const CreateSubjectSchema = z.object({
	subjectNumber: z.coerce.number(),
	subjectName: z.string(),
	studyProgramId: z.coerce.number(),
	lectureType: z.string(),
	stupoHours: z.coerce.number(),
	planHours: z.coerce.number(),
	remark: z.string(),
});

export type CreateSubject = z.infer<typeof CreateSubjectSchema>;

export const UpdateSubjectSchema = z.object({
	subjectId: z.number(),
	subjectNumber: z.coerce.number(),
	subjectName: z.string(),
	studyPrograms: z.coerce.number(),
	lectureType: z.string(),
	stupoHours: z.coerce.number(),
	planHours: z.coerce.number(),
	remark: z.string(),
});

export type UpdateSubject = z.infer<typeof UpdateSubjectSchema>;
