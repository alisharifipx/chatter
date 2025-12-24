import axios, {type AxiosInstance, type AxiosResponse, type InternalAxiosRequestConfig} from 'axios';

const client: AxiosInstance = axios.create({
    baseURL: '/api',
    timeout: 5000,
    withCredentials: true,
});

client.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    config.headers.Accept = 'application/json';

    return config;
});

client.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error) => {
        if (error.response?.status === 401) {
            console.error('Unauthorised', error.message);
        }

        return Promise.reject(error);
    },
);

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
