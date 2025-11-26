import mongoose from "mongoose"
import dotenv from "dotenv"

if (process.env.NODE_ENV !== 'production') {
  dotenv.config({ path: './.env' });
}



 const connectDB=async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("DB connected");
    }catch(error){
        console.error("MongoDB Connection Failed:", error.message);
    
    }
}

export default connectDB;
