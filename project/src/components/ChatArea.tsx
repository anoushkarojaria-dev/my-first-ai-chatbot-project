import { useState, useRef, useEffect } from 'react';
import { Send, Mic, Bot, User } from 'lucide-react';
import axios from 'axios';

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

const ChatArea = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello! I'm Channa AI, your intelligent conversation companion. How can I help you today?",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Call Nvidia OpenAI API for streaming response
    try {
      // Use FastAPI backend endpoint
      const response = await axios.post(
        'http://localhost:8000/chat',
        { message: inputValue },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      // The backend returns a plain text response
  const aiContent = typeof response.data === 'string' ? response.data : JSON.stringify(response.data) || "Sorry, I couldn't generate a response.";
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: aiContent,
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
    } catch (err) {
      setMessages(prev => [...prev, {
        id: (Date.now() + 2).toString(),
        content: "Sorry, there was an error connecting to the AI service.",
        isUser: false,
        timestamp: new Date()
      }]);
    }
    setIsTyping(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleMicClick = () => {
    // Placeholder for future speech-to-text functionality
    alert('Speech-to-text functionality will be implemented in a future update!');
  };

  return (
    <div className="flex-1 flex flex-col">
      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex max-w-[80%] ${message.isUser ? 'flex-row-reverse' : 'flex-row'} items-start space-x-3`}>
              <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                message.isUser 
                  ? 'bg-gradient-to-r from-purple-500 to-purple-600' 
                  : 'bg-gradient-to-r from-purple-400 to-purple-500'
              }`}>
                {message.isUser ? (
                  <User className="w-4 h-4 text-white" />
                ) : (
                  <Bot className="w-4 h-4 text-white" />
                )}
              </div>
              <div className={`px-4 py-3 rounded-2xl ${
                message.isUser
                  ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white ml-3'
                  : 'bg-white border border-purple-100 text-purple-800 mr-3 shadow-sm'
              }`}>
                <p className="text-sm leading-relaxed">{message.content}</p>
                <p className={`text-xs mt-2 opacity-70 ${
                  message.isUser ? 'text-purple-100' : 'text-purple-500'
                }`}>
                  {message.timestamp.toLocaleTimeString([], { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </p>
              </div>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-purple-400 to-purple-500 flex items-center justify-center">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div className="bg-white border border-purple-100 px-4 py-3 rounded-2xl shadow-sm">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce delay-100"></div>
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce delay-200"></div>
                </div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t border-purple-100 bg-white/80 backdrop-blur-sm p-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-end space-x-3">
            <div className="flex-1 relative">
              <textarea
                ref={inputRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message here..."
                className="w-full px-4 py-3 pr-20 rounded-2xl border border-purple-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 outline-none transition-all duration-200 resize-none bg-white/70 text-purple-800 placeholder-purple-400 min-h-[52px] max-h-32 auto-expand"
                rows={1}
                onInput={(e) => {
                  const target = e.target as HTMLTextAreaElement;
                  target.style.height = 'auto';
                  target.style.height = target.scrollHeight + 'px';
                }}
              />
              <button
                onClick={handleMicClick}
                className="absolute right-14 top-1/2 transform -translate-y-1/2 p-2 text-purple-500 hover:text-purple-600 hover:bg-purple-50 rounded-full transition-all duration-200"
                title="Voice input (coming soon)"
              >
                <Mic className="w-4 h-4" />
              </button>
            </div>
            <button
              onClick={handleSend}
              disabled={!inputValue.trim()}
              className="p-3 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white rounded-full transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg"
              title="Send message"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
          <p className="text-xs text-purple-500/60 mt-2 text-center">
            Press Enter to send, Shift+Enter for new line
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatArea;