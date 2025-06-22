import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

interface ProtectedRouteProps {
    children: React.ReactNode;
    requiredRole?: string;
    fallbackPath?: string;
}

const ProtectedRoute = ({ children, requiredRole, fallbackPath = '/login' }: ProtectedRouteProps) => {
    const { user, isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        return <Navigate to={fallbackPath} replace />;
    }

    if (requiredRole && user?.role !== requiredRole) {
        return <Navigate to={'/unauthorized'} replace />;
    }

    return children;
}

export default ProtectedRoute;
        