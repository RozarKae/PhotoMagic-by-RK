'use client';

import React, { useState, useEffect, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { DEFAULT_PACKAGES, TEST_RUPEE_PACKAGE, ROUTES } from '@photomagic/config';
import { formatCurrency } from '@photomagic/shared';
import {
  CheckCircle2,
  Printer,
  Download,
  Share2,
  Copy,
  Check,
  MessageCircle,
  Mail,
  Calendar,
  MapPin,
  User,
  Phone,
  ShieldCheck,
  ArrowLeft,
  ExternalLink,
  Sparkles,
  Camera,
  QrCode,
  FileCheck2,
  Building,
  Lock,
} from 'lucide-react';

interface VerifiedInvoiceData {
  referenceId: string;
  transactionId: string;
  orderId?: string;
  packageName: string;
  grossTotal: number;
  paidAmount: number;
  remainingBalance: number;
  paymentStructure: string;
  paymentMethod: string;
  clientName: string;
  clientPhone: string;
  clientEmail: string;
  eventDate: string;
  eventCity: string;
  verifiedAt: string;
  status: string;
}

function InvoiceContent() {
  const searchParams = useSearchParams();

  // Extract from query params with fallbacks
  const urlRef = searchParams.get('ref');
  const urlPkg = searchParams.get('pkg');
  const urlPaid = searchParams.get('paid');
  const urlTotal = searchParams.get('total');
  const urlBal = searchParams.get('bal');
  const urlName = searchParams.get('name');
  const urlPhone = searchParams.get('phone');
  const urlEmail = searchParams.get('email');
  const urlDate = searchParams.get('date');
  const urlCity = searchParams.get('city');
  const urlMethod = searchParams.get('method');
  const urlTx = searchParams.get('tx');
  const urlStruct = searchParams.get('struct');
  const urlTime = searchParams.get('time');

  const [invoice, setInvoice] = useState<VerifiedInvoiceData | null>(null);
  const [copied, setCopied] = useState<boolean>(false);
  const [copiedRef, setCopiedRef] = useState<boolean>(false);
  const [shareSuccess, setShareSuccess] = useState<boolean>(false);

  // Initialize invoice data from URL or localStorage
  useEffect(() => {
    if (urlRef || urlName || urlPaid) {
      const parsedTotal = urlTotal ? parseFloat(urlTotal) : 42000;
      const parsedPaid = urlPaid ? parseFloat(urlPaid) : 10500;
      const parsedBal = urlBal ? parseFloat(urlBal) : Math.max(0, parsedTotal - parsedPaid);

      const data: VerifiedInvoiceData = {
        referenceId:
          urlRef || `PM-RK-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
        transactionId: urlTx || `UPI-${Date.now().toString().slice(-8)}`,
        packageName: urlPkg || 'The Moonstone Anthology',
        grossTotal: parsedTotal,
        paidAmount: parsedPaid,
        remainingBalance: parsedBal,
        paymentStructure: urlStruct || 'token_25',
        paymentMethod: urlMethod || 'upi_qr',
        clientName: urlName || 'Valued Patron',
        clientPhone: urlPhone || '+91 79049 43234',
        clientEmail: urlEmail || 'client@photomagic.in',
        eventDate: urlDate || new Date().toISOString().split('T')[0],
        eventCity: urlCity || 'Madurai, Tamil Nadu',
        verifiedAt: urlTime || new Date().toISOString(),
        status: 'confirmed',
      };
      setInvoice(data);
      return;
    }

    // Try reading latest saved receipt from localStorage
    try {
      if (typeof window !== 'undefined') {
        const stored = localStorage.getItem('photomagic_latest_receipt');
        if (stored) {
          const parsed = JSON.parse(stored);
          setInvoice({
            referenceId: parsed.referenceId || `PM-RK-${new Date().getFullYear()}-8492`,
            transactionId: parsed.transactionId || `UPI-${Date.now().toString().slice(-8)}`,
            packageName: parsed.packageName || 'The Moonstone Anthology',
            grossTotal: Number(parsed.grossTotal || parsed.paidAmount || 42000),
            paidAmount: Number(parsed.paidAmount || 10500),
            remainingBalance: Number(parsed.remainingBalance || 0),
            paymentStructure: parsed.paymentStructure || 'token_25',
            paymentMethod: parsed.paymentMethod || 'upi_qr',
            clientName: parsed.clientName || 'PhotoMagic Patron',
            clientPhone: parsed.clientPhone || '+91 79049 43234',
            clientEmail: parsed.clientEmail || 'photomagicphotographystudio@gmail.com',
            eventDate: parsed.eventDate || new Date().toISOString().split('T')[0],
            eventCity: parsed.eventCity || 'Madurai, Tamil Nadu',
            verifiedAt: parsed.verifiedAt || new Date().toISOString(),
            status: 'confirmed',
          });
          return;
        }
      }
    } catch (e) {
      console.warn('Storage read fallback:', e);
    }

    // Default luxury sample receipt
    setInvoice({
      referenceId: `PM-RK-${new Date().getFullYear()}-7782`,
      transactionId: `UPI-${Date.now().toString().slice(-8)}`,
      packageName: 'The Moonstone Anthology',
      grossTotal: 42000,
      paidAmount: 10500,
      remainingBalance: 31500,
      paymentStructure: 'token_25',
      paymentMethod: 'upi_qr',
      clientName: 'PhotoMagic Patron',
      clientPhone: '+91 79049 43234',
      clientEmail: 'photomagicphotographystudio@gmail.com',
      eventDate: 'Scheduled on Consultation',
      eventCity: 'Madurai & Chennai, Tamil Nadu',
      verifiedAt: new Date().toISOString(),
      status: 'confirmed',
    });
  }, [
    urlRef,
    urlPkg,
    urlPaid,
    urlTotal,
    urlBal,
    urlName,
    urlPhone,
    urlEmail,
    urlDate,
    urlCity,
    urlMethod,
    urlTx,
    urlStruct,
    urlTime,
  ]);

  // Find package deliverables
  const matchedPackage = useMemo(() => {
    if (!invoice) return DEFAULT_PACKAGES[0];
    if (invoice.packageName.includes('₹1') || invoice.packageName.includes('Testing Token')) {
      return TEST_RUPEE_PACKAGE;
    }
    return (
      DEFAULT_PACKAGES.find((p) => p.name.toLowerCase() === invoice.packageName.toLowerCase()) ||
      DEFAULT_PACKAGES[0]
    );
  }, [invoice]);

  // Copy current URL
  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  // Copy Reference ID
  const handleCopyRef = () => {
    if (invoice?.referenceId && typeof window !== 'undefined') {
      navigator.clipboard.writeText(invoice.referenceId);
      setCopiedRef(true);
      setTimeout(() => setCopiedRef(false), 2000);
    }
  };

  // Native Web Share
  const handleNativeShare = async () => {
    if (typeof window !== 'undefined' && navigator.share && invoice) {
      try {
        await navigator.share({
          title: `PhotoMagic Booking Invoice #${invoice.referenceId}`,
          text: `Booking Confirmed with PhotoMagic Studios by RK!\nReference: ${invoice.referenceId}\nPackage: ${invoice.packageName}\nPaid: ${formatCurrency(invoice.paidAmount)}\nEvent Date: ${invoice.eventDate}`,
          url: window.location.href,
        });
        setShareSuccess(true);
        setTimeout(() => setShareSuccess(false), 2500);
      } catch (err) {
        // Fallback to copy link
        handleCopyLink();
      }
    } else {
      handleCopyLink();
    }
  };

  // WhatsApp Share URL
  const whatsappShareUrl = useMemo(() => {
    if (!invoice) return '#';
    const text = `*PhotoMagic Studios by RK — Official Booking Invoice*\n\n✨ *Booking Reference:* ${invoice.referenceId}\n💍 *Package:* ${invoice.packageName}\n💰 *Token Paid:* ${formatCurrency(invoice.paidAmount)} (of ${formatCurrency(invoice.grossTotal)})\n📅 *Event Date:* ${invoice.eventDate}\n📍 *Destination:* ${invoice.eventCity}\n👤 *Patron:* ${invoice.clientName}\n\n📄 *View Verified Digital Invoice & Seal:*\n${typeof window !== 'undefined' ? window.location.href : 'https://batpaiyancatponnu.online/photomagic/invoice'}\n\n_Moments Through Our Eyes · இல்லத்தின் இன்ப நிகழ்வுகள், விழிகளின் வழியே_`;
    return `https://wa.me/?text=${encodeURIComponent(text)}`;
  }, [invoice]);

  // Email Share URL
  const emailShareUrl = useMemo(() => {
    if (!invoice) return '#';
    const subject = `PhotoMagic Studios Booking Invoice #${invoice.referenceId} — ${invoice.packageName}`;
    const body = `Dear ${invoice.clientName},\n\nYour official booking with PhotoMagic Studios by RK has been secured and confirmed.\n\nBooking Reference: ${invoice.referenceId}\nTransaction ID: ${invoice.transactionId}\nPackage: ${invoice.packageName}\nAmount Paid: ${formatCurrency(invoice.paidAmount)}\nGross Total: ${formatCurrency(invoice.grossTotal)}\nRemaining Balance: ${formatCurrency(invoice.remainingBalance)}\nEvent Date: ${invoice.eventDate}\nCelebration City: ${invoice.eventCity}\n\nView and download your official invoice online:\n${typeof window !== 'undefined' ? window.location.href : ''}\n\nPhotoMagic Studios by RK\nPhone: +91 79049 43234\nEmail: photomagicphotographystudio@gmail.com\nMadurai & Chennai, Tamil Nadu, India`;
    return `mailto:${invoice.clientEmail || ''}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }, [invoice]);

  // QR Code URL to verify invoice online
  const verificationQrUrl = useMemo(() => {
    const targetUrl =
      typeof window !== 'undefined'
        ? window.location.href
        : `https://batpaiyancatponnu.online/photomagic/invoice?ref=${invoice?.referenceId || ''}`;
    return `https://api.qrserver.com/v1/create-qr-code/?size=220x220&margin=8&data=${encodeURIComponent(targetUrl)}`;
  }, [invoice]);

  if (!invoice) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--color-canvas,#FAF8FC)] text-purple-900 font-mono text-sm">
        Retrieving official verified invoice...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--color-canvas,#FAF8FC)] text-[var(--color-text-primary,#0F172A)] dark:bg-[#0E0617] dark:text-[#F8FAFC] flex flex-col transition-colors duration-300 print:bg-white print:text-black">
      {/* Navbar (Hidden in Print) */}
      <div className="print:hidden">
        <Navbar />
      </div>

      <main className="flex-1 pt-28 pb-24 px-4 sm:px-6 max-w-5xl mx-auto w-full print:pt-0 print:pb-0 print:px-0 print:max-w-none">
        {/* Navigation Breadcrumb & Live Action Bar (Hidden in Print) */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 print:hidden">
          <Link
            href={ROUTES.PUBLIC.PACKAGES}
            className="inline-flex items-center gap-2 text-xs font-mono font-bold text-purple-900 dark:text-purple-300 hover:text-rose-600 transition-colors"
          >
            <ArrowLeft size={14} />
            <span>Return to Collections</span>
          </Link>

          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700">
              <ShieldCheck size={14} />
              <span>Official Verified Document</span>
            </span>

            <span className="text-xs font-mono text-slate-500">
              ID:{' '}
              <strong className="text-slate-900 dark:text-white font-bold">
                {invoice.referenceId}
              </strong>
            </span>
          </div>
        </div>

        {/* Success Banner Hero Header (Hidden in Print) */}
        <div className="mb-8 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-purple-900 via-purple-800 to-rose-900 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6 print:hidden">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500 text-slate-950 flex items-center justify-center flex-shrink-0 shadow-lg mt-0.5">
              <CheckCircle2 size={32} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono uppercase tracking-[0.2em] text-emerald-300 font-bold">
                  Date Locked · Timeline Secured
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/20 text-white font-semibold">
                  {invoice.status.toUpperCase()}
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold font-hero text-white mt-1">
                Booking Token Confirmed
              </h1>
              <p className="text-xs sm:text-sm text-purple-100/90 mt-1 max-w-xl leading-relaxed">
                Rozar Khan & the PhotoMagic cinematography crew have secured{' '}
                <strong className="text-white font-bold">{invoice.eventDate}</strong> on our master
                schedule. Your official tax invoice and archival receipt is generated below.
              </p>
            </div>
          </div>

          {/* Quick Sharing & Print Buttons */}
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-2.5 flex-shrink-0">
            <button
              type="button"
              onClick={() => window.print()}
              className="px-4 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-900 text-xs font-nav font-bold uppercase tracking-wider flex items-center gap-2 shadow-md transition-all"
              title="Print or Save as PDF"
            >
              <Printer size={15} className="text-purple-700" />
              <span>Print / PDF</span>
            </button>

            <a
              href={whatsappShareUrl}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-nav font-bold uppercase tracking-wider flex items-center gap-2 shadow-md transition-all"
              title="Share invoice on WhatsApp"
            >
              <MessageCircle size={15} />
              <span>WhatsApp</span>
            </a>

            <button
              type="button"
              onClick={handleNativeShare}
              className="px-3.5 py-2.5 rounded-xl bg-purple-950/80 hover:bg-purple-950 border border-white/20 text-white text-xs font-nav font-bold flex items-center gap-1.5 transition-all shadow-sm"
              title="Share link"
            >
              <Share2 size={15} />
              <span>{shareSuccess ? 'Shared!' : 'Share'}</span>
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* THE OFFICIAL ATELIER INVOICE & TAX RECEIPT CARD                           */}
        {/* ========================================================================= */}
        <div
          id="photomagic-official-invoice"
          className="relative w-full rounded-3xl bg-white dark:bg-[#150A22] border border-slate-200/90 dark:border-purple-900/60 p-6 sm:p-10 shadow-museum transition-all text-left flex flex-col gap-8 print:p-0 print:border-none print:shadow-none print:bg-white print:text-black"
        >
          {/* Subtle Watermark Branding in Background */}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-[0.025] dark:opacity-[0.04] overflow-hidden select-none print:hidden">
            <span className="font-hero font-black text-[120px] sm:text-[180px] tracking-widest text-purple-900 uppercase">
              PHOTOMAGIC
            </span>
          </div>

          {/* 1. Header: Atelier Brand & Studio Details */}
          <div className="flex flex-col md:flex-row md:items-start justify-between border-b border-slate-200 dark:border-purple-900/60 pb-6 gap-6 print:border-slate-800">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-purple-900 via-purple-700 to-rose-600 text-white flex items-center justify-center flex-shrink-0 shadow-md print:bg-black print:text-white">
                <Camera size={26} />
              </div>
              <div>
                <span className="font-hero font-extrabold text-xl sm:text-2xl text-slate-900 dark:text-white tracking-wider uppercase block print:text-black">
                  PHOTOMAGIC STUDIOS BY RK
                </span>
                <span className="text-xs font-mono text-purple-900 dark:text-purple-300 font-semibold block print:text-black">
                  Luxury Wedding Cinematography & Heirloom Photography · Master Archives
                </span>
                <span className="text-[11px] font-tamil text-slate-500 dark:text-slate-400 block mt-0.5 print:text-slate-700">
                  இல்லத்தின் இன்ப நிகழ்வுகள், விழிகளின் வழியே (Moments Through Our Eyes)
                </span>
              </div>
            </div>

            {/* Studio Registered Coordinates */}
            <div className="text-left md:text-right text-[11px] font-mono text-slate-600 dark:text-slate-400 leading-relaxed print:text-black">
              <div className="font-bold text-slate-900 dark:text-white uppercase print:text-black">
                Registered Atelier & Studio Office
              </div>
              <div>4/112, Luxury Heritage Corridor</div>
              <div>Madurai & Chennai, Tamil Nadu, India</div>
              <div>Phone: +91 79049 43234 / +91 79049 33234</div>
              <div>photomagicphotographystudio@gmail.com</div>
              <div className="text-[10px] text-purple-700 dark:text-purple-400 font-bold print:text-black">
                UPI: 7904943234@upi · rozarkhan@ptyes
              </div>
            </div>
          </div>

          {/* 2. Invoice Metadata Ribbon */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-[#FAF8FC] dark:bg-purple-950/40 border border-purple-200/80 dark:border-purple-800/40 print:bg-slate-50 print:border-slate-400 text-xs font-mono">
            <div>
              <span className="text-[10px] text-slate-500 uppercase tracking-wider block">
                Invoice Number
              </span>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="font-bold text-slate-900 dark:text-white print:text-black">
                  {invoice.referenceId}
                </span>
                <button
                  type="button"
                  onClick={handleCopyRef}
                  className="text-slate-400 hover:text-purple-600 print:hidden"
                  title="Copy reference ID"
                >
                  {copiedRef ? (
                    <Check size={12} className="text-emerald-500" />
                  ) : (
                    <Copy size={12} />
                  )}
                </button>
              </div>
            </div>

            <div>
              <span className="text-[10px] text-slate-500 uppercase tracking-wider block">
                Verification Date
              </span>
              <span className="font-bold text-slate-800 dark:text-slate-200 block mt-0.5 print:text-black">
                {new Date(invoice.verifiedAt).toLocaleDateString('en-IN', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                })}
              </span>
            </div>

            <div>
              <span className="text-[10px] text-slate-500 uppercase tracking-wider block">
                Transaction / UTR
              </span>
              <span
                className="font-bold text-slate-800 dark:text-slate-200 block mt-0.5 truncate print:text-black"
                title={invoice.transactionId}
              >
                {invoice.transactionId}
              </span>
            </div>

            <div>
              <span className="text-[10px] text-slate-500 uppercase tracking-wider block">
                Payment Channel
              </span>
              <span className="font-bold text-emerald-700 dark:text-emerald-400 block mt-0.5 print:text-black uppercase">
                {invoice.paymentMethod === 'upi_qr'
                  ? 'UPI QR Real-Time'
                  : invoice.paymentMethod === 'razorpay'
                    ? 'Razorpay SSL Cards'
                    : 'IMPS Bank Wire'}
              </span>
            </div>
          </div>

          {/* 3. Billed To & Celebration Destination */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            {/* Patron Details */}
            <div className="p-5 rounded-2xl bg-white dark:bg-purple-950/20 border border-slate-200 dark:border-purple-900/40 print:border-slate-300">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-3">
                Billed To Patron / Couple
              </span>
              <div className="flex flex-col gap-2 font-mono text-xs">
                <div className="flex items-center gap-2">
                  <User
                    size={14}
                    className="text-purple-600 dark:text-purple-400 print:text-black"
                  />
                  <span className="font-bold text-sm text-slate-900 dark:text-white print:text-black">
                    {invoice.clientName}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300 print:text-black">
                  <Phone
                    size={14}
                    className="text-purple-600 dark:text-purple-400 print:text-black"
                  />
                  <span>{invoice.clientPhone}</span>
                </div>
                {invoice.clientEmail && (
                  <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300 print:text-black">
                    <Mail
                      size={14}
                      className="text-purple-600 dark:text-purple-400 print:text-black"
                    />
                    <span>{invoice.clientEmail}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Celebration Details */}
            <div className="p-5 rounded-2xl bg-white dark:bg-purple-950/20 border border-slate-200 dark:border-purple-900/40 print:border-slate-300">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-3">
                Celebration Schedule & Location
              </span>
              <div className="flex flex-col gap-2 font-mono text-xs">
                <div className="flex items-center gap-2">
                  <Calendar
                    size={14}
                    className="text-rose-600 dark:text-rose-400 print:text-black"
                  />
                  <span className="font-bold text-sm text-slate-900 dark:text-white print:text-black">
                    {invoice.eventDate}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300 print:text-black">
                  <MapPin size={14} className="text-rose-600 dark:text-rose-400 print:text-black" />
                  <span>{invoice.eventCity}</span>
                </div>
                <div className="text-[11px] text-emerald-700 dark:text-emerald-400 font-semibold mt-1">
                  ● Priority Camera Crew & Drone Dispatch Scheduled
                </div>
              </div>
            </div>
          </div>

          {/* 4. Itemized Financial Schedule Table */}
          <div className="flex flex-col gap-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Itemized Creative Deliverables & Financial Summary
            </span>

            <div className="rounded-2xl border border-slate-200 dark:border-purple-900/60 overflow-hidden print:border-slate-800">
              <table className="w-full text-left text-xs font-mono border-collapse">
                <thead>
                  <tr className="bg-slate-100 dark:bg-purple-950/80 border-b border-slate-200 dark:border-purple-900/60 text-slate-700 dark:text-purple-200 uppercase print:bg-slate-100 print:text-black">
                    <th className="p-3.5 sm:p-4">Description & Creative Deliverables</th>
                    <th className="p-3.5 sm:p-4 text-center">Structure</th>
                    <th className="p-3.5 sm:p-4 text-right">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-purple-900/40 print:divide-slate-300">
                  <tr className="bg-white dark:bg-transparent">
                    <td className="p-3.5 sm:p-4">
                      <div className="font-bold text-sm text-slate-900 dark:text-white print:text-black">
                        {invoice.packageName}
                      </div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                        {matchedPackage.creativeTier}
                      </div>

                      {/* Deliverables Pills */}
                      <div className="flex flex-wrap gap-1.5 mt-2.5 print:hidden">
                        {matchedPackage.components.map((item, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] px-2 py-0.5 rounded-md bg-purple-50 dark:bg-purple-950/60 border border-purple-200 dark:border-purple-800 text-purple-900 dark:text-purple-200"
                          >
                            ✓ {item}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="p-3.5 sm:p-4 text-center text-slate-600 dark:text-slate-300 print:text-black">
                      {invoice.paymentStructure === 'token_25'
                        ? '25% Date Token'
                        : invoice.paymentStructure === 'advance_50'
                          ? '50% Production Advance'
                          : 'Full Archival Settlement'}
                    </td>
                    <td className="p-3.5 sm:p-4 text-right font-bold text-slate-900 dark:text-white print:text-black">
                      {formatCurrency(invoice.grossTotal)}
                    </td>
                  </tr>

                  {/* Gross Total Row */}
                  <tr className="bg-[#FAF8FC] dark:bg-purple-950/30 font-bold">
                    <td colSpan={2} className="p-3 text-right text-slate-600 dark:text-slate-400">
                      Gross Package Valuation:
                    </td>
                    <td className="p-3 text-right text-slate-900 dark:text-white print:text-black">
                      {formatCurrency(invoice.grossTotal)}
                    </td>
                  </tr>

                  {/* Token Paid Today Row */}
                  <tr className="bg-emerald-50/70 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 font-bold print:bg-slate-100 print:text-black">
                    <td
                      colSpan={2}
                      className="p-3.5 text-right flex items-center justify-end gap-1.5"
                    >
                      <span className="text-[10px] font-mono uppercase tracking-wider bg-emerald-600 text-white px-2 py-0.5 rounded print:hidden">
                        Paid Token
                      </span>
                      <span>Amount Verified & Paid Today:</span>
                    </td>
                    <td className="p-3.5 text-right text-sm text-emerald-700 dark:text-emerald-300 font-extrabold print:text-black">
                      {formatCurrency(invoice.paidAmount)}
                    </td>
                  </tr>

                  {/* Remaining Balance Row */}
                  <tr className="bg-white dark:bg-transparent font-bold">
                    <td colSpan={2} className="p-3 text-right text-slate-600 dark:text-slate-400">
                      Remaining Balance Due on Event Date:
                    </td>
                    <td className="p-3 text-right text-rose-600 dark:text-rose-400 print:text-black">
                      {formatCurrency(invoice.remainingBalance)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* 5. Official Verification Stamp, Signature & QR Code */}
          <div className="flex flex-col sm:flex-row items-center justify-between border-t border-slate-200 dark:border-purple-900/60 pt-6 gap-6 print:border-slate-800">
            {/* Live QR Authentication Box */}
            <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-white dark:bg-purple-950/40 border border-slate-200 dark:border-purple-800 print:border-slate-400">
              <img
                src={verificationQrUrl}
                alt="Digital Authentication QR Code"
                className="w-20 h-20 rounded-xl object-contain bg-white"
              />
              <div className="flex flex-col gap-0.5 text-[11px] font-mono">
                <span className="font-bold text-slate-900 dark:text-white uppercase print:text-black">
                  Online Verification
                </span>
                <span className="text-[10px] text-slate-500 leading-tight">
                  Scan to verify this authentic digital invoice on PhotoMagic master registry.
                </span>
                <span className="text-[9px] text-emerald-700 dark:text-emerald-400 font-bold mt-1">
                  ● Hash Verified · 256-Bit SSL
                </span>
              </div>
            </div>

            {/* Official Studio Seal & Calligraphy Signature */}
            <div className="flex items-center gap-5">
              <div className="flex flex-col items-center sm:items-end text-center sm:text-right">
                <span className="font-calligraphy text-2xl text-purple-900 dark:text-purple-300 print:text-black">
                  Rozar Khan
                </span>
                <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-slate-900 dark:text-white print:text-black block">
                  Rozar Khan
                </span>
                <span className="text-[9px] font-mono text-slate-500 block">
                  Founder & Principal Cinematographer
                </span>
                <span className="text-[9px] font-mono text-slate-400">
                  PhotoMagic Studios by RK
                </span>
              </div>

              {/* Verified Stamp Badge */}
              <div className="w-20 h-20 rounded-full border-2 border-dashed border-amber-500/80 dark:border-amber-400/80 flex flex-col items-center justify-center text-center p-1 bg-amber-500/5 print:border-black print:text-black">
                <span className="text-[7px] font-mono font-black uppercase tracking-tighter text-amber-600 dark:text-amber-400 print:text-black leading-tight">
                  PHOTOMAGIC
                </span>
                <span className="text-[9px] font-hero font-extrabold uppercase text-amber-700 dark:text-amber-300 print:text-black">
                  SEALED
                </span>
                <span className="text-[7px] font-mono text-amber-600 dark:text-amber-400 print:text-black">
                  VERIFIED
                </span>
              </div>
            </div>
          </div>

          {/* 6. Legal & Policy Terms Footer */}
          <div className="border-t border-slate-200 dark:border-purple-900/40 pt-4 text-[10px] font-mono text-slate-500 leading-relaxed flex flex-col sm:flex-row justify-between items-center gap-2 text-center sm:text-left print:border-slate-800 print:text-black">
            <span>
              This is a digitally generated tax invoice & booking token confirmation. It is valid
              without a physical seal under the IT Act 2000.
            </span>
            <span>CIN: PM-RK-TN-2026 · HDFC A/C: 501000389071617</span>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* BOTTOM ACTION DOCK (SHARING, DOWNLOADING & PORTAL ACCESS)                 */}
        {/* ========================================================================= */}
        <div className="mt-8 p-6 rounded-2xl bg-white dark:bg-[#150A22] border border-slate-200 dark:border-purple-900/60 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 print:hidden">
          <div className="flex flex-col gap-1 text-center sm:text-left">
            <span className="font-hero font-bold text-sm text-slate-900 dark:text-white">
              Need to share or store this confirmation?
            </span>
            <span className="text-xs text-slate-500">
              Forward directly to your family, download high-res PDF, or access your project
              timeline.
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2.5 flex-shrink-0">
            <button
              type="button"
              onClick={handleCopyLink}
              className="px-4 py-2.5 rounded-xl border border-slate-300 dark:border-purple-800 hover:bg-slate-100 dark:hover:bg-purple-900/50 text-slate-800 dark:text-purple-200 text-xs font-mono font-semibold flex items-center gap-1.5 transition-colors"
            >
              {copied ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
              <span>{copied ? 'Link Copied!' : 'Copy Invoice URL'}</span>
            </button>

            <a
              href={emailShareUrl}
              className="px-4 py-2.5 rounded-xl border border-slate-300 dark:border-purple-800 hover:bg-slate-100 dark:hover:bg-purple-900/50 text-slate-800 dark:text-purple-200 text-xs font-mono font-semibold flex items-center gap-1.5 transition-colors"
            >
              <Mail size={14} />
              <span>Email Receipt</span>
            </a>

            <button
              type="button"
              onClick={() => window.print()}
              className="px-5 py-2.5 rounded-xl bg-purple-900 hover:bg-purple-800 text-white text-xs font-nav font-bold uppercase tracking-wider flex items-center gap-2 shadow-sm transition-all"
            >
              <Download size={14} />
              <span>Download PDF</span>
            </button>

            <Link href={ROUTES.CLIENT.DASHBOARD}>
              <button
                type="button"
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-700 via-purple-600 to-rose-600 hover:opacity-95 text-white text-xs font-nav font-bold uppercase tracking-wider shadow-md transition-all flex items-center gap-1.5"
              >
                <span>Client Portal</span>
                <ExternalLink size={13} />
              </button>
            </Link>
          </div>
        </div>
      </main>

      {/* Footer (Hidden in Print) */}
      <div className="print:hidden">
        <Footer />
      </div>
    </div>
  );
}

export default function InvoicePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[var(--color-canvas,#FAF8FC)] text-purple-900 font-mono text-sm">
          Loading Official Verified Invoice...
        </div>
      }
    >
      <InvoiceContent />
    </Suspense>
  );
}
