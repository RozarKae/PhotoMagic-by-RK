'use client';

import React, { useState } from 'react';
import { AuthCard, Input, Button, Badge } from '@photomagic/ui';
import { loginAction } from '@photomagic/auth';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [useMagicLink, setUseMagicLink] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg('');
    setSuccessMsg('');

    const res = await loginAction({ email, password, useMagicLink });
    setIsLoading(false);

    if (!res.success) {
      setErrorMsg(res.error.message);
      return;
    }

    if (useMagicLink) {
      setSuccessMsg('Check your inbox! We sent you a magic login link.');
    } else {
      router.push('/portal');
    }
  };

  return (
    <AuthCard title="Welcome Back" subtitle="Access your private event portal & proofing galleries">
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

        {!useMagicLink && (
          <div className="flex flex-col gap-1">
            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div className="flex justify-end">
              <Link href="/forgot-password" className="text-xs text-gold-500 hover:underline">
                Forgot password?
              </Link>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between py-2">
          <span className="text-xs text-text-secondary">Or sign in passwordless</span>
          <button
            type="button"
            onClick={() => setUseMagicLink(!useMagicLink)}
            className="text-xs font-medium text-gold-500 hover:underline"
          >
            {useMagicLink ? 'Use Password Instead' : 'Send Magic Link'}
          </button>
        </div>

        <Button variant="primary" size="lg" className="w-full mt-2" disabled={isLoading}>
          {isLoading ? 'Authenticating...' : useMagicLink ? 'Send Magic Link' : 'Sign In'}
        </Button>

        <div className="text-center mt-4">
          <span className="text-xs text-text-tertiary">Don't have an account? </span>
          <Link href="/register" className="text-xs font-medium text-gold-500 hover:underline">
            Register Here
          </Link>
        </div>
      </form>
    </AuthCard>
  );
}
