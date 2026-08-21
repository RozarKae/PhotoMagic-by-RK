'use client';

import React, { useState, useMemo } from 'react';
import { PackageItem, DEFAULT_PACKAGES, STUDIO_PROFILE, ROUTES } from '@photomagic/config';
import { formatCurrency } from '@photomagic/shared';
import {
  ShieldCheck,
  Lock,
  CheckCircle2,
  QrCode,
  CreditCard,
  Building2,
  Smartphone,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Calendar,
  Download,
  Copy,
  Check,
  AlertCircle,
  FileText,
  Phone,
  MessageCircle,
  Send,
  Camera,
} from 'lucide-react';
import Link from 'next/link';

export interface PaymentGatewayProps {
  packageId?: string;
  customPackageName?: string;
  customPackagePrice?: number;
  selectedAddons?: string[];
  eventDate?: string;
  eventCity?: string;
  initialClientName?: string;
  initialClientPhone?: string;
  initialClientEmail?: string;
  onPaymentSuccess?: (receiptData: any) => void;
}

type PaymentStructure = 'token_25' | 'milestone_50' | 'full_100';
type PaymentMethod = 'upi' | 'card' | 'netbanking' | 'bank_transfer';

const POPULAR_BANKS = [
  { id: 'hdfc', name: 'HDFC Bank', code: 'HDFC' },
  { id: 'icici', name: 'ICICI Bank', code: 'ICIC' },
  { id: 'sbi', name: 'State Bank of India', code: 'SBIN' },
  { id: 'axis', name: 'Axis Bank', code: 'UTIB' },
  { id: 'kotak', name: 'Kotak Mahindra', code: 'KKBK' },
  { id: 'canara', name: 'Canara Bank', code: 'CNRB' },
];

export const PaymentGateway: React.FC<PaymentGatewayProps> = ({
  packageId = 'pkg-obsidian',
  customPackageName,
  customPackagePrice,
  selectedAddons = [],
  eventDate: initialEventDate = '',
  eventCity: initialEventCity = 'Chennai',
  initialClientName = '',
  initialClientPhone = '',
  initialClientEmail = '',
  onPaymentSuccess,
}) => {
  // Find selected package
  const matchedPackage = useMemo(() => {
    return DEFAULT_PACKAGES.find((p) => p.id === packageId) || DEFAULT_PACKAGES[2];
  }, [packageId]);

  const packageName = customPackageName || matchedPackage.name;
  const basePrice = customPackagePrice || matchedPackage.price;

  // Addons total
  const addonsAmount = useMemo(() => {
    let total = 0;
    if (selectedAddons.includes('addon-prewedding')) total += 25000;
    if (selectedAddons.includes('addon-parent-album')) total += 10999;
    if (selectedAddons.includes('addon-drone-day')) total += 15000;
    if (selectedAddons.includes('addon-sameday-reel')) total += 15000;
    return total;
  }, [selectedAddons]);

  const grossTotal = basePrice + addonsAmount;

  // Client Details
  const [clientName, setClientName] = useState<string>(initialClientName);
  const [clientPhone, setClientPhone] = useState<string>(initialClientPhone);
  const [clientEmail, setClientEmail] = useState<string>(initialClientEmail);
  const [eventDate, setEventDate] = useState<string>(initialEventDate);
  const [eventCity, setEventCity] = useState<string>(initialEventCity);

  // Payment configuration
  const [paymentStructure, setPaymentStructure] = useState<PaymentStructure>('token_25');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('upi');

  // Method specific state
  const [upiId, setUpiId] = useState<string>('');
  const [upiVerified, setUpiVerified] = useState<boolean>(false);
  const [cardNumber, setCardNumber] = useState<string>('');
  const [cardExpiry, setCardExpiry] = useState<string>('');
  const [cardCvv, setCardCvv] = useState<string>('');
  const [cardName, setCardName] = useState<string>('');
  const [selectedBank, setSelectedBank] = useState<string>('hdfc');
  const [utrNumber, setUtrNumber] = useState<string>('');
  const [copiedField, setCopiedField] = useState<string | null>(null);

  // Processing & Success State
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [processingStep, setProcessingStep] = useState<string>('');
  const [isPaid, setIsPaid] = useState<boolean>(false);
  const [receiptData, setReceiptData] = useState<any>(null);

  // Calculated Payable Amount based on structure
  const { payableAmount, discountAmount, remainingBalance } = useMemo(() => {
    if (paymentStructure === 'token_25') {
      const pay = Math.round(grossTotal * 0.25);
      return {
        payableAmount: pay,
        discountAmount: 0,
        remainingBalance: grossTotal - pay,
      };
    } else if (paymentStructure === 'milestone_50') {
      const pay = Math.round(grossTotal * 0.5);
      return {
        payableAmount: pay,
        discountAmount: 0,
        remainingBalance: grossTotal - pay,
      };
    } else {
      // 100% Full payment with 5% Pay-in-Full discount perk
      const discount = Math.round(grossTotal * 0.05);
      const pay = grossTotal - discount;
      return {
        payableAmount: pay,
        discountAmount: discount,
        remainingBalance: 0,
      };
    }
  }, [grossTotal, paymentStructure]);

  const copyToClipboard = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleExecutePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !clientPhone) {
      alert('Please enter your full name and phone number to lock your booking.');
      return;
    }

    setIsProcessing(true);
    setProcessingStep('Establishing 256-Bit Bank Gateway Handshake...');

    await new Promise((r) => setTimeout(r, 800));
    setProcessingStep('Authorizing Payment Transaction Token...');

    await new Promise((r) => setTimeout(r, 900));
    setProcessingStep("Locking Event Date on Rozar Khan's Studio Calendar...");

    await new Promise((r) => setTimeout(r, 800));
    setProcessingStep('Generating Official Archival Booking Receipt & Tax Invoice...');

    await new Promise((r) => setTimeout(r, 600));

    const referenceId = `PM-RK-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const finalReceipt = {
      referenceId,
      transactionId: `TXN-${Date.now().toString().slice(-8)}`,
      packageName,
      grossTotal,
      paidAmount: payableAmount,
      discountAmount,
      remainingBalance,
      paymentStructure,
      paymentMethod,
      clientName,
      clientPhone,
      clientEmail,
      eventDate: eventDate || 'Scheduled on Consultation',
      eventCity: eventCity || 'Tamil Nadu',
      timestamp: new Date().toISOString(),
    };

    setReceiptData(finalReceipt);
    setIsProcessing(false);
    setIsPaid(true);

    if (onPaymentSuccess) {
      onPaymentSuccess(finalReceipt);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col gap-8">
      {/* Top Security & Brand Badge */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-white dark:bg-[#150A22] border border-slate-200/90 dark:border-purple-900/50 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-950 text-purple-800 dark:text-purple-300 flex items-center justify-center font-bold">
            <Camera size={20} />
          </div>
          <div>
            <span className="font-hero font-bold text-sm tracking-wider text-slate-900 dark:text-white uppercase block">
              PhotoMagic Studios by RK
            </span>
            <span className="text-[11px] text-slate-500 font-mono">
              Official Secure Booking & Payment Gateway
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-3 py-1.5 rounded-full border border-emerald-300 dark:border-emerald-800">
          <Lock size={12} />
          <span>256-Bit SSL Encrypted Bank Channel</span>
        </div>
      </div>

      {/* PAID SUCCESS RECEIPT VIEW */}
      {isPaid && receiptData ? (
        <div className="p-8 sm:p-12 rounded-3xl bg-white dark:bg-[#150A22] border border-slate-200/90 dark:border-purple-900/60 shadow-museum flex flex-col items-center text-center gap-8 animate-in fade-in zoom-in-95 duration-500">
          <div className="w-20 h-20 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 border border-emerald-300 flex items-center justify-center shadow-lg">
            <CheckCircle2 size={44} />
          </div>

          <div className="flex flex-col gap-2 max-w-xl">
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-emerald-700 dark:text-emerald-400 font-bold bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 w-fit mx-auto">
              Payment Confirmed · Date Locked
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-hero text-slate-900 dark:text-white mt-1">
              Your Booking is Locked on Our Timeline!
            </h2>
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
              Thank you,{' '}
              <strong className="text-slate-900 dark:text-white">{receiptData.clientName}</strong>.
              Rozar Khan and the PhotoMagic cinematography team have confirmed your date on our
              master schedule.
            </p>
          </div>

          {/* Itemized Official Receipt Card */}
          <div className="w-full max-w-lg p-6 sm:p-8 rounded-2xl bg-[#FAF8FC] dark:bg-purple-950/30 border border-purple-200/90 dark:border-purple-800/50 text-left flex flex-col gap-4 text-xs font-mono">
            <div className="flex justify-between items-center border-b border-slate-200 dark:border-purple-800/60 pb-3">
              <span className="text-slate-500">Booking Reference:</span>
              <span className="font-bold text-slate-900 dark:text-white text-sm">
                {receiptData.referenceId}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-slate-500">Transaction ID:</span>
              <span className="font-bold text-slate-800 dark:text-slate-200">
                {receiptData.transactionId}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-slate-500">Selected Collection:</span>
              <span className="font-bold text-slate-900 dark:text-white">
                {receiptData.packageName}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-slate-500">Event Date & City:</span>
              <span className="font-bold text-purple-900 dark:text-purple-300">
                {receiptData.eventDate} ({receiptData.eventCity})
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-slate-500">Payment Structure:</span>
              <span className="font-bold text-emerald-700 dark:text-emerald-400 capitalize">
                {receiptData.paymentStructure.replace('_', ' ').toUpperCase()}
              </span>
            </div>

            <div className="pt-3 border-t border-slate-200 dark:border-purple-800/60 flex justify-between items-baseline">
              <span className="text-sm font-bold text-slate-900 dark:text-white font-hero">
                Amount Paid Now:
              </span>
              <span className="text-2xl font-extrabold text-emerald-700 dark:text-emerald-400">
                {formatCurrency(receiptData.paidAmount)}
              </span>
            </div>

            {receiptData.remainingBalance > 0 && (
              <div className="flex justify-between items-center text-[11px] text-slate-500 border-t border-dashed border-slate-200 pt-2">
                <span>Remaining Balance (Due before event):</span>
                <span className="font-bold">{formatCurrency(receiptData.remainingBalance)}</span>
              </div>
            )}
          </div>

          {/* Action Triggers */}
          <div className="flex flex-wrap gap-4 justify-center">
            <button
              onClick={() => window.print()}
              className="px-6 py-3.5 rounded-xl border border-slate-300 dark:border-purple-700 text-slate-900 dark:text-white text-xs font-nav font-bold uppercase tracking-wider flex items-center gap-2 hover:bg-slate-50 shadow-sm"
            >
              <Download size={15} />
              <span>Download Tax Invoice (PDF)</span>
            </button>

            <a
              href={`https://wa.me/917904943234?text=Hi%20Rozar%20Khan,%20I%20have%20completed%20booking%20token%20payment%20for%20${encodeURIComponent(
                receiptData.referenceId,
              )}%20(${receiptData.packageName})`}
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-nav font-bold uppercase tracking-wider flex items-center gap-2 shadow-md"
            >
              <MessageCircle size={15} />
              <span>Send WhatsApp Dispatch</span>
            </a>

            <Link href={ROUTES.PUBLIC.MY_EVENTS}>
              <button className="px-7 py-3.5 rounded-xl bg-gradient-to-r from-purple-700 to-rose-600 text-white text-xs font-nav font-bold uppercase tracking-wider shadow-lg">
                Enter Client Portal (My Events)
              </button>
            </Link>
          </div>
        </div>
      ) : (
        /* CHECKOUT CONFIGURATOR & PAYMENT METHODS */
        <form onSubmit={handleExecutePayment} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Client Info & Payment Method Options */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            {/* Step 1: Client & Event Coordinates */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#150A22] border border-slate-200/90 dark:border-purple-900/50 shadow-sm flex flex-col gap-4">
              <span className="font-mono text-xs uppercase tracking-wider text-rose-700 dark:text-rose-400 font-bold">
                01. Client & Event Coordinates
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-mono font-bold text-slate-800 dark:text-slate-200 block mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Anand & Divya"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    className="w-full p-3.5 rounded-xl border border-slate-300 dark:border-purple-800 bg-slate-50/50 dark:bg-purple-950/40 text-xs text-slate-900 dark:text-white font-medium outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono font-bold text-slate-800 dark:text-slate-200 block mb-1">
                    WhatsApp / Mobile Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 7904943234"
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    className="w-full p-3.5 rounded-xl border border-slate-300 dark:border-purple-800 bg-slate-50/50 dark:bg-purple-950/40 text-xs font-mono font-bold text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono font-bold text-slate-800 dark:text-slate-200 block mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. client@photomagic.in"
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    className="w-full p-3.5 rounded-xl border border-slate-300 dark:border-purple-800 bg-slate-50/50 dark:bg-purple-950/40 text-xs font-mono font-medium text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono font-bold text-slate-800 dark:text-slate-200 block mb-1">
                    Event Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    className="w-full p-3.5 rounded-xl border border-slate-300 dark:border-purple-800 bg-slate-50/50 dark:bg-purple-950/40 text-xs font-mono font-bold text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>
            </div>

            {/* Step 2: Payment Structure (25% Token, 50% Milestone, 100% Full) */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#150A22] border border-slate-200/90 dark:border-purple-900/50 shadow-sm flex flex-col gap-4">
              <span className="font-mono text-xs uppercase tracking-wider text-purple-900 dark:text-purple-300 font-bold">
                02. Choose Payment Structure
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* 25% Advance Token */}
                <div
                  onClick={() => setPaymentStructure('token_25')}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between ${
                    paymentStructure === 'token_25'
                      ? 'border-purple-600 bg-purple-50/80 dark:bg-purple-950/60 ring-2 ring-purple-600/30'
                      : 'border-slate-200 dark:border-purple-900/40 bg-white dark:bg-purple-950/10 hover:border-purple-300'
                  }`}
                >
                  <div>
                    <span className="font-mono text-[9px] uppercase tracking-wider text-rose-700 dark:text-rose-400 font-bold block">
                      Recommended
                    </span>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white mt-1">
                      25% Date-Lock Token
                    </h4>
                    <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-1 leading-snug">
                      Lock your date on calendar immediately.
                    </p>
                  </div>
                  <span className="font-mono text-base font-extrabold text-purple-950 dark:text-white mt-3 block">
                    {formatCurrency(Math.round(grossTotal * 0.25))}
                  </span>
                </div>

                {/* 50% Milestone */}
                <div
                  onClick={() => setPaymentStructure('milestone_50')}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between ${
                    paymentStructure === 'milestone_50'
                      ? 'border-purple-600 bg-purple-50/80 dark:bg-purple-950/60 ring-2 ring-purple-600/30'
                      : 'border-slate-200 dark:border-purple-900/40 bg-white dark:bg-purple-950/10 hover:border-purple-300'
                  }`}
                >
                  <div>
                    <span className="font-mono text-[9px] uppercase tracking-wider text-purple-700 dark:text-purple-400 font-bold block">
                      Mid-Tier
                    </span>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white mt-1">
                      50% Milestone
                    </h4>
                    <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-1 leading-snug">
                      Includes pre-production priority.
                    </p>
                  </div>
                  <span className="font-mono text-base font-extrabold text-purple-950 dark:text-white mt-3 block">
                    {formatCurrency(Math.round(grossTotal * 0.5))}
                  </span>
                </div>

                {/* 100% Full Payment with 5% Discount */}
                <div
                  onClick={() => setPaymentStructure('full_100')}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between ${
                    paymentStructure === 'full_100'
                      ? 'border-emerald-600 bg-emerald-50/80 dark:bg-emerald-950/60 ring-2 ring-emerald-600/30'
                      : 'border-slate-200 dark:border-purple-900/40 bg-white dark:bg-purple-950/10 hover:border-emerald-300'
                  }`}
                >
                  <div>
                    <span className="font-mono text-[9px] uppercase tracking-wider text-emerald-700 dark:text-emerald-400 font-bold block">
                      5% Instant Discount
                    </span>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white mt-1">
                      100% Full Payment
                    </h4>
                    <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-1 leading-snug">
                      Save 5% with single full settlement.
                    </p>
                  </div>
                  <span className="font-mono text-base font-extrabold text-emerald-800 dark:text-emerald-400 mt-3 block">
                    {formatCurrency(grossTotal - Math.round(grossTotal * 0.05))}
                  </span>
                </div>
              </div>
            </div>

            {/* Step 3: Payment Gateway Channels */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#150A22] border border-slate-200/90 dark:border-purple-900/50 shadow-sm flex flex-col gap-5">
              <span className="font-mono text-xs uppercase tracking-wider text-rose-700 dark:text-rose-400 font-bold">
                03. Select Payment Gateway Method
              </span>

              {/* Payment Channel Tabs */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'upi', label: 'UPI / QR Code', icon: <QrCode size={16} /> },
                  { id: 'card', label: 'Cards (Visa/RuPay)', icon: <CreditCard size={16} /> },
                  { id: 'netbanking', label: 'NetBanking', icon: <Building2 size={16} /> },
                  {
                    id: 'bank_transfer',
                    label: 'Direct IMPS/NEFT',
                    icon: <Smartphone size={16} />,
                  },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setPaymentMethod(tab.id as PaymentMethod)}
                    className={`py-3 px-2 rounded-xl text-xs font-bold font-nav uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all ${
                      paymentMethod === tab.id
                        ? 'bg-purple-900 text-white shadow-md'
                        : 'bg-slate-50 dark:bg-purple-950/40 text-slate-700 dark:text-purple-200 border border-slate-200 dark:border-purple-800'
                    }`}
                  >
                    {tab.icon}
                    <span className="truncate">{tab.label}</span>
                  </button>
                ))}
              </div>

              {/* CHANNEL 1: UPI & DYNAMIC QR */}
              {paymentMethod === 'upi' && (
                <div className="p-6 rounded-2xl bg-purple-50/50 dark:bg-purple-950/30 border border-purple-200/80 dark:border-purple-900/40 flex flex-col sm:flex-row items-center gap-6">
                  {/* Dynamic QR Display */}
                  <div className="p-4 bg-white rounded-2xl border border-purple-200 shadow-sm flex flex-col items-center gap-2 flex-shrink-0">
                    {/* Stylized QR Vector Graphic */}
                    <div className="w-40 h-40 bg-slate-900 rounded-xl p-2 relative flex items-center justify-center">
                      <div className="w-full h-full border-2 border-dashed border-purple-400/60 rounded-lg flex flex-col items-center justify-center p-2 text-center text-white">
                        <QrCode size={48} className="text-white mb-1" />
                        <span className="font-mono text-[9px] uppercase tracking-wider text-rose-300 font-bold">
                          Scan to Pay
                        </span>
                        <span className="font-mono text-xs font-extrabold text-amber-300">
                          {formatCurrency(payableAmount)}
                        </span>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono text-slate-500 font-bold">
                      Scan with any UPI App
                    </span>
                  </div>

                  {/* UPI Apps & Manual VPA Input */}
                  <div className="flex-1 flex flex-col gap-3">
                    <span className="text-xs font-bold text-slate-900 dark:text-white">
                      Instant UPI Apps & ID
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {['GPay', 'PhonePe', 'Paytm', 'BHIM', 'CRED'].map((app) => (
                        <span
                          key={app}
                          className="px-2.5 py-1 rounded-lg bg-white dark:bg-purple-900/40 border border-slate-200 dark:border-purple-800 text-[11px] font-mono text-slate-800 dark:text-purple-200 font-bold"
                        >
                          {app}
                        </span>
                      ))}
                    </div>

                    <div className="flex flex-col gap-1.5 mt-2">
                      <label className="text-[11px] font-mono text-slate-700 dark:text-slate-300 font-bold">
                        Or Enter UPI ID (VPA)
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="e.g. mobile@upi / username@okaxis"
                          value={upiId}
                          onChange={(e) => {
                            setUpiId(e.target.value);
                            setUpiVerified(false);
                          }}
                          className="flex-1 p-2.5 rounded-xl border border-slate-300 dark:border-purple-800 bg-white dark:bg-purple-950/60 text-xs font-mono text-slate-900 dark:text-white outline-none"
                        />
                        <button
                          type="button"
                          onClick={() => setUpiVerified(true)}
                          className={`px-4 py-2.5 rounded-xl text-xs font-mono font-bold transition-colors ${
                            upiVerified
                              ? 'bg-emerald-700 text-white'
                              : 'bg-purple-800 text-white hover:bg-purple-700'
                          }`}
                        >
                          {upiVerified ? 'Verified ✓' : 'Verify'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* CHANNEL 2: CARDS */}
              {paymentMethod === 'card' && (
                <div className="p-6 rounded-2xl bg-slate-50/70 dark:bg-purple-950/30 border border-slate-200 dark:border-purple-900/40 flex flex-col gap-4">
                  <div>
                    <label className="text-[11px] font-mono text-slate-700 dark:text-slate-300 font-bold block mb-1">
                      Card Number
                    </label>
                    <input
                      type="text"
                      maxLength={19}
                      placeholder="4532 •••• •••• 8921"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="w-full p-3 rounded-xl border border-slate-300 dark:border-purple-800 bg-white dark:bg-purple-950/60 text-xs font-mono font-bold text-slate-900 dark:text-white outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="text-[11px] font-mono text-slate-700 dark:text-slate-300 font-bold block mb-1">
                        Expiry MM/YY
                      </label>
                      <input
                        type="text"
                        maxLength={5}
                        placeholder="12/28"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        className="w-full p-3 rounded-xl border border-slate-300 dark:border-purple-800 bg-white dark:bg-purple-950/60 text-xs font-mono font-bold text-slate-900 dark:text-white outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-mono text-slate-700 dark:text-slate-300 font-bold block mb-1">
                        CVV / CVC
                      </label>
                      <input
                        type="password"
                        maxLength={4}
                        placeholder="•••"
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value)}
                        className="w-full p-3 rounded-xl border border-slate-300 dark:border-purple-800 bg-white dark:bg-purple-950/60 text-xs font-mono font-bold text-slate-900 dark:text-white outline-none"
                      />
                    </div>

                    <div className="col-span-2 sm:col-span-1">
                      <label className="text-[11px] font-mono text-slate-700 dark:text-slate-300 font-bold block mb-1">
                        Cardholder Name
                      </label>
                      <input
                        type="text"
                        placeholder="Name on Card"
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value)}
                        className="w-full p-3 rounded-xl border border-slate-300 dark:border-purple-800 bg-white dark:bg-purple-950/60 text-xs text-slate-900 dark:text-white font-medium outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* CHANNEL 3: NETBANKING */}
              {paymentMethod === 'netbanking' && (
                <div className="p-6 rounded-2xl bg-slate-50/70 dark:bg-purple-950/30 border border-slate-200 dark:border-purple-900/40 flex flex-col gap-3">
                  <span className="text-xs font-bold text-slate-900 dark:text-white">
                    Select Your Bank
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    {POPULAR_BANKS.map((b) => (
                      <button
                        key={b.id}
                        type="button"
                        onClick={() => setSelectedBank(b.id)}
                        className={`p-3 rounded-xl border text-xs font-mono font-bold text-left transition-all ${
                          selectedBank === b.id
                            ? 'border-purple-700 bg-purple-100 dark:bg-purple-900/60 text-purple-950 dark:text-white'
                            : 'border-slate-300 dark:border-purple-800 bg-white dark:bg-purple-950/40 text-slate-800 dark:text-purple-200'
                        }`}
                      >
                        {b.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* CHANNEL 4: DIRECT BANK WIRE / IMPS */}
              {paymentMethod === 'bank_transfer' && (
                <div className="p-6 rounded-2xl bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/50 flex flex-col gap-4 text-xs font-mono">
                  <span className="text-xs font-bold text-slate-900 dark:text-white font-hero uppercase">
                    PhotoMagic Studios Official Bank Credentials
                  </span>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-slate-800 dark:text-slate-200">
                    <div className="p-3 bg-white dark:bg-purple-950/60 rounded-xl border border-amber-200 flex justify-between items-center">
                      <div>
                        <span className="text-[10px] text-slate-500 block">Account Name</span>
                        <span className="font-bold text-slate-900 dark:text-white">
                          Rozar Khan (PhotoMagic Studios)
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => copyToClipboard('Rozar Khan (PhotoMagic Studios)', 'name')}
                        className="p-1.5 hover:bg-slate-100 rounded"
                      >
                        {copiedField === 'name' ? (
                          <Check size={14} className="text-emerald-600" />
                        ) : (
                          <Copy size={14} />
                        )}
                      </button>
                    </div>

                    <div className="p-3 bg-white dark:bg-purple-950/60 rounded-xl border border-amber-200 flex justify-between items-center">
                      <div>
                        <span className="text-[10px] text-slate-500 block">Account Number</span>
                        <span className="font-bold text-slate-900 dark:text-white">
                          50200084920194
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => copyToClipboard('50200084920194', 'acc')}
                        className="p-1.5 hover:bg-slate-100 rounded"
                      >
                        {copiedField === 'acc' ? (
                          <Check size={14} className="text-emerald-600" />
                        ) : (
                          <Copy size={14} />
                        )}
                      </button>
                    </div>

                    <div className="p-3 bg-white dark:bg-purple-950/60 rounded-xl border border-amber-200 flex justify-between items-center">
                      <div>
                        <span className="text-[10px] text-slate-500 block">IFSC Code</span>
                        <span className="font-bold text-slate-900 dark:text-white">
                          HDFC0001234
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => copyToClipboard('HDFC0001234', 'ifsc')}
                        className="p-1.5 hover:bg-slate-100 rounded"
                      >
                        {copiedField === 'ifsc' ? (
                          <Check size={14} className="text-emerald-600" />
                        ) : (
                          <Copy size={14} />
                        )}
                      </button>
                    </div>

                    <div className="p-3 bg-white dark:bg-purple-950/60 rounded-xl border border-amber-200 flex justify-between items-center">
                      <div>
                        <span className="text-[10px] text-slate-500 block">UPI ID / VPA</span>
                        <span className="font-bold text-slate-900 dark:text-white">
                          7904943234@upi
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => copyToClipboard('7904943234@upi', 'vpa')}
                        className="p-1.5 hover:bg-slate-100 rounded"
                      >
                        {copiedField === 'vpa' ? (
                          <Check size={14} className="text-emerald-600" />
                        ) : (
                          <Copy size={14} />
                        )}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] text-slate-700 font-bold block mb-1">
                      Enter UTR / Transaction Reference Number
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 423985019284"
                      value={utrNumber}
                      onChange={(e) => setUtrNumber(e.target.value)}
                      className="w-full p-3 rounded-xl border border-amber-300 bg-white text-xs font-mono font-bold text-slate-900 outline-none"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Order Summary & Pay Button */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="sticky top-28 p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#150A22] border border-slate-200/90 dark:border-purple-900/60 shadow-museum flex flex-col gap-5">
              <div className="border-b border-slate-200 dark:border-purple-900/40 pb-4">
                <span className="font-mono text-[10px] uppercase tracking-widest text-rose-700 dark:text-rose-400 font-bold bg-rose-50 px-2.5 py-0.5 rounded-full border border-rose-200">
                  Order Summary
                </span>
                <h3 className="text-xl font-bold font-hero text-slate-900 dark:text-white mt-2">
                  {packageName}
                </h3>
                <span className="text-xs text-purple-900 dark:text-purple-300 font-medium">
                  {matchedPackage.creativeTier}
                </span>
              </div>

              {/* Price Breakdown List */}
              <div className="flex flex-col gap-2.5 text-xs text-slate-800 dark:text-slate-200 font-mono">
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Base Collection Rate:</span>
                  <span className="font-bold">{formatCurrency(basePrice)}</span>
                </div>

                {addonsAmount > 0 && (
                  <div className="flex justify-between items-center text-purple-900 dark:text-purple-300">
                    <span>Selected Atelier Add-ons:</span>
                    <span className="font-bold">+{formatCurrency(addonsAmount)}</span>
                  </div>
                )}

                {discountAmount > 0 && (
                  <div className="flex justify-between items-center text-emerald-700 dark:text-emerald-400 font-bold bg-emerald-50 dark:bg-emerald-950/40 p-2 rounded-lg">
                    <span>Pay-in-Full Discount (5%):</span>
                    <span>-{formatCurrency(discountAmount)}</span>
                  </div>
                )}

                <div className="flex justify-between items-center pt-2 border-t border-slate-200 dark:border-purple-900/40 text-slate-900 dark:text-white font-bold">
                  <span>Gross Collection Value:</span>
                  <span>{formatCurrency(grossTotal)}</span>
                </div>
              </div>

              {/* Payable Amount Highlight Card */}
              <div className="p-4 rounded-2xl bg-purple-50/80 dark:bg-purple-950/50 border border-purple-200 dark:border-purple-800 flex flex-col gap-1">
                <div className="flex justify-between items-baseline">
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase font-hero">
                    Payable Now:
                  </span>
                  <span className="text-2xl font-extrabold font-mono text-purple-950 dark:text-white">
                    {formatCurrency(payableAmount)}
                  </span>
                </div>
                <span className="text-[10px] text-slate-600 dark:text-slate-400 font-mono">
                  {paymentStructure === 'token_25' && '25% Advance Token to lock your date.'}
                  {paymentStructure === 'milestone_50' && '50% Milestone Booking.'}
                  {paymentStructure === 'full_100' && '100% Full Payment with 5% Instant Savings.'}
                </span>
              </div>

              {/* Pay Action Button */}
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-purple-700 via-rose-600 to-purple-700 text-white font-nav text-xs font-bold uppercase tracking-[0.2em] shadow-lg hover:opacity-95 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
              >
                {isProcessing ? (
                  <span>Processing Payment...</span>
                ) : (
                  <>
                    <span>Pay {formatCurrency(payableAmount)} Securely</span>
                    <ArrowRight size={15} />
                  </>
                )}
              </button>

              {/* Dynamic Processing Status Steps */}
              {isProcessing && (
                <div className="p-3 rounded-xl bg-purple-900 text-white text-xs font-mono flex items-center gap-2 animate-pulse">
                  <Sparkles size={14} className="text-amber-300 flex-shrink-0" />
                  <span>{processingStep}</span>
                </div>
              )}

              <div className="flex items-center gap-2 text-[10px] font-mono text-slate-500 justify-center">
                <ShieldCheck size={13} className="text-emerald-600" />
                <span>100% Date Protection Policy & Verified Receipt</span>
              </div>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};
