import mongoose from "mongoose";

const connectDb = async () => {
  try {
    const respone = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDb is connnected`);
  } catch (error) {
    console.log("Because of this", error);
    throw error;
  }
};

export default connectDb;
