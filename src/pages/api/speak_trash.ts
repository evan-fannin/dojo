import OpenAI from 'openai';

import { NextApiRequest, NextApiResponse } from 'next';
import { Readable } from 'stream';
// import { IncomingForm } from 'formidable';
import fs from 'fs';

// export const config = {
//     api: {
//         bodyParser: false,
//     },
// };

const openai = new OpenAI();

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    // const form = new IncomingForm();
    // form.uploadDir = './';
    // form.keepExtensions = true;
    // form.parse(req, async (err, fields, files) => {
    //     if (err) {
    //         return res.status(500).json({ error: 'Error parsing form data.' });
    //     }

    //     const { audioFile } = files;

    //     const audio = (audioFile as unknown as File[])[0];

    //     const buffer = Buffer.from(audio, 'base64');

    // });

    const { base64 } = req.body;

    const audioBuffer = Buffer.from(base64, 'base64');

    // const writableStream = fs.createWriteStream('audio.webm');

    // const readable = new Readable();
    // readable._read = () => {};
    // readable.push(audioBuffer);
    // readable.push(null);
    // readable.pipe(writableStream);

    const audioReadStream = Readable.from(audioBuffer);
    //@ts-expect-error
    audioReadStream.path = './audio.webm';

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
