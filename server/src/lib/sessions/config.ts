import session from 'express-session';
import MongoStore from 'connect-mongo';
import dotenv from 'dotenv';

dotenv.config();

// Session configuration with MongoDB store
export const sessionConfig: session.SessionOptions = {
  secret: process.env.SESSION_SECRET as string,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGODB_URI,
    collectionName: 'sessions', 
    ttl: 24 * 60 * 60, 
    autoRemove: 'native', 
    crypto: {
      secret: process.env.SESSION_SECRET as string
    }
  }),
  cookie: {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000, 
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax'
  },
  name: 'sessionId-moveo' 
};

// Extend session interface for TypeScript
declare module 'express-session' {
  interface SessionData {
    isAuthenticated: boolean;
    user?: {
      id: string;
      name: string;
      role: string
    };
  }
} 