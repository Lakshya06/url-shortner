import rateLimit from 'express-rate-limit';

export const shortenLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many URL shorten requests from this IP'
});