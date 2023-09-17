import { useState } from 'react';
import axios from 'axios';

type Message = {
  role: string;
  content: string;
 }

const Chat = () => {
    const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (input.trim() === '') {
      return;
    }

    const message = {
      role: 'user',
      content: input.trim()
    } as Message;

    setMessages(prevMessages => [...prevMessages, message]);
    setInput('');

    try {
      const response = await axios.post('/api/chat', { message });
      const botMessage = {
        role: 'bot',
        content: response.data.message
      };
      setMessages(prevMessages => [...prevMessages, botMessage]);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
  <div className="bg-gray-800 text-white h-screen">
  <div className="px-4 py-6">
    <h1 className="text-2xl font-bold mb-4">Chat with ChatGPT</h1>
    <div className="flex justify-end">
      <button onClick={() => setMessages([])}>Clear Conversation</button>
    </div>
  </div>
  <div className="bg-gray-700 p-4 rounded-lg">
    {messages.map((message, index) => (
      <div key={index} className={`${
        message.role === 'user' ? 'bg-blue-500' : 'bg-purple-500'
      } text-white rounded-lg py-2 px-4 mb-2`}>
      <div key={index} className={'message-content'}>
        <p>{message.content}</p>
      </div>
      </div>
    ))}
  </div>
  <form onSubmit={handleSubmit} className="p-4">
    <div className="flex items-center">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type your message..."
        className="flex-1 border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
      />
      <input type="submit" value='Send' className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 ml-2 rounded-lg" />
    </div>
  </form>
</div>)
}
export default Chat;