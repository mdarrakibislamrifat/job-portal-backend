import mongoose from 'mongoose';


const UserSchema = new mongoose.Schema({
name: { type: String, required: true },
email: { type: String, required: true, unique: true },
password: { type: String, required: true },
role: { type: String, enum: ['jobseeker', 'employer', 'admin'], required: true },
bio: { type: String },
skills: { type: [String], default: [] },
resumeUrl: { type: String },
isApproved: { type: Boolean, default: function() { return this.role !== 'employer'; } },
isBlocked: { type: Boolean, default: false }
}, { timestamps: true });


export default mongoose.model("User", UserSchema);