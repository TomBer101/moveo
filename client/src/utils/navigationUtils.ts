import { type IUserRole } from '../types';

    export const getRoleBasedRedirect = (role?: IUserRole): string => {
    switch (role) {
        case 'admin':
            return '/admin';
        case 'user':
            return '/user';
        default:
            return '/';
    }
};