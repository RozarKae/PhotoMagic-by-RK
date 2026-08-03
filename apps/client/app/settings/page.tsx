'use client';

import React, { useState } from 'react';
import { Card, Badge, Button } from '@photomagic/ui';
import { Settings, Moon, Globe, Bell, Shield, Smartphone, HardDrive } from 'lucide-react';

export default function ClientSettingsPage() {
  const [theme, setTheme] = useState('dark');
  const [language, setLanguage] = useState('english');
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [inAppAlerts, setInAppAlerts] = useState(true);

  return (
    <main className="p-8 max-w-[1600px] mx-auto flex flex-col gap-8 pb-24">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <Badge variant="gold">Phase C12 Client Portal</Badge>
          <h1 className="text-3xl font-extrabold text-text-primary mt-1">
            Client Settings & Personalization
          </h1>
          <p className="text-sm text-text-secondary">
            Customize portal appearance, language, notification preference channels, accessibility,
            and active device sessions.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Appearance & Language */}
        <Card variant="glass" className="p-6 flex flex-col gap-5 text-xs">
          <h3 className="text-sm font-bold text-text-primary border-b border-border-subtle pb-2">
            Appearance & Language Preferences
          </h3>

          <div className="flex justify-between items-center p-3.5 rounded-xl bg-surface-base border border-border-subtle">
            <div className="flex flex-col">
              <span className="font-bold text-text-primary">Portal Theme</span>
              <span className="text-[10px] text-text-tertiary">
                Luxury Metallic Gold Dark Theme
              </span>
            </div>
            <Badge variant="gold">Dark Mode Active</Badge>
          </div>

          <div className="flex justify-between items-center p-3.5 rounded-xl bg-surface-base border border-border-subtle">
            <div className="flex flex-col">
              <span className="font-bold text-text-primary">Display Language</span>
              <span className="text-[10px] text-text-tertiary">English (UK / India)</span>
            </div>
            <Badge variant="gold">English</Badge>
          </div>
        </Card>

        {/* Notification Channel Preferences */}
        <Card variant="glass" className="p-6 flex flex-col gap-5 text-xs">
          <h3 className="text-sm font-bold text-text-primary border-b border-border-subtle pb-2">
            Notification Channel Preferences
          </h3>

          <div className="flex justify-between items-center p-3.5 rounded-xl bg-surface-base border border-border-subtle">
            <div className="flex flex-col">
              <span className="font-bold text-text-primary">In-App Notification Alerts</span>
              <span className="text-[10px] text-text-tertiary">
                Instant alerts when gallery or album proof updates
              </span>
            </div>
            <Button
              variant={inAppAlerts ? 'primary' : 'secondary'}
              size="sm"
              onClick={() => setInAppAlerts(!inAppAlerts)}
            >
              {inAppAlerts ? 'Enabled' : 'Disabled'}
            </Button>
          </div>

          <div className="flex justify-between items-center p-3.5 rounded-xl bg-surface-base border border-border-subtle">
            <div className="flex flex-col">
              <span className="font-bold text-text-primary">Email Notifications</span>
              <span className="text-[10px] text-text-tertiary">
                Transactional invoice receipts and studio notes
              </span>
            </div>
            <Button
              variant={emailAlerts ? 'primary' : 'secondary'}
              size="sm"
              onClick={() => setEmailAlerts(!emailAlerts)}
            >
              {emailAlerts ? 'Enabled' : 'Disabled'}
            </Button>
          </div>
        </Card>
      </div>

      {/* Active Device Sessions & Storage Usage */}
      <Card variant="glass" className="p-6 flex flex-col gap-4 text-xs">
        <h3 className="text-sm font-bold text-text-primary border-b border-border-subtle pb-2">
          Active Session Security & Storage Summary
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-3.5 rounded-xl bg-surface-base border border-border-subtle flex flex-col gap-1">
            <span className="font-semibold text-text-tertiary">Current Active Device</span>
            <span className="font-bold text-text-primary text-xs">
              Chrome on Windows 11 (IP 103.42.18.9)
            </span>
            <span className="text-[10px] text-status-success font-mono">Active Session</span>
          </div>

          <div className="p-3.5 rounded-xl bg-surface-base border border-border-subtle flex flex-col gap-1">
            <span className="font-semibold text-text-tertiary">Cloudflare R2 Storage</span>
            <span className="font-bold text-gold-500 text-xs">14.8 GB Delivered Storage Used</span>
            <span className="text-[10px] text-text-tertiary font-mono">Lifetime Retention</span>
          </div>
        </div>
      </Card>
    </main>
  );
}
