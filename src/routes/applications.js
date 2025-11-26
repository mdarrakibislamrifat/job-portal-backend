import express from 'express';
import { protect } from '../middleware/auth.js';

import { applyToJob, getAppliedJobs } from '../controllers/applicationController.js';
import authorize from '../middleware/roles.js';

const router = express.Router();

// jobseeker routes (protected)
router.post('/apply/:jobId', protect, authorize('jobseeker'), applyToJob);
router.get('/me', protect, authorize('jobseeker'), getAppliedJobs);

export default router;
