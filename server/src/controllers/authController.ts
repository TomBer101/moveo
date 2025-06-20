import { Request, Response } from 'express';
import { login, register } from '../services/authService';
import '../lib/sessions/config'; // Import to make session types available

interface LoginRequest {
    name: string;
    password: string;
}

type Role = 'user' | 'admin';

interface RegisterRequest {
    name: string;
    password: string;
    role: Role | undefined;
}

export const loginController = async (req: Request<{}, {}, LoginRequest>, res: Response): Promise<void> => {
    const { name, password } = req.body;

    try {
        const user = await login(name, password);
        req.session.user = {
            id: user._id.toString(),
            name: user.name,
            role: user.role
        };

        req.session.isAuthenticated = true;
        
        res.status(200).json({
            success: true,
            message: 'Login successful',
            user: {
                id: user._id,
                name: user.name,
                role: user.role
            }
        });
        
    } catch (error) {
        res.status(401).json({
            success: false,
            message: error instanceof Error ? error.message : 'Login failed'
        });
    }
}

export const registerController = async (req: Request<{}, {}, RegisterRequest>, res: Response): Promise<void> => {
    const { name, password, role } = req.body;

    try {
        const user = await register(name, password, role || 'user');
        res.status(201).json({
            success: true,
            message: 'Registration successful',
            user
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error instanceof Error ? error.message : 'Registration failed'
        });
    }
}
