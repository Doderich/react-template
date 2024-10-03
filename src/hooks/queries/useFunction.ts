import { apiClient } from '@/lib/api';
import { Person } from '@/types/personal';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Function, CreateFunction, UpdateFunction } from '@/types/function';

const getFunctions = async (): Promise<Function[]> => {
	return (await apiClient.get('/function')).data;
};

export const useFunction = () => {
	const queryClient = useQueryClient();
	const { data: functions, isLoading } = useQuery<Function[]>({
		queryKey: ['functions'],
		queryFn: getFunctions,
	});

	const {
		mutate: createFunction,
		data: createdFunction,
		mutateAsync: createFunctionAsync,
	} = useMutation<Function, Error, CreateFunction>({
		mutationFn: async (faculty: CreateFunction) => {
			return await apiClient.post(`/function`, {
				...faculty,
				dekanId: [],
			});
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['functions'] });
		},
		onError: error => {
			console.error(error);
		},
	});

	const { mutate: updateFunction, mutateAsync: updateFunctionAsync } =
		useMutation<Function, Error, UpdateFunction>({
			mutationFn: async updateFunction => {
				return await apiClient.put(
					`/function/${updateFunction.functionId}`,
					updateFunction,
				);
			},
			onSuccess: () => {
				queryClient.invalidateQueries({ queryKey: ['functions'] });
			},
			onError: error => {
				console.error(error);
			},
		});

	const { mutate: deleteFunction, mutateAsync: deleteFunctionAsync } =
		useMutation<Function, Error, string>({
			mutationFn: async id => {
				return (await apiClient.delete(`/function/${id}`)).data;
			},
			onSuccess: () => {
				queryClient.invalidateQueries({ queryKey: ['functions'] });
			},
			onError: error => {
				console.error(error);
			},
		});

	return {
		functions,
		createFunction,
		createFunctionAsync,
		updateFunction,
		updateFunctionAsync,
		deleteFunction,
		deleteFunctionAsync,
		createdFunction,

		isLoading,
	};
};
