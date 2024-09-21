import express from 'express';
import { sginup,login } from '../controllers/authController.js';

const router = express.Router();

router.post('/signup', sginup);
router.post('/login', login);

export default router;