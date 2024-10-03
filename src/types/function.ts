import { z } from 'zod';

export const FunctionSchema = z.object({
	functionId: z.number(),
	name: z.string(),
	transferPeriod: z.number(),
});

export type Function = z.infer<typeof FunctionSchema>;

export const CreateFunctionSchema = z.object({
	name: z.string(),
	transferPeriod: z.coerce.number(),
});

export type CreateFunction = z.infer<typeof CreateFunctionSchema>;

export const UpdateFunctionSchema = z.object({
	name: z.string(),
	transferPeriod: z.coerce.number(),
	functionId: z.number(),
});

export type UpdateFunction = z.infer<typeof UpdateFunctionSchema>;
