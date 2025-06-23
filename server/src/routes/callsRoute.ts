import { Router, Request, Response } from 'express';
import { createCallController, addTagToCallController, addTaskToCallController, getCallsController, updateTaskStatusController } from '../controllers/callsController';

const router = Router();



router.get('/', getCallsController);
router.post('/', createCallController);
router.put('/:callId/tags', addTagToCallController);
router.post('/:callId/tasks', addTaskToCallController);
router.put('/:callId/tasks/:taskId', updateTaskStatusController);

export default router;

