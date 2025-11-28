import { Router } from 'express';
import { register, login } from '../controllers/auth.controller';
import { getSubjects, getSubtopicDetails, markComplete } from '../controllers/content.controller';
import { getUploadUrl, triggerImport } from '../controllers/admin.controller';
import { authenticate, requireRole } from '../middlewares/authMiddleware';

const router = Router();

// Auth
router.post('/auth/register', register);
router.post('/auth/login', login);

// Content (Public/Protected mix)
router.get('/subjects', authenticate, getSubjects);
router.get('/subtopics/:id', authenticate, getSubtopicDetails);
router.post('/subtopics/:id/complete', authenticate, markComplete);

// Admin
router.post('/admin/upload-url', authenticate, requireRole(['ADMIN', 'EDITOR']), getUploadUrl);
router.post('/admin/import', authenticate, requireRole(['ADMIN']), triggerImport);

export default router;
