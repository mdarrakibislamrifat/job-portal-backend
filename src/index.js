import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';



dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

connectDB();



// routes
// app.use('/api/auth', './routes/auth');
// app.use('/api/jobs', './routes/jobs');
// app.use('/api/applications', './routes/applications');
// app.use('/api/admin', './routes/admin');


app.get('/', (req, res) => res.send('Job Portal API'));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));