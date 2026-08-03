'use client';

import React, { useState } from 'react';
import { AuthCard, Input, Button } from '@photomagic/ui';
import { forgotPasswordAction } from '@photomagic/auth';
import Link from 'next/link';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg('');
    setSuccessMsg('');

    const res = await forgotPasswordAction(email);
    setIsLoading(false);

    if (!res.success) {
      setErrorMsg(res.error.message);
      return;
    }

    setSuccessMsg('Reset link sent! Please check your email inbox.');
  };

  return (
    <AuthCard
      title="Reset Password"
      subtitle="Enter your email to receive password recovery instructions"
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {errorMsg && (
          <div className="p-3 rounded-md bg-status-error/10 border border-status-error/20 text-status-error text-xs font-medium text-center">
            {errorMsg}
          </div>
        )}
        {successMsg && (
          <div className="p-3 rounded-md bg-status-success/10 border border-status-success/20 text-status-success text-xs font-medium text-center">
            {successMsg}
          </div>
        )}

        <Input
          label="Email Address"
          type="email"
          placeholder="eleanor@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <Button variant="primary" size="lg" className="w-full mt-2" disabled={isLoading}>
          {isLoading ? 'Sending Instructions...' : 'Send Recovery Email'}
        </Button>

        <div className="text-center mt-4">
          <Link href="/login" className="text-xs font-medium text-gold-500 hover:underline">
            ← Back to Sign In
          </Link>
        </div>
      </form>
    </AuthCard>
  );
}
