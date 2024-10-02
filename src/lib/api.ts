import axios from 'axios';
export const apiClient = axios.create({
	baseURL: import.meta.env.VITE_API_ENDPOINT,
	timeout: 1000,
});

apiClient.interceptors.request.use(
	function (config) {
		config.headers.Authorization = `Bearer ${sessionStorage.getItem('token')?.slice(1, -1)}`;
		return config;
	},
	function (error) {
		// Do something with request error
		return Promise.reject(error);
	},
);
