import express, { Request, Response, NextFunction } from 'express';
import session from 'express-session';
import dotenv from 'dotenv';


import { connectDB } from './lib/mongodb/config';
import { sessionConfig } from './lib/sessions/config';

import authRoutes from './routes/auth';
import tagsRoutes from './routes/tagsRoute';

dotenv.config();


const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(session(sessionConfig));

app.use('/api/auth', authRoutes);
app.use('/api/tags', tagsRoutes);


const startServer = async (): Promise<void> => {
  try {
    // Connect to MongoDB
    await connectDB();
    
    // Start the server
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

// Start the server
startServer();
