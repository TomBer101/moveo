import { createContext, useContext, useState, type ReactNode } from 'react';
import { login } from '../services/authService';
import { useLocalStorage } from '../hooks/useLocalStorage';
import type { IUser } from '../types';

interface AuthContextType {
    user: IUser | null;
    login: (name: string, password: string) => Promise<void>;
    logout: () => void;
    setUser: (user: IUser | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    //const [user, setUser] = useState<IUser | null>(null);
    const [error, setError] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [user, setUser] = useLocalStorage<IUser | null>('moveo-user', null);

    const handleLogin = async (name: string, password: string) => {
        try {
            setIsLoading(true);
            const response = await login({ name, password });
            if (response.success) {
                setUser(response.user);
            } else {
                //throw new Error(response.message);
                setError(response.message);
            }
        } catch (error) {
            console.error('Login error:', error);
            setError('Login failed. Please check your credentials.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleLogout = () => {
        setUser(null);
        localStorage.removeItem('moveo-user');
    };

    const value = {
        user,
        error,
        isLoading,
        login: handleLogin,
        logout: handleLogout,
        setUser
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
