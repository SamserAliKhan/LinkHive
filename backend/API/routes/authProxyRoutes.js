import express from "express";
import { createProxy } from "../config/proxyConfig.js";

const router = express.Router();
const authServiceUrl = process.env.AUTH_PORT || `http://localhost:5001`;

//OTP route
router.use("/otp",createProxy(authServiceUrl, /^\/auth/, "/authOTP"));

// Login route
router.use("/login",createProxy(authServiceUrl));

//Logout route
router.use("/logout",createProxy(authServiceUrl));

// Signup route
router.use("/signup",createProxy(authServiceUrl));

//Refresh token route
router.use("/refresh",createProxy(authServiceUrl));

export default router;
