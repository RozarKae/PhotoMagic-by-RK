'use client';

import React, { useState } from 'react';
import { Card, Badge, Button, Input } from '@photomagic/ui';
import { Sparkles, Send, Bot, User, Command, Zap } from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  commandExecuted?: string;
}

export const AIChatAssistant: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm1',
      sender: 'assistant',
      text: 'Hello RK Director! I am your PhotoMagic AI Studio Assistant. I can analyze revenue trends, detect scheduling conflicts, draft client quotations, and automate gallery deliveries. How can I assist your studio today?',
      timestamp: '12:00 PM',
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: inputText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    // AI Response Simulation
    setTimeout(() => {
      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        text: `Analysis Complete: Found 2 active projects for Oct 2026. Revenue forecast is on track at $148.5k (+18.4% YoY). Recommendation: Assign Alexander Ross as Lead Photographer for Udaipur Royal Wedding.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        commandExecuted: 'QueryStudioAnalytics(oct_2026)',
      };
      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 800);
  };

  return (
    <Card variant="glass" className="p-6 flex flex-col h-[550px] justify-between">
      {/* Header */}
      <div className="flex justify-between items-center pb-3 border-b border-border-subtle">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-gold-500/10 text-gold-500 border border-gold-500/20">
            <Sparkles size={18} />
          </div>
          <div>
            <h3 className="text-sm font-bold text-text-primary">Gemini 1.5 Studio Command AI</h3>
            <span className="text-[10px] text-text-tertiary">
              Provider-Agnostic Engine (Gemini / OpenAI / Claude)
            </span>
          </div>
        </div>
        <Badge variant="gold">Semantic Search Active</Badge>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto py-4 flex flex-col gap-4">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex gap-3 max-w-[85%] ${m.sender === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'}`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold ${
                m.sender === 'user'
                  ? 'bg-gold-500 text-canvas'
                  : 'bg-surface-elevated text-gold-500 border border-gold-500/30'
              }`}
            >
              {m.sender === 'user' ? <User size={14} /> : <Bot size={14} />}
            </div>

            <div
              className={`p-3.5 rounded-2xl text-xs leading-relaxed flex flex-col gap-1.5 ${
                m.sender === 'user'
                  ? 'bg-gold-500 text-canvas font-medium'
                  : 'bg-surface-base border border-border-subtle text-text-primary'
              }`}
            >
              <span>{m.text}</span>
              {m.commandExecuted && (
                <div className="px-2 py-1 rounded bg-black/30 text-[10px] font-mono text-gold-500 border border-gold-500/20 flex items-center gap-1">
                  <Command size={10} /> Executed: {m.commandExecuted}
                </div>
              )}
              <span className="text-[9px] opacity-70 text-right">{m.timestamp}</span>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex items-center gap-2 text-xs text-text-tertiary animate-pulse">
            <Bot size={14} className="text-gold-500" /> AI is querying studio database...
          </div>
        )}
      </div>

      {/* Input Form */}
      <form onSubmit={handleSendMessage} className="flex gap-2 pt-3 border-t border-border-subtle">
        <Input
          placeholder="Ask AI: 'Show revenue forecast' or 'Check gear conflicts for Oct 24'..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          className="flex-1"
        />
        <Button variant="primary" type="submit" className="flex items-center gap-1">
          <Send size={14} />
          Send
        </Button>
      </form>
    </Card>
  );
};
