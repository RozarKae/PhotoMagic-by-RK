'use client';

import React, { useState } from 'react';
import { Card, Button, Input, Avatar, Badge } from '@photomagic/ui';
import { useAuth } from '@photomagic/auth';

export default function ProfilePage() {
  const { session } = useAuth();
  const [fullName, setFullName] = useState(session?.fullName || 'Eleanor Vance');
  const [email] = useState(session?.email || 'eleanor@example.com');
  const [savedMsg, setSavedMsg] = useState('');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedMsg('Profile updated successfully.');
    setTimeout(() => setSavedMsg(''), 3000);
  };

  return (
    <main className="p-8 max-w-4xl mx-auto flex flex-col gap-8">
      <div>
        <Badge variant="gold">Account & Security</Badge>
        <h1 className="text-3xl font-bold text-text-primary mt-1">User Profile</h1>
        <p className="text-sm text-text-secondary">
          Manage your client credentials, avatar, and security settings.
        </p>
      </div>

      <Card variant="glass" className="p-8">
        <form onSubmit={handleSave} className="flex flex-col gap-6">
          {savedMsg && (
            <div className="p-3 rounded-md bg-status-success/10 border border-status-success/20 text-status-success text-xs font-medium text-center">
              {savedMsg}
            </div>
          )}

          {/* Avatar Section */}
          <div className="flex items-center gap-6 pb-6 border-b border-border-subtle">
            <Avatar name={fullName} size="lg" />
            <div className="flex flex-col gap-2">
              <span className="text-sm font-semibold text-text-primary">{fullName}</span>
              <div className="flex gap-2">
                <Button variant="secondary" size="sm">
                  Upload New Avatar
                </Button>
                <Button variant="ghost" size="sm">
                  Remove
                </Button>
              </div>
            </div>
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
            <Input label="Email Address" value={email} disabled />
          </div>

          <div className="flex justify-end mt-4">
            <Button variant="primary" type="submit">
              Save Changes
            </Button>
          </div>
        </form>
      </Card>
    </main>
  );
}
