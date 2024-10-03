import { apiClient } from '@/lib/api';
import { Faculty } from '@/types/faculty';
import { Person } from '@/types/personal';
import { CreateSemester, Semester } from '@/types/semester';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const getSemesters = async (): Promise<Semester[]> => {
	return (await apiClient.get('/semester')).data;
};

export const useSemester = () => {
	const queryClient = useQueryClient();
	const { data: semesters, isLoading } = useQuery<Semester[]>({
		queryKey: ['semesters'],
		queryFn: getSemesters,
	});

	const {
		mutate: createSemester,
		data: createdSemester,
		mutateAsync: createSemesterAsync,
	} = useMutation<Semester, Error, CreateSemester>({
		mutationFn: async (semester: CreateSemester) => {
			if ('year' in semester) {
				return await apiClient.post(`/semester/${semester.year}`);
			} else {
				return (
					await apiClient.post('/semester', {
						...semester,
						semesterNumber: 1,
					})
				).data;
			}
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['semesters'] });
		},
		onError: error => {
			console.error(error);
		},
	});

	const { mutate: updateSemester, mutateAsync: updateSemesterAsync } =
		useMutation<
			Semester,
			Error,
			{ oldVintage: string; newVintage: string }
		>({
			mutationFn: async ({ oldVintage, newVintage }) => {
				return await apiClient.put(
					`/semester/${oldVintage}/${newVintage}`,
				);
			},
			onSuccess: () => {
				queryClient.invalidateQueries({ queryKey: ['semesters'] });
			},
			onError: error => {
				console.error(error);
			},
		});

	const { mutate: deleteSemester, mutateAsync: deleteSemesterAsync } =
		useMutation<Semester, Error, string>({
			mutationFn: async vintage => {
				return (await apiClient.delete(`/semester/vintage/${vintage}`))
					.data;
			},
			onSuccess: () => {
				queryClient.invalidateQueries({ queryKey: ['semesters'] });
			},
			onError: error => {
				console.error(error);
			},
		});

	return {
		semesters,
		createSemester,
		createdSemester,
		createSemesterAsync,
		updateSemester,
		updateSemesterAsync,
		deleteSemester,
		deleteSemesterAsync,
		isLoading,
	};
};
