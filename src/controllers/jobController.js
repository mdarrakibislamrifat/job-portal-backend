import Job from "../models/Job.js";
import Application from "../models/Application.js";


export const createJob = async (req, res) => {
  try {
    const { title, company, location, jobType, salaryRange, description } = req.body;
    const job = await Job.create({
      title,
      company,
      location,
      jobType,
      salaryRange,
      description,
      createdBy: req.user._id
    });

    res.status(201).json(job);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: 'Job not found' });

    if (job.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not allowed' });
    }

    Object.assign(job, req.body);
    await job.save();
    res.json(job);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getAllJobs = async (req, res) => {
  try {
    const { location, jobType } = req.query;
    const filter = {};

    if (location) filter.location = location;
    if (jobType) filter.jobType = jobType;

    const jobs = await Job.find(filter).populate('createdBy', 'name company');
    res.json(jobs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).populate('createdBy', 'name');
    if (!job) return res.status(404).json({ message: 'Job not found' });

    res.json(job);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getApplicantsForJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: 'Job not found' });

    if (job.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not allowed' });
    }

    const apps = await Application
      .find({ job: job._id })
      .populate('applicant', 'name email skills resumeUrl');

    res.json(apps);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
