import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Send, X, Sparkles } from 'lucide-react';
import api from '../../services/api';

const suggestions = [
  'Best time to visit Bali?',
  'Budget for 7 days in Europe',
  'Packing tips for a cruise',
];

export default function FloatingAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "Hi! I'm Voyage AI. Ask me anything about your travel plans! ✈️" }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [conversationId, setConversationId] = useState(null);
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const send = async (text) => {
    const content = text || input;
    if (!content.trim() || loading) return;
    setMessages(prev => [...prev, { role: 'user', content }]);
    setInput('');
    setLoading(true);
    try {
      const data = await api.aiChat(content, conversationId);
      setConversationId(data.conversation._id);
      setMessages(prev => [...prev, { role: 'assistant', content: data.response }]);
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, I hit an error. Please try again.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-2xl bg-gradient-to-br from-voyage-600 to-voyage-500 text-white shadow-2xl flex items-center justify-center hover:scale-105 active:scale-95 transition-all"
        aria-label="Toggle AI assistant"
      >
        {open ? <X className="w-6 h-6" /> : <Bot className="w-6 h-6" />}
        {!open && (
          <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-emerald-400 rounded-full border-2 border-white dark:border-navy-900 animate-pulse" />
        )}
      </button>

      {/* Chat Window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-24 right-6 z-50 w-[380px] max-w-[calc(100vw-3rem)] h-[520px] max-h-[70vh] bg-white dark:bg-navy-900 rounded-3xl shadow-2xl overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="p-4 bg-gradient-to-r from-navy-900 to-navy-800 text-white flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-voyage-500 to-voyage-600 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-sm">Voyage Assistant</p>
                <p className="text-[10px] text-white/50">AI powered · answers instantly</p>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-gray-50 dark:bg-navy-950">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-[13px] leading-relaxed ${
                    m.role === 'user'
                      ? 'bg-gradient-to-r from-voyage-600 to-voyage-500 text-white rounded-br-md'
                      : 'bg-white dark:bg-navy-800 text-navy-700 dark:text-navy-200 rounded-bl-md shadow-card'
                  }`}>
                    {m.content}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex gap-1.5 bg-white dark:bg-navy-800 w-fit px-4 py-3 rounded-2xl shadow-card">
                  <span className="w-2 h-2 bg-voyage-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-2 h-2 bg-voyage-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 bg-voyage-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              )}
              <div ref={endRef} />
            </div>

            {/* Suggestions */}
            {messages.length <= 1 && (
              <div className="px-4 pb-2 bg-gray-50 dark:bg-navy-950 flex flex-wrap gap-1.5">
                {suggestions.map(s => (
                  <button key={s} onClick={() => send(s)} className="text-[11px] px-3 py-1.5 bg-white dark:bg-navy-800 rounded-full text-navy-500 dark:text-navy-300 hover:text-voyage-600 dark:hover:text-voyage-400 shadow-sm transition-colors">
                    {s}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="p-3 bg-white dark:bg-navy-900 border-t border-navy-100 dark:border-navy-800">
              <form onSubmit={(e) => { e.preventDefault(); send(); }} className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about any destination..."
                  className="flex-1 text-[13px] px-4 py-2.5 rounded-xl border border-navy-100 dark:border-navy-700 bg-white dark:bg-navy-800 text-navy-900 dark:text-white outline-none focus:border-voyage-400 focus:ring-2 focus:ring-voyage-200 dark:focus:ring-voyage-500/20 transition-all"
                />
                <button type="submit" disabled={loading || !input.trim()} className="p-2.5 bg-gradient-to-r from-voyage-600 to-voyage-500 text-white rounded-xl hover:opacity-90 disabled:opacity-40 transition-all">
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
