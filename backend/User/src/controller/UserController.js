import User from "../models/UserModel.js";

export const getProfile = async (req, res) => {
  try {
    const user = await User.findOne({ userId: req.user.id });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { userId: req.user.id },
      { $set: req.body },
      { new: true, upsert: true } // upsert ensures a profile exists
    );
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
