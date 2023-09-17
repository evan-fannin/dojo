import OpenAI from 'openai';
import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';

const openai = new OpenAI();

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { base64 } = req.body;

    try {
        const { text } = await openai.audio.transcriptions.create({
            model: 'whisper-1',
            file: fs.createReadStream('audio.webm'),
        });

        res.status(200).json({ text });
    } catch (error: any) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}
