import { apiClient } from '@/lib/api';
import { CreateFaculty, Faculty, UpdateFaculty } from '@/types/faculty';
import { Person } from '@/types/personal';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const getFaculties = async (): Promise<Faculty[]> => {
	return (await apiClient.get('/faculty')).data;
};

export const useFaculty = () => {
	const queryClient = useQueryClient();
	const { data: faculties, isLoading } = useQuery<Faculty[]>({
		queryKey: ['faculties'],
		queryFn: getFaculties,
	});

	const {
		mutate: createFaculty,
		data: createdFaculty,
		mutateAsync: createFacultyAsync,
	} = useMutation<Faculty, Error, CreateFaculty>({
		mutationFn: async (faculty: CreateFaculty) => {
			return await apiClient.post(`/faculty`, {
				...faculty,
				dekanId: [],
			});
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['faculties'] });
		},
		onError: error => {
			console.error(error);
		},
	});

	const { mutate: updateFaculty, mutateAsync: updateFacultyAsync } =
		useMutation<Faculty, Error, UpdateFaculty>({
			mutationFn: async updateFaculty => {
				return await apiClient.put(
					`/faculty/${updateFaculty.facultyId}`,
					{
						...updateFaculty,
						dekanId: [],
					},
				);
			},
			onSuccess: () => {
				queryClient.invalidateQueries({ queryKey: ['faculties'] });
			},
			onError: error => {
				console.error(error);
			},
		});

	const { mutate: deleteFaculty, mutateAsync: deleteFacultyAsync } =
		useMutation<Faculty, Error, string>({
			mutationFn: async id => {
				return (await apiClient.delete(`/faculty/${id}`)).data;
			},
			onSuccess: () => {
				queryClient.invalidateQueries({ queryKey: ['faculties'] });
			},
			onError: error => {
				console.error(error);
			},
		});

	return {
		faculties,
		createFaculty,
		createFacultyAsync,
		updateFaculty,
		updateFacultyAsync,
		deleteFaculty,
		deleteFacultyAsync,
		createdFaculty,

		isLoading,
	};
};
