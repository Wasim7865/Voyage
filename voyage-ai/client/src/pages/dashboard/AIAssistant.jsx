import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Send, Sparkles, User, Trash2, X, MessageSquare } from 'lucide-react';
import api from '../../services/api';
import toast from 'react-hot-toast';

const quickPrompts = [
  'Help me plan a trip to Bali',
  'What are the best destinations for solo travel?',
  'Give me budget tips for Japan',
  'Create a packing list for a beach vacation',
  'What should I know before visiting Dubai?',
];

const floatingQuestions = [
  'Plan a 5-day trip to Thailand',
  'Best budget restaurants in Tokyo?',
  'Safety tips for solo female travelers',
  'What to pack for a mountain trek?',
];

export default function AIAssistant() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [conversationId, setConversationId] = useState(null);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Greeting message
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([{
        role: 'assistant',
        content: "👋 Hello! I'm your AI travel assistant. Ask me anything about destinations, planning, packing, budgets, or local tips — I'm here to make your travels amazing."
      }]);
    }
  }, []);

  const sendMessage = async (text) => {
    const content = text || input;
    if (!content.trim() || loading) return;

    setMessages(prev => [...prev, { role: 'user', content }]);
    setInput('');
    setLoading(true);

    try {
      const data = await api.aiChat(content, conversationId, 'assistant');
      setConversationId(data.conversation._id);
      setMessages(prev => [...prev, { role: 'assistant', content: data.response }]);
    } catch (error) {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: "I'm sorry, I couldn't process that request. Please try again."
      }]);
    } finally {
      setLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([]);
    setConversationId(null);
  };

  return (
    <>
      {/* Page View */}
      <div className="space-y-6 h-full">
        {/* Header */}
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-navy-900 flex items-center gap-3">
            <span className="w-11 h-11 rounded-2xl bg-gradient-to-br from-voyage-500 to-voyage-600 flex items-center justify-center shadow-lg">
              <Bot className="w-5 h-5 text-white" />
            </span>
            AI Travel Assistant
          </h1>
          <p className="text-navy-400 mt-1">Your personal travel companion, powered by AI</p>
        </div>

        {/* Chat Window */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-3xl shadow-card overflow-hidden h-[calc(100vh-240px)] flex flex-col"
        >
          {/* Chat Header */}
          <div className="px-6 py-4 bg-gradient-to-r from-navy-900 to-navy-800 text-white flex items-center justify-between border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-voyage-500 to-voyage-600 flex items-center justify-center relative">
                <Bot className="w-5 h-5 text-white" />
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 rounded-full border-2 border-navy-800" />
              </div>
              <div>
                <p className="font-semibold">Voyage Assistant</p>
                <p className="text-xs text-white/50">Online · replies instantly</p>
              </div>
            </div>
            <button onClick={clearChat} className="p-2 rounded-xl hover:bg-white/10 transition-colors">
              <Trash2 className="w-4 h-4 text-white/60 hover:text-white" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50">
            {messages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.role === 'assistant' && (
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-voyage-500 to-voyage-600 flex items-center justify-center flex-shrink-0 mt-1">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                )}
                <div className={`max-w-[75%] px-5 py-3.5 rounded-2xl text-sm leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-gradient-to-r from-voyage-600 to-voyage-500 text-white rounded-br-md shadow-md'
                    : 'bg-white text-navy-700 rounded-bl-md shadow-card'
                }`}>
                  {msg.content.split('\n').map((line, j) => (
                    <p key={j} className={line.startsWith('•') ? 'pl-3' : ''}>
                      {line || ' '}
                    </p>
                  ))}
                </div>
                {msg.role === 'user' && (
                  <div className="w-8 h-8 rounded-xl bg-navy-800 flex items-center justify-center flex-shrink-0 mt-1">
                    <User className="w-4 h-4 text-white" />
                  </div>
                )}
              </motion.div>
            ))}
            {loading && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-voyage-500 to-voyage-600 flex items-center justify-center">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="bg-white px-5 py-3.5 rounded-2xl shadow-card flex items-center gap-1.5">
                  <span className="w-2 h-2 bg-voyage-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-2 h-2 bg-voyage-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 bg-voyage-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts (first message only) */}
          {messages.length <= 1 && (
            <div className="px-6 py-3 bg-gray-50 border-t border-navy-100 overflow-x-auto flex gap-2">
              {quickPrompts.map((prompt, i) => (
                <button
                  key={i}
                  onClick={() => sendMessage(prompt)}
                  className="px-4 py-2 bg-white rounded-xl text-xs text-navy-600 font-medium shadow-sm hover:bg-voyage-50 hover:text-voyage-700 transition-colors whitespace-nowrap"
                >
                  {prompt}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="px-6 py-4 bg-white border-t border-navy-100">
            <form
              onSubmit={(e) => { e.preventDefault(); sendMessage(); }}
              className="flex items-center gap-3"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me anything about your travels..."
                className="flex-1 input-field !rounded-2xl"
              />
              <button type="submit" disabled={loading || !input.trim()} className="btn-primary !px-5">
                <Send className="w-5 h-5" />
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </>
  );
}