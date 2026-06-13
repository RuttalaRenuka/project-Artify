import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { MessageSquare, X, Send, Brush, Sparkles, Copy, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ChatMessage } from '../types';

export default function LiveChat() {
  const { supportOpen, setSupportOpen, navigateTo } = useApp();
  const [inputText, setInputText] = useState('');
  const [copied, setCopied] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: "🎨 Welcome to the Artify Creative Studio! I am your AI assistant. Ask me questions like: 'What acrylic paints do you have?', 'Do you have brush sets?' or 'Any discount codes?'",
      time: 'Just now'
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, supportOpen, isTyping]);

  const parseInlineStyles = (partStr: string) => {
    const regex = /\*\*(.*?)\*\*/g;
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = regex.exec(partStr)) !== null) {
      if (match.index > lastIndex) {
        parts.push(partStr.substring(lastIndex, match.index));
      }
      parts.push(<strong key={match.index} className="font-bold text-slate-950">{match[1]}</strong>);
      lastIndex = regex.lastIndex;
    }

    if (lastIndex < partStr.length) {
      parts.push(partStr.substring(lastIndex));
    }

    return parts.length > 0 ? parts : partStr;
  };

  const renderFormattedText = (text: string) => {
    const lines = text.split('\n');
    return lines.map((line, idx) => {
      if (line.startsWith('### ')) {
        return <h4 key={idx} className="font-bold text-xs text-slate-900 mt-2 mb-1">{parseInlineStyles(line.slice(4))}</h4>;
      }
      if (line.startsWith('## ')) {
        return <h3 key={idx} className="font-bold text-sm text-slate-900 mt-3 mb-1">{parseInlineStyles(line.slice(3))}</h3>;
      }
      if (line.startsWith('# ')) {
        return <h2 key={idx} className="font-extrabold text-sm text-slate-950 mt-4 mb-2">{parseInlineStyles(line.slice(2))}</h2>;
      }
      if (line.startsWith('- ') || line.startsWith('* ')) {
        return (
          <div key={idx} className="flex items-start gap-1.5 ml-2 my-0.5">
            <span className="text-violet-500 font-bold">•</span>
            <span className="flex-1">{parseInlineStyles(line.slice(2))}</span>
          </div>
        );
      }
      return (
        <div key={idx} className="min-h-[4px] leading-relaxed my-0.5">
          {parseInlineStyles(line)}
        </div>
      );
    });
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || isTyping) return;

    const userMessage: ChatMessage = {
      id: `m-user-${Date.now()}`,
      sender: 'user',
      text: inputText,
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMessage]);
    const originalInput = inputText;
    setInputText('');
    setIsTyping(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          messages: messages.concat(userMessage),
          userMessage: originalInput
        })
      });

      const data = await response.json();
      setIsTyping(false);

      if (response.ok && data.text) {
        const botMessage: ChatMessage = {
          id: `m-bot-${Date.now()}`,
          sender: 'assistant',
          text: data.text,
          time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
        };
        setMessages((prev) => [...prev, botMessage]);
      } else {
        const errorMessage: ChatMessage = {
          id: `m-bot-err-${Date.now()}`,
          sender: 'assistant',
          text: data.error || "I'm having trouble connecting to the Artify Studio engine right now. Please check standard connection or secret key configurations.",
          time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
        };
        setMessages((prev) => [...prev, errorMessage]);
      }
    } catch (error) {
      setIsTyping(false);
      const errorMessage: ChatMessage = {
        id: `m-bot-err-${Date.now()}`,
        sender: 'assistant',
        text: "Could not establish server connection to Artify Creative Studio API.",
        time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, errorMessage]);
    }
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText('CREATIVE10');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div id="live-chat-support-wrapper" className="fixed bottom-6 right-6 z-50 font-sans">
      <AnimatePresence>
        {supportOpen ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="bg-white rounded-2xl shadow-2xl border border-slate-100 w-[340px] sm:w-[380px] h-[500px] flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-violet-600 via-purple-600 to-orange-500 p-4 text-white flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                  <Brush className="w-4.5 h-4.5 text-orange-200 animate-pulse" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm leading-tight flex items-center gap-1">
                    Artify Creative Tutor <Sparkles className="w-3.5 h-3.5 text-yellow-200" />
                  </h3>
                  <span className="text-[10px] text-orange-100 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-ping" />
                    Always painting ready!
                  </span>
                </div>
              </div>
              <button
                id="close-chat-widget"
                onClick={() => setSupportOpen(false)}
                className="p-1 rounded-full hover:bg-white/10 transition-colors text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Promo Copy */}
            <div className="bg-orange-50 border-b border-orange-100 px-3 py-2 flex items-center justify-between text-xs text-orange-850">
              <span className="font-medium">🏷️ Welcome Coupon: 10% Off!</span>
              <button
                onClick={handleCopyCode}
                className="bg-white border border-orange-200 hover:border-orange-400 px-2 py-1 rounded inline-flex items-center gap-1 text-[10px] font-bold text-orange-600 font-mono transition-all cursor-pointer"
              >
                {copied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                {copied ? 'Copied' : 'CREATIVE10'}
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50/50">
              {messages.map((msg) => {
                const isUser = msg.sender === 'user';
                return (
                  <div
                    key={msg.id}
                    className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-xs shadow-sm leading-relaxed ${
                        isUser
                          ? 'bg-violet-600 text-white rounded-tr-none'
                          : 'bg-white text-slate-800 border border-slate-100 rounded-tl-none'
                      }`}
                    >
                      <div>{renderFormattedText(msg.text)}</div>
                      <span
                        className={`text-[9px] block mt-1 text-right ${
                          isUser ? 'text-violet-200' : 'text-slate-400'
                        }`}
                      >
                        {msg.time}
                      </span>
                    </div>
                  </div>
                );
              })}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="max-w-[80%] rounded-2xl px-4 py-2.5 text-xs shadow-sm bg-white text-slate-800 border border-slate-100 rounded-tl-none">
                    <div className="flex items-center space-x-1.5 py-1">
                      <span className="w-1.5 h-1.5 bg-violet-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-1.5 h-1.5 bg-violet-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-1.5 h-1.5 bg-violet-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input form */}
            <form onSubmit={handleSendMessage} className="p-3 border-t border-slate-100 bg-white flex gap-2">
              <input
                id="live-chat-input"
                type="text"
                placeholder={isTyping ? "AI is processing your inspiration..." : "Ask e.g. 'acrylic', 'watercolor', 'discount'..."}
                disabled={isTyping}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="flex-1 text-xs border border-slate-200 rounded-xl px-3 py-2.5 outline-none focus:ring-1 focus:ring-violet-500 disabled:opacity-50"
              />
              <button
                id="live-chat-send"
                type="submit"
                disabled={isTyping}
                className="bg-violet-600 hover:bg-violet-750 text-white p-2.5 rounded-xl flex items-center justify-center shadow-md shadow-violet-100 cursor-pointer disabled:opacity-50"
                title="Send message"
              >
                <Send className="w-4.5 h-4.5" />
              </button>
            </form>
          </motion.div>
        ) : (
          <motion.button
            id="open-chat-widget-btn"
            onClick={() => setSupportOpen(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-tr from-violet-600 to-orange-500 text-white p-4 rounded-full shadow-2xl flex items-center justify-center cursor-pointer group relative hover:shadow-violet-300"
            title="Chat with an Artist Support AI"
          >
            <MessageSquare className="w-6 h-6 group-hover:rotate-12 transition-transform" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
