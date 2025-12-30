import axios, { type AxiosInstance, type InternalAxiosRequestConfig } from 'axios';

const client: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    timeout: 5000,
	withCredentials: true,
});

export async function apiGet<T>(url: string, config?: InternalAxiosRequestConfig) {
	const res = await client.get<T>(url, config);

	return res.data;
}

export async function apiPost<T>(url: string, data?: any, config?: InternalAxiosRequestConfig) {
	const res = await client.post<T>(url, data, config);

	return res.data;
}

export async function apiPut<T>(url: string, data?: any, config?: InternalAxiosRequestConfig) {
	const res = await client.put<T>(url, data, config);

	return res.data;
}

export async function apiDelete<T>(url: string, config?: InternalAxiosRequestConfig) {
	const res = await client.delete<T>(url, config);

	return res.data;
}
