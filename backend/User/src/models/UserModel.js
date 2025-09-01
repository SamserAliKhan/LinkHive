import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true, unique: true }, // comes from Auth-Service
    name: { type: String },
    email: { type: String, unique: true },
    bio: { type: String },
    avatar: { type: String },
    links: [{ type: String }],
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
