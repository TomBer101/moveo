import { Router, Request, Response } from 'express';
import { createCallController, addTagToCallController, addTaskToCallController, getCallsController, updateTaskStatusController } from '../controllers/callsController';
import { requireAuth, authorizedRoles } from '../middlewares/authMiddleware';

const router = Router();

router.use(requireAuth);
router.use(authorizedRoles('user'));

router.get('/', getCallsController);
router.post('/', createCallController);
router.put('/:callId/tags', addTagToCallController);
router.post('/:callId/tasks', addTaskToCallController);
router.put('/:callId/tasks/:taskId', updateTaskStatusController);

export default router;

