import express from "express";
import  verifyToken from "../middleware/auth.js";
import { getProfile, updateProfile } from "../controller/UserController.js";

const router = express.Router();

// GET user profile
router.get("/me", verifyToken, getProfile);

// UPDATE user profile
router.put("/me", verifyToken, updateProfile);

export default router;
