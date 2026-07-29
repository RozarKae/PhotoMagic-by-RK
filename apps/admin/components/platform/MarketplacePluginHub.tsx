'use client';

import React, { useState } from 'react';
import { Card, Badge, Button } from '@photomagic/ui';
import { Store, Download, Star, CheckCircle2, Sparkles } from 'lucide-react';

export interface MarketplaceItemCard {
  id: string;
  title: string;
  category: string;
  author: string;
  price: string;
  rating: number;
  installed: boolean;
}

export const MarketplacePluginHub: React.FC = () => {
  const [items, setItems] = useState<MarketplaceItemCard[]>([
    {
      id: 'mkt-1',
      title: 'Royal Vintage Color Grading LUT Pack',
      category: 'AI Color LUTs',
      author: 'PhotoMagic Labs',
      price: 'Free',
      rating: 4.98,
      installed: true,
    },
    {
      id: 'mkt-2',
      title: 'Automated WhatsApp Concierge Extension',
      category: 'CRM Extension',
      author: 'ConnectStudio',
      price: '$19/mo',
      rating: 4.92,
      installed: false,
    },
    {
      id: 'mkt-3',
      title: 'Udaipur Palace Album Template Collection',
      category: 'Album Designs',
      author: 'Heritage Design Co.',
      price: '$49',
      rating: 5.0,
      installed: false,
    },
  ]);

  const handleInstall = (id: string) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, installed: true } : item))
    );
  };

  return (
    <Card variant="glass" className="p-6 flex flex-col gap-5">
      <div className="flex justify-between items-center pb-2 border-b border-border-subtle">
        <div className="flex items-center gap-2">
          <Store size={18} className="text-gold-500" />
          <h3 className="text-sm font-bold text-text-primary">PhotoMagic Studio OS Marketplace & Extension Hub</h3>
        </div>
        <Badge variant="gold">Plugins & LUT Packs</Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
        {items.map((item) => (
          <div key={item.id} className="p-4 rounded-xl bg-surface-base border border-border-subtle flex flex-col justify-between gap-3">
            <div className="flex flex-col gap-1">
              <div className="flex justify-between items-center">
                <Badge variant="gold" className="text-[9px]">{item.category}</Badge>
                <div className="flex items-center gap-1 text-gold-500 font-bold text-[11px]">
                  <Star size={12} fill="currentColor" /> {item.rating}
                </div>
              </div>
              <span className="font-bold text-text-primary text-sm pt-1">{item.title}</span>
              <span className="text-[10px] text-text-tertiary">By {item.author}</span>
            </div>

            <div className="flex justify-between items-center pt-2 border-t border-border-subtle">
              <span className="font-extrabold text-gold-500 font-mono text-sm">{item.price}</span>
              <Button
                variant={item.installed ? 'secondary' : 'primary'}
                size="sm"
                onClick={() => handleInstall(item.id)}
                disabled={item.installed}
                className="flex items-center gap-1"
              >
                {item.installed ? (
                  <>
                    <CheckCircle2 size={12} /> Installed
                  </>
                ) : (
                  <>
                    <Download size={12} /> Install 1-Click
                  </>
                )}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
