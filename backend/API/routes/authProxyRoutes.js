import express from "express";
import { createProxy } from "../config/proxyConfig.js";

const router = express.Router();
const authServiceUrl = process.env.AUTH_PORT || `http://localhost:5001`;

//OTP route
router.use(
  "/otp",
  createProxy(authServiceUrl, /^\/auth/, "/authOTP")
);

// Login route
router.use(
  "/login",
  createProxy(authServiceUrl, /^\/auth/, "/auth")
);

// Signup route
router.use(
  "/signup",
  createProxy(authServiceUrl, /^\/auth/, "/auth")
);

export default router;
