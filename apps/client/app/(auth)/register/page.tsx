'use client';

import React, { useState } from 'react';
import { AuthCard, Input, Button, Badge } from '@photomagic/ui';
import { registerAction, evaluatePasswordStrength } from '@photomagic/auth';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const strength = evaluatePasswordStrength(password);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg('');

    const res = await registerAction({ fullName, email, password });
    setIsLoading(false);

    if (!res.success) {
      setErrorMsg(res.error.message);
      return;
    }

    router.push('/portal');
  };

  return (
    <AuthCard
      title="Create Client Account"
      subtitle="Join PhotoMagic Studio OS for exclusive event proofing"
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {errorMsg && (
          <div className="p-3 rounded-md bg-status-error/10 border border-status-error/20 text-status-error text-xs font-medium text-center">
            {errorMsg}
          </div>
        )}

        <Input
          label="Full Name"
          type="text"
          placeholder="Eleanor Vance"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />

        <Input
          label="Email Address"
          type="email"
          placeholder="eleanor@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <div className="flex flex-col gap-1.5">
          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {/* Password Strength Bar */}
          {password.length > 0 && (
            <div className="flex flex-col gap-1 mt-1">
              <div className="flex justify-between items-center text-xs">
                <span className="text-text-tertiary">Password Strength:</span>
                <span className="font-medium text-gold-500">{strength.label}</span>
              </div>
              <div className="h-1.5 w-full bg-surface-elevated rounded-full overflow-hidden flex gap-1">
                <div
                  className={`h-full transition-all duration-300 ${
                    strength.score >= 1 ? 'bg-status-error w-1/4' : 'bg-transparent'
                  }`}
                />
                <div
                  className={`h-full transition-all duration-300 ${
                    strength.score >= 2 ? 'bg-status-warning w-1/4' : 'bg-transparent'
                  }`}
                />
                <div
                  className={`h-full transition-all duration-300 ${
                    strength.score >= 3 ? 'bg-status-info w-1/4' : 'bg-transparent'
                  }`}
                />
                <div
                  className={`h-full transition-all duration-300 ${
                    strength.score >= 4 ? 'bg-status-success w-1/4' : 'bg-transparent'
                  }`}
                />
              </div>
            </div>
          )}
        </div>

        <Button variant="primary" size="lg" className="w-full mt-2" disabled={isLoading}>
          {isLoading ? 'Creating Account...' : 'Complete Registration'}
        </Button>

        <div className="text-center mt-4">
          <span className="text-xs text-text-tertiary">Already have an account? </span>
          <Link href="/login" className="text-xs font-medium text-gold-500 hover:underline">
            Sign In Here
          </Link>
        </div>
      </form>
    </AuthCard>
  );
}
