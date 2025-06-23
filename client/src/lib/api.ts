import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

export const apiClient = {
    get: async <T>(url: string) => {
        const res = await api.get<T>(url);
        return res.data;
    },
    post: async <T, D = unknown, P = Record<string, string>>(url: string, data?: D, params?: P) => {
        const res = await api.post<T>(url, data, { params });
        return res.data;
    },
    put: async <T, D = unknown>(url: string, data: D) => {
        const res = await api.put<T>(url, data);
        return res.data;
    },
}

export default api;

