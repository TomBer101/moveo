import { Router, Request, Response } from 'express';
import { createTagController, getTagsController, updateTagController } from '../controllers/tagsController';

const router = Router();

// Apply authentication and admin role requirement to all tag routes

router.post('/', createTagController);
router.get('/', getTagsController);
router.put('/:id', updateTagController);

export default router;

