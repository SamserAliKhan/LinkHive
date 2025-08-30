import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import corsOptions from "./config/corsConfig.js";
import cookieParser from "cookie-parser";
// import linkRouters from ".././routes/linkRoutes.js";
import connectDB from "./config/mongoDB.js";
import authProxyRoutes from "./routes/authProxyRoutes.js";
import authMiddleware from "./Middleware/authMiddleware.js";

dotenv.config();
const app = express();

// Database connection
const mongouri = process.env.MONGO_URI;
console.log(`Connecting to MongoDB at uri...`, mongouri);
connectDB();

// --------------------
// Middleware
// --------------------

// Parse JSON bodies before routes (important for proxy forwarding)
app.use(express.json());

// Enable CORS
app.use(cors(corsOptions)); //CORS middleware 
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

// Main API routes
// app.use("/api/link", linkRouters);

// Auth routes (proxied to Auth Service)
app.use("/auth", authProxyRoutes);

// Private routes → protect with middleware
// app.use("/api", authMiddleware, apiRoutes);

// --------------------
// Start server
// --------------------
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
