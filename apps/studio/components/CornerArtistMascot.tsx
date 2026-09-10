'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  Sparkles,
  MessageCircle,
  X,
  Send,
  Bot,
  Camera,
  Calendar,
  ExternalLink,
  ChevronDown,
} from 'lucide-react';
import { STUDIO_PROFILE, ROUTES } from '@photomagic/config';

interface ChatMessage {
  id: string;
  sender: 'zeta' | 'user';
  text: string;
  time: string;
  suggestions?: string[];
}

const ZETA_INITIAL_MESSAGE: ChatMessage = {
  id: 'msg-init',
  sender: 'zeta',
  text: "Hello! I'm Zeta, your PhotoMagic AI concierge. ✨ How can I help you plan your dream celebration photography today?",
  time: 'Just now',
  suggestions: [
    '💎 Explore Collections & Pricing',
    '📅 Check Date Availability',
    '📸 Candid vs Traditional Cinema?',
    '💬 Chat with our Creative Team',
  ],
};

function getZetaAIResponse(query: string): { text: string; suggestions?: string[] } {
  const q = query.toLowerCase();

  if (
    q.includes('price') ||
    q.includes('package') ||
    q.includes('collection') ||
    q.includes('cost') ||
    q.includes('tier')
  ) {
    return {
      text: 'PhotoMagic Studios offers 5 curated investment collections:\n\n• **The Moonstone Anthology** (₹42,000) — Single-session intimate rituals\n• **The Jade Heirloom** (₹71,500) — 2-event candid + traditional coverage\n• **The Obsidian Grandeur** (₹95,000) — Multi-team 4K cinematic experience\n• **The Florentine Royal** (₹1,25,000) — Expansive 3-day royal heritage cinema\n• **The Solitaire Imperial** (₹1,85,000) — Bespoke masterpiece directed personally by Rozar Khan\n\nYou can also build a custom package with 5%–20% dynamic savings on our Packages page!',
      suggestions: [
        '📅 Check Date Availability',
        '🛠️ Build Custom Package',
        '💬 Chat with our Creative Team',
      ],
    };
  }

  if (q.includes('date') || q.includes('availab') || q.includes('book') || q.includes('reserve')) {
    return {
      text: "We book dates with a 25% token date-lock to ensure absolute exclusivity for your celebration. Head over to our 'Check Your Date' page to lock your Muhurtham date instantly with UPI QR or Card!",
      suggestions: ['💎 Explore Collections', '💬 Chat with our Creative Team'],
    };
  }

  if (
    q.includes('candid') ||
    q.includes('traditional') ||
    q.includes('style') ||
    q.includes('video') ||
    q.includes('cinema')
  ) {
    return {
      text: "We specialize in cinematic storytelling ('Moments Through Our Eyes')! Candid photography captures unscripted emotional micro-moments without artificial posing. For families who cherish rituals, we blend candid cinema with respectful traditional coverage so no elder or blessing is missed.",
      suggestions: ['💎 View Pricing', '📸 View Portfolio', '💬 Chat with our Creative Team'],
    };
  }

  if (q.includes('location') || q.includes('city') || q.includes('travel') || q.includes('where')) {
    return {
      text: 'PhotoMagic Studios is based in Tamil Nadu and covers weddings across Chennai, Madurai, Coimbatore, Pondicherry, Kerala (Kochi/Alleppey backwaters), and all major destinations across India.',
      suggestions: ['📅 Check Your Date', '💎 Explore Packages'],
    };
  }

  if (
    q.includes('creative team') ||
    q.includes('team') ||
    q.includes('rozar') ||
    q.includes('whatsapp') ||
    q.includes('contact') ||
    q.includes('call') ||
    q.includes('phone')
  ) {
    return {
      text: `You can connect directly with our Creative Team on WhatsApp at +91 ${STUDIO_PROFILE.contact.phone}. We will be delighted to guide you through your celebration plans!`,
      suggestions: ['💬 Chat with our Creative Team', '💎 Back to Packages'],
    };
  }

  return {
    text: "I'd love to assist you with that! As PhotoMagic's AI concierge, I can give you instant guidance on our 5 curated collections, check date reservation steps, or connect you directly with our Creative Team.",
    suggestions: [
      '💎 Explore Collections & Pricing',
      '📅 Check Date Availability',
      '💬 Chat with our Creative Team',
    ],
  };
}

export const CornerArtistMascot: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isIconOpen, setIsIconOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([ZETA_INITIAL_MESSAGE]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isChatOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isChatOpen]);

  const handleSendMessage = (textToSend?: string) => {
    const text = (textToSend || inputValue).trim();
    if (!text) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputValue('');
    setIsTyping(true);

    // Simulate AI inference response (or forward to future LLM route)
    setTimeout(() => {
      const response = getZetaAIResponse(text);
      const botMsg: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: 'zeta',
        text: response.text,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestions: response.suggestions,
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 600);
  };

  const whatsappUrl = `https://wa.me/${STUDIO_PROFILE.contact.whatsapp.replace(/[^0-9]/g, '')}?text=Hello%20PhotoMagic%20Creative%20Team!%20Zeta%20the%20AI%20concierge%20referred%20me%20from%20the%20website%20to%20discuss%20our%20celebration.`;

  return (
    <aside
      aria-label="Zeta AI Concierge"
      className="fixed bottom-4 left-4 sm:left-8 z-50 pointer-events-auto flex flex-col items-start select-none font-body"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setIsDismissed(false);
      }}
    >
      {/* 1. FULL INTERACTIVE AI CHATBOT WINDOW (WHEN OPENED) */}
      {isChatOpen && (
        <div
          role="dialog"
          aria-label="Zeta AI Chatbot"
          className="mb-3 w-[330px] sm:w-[370px] h-[480px] max-h-[82vh] bg-white/95 dark:bg-[#140A22]/95 backdrop-blur-2xl border border-purple-200/90 dark:border-purple-800/60 rounded-3xl shadow-[0_16px_50px_rgba(124,58,237,0.25)] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        >
          {/* Header */}
          <div className="p-3.5 bg-gradient-to-r from-purple-800 via-purple-700 to-rose-600 text-white flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-2.5">
              <div className="relative w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 shadow-inner">
                <Bot size={18} className="text-white" />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-purple-900 animate-pulse" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-heading font-extrabold text-sm tracking-wide">Zeta</span>
                  <span className="text-[9px] font-mono bg-white/20 px-1.5 py-0.2 rounded-full uppercase font-bold tracking-wider">
                    AI Concierge
                  </span>
                </div>
                <span className="text-[10px] text-purple-200 font-medium">
                  PhotoMagic Intelligent Assistant
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="p-1.5 rounded-xl hover:bg-white/20 text-white/90 hover:text-white transition-colors"
                title="Chat with our Creative Team on WhatsApp"
              >
                <ExternalLink size={14} />
              </a>
              <button
                onClick={() => setIsChatOpen(false)}
                className="p-1.5 rounded-xl hover:bg-white/20 text-white/90 hover:text-white transition-colors"
                aria-label="Close Zeta Chat"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Chat Messages Feed */}
          <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3.5 text-xs">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl p-3 leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-gradient-to-r from-purple-700 to-rose-600 text-white shadow-sm rounded-br-none'
                      : 'bg-purple-50/80 dark:bg-purple-950/50 text-slate-900 dark:text-purple-100 border border-purple-200/60 dark:border-purple-800/40 rounded-bl-none'
                  }`}
                >
                  <p className="whitespace-pre-line text-[11px] leading-relaxed font-normal">
                    {msg.text}
                  </p>
                </div>
                <span className="text-[9px] font-mono text-slate-600 dark:text-slate-300 mt-1 px-1">
                  {msg.time}
                </span>

                {/* Suggestions Chips from Zeta */}
                {msg.suggestions && msg.suggestions.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {msg.suggestions.map((s, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          if (s.includes('WhatsApp') || s.includes('Creative Team')) {
                            window.open(whatsappUrl, '_blank');
                          } else {
                            handleSendMessage(s);
                          }
                        }}
                        className="text-[10px] font-medium bg-white dark:bg-purple-900/40 text-purple-900 dark:text-purple-200 border border-purple-200/80 dark:border-purple-700/50 px-2.5 py-1 rounded-full hover:bg-purple-100 dark:hover:bg-purple-800/60 transition-all shadow-xs"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-1.5 p-2 bg-purple-50 dark:bg-purple-950/40 rounded-xl w-fit text-[10px] text-purple-700 dark:text-purple-300 font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-600 animate-ping" />
                <span>Zeta is thinking...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Message Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-2.5 bg-purple-50/50 dark:bg-purple-950/30 border-t border-purple-100 dark:border-purple-900/50 flex items-center gap-2"
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask Zeta about packages, dates, styles..."
              className="flex-1 bg-white dark:bg-[#1C0F2F] text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-purple-400/50 text-xs px-3.5 py-2 rounded-xl border border-purple-200 dark:border-purple-800/60 focus:outline-none focus:ring-2 focus:ring-purple-600/30 focus:border-purple-600 transition-all"
            />
            <button
              type="submit"
              disabled={!inputValue.trim()}
              className="p-2.5 rounded-xl bg-gradient-to-r from-purple-700 to-rose-600 text-white disabled:opacity-40 hover:opacity-95 active:scale-95 transition-all shadow-sm"
              aria-label="Send message"
            >
              <Send size={14} />
            </button>
          </form>
        </div>
      )}

      {/* 2. HOVER QUICK-PREVIEW (WHEN CHAT WINDOW IS CLOSED) */}
      {!isChatOpen && isHovered && !isDismissed && (
        <div
          role="dialog"
          aria-label="Zeta AI Concierge preview"
          className="mb-3 max-w-[240px] bg-white/95 dark:bg-[#19092B]/95 backdrop-blur-xl border border-purple-200/90 dark:border-purple-800/80 rounded-2xl p-3.5 shadow-[0_14px_40px_rgba(124,58,237,0.22)] transition-all duration-200 text-xs animate-in fade-in slide-in-from-bottom-2"
        >
          <div className="flex items-center justify-between gap-2 pb-1.5 border-b border-purple-100 dark:border-purple-900/60 mb-2">
            <div className="flex items-center gap-1.5 text-purple-700 dark:text-purple-300 font-extrabold text-[10px] uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Zeta • AI Concierge
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsDismissed(true);
              }}
              className="text-purple-400 hover:text-purple-700 dark:hover:text-purple-200 transition-colors p-0.5"
              aria-label="Close preview"
            >
              <X size={13} />
            </button>
          </div>
          <p className="text-[11px] text-[#1E0A3C] dark:text-purple-100 leading-snug font-medium">
            Ready to plan your story? Ask me anything about collections, dates, or chat with our
            Creative Team!
          </p>
          <div className="mt-2.5 flex items-center gap-2">
            <button
              onClick={() => {
                setIsChatOpen(true);
                setIsDismissed(true);
              }}
              className="flex-1 inline-flex items-center justify-center gap-1.5 text-[10px] font-bold text-white bg-gradient-to-r from-purple-700 via-purple-600 to-rose-600 px-3 py-1.5 rounded-xl shadow-[0_4px_15px_rgba(124,58,237,0.3)] hover:opacity-95 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <Bot size={12} /> Chat with Zeta
            </button>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="p-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/40 hover:bg-emerald-100 transition-colors"
              title="Chat with our Creative Team on WhatsApp"
            >
              <MessageCircle size={14} />
            </a>
          </div>
        </div>
      )}

      {/* 3. TRIGGER: PURPLE DOT (DEFAULT) OR EXPANDED MASCOT ICON (SMALLER SIZE) */}
      {!isIconOpen ? (
        <button
          type="button"
          onClick={() => {
            // Clicking the purple dot directly opens Zeta's interactive AI Chat
            setIsChatOpen((prev) => !prev);
          }}
          className="relative group flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-tr from-purple-700 via-purple-600 to-rose-500 text-white shadow-[0_0_20px_rgba(147,51,234,0.6)] hover:shadow-[0_0_26px_rgba(225,29,72,0.7)] hover:scale-115 active:scale-95 transition-all duration-300 border-2 border-white/80 dark:border-purple-300/60 cursor-pointer"
          aria-label="Open Zeta AI Chatbot"
          title="Zeta • PhotoMagic AI Chatbot"
        >
          {/* Active AI Ping Indicator */}
          <span className="absolute -top-0.5 -right-0.5 flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-80" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500 border border-white" />
          </span>

          <Sparkles
            size={16}
            className="text-white drop-shadow transition-transform duration-300 group-hover:scale-110"
          />
        </button>
      ) : (
        /* Scaled-down mascot graphic in royal purple */
        <div
          className="relative group cursor-pointer animate-in fade-in zoom-in-95 duration-200"
          onClick={() => setIsIconOpen(false)}
          title="Click to minimize into purple dot"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-purple-500/25 via-rose-400/20 to-transparent rounded-full blur-lg scale-95 pointer-events-none" />

          <div className="relative w-14 sm:w-16 h-auto transition-transform duration-300 group-hover:scale-105">
            <img
              src="/images/rozar_photographer_mascot.png"
              alt="Zeta AI Mascot - Click to minimize"
              className="w-full h-auto drop-shadow-[0_8px_16px_rgba(124,58,237,0.35)] [filter:invert(26%)_sepia(89%)_saturate(2476%)_hue-rotate(261deg)_brightness(92%)_contrast(96%)] transition-all duration-300"
            />

            <div className="absolute -top-1 -right-1 bg-purple-700 text-white rounded-full p-1 shadow-md border border-purple-300/40 opacity-80 group-hover:opacity-100 transition-opacity">
              <X size={10} />
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};
