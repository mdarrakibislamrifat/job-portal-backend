import express from 'express';
import { protect } from '../middleware/auth.js';
import { authorize } from '../middleware/roles.js';
import { applyToJob, getAppliedJobs } from '../controllers/application.controller.js';

const router = express.Router();

// jobseeker routes (protected)
router.post('/apply/:jobId', protect, authorize('jobseeker'), applyToJob);
router.get('/me', protect, authorize('jobseeker'), getAppliedJobs);

export default router;
