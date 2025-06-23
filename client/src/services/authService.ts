import { apiClient } from "../lib/api";
import type { ILoginResponse } from "../types";

interface LoginData {
    name: string;
    password: string;
}

export const login = async (data: LoginData) => {
    try {
            const response = await apiClient.post<ILoginResponse>('/auth/login', data);
    return response;
    } catch (error) {
        console.error('Login failed:', error);
        throw error;
    }

}

// export const register = async (data: RegisterData) => {
//     const response = await apiClient.post<IRegisterResponse>('/register', data);
//     return response;
// }
