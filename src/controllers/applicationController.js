import ApplicationModel from '../models/Application.js';
import JobModel from '../models/Job.js';

export const applyToJob = async (req, res) => {
  try {
    const jobId = req.params.jobId;
    const job = await JobModel.findById(jobId);
    if (!job) return res.status(404).json({ message: 'Job not found' });

    // ensure jobseeker can only apply once - unique index on model enforces but catch gracefully
    try {
      const app = await ApplicationModel.create({
        job: jobId,
        applicant: req.user._id,
        resumeUrl: req.body.resumeUrl || req.user.resumeUrl,
        skills: req.body.skills || req.user.skills
      });

      return res.status(201).json(app);
    } catch (err) {
      // duplicate key error
      if (err.code === 11000) {
        return res.status(400).json({ message: 'You have already applied to this job' });
      }
      throw err;
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getAppliedJobs = async (req, res) => {
  try {
    const apps = await ApplicationModel.find({ applicant: req.user._id }).populate('job');
    res.json(apps);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
