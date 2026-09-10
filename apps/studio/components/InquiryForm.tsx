'use client';

import React, { useState } from 'react';
import { Input, Select, Button, Alert } from '@photomagic/ui';
import { ShieldCheck, Clock, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';

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
      // Mock CRM Ingestion
      await new Promise((resolve) => setTimeout(resolve, 800));
      setIsSubmitting(false);
      setSubmitted(true);
    } catch {
      setIsSubmitting(false);
      setErrorMsg(
        'Inquiry submission failed. Please try again or email concierge@photomagic.studio directly.',
      );
    }
  };

  if (submitted) {
    return (
      <div className="p-8 rounded-2xl bg-white/95 dark:bg-[#170C22]/95 border border-purple-200/90 dark:border-purple-800/50 flex flex-col gap-5 text-center items-center shadow-museum">
        <div className="w-16 h-16 rounded-full bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border border-purple-300 dark:border-purple-700/60 flex items-center justify-center shadow-md">
          <CheckCircle2 size={36} />
        </div>
        <h3 className="text-2xl sm:text-3xl font-bold font-heading text-slate-900 dark:text-white">
          Inquiry Received, {clientName}
        </h3>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed max-w-md font-normal">
          Thank you for reaching out to PhotoMagic Studio. Our Lead Director will personally review
          your event availability and contact you within 4 hours.
        </p>
        <div className="flex items-center gap-2 text-xs text-purple-800 dark:text-purple-300 font-mono pt-4 border-t border-purple-100 dark:border-purple-900/40 w-full justify-center font-bold">
          <Clock size={14} /> Priority Concierge Response Guarantee: Under 4 Hours
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 text-left">
      {errorMsg && <Alert variant="error">{errorMsg}</Alert>}

      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-purple-200/80 dark:border-purple-900/40">
        <div className="flex items-center gap-2.5">
          <Sparkles size={18} className="text-rose-600 dark:text-rose-400" />
          <h3 className="text-base font-heading font-bold text-slate-900 dark:text-white">
            Private Studio Concierge Inquiry
          </h3>
        </div>
        <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-purple-900 dark:text-purple-300 bg-purple-100 dark:bg-purple-950/60 px-3 py-1 rounded-full border border-purple-200 dark:border-purple-800 font-bold">
          4-Hour Response SLA
        </span>
      </div>

      {/* Step 01: Personal Details */}
      <div className="flex flex-col gap-3">
        <span className="text-[11px] font-bold text-rose-700 dark:text-rose-400 uppercase tracking-[0.22em] font-nav">
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
            className="text-xs"
          />
          <Input
            label="Email Address *"
            type="email"
            placeholder="eleanor@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            data-analytics="input-email"
            className="text-xs"
          />
        </div>
      </div>

      {/* Step 02: Event Details */}
      <div className="flex flex-col gap-3">
        <span className="text-[11px] font-bold text-rose-700 dark:text-rose-400 uppercase tracking-[0.22em] font-nav">
          02. Event & Milestone Details
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Phone Number"
            type="tel"
            placeholder="+91 98765 43210"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            data-analytics="input-phone"
            className="text-xs"
          />
          <Input
            label="Target Event Date"
            type="date"
            value={eventDate}
            onChange={(e) => setEventDate(e.target.value)}
            data-analytics="input-event-date"
            className="text-xs"
          />
        </div>

        <Select
          label="Milestone Category *"
          value={eventType}
          onChange={setEventType}
          options={[
            { label: 'Royal Heritage Wedding Photography & Cinema', value: 'wedding' },
            { label: 'Fine Art Atelier Studio & Executive Portraiture', value: 'portrait' },
            { label: 'Commercial & High-Fashion Editorial Assignment', value: 'commercial' },
            { label: 'Destination Event & Private Yacht Celebration', value: 'destination' },
          ]}
          className="rounded-xl font-sans text-xs"
        />
      </div>

      {/* Step 03: Vision Notes */}
      <div className="flex flex-col gap-2">
        <span className="text-[11px] font-bold text-rose-700 dark:text-rose-400 uppercase tracking-[0.22em] font-nav">
          03. Creative Vision & Venue Specifications
        </span>
        <textarea
          rows={3}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Share your venue location, aesthetic vision, or special family requests..."
          className="w-full rounded-xl bg-white dark:bg-[#170C22] p-4 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-purple-400/50 border border-slate-300 dark:border-purple-800/60 focus:outline-none focus:ring-2 focus:ring-purple-600/30 focus:border-purple-600 transition-all font-sans shadow-sm"
        />
      </div>

      {/* Submit Action */}
      <div className="flex flex-col gap-3 pt-2">
        <Button
          variant="primary"
          size="lg"
          className="w-full font-nav text-xs font-bold uppercase tracking-[0.25em] bg-gradient-to-r from-purple-700 via-purple-600 to-rose-600 text-white border border-white/20 shadow-[0_4px_18px_rgba(124,58,237,0.3)] hover:shadow-[0_6px_25px_rgba(225,29,72,0.4)] transition-all duration-300 flex items-center justify-center gap-3 py-4"
          disabled={isSubmitting}
          data-analytics="submit-inquiry-button"
        >
          {isSubmitting ? (
            <span>Sending Inquiry...</span>
          ) : (
            <>
              <span>Request Private Consultation</span>
              <ArrowRight size={16} />
            </>
          )}
        </Button>

        <div className="flex items-center justify-center gap-2 font-mono text-[10px] text-slate-600 dark:text-slate-400 pt-1 font-medium">
          <ShieldCheck size={12} className="text-rose-600 dark:text-rose-400" />
          <span>CONFIDENTIAL CONCIERGE CHANNEL • ZERO SPAM GUARANTEE</span>
        </div>
      </div>
    </form>
  );
};
