import { apiClient } from '@/lib/api';
import { CreateProgram, Program, UpdateProgram } from '@/types/program';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const getPrograms = async (): Promise<Program[]> => {
	return (await apiClient.get('/studyProgram')).data;
};

export const useProgram = () => {
	const queryClient = useQueryClient();
	const { data: programs, isLoading } = useQuery<Program[]>({
		queryKey: ['programs'],
		queryFn: getPrograms,
	});

	const {
		mutate: createProgram,
		data: createdProgram,
		mutateAsync: createProgramAsync,
	} = useMutation<Program, Error, CreateProgram>({
		mutationFn: async (program: CreateProgram) => {
			return await apiClient.post(`/studyProgram`, {
				...program,
			});
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['programs'] });
		},
		onError: error => {
			console.error(error);
		},
	});

	const { mutate: updateProgram, mutateAsync: updateProgramAsync } =
		useMutation<Program, Error, UpdateProgram>({
			mutationFn: async updateProgram => {
				return await apiClient.put(
					`/studyProgram/${updateProgram.studyProgramId}`,
					updateProgram,
				);
			},
			onSuccess: () => {
				queryClient.invalidateQueries({ queryKey: ['programs'] });
			},
			onError: error => {
				console.error(error);
			},
		});

	const { mutate: deleteProgram, mutateAsync: deleteProgramAsync } =
		useMutation<Program, Error, string>({
			mutationFn: async id => {
				return (await apiClient.delete(`/studyProgram/${id}`)).data;
			},
			onSuccess: () => {
				queryClient.invalidateQueries({ queryKey: ['programs'] });
			},
			onError: error => {
				console.error(error);
			},
		});

	return {
		programs,
		createProgram,
		createProgramAsync,
		updateProgram,
		updateProgramAsync,
		deleteProgram,
		deleteProgramAsync,
		createdProgram,
		isLoading,
	};
};
