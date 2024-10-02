import { apiClient } from '@/lib/api';
import { CreatePerson, Person } from '@/types/personal';
import { useMutation, useQuery } from '@tanstack/react-query';

const getPersons = async (): Promise<Person[]> => {
	return (await apiClient.get('/person')).data;
};

export const usePerson = () => {
	const { data: persons, isLoading } = useQuery<Person[]>({
		queryKey: ['persons'],
		queryFn: getPersons,
	});

	const {
		mutate: createPerson,
		data: createdPerson,
		isSuccess: isCreatePersonSuccess,
		mutateAsync: createPersonAsync,
	} = useMutation<Person, Error, CreatePerson>({
		mutationKey: ['createPerson'],
		mutationFn: async (person: CreatePerson) => {
			return (await apiClient.post('/person', person)).data;
		},
		onSuccess: data => {
			console.log(data);
		},
		onError: error => {
			console.error(error);
		},
		onSettled: () => {
			console.log('Mutation completed');
		},
	});

	return {
		persons,
		createPerson,
		createPersonAsync,
		createdPerson,
		isCreatePersonSuccess,
		isLoading,
	};
};
