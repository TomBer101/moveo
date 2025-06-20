import { Router, Request, Response } from 'express';
import { createTagController, getTagsController, updateTagController } from '../controllers/tagsController';
import { requireAuth, authorizedRoles } from '../middlewares/authMiddleware';

const router = Router();

// Apply authentication and admin role requirement to all tag routes
router.use(requireAuth);
router.use(authorizedRoles('admin'));

router.post('/', createTagController);
router.get('/', getTagsController);
router.put('/:id', updateTagController);

export default router;

