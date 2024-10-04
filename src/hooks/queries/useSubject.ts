import { apiClient } from '@/lib/api';
import { CreateSubject, Subject, UpdateSubject } from '@/types/subject';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const getSubject = async (): Promise<Subject[]> => {
	return (await apiClient.get('/subject')).data;
};

export const useSubject = () => {
	const queryClient = useQueryClient();
	const { data: subjects, isLoading } = useQuery<Subject[]>({
		queryKey: ['subjects'],
		queryFn: getSubject,
	});

	const {
		mutate: createSubject,
		data: createdSubject,
		mutateAsync: createSubjectAsync,
	} = useMutation<Subject, Error, CreateSubject>({
		mutationFn: async (subject: CreateSubject) => {
			return await apiClient.post(`/subject`, {
				...subject,
				studyProgramId: [subject.studyProgramId],
			});
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['subjects'] });
		},
		onError: error => {
			console.error(error);
		},
	});

	const { mutate: updateSubject, mutateAsync: updateSubjectAsync } =
		useMutation<Subject, Error, UpdateSubject>({
			mutationFn: async updateSubject => {
				return await apiClient.put(
					`/subject/${updateSubject.subjectId}`,
					{
						...updateSubject,
						studyProgramId: [updateSubject.studyPrograms],
					},
				);
			},
			onSuccess: () => {
				queryClient.invalidateQueries({ queryKey: ['subjects'] });
			},
			onError: error => {
				console.error(error);
			},
		});

	const { mutate: deleteSubject, mutateAsync: deleteSubjectAsync } =
		useMutation<Subject, Error, string>({
			mutationFn: async id => {
				return (await apiClient.delete(`/subject/${id}`)).data;
			},
			onSuccess: () => {
				queryClient.invalidateQueries({ queryKey: ['subjects'] });
			},
			onError: error => {
				console.error(error);
			},
		});

	return {
		subjects,
		createSubject,
		createSubjectAsync,
		updateSubject,
		updateSubjectAsync,
		deleteSubject,
		deleteSubjectAsync,
		createdSubject,

		isLoading,
	};
};
