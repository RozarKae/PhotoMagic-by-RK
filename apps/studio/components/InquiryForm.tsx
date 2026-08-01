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
      <div className="p-8 rounded-2xl luxury-glass border border-amber-500/40 flex flex-col gap-5 text-center items-center">
        <div className="w-16 h-16 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30 flex items-center justify-center shadow-[0_0_25px_rgba(212,175,55,0.2)]">
          <CheckCircle2 size={36} />
        </div>
        <h3 className="text-2xl sm:text-3xl font-bold font-heading text-white">
          Inquiry Received, {clientName}
        </h3>
        <p className="text-sm text-gray-300 leading-relaxed max-w-md font-light">
          Thank you for reaching out to PhotoMagic Studio. Our Lead Director will personally review
          your event availability and contact you within 4 hours.
        </p>
        <div className="flex items-center gap-2 text-xs text-amber-400 font-mono pt-4 border-t border-amber-500/20 w-full justify-center">
          <Clock size={14} /> Priority Concierge Response Guarantee: Under 4 Hours
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 text-left">
      {errorMsg && <Alert variant="error">{errorMsg}</Alert>}

      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-amber-500/20">
        <div className="flex items-center gap-2.5">
          <Sparkles size={18} className="text-amber-400" />
          <h3 className="text-base font-heading font-semibold text-white">
            Private Studio Concierge Inquiry
          </h3>
        </div>
        <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
          4-Hour Response SLA
        </span>
      </div>

      {/* Step 01: Personal Details */}
      <div className="flex flex-col gap-3">
        <span className="text-[10px] font-bold text-amber-400 uppercase tracking-[0.22em] font-nav">
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
            className="bg-black/60 border-amber-500/20 focus:border-amber-400 text-white rounded-xl text-xs"
          />
          <Input
            label="Email Address *"
            type="email"
            placeholder="eleanor@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            data-analytics="input-email"
            className="bg-black/60 border-amber-500/20 focus:border-amber-400 text-white rounded-xl text-xs"
          />
        </div>
      </div>

      {/* Step 02: Event Details */}
      <div className="flex flex-col gap-3">
        <span className="text-[10px] font-bold text-amber-400 uppercase tracking-[0.22em] font-nav">
          02. Event & Milestone Details
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Phone Number"
            type="tel"
            placeholder="+1 (555) 000-0000"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            data-analytics="input-phone"
            className="bg-black/60 border-amber-500/20 focus:border-amber-400 text-white rounded-xl text-xs"
          />
          <Input
            label="Target Event Date"
            type="date"
            value={eventDate}
            onChange={(e) => setEventDate(e.target.value)}
            data-analytics="input-event-date"
            className="bg-black/60 border-amber-500/20 focus:border-amber-400 text-white rounded-xl text-xs"
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
          className="bg-black/60 border-amber-500/20 focus:border-amber-400 text-white rounded-xl font-sans text-xs"
        />
      </div>

      {/* Step 03: Vision Notes */}
      <div className="flex flex-col gap-2">
        <span className="text-[10px] font-bold text-amber-400 uppercase tracking-[0.22em] font-nav">
          03. Creative Vision & Venue Specifications
        </span>
        <textarea
          rows={3}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Share your venue location, aesthetic vision, or special family requests..."
          className="w-full rounded-xl bg-black/60 p-4 text-xs text-white placeholder:text-gray-500 border border-amber-500/20 focus:outline-none focus:ring-1 focus:ring-amber-400 focus:border-amber-400 transition-all font-sans"
        />
      </div>

      {/* Submit Action */}
      <div className="flex flex-col gap-3 pt-2">
        <Button
          variant="primary"
          size="lg"
          className="w-full font-nav text-xs font-bold uppercase tracking-[0.25em] bg-gradient-to-r from-amber-500 via-[#F8F3E6] to-amber-400 text-black border border-amber-300/40 shadow-[0_0_25px_rgba(212,175,55,0.3)] hover:shadow-[0_0_35px_rgba(212,175,55,0.5)] transition-all duration-300 flex items-center justify-center gap-3 py-4"
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

        <div className="flex items-center justify-center gap-2 font-mono text-[10px] text-gray-400 pt-1">
          <ShieldCheck size={12} className="text-amber-400" />
          <span>CONFIDENTIAL CONCIERGE CHANNEL • ZERO SPAM GUARANTEE</span>
        </div>
      </div>
    </form>
  );
};
