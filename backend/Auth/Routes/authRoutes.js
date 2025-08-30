import express from 'express';

// Import controllers
import { signup } from '../Controller/signupController.js'; // Updated path for modularized signup
import { login } from '../Controller/loginController.js';   // Updated path for modularized login
import { refresh } from '../Controller/refreshController.js';

const router = express.Router();

// Routes
router.post('/signup', signup); // Route for user signup
router.post('/login', login);   // Route for user login
router.post("/refresh", refresh); // Route for refreshing tokens

export default router;
