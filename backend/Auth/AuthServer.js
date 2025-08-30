import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/mongoDB.js";
import otpRouter from "./Routes/otpRoutes.js";
import authRoutes from "./Routes/authRoutes.js";
import authMiddleware from "./middleware/authMiddleware.js";

dotenv.config();
const app = express();

// Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json()); // middleware to parse JSON bodies
app.use(cookieParser()); // middleware to parse cookies

app.get("/test/protected", authMiddleware, (req, res) => {
  res.json({ message: "Protected OK", user: req.user });
});


// Logger
app.use((req, res, next) => {
  console.log(
    "Incoming Request:",
    req.method,
    req.url,
    "Headers:",
    req.headers
  );
  next();
});

// Routes
app.use("/authOTP/otp", otpRouter); // OTP routes: /send, /verify
app.use("/auth", authRoutes); // Other auth routes

// Start server
const port = process.env.PORT || 5001;
app.listen(port, () => {
  console.log(`Auth server is running on port ${port}`);
});
