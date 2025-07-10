import Url from '../models/Url.js';
import generateShortCode from '../utils/generateShortCode.js';
import validator from 'validator';

export const shortenUrl = async (req, res) => {
  const { url } = req.body;
  
  // Validate URL
  if (!validator.isURL(url, { require_protocol: true })) {
    return res.status(400).json({ error: 'Invalid URL format' });
  }

  try {
    // Check if URL already exists
    let existingUrl = await Url.findOne({ originalUrl: url });
    
    if (existingUrl) {
        return res.json({ shortUrl: `${process.env.BASE_URL}/${existingUrl.shortCode}` });
    }

    // Create new short URL
    const shortCode = generateShortCode();
    const newUrl = new Url({
      originalUrl: url,
      shortCode,
    });

    await newUrl.save();
    res.status(201).json({ shortUrl: `${process.env.BASE_URL}/${shortCode}` });  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const redirectUrl = async (req, res) => {
  try {
    const url = await Url.findOneAndUpdate(
      { shortCode: req.params.code },
      { $inc: { clicks: 1 } },
      { new: true }
    );

    if (!url) {
      return res.status(404).json({ error: 'URL not found' });
    }

    if (url.expiresAt < Date.now()) {
      return res.status(410).json({ error: 'URL has expired' });
    }

    res.redirect(url.originalUrl);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};