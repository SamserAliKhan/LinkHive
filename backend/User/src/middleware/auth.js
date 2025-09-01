import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  const token = req.cookies?.accessToken; // short-lived token from Auth
  // console.log("Verifying token:", token);

  if (!token) return res.status(401).json({ message: "No token provided" });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: "Invalid/Expired token" });
    req.user = decoded; // attach user data
    next();
  });
};
export default verifyToken;