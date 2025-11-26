import express from 'express';
import { protect } from '../middleware/auth.js';
import authorize  from '../middleware/roles.js';
import {
  getPendingEmployers,
  approveEmployer,
  rejectEmployer,
  blockUser,
  unblockUser,
  getAllJobs,
  getAllApplications
} from '../controllers/adminController.js';

const router = express.Router();

// all admin routes require role 'admin'
router.use(protect, authorize('admin'));

router.get('/pending-employers', getPendingEmployers);
router.post('/approve-employer/:id', approveEmployer);
router.delete('/reject-employer/:id', rejectEmployer);
router.post('/block-user/:id', blockUser);
router.post('/unblock-user/:id', unblockUser);
router.get('/jobs', getAllJobs);
router.get('/applications', getAllApplications);

export default router;
