import { Router } from 'express';
import authRoutes from './auth.routes';
import memberRoutes from './member.routes';
import eventRoutes from './event.routes';

const router = Router();

// Health check for API
router.get('/', (req, res) => {
  res.json({
    message: 'Agarwal Sabha Platform API',
    version: '1.0.0',
    endpoints: [
      'GET /api/auth/me',
      'POST /api/auth/login',
      'POST /api/auth/register',
      'GET /api/members',
      'GET /api/events'
    ]
  });
});

router.use('/auth', authRoutes);
router.use('/members', memberRoutes);
router.use('/events', eventRoutes);

export default router;
