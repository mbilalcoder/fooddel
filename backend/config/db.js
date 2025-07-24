import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config()

const connectDb = async () => {
  const url = process.env.DB_URL;
    
  try {
    await mongoose.connect(url);
    console.log("✅ DB connected");
  } catch (error) {
    console.error("❌  DB connection failed:", error.message);
    process.exit(1);
  }
};

export default connectDb;
