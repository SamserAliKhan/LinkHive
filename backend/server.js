import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRoutes from './routes/authRoutes.js';
import cors from 'cors';
import linkRouters from './routes/linkRoutes.js';
import otpRouter from './routes/otpRoutes.js';
import connectDB from './config/mongoDB.js';

dotenv.config();
const app = express();

//database connection
connectDB();

//Middleware
app.use(express.json());

//CORS
app.use(cors());

//Routes
app.use('/api/auth', authRoutes);
app.use('/api/link', linkRouters);
app.use('/api/otp', otpRouter);


const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});