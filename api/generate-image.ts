import type { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenAI } from '@google/genai';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse,
) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Only POST requests allowed' });
    }

    try {
        const { prompt, negative_prompt } = req.body;

        if (!prompt) {
            return res.status(400).json({ message: 'Prompt is required' });
        }
        
        const fullPrompt = `${prompt}\n\n--- DO NOT INCLUDE ---\nNegative Prompt: ${negative_prompt || 'none'}`;

        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash-image',
            contents: {
                parts: [{ text: fullPrompt }],
            },
            config: {
                imageConfig: {
                    aspectRatio: "1:1",
                },
            }
        });

        let imageBase64: string | null = null;

        if (response.candidates && response.candidates.length > 0) {
            for (const part of response.candidates[0].content.parts) {
                if (part.inlineData) {
                    imageBase64 = part.inlineData.data;
                    break; 
                }
            }
        }

        if (imageBase64) {
            res.status(200).json({ imageBase64 });
        } else {
            const fallbackMessage = response.text || 'No image data was generated. The prompt may have been blocked.';
            console.error('Image generation failed, response:', JSON.stringify(response, null, 2));
            res.status(500).json({ message: `Image generation failed. ${fallbackMessage}` });
        }

    } catch (error) {
        console.error("Error in generate-image API:", error);
        res.status(500).json({ message: 'Internal Server Error', error: error instanceof Error ? error.message : 'Unknown error' });
    }
}
