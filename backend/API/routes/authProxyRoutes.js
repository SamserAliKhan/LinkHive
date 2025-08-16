import express from "express";
import proxy from "express-http-proxy";

const router = express.Router();

router.use(
  "/otp",
  proxy(`http://localhost:${process.env.AUTH_PORT || 5001}`, {
    proxyReqPathResolver: (req) =>
      req.originalUrl.replace(/^\/auth/, "/authOTP"),
  })
);

export default router;
