'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Card, Badge, Button, Input } from '@photomagic/ui';
import { Sparkles, Send, Bot, User, Command, Zap } from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  commandExecuted?: string;
  isStreaming?: boolean;
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
  const scrollRef = useRef<HTMLDivElement>(null);
  const streamingTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-scroll on new messages or stream chunks
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  // Clean up any running stream timer on unmount
  useEffect(() => {
    return () => {
      if (streamingTimerRef.current) clearInterval(streamingTimerRef.current);
    };
  }, []);

  const resolveAssistantResponse = (query: string): { text: string; command: string } => {
    const q = query.toLowerCase();

    if (
      q.includes('revenue') ||
      q.includes('forecast') ||
      q.includes('financial') ||
      q.includes('profit')
    ) {
      return {
        text: 'Revenue Forecast Analysis (Oct 2026): Projected revenue is $148,500 (+18.4% YoY). Total confirmed bookings: 14 ceremonies. High-tier packages (The Imperial Kohinoor & Emerald Heirloom) account for 68% of bookings. Outstanding receivables: $12,400 across 3 client invoices.',
        command: 'QueryStudioFinancials(oct_2026)',
      };
    }

    if (
      q.includes('gear') ||
      q.includes('camera') ||
      q.includes('lens') ||
      q.includes('conflict')
    ) {
      return {
        text: 'Equipment & Roster Diagnostic: Checked 12 upcoming shoots across Chennai, Madurai, and Kochi. Confirmed 0 critical hardware conflicts. Leica SL3 bodies and Sony FX6 cinema rigs are fully allocated with double battery redundancy. Recommendation: Reserve 1 spare 85mm f/1.2 GM for Oct 24 Madurai Muhurtham.',
        command: 'AuditGearRoster(range=next_30_days)',
      };
    }

    if (q.includes('cull') || q.includes('quality') || q.includes('gemini') || q.includes('tag')) {
      return {
        text: 'Gemini 2.0 Flash Vision Pipeline Active: 1,420 unculled frames detected from Udaipur Heritage shoot. AI Quality Assessment can run at ~240ms per batch. Estimated culling time: 4.8 minutes. Ready to classify keeps, blinks, and focus-misses.',
        command: 'TriggerGeminiBatchCull(job_id="udaipur_2026")',
      };
    }

    if (q.includes('package') || q.includes('price') || q.includes('quote')) {
      return {
        text: 'Studio Package Matrix: Active packages include The Moonstone Anthology (₹42,000), The Rose Gold Chronicle (₹78,000), The Emerald Heirloom (₹1,45,000), and The Imperial Kohinoor (₹2,60,000). Bespoke 3D flush-mount leather album add-on available at ₹32,000.',
        command: 'FetchActivePackageCatalog()',
      };
    }

    return {
      text: `Directorial Query Processed: "${query}". Cross-referencing current studio operational state, booking calendar, and client proofing portals. All systems operating at optimal latency (<50ms).`,
      command: 'ExecuteStudioQuery()',
    };
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || isTyping) return;

    const userText = inputText;
    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: userText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    const { text: fullResponse, command } = resolveAssistantResponse(userText);
    const aiMsgId = (Date.now() + 1).toString();
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // Initial streaming placeholder (Instant TTFT < 80ms)
    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: aiMsgId,
          sender: 'assistant',
          text: '',
          timestamp,
          commandExecuted: command,
          isStreaming: true,
        },
      ]);

      // Progressive token-by-token streaming generator
      const words = fullResponse.split(' ');
      let currentIdx = 0;

      streamingTimerRef.current = setInterval(() => {
        if (currentIdx < words.length) {
          const nextChunk = words.slice(0, currentIdx + 1).join(' ');
          setMessages((prev) =>
            prev.map((msg) => (msg.id === aiMsgId ? { ...msg, text: nextChunk } : msg)),
          );
          currentIdx++;
        } else {
          if (streamingTimerRef.current) clearInterval(streamingTimerRef.current);
          setMessages((prev) =>
            prev.map((msg) => (msg.id === aiMsgId ? { ...msg, isStreaming: false } : msg)),
          );
        }
      }, 22); // Fast 22ms per word streaming cadence
    }, 60);
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
              Instant Progressive Token Streaming Engine
            </span>
          </div>
        </div>
        <Badge variant="gold">Fast Streaming Active</Badge>
      </div>

      {/* Messages Scroll Area */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto py-4 flex flex-col gap-4">
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
              <span>
                {m.text}
                {m.isStreaming && (
                  <span className="inline-block w-1.5 h-3 ml-1 bg-gold-500 animate-pulse align-middle" />
                )}
              </span>
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
          placeholder="Ask AI: 'Show revenue forecast' or 'Check gear conflicts' or 'Culling status'..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          className="flex-1"
        />
        <Button
          variant="primary"
          type="submit"
          disabled={isTyping}
          className="flex items-center gap-1"
        >
          <Send size={14} />
          Send
        </Button>
      </form>
    </Card>
  );
};
