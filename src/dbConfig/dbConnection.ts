import mongoose from "mongoose";

const dbconnection = async () => {
  try {
    const connection = await mongoose.connect(
      `${process.env.MONGO_URI}/${process.env.DB_NAME}`
    );
    mongoose.connection.on("connected", () => {
      console.log("Database connected successfully!");
    });

    mongoose.connection.on("error", () => {
      console.log("Mongodb connection error!");
      process.exit(1);
    });
  } catch (error) {
    console.log("🚀 ~ error:", error);
    console.error("Something went wrong while connecting DB!", error);
  }
};

export default dbconnection;
