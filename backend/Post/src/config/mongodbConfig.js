import { connect } from "mongoose";
const connectDB = async () => {
    const uri = process.env.MONGO_URI;
    console.log(`MongoDB URI: ${uri}`);
    try {
        await connect(uri);
        console.log("MongoDB connected");
    }
    catch (error) {
        console.error("MongoDB connection error:", error);
        process.exit(1);
    }
};

export default connectDB;