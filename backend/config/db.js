import { connect } from "mongoose";

const connectDB = async () => {
  try {
    connect(process.env.MONGO_URI).then(() => {
      console.log(`DB connected👍`);
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

export default connectDB;
