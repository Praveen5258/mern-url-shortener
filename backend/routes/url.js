import express from 'express';
import url from '../models/url.js';
import { nanoid } from 'nanoid';

const router = express.Router();

router.post('/shorten', async (req, res) => {
    try {
        const { originalUrl } = req.body;
        if (!originalUrl) {
            return res.status(400).json({ error: 'Original URL is required' });
        }

        try {
            new URL(originalUrl);
        }
        catch (error) {
            return res.status(400).json({ error: 'Invalid URL format' });
        }

        let shortId;
        let exist = true;

        while (exist) {
            shortId = nanoid(8);
            exist = await url.findOne({ shortId });
        }

        const newUrl = new url({
            originalUrl,
            shortId
        });

        await newUrl.save();

        res.json({
            shortId: newUrl.shortId,
            originalUrl: newUrl.originalUrl,
            shortUrl: `${process.env.BASE_URL}/${newUrl.shortId}`
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/:shortId', async (req, res) => {
    try {
        const { shortId } = req.params;
        const urltemp = await url.findOne({ shortId });

        if (!urltemp) {
            return res.status(404).json({ error: 'URL not found' });
        }

        urltemp.clicks++;
        await urltemp.save();

        return res.redirect(urltemp.originalUrl);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
});

export default router;
