import mongoose from "mongoose";

const LinkSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: { type: String, required: true },
    url: { type: String, required: true },
    description: { type: String },
    tags: { type: [String] },
  },
  { timestamps: true }
);

const Link = mongoose.model("Link", LinkSchema);
export default Link;
