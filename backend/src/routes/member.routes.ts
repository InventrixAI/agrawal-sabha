import { Router } from 'express';
import { memberController } from '../controllers/member.controller';
import { authMiddleware, optionalAuth } from '../middleware/auth.middleware';

const router = Router();

router.get('/', optionalAuth, memberController.getMembers);
router.get('/stats', memberController.getStats);
router.get('/:id', optionalAuth, memberController.getMemberById);
router.put('/:id', authMiddleware, memberController.updateMember);

export default router;
