import mongoose from "mongoose";
import { DB_URI } from "../configs/config";

export const getDb = async () => {
  const connection = await mongoose.connect(DB_URI);
  console.log("Connected to DB");
  return connection;
};
