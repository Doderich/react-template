import { apiClient } from '@/lib/api';
import { CreateProfessor, CreateDozent, Professor } from '@/types/personal';
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

	const { mutate: updateProfessor } = useMutation<
		Professor,
		Error,
		Professor
	>({
		mutationFn: async (professor: Professor) => {
			return (
				await apiClient.put(
					`/professor/${professor.professorId}`,
					professor,
				)
			).data;
		},
	});

	const { mutate: deleteProfessor } = useMutation<Professor, Error, number>({
		mutationFn: async (professorId: number) => {
			return (await apiClient.delete(`/professor/${professorId}`)).data;
		},
	});

	return {
		professors,
		createProfessor,
		createProfessorAsync,
		createdProfessor,
		updateProfessor,
		deleteProfessor,
		isLoading,
	};
};
