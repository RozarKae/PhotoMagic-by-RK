'use client';

import React, { useState } from 'react';
import { Card, Badge, Button, Input } from '@photomagic/ui';
import {
  CreditCard,
  QrCode,
  Send,
  CheckCircle2,
  Calendar,
  Sparkles,
  Heart,
  Cake,
  Building2,
  Users,
  Plus,
} from 'lucide-react';
import { StudioGiftCardV10 } from '@photomagic/config';

const MOCK_GIFT_CARDS: StudioGiftCardV10[] = [
  {
    id: 'gc-101',
    cardCode: 'PM-WED-90812',
    occasion: 'wedding',
    initialAmount: 50000.0,
    remainingBalance: 50000.0,
    senderName: 'Rajesh & Sunita Singhania',
    recipientName: 'Vikram & Ananya Sharma',
    recipientEmail: 'ananya.sharma@gmail.com',
    qrCodeToken: 'qr_token_wed_90812',
    digitalDeliveryStatus: 'sent',
    expiryDate: '2027-08-01',
  },
  {
    id: 'gc-102',
    cardCode: 'PM-CORP-44102',
    occasion: 'corporate',
    initialAmount: 100000.0,
    remainingBalance: 25000.0,
    senderName: 'Vogue India Editorial Team',
    recipientName: 'PhotoMagic Creative Dept',
    recipientEmail: 'editorial@vogue.in',
    qrCodeToken: 'qr_token_corp_44102',
    digitalDeliveryStatus: 'redeemed',
    expiryDate: '2026-12-31',
  },
  {
    id: 'gc-103',
    cardCode: 'PM-BDAY-33910',
    occasion: 'birthday',
    initialAmount: 25000.0,
    remainingBalance: 25000.0,
    senderName: 'Meera Kapoor',
    recipientName: 'Siddharth Kapoor',
    recipientEmail: 'sid.kapoor@studio.com',
    qrCodeToken: 'qr_token_bday_33910',
    digitalDeliveryStatus: 'sent',
    expiryDate: '2026-11-15',
  },
  {
    id: 'gc-104',
    cardCode: 'PM-FAM-88219',
    occasion: 'family',
    initialAmount: 35000.0,
    remainingBalance: 35000.0,
    senderName: 'Uncle Ramesh & Family',
    recipientName: 'Karan & Natasha Mehta',
    recipientEmail: 'karan.m@techcorp.io',
    qrCodeToken: 'qr_token_fam_88219',
    digitalDeliveryStatus: 'sent',
    expiryDate: '2027-03-31',
  },
];

const OCCASION_CONFIG: Record<string, { label: string; icon: any; color: string }> = {
  wedding: {
    label: 'Royal Wedding',
    icon: Heart,
    color: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
  },
  birthday: {
    label: 'Birthday Portrait',
    icon: Cake,
    color: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  },
  family: {
    label: 'Family Heritage',
    icon: Users,
    color: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  },
  corporate: {
    label: 'Corporate Brand',
    icon: Building2,
    color: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  },
  custom: {
    label: 'Luxury Custom',
    icon: Sparkles,
    color: 'bg-gold-500/10 text-gold-400 border-gold-500/20',
  },
};

export const GiftCardManager: React.FC = () => {
  const [giftCards, setGiftCards] = useState<StudioGiftCardV10[]>(MOCK_GIFT_CARDS);
  const [showIssueModal, setShowIssueModal] = useState<boolean>(false);
  const [senderName, setSenderName] = useState<string>('');
  const [recipientName, setRecipientName] = useState<string>('');
  const [recipientEmail, setRecipientEmail] = useState<string>('');
  const [amount, setAmount] = useState<number>(25000);
  const [occasion, setOccasion] = useState<any>('wedding');

  const handleIssueGiftCard = () => {
    if (!senderName || !recipientName || !recipientEmail) return;

    const newCard: StudioGiftCardV10 = {
      id: `gc-${Date.now()}`,
      cardCode: `PM-${occasion.toUpperCase().slice(0, 4)}-${Math.floor(10000 + Math.random() * 90000)}`,
      occasion: occasion,
      initialAmount: amount,
      remainingBalance: amount,
      senderName,
      recipientName,
      recipientEmail,
      qrCodeToken: `qr_token_${Math.floor(100000 + Math.random() * 900000)}`,
      digitalDeliveryStatus: 'sent',
      expiryDate: '2027-12-31',
    };

    setGiftCards([newCard, ...giftCards]);
    setShowIssueModal(false);
    setSenderName('');
    setRecipientName('');
    setRecipientEmail('');
  };

  return (
    <Card
      variant="elevated"
      className="p-6 border border-border-subtle bg-surface-elevated flex flex-col gap-6"
    >
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border-subtle pb-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-gold-500/10 text-gold-500 border border-gold-500/20">
            <CreditCard size={24} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-text-primary">
                Phase 10.2 — Studio Gift Cards & QR Redemption
              </h2>
              <Badge variant="gold">Digital Delivery Active</Badge>
            </div>
            <p className="text-xs text-text-secondary mt-0.5">
              Issue luxury digital gift cards for Wedding, Birthday, Family, and Corporate
              photography sessions with QR code verification.
            </p>
          </div>
        </div>

        <Button
          variant="primary"
          onClick={() => setShowIssueModal(true)}
          className="flex items-center gap-2 font-bold text-xs"
        >
          <Plus size={16} /> Issue Luxury Gift Card
        </Button>
      </div>

      {/* Issue Gift Card Modal Sandbox */}
      {showIssueModal && (
        <div className="p-5 rounded-xl bg-surface-base border border-gold-500/40 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-gold-400 flex items-center gap-2">
              <Sparkles size={16} /> Issue New Digital Gift Card
            </h3>
            <button
              onClick={() => setShowIssueModal(false)}
              className="text-xs text-text-tertiary hover:text-text-primary"
            >
              Cancel
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            <Input
              value={senderName}
              onChange={(e) => setSenderName(e.target.value)}
              placeholder="Sender Name (e.g. Ramesh Singhania)"
            />
            <Input
              value={recipientName}
              onChange={(e) => setRecipientName(e.target.value)}
              placeholder="Recipient Name (e.g. Vikram & Ananya)"
            />
            <Input
              value={recipientEmail}
              onChange={(e) => setRecipientEmail(e.target.value)}
              placeholder="Recipient Email"
            />
            <select
              value={occasion}
              onChange={(e) => setOccasion(e.target.value)}
              className="bg-surface-elevated text-text-primary text-sm px-3 py-2 rounded-lg border border-border-subtle focus:outline-none focus:border-gold-500"
            >
              <option value="wedding">Royal Wedding</option>
              <option value="birthday">Birthday Portrait</option>
              <option value="family">Family Heritage</option>
              <option value="corporate">Corporate Brand</option>
              <option value="custom">Luxury Custom Amount</option>
            </select>
          </div>

          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-xs text-text-secondary">Amount (INR):</span>
              {[15000, 25000, 50000, 100000].map((amt) => (
                <button
                  key={amt}
                  onClick={() => setAmount(amt)}
                  className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${
                    amount === amt
                      ? 'bg-gold-500 text-surface-base'
                      : 'bg-surface-elevated text-text-primary hover:bg-surface-elevated/80'
                  }`}
                >
                  ₹{amt.toLocaleString('en-IN')}
                </button>
              ))}
            </div>

            <Button variant="primary" onClick={handleIssueGiftCard} className="font-bold text-xs">
              <Send size={14} className="mr-1" /> Dispatch Gift Card & QR
            </Button>
          </div>
        </div>
      )}

      {/* Gift Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {giftCards.map((card) => {
          const occasionMeta = OCCASION_CONFIG[card.occasion] || {
            label: card.occasion,
            icon: Sparkles,
            color: 'bg-surface-base text-text-primary border-border-subtle',
          };
          const Icon = occasionMeta.icon;

          return (
            <div
              key={card.id}
              className="p-4 rounded-xl bg-surface-base border border-border-subtle hover:border-gold-500/40 transition-all flex flex-col justify-between gap-4 group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-gold-500/5 rounded-full blur-2xl pointer-events-none" />

              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold border ${occasionMeta.color}`}
                  >
                    <Icon size={14} /> {occasionMeta.label}
                  </span>
                  <span className="text-xs font-mono font-bold text-gold-500">{card.cardCode}</span>
                </div>

                <h3 className="text-2xl font-extrabold text-text-primary">
                  ₹{card.remainingBalance.toLocaleString('en-IN')}
                </h3>
                <span className="text-xs text-text-tertiary block mt-0.5">
                  Initial Value: ₹{card.initialAmount.toLocaleString('en-IN')}
                </span>
              </div>

              <div className="border-t border-border-subtle pt-3 text-xs text-text-secondary flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <span>To:</span>
                  <span className="font-semibold text-text-primary">{card.recipientName}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>From:</span>
                  <span className="text-text-tertiary">{card.senderName}</span>
                </div>
                <div className="flex items-center justify-between mt-1 pt-1 border-t border-border-subtle/50">
                  <span className="flex items-center gap-1 text-gold-400 font-mono">
                    <QrCode size={14} /> {card.qrCodeToken}
                  </span>
                  <span className="text-[11px] text-emerald-400 font-semibold uppercase">
                    {card.digitalDeliveryStatus}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};
