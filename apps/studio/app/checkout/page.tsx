'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { PaymentGateway } from '@photomagic/ui';
import { Lock, ArrowLeft, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import { ROUTES } from '@photomagic/config';

function CheckoutContent() {
  const searchParams = useSearchParams();
  const packageId = searchParams.get('package') || 'pkg-obsidian';
  const customName = searchParams.get('customName') || undefined;
  const customPriceStr = searchParams.get('customPrice');
  const customPrice = customPriceStr ? parseInt(customPriceStr, 10) : undefined;
  const addonsParam = searchParams.get('addons');
  const selectedAddons = addonsParam ? addonsParam.split(',').filter(Boolean) : [];
  const eventDate = searchParams.get('date') || '';
  const eventCity = searchParams.get('city') || 'Chennai';
  const clientName = searchParams.get('name') || '';
  const clientPhone = searchParams.get('phone') || '';
  const clientEmail = searchParams.get('email') || '';

  return (
    <div className="min-h-screen bg-[var(--color-canvas,#FAF8FC)] text-[var(--color-text-primary,#111827)] flex flex-col transition-colors duration-300">
      <Navbar />

      <main className="flex-1 pt-32 pb-24 px-4 sm:px-6 max-w-7xl mx-auto w-full">
        {/* Breadcrumb & Navigation */}
        <div className="mb-8 flex items-center justify-between">
          <Link
            href={ROUTES.PUBLIC.PACKAGES}
            className="inline-flex items-center gap-2 text-xs font-mono font-bold text-purple-900 dark:text-purple-300 hover:text-rose-600 transition-colors"
          >
            <ArrowLeft size={14} />
            <span>Return to Collections</span>
          </Link>

          <div className="flex items-center gap-2 text-[11px] font-mono font-semibold text-emerald-800 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-3 py-1 rounded-full border border-emerald-200 dark:border-emerald-800">
            <ShieldCheck size={13} />
            <span>Secure 256-Bit SSL Checkout</span>
          </div>
        </div>

        {/* Payment Gateway Component */}
        <PaymentGateway
          packageId={packageId}
          customPackageName={customName}
          customPackagePrice={customPrice}
          selectedAddons={selectedAddons}
          eventDate={eventDate}
          eventCity={eventCity}
          initialClientName={clientName}
          initialClientPhone={clientPhone}
          initialClientEmail={clientEmail}
        />
      </main>

      <Footer />
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[#FAF8FC] text-purple-900 font-mono text-sm">
          Loading Secure Payment Gateway...
        </div>
      }
    >
      <CheckoutContent />
    </Suspense>
  );
}
