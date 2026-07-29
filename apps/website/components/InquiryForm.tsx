'use client';

import React, { useState } from 'react';
import { Input, Select, Button, Alert } from '@photomagic/ui';

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
      <Alert variant="success" title="Inquiry Received Successfully!">
        Thank you, {clientName}. Our concierge team will reach out within 24 hours to schedule your
        private consultation.
      </Alert>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {errorMsg && <Alert variant="error">{errorMsg}</Alert>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Your Full Name *"
          placeholder="Eleanor Vance"
          value={clientName}
          onChange={(e) => setClientName(e.target.value)}
          required
        />
        <Input
          label="Email Address *"
          type="email"
          placeholder="eleanor@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Phone Number"
          type="tel"
          placeholder="+1 (555) 000-0000"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <Input
          label="Target Event Date"
          type="date"
          value={eventDate}
          onChange={(e) => setEventDate(e.target.value)}
        />
      </div>

      <Select
        label="Event / Shoot Category *"
        value={eventType}
        onChange={setEventType}
        options={[
          { label: 'Royal Wedding Photography & Cinema', value: 'wedding' },
          { label: 'Luxury Studio Portraiture', value: 'portrait' },
          { label: 'Commercial & Fashion Editorial', value: 'commercial' },
          { label: 'Destination Event Coverage', value: 'destination' },
        ]}
      />

      <div className="flex flex-col gap-1.5 text-left">
        <label className="text-xs font-medium text-text-secondary">
          Special Requests / Vision Details
        </label>
        <textarea
          rows={4}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Tell us about your venue, aesthetic preferences, or specific shot list ideas..."
          className="w-full rounded-md bg-surface-base p-3 text-sm text-text-primary placeholder:text-text-tertiary border border-border-subtle focus:outline-none focus:ring-2 focus:ring-gold-500 transition-all"
        />
      </div>

      <Button variant="primary" size="lg" className="w-full mt-2" disabled={isSubmitting}>
        {isSubmitting ? 'Submitting Inquiry...' : 'Submit Priority Consultation Request'}
      </Button>
    </form>
  );
};
