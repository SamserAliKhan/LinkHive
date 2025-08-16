import express from 'express';
import {sendOTP} from '../Controller/send.js';
import { verifyOTP } from "../Controller/verify.js";

const router = express.Router();

router.post("/send", (req, res, next) => {
  console.log("OTP Route Hit");
  console.log("Request Body:", req.body);
  next();
}, sendOTP);

router.post("/verify", (req, res, next) => {
  console.log("OTP Verify Route Hit");
  console.log("Request Body:", req.body);
  next();
}, verifyOTP);

export default router;