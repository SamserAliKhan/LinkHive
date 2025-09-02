import express from "express";
import { createProxy } from "../config/proxyConfig.js";

const router = express.Router();
const LinkServiceUrl = process.env.LINK_PORT || "http://localhost:5003";

// All link routes go to Link Service
router.use("/", createProxy(LinkServiceUrl));

export default router;
