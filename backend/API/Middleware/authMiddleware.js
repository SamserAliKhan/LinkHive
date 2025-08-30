//Imports
import e from 'express';
import jwt from 'jsonwebtoken';
//Create a TOKEN_ERRORS for distinguishing error cases
const TOKEN_ERRORS = {
  MISSING: "TOKEN_MISSING",
  EXPIRED: "TOKEN_EXPIRED",
  INVALID: "TOKEN_INVALID",
  INTERNAL: "INTERNAL_AUTH_ERROR",
};

//create the middleware that:
const authMiddleware = (req,res,next) => {
  try{
    // 1. Read access token from HTTP-only cookie
    const token = req.cookies?.access_token;
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

      // 3. Attach the user information to the request object
      req.user = {
        userId : decoded.sub,
        role : decoded.role || "user"
      }
      next();
    })
  }catch(err){
    console.error(err);
    res.status(401).json({ error: err.message });
  }
}


//export the middleware
export default authMiddleware;