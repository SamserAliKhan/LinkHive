import express from 'express';

// Import controllers
import { signup } from '../Controller/signupController.js'; // Path for modularized signup
import { login } from '../Controller/loginController.js';   // Path for modularized login
import { refresh } from '../Controller/refreshController.js'; // Path for Rotation of RT
import { logout } from '../Controller/logotController.js'; // Path for modularized logot

const router = express.Router();

// Routes
router.post('/signup', signup); // Route for user signup
router.post('/login', login);   // Route for user login
router.post("/refresh", refresh); // Route for refreshing tokens
router.post("/logout", logout);   // Route for user logout

export default router;
