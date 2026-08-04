'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Lock, ShieldCheck } from 'lucide-react';
import { loginAction } from '@photomagic/auth';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';

export default function ClientLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [rememberMe, setRememberMe] = useState(true);

  const osUrl = process.env.NEXT_PUBLIC_OS_URL || 'http://localhost:3001';

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setAuthError(null);

    const res = await loginAction({ email, password });

    if (!res.success) {
      setAuthError(
        res.error.message || 'Invalid login credentials. Please check your email and password.',
      );
      setIsSubmitting(false);
      return;
    }

    if (!('user' in res.data)) {
      setIsSubmitting(false);
      return;
    }

    const { user, sessionToken } = res.data;
    const maxAge = rememberMe ? 86400 * 30 : 86400; // 30 days vs 1 day persistence

    // Set real Supabase session token and user metadata cookies
    document.cookie = `photomagic_os_session=${sessionToken}; path=/; max-age=${maxAge}; SameSite=Lax`;
    document.cookie = `photomagic_user_role=${user.role}; path=/; max-age=${maxAge}; SameSite=Lax`;
    document.cookie = `photomagic_user_email=${encodeURIComponent(user.email)}; path=/; max-age=${maxAge}; SameSite=Lax`;

    const targetPath =
      user.role === 'client'
        ? '/portal'
        : user.role === 'photographer' || user.role === 'editor'
          ? '/gallery'
          : '/dashboard';
    window.location.href = `${osUrl}${targetPath}`;
  };

  return (
    <main className="min-h-screen bg-[#070709] text-white flex flex-col justify-between selection:bg-amber-400 selection:text-black">
      <Navbar />

      <section className="relative pt-36 pb-20 px-6 max-w-md mx-auto w-full flex-grow flex flex-col justify-center">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-400 mb-4">
            <Lock size={20} />
          </div>
          <span className="font-nav text-[10px] uppercase tracking-[0.25em] text-amber-400 block font-medium">
            Secure Atelier Portal Access
          </span>
          <h1 className="font-serif text-3xl font-light text-white mt-2">PhotoMagic OS Login</h1>
          <p className="text-gray-400 text-sm font-light mt-2">
            Enter your credentials to access your private client gallery, album studio, and shoot
            deliverables.
          </p>
        </div>

        <form
          onSubmit={handleLoginSubmit}
          className="space-y-5 bg-[#0B0B0E] p-8 border border-white/10 shadow-2xl"
        >
          {authError && (
            <div className="p-3 rounded bg-red-500/10 border border-red-500/30 text-red-300 text-xs font-mono">
              {authError}
            </div>
          )}
          <div>
            <label className="block font-nav text-[10px] uppercase tracking-[0.2em] text-gray-400 mb-2">
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="client@domain.com"
              className="w-full bg-[#070709] border border-white/15 px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-amber-400 transition-colors"
            />
          </div>

          <div>
            <label className="block font-nav text-[10px] uppercase tracking-[0.2em] text-gray-400 mb-2">
              Passcode / Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full bg-[#070709] border border-white/15 px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-amber-400 transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full font-nav text-xs uppercase tracking-[0.25em] bg-gradient-to-r from-amber-400 via-[#F8F3E6] to-amber-300 text-black py-3.5 font-semibold hover:shadow-[0_0_25px_rgba(212,175,55,0.4)] transition-all flex items-center justify-center gap-2"
          >
            <span>{isSubmitting ? 'Authenticating...' : 'Access PhotoMagic OS'}</span>
            <ArrowRight size={14} />
          </button>

          <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <ShieldCheck size={13} className="text-amber-400" />
              <span>Encrypted Session</span>
            </span>
            <a href={`${osUrl}`} className="text-amber-400 hover:underline">
              Direct OS Portal &rarr;
            </a>
          </div>
        </form>
      </section>

      <Footer />
    </main>
  );
}
