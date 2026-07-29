'use client';

import React, { useState } from 'react';
import { Input, Select, Button, Alert, Badge } from '@photomagic/ui';
import { ShieldCheck, Clock, Send, Sparkles, CheckCircle2 } from 'lucide-react';

export const InquiryForm: React.FC = () => {
  const [clientName, setClientName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [eventType, setEventType] = useState('wedding');
  const [eventDate, setEventDate] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg('');

    try {
      // Mock CRM Lead Ingestion Submission
      await new Promise((resolve) => setTimeout(resolve, 800));
      setIsSubmitting(false);
      setSubmitted(true);
    } catch {
      setIsSubmitting(false);
      setErrorMsg('Failed to submit inquiry. Please try again or email concierge directly.');
    }
  };

  if (submitted) {
    return (
      <div className="p-8 rounded-2xl bg-gold-500/10 border border-gold-500/40 flex flex-col gap-4 text-center items-center">
        <div className="w-14 h-14 rounded-full bg-gold-500/20 text-gold-500 border border-gold-500/30 flex items-center justify-center">
          <CheckCircle2 size={32} />
        </div>
        <h3 className="text-2xl font-bold text-text-primary">Inquiry Confirmed, {clientName}!</h3>
        <p className="text-xs text-text-secondary leading-relaxed max-w-md">
          Thank you for choosing PhotoMagic Studio. Our Studio Director will review your date availability and respond within 24 hours with a customized proposal.
        </p>
        <div className="flex items-center gap-2 text-[10px] text-gold-500 font-mono pt-2 border-t border-gold-500/20">
          <Clock size={12} /> Priority Lead Tracking ID: #L-UDPR-2026-088
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 text-left">
      {errorMsg && <Alert variant="error">{errorMsg}</Alert>}

      {/* Trust Header */}
      <div className="flex items-center justify-between pb-3 border-b border-border-subtle">
        <div className="flex items-center gap-2">
          <Sparkles size={18} className="text-gold-500" />
          <h3 className="text-sm font-bold text-text-primary">Private Studio Inquiry Form</h3>
        </div>
        <Badge variant="gold" className="text-[10px] uppercase">24-Hour Guarantee</Badge>
      </div>

      {/* Step 1: Contact Details */}
      <div className="flex flex-col gap-3">
        <span className="text-[11px] font-bold text-gold-500 uppercase tracking-wider font-mono">
          01. Contact Information
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Your Full Name *"
            placeholder="Eleanor Vance"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            required
            data-analytics="input-client-name"
          />
          <Input
            label="Email Address *"
            type="email"
            placeholder="eleanor@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            data-analytics="input-email"
          />
        </div>
      </div>

      {/* Step 2: Event Details */}
      <div className="flex flex-col gap-3">
        <span className="text-[11px] font-bold text-gold-500 uppercase tracking-wider font-mono">
          02. Event & Schedule Details
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Phone Number"
            type="tel"
            placeholder="+1 (555) 000-0000"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            data-analytics="input-phone"
          />
          <Input
            label="Target Event Date"
            type="date"
            value={eventDate}
            onChange={(e) => setEventDate(e.target.value)}
            data-analytics="input-event-date"
          />
        </div>

        <Select
          label="Event / Shoot Category *"
          value={eventType}
          onChange={setEventType}
          options={[
            { label: 'Royal Heritage Wedding Photography & Cinema', value: 'wedding' },
            { label: 'Fine Art Atelier Studio Portraiture', value: 'portrait' },
            { label: 'Commercial & High-Fashion Editorial', value: 'commercial' },
            { label: 'Destination Event & Yacht Celebration', value: 'destination' },
          ]}
        />
      </div>

      {/* Step 3: Special Requests */}
      <div className="flex flex-col gap-2">
        <span className="text-[11px] font-bold text-gold-500 uppercase tracking-wider font-mono">
          03. Vision & Venue Notes
        </span>
        <textarea
          rows={3}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Share your venue location, aesthetic preferences, or specific shot list ideas..."
          className="w-full rounded-xl bg-surface-base p-3.5 text-xs text-text-primary placeholder:text-text-tertiary border border-border-subtle focus:outline-none focus:ring-1 focus:ring-gold-500 transition-all font-mono"
        />
      </div>

      {/* Submit Action */}
      <div className="flex flex-col gap-2 pt-2">
        <Button
          variant="primary"
          size="lg"
          className="w-full font-bold tracking-wide shadow-gold flex items-center justify-center gap-2"
          disabled={isSubmitting}
          data-analytics="submit-inquiry-button"
        >
          <Send size={16} />
          {isSubmitting ? 'Transmitting Inquiry...' : 'Submit Priority Consultation Request'}
        </Button>

        <div className="flex items-center justify-center gap-4 text-[10px] text-text-tertiary mt-2">
          <span className="flex items-center gap-1">
            <ShieldCheck size={12} className="text-gold-500" /> 100% Privacy Guaranteed
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Clock size={12} className="text-gold-500" /> Studio Response &lt; 24h
          </span>
        </div>
      </div>
    </form>
  );
};
