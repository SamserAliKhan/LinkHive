import express from "express";
import User from "../models/UserModel.js";
import { verifyInternalRequest } from "../middleware/internalAuth.js";

const router = express.Router();

// Internal route: create user profile
router.post("/users", verifyInternalRequest, async (req, res) => {
  try {
    const { userId, email, name } = req.body;

    const existing = await User.findOne({ userId });
    if (existing) {
      return res
        .status(200)
        .json({ message: "User already exists", user: existing });
    }

    const newUser = await User.create({ userId, email, name });
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
