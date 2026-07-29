'use client';

import React, { useState } from 'react';
import { AuthCard, Input, Button } from '@photomagic/ui';
import { evaluatePasswordStrength } from '@photomagic/auth';
import { useRouter } from 'next/navigation';

export default function ResetPasswordPage() {
  const router = useRouter();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const strength = evaluatePasswordStrength(newPassword);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setErrorMsg('Passwords do not match.');
      return;
    }

    setIsLoading(true);
    setErrorMsg('');

    // Mock reset submission
    setTimeout(() => {
      setIsLoading(false);
      router.push('/login');
    }, 1000);
  };

  return (
    <AuthCard
      title="Set New Password"
      subtitle="Choose a secure password for your PhotoMagic account"
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {errorMsg && (
          <div className="p-3 rounded-md bg-status-error/10 border border-status-error/20 text-status-error text-xs font-medium text-center">
            {errorMsg}
          </div>
        )}

        <Input
          label="New Password"
          type="password"
          placeholder="••••••••"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />

        {newPassword.length > 0 && (
          <div className="text-xs text-text-secondary flex justify-between">
            <span>Strength:</span>
            <span className="font-semibold text-gold-500">{strength.label}</span>
          </div>
        )}

        <Input
          label="Confirm New Password"
          type="password"
          placeholder="••••••••"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        <Button variant="primary" size="lg" className="w-full mt-2" disabled={isLoading}>
          {isLoading ? 'Updating Password...' : 'Save New Password'}
        </Button>
      </form>
    </AuthCard>
  );
}
