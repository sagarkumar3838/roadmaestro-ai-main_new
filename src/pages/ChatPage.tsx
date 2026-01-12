import React, { useState } from 'react';
import { ChatInterface } from '@/components/ChatInterface';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

const ChatPage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const onSendMessage = async (message: string) => {
    const userMsg: Message = {
      id: Math.random().toString(36).slice(2),
      type: 'user',
      content: message,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);

    // Placeholder AI echo reply
    setIsLoading(true);
    setTimeout(() => {
      const aiMsg: Message = {
        id: Math.random().toString(36).slice(2),
        type: 'ai',
        content: `You said: ${message}`,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMsg]);
      setIsLoading(false);
    }, 600);
  };

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        <ChatInterface messages={messages} onSendMessage={onSendMessage} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default ChatPage;


