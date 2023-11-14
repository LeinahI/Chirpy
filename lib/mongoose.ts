import mongoose, { mongo } from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
  mongoose.set("strictQuery", true);

  if (!process.env.MONGODB_URL) return console.log("MONGODB_URL is not found");
  if (isConnected) return console.log("You are already connected to MONGODB");

  try {
    await mongoose.connect(process.env.MONGODB_URL);
    isConnected = true;
    console.log("You are connect to MongoDB now!");
  } catch (err: any) {
    console.log("there's an error while connecting to MongoDB", err);
  }
};
