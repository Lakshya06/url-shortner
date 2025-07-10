import express from 'express';
import { shortenUrl, redirectUrl } from '../controllers/urlController.js';
import { shortenLimiter } from '../utils/rateLimiter.js';

const router = express.Router();

router.post('/shorten', shortenLimiter, shortenUrl);
router.get('/:code', redirectUrl);

export default router;