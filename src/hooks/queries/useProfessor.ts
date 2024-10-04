import { apiClient } from '@/lib/api';
import {
	CreateProfessor,
	CreateDozent,
	Professor,
	UpdateProfessor,
} from '@/types/personal';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const getProfessors = async (): Promise<Professor[]> => {
	return (await apiClient.get('/professor')).data;
};

export const useProfessor = () => {
	const queryClient = useQueryClient();
	const { data: professors, isLoading } = useQuery<Professor[]>({
		queryKey: ['professors'],
		queryFn: getProfessors,
	});

	const {
		mutate: createProfessor,
		data: createdProfessor,
		mutateAsync: createProfessorAsync,
	} = useMutation<Professor, Error, CreateProfessor>({
		mutationFn: async (professor: CreateProfessor) => {
			return (await apiClient.post('/professor', professor)).data;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['professors'] });
		},
		onError: error => {
			console.error(error);
		},
	});

	const {
		mutate: updateProfessor,
		data: updatedProfessor,
		mutateAsync: updateProfessorAsync,
	} = useMutation<Professor, Error, UpdateProfessor>({
		mutationFn: async updateProfessor => {
			return await apiClient.put(
				`/professor/${updateProfessor.professorId}`,
				updateProfessor,
			);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['professors'] });
		},
		onError: error => {
			console.error(error);
		},
	});

	const { mutate: deleteProfessor, mutateAsync: deleteProfessorAsync } =
		useMutation<Professor, Error, number>({
			mutationFn: async (professorId: number) => {
				return (await apiClient.delete(`/professor/${professorId}`))
					.data;
			},
			onSuccess: () => {
				queryClient.invalidateQueries({ queryKey: ['professors'] });
			},
			onError: error => {
				console.error(error);
			},
		});

	return {
		professors,
		updatedProfessor,
		createProfessor,
		createProfessorAsync,
		createdProfessor,
		updateProfessor,
		updateProfessorAsync,
		deleteProfessor,
		deleteProfessorAsync,
		isLoading,
	};
};
