'use client';

import React, { useState } from 'react';
import { Card, Badge, Button } from '@photomagic/ui';
import { HelpCircle, Search, Ticket, PhoneCall, ChevronDown, ChevronUp } from 'lucide-react';

export const SupportTicketsFaqHub: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How long does album delivery take after approval?',
      a: 'Once you digitally approve your album proof, printing and gold-foil binding take 7–10 business days.',
      category: 'Album',
    },
    {
      q: 'Can I request additional retouching after initial selection?',
      a: 'Yes! You have up to 2 revision rounds included in your package. Submit retouch requests via the proofing portal.',
      category: 'Gallery',
    },
    {
      q: 'How do I download high-resolution RAW files?',
      a: 'High-resolution ZIP archives are accessible in your Final Delivery tab with your private PIN.',
      category: 'Delivery',
    },
  ];

  const filteredFaqs = faqs.filter(
    (f) =>
      f.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.a.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <Card variant="glass" className="p-6 flex flex-col gap-6">
      <div className="flex justify-between items-center pb-2 border-b border-border-subtle">
        <div className="flex items-center gap-2">
          <HelpCircle size={18} className="text-gold-500" />
          <h3 className="text-sm font-bold text-text-primary">
            Studio Support Center & FAQ Knowledgebase
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary" size="sm" className="flex items-center gap-1 text-xs">
            <PhoneCall size={12} /> Request Callback
          </Button>
          <Button variant="primary" size="sm" className="flex items-center gap-1 text-xs">
            <Ticket size={12} /> Raise Ticket
          </Button>
        </div>
      </div>

      {/* FAQ Search Bar */}
      <div className="relative">
        <Search size={16} className="absolute left-3 top-2.5 text-text-tertiary" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search FAQs, payments, delivery times..."
          className="w-full h-10 pl-9 pr-4 rounded-xl bg-surface-base border border-border-subtle text-xs text-text-primary font-mono focus:outline-none focus:ring-1 focus:ring-gold-500"
        />
      </div>

      {/* Accordion FAQ List */}
      <div className="flex flex-col gap-2.5 text-xs">
        {filteredFaqs.map((faq, idx) => (
          <div
            key={idx}
            className="p-3.5 rounded-xl bg-surface-base border border-border-subtle flex flex-col gap-2"
          >
            <div
              onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
              className="flex justify-between items-center cursor-pointer font-bold text-text-primary"
            >
              <div className="flex items-center gap-2">
                <Badge variant="gold" className="text-[9px]">
                  {faq.category}
                </Badge>
                <span>{faq.q}</span>
              </div>
              {openFaq === idx ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </div>

            {openFaq === idx && (
              <p className="text-[11px] text-text-secondary pt-2 border-t border-border-subtle leading-relaxed">
                {faq.a}
              </p>
            )}
          </div>
        ))}
      </div>
    </Card>
  );
};
