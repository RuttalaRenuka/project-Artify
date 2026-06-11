import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { MessageSquare, X, Send, Brush, Sparkles, Copy, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ChatMessage } from '../types';

export default function LiveChat() {
  const { supportOpen, setSupportOpen, navigateTo } = useApp();
  const [inputText, setInputText] = useState('');
  const [copied, setCopied] = useState(false);
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
  }, [messages, supportOpen]);

  // Local keywords parser
  const getBotResponse = (userText: string): string => {
    const text = userText.toLowerCase();

    if (text.includes('hello') || text.includes('hi') || text.includes('hey')) {
      return "Hello fellow creator! How can I inspire your creative flow today? You can ask about paints, canvas, brushes, or custom orders.";
    }
    if (text.includes('acrylic') || text.includes('pour') || text.includes('fluid')) {
      return "Ah, Acrylics! We have our signature 'Artify Masterpiece Acrylic Set (24 Colors)' and the therapeutic 'Chameleon Fluid Art Pour Kit' in stock. Type 'acrylic' in the Shop page to explore them!";
    }
    if (text.includes('watercolor') || text.includes('water color') || text.includes('water-color')) {
      return "Watercolor is beautiful for transparent washes. I highly recommend our cold-pressed 'Velvet Horizon Professional Watercolor Palette' or our beginner self-guided 'Botanical Watercolor DIY Starter Kit'.";
    }
    if (text.includes('brush') || text.includes('brushes')) {
      return "Brushes hold the soul of detail! Our 'Fineline Series Synthetic Brush Bundle (8 Pcs)' consists of soft nylon hairs that snappingly snap back to clean fine tips. Check them out on our product list!";
    }
    if (text.includes('coupon') || text.includes('discount') || text.includes('offer') || text.includes('promo')) {
      return "Indeed, we have special codes! You can apply code: CREATIVE10 to save 10% on your first checkout. For larger art commissions, save 20% on orders above ₹100 with code: ARTIFYMASTER.";
    }
    if (text.includes('canvas') || text.includes('easel') || text.includes('stand')) {
      return "We have beautiful French Oak timber studio H-frame easels and archival triple-primed linen canvases. They hold heavy impasto paints flawlessly.";
    }
    if (text.includes('shipping') || text.includes('deliver') || text.includes('free')) {
      return "Artify offers FREE pristine shipping nationwide for all supply orders exceeding ₹50. All materials are securely packaged inside eco-friendly boxes.";
    }
    if (text.includes('resin') || text.includes('craft')) {
      return "Explore our 'Dreamscape Epoxy Resin Craft Bundle' featuring clear glass hardener formulas and organic metallic mica pigments.";
    }

    return "Fascinating choice! For specific supplies, please visit our Shop page where you can search through our advanced catalog. You can also contact our studio managers directly at support@artify.com.";
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMessage: ChatMessage = {
      id: `m-user-${Date.now()}`,
      sender: 'user',
      text: inputText,
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMessage]);
    const originalInput = inputText;
    setInputText('');

    // Simulate typing
    setTimeout(() => {
      const serverMessage: ChatMessage = {
        id: `m-bot-${Date.now()}`,
        sender: 'assistant',
        text: getBotResponse(originalInput),
        time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, serverMessage]);
    }, 800);
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
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animation-ping" />
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
                      <p className="whitespace-pre-wrap">{msg.text}</p>
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
              <div ref={messagesEndRef} />
            </div>

            {/* Input form */}
            <form onSubmit={handleSendMessage} className="p-3 border-t border-slate-100 bg-white flex gap-2">
              <input
                id="live-chat-input"
                type="text"
                placeholder="Ask e.g. 'acrylic', 'watercolor', 'discount'..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="flex-1 text-xs border border-slate-200 rounded-xl px-3 py-2.5 outline-none focus:ring-1 focus:ring-violet-500"
              />
              <button
                id="live-chat-send"
                type="submit"
                className="bg-violet-600 hover:bg-violet-750 text-white p-2.5 rounded-xl flex items-center justify-center shadow-md shadow-violet-100 cursor-pointer"
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
