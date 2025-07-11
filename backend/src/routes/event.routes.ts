import { Router } from 'express';
import { eventController } from '../controllers/event.controller';
import { authMiddleware, optionalAuth } from '../middleware/auth.middleware';

const router = Router();

router.get('/', optionalAuth, eventController.getEvents);
router.get('/:id', optionalAuth, eventController.getEventById);
router.post('/:id/register', authMiddleware, eventController.registerForEvent);

export default router;
