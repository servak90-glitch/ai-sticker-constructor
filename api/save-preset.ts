// This is a Vercel Serverless Function
// It will be accessible at `/api/save-preset`
// Its purpose is to receive presets saved by users for analytics.

import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Preset } from '../types';

export default function handler(
  req: VercelRequest,
  res: VercelResponse,
) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Only POST requests allowed' });
    }

    try {
        const preset: Preset = req.body;

        // Basic validation
        if (!preset || !preset.name || !preset.settings) {
            return res.status(400).json({ message: 'Invalid preset data provided' });
        }

        // --- Data Logging for Analytics ---
        // This is where you would save the preset to your database (e.g., Vercel KV, Vercel Postgres, MongoDB, etc.)
        // For privacy, ensure you are not saving any personally identifiable information.
        
        console.log(`Analytics: Preset saved by a user. Name: "${preset.name}", Style: "${preset.settings.style}"`);
        
        // TODO: Implement saving to a database.
        // Example with Vercel KV (requires setup):
        // import { kv } from '@vercel/kv';
        // await kv.hset('presets', { [preset.id]: preset });

        res.status(200).json({ message: 'Preset logged successfully for analytics.' });

    } catch (error) {
        console.error("Error in save-preset API:", error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}