import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import connectDB from './config/MongoConfig.js';
import userRoutes from './routes/UserRoute.js';
import internalRouteouter from './routes/internalRoute.js';

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();
const PORT = process.env.PORT || 5002;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());

// Connect to MongoDB
connectDB();

// Routes
app.use('/user',userRoutes)
app.use('/internal', internalRouteouter);

// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'UP', service: 'user-service' });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        message: 'Internal Server Error',
        error: process.env.NODE_ENV === 'development' ? err.message : {}
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`User service running on port ${PORT}`);
});

export default app;