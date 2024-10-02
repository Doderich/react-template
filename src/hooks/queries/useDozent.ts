import { apiClient } from '@/lib/api';
import { CreateDozent, Dozent } from '@/types/personal';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const getDozenten = async (): Promise<Dozent[]> => {
	return (await apiClient.get('/lecturer')).data;
};

export const useDozent = () => {
	const queryClient = useQueryClient();
	const { data: dozenten, isLoading } = useQuery<Dozent[]>({
		queryKey: ['dozenten'],
		queryFn: getDozenten,
	});

	const {
		mutate: createDozent,
		data: createdDozent,
		mutateAsync: createDozentAsync,
	} = useMutation<Dozent, Error, CreateDozent>({
		mutationFn: async (Dozent: CreateDozent) => {
			return (await apiClient.post('/lecturer', Dozent)).data;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['dozenten'] });
		},
		onError: error => {
			console.error(error);
		},
	});

	const { mutate: updateDozent } = useMutation<Dozent, Error, Dozent>({
		mutationFn: async (dozent: Dozent) => {
			return (
				await apiClient.put(`/lecturer/${dozent.lecturerId}`, dozent)
			).data;
		},
	});

	const { mutate: deleteDozent } = useMutation<Dozent, Error, number>({
		mutationFn: async (lecturerId: number) => {
			return (await apiClient.delete(`/lecturer/${lecturerId}`)).data;
		},
	});

	return {
		dozenten,
		createDozent,
		createDozentAsync,
		createdDozent,
		updateDozent,
		deleteDozent,
		isLoading,
	};
};
