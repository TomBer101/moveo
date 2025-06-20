import { Router, Request, Response } from 'express';
import { createCallController } from '../controllers/callsController';
import { requireAuth, authorizedRoles } from '../middlewares/authMiddleware';

const router = Router();

// router.use(requireAuth);
// router.use(authorizedRoles('user'));

router.post('/', createCallController);

export default router;

