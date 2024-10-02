import { apiClient } from '@/lib/api';
import { Faculty } from '@/types/faculty';
import { Person } from '@/types/personal';
import { useQuery } from '@tanstack/react-query';

const getFaculties = async (): Promise<Faculty[]> => {
	return (await apiClient.get('/faculty')).data;
};

export const useFaculty = () => {
	const { data: faculties, isLoading } = useQuery<Faculty[]>({
		queryKey: ['faculties'],
		queryFn: getFaculties,
	});
	return { faculties, isLoading };
};
