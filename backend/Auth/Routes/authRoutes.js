import express from 'express';

// Import controllers
import { signup } from '../Controller/signupController.js'; // Updated path for modularized signup
import { login } from '../Controller/loginController.js';   // Updated path for modularized login

const router = express.Router();

// Routes
router.post('/signup', signup); // Route for user signup
router.post('/login', login);   // Route for user login

export default router;
