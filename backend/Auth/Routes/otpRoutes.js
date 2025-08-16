import express from 'express';
import {sendOTP} from '../Controller/send.js';
import { verifyOTP } from "../Controller/verify.js";

const router = express.Router();

router.post('/send', sendOTP);
router.post('/verify', verifyOTP);

export default router;