import { Request, Response, NextFunction } from 'express';
import '../lib/sessions/config'; // Import to make session types available

// export const requireAuth = (req: Request, res: Response, next: NextFunction): void => {
//     if (!req.session.isAuthenticated || !req.session.user?.id) {
//         res.status(401).json({
//             error: 'Authentication required',
//             message: 'Please log in to access this resource'
//         });
//         return;
//     }

//     next()
// }

export const authorizedRoles = (...roles: string[]) => {
    return (req: Request, res: Response, next: NextFunction): void => {
        if (!roles.includes(req.session.user?.role as string)) {
            res.status(403).json({
                error: 'Unauthorized',
                message: 'You are not authorized to access this resource'
            });
            return;
        }

        next();
    }
}
