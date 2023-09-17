import axios from 'axios';
import {ChatOpenAI} from "langchain/chat_models/openai"
import { HumanChatMessage, SystemChatMessage } from "langchain/schema";
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const chat = new ChatOpenAI({ temperature: 0 });
  
  const { message: {content: newMessage} } = req.body;

  try {
    // const response = await chat.call([
    //   new SystemChatMessage(
    //     "You are a Chinese language tutor helping me to read a book in simplified Chinese. The text provided is a snippet from my book that I don't understand. Please explain the grammar, meaning, usage, and harder parts of the text IN ENGLISH."
    //   ),
    //   new HumanChatMessage(newMessage),
    // ]);

    const response = {text: 'Yep.'}

    const botMessage = response.text;

    res.status(200).json({ message: botMessage });
  } catch (error: any) {
    console.error('Error:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
