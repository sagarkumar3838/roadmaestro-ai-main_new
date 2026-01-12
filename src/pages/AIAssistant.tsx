import { useState, useRef, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Send, 
  Bot, 
  User, 
  Loader2, 
  Copy, 
  ThumbsUp, 
  ThumbsDown,
  RefreshCw,
  Settings,
  MessageSquare,
  Lightbulb,
  BookOpen,
  Target,
  FileText
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  isTyping?: boolean;
}

const quickActions = [
  {
    title: 'Resume Help',
    description: 'Get help with resume writing and formatting',
    icon: FileText,
    prompt: 'Help me improve my resume. I need advice on formatting, content, and making it ATS-friendly.'
  },
  {
    title: 'Career Advice',
    description: 'Get guidance on career development',
    icon: Target,
    prompt: 'I need career advice. Help me understand what skills I should develop and what career path would be best for me.'
  },
  {
    title: 'Interview Prep',
    description: 'Practice interview questions and answers',
    icon: MessageSquare,
    prompt: 'Help me prepare for job interviews. I want to practice common interview questions and get feedback on my answers.'
  },
  {
    title: 'Learning Path',
    description: 'Create a personalized learning plan',
    icon: BookOpen,
    prompt: 'Create a personalized learning path for me. I want to learn new skills and advance my career.'
  }
];

export default function AIAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'assistant',
      content: 'Hello! I\'m your AI career assistant. I can help you with resume writing, career advice, interview preparation, and learning recommendations. How can I assist you today?',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (message: string) => {
    if (!message.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: message,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    // Simulate AI response (replace with actual ChatGPT API call)
    setTimeout(() => {
      const aiResponse = generateAIResponse(message);
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: aiResponse,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const generateAIResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('resume') || message.includes('cv')) {
      return `I'd be happy to help you with your resume! Here are some key tips:

**Resume Structure:**
• Use a clean, ATS-friendly format
• Include a professional summary
• List experience in reverse chronological order
• Add quantifiable achievements
• Include relevant skills and keywords

**Key Sections:**
• Contact information
• Professional summary (2-3 lines)
• Work experience with bullet points
• Education
• Skills (technical and soft skills)
• Optional: Certifications, projects, languages

**Tips for ATS Optimization:**
• Use standard section headings
• Include keywords from job descriptions
• Avoid graphics, tables, or complex formatting
• Use simple fonts like Arial or Calibri
• Save as PDF for consistency

Would you like me to help you with any specific section of your resume?`;
    }
    
    if (message.includes('interview') || message.includes('interviewing')) {
      return `Great! Let's prepare you for your interview. Here's a comprehensive approach:

**Common Interview Questions:**
• "Tell me about yourself" - Prepare a 2-minute elevator pitch
• "Why do you want this job?" - Connect your skills to their needs
• "What are your strengths/weaknesses?" - Be honest but strategic
• "Where do you see yourself in 5 years?" - Show growth mindset
• "Do you have any questions for us?" - Always have 2-3 prepared

**STAR Method for Behavioral Questions:**
• Situation: Set the context
• Task: Explain your responsibility
• Action: Describe what you did
• Result: Share the outcome

**Preparation Tips:**
• Research the company and role thoroughly
• Practice with mock interviews
• Prepare specific examples of your achievements
• Dress professionally
• Arrive 10-15 minutes early

Would you like to practice answering any specific questions?`;
    }
    
    if (message.includes('career') || message.includes('career path')) {
      return `I'd love to help you with career guidance! To give you the best advice, I need to understand your situation better.

**Questions to consider:**
• What's your current role and industry?
• What are your core skills and interests?
• What are your short-term and long-term goals?
• What type of work environment do you prefer?
• Are you looking to advance, change industries, or start something new?

**Career Development Areas:**
• **Technical Skills:** Stay updated with industry trends
• **Soft Skills:** Communication, leadership, problem-solving
• **Networking:** Build professional relationships
• **Continuous Learning:** Take courses, get certifications
• **Mentorship:** Find mentors and be a mentor

**Popular Career Paths:**
• Individual Contributor → Senior → Lead → Principal
• Individual Contributor → Manager → Director → VP
• Technical → Product Management
• Technical → Consulting
• Corporate → Startup/Entrepreneurship

What specific aspect of career development would you like to explore?`;
    }
    
    if (message.includes('learning') || message.includes('skills') || message.includes('course')) {
      return `Excellent! Continuous learning is key to career success. Here's how I can help you create a learning plan:

**Learning Assessment:**
• Identify your current skill level
• Determine your learning goals
• Choose the right learning format
• Set realistic timelines

**Learning Formats:**
• **Online Courses:** Coursera, Udemy, edX, LinkedIn Learning
• **Bootcamps:** Intensive, hands-on programs
• **Certifications:** Industry-recognized credentials
• **Books & Articles:** Self-paced learning
• **Practice Projects:** Hands-on experience
• **Mentorship:** Learn from experts

**Popular Skills to Learn:**
• **Technical:** Programming, Data Analysis, Cloud Computing
• **Soft Skills:** Leadership, Communication, Project Management
• **Industry-Specific:** Digital Marketing, UX/UI Design, Cybersecurity

**Learning Tips:**
• Set SMART goals (Specific, Measurable, Achievable, Relevant, Time-bound)
• Create a study schedule
• Practice regularly
• Join communities and forums
• Build projects to apply your knowledge

What skills are you interested in learning? What's your current experience level?`;
    }
    
    // Default response
    return `I understand you're looking for help with "${userMessage}". I'm here to assist you with:

• **Resume Writing & Optimization** - Format, content, ATS compatibility
• **Career Guidance** - Path planning, skill development, goal setting
• **Interview Preparation** - Questions, answers, techniques
• **Learning Recommendations** - Courses, skills, resources
• **Job Search Strategy** - Applications, networking, follow-ups

Could you provide more specific details about what you'd like help with? The more context you give me, the better I can assist you!`;
  };

  const handleQuickAction = (prompt: string) => {
    setInputMessage(prompt);
  };

  const copyMessage = (content: string) => {
    navigator.clipboard.writeText(content);
    toast({
      title: "Copied!",
      description: "Message copied to clipboard",
    });
  };

  const clearChat = () => {
    setMessages([
      {
        id: '1',
        type: 'assistant',
        content: 'Hello! I\'m your AI career assistant. I can help you with resume writing, career advice, interview preparation, and learning recommendations. How can I assist you today?',
        timestamp: new Date()
      }
    ]);
  };

  const formatMessage = (content: string) => {
    // Simple markdown-like formatting
    return content
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/• (.*?)(?=\n|$)/g, '<li>$1</li>')
      .replace(/\n\n/g, '</p><p>')
      .replace(/^(.*)$/gm, '<p>$1</p>')
      .replace(/<p><li>/g, '<ul><li>')
      .replace(/<\/li><\/p>/g, '</li></ul>');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">AI Career Assistant</h1>
          <p className="text-gray-600 mt-2">Get personalized help with your career development and job search</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={clearChat}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Clear Chat
          </Button>
          <Button variant="outline">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Quick Actions Sidebar */}
        <div className="lg:col-span-1">
          <Card className="p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Lightbulb className="h-5 w-5 mr-2" />
              Quick Actions
            </h3>
            <div className="space-y-3">
              {quickActions.map((action, index) => {
                const Icon = action.icon;
                return (
                  <Button
                    key={index}
                    variant="outline"
                    className="w-full justify-start h-auto p-3 text-left"
                    onClick={() => handleQuickAction(action.prompt)}
                  >
                    <Icon className="h-4 w-4 mr-3 text-blue-600" />
                    <div>
                      <div className="font-medium text-sm">{action.title}</div>
                      <div className="text-xs text-gray-500">{action.description}</div>
                    </div>
                  </Button>
                );
              })}
            </div>
          </Card>
        </div>

        {/* Chat Interface */}
        <div className="lg:col-span-3">
          <Card className="h-[600px] flex flex-col">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex max-w-[80%] ${message.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    <Avatar className="h-8 w-8 flex-shrink-0">
                      <AvatarImage src="" />
                      <AvatarFallback>
                        {message.type === 'user' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                      </AvatarFallback>
                    </Avatar>
                    <div className={`ml-3 mr-3 ${message.type === 'user' ? 'mr-0 ml-3' : 'ml-3 mr-0'}`}>
                      <div
                        className={`px-4 py-2 rounded-lg ${
                          message.type === 'user'
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-900'
                        }`}
                      >
                        {message.isTyping ? (
                          <div className="flex items-center space-x-1">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                          </div>
                        ) : (
                          <div
                            dangerouslySetInnerHTML={{
                              __html: formatMessage(message.content)
                            }}
                          />
                        )}
                      </div>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-xs text-gray-500">
                          {message.timestamp.toLocaleTimeString()}
                        </span>
                        {message.type === 'assistant' && !message.isTyping && (
                          <div className="flex items-center space-x-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => copyMessage(message.content)}
                              className="h-6 w-6 p-0"
                            >
                              <Copy className="h-3 w-3" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 w-6 p-0"
                            >
                              <ThumbsUp className="h-3 w-3" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 w-6 p-0"
                            >
                              <ThumbsDown className="h-3 w-3" />
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>
                        <Bot className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="ml-3">
                      <div className="px-4 py-2 rounded-lg bg-gray-100">
                        <div className="flex items-center space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="border-t p-4">
              <div className="flex space-x-2">
                <Textarea
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Type your message here..."
                  className="min-h-[60px] resize-none"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      sendMessage(inputMessage);
                    }
                  }}
                />
                <Button
                  onClick={() => sendMessage(inputMessage)}
                  disabled={!inputMessage.trim() || isLoading}
                  className="px-4"
                >
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                </Button>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Press Enter to send, Shift+Enter for new line
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
