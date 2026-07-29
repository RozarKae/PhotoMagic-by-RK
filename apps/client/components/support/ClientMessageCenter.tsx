'use client';

import React, { useState } from 'react';
import { Card, Badge, Button } from '@photomagic/ui';
import { MessageSquare, Send, Paperclip, CheckCheck } from 'lucide-react';

export const ClientMessageCenter: React.FC = () => {
  const [messages, setMessages] = useState([
    { sender: 'Studio Concierge', text: 'Hello Eleanor! We have uploaded your Mandap Vows preview batch. Please let us know if you need any color adjustments.', time: '10:30 AM', isStudio: true },
    { sender: 'You', text: 'Thank you! The skin tones look amazing. Can we smooth the background wire in Photo #042?', time: '10:45 AM', isStudio: false },
    { sender: 'Studio Concierge', text: 'Absolutely! Adding that to our AI retouching queue now.', time: '11:00 AM', isStudio: true },
  ]);
  const [inputText, setInputText] = useState('');

  const handleSend = () => {
    if (!inputText.trim()) return;
    setMessages((prev) => [
      ...prev,
      { sender: 'You', text: inputText, time: 'Just now', isStudio: false },
    ]);
    setInputText('');
  };

  return (
    <Card variant="glass" className="p-5 flex flex-col gap-4">
      <div className="flex justify-between items-center pb-2 border-b border-border-subtle">
        <div className="flex items-center gap-2">
          <MessageSquare size={18} className="text-gold-500" />
          <h3 className="text-sm font-bold text-text-primary">Direct Studio Concierge Message Thread</h3>
        </div>
        <Badge variant="success">Online • Typing Response</Badge>
      </div>

      {/* Message Chat Thread */}
      <div className="flex flex-col gap-3 max-h-[300px] overflow-y-auto p-3 rounded-xl bg-surface-base border border-border-subtle text-xs">
        {messages.map((m, idx) => (
          <div
            key={idx}
            className={`flex flex-col gap-1 max-w-[80%] p-3 rounded-xl ${
              m.isStudio
                ? 'self-start bg-surface-elevated border border-border-subtle text-text-primary'
                : 'self-end bg-gold-500/15 border border-gold-500/30 text-gold-500'
            }`}
          >
            <span className="font-bold text-[10px] text-text-tertiary">{m.sender}</span>
            <p className="text-xs leading-relaxed">{m.text}</p>
            <span className="text-[9px] text-text-tertiary self-end">{m.time}</span>
          </div>
        ))}
      </div>

      {/* Input Message Bar */}
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Type message to studio concierge..."
          className="flex-1 h-9 px-3 rounded-lg bg-surface-base border border-border-subtle text-xs text-text-primary font-mono focus:outline-none focus:ring-1 focus:ring-gold-500"
        />
        <Button variant="primary" size="sm" onClick={handleSend} className="flex items-center gap-1">
          <Send size={14} /> Send
        </Button>
      </div>
    </Card>
  );
};
