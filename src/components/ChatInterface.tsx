import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mic, Send, Volume2 } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { generateUniqueQuestions, clearUsedQuestions } from '../services/questionService';

// Extend Window interface for Speech Recognition
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

interface ChatInterfaceProps {
  messages: Message[];
  onSendMessage: (message: string) => void;
  isLoading?: boolean;
  currentQuestion?: any;
}

export function ChatInterface({ messages, onSendMessage, isLoading = false, currentQuestion }: ChatInterfaceProps) {
  const [inputValue, setInputValue] = useState('');
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInputValue(transcript);
        setIsListening(false);
      };

      recognitionRef.current.onerror = () => {
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  }, []);

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      onSendMessage(inputValue.trim());
      setInputValue('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      setIsListening(true);
      recognitionRef.current.start();
    }
  };

  return (
    <Card className="flex flex-col h-full max-h-[80vh] bg-card/50 backdrop-blur-sm border-border/50">
      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.length === 0 && (
          <div className="text-center text-muted-foreground py-12">
            <div className="ai-gradient-text text-2xl font-semibold mb-2">
              Welcome to AI Course Mentor! 🤖
            </div>
            <p>I'll ask you personalized questions to understand your skills and recommend the perfect courses for you.</p>
          </div>
        )}
        
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
          >
            <div
              className={`${
                message.type === 'user' 
                  ? 'chat-bubble-user animate-slide-in-right' 
                  : 'chat-bubble-ai animate-slide-in-left'
              }`}
            >
              <p className="text-sm leading-relaxed">{message.content}</p>
              <div className="text-xs opacity-70 mt-2">
                {message.timestamp.toLocaleTimeString()}
              </div>
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex justify-start animate-fade-in">
            <div className="chat-bubble-ai">
              <div className="flex items-center space-x-2">
                <div className="typing-indicator text-lg"></div>
                <span className="text-sm text-muted-foreground">AI is thinking...</span>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* MCQ Options */}
      {currentQuestion && currentQuestion.options && (
        <div className="border-t border-border/50 p-6">
          <div className="text-center mb-4">
            <p className="text-sm text-muted-foreground">Choose one of the options below:</p>
          </div>
          <div className="grid gap-3 max-w-2xl mx-auto">
            {currentQuestion.options.map((option: string, index: number) => (
              <Button
                key={index}
                variant="outline"
                className="justify-start text-left h-auto p-4 hover:bg-primary/10 border-primary/20 transition-all duration-300 hover:scale-[1.02]"
                onClick={() => onSendMessage(option)}
                disabled={isLoading}
              >
                <span className="font-bold mr-3 text-primary">{String.fromCharCode(65 + index)}.</span>
                <span className="flex-1">{option}</span>
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Input Area - Only show when no MCQ options */}
      {(!currentQuestion || !currentQuestion.options) && (
        <div className="border-t border-border/50 p-6">
          <div className="flex items-center space-x-3">
            <div className="flex-1 relative">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your answer or click the mic to speak..."
                className="pr-20 py-3 bg-input/50 border-border/50 focus:ring-primary focus:border-primary"
              />
              <Button
                size="sm"
                variant="ghost"
                onClick={startListening}
                disabled={isListening}
                className={`absolute right-2 top-1/2 transform -translate-y-1/2 ${
                  isListening ? 'animate-pulse-glow text-primary' : 'text-muted-foreground hover:text-primary'
                }`}
              >
                {isListening ? (
                  <Volume2 className="h-4 w-4" />
                ) : (
                  <Mic className="h-4 w-4" />
                )}
              </Button>
            </div>
            <Button 
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isLoading}
              className="px-6 py-3 ai-gradient-text bg-primary hover:bg-primary/90 transition-all duration-300 hover:scale-105"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
          
          {isListening && (
            <div className="flex items-center justify-center mt-3 text-primary animate-pulse">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
              <span className="ml-3 text-sm">Listening...</span>
            </div>
          )}
        </div>
      )}
    </Card>
  );
}