import mongoose from "mongoose"


const ApplicationSchema = new mongoose.Schema({
job: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
applicant: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
resumeUrl: { type: String },
skills: { type: [String], default: [] }
}, { timestamps: true });


ApplicationSchema.index({ job: 1, applicant: 1 }, { unique: true }); // ensure one application per job per user


export default mongoose.model("Application", ApplicationSchema);