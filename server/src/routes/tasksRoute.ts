import { Router } from 'express';
import { createTaskController, getTasksController } from '../controllers/tasksController';

const router = Router();


router.post('/', createTaskController);
router.get('/', getTasksController);

export default router;

