import { Router } from 'express';
import { createTaskController, getTasksController } from '../controllers/tasksController';
import { requireAuth } from '../middlewares/authMiddleware';

const router = Router();

router.use(requireAuth);

router.post('/', createTaskController);
router.get('/', getTasksController);

export default router;

