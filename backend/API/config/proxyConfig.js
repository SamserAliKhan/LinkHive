// config/proxyConfig.js
import proxy from "express-http-proxy";

export const createProxy = (target, replaceRegex, replacePath) => {
  return proxy(target, {
    proxyReqPathResolver: (req) =>
      req.originalUrl.replace(replaceRegex, replacePath),

    // Ensure request body is forwarded correctly
    proxyReqBodyDecorator: (bodyContent, srcReq) => {
      console.log("Forwarding body:", bodyContent);
      return bodyContent;
    },

    //proxy Error Handle
    proxyErrorHandler: (err, res, next) => {
      console.error("Proxy error:", err);
      res.status(500).json({ error: "Proxy request failed" });
    },

    //Capture and log server response before sending it back to client
    userResHeaderDecorator: (headers, userReq, userRes, proxyReq, proxyRes) => {
      // Allow cookies from proxied service to pass through
      headers["Access-Control-Allow-Origin"] =
        process.env.CORS_ALLOWED_ORIGINS || "http://localhost:3000";
      headers["Access-Control-Allow-Credentials"] = "true";
      headers["Access-Control-Expose-Headers"] = "set-cookie";

      return headers;
    },
  });
};
