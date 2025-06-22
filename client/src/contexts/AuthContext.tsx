import { createContext, useContext, useState, type ReactNode } from 'react';
import { login } from '../services/authService';
import type { IUser } from '../types';

interface AuthContextType {
    user: IUser | null;
    isAuthenticated: boolean;
    login: (name: string, password: string) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<IUser | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [error, setError] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleLogin = async (name: string, password: string) => {
        try {
            setIsLoading(true);
            const response = await login({ name, password });
            if (response.success) {
                setUser(response.user);
                setIsAuthenticated(true);
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
        setIsAuthenticated(false);
    };

    const value = {
        user,
        isAuthenticated,
        error,
        isLoading,
        login: handleLogin,
        logout: handleLogout
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
