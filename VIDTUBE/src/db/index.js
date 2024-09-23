import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";


const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`mongodb+srv://youtubeUser:Pmu6vlHACAoqd7uT@cluster0.jbrtgk7.mongodb.net/vidtube`);
        console.log(` \n MongoDB connected: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("MongoDB connection error",error);
        process.exit(1);
    }
}

export  { connectDB }