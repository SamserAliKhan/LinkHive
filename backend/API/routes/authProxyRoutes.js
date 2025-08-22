import express from "express";
import proxy from "express-http-proxy";

const router = express.Router();

router.use(
  "/otp",
  proxy(process.env.AUTH_PORT || `http://localhost:5001`, {
    proxyReqPathResolver: (req) =>
      req.originalUrl.replace(/^\/auth/, "/authOTP"),
  })
);
router.use(
  "/login",
  proxy(process.env.AUTH_PORT|| `http://localhost:5001`, {
    proxyReqPathResolver: (req) =>
      req.originalUrl.replace(/^auth/, "/auth")
  })
);

router.use(
  "/signup",
  proxy(process.env.AUTH_PORT || `http://localhost:5001`, {
    proxyReqPathResolver: (req) =>
      req.originalUrl.replace(/^auth/, "/auth")
  })
);

router.use(
  "/login",
  proxy(process.env.AUTH_PORT|| `http://localhost:5001`, {
    proxyReqPathResolver: (req) =>
      req.originalUrl.replace(/^auth/, "/auth")
  })
);

router.use(
  "/signup",
  proxy(process.env.AUTH_PORT || `http://localhost:5001`, {
    proxyReqPathResolver: (req) =>
      req.originalUrl.replace(/^auth/, "/auth")
  })
);

export default router;
