// Imports
import jwt from "jsonwebtoken";

// Create a TOKEN_ERRORS for distinguishing error cases
const TOKEN_ERRORS = {
  MISSING: "TOKEN_MISSING",
  EXPIRED: "TOKEN_EXPIRED",
  INVALID: "TOKEN_INVALID",
  INTERNAL: "INTERNAL_AUTH_ERROR",
};

// Middleware for token validation
const authMiddleware = (req, res, next) => {
  try {
    // 1. Read access token from HTTP-only cookie (or from Authorization header as fallback)
    const token =
      // req.cookies?.access_token || //old key
      req.cookies?.accessToken || // correct one from Auth server
      req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ error: TOKEN_ERRORS.MISSING });
    }

    // 2. Verify the token using the secret key
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        if (err.name === "TokenExpiredError") {
          return res.status(401).json({ error: TOKEN_ERRORS.EXPIRED });
        }
        return res.status(401).json({ error: TOKEN_ERRORS.INVALID });
      }

      console.log("Decoded JWT payload:", decoded); // Log the decoded JWT payload

      // 3. Attach the user information both ways:
      //    a) On req.user (for internal gateway use if needed)
      //    b) As headers for downstream services
      req.user = {
        userId: decoded.userId ,
        role: decoded.role || "user",
      };

      // Inject into headers so downstream microservices (Link Service) can use it
      req.headers["x-user-id"] = decoded.userId;
      req.headers["x-user-role"] = decoded.role || "user";

      next();
    });
  } catch (err) {
    console.error(err);
    res.status(401).json({ error: TOKEN_ERRORS.INTERNAL });
  }
};

// Export the middleware
export default authMiddleware;
