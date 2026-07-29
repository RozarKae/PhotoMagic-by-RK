'use client';

import React, { useState } from 'react';
import { Card, Badge, Button } from '@photomagic/ui';
import { User, Mail, Phone, MapPin, Calendar, ShieldCheck, Lock, FileText, Activity } from 'lucide-react';

export default function ClientProfilePage() {
  const [name, setName] = useState('Eleanor Vance');
  const [email, setEmail] = useState('eleanor.vance@example.com');
  const [phone, setPhone] = useState('+91 98765 43210');
  const [city, setCity] = useState('Udaipur, Rajasthan');

  return (
    <main className="p-8 max-w-[1600px] mx-auto flex flex-col gap-8 pb-24">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <Badge variant="gold">Phase C11 Client Portal</Badge>
          <h1 className="text-3xl font-extrabold text-text-primary mt-1">Client Profile & Account Management</h1>
          <p className="text-sm text-text-secondary">Manage your personal information, read-only event details, security settings, and legal booking documents.</p>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="primary" className="flex items-center gap-2">
            <User size={16} /> Save Profile Changes
          </Button>
        </div>
      </div>

      {/* Profile Header Summary */}
      <Card variant="glass" className="p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-gold-500/20 border-2 border-gold-500 flex items-center justify-center font-extrabold text-gold-500 text-xl">
            EV
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-extrabold text-text-primary">{name}</h2>
              <Badge variant="gold">Verified Client</Badge>
            </div>
            <span className="text-xs text-text-secondary">Royal Udaipur Destination Wedding (Jul 2026)</span>
            <span className="text-[10px] text-text-tertiary font-mono">Client ID: CLT-UDPR-2026-088</span>
          </div>
        </div>

        <div className="flex flex-col text-right text-xs">
          <span className="text-text-tertiary">Member Since</span>
          <span className="font-bold text-gold-500 font-mono text-sm">July 2026</span>
        </div>
      </Card>

      {/* Personal Info Form & Read-Only Event Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card variant="glass" className="p-6 flex flex-col gap-4 text-xs">
          <h3 className="text-sm font-bold text-text-primary border-b border-border-subtle pb-2">Personal Contact Details</h3>
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <label className="font-semibold text-text-secondary">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full h-9 px-3 rounded-lg bg-surface-base border border-border-subtle text-xs text-text-primary font-mono focus:outline-none"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-semibold text-text-secondary">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-9 px-3 rounded-lg bg-surface-base border border-border-subtle text-xs text-text-primary font-mono focus:outline-none"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-semibold text-text-secondary">Mobile Number</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full h-9 px-3 rounded-lg bg-surface-base border border-border-subtle text-xs text-text-primary font-mono focus:outline-none"
              />
            </div>
          </div>
        </Card>

        <Card variant="glass" className="p-6 flex flex-col gap-4 text-xs">
          <h3 className="text-sm font-bold text-text-primary border-b border-border-subtle pb-2">Event & Package Details (Read-Only)</h3>
          <div className="flex flex-col gap-2.5">
            <div className="flex justify-between items-center p-2.5 rounded-lg bg-surface-base border border-border-subtle">
              <span className="text-text-tertiary">Event Name</span>
              <span className="font-bold text-text-primary">Eleanor & Julian Royal Wedding</span>
            </div>
            <div className="flex justify-between items-center p-2.5 rounded-lg bg-surface-base border border-border-subtle">
              <span className="text-text-tertiary">Venue Location</span>
              <span className="font-bold text-gold-500">City Palace, Udaipur (India)</span>
            </div>
            <div className="flex justify-between items-center p-2.5 rounded-lg bg-surface-base border border-border-subtle">
              <span className="text-text-tertiary">Selected Package</span>
              <span className="font-bold text-text-primary">Royal Destination Package ($9,000)</span>
            </div>
            <div className="flex justify-between items-center p-2.5 rounded-lg bg-surface-base border border-border-subtle">
              <span className="text-text-tertiary">Lead Photographer</span>
              <span className="font-bold text-text-primary">Vikram Sethi (Master Photographer)</span>
            </div>
          </div>
        </Card>
      </div>
    </main>
  );
}
