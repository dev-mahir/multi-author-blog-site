import mongoose from "mongoose";

// create a mongoDB connection
const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGODB_URL);
    console.log(`mongoDB connected successfully.`.bgMagenta.black);
  } catch (error) {
    console.log(error);
  }
};


// export mongo connection

export default connectDB;
