'use client';

import React, { useState, useMemo, useEffect, useRef } from 'react';
import { DEFAULT_PACKAGES, STUDIO_PROFILE, ROUTES } from '@photomagic/config';
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
  ExternalLink,
  RefreshCw,
  Printer,
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
type PaymentMethod = 'razorpay' | 'upi_qr' | 'bank_transfer';

// Official Studio Banking & UPI Credentials
export const STUDIO_BANKING_DETAILS = {
  accountName: 'Rozar Khan',
  accountNumber: '501000389071617',
  ifscCode: 'HDFC0003734',
  bankName: 'HDFC Bank',
  branch: 'Madurai Heritage / Tamil Nadu',
  upiId: 'rozarkhan@ptyes',
  phone: '7904943234',
  email: 'hello@batpaiyancatponnu.online',
  website: 'https://batpaiyancatponnu.online/photomagic',
};

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
  const receiptRef = useRef<HTMLDivElement>(null);

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
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('razorpay');

  // Method specific state
  const [upiUtrNumber, setUpiUtrNumber] = useState<string>('');
  const [bankUtrNumber, setBankUtrNumber] = useState<string>('');
  const [copiedField, setCopiedField] = useState<string | null>(null);

  // Processing & Success State
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState<boolean>(false);
  const [processingStep, setProcessingStep] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isPaid, setIsPaid] = useState<boolean>(false);
  const [receiptData, setReceiptData] = useState<any>(null);
  const [razorpayReady, setRazorpayReady] = useState<boolean>(false);

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

  // UPI Payload string according to NPCI specifications with updated rozarkhan@ptyes
  const upiVpa = STUDIO_BANKING_DETAILS.upiId;
  const upiPayeeName = 'Rozar Khan PhotoMagic';
  const upiPayload = useMemo(() => {
    const note = `Token for ${packageName.slice(0, 25)}`;
    return `upi://pay?pa=${upiVpa}&pn=${encodeURIComponent(upiPayeeName)}&am=${payableAmount}&cu=INR&tn=${encodeURIComponent(note)}`;
  }, [packageName, payableAmount, upiVpa]);

  const dynamicQrUrl = useMemo(() => {
    return `https://api.qrserver.com/v1/create-qr-code/?size=260x260&margin=10&data=${encodeURIComponent(upiPayload)}`;
  }, [upiPayload]);

  // Load Razorpay Checkout script dynamically
  useEffect(() => {
    if (typeof window !== 'undefined' && !(window as any).Razorpay) {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      script.onload = () => setRazorpayReady(true);
      script.onerror = () => setRazorpayReady(false);
      document.body.appendChild(script);
    } else if (typeof window !== 'undefined' && (window as any).Razorpay) {
      setRazorpayReady(true);
    }
  }, []);

  // Pre-load html2pdf script for client-side PDF generation
  useEffect(() => {
    if (typeof window !== 'undefined' && !(window as any).html2pdf) {
      const script = document.createElement('script');
      script.src =
        'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js';
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  const copyToClipboard = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
  };

  // PDF GENERATION & DOWNLOAD ENGINE
  const handleDownloadPdf = async () => {
    if (!receiptData) return;
    setIsGeneratingPdf(true);

    const filename = `PhotoMagic_Tax_Invoice_${receiptData.referenceId || 'Receipt'}.pdf`;

    try {
      // Ensure html2pdf is available
      if (typeof window !== 'undefined' && !(window as any).html2pdf) {
        await new Promise<void>((resolve, reject) => {
          const script = document.createElement('script');
          script.src =
            'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js';
          script.async = true;
          script.onload = () => resolve();
          script.onerror = () => reject(new Error('Failed to load html2pdf'));
          document.body.appendChild(script);
        });
      }

      if (typeof window !== 'undefined' && (window as any).html2pdf && receiptRef.current) {
        const element = receiptRef.current;
        const opt = {
          margin: [8, 8, 8, 8],
          filename: filename,
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: {
            scale: 2,
            useCORS: true,
            letterRendering: true,
            backgroundColor: '#FFFFFF',
          },
          jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
        };

        await (window as any).html2pdf().set(opt).from(element).save();
      } else {
        window.print();
      }
    } catch (pdfErr) {
      console.warn('[PDF Generation Fallback]', pdfErr);
      window.print();
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  // 1. RAZORPAY STANDARD GATEWAY EXECUTION
  const handleRazorpayPayment = async () => {
    if (!clientName || !clientPhone) {
      setErrorMessage('Please enter your full name and mobile number.');
      return;
    }

    setErrorMessage(null);
    setIsProcessing(true);
    setProcessingStep('Creating secure payment order with gateway...');

    try {
      const res = await fetch('/api/payment/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: payableAmount,
          packageName,
          paymentStructure,
          clientName,
          clientPhone,
          clientEmail,
          eventDate,
          eventCity,
        }),
      });

      const orderData = await res.json();

      if (!orderData.success) {
        throw new Error(orderData.error || 'Failed to initialize payment order');
      }

      setProcessingStep('Launching Razorpay SSL Encrypted Payment Portal...');

      const options = {
        key: orderData.keyId,
        amount: orderData.amount,
        currency: orderData.currency || 'INR',
        name: 'PhotoMagic Studios by RK',
        description: `Date-Lock Token: ${packageName}`,
        image: '/images/rozar_photographer_mascot.png',
        order_id: orderData.orderId,
        prefill: {
          name: clientName,
          email: clientEmail || 'client@photomagic.in',
          contact: clientPhone,
        },
        notes: {
          eventDate: eventDate || 'Scheduled on Consultation',
          eventCity: eventCity || 'Tamil Nadu',
          paymentStructure,
        },
        theme: {
          color: '#6B21A8',
        },
        modal: {
          ondismiss: () => {
            setIsProcessing(false);
            setProcessingStep('');
          },
        },
        handler: async (response: any) => {
          setProcessingStep('Verifying cryptographic payment signature...');
          try {
            const verifyRes = await fetch('/api/payment/verify', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id || orderData.orderId,
                razorpay_payment_id: response.razorpay_payment_id || `pay_${Date.now()}`,
                razorpay_signature: response.razorpay_signature || 'mock_sig',
                paymentMethod: 'razorpay',
                clientName,
                clientPhone,
                clientEmail,
                eventDate: eventDate || 'Scheduled on Consultation',
                eventCity: eventCity || 'Tamil Nadu',
                packageName,
                paidAmount: payableAmount,
                grossTotal,
                remainingBalance,
                paymentStructure,
              }),
            });

            const verifyData = await verifyRes.json();
            if (verifyData.success && verifyData.receipt) {
              setReceiptData(verifyData.receipt);
              setIsPaid(true);
              if (onPaymentSuccess) onPaymentSuccess(verifyData.receipt);
            } else {
              throw new Error(verifyData.error || 'Verification failed');
            }
          } catch (vErr: any) {
            setErrorMessage(vErr.message || 'Signature verification error');
          } finally {
            setIsProcessing(false);
          }
        },
      };

      if (typeof window !== 'undefined' && (window as any).Razorpay) {
        const rzp = new (window as any).Razorpay(options);
        rzp.on('payment.failed', (resp: any) => {
          setErrorMessage(resp.error?.description || 'Payment was declined or cancelled');
          setIsProcessing(false);
        });
        rzp.open();
      } else {
        // Fallback simulated payment for local/test mode
        setTimeout(async () => {
          setProcessingStep('Verifying test transaction confirmation...');
          const verifyRes = await fetch('/api/payment/verify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              razorpay_order_id: orderData.orderId,
              razorpay_payment_id: `pay_${Date.now()}`,
              razorpay_signature: 'test_verified_signature',
              paymentMethod: 'razorpay',
              clientName,
              clientPhone,
              clientEmail,
              eventDate: eventDate || 'Scheduled on Consultation',
              eventCity: eventCity || 'Tamil Nadu',
              packageName,
              paidAmount: payableAmount,
              grossTotal,
              remainingBalance,
              paymentStructure,
            }),
          });
          const verifyData = await verifyRes.json();
          setReceiptData(verifyData.receipt);
          setIsPaid(true);
          setIsProcessing(false);
          if (onPaymentSuccess) onPaymentSuccess(verifyData.receipt);
        }, 1500);
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Gateway connection error');
      setIsProcessing(false);
    }
  };

  // 2. UPI QR / UTR DIRECT CONFIRMATION
  const handleUpiVerification = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !clientPhone) {
      setErrorMessage('Please enter your full name and WhatsApp number.');
      return;
    }
    if (!upiUtrNumber || upiUtrNumber.trim().length < 6) {
      setErrorMessage('Please enter the 12-digit UPI Reference Number / UTR from your UPI app.');
      return;
    }

    setErrorMessage(null);
    setIsProcessing(true);
    setProcessingStep('Verifying 12-digit UPI Reference Number on NPCI settlement network...');

    try {
      const verifyRes = await fetch('/api/payment/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          paymentMethod: 'upi_qr',
          utrNumber: upiUtrNumber.trim(),
          clientName,
          clientPhone,
          clientEmail,
          eventDate: eventDate || 'Scheduled on Consultation',
          eventCity: eventCity || 'Tamil Nadu',
          packageName,
          paidAmount: payableAmount,
          grossTotal,
          remainingBalance,
          paymentStructure,
        }),
      });

      const verifyData = await verifyRes.json();
      if (verifyData.success && verifyData.receipt) {
        setReceiptData(verifyData.receipt);
        setIsPaid(true);
        if (onPaymentSuccess) onPaymentSuccess(verifyData.receipt);
      } else {
        throw new Error(verifyData.error || 'Verification failed');
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'UPI verification error');
    } finally {
      setIsProcessing(false);
    }
  };

  // 3. DIRECT BANK TRANSFER / NEFT CONFIRMATION
  const handleBankTransferVerification = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !clientPhone) {
      setErrorMessage('Please enter your full name and WhatsApp number.');
      return;
    }
    if (!bankUtrNumber || bankUtrNumber.trim().length < 6) {
      setErrorMessage('Please enter your Bank IMPS/NEFT UTR Transaction Reference number.');
      return;
    }

    setErrorMessage(null);
    setIsProcessing(true);
    setProcessingStep('Recording Bank Transfer UTR & locking booking timeline...');

    try {
      const verifyRes = await fetch('/api/payment/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          paymentMethod: 'bank_transfer',
          utrNumber: bankUtrNumber.trim(),
          clientName,
          clientPhone,
          clientEmail,
          eventDate: eventDate || 'Scheduled on Consultation',
          eventCity: eventCity || 'Tamil Nadu',
          packageName,
          paidAmount: payableAmount,
          grossTotal,
          remainingBalance,
          paymentStructure,
        }),
      });

      const verifyData = await verifyRes.json();
      if (verifyData.success && verifyData.receipt) {
        setReceiptData(verifyData.receipt);
        setIsPaid(true);
        if (onPaymentSuccess) onPaymentSuccess(verifyData.receipt);
      } else {
        throw new Error(verifyData.error || 'Bank transfer logging failed');
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Bank transfer verification error');
    } finally {
      setIsProcessing(false);
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
              Live Production Payment Gateway & Archival Token System
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-3 py-1.5 rounded-full border border-emerald-300 dark:border-emerald-800">
          <Lock size={12} />
          <span>256-Bit SSL Encrypted Bank Channel</span>
        </div>
      </div>

      {/* Error Alert Box */}
      {errorMessage && (
        <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-300 dark:border-rose-800 text-rose-900 dark:text-rose-200 text-xs flex items-center gap-3 animate-shake">
          <AlertCircle size={18} className="text-rose-600 flex-shrink-0" />
          <span className="font-medium">{errorMessage}</span>
        </div>
      )}

      {/* PAID SUCCESS OFFICIAL ARCHIVAL TAX RECEIPT VIEW */}
      {isPaid && receiptData ? (
        <div className="p-8 sm:p-12 rounded-3xl bg-white dark:bg-[#150A22] border border-slate-200/90 dark:border-purple-900/60 shadow-museum flex flex-col items-center text-center gap-8 animate-in fade-in zoom-in-95 duration-500 print:p-0 print:border-none print:shadow-none">
          <div className="w-20 h-20 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 border border-emerald-300 flex items-center justify-center shadow-lg print:hidden">
            <CheckCircle2 size={44} />
          </div>

          <div className="flex flex-col gap-2 max-w-xl">
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-emerald-700 dark:text-emerald-400 font-bold bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 w-fit mx-auto print:border-slate-800">
              Payment Verified · Date Locked
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-hero text-slate-900 dark:text-white mt-1">
              Your Booking is Locked on Our Timeline!
            </h2>
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-normal print:text-black">
              Thank you,{' '}
              <strong className="text-slate-900 dark:text-white print:text-black">
                {receiptData.clientName}
              </strong>
              . Rozar Khan and the PhotoMagic cinematography team have locked your celebration on
              our master schedule.
            </p>
          </div>

          {/* Itemized Official Tax Invoice & Archival Receipt Card (Referenced for PDF Export) */}
          <div
            ref={receiptRef}
            id="official-tax-invoice-receipt"
            className="w-full max-w-2xl p-6 sm:p-8 rounded-2xl bg-[#FAF8FC] dark:bg-purple-950/30 border border-purple-200/90 dark:border-purple-800/50 text-left flex flex-col gap-5 text-xs font-mono print:bg-white print:border-slate-400"
          >
            {/* Header branding on receipt */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-200 dark:border-purple-800/60 pb-4 gap-2">
              <div>
                <span className="font-hero font-extrabold text-base text-slate-900 dark:text-white print:text-black block">
                  PHOTOMAGIC STUDIOS BY RK
                </span>
                <span className="text-[10px] text-slate-600 dark:text-slate-400">
                  Official Booking Token & Tax Invoice · Tamil Nadu, India
                </span>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-slate-500 block">Date & Time:</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">
                  {new Date(receiptData.verifiedAt || Date.now()).toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>
              </div>
            </div>

            {/* Reference & Transaction details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3 rounded-xl bg-white dark:bg-purple-900/30 border border-slate-200 dark:border-purple-800">
                <span className="text-[10px] text-slate-500 block">Booking Reference</span>
                <span className="font-bold text-slate-900 dark:text-white text-sm">
                  {receiptData.referenceId}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-white dark:bg-purple-900/30 border border-slate-200 dark:border-purple-800">
                <span className="text-[10px] text-slate-500 block">Transaction ID / UTR</span>
                <span className="font-bold text-slate-900 dark:text-white text-sm truncate block">
                  {receiptData.transactionId}
                </span>
              </div>
            </div>

            {/* Client & Event Info */}
            <div className="flex flex-col gap-2 pt-2 border-t border-slate-200 dark:border-purple-800/60">
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Client Name:</span>
                <span className="font-bold text-slate-900 dark:text-white">
                  {receiptData.clientName}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-slate-500">Contact Number:</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">
                  {receiptData.clientPhone}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-slate-500">Event Date & City:</span>
                <span className="font-bold text-purple-900 dark:text-purple-300">
                  {receiptData.eventDate} ({receiptData.eventCity})
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-slate-500">Selected Collection:</span>
                <span className="font-bold text-slate-900 dark:text-white">
                  {receiptData.packageName}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-slate-500">Payment Structure:</span>
                <span className="font-bold text-emerald-700 dark:text-emerald-400 uppercase">
                  {receiptData.paymentStructure.replace('_', ' ')}
                </span>
              </div>
            </div>

            {/* Financials & Balance */}
            <div className="pt-4 border-t border-slate-200 dark:border-purple-800/60 flex flex-col gap-2">
              <div className="flex justify-between items-center text-slate-600">
                <span>Total Collection Value:</span>
                <span className="font-bold">{formatCurrency(receiptData.grossTotal)}</span>
              </div>

              <div className="flex justify-between items-baseline pt-2 border-t border-slate-200 dark:border-purple-800/60">
                <span className="text-sm font-bold text-slate-900 dark:text-white font-hero">
                  Amount Paid Now (Token):
                </span>
                <span className="text-2xl font-extrabold text-emerald-700 dark:text-emerald-400">
                  {formatCurrency(receiptData.paidAmount)}
                </span>
              </div>

              {receiptData.remainingBalance > 0 && (
                <div className="flex justify-between items-center text-[11px] text-slate-500 border-t border-dashed border-slate-300 dark:border-purple-800 pt-2">
                  <span>Remaining Balance (Due before event day):</span>
                  <span className="font-bold">{formatCurrency(receiptData.remainingBalance)}</span>
                </div>
              )}
            </div>

            {/* Official Studio Footer */}
            <div className="pt-4 border-t border-slate-200 dark:border-purple-800 text-[10px] text-slate-500 flex flex-col sm:flex-row justify-between items-center gap-1">
              <span>Verified by PhotoMagic Gateway Core · A/C: 501000389071617</span>
              <span>Phone: +91 7904943234 · hello@batpaiyancatponnu.online</span>
            </div>
          </div>

          {/* Action Triggers */}
          <div className="flex flex-wrap gap-4 justify-center print:hidden">
            {/* Generate and Download PDF button */}
            <button
              onClick={handleDownloadPdf}
              disabled={isGeneratingPdf}
              className="px-6 py-3.5 rounded-xl bg-purple-900 hover:bg-purple-800 text-white text-xs font-nav font-bold uppercase tracking-wider flex items-center gap-2 shadow-md transition-all disabled:opacity-50"
            >
              {isGeneratingPdf ? (
                <RefreshCw size={15} className="animate-spin" />
              ) : (
                <Download size={15} />
              )}
              <span>{isGeneratingPdf ? 'Generating PDF...' : 'Download Tax Invoice (PDF)'}</span>
            </button>

            {/* Print button */}
            <button
              onClick={() => window.print()}
              className="px-6 py-3.5 rounded-xl border border-slate-300 dark:border-purple-700 text-slate-900 dark:text-white text-xs font-nav font-bold uppercase tracking-wider flex items-center gap-2 hover:bg-slate-50 shadow-sm transition-all"
            >
              <Printer size={15} />
              <span>Print Invoice</span>
            </button>

            <a
              href={`https://wa.me/917904943234?text=Hi%20Rozar%20Khan,%20I%20have%20completed%20booking%20token%20payment%20for%20${encodeURIComponent(
                receiptData.referenceId,
              )}%20(${encodeURIComponent(receiptData.packageName)})%20for%20${encodeURIComponent(
                receiptData.eventDate,
              )}.`}
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Client Info & Payment Channels */}
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
                03. Select Live Payment Method
              </span>

              {/* Payment Channel Tabs */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('razorpay')}
                  className={`py-3.5 px-3 rounded-xl text-xs font-bold font-nav uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
                    paymentMethod === 'razorpay'
                      ? 'bg-purple-900 text-white shadow-md'
                      : 'bg-slate-50 dark:bg-purple-950/40 text-slate-700 dark:text-purple-200 border border-slate-200 dark:border-purple-800'
                  }`}
                >
                  <CreditCard size={16} />
                  <span>Razorpay Gateway</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('upi_qr')}
                  className={`py-3.5 px-3 rounded-xl text-xs font-bold font-nav uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
                    paymentMethod === 'upi_qr'
                      ? 'bg-purple-900 text-white shadow-md'
                      : 'bg-slate-50 dark:bg-purple-950/40 text-slate-700 dark:text-purple-200 border border-slate-200 dark:border-purple-800'
                  }`}
                >
                  <QrCode size={16} />
                  <span>Dynamic UPI QR</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('bank_transfer')}
                  className={`py-3.5 px-3 rounded-xl text-xs font-bold font-nav uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
                    paymentMethod === 'bank_transfer'
                      ? 'bg-purple-900 text-white shadow-md'
                      : 'bg-slate-50 dark:bg-purple-950/40 text-slate-700 dark:text-purple-200 border border-slate-200 dark:border-purple-800'
                  }`}
                >
                  <Building2 size={16} />
                  <span>Direct Bank Wire</span>
                </button>
              </div>

              {/* METHOD 1: RAZORPAY STANDARD (Cards, UPI, NetBanking, Wallets) */}
              {paymentMethod === 'razorpay' && (
                <div className="p-6 rounded-2xl bg-purple-50/60 dark:bg-purple-950/30 border border-purple-200/80 dark:border-purple-900/40 flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold font-hero text-slate-900 dark:text-white">
                        Razorpay Production Payment Gateway
                      </h4>
                      <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
                        Supports UPI (GPay/PhonePe), Credit & Debit Cards (Visa, RuPay, Mastercard),
                        50+ NetBanking banks & Wallets.
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-2 border-t border-purple-200 dark:border-purple-800/60">
                    {[
                      'Google Pay',
                      'PhonePe',
                      'Paytm',
                      'Visa / RuPay',
                      'HDFC / SBI NetBanking',
                      'CRED',
                    ].map((item) => (
                      <span
                        key={item}
                        className="px-2.5 py-1 rounded-lg bg-white dark:bg-purple-900/40 border border-purple-200 dark:border-purple-800 text-[11px] font-mono text-purple-950 dark:text-purple-200 font-semibold"
                      >
                        {item}
                      </span>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={handleRazorpayPayment}
                    disabled={isProcessing}
                    className="mt-2 w-full py-4 rounded-xl bg-purple-900 hover:bg-purple-800 text-white font-nav text-xs font-bold uppercase tracking-[0.2em] shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isProcessing ? (
                      <div className="flex items-center gap-2">
                        <RefreshCw size={15} className="animate-spin" />
                        <span>{processingStep || 'Connecting Gateway...'}</span>
                      </div>
                    ) : (
                      <>
                        <span>Pay {formatCurrency(payableAmount)} with Razorpay</span>
                        <ArrowRight size={15} />
                      </>
                    )}
                  </button>
                </div>
              )}

              {/* METHOD 2: DYNAMIC UPI QR CODE & DIRECT INTENT */}
              {paymentMethod === 'upi_qr' && (
                <form
                  onSubmit={handleUpiVerification}
                  className="p-6 rounded-2xl bg-purple-50/60 dark:bg-purple-950/30 border border-purple-200/80 dark:border-purple-900/40 flex flex-col gap-6"
                >
                  <div className="flex flex-col md:flex-row items-center gap-6">
                    {/* Live Dynamic QR Code */}
                    <div className="p-3 bg-white rounded-2xl border border-purple-200 shadow-sm flex flex-col items-center gap-2 flex-shrink-0">
                      <img
                        src={dynamicQrUrl}
                        alt="Scan UPI QR Code to Pay Token"
                        className="w-48 h-48 rounded-xl object-contain"
                      />
                      <span className="text-[10px] font-mono text-slate-700 font-bold">
                        Scan with GPay / PhonePe / Paytm
                      </span>
                    </div>

                    {/* VPA Details & Direct Mobile Intent */}
                    <div className="flex-1 flex flex-col gap-3">
                      <div>
                        <span className="text-xs font-mono font-bold text-rose-700 dark:text-rose-400 uppercase tracking-wider block">
                          Instant UPI QR Transfer
                        </span>
                        <h4 className="text-sm font-bold font-hero text-slate-900 dark:text-white mt-0.5">
                          Amount: {formatCurrency(payableAmount)}
                        </h4>
                      </div>

                      <div className="p-3 rounded-xl bg-white dark:bg-purple-900/40 border border-purple-200 dark:border-purple-800 flex justify-between items-center text-xs font-mono">
                        <div>
                          <span className="text-[10px] text-slate-500 block">
                            Official Studio UPI ID
                          </span>
                          <span className="font-bold text-purple-950 dark:text-purple-200 text-sm">
                            {STUDIO_BANKING_DETAILS.upiId}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => copyToClipboard(STUDIO_BANKING_DETAILS.upiId, 'upi')}
                          className="px-3 py-1.5 rounded-lg bg-purple-50 dark:bg-purple-950 text-purple-900 dark:text-purple-200 hover:bg-purple-100 flex items-center gap-1 font-bold"
                        >
                          {copiedField === 'upi' ? <Check size={13} /> : <Copy size={13} />}
                          <span>{copiedField === 'upi' ? 'Copied' : 'Copy'}</span>
                        </button>
                      </div>

                      {/* Direct Mobile UPI Intent Button */}
                      <a
                        href={upiPayload}
                        className="w-full py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-mono font-bold flex items-center justify-center gap-2 shadow-sm transition-all"
                      >
                        <Smartphone size={15} />
                        <span>Open Directly in UPI App (Mobile)</span>
                      </a>
                    </div>
                  </div>

                  {/* UTR Submission Box */}
                  <div className="pt-4 border-t border-purple-200 dark:border-purple-800/60 flex flex-col gap-2">
                    <label className="text-xs font-mono font-bold text-slate-800 dark:text-slate-200">
                      Enter 12-Digit UPI UTR / Reference No. after payment: *
                    </label>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <input
                        type="text"
                        required
                        placeholder="e.g. 423985019284"
                        value={upiUtrNumber}
                        onChange={(e) => setUpiUtrNumber(e.target.value)}
                        className="flex-1 p-3 rounded-xl border border-purple-300 dark:border-purple-800 bg-white dark:bg-purple-950/60 text-xs font-mono font-bold text-slate-900 dark:text-white outline-none"
                      />
                      <button
                        type="submit"
                        disabled={isProcessing}
                        className="px-6 py-3 rounded-xl bg-purple-900 hover:bg-purple-800 text-white text-xs font-nav font-bold uppercase tracking-wider shadow-md disabled:opacity-50 transition-all flex items-center justify-center gap-1.5"
                      >
                        {isProcessing ? (
                          <RefreshCw size={14} className="animate-spin" />
                        ) : (
                          <CheckCircle2 size={14} />
                        )}
                        <span>Verify & Lock Date</span>
                      </button>
                    </div>
                  </div>
                </form>
              )}

              {/* METHOD 3: DIRECT IMPS / NEFT BANK WIRE */}
              {paymentMethod === 'bank_transfer' && (
                <form
                  onSubmit={handleBankTransferVerification}
                  className="p-6 rounded-2xl bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/50 flex flex-col gap-4 text-xs font-mono"
                >
                  <span className="text-xs font-bold text-slate-900 dark:text-white font-hero uppercase">
                    PhotoMagic Studios Official Bank Credentials
                  </span>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-slate-800 dark:text-slate-200">
                    {/* Account Name */}
                    <div className="p-3 bg-white dark:bg-purple-950/60 rounded-xl border border-amber-200 flex justify-between items-center">
                      <div>
                        <span className="text-[10px] text-slate-500 block">Account Name</span>
                        <span className="font-bold text-slate-900 dark:text-white">
                          {STUDIO_BANKING_DETAILS.accountName}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => copyToClipboard(STUDIO_BANKING_DETAILS.accountName, 'name')}
                        className="p-1.5 hover:bg-slate-100 dark:hover:bg-purple-900 rounded"
                      >
                        {copiedField === 'name' ? (
                          <Check size={14} className="text-emerald-600" />
                        ) : (
                          <Copy size={14} />
                        )}
                      </button>
                    </div>

                    {/* Account Number */}
                    <div className="p-3 bg-white dark:bg-purple-950/60 rounded-xl border border-amber-200 flex justify-between items-center">
                      <div>
                        <span className="text-[10px] text-slate-500 block">Account Number</span>
                        <span className="font-bold text-slate-900 dark:text-white tracking-wider">
                          {STUDIO_BANKING_DETAILS.accountNumber}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => copyToClipboard(STUDIO_BANKING_DETAILS.accountNumber, 'acc')}
                        className="p-1.5 hover:bg-slate-100 dark:hover:bg-purple-900 rounded"
                      >
                        {copiedField === 'acc' ? (
                          <Check size={14} className="text-emerald-600" />
                        ) : (
                          <Copy size={14} />
                        )}
                      </button>
                    </div>

                    {/* IFSC Code */}
                    <div className="p-3 bg-white dark:bg-purple-950/60 rounded-xl border border-amber-200 flex justify-between items-center">
                      <div>
                        <span className="text-[10px] text-slate-500 block">IFSC Code</span>
                        <span className="font-bold text-slate-900 dark:text-white">
                          {STUDIO_BANKING_DETAILS.ifscCode}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => copyToClipboard(STUDIO_BANKING_DETAILS.ifscCode, 'ifsc')}
                        className="p-1.5 hover:bg-slate-100 dark:hover:bg-purple-900 rounded"
                      >
                        {copiedField === 'ifsc' ? (
                          <Check size={14} className="text-emerald-600" />
                        ) : (
                          <Copy size={14} />
                        )}
                      </button>
                    </div>

                    {/* UPI ID */}
                    <div className="p-3 bg-white dark:bg-purple-950/60 rounded-xl border border-amber-200 flex justify-between items-center">
                      <div>
                        <span className="text-[10px] text-slate-500 block">UPI ID / VPA</span>
                        <span className="font-bold text-purple-900 dark:text-purple-300">
                          {STUDIO_BANKING_DETAILS.upiId}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => copyToClipboard(STUDIO_BANKING_DETAILS.upiId, 'vpa')}
                        className="p-1.5 hover:bg-slate-100 dark:hover:bg-purple-900 rounded"
                      >
                        {copiedField === 'vpa' ? (
                          <Check size={14} className="text-emerald-600" />
                        ) : (
                          <Copy size={14} />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-amber-200/80 flex flex-col gap-2">
                    <label className="text-xs font-mono font-bold text-slate-800 dark:text-slate-200">
                      Enter NEFT / IMPS UTR Transaction Reference: *
                    </label>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <input
                        type="text"
                        required
                        placeholder="e.g. 423985019284"
                        value={bankUtrNumber}
                        onChange={(e) => setBankUtrNumber(e.target.value)}
                        className="flex-1 p-3 rounded-xl border border-amber-300 bg-white text-xs font-mono font-bold text-slate-900 outline-none"
                      />
                      <button
                        type="submit"
                        disabled={isProcessing}
                        className="px-6 py-3 rounded-xl bg-amber-800 hover:bg-amber-900 text-white text-xs font-nav font-bold uppercase tracking-wider shadow-md disabled:opacity-50 transition-all flex items-center justify-center gap-1.5"
                      >
                        {isProcessing ? (
                          <RefreshCw size={14} className="animate-spin" />
                        ) : (
                          <CheckCircle2 size={14} />
                        )}
                        <span>Confirm Transfer</span>
                      </button>
                    </div>
                  </div>
                </form>
              )}
            </div>
          </div>

          {/* Right Column: Order Summary Card */}
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

              {/* Status Indicator during processing */}
              {isProcessing && (
                <div className="p-3 rounded-xl bg-purple-900 text-white text-xs font-mono flex items-center gap-2 animate-pulse">
                  <Sparkles size={14} className="text-amber-300 flex-shrink-0" />
                  <span>{processingStep}</span>
                </div>
              )}

              <div className="flex items-center gap-2 text-[10px] font-mono text-slate-500 justify-center">
                <ShieldCheck size={13} className="text-emerald-600" />
                <span>100% Date Protection Policy & Verified Archival Receipt</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
