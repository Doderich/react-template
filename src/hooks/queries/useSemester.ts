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
			return (await apiClient.post('/lecturer', semester)).data;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['semester'] });
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
		isLoading,
	};
};
