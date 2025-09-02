import dotenv from "dotenv";
import express from "express";
import LinkRoutes from "./routes/LinkRoutes.js";
import connectDB from "./config/mongodbConfig.js";

// Load environment variables
dotenv.config({ quiet: true });

const PORT = process.env.PORT || 5003;

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(cors());
// app.use(cookieParser());

// Routes
app.use("/link", LinkRoutes);

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({ status: "UP", service: "link-service" });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: "Internal Server Error",
    error: process.env.NODE_ENV === "development" ? err.message : {},
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Link service running on port ${PORT}`);
});

export default app;