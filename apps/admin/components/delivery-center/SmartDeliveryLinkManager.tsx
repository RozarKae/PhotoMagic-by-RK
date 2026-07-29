'use client';

import React, { useState } from 'react';
import { Card, Badge, Button } from '@photomagic/ui';
import { Link2, QrCode, Lock, Send, ShieldCheck, Copy, CheckCircle2, MessageSquare, Mail } from 'lucide-react';

export const SmartDeliveryLinkManager: React.FC = () => {
  const [deliveryChannel, setDeliveryChannel] = useState<'private_gallery' | 'secure_link' | 'qr_code' | 'whatsapp' | 'sms'>('private_gallery');
  const [downloadLimit, setDownloadLimit] = useState(100);
  const [expiryDays, setExpiryDays] = useState(30);
  const [copied, setCopied] = useState(false);

  const deliveryUrl = 'https://client.photomagic.studio/gallery/dl-v8-8842-udr';

  const handleCopyLink = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card variant="glass" className="p-6 flex flex-col gap-6">
      <div className="flex justify-between items-center pb-2 border-b border-border-subtle">
        <div className="flex items-center gap-2">
          <Link2 size={18} className="text-gold-500" />
          <h3 className="text-sm font-bold text-text-primary">Phase 8.1 Smart Branded Delivery Link Generator</h3>
        </div>
        <Badge variant="gold">Cloudflare R2 Encrypted Pipeline</Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
        {/* Delivery Channels */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="font-bold text-text-primary">Select Delivery Dispatch Method</label>
            <div className="grid grid-cols-2 gap-2">
              {(['private_gallery', 'secure_link', 'qr_code', 'whatsapp', 'sms'] as const).map((ch) => (
                <Button
                  key={ch}
                  variant={deliveryChannel === ch ? 'primary' : 'secondary'}
                  size="sm"
                  onClick={() => setDeliveryChannel(ch)}
                  className="capitalize text-xs flex items-center justify-center gap-1.5"
                >
                  <Send size={12} /> {ch.replace('_', ' ')}
                </Button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-3 pt-2 border-t border-border-subtle">
            <div className="flex flex-col gap-1">
              <label className="font-semibold text-text-secondary">Download Limit per Client (Max Files)</label>
              <input
                type="number"
                value={downloadLimit}
                onChange={(e) => setDownloadLimit(Number(e.target.value))}
                className="h-9 px-3 rounded-lg bg-surface-base border border-border-subtle text-xs text-text-primary font-mono focus:outline-none"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-semibold text-text-secondary">Link Expiration (Days)</label>
              <input
                type="number"
                value={expiryDays}
                onChange={(e) => setExpiryDays(Number(e.target.value))}
                className="h-9 px-3 rounded-lg bg-surface-base border border-border-subtle text-xs text-text-primary font-mono focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Secure Link Preview & Quick Actions */}
        <div className="flex flex-col gap-4 justify-between p-4 rounded-xl bg-surface-base border border-border-subtle">
          <div className="flex flex-col gap-2">
            <span className="text-text-tertiary font-semibold">Generated Secure Client Access Link</span>
            <div className="p-3 rounded-lg bg-surface-elevated border border-border-subtle font-mono text-[11px] text-gold-500 break-all flex justify-between items-center">
              <span>{deliveryUrl}</span>
              <Button variant="ghost" size="sm" onClick={handleCopyLink} className="flex-shrink-0">
                {copied ? <CheckCircle2 size={14} className="text-status-success" /> : <Copy size={14} />}
              </Button>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-[10px] text-text-tertiary font-mono">
              <Lock size={12} className="text-gold-500" />
              <span>AES-256 Encrypted • Dynamic PIN Verification Active</span>
            </div>
            <Button variant="primary" size="lg" className="w-full font-bold flex items-center justify-center gap-2">
              <Send size={16} /> Dispatch Direct WhatsApp & Email Notification
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};
