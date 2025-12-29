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

const PORT = process.env.PORT || 5000; // Render sets PORT (default 10000)
const AUTH_HOST = process.env.AUTH_HOST || "localhost";
const AUTH_PORT = process.env.AUTH_PORT || 5001;
const AUTH_URL = `http://${AUTH_HOST}:${AUTH_PORT}`;

const USER_HOST = process.env.USER_HOST || "localhost";
const USER_PORT = process.env.USER_PORT || 5002;
const USER_URL = `http://${USER_HOST}:${USER_PORT}`;

const POST_HOST = process.env.POST_HOST || "localhost";
const POST_PORT = process.env.POST_PORT || 5003;
const POST_URL = `http://${POST_HOST}:${POST_PORT}`;

console.log("Service URLs:");
console.log("Auth Service:", AUTH_URL);
console.log("User Service:", USER_URL);
console.log("Post Service:", POST_URL);

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

app.listen(PORT, () => {
  console.log(`API Gateway is running on port ${PORT}`);
});
