import { Router, Request, Response } from 'express';
import { createTagController, getTagsController, updateTagController } from '../controllers/tagsController';
import { requireAuth, authorizedRoles } from '../middlewares/authMiddleware';

const router = Router();

// Apply authentication and admin role requirement to all tag routes
router.use(requireAuth);

router.post('/', authorizedRoles('admin'), createTagController);
router.get('/', getTagsController);
router.put('/:id', authorizedRoles('admin'), updateTagController);

export default router;

