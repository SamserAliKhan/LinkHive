import express from "express";
import { createProxy } from "../config/proxyConfig.js";

const router = express.Router();
const UserServiceUrl = process.env.USER_PORT || `http://localhost:5002`;

//me route
router.use(
    "/me", 
    createProxy(UserServiceUrl)
);

export default router;