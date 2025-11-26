import express from 'express';


import {
  createJob,
  updateJob,
  getAllJobs,
  getJobById,
  getApplicantsForJob
} from '../controllers/jobController.js';

import { protect } from '../middleware/auth.js';
import authorize from '../middleware/roles.js';


const router = express.Router();

// public routes
router.get('/', getAllJobs);
router.get('/:id', getJobById);

// employer routes (protected)
router.post('/', protect, authorize('employer'), createJob);
router.put('/:id', protect, authorize('employer'), updateJob);
router.get('/:id/applicants', protect, authorize('employer'), getApplicantsForJob);

export default router;
