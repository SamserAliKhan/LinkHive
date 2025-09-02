import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import corsOptions from "./config/corsConfig.js";
import cookieParser from "cookie-parser";
import connectDB from "./config/mongoDB.js";
import authProxyRoutes from "./routes/authProxyRoutes.js";
import authMiddleware from "./Middleware/authMiddleware.js";
import userProxyRoutes from "./routes/UserProxyRoutes.js";
import linkProxyRoutes from "./routes/linkProxyRoutes.js"; // <-- new

dotenv.config();
const app = express();

// --------------------
// Database connection
// --------------------
const mongouri = process.env.MONGO_URI;
console.log(`Connecting to MongoDB at uri...`, mongouri);
connectDB();

// --------------------
// Global Middleware
// --------------------

// Parse JSON bodies before routes (important for proxy forwarding)
app.use(express.json());

// Enable CORS
app.use(cors(corsOptions));
app.use(cookieParser());

// Logger for all incoming requests
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

// --------------------
// Routes
// --------------------

// Public routes → Auth Service
app.use("/auth", authProxyRoutes);

// Protected routes → require authMiddleware
app.use("/user", authMiddleware, userProxyRoutes);
app.use("/link", authMiddleware, linkProxyRoutes); // <-- protect Link Service

// --------------------
// Start server
// --------------------
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`API Gateway is running on port ${port}`);
});
