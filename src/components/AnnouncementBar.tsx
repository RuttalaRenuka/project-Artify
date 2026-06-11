import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Gift, ShieldCheck, Sparkles, X } from 'lucide-react';

export default function AnnouncementBar() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [visible, setVisible] = useState(true);

  const announcements = [
    { text: "🎨 Free Shipping on Orders Above ₹50 | Unleash Creativity Without Limits", icon: Sparkles },
    { text: "⚡ Limited Time Deal: Get 20% OFF using code: ARTIFYMASTER (Min Spend ₹100)", icon: Gift },
    { text: "✨ Safe & Secure Shipping Nationwide | Eco-Friendly Premium Art Packaging", icon: ShieldCheck }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % announcements.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  if (!visible) return null;

  const ActiveIcon = announcements[currentIdx].icon;

  return (
    <div id="announcement-bar" className="bg-gradient-to-r from-violet-700 via-purple-600 to-orange-500 text-white text-xs md:text-sm font-medium py-2 px-4 flex items-center justify-between relative overflow-hidden transition-all duration-300">
      <div className="mx-auto flex items-center space-x-2">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIdx}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="flex items-center space-x-2"
          >
            <ActiveIcon className="w-4 h-4 text-orange-200 animate-pulse" />
            <span>{announcements[currentIdx].text}</span>
          </motion.div>
        </AnimatePresence>
      </div>
      <button 
        id="close-announcement"
        onClick={() => setVisible(false)} 
        className="absolute right-4 text-white/80 hover:text-white transition-colors cursor-pointer"
        aria-label="Close notification"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
