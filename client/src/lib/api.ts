import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});

export const apiClient = {
    get: <T>(url: string) => api.get<T>(url).then(res => res.data),
    post: <T, D = unknown>(url: string, data: D) => api.post<T>(url, data).then(res => res.data),
    put: <T, D = unknown>(url: string, data: D) => api.put<T>(url, data).then(res => res.data),
}

export default api;

