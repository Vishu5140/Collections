import mongoose from "mongoose";

const DataBase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("DataBase Connected");
  } catch (error) {
    console.log("DataBase Connection error:", error.message);
    throw error;
  }
};

export default DataBase;