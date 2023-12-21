import mongoose from "mongoose";

const connectToDB = async () => {
  const URL = process.env.MONGODB_URI;
  try {
    await mongoose.connect(URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log("Database connected");
  } catch (error) {
    console.log("Error connecting to the database:", error.message);
  }
};

export default connectToDB;
