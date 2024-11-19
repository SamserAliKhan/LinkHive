import express from 'express';

// Import controllers
import { signup } from '../controllers/auth/signupController.js'; // Updated path for modularized signup
import { login } from '../controllers/auth/loginController.js';   // Updated path for modularized login
import { sendOTP } from '../controllers/auth/otpController.js';   // Updated path for modularized OTP sending

const router = express.Router();

// Routes
router.post('/signup', signup); // Route for user signup
router.post('/login', login);   // Route for user login
router.post('/send-otp', sendOTP); // Route for sending OTP

export default router;
