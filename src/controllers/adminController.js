import User from '../models/User.js';
import Job from '../models/Job.js';
import Application from '../models/Application.js';

export const getPendingEmployers = async (req, res) => {
  try {
    const pending = await User.find({ role: 'employer', isApproved: false });
    res.json(pending);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const approveEmployer = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.isApproved = true;
    await user.save();
    res.json({ message: 'Employer approved' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const rejectEmployer = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    await user.remove();
    res.json({ message: 'Employer rejected and removed' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const blockUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.isBlocked = true;
    await user.save();
    res.json({ message: 'User blocked' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const unblockUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.isBlocked = false;
    await user.save();
    res.json({ message: 'User unblocked' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find().populate('createdBy', 'name');
    res.json(jobs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getAllApplications = async (req, res) => {
  try {
    const apps = await Application.find()
      .populate('job')
      .populate('applicant', 'name email');
    res.json(apps);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
