import express from 'express';
import {sendOTP} from '../controllers/OTP/send.js';
import {verifyOTP} from '../controllers/OTP/verify.js';

const router = express.Router();

router.post('/send', sendOTP);
router.post('/verify', verifyOTP);

export default router;