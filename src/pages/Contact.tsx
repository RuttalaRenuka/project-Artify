import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Mail, Phone, Clock, MapPin, Send, MessageSquare, Sparkles, CheckCircle, HelpCircle, ChevronRight } from 'lucide-react';

export default function Contact() {
  const { setSupportOpen, addNotification } = useApp();

  const [contactForm, setContactForm] = useState({
    name: 'Jane Doe',
    email: 'renukaruttala4611@gmail.com',
    phone: '',
    subject: 'Bulk discount request for my class',
    message: 'Hello Artify team! I am advising 20 watercolor students next trimester. I would love to order custom palettes and synthetic fine brushes bundles.'
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    setTimeout(() => {
      setSubmitted(true);
      setLoading(false);
      addNotification(`Message submitted: "${contactForm.subject}" under email: ${contactForm.email}.`);
    }, 1200);
  };

  return (
    <div id="contact-page-container" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 font-sans text-left space-y-16">
      
      {/* Page Header */}
      <div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
          Inquire or Get Creative Advisory
        </h1>
        <p className="text-slate-500 text-sm mt-1">
          Have an institution bulk code inquiry, shipping tracking block, or custom pigment set request? Write our Vizag hub.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Side: Contact details & Mock Map */}
        <div className="lg:col-span-5 space-y-8">
          <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm space-y-5">
            <h3 className="font-bold text-slate-900 text-base">Studio Locations & Coordinates</h3>
            
            <div className="space-y-4 text-xs sm:text-sm text-slate-600">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-violet-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-800">Vizag Creative Center Hub:</strong>
                  <p className="text-slate-400 mt-0.5 leading-relaxed">
                    108 Creative Studio Parkway, Block C, Vizag, Andhra Pradesh, 530001
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-violet-600 shrink-0" />
                <div>
                  <strong className="text-slate-800">Direct Telephone line:</strong>
                  <p className="text-slate-400 mt-0.5">+91 98765 43210</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-violet-600 shrink-0" />
                <div>
                  <strong className="text-slate-800">Email inbox:</strong>
                  <p className="text-slate-400 mt-0.5">support@artify.com</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-violet-600 shrink-0" />
                <div>
                  <strong className="text-slate-800">Operating hours:</strong>
                  <p className="text-slate-400 mt-0.5">Monday to Friday, 09:00 AM - 06:00 PM IST</p>
                </div>
              </div>
            </div>

            {/* Quick Live Chat Tricker */}
            <div className="pt-6 border-t border-slate-100 space-y-2.5 text-center">
              <span className="text-[11px] text-slate-400 font-mono block">Instant replies needed?</span>
              <button
                id="launch-chat-card-btn"
                onClick={() => setSupportOpen(true)}
                className="w-full bg-violet-600 hover:bg-violet-750 text-white font-bold text-xs py-3 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-sm shadow-violet-100"
              >
                <MessageSquare className="w-4 h-4 text-orange-200" /> Launch AI Live Chat tutor
              </button>
            </div>
          </div>

          {/* Interactive Map replica styled beautiful */}
          <div className="bg-[#EEF1F6] border border-slate-200 rounded-2xl h-64 overflow-hidden relative shadow-sm flex items-center justify-center">
            {/* abstract map background */}
            <div className="absolute inset-0 bg-cover opacity-85" style={{ backgroundImage: "radial-gradient(circle, #f8fafc 15%, transparent 20%), linear-gradient(0deg, transparent 24%, #e2e8f0 25%, #e2e8f0 26%, transparent 27%, transparent 74%, #e2e8f0 75%, #e2e8f0 76%, transparent 77%), linear-gradient(90deg, transparent 24%, #e2e8f0 25%, #e2e8f0 26%, transparent 27%, transparent 74%, #e2e8f0 75%, #e2e8f0 76%, transparent 77%)", backgroundSize: "40px 40px" }} />
            
            {/* Custom map marker visual */}
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-violet-600/10 flex items-center justify-center border border-violet-600 text-violet-600 animate-ping absolute" />
              <div className="w-10 h-10 rounded-full bg-violet-600 flex items-center justify-center text-white font-bold relative shadow-md">
                <MapPin className="w-5 h-5 text-orange-300" />
              </div>
              <div className="bg-slate-950 text-white text-[10px] sm:text-xs font-bold font-mono px-3 py-1.5 rounded-lg shadow-md mt-2">
                Artify Vizag HQ Hub
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Form submit message */}
        <div className="lg:col-span-7 bg-white border border-slate-100 rounded-2xl p-6 sm:p-8 shadow-sm">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs font-medium">
              <h3 className="font-bold text-slate-900 text-base mb-2">Write us a creative dispatch</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="con-name" className="text-slate-500">FullName Address ID</label>
                  <input
                    id="con-name"
                    type="text"
                    value={contactForm.name}
                    onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 outline-none px-3.5 py-3 rounded-xl focus:ring-1 focus:ring-violet-500 text-slate-800"
                    required
                    disabled={loading}
                  />
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="con-email" className="text-slate-500">Register Email</label>
                  <input
                    id="con-email"
                    type="email"
                    value={contactForm.email}
                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 outline-none px-3.5 py-3 rounded-xl focus:ring-1 focus:ring-violet-500 text-slate-800"
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="con-subject" className="text-slate-500">Subject Enquiry Heading</label>
                <input
                  id="con-subject"
                  type="text"
                  value={contactForm.subject}
                  onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 outline-none px-3.5 py-3 rounded-xl focus:ring-1 focus:ring-violet-500 text-slate-800"
                  required
                  disabled={loading}
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="con-message" className="text-slate-500">Dispatch message context</label>
                <textarea
                  id="con-message"
                  rows={5}
                  value={contactForm.message}
                  onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 outline-none px-3.5 py-3 rounded-xl focus:ring-1 focus:ring-violet-500 text-slate-800 text-xs sm:text-sm leading-relaxed"
                  required
                  disabled={loading}
                />
              </div>

              <button
                id="contact-dispatch-submit"
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto bg-slate-950 hover:bg-violet-600 text-white font-extrabold text-xs px-6 py-3.5 rounded-xl transition-all cursor-pointer inline-flex items-center justify-center gap-1.5"
              >
                {loading ? 'Transmitting...' : 'Transmit Creative Inquiry'}
                <Send className="w-4 h-4" />
              </button>
            </form>
          ) : (
            <div className="text-center py-10 space-y-4">
              <div className="w-12 h-12 bg-emerald-50 text-emerald-500 rounded-full border border-emerald-100 flex items-center justify-center mx-auto mb-2 text-xl animate-bounce">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-slate-900 text-lg sm:text-xl font-sans">Enquiry Dispatched Successfully!</h3>
              <p className="text-slate-400 text-xs leading-relaxed max-w-sm mx-auto">
                Thank you, <strong>{contactForm.name}</strong>. An advisor at Vizag Artify Hub is reviewing your details under code <strong>#ART-{Math.floor(100 + Math.random()*900)}</strong>. Expect a custom answer within 24 operational hours.
              </p>
              
              <button
                onClick={() => setSubmitted(false)}
                className="mt-4 text-xs font-bold text-violet-600 hover:text-orange-500 inline-flex items-center gap-1 cursor-pointer transition-colors"
              >
                Submit another message <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
