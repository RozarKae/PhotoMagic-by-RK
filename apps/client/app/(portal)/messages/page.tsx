'use client';

import React, { useState } from 'react';
import { Card, Badge, Button, Input } from '@photomagic/ui';
import { sendClientMessageAction, PortalChatMessage } from '../../actions/portal-actions';
import { Send, MessageSquare } from 'lucide-react';

export default function MessagesPage() {
  const [messages, setMessages] = useState<PortalChatMessage[]>([
    {
      id: 'm1',
      senderName: 'Studio Concierge',
      senderRole: 'concierge',
      message:
        'Welcome Eleanor! We are excited to document your Udaipur wedding celebration. Feel free to send us any venue lighting notes here.',
      timestamp: '10:00 AM',
    },
  ]);
  const [text, setText] = useState('');
  const [isSending, setIsSending] = useState(false);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;

    setIsSending(true);
    const res = await sendClientMessageAction({ message: text });
    setIsSending(false);

    if (res.success) {
      setMessages((prev) => [...prev, res.data as PortalChatMessage]);
      setText('');
    }
  };

  return (
    <main className="p-8 max-w-4xl mx-auto flex flex-col gap-6 pb-24">
      <div>
        <Badge variant="gold">Direct Studio Support</Badge>
        <h1 className="text-3xl font-extrabold text-text-primary mt-1">
          Studio Concierge Messaging
        </h1>
        <p className="text-sm text-text-secondary">
          Communicate directly with your assigned lead photographer and studio director.
        </p>
      </div>

      <Card variant="glass" className="p-6 flex flex-col h-[500px]">
        {/* Chat History List */}
        <div className="flex-1 overflow-y-auto flex flex-col gap-4 pr-2">
          {messages.map((msg) => {
            const isClient = msg.senderRole === 'client';
            return (
              <div
                key={msg.id}
                className={`flex flex-col max-w-[80%] ${isClient ? 'ml-auto items-end' : 'mr-auto items-start'}`}
              >
                <span className="text-[10px] text-text-tertiary mb-1">
                  {msg.senderName} • {msg.timestamp}
                </span>
                <div
                  className={`p-3.5 rounded-2xl text-xs leading-relaxed ${
                    isClient
                      ? 'bg-gold-500 text-canvas font-medium rounded-br-none'
                      : 'bg-surface-elevated text-text-primary border border-border-subtle rounded-bl-none'
                  }`}
                >
                  {msg.message}
                </div>
              </div>
            );
          })}
        </div>

        {/* Input Bar */}
        <form onSubmit={handleSend} className="flex gap-2 pt-4 border-t border-border-subtle mt-4">
          <Input
            placeholder="Type your message to studio concierge..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="flex-1"
          />
          <Button variant="primary" type="submit" disabled={isSending}>
            <Send size={16} />
          </Button>
        </form>
      </Card>
    </main>
  );
}
