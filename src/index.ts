import express, { NextFunction, Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import cookieSession from 'cookie-session';
import dotenv from 'dotenv';
import { apiConfig } from './config/apiConfig';
import { connDB } from './db/dbConn';
import { createLogger } from './logging/logger';
dotenv.config();
const logger = createLogger('index');

logger.info('Starting server...');
const app = express();
// MIDDLEWARES
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
// By enabling the "trust proxy" setting via app.enable('trust proxy'), Express will have knowledge that it's sitting behind a proxy and that the X-Forwarded-* header fields may be trusted, which otherwise may be easily spoofed.
app.set('trust proxy', 1);
app.use(
  cookieSession({
    name: 'session',
    secret: process.env.COOKIE_SECRET || 'dev_secret',
  })
);
// Middleware to log all requests
app.use((req, res, next) => {
  logger.info(`Incoming request: ${req.method} ${req.url} ${req.ip}`);
  next();
});

// ROUTES
app.get(apiConfig.v, (req, res) => {
  res.json({
    message: 'Welcome to Health Tracker API',
    url: req.originalUrl,
    ip: req.ip,
    host: req.hostname,
    protocol: req.protocol,
    method: req.method,
  });
});

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  logger.error(`Error: ${err.message}`);
  res.status(500).send('An error occurred');
});

// DATABASE
logger.info('Connecting to database...');
connDB();

// SERVER
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  logger.info(`Server is running on port ${port}`);
});
