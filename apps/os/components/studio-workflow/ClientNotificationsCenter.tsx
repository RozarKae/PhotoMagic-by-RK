'use client';

import React, { useState } from 'react';
import { Card, Badge, Button, Input } from '@photomagic/ui';
import {
  Bell,
  Mail,
  MessageSquare,
  Smartphone,
  Send,
  CheckCircle2,
  Clock,
  AlertCircle,
  Filter,
  Sparkles,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import { ClientNotificationV9 } from '@photomagic/config';

const INITIAL_NOTIFICATIONS: ClientNotificationV9[] = [
  {
    id: 'notif-101',
    projectId: 'proj-udr-901',
    clientName: 'Vikram & Ananya Sharma',
    clientContact: '+91 98290 12345 / vikram.ananya@gmail.com',
    triggerEvent: 'booking_confirmation',
    channels: ['email', 'whatsapp', 'in_app'],
    notificationStatus: 'delivered',
    messageBody:
      'Your Royal Wedding Photography booking with PhotoMagic Studio is officially confirmed!',
    sentAt: '2026-07-31 10:15 AM',
  },
  {
    id: 'notif-102',
    projectId: 'proj-udr-902',
    clientName: 'Rahul & Priya Verma',
    clientContact: '+91 98111 54321 / rahul.v@vermagroup.com',
    triggerEvent: 'payment_received',
    channels: ['email', 'sms', 'in_app'],
    notificationStatus: 'delivered',
    messageBody: 'Advance payment of ₹1,50,000 received with GST 18% tax invoice attached.',
    sentAt: '2026-07-31 11:30 AM',
  },
  {
    id: 'notif-103',
    projectId: 'proj-udr-903',
    clientName: 'Siddharth & Meera Kapoor',
    clientContact: '+91 99000 88776 / meera.k@studio.com',
    triggerEvent: 'gallery_ready',
    channels: ['email', 'whatsapp', 'in_app'],
    notificationStatus: 'delivered',
    messageBody:
      'Your Web Proofing Gallery with 450 high-res RAW photos is ready for AI selection!',
    sentAt: '2026-07-31 12:45 PM',
  },
  {
    id: 'notif-104',
    projectId: 'proj-udr-904',
    clientName: 'Aditya & Riya Singhania',
    clientContact: '+91 97654 32109 / aditya.s@singhaniacorp.com',
    triggerEvent: 'album_ready',
    channels: ['email', 'in_app'],
    notificationStatus: 'delivered',
    messageBody: 'Your 3D Spatial Wedding Album digital proofing draft is ready for review.',
    sentAt: '2026-07-31 01:20 PM',
  },
  {
    id: 'notif-105',
    projectId: 'proj-udr-905',
    clientName: 'Karan & Natasha Mehta',
    clientContact: '+91 98765 00011 / karan.mehta@techcorp.io',
    triggerEvent: 'revision_requested',
    channels: ['in_app', 'email'],
    notificationStatus: 'sent',
    messageBody:
      'Album Spread #14 edit request logged: Object removal requested for background glare.',
    sentAt: '2026-07-31 02:00 PM',
  },
  {
    id: 'notif-106',
    projectId: 'proj-udr-906',
    clientName: 'Devansh & Ishita Roy',
    clientContact: '+91 99123 45678 / devansh.roy@gmail.com',
    triggerEvent: 'album_approved',
    channels: ['whatsapp', 'email', 'in_app'],
    notificationStatus: 'delivered',
    messageBody:
      'Congratulations! Your 12x18 Metallic Gold Album proof has been digitally signed & approved.',
    sentAt: '2026-07-31 02:15 PM',
  },
  {
    id: 'notif-107',
    projectId: 'proj-udr-907',
    clientName: 'Manish & Shweta Gupta',
    clientContact: '+91 98333 22110 / shweta.gupta@outdoors.com',
    triggerEvent: 'printing_started',
    channels: ['sms', 'in_app'],
    notificationStatus: 'delivered',
    messageBody:
      'Print Lab Dispatch: Your premium silk album is now printing at the Jaipur Print Lab.',
    sentAt: '2026-07-31 02:40 PM',
  },
  {
    id: 'notif-108',
    projectId: 'proj-udr-908',
    clientName: 'Rohan & Tanvi Bajaj',
    clientContact: '+91 98888 77665 / rohan.bajaj@luxury.in',
    triggerEvent: 'delivery_ready',
    channels: ['email', 'whatsapp', 'in_app'],
    notificationStatus: 'delivered',
    messageBody:
      'Final Master Deliverables (8K Films & High-Res RAW ZIPs) ready for PIN-protected download!',
    sentAt: '2026-07-31 03:00 PM',
  },
  {
    id: 'notif-109',
    projectId: 'proj-udr-909',
    clientName: 'Yash & Kavya Joshi',
    clientContact: '+91 98999 44332 / yash.joshi@designstudio.io',
    triggerEvent: 'review_request',
    channels: ['whatsapp', 'email'],
    notificationStatus: 'pending',
    messageBody:
      'Thank you for choosing PhotoMagic Studio! Please leave a 5-star review to earn 10% credit.',
    sentAt: '2026-07-31 03:30 PM',
  },
];

const TRIGGER_LABELS: Record<string, { label: string; color: string }> = {
  booking_confirmation: {
    label: 'Booking Confirmation',
    color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  },
  payment_received: {
    label: 'Payment Received',
    color: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  },
  gallery_ready: {
    label: 'Gallery Ready',
    color: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  },
  album_ready: {
    label: 'Album Ready',
    color: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  },
  revision_requested: {
    label: 'Revision Requested',
    color: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
  },
  album_approved: {
    label: 'Album Approved',
    color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  },
  printing_started: {
    label: 'Printing Started',
    color: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
  },
  delivery_ready: {
    label: 'Delivery Ready',
    color: 'bg-gold-500/10 text-gold-400 border-gold-500/20',
  },
  review_request: {
    label: 'Review Request',
    color: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
  },
};

export const ClientNotificationsCenter: React.FC = () => {
  const [notifications, setNotifications] = useState<ClientNotificationV9[]>(INITIAL_NOTIFICATIONS);
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [testClientName, setTestClientName] = useState<string>('Rohan & Pooja Agrawal');
  const [testTrigger, setTestTrigger] = useState<string>('delivery_ready');

  const filteredNotifications =
    selectedFilter === 'all'
      ? notifications
      : notifications.filter((n) => n.triggerEvent === selectedFilter);

  const handleDispatchInstantNotification = () => {
    const newNotif: ClientNotificationV9 = {
      id: `notif-${Date.now()}`,
      projectId: `proj-udr-${Math.floor(100 + Math.random() * 900)}`,
      clientName: testClientName,
      clientContact: '+91 99887 66554 / client@photomagic.app',
      triggerEvent: testTrigger as any,
      channels: ['email', 'whatsapp', 'in_app'],
      notificationStatus: 'delivered',
      messageBody: `Instant trigger dispatched for ${testTrigger.replace('_', ' ').toUpperCase()}. Delivered across 3 channels.`,
      sentAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setNotifications([newNotif, ...notifications]);
  };

  return (
    <Card
      variant="elevated"
      className="p-6 border border-border-subtle bg-surface-elevated flex flex-col gap-6"
    >
      {/* Title & Stats */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border-subtle pb-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-gold-500/10 text-gold-500 border border-gold-500/20">
            <Bell size={24} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-text-primary">
                Phase 9.6 — Client Notifications Center
              </h2>
              <Badge variant="gold">4 Channels</Badge>
            </div>
            <p className="text-xs text-text-secondary mt-0.5">
              Automated multi-channel client messaging: Email, SMS, WhatsApp, and In-App
              notifications.
            </p>
          </div>
        </div>

        {/* Channel Health Badges */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-base border border-border-subtle text-xs text-emerald-400">
            <Mail size={14} /> Resend Email: <strong className="text-text-primary">Active</strong>
          </span>
          <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-base border border-border-subtle text-xs text-emerald-400">
            <Smartphone size={14} /> Twilio SMS:{' '}
            <strong className="text-text-primary">Active</strong>
          </span>
          <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-base border border-border-subtle text-xs text-emerald-400">
            <MessageSquare size={14} /> WhatsApp Cloud:{' '}
            <strong className="text-text-primary">Active</strong>
          </span>
        </div>
      </div>

      {/* Trigger Dispatch Test Sandbox */}
      <div className="p-4 rounded-xl bg-surface-base border border-border-subtle flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 flex-1">
          <Input
            value={testClientName}
            onChange={(e) => setTestClientName(e.target.value)}
            placeholder="Client Name"
            className="sm:w-64"
          />
          <select
            value={testTrigger}
            onChange={(e) => setTestTrigger(e.target.value)}
            className="bg-surface-elevated text-text-primary text-sm px-3 py-2 rounded-lg border border-border-subtle focus:outline-none focus:border-gold-500"
          >
            <option value="booking_confirmation">Booking Confirmation</option>
            <option value="payment_received">Payment Received</option>
            <option value="gallery_ready">Gallery Ready</option>
            <option value="album_ready">Album Ready</option>
            <option value="revision_requested">Revision Requested</option>
            <option value="album_approved">Album Approved</option>
            <option value="printing_started">Printing Started</option>
            <option value="delivery_ready">Delivery Ready</option>
            <option value="review_request">Review Request</option>
          </select>
        </div>

        <Button
          variant="primary"
          onClick={handleDispatchInstantNotification}
          className="flex items-center gap-2 font-bold whitespace-nowrap"
        >
          <Zap size={16} /> Instant Dispatch Notification
        </Button>
      </div>

      {/* Trigger Event Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        <button
          onClick={() => setSelectedFilter('all')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
            selectedFilter === 'all'
              ? 'bg-gold-500/20 text-gold-500 border border-gold-500/30'
              : 'bg-surface-base text-text-secondary hover:text-text-primary'
          }`}
        >
          All Triggers ({notifications.length})
        </button>
        {Object.entries(TRIGGER_LABELS).map(([key, config]) => (
          <button
            key={key}
            onClick={() => setSelectedFilter(key)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all border ${
              selectedFilter === key
                ? 'bg-gold-500/20 text-gold-500 border-gold-500/40'
                : 'bg-surface-base text-text-secondary border-border-subtle hover:text-text-primary'
            }`}
          >
            {config.label}
          </button>
        ))}
      </div>

      {/* Notification Activity Table */}
      <div className="overflow-x-auto border border-border-subtle rounded-xl bg-surface-base">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-border-subtle text-xs text-text-tertiary uppercase tracking-wider bg-surface-elevated/50">
              <th className="py-3 px-4">Client & Project</th>
              <th className="py-3 px-4">Trigger Event</th>
              <th className="py-3 px-4">Delivery Channels</th>
              <th className="py-3 px-4">Message Snippet</th>
              <th className="py-3 px-4">Sent Time</th>
              <th className="py-3 px-4 text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-subtle text-sm">
            {filteredNotifications.map((n) => {
              const triggerMeta = TRIGGER_LABELS[n.triggerEvent] || {
                label: n.triggerEvent,
                color: 'bg-surface-base text-text-primary border-border-subtle',
              };

              return (
                <tr key={n.id} className="hover:bg-surface-elevated/30 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="flex flex-col">
                      <span className="font-semibold text-text-primary">{n.clientName}</span>
                      <span className="text-xs text-text-tertiary">{n.clientContact}</span>
                    </div>
                  </td>

                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-block px-2.5 py-1 rounded-md text-xs font-semibold border ${triggerMeta.color}`}
                    >
                      {triggerMeta.label}
                    </span>
                  </td>

                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-1.5">
                      {n.channels.includes('email') && (
                        <span className="p-1 rounded bg-blue-500/10 text-blue-400 title='Email'">
                          <Mail size={14} />
                        </span>
                      )}
                      {n.channels.includes('sms') && (
                        <span className="p-1 rounded bg-purple-500/10 text-purple-400 title='SMS'">
                          <Smartphone size={14} />
                        </span>
                      )}
                      {n.channels.includes('whatsapp') && (
                        <span className="p-1 rounded bg-emerald-500/10 text-emerald-400 title='WhatsApp'">
                          <MessageSquare size={14} />
                        </span>
                      )}
                      {n.channels.includes('in_app') && (
                        <span className="p-1 rounded bg-amber-500/10 text-amber-400 title='In-App'">
                          <Bell size={14} />
                        </span>
                      )}
                    </div>
                  </td>

                  <td className="py-3.5 px-4 max-w-xs truncate text-xs text-text-secondary">
                    {n.messageBody}
                  </td>

                  <td className="py-3.5 px-4 text-xs text-text-tertiary whitespace-nowrap">
                    {n.sentAt}
                  </td>

                  <td className="py-3.5 px-4 text-right">
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-400">
                      <CheckCircle2 size={14} /> Delivered
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Card>
  );
};
