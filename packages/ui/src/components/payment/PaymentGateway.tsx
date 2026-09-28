'use client';

import React, { useState, useMemo, useEffect, useRef } from 'react';
import { DEFAULT_PACKAGES, TEST_RUPEE_PACKAGE, STUDIO_PROFILE, ROUTES } from '@photomagic/config';
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
  Info,
  Zap,
  FlaskConical,
  X,
  HelpCircle,
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
  phoneUpiId: '7904943234@upi',
  hdfcUpiId: '7904943234@okhdfcbank',
  phone: '7904943234',
  email: 'photomagicphotographystudio@gmail.com',
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

  // REMOVABLE 1 RUPEE PAYMENT TESTING MODE
  // When active or when packageId is 'pkg-test-rupee', payable amount is strictly ₹1.00 for live verification
  const [isTestRupeeMode, setIsTestRupeeMode] = useState<boolean>(() => {
    return packageId === 'pkg-test-rupee' || customPackagePrice === 1;
  });

  // Find selected package
  const matchedPackage = useMemo(() => {
    if (packageId === 'pkg-test-rupee' || isTestRupeeMode) {
      return TEST_RUPEE_PACKAGE;
    }
    return (
      DEFAULT_PACKAGES.find((p) => p.id === packageId) ||
      DEFAULT_PACKAGES.find((p) => p.id === 'pkg-obsidian') ||
      DEFAULT_PACKAGES[0]
    );
  }, [packageId, isTestRupeeMode]);

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

  // UPI QR Configuration State
  const [selectedUpiVpa, setSelectedUpiVpa] = useState<string>(STUDIO_BANKING_DETAILS.upiId);
  const [qrMode, setQrMode] = useState<'universal' | 'autofill'>('universal');
  const [showSandboxModal, setShowSandboxModal] = useState<boolean>(false);
  const [sandboxOrderDetails, setSandboxOrderDetails] = useState<any>(null);

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

  // Calculated Payable Amount based on structure & test mode
  const { payableAmount, discountAmount, remainingBalance } = useMemo(() => {
    if (isTestRupeeMode || grossTotal <= 1) {
      return {
        payableAmount: 1,
        discountAmount: 0,
        remainingBalance: 0,
      };
    }
    if (paymentStructure === 'token_25') {
      const pay = Math.max(1, Math.round(grossTotal * 0.25));
      return {
        payableAmount: pay,
        discountAmount: 0,
        remainingBalance: grossTotal - pay,
      };
    } else if (paymentStructure === 'milestone_50') {
      const pay = Math.max(1, Math.round(grossTotal * 0.5));
      return {
        payableAmount: pay,
        discountAmount: 0,
        remainingBalance: grossTotal - pay,
      };
    } else {
      // 100% Full payment with 5% Pay-in-Full discount perk
      const discount = Math.round(grossTotal * 0.05);
      const pay = Math.max(1, grossTotal - discount);
      return {
        payableAmount: pay,
        discountAmount: discount,
        remainingBalance: 0,
      };
    }
  }, [grossTotal, paymentStructure, isTestRupeeMode]);

  const effectivePackageName = isTestRupeeMode ? `${packageName} (₹1 Test Token)` : packageName;
  const effectiveGrossTotal = isTestRupeeMode ? 1 : grossTotal;
  const effectiveRemainingBalance = isTestRupeeMode ? 0 : remainingBalance;

  // NPCI-Compliant Payee Name (matches bank registration: "Rozar Khan")
  const upiPayeeName = 'Rozar Khan';

  // 1. Universal Clean URI: Guaranteed to work across all Indian banks without P2P restriction
  // The user inputs amount directly on their UPI payment page.
  const universalUpiPayload = useMemo(() => {
    return `upi://pay?pa=${selectedUpiVpa}&pn=${encodeURIComponent(upiPayeeName)}&cu=INR`;
  }, [selectedUpiVpa]);

  // 2. Auto-Fill Amount URI: Uses exact 2-decimal precision (e.g. 1.00 or 10500.00) and clean note
  const autofillUpiPayload = useMemo(() => {
    const cleanNote = isTestRupeeMode
      ? 'PhotoMagic 1 Rupee Test'
      : `Token ${packageName.slice(0, 18).replace(/[^a-zA-Z0-9 ]/g, '')}`;
    return `upi://pay?pa=${selectedUpiVpa}&pn=${encodeURIComponent(upiPayeeName)}&am=${payableAmount.toFixed(2)}&cu=INR&tn=${encodeURIComponent(cleanNote)}`;
  }, [selectedUpiVpa, payableAmount, packageName, isTestRupeeMode]);

  // Active Payload for QR Code
  const activeUpiPayload = qrMode === 'universal' ? universalUpiPayload : autofillUpiPayload;

  const dynamicQrUrl = useMemo(() => {
    return `https://api.qrserver.com/v1/create-qr-code/?size=280x280&margin=10&data=${encodeURIComponent(activeUpiPayload)}`;
  }, [activeUpiPayload]);

  // Direct Mobile App Deep-Links
  const mobileIntentUrls = useMemo(() => {
    const cleanNote = isTestRupeeMode
      ? 'PhotoMagic 1 Rupee Test'
      : `Token ${packageName.slice(0, 18).replace(/[^a-zA-Z0-9 ]/g, '')}`;
    const baseParams = `pa=${selectedUpiVpa}&pn=${encodeURIComponent(upiPayeeName)}&am=${payableAmount.toFixed(2)}&cu=INR&tn=${encodeURIComponent(cleanNote)}`;
    return {
      generic: activeUpiPayload,
      gpay: `gpay://upi/pay?${baseParams}`,
      phonepe: `phonepe://upi/pay?${baseParams}`,
      paytm: `paytmmp://upi/pay?${baseParams}`,
    };
  }, [selectedUpiVpa, upiPayeeName, payableAmount, packageName, activeUpiPayload, isTestRupeeMode]);

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

  // Unified Success Handler & Auto-Redirect to Dedicated Invoice Page
  const handlePaymentComplete = (receipt: any) => {
    setReceiptData(receipt);
    setIsPaid(true);

    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem('photomagic_latest_receipt', JSON.stringify(receipt));
        localStorage.setItem(`photomagic_receipt_${receipt.referenceId}`, JSON.stringify(receipt));
        sessionStorage.setItem('photomagic_latest_receipt', JSON.stringify(receipt));
      }
    } catch (e) {
      console.warn('[Storage Error]', e);
    }

    if (onPaymentSuccess) {
      try {
        onPaymentSuccess(receipt);
      } catch (err) {
        console.warn('[onPaymentSuccess Error]', err);
      }
    }

    const searchParams = new URLSearchParams({
      ref: receipt.referenceId || '',
      pkg: receipt.packageName || effectivePackageName || '',
      paid: String(receipt.paidAmount || payableAmount || 0),
      total: String(receipt.grossTotal || effectiveGrossTotal || 0),
      bal: String(receipt.remainingBalance || effectiveRemainingBalance || 0),
      name: receipt.clientName || clientName || '',
      phone: receipt.clientPhone || clientPhone || '',
      email: receipt.clientEmail || clientEmail || '',
      date: receipt.eventDate || eventDate || '',
      city: receipt.eventCity || eventCity || '',
      method: receipt.paymentMethod || paymentMethod || 'upi_qr',
      tx: receipt.transactionId || '',
      struct: receipt.paymentStructure || paymentStructure,
      time: receipt.verifiedAt || new Date().toISOString(),
    });

    setProcessingStep('Payment Verified! Redirecting to your official invoice...');
    setTimeout(() => {
      if (typeof window !== 'undefined') {
        window.location.href = `/invoice?${searchParams.toString()}`;
      }
    }, 1200);
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
          packageName: effectivePackageName,
          paymentStructure,
          clientName: clientName || (isTestRupeeMode ? 'PhotoMagic Gateway Tester' : ''),
          clientPhone: clientPhone || (isTestRupeeMode ? '7904943234' : ''),
          clientEmail:
            clientEmail || (isTestRupeeMode ? 'photomagicphotographystudio@gmail.com' : ''),
          eventDate,
          eventCity,
        }),
      });

      const orderData = await res.json();

      if (!orderData.success) {
        throw new Error(orderData.error || 'Failed to initialize payment order');
      }

      // Check if real live gateway is active or if sandbox/simulated mode
      if (!orderData.isLiveGateway || orderData.isSimulated) {
        // Open Sandbox Simulation Modal instead of crashing in window.Razorpay
        setSandboxOrderDetails(orderData);
        setShowSandboxModal(true);
        setIsProcessing(false);
        setProcessingStep('');
        return;
      }

      setProcessingStep('Launching Razorpay SSL Encrypted Payment Portal...');

      const options = {
        key: orderData.keyId,
        amount: orderData.amount,
        currency: orderData.currency || 'INR',
        name: 'PhotoMagic Studios by RK',
        description: `Date-Lock Token: ${effectivePackageName}`,
        image: '/images/rozar_photographer_mascot.png',
        order_id: orderData.orderId,
        prefill: {
          name: clientName || (isTestRupeeMode ? 'PhotoMagic Gateway Tester' : ''),
          email:
            clientEmail ||
            (isTestRupeeMode ? 'photomagicphotographystudio@gmail.com' : 'client@photomagic.in'),
          contact: clientPhone || (isTestRupeeMode ? '7904943234' : ''),
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
                clientName: clientName || (isTestRupeeMode ? 'PhotoMagic Gateway Tester' : ''),
                clientPhone: clientPhone || (isTestRupeeMode ? '7904943234' : ''),
                clientEmail:
                  clientEmail || (isTestRupeeMode ? 'photomagicphotographystudio@gmail.com' : ''),
                eventDate: eventDate || 'Scheduled on Consultation',
                eventCity: eventCity || 'Tamil Nadu',
                packageName: effectivePackageName,
                paidAmount: payableAmount,
                grossTotal: effectiveGrossTotal,
                remainingBalance: effectiveRemainingBalance,
                paymentStructure,
              }),
            });

            const verifyData = await verifyRes.json();
            if (verifyData.success && verifyData.receipt) {
              handlePaymentComplete(verifyData.receipt);
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
              clientName: clientName || (isTestRupeeMode ? 'PhotoMagic Gateway Tester' : ''),
              clientPhone: clientPhone || (isTestRupeeMode ? '7904943234' : ''),
              clientEmail:
                clientEmail || (isTestRupeeMode ? 'photomagicphotographystudio@gmail.com' : ''),
              eventDate: eventDate || 'Scheduled on Consultation',
              eventCity: eventCity || 'Tamil Nadu',
              packageName: effectivePackageName,
              paidAmount: payableAmount,
              grossTotal: effectiveGrossTotal,
              remainingBalance: effectiveRemainingBalance,
              paymentStructure,
            }),
          });
          const verifyData = await verifyRes.json();
          if (verifyData.success && verifyData.receipt) {
            handlePaymentComplete(verifyData.receipt);
          } else {
            throw new Error(verifyData.error || 'Simulated verification failed');
          }
        }, 1500);
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Gateway connection error');
      setIsProcessing(false);
    }
  };

  // Quick Developer / Sandbox Test Verification
  const handleQuickTestVerification = async (
    sourceMethod: 'upi_qr' | 'razorpay' | 'bank_transfer',
  ) => {
    if (!clientName || !clientPhone) {
      setErrorMessage('Please enter your full name and mobile number first.');
      return;
    }

    setErrorMessage(null);
    setIsProcessing(true);
    setProcessingStep('Recording verified token & locking date on timeline...');

    try {
      const mockUtr = `DEMO-UTR-${Math.floor(100000000000 + Math.random() * 900000000000)}`;
      const verifyRes = await fetch('/api/payment/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          paymentMethod: sourceMethod,
          utrNumber: mockUtr,
          razorpay_payment_id: `pay_demo_${Date.now()}`,
          razorpay_signature: 'test_verified_signature',
          clientName: clientName || 'Client',
          clientPhone: clientPhone || '7904943234',
          clientEmail: clientEmail || 'client@photomagic.in',
          eventDate: eventDate || 'Scheduled on Consultation',
          eventCity: eventCity || 'Tamil Nadu',
          packageName: effectivePackageName,
          paidAmount: payableAmount,
          grossTotal: effectiveGrossTotal,
          remainingBalance: effectiveRemainingBalance,
          paymentStructure,
        }),
      });

      const verifyData = await verifyRes.json();
      if (verifyData.success && verifyData.receipt) {
        handlePaymentComplete(verifyData.receipt);
      } else {
        throw new Error(verifyData.error || 'Test verification failed');
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Quick verification error');
    } finally {
      setIsProcessing(false);
      setShowSandboxModal(false);
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
          clientName: clientName || (isTestRupeeMode ? 'PhotoMagic Gateway Tester' : ''),
          clientPhone: clientPhone || (isTestRupeeMode ? '7904943234' : ''),
          clientEmail:
            clientEmail || (isTestRupeeMode ? 'photomagicphotographystudio@gmail.com' : ''),
          eventDate: eventDate || 'Scheduled on Consultation',
          eventCity: eventCity || 'Tamil Nadu',
          packageName: effectivePackageName,
          paidAmount: payableAmount,
          grossTotal: effectiveGrossTotal,
          remainingBalance: effectiveRemainingBalance,
          paymentStructure,
        }),
      });

      const verifyData = await verifyRes.json();
      if (verifyData.success && verifyData.receipt) {
        handlePaymentComplete(verifyData.receipt);
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
          clientName: clientName || (isTestRupeeMode ? 'PhotoMagic Gateway Tester' : ''),
          clientPhone: clientPhone || (isTestRupeeMode ? '7904943234' : ''),
          clientEmail:
            clientEmail || (isTestRupeeMode ? 'photomagicphotographystudio@gmail.com' : ''),
          eventDate: eventDate || 'Scheduled on Consultation',
          eventCity: eventCity || 'Tamil Nadu',
          packageName: effectivePackageName,
          paidAmount: payableAmount,
          grossTotal: effectiveGrossTotal,
          remainingBalance: effectiveRemainingBalance,
          paymentStructure,
        }),
      });

      const verifyData = await verifyRes.json();
      if (verifyData.success && verifyData.receipt) {
        handlePaymentComplete(verifyData.receipt);
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

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-3 py-1.5 rounded-full border border-emerald-300 dark:border-emerald-800">
            <Lock size={12} />
            <span>256-Bit SSL Encrypted Bank Channel</span>
          </div>
          {!isTestRupeeMode && (
            <button
              type="button"
              onClick={() => setIsTestRupeeMode(true)}
              className="text-[11px] font-mono text-slate-400 hover:text-purple-600 dark:hover:text-purple-300 transition-colors"
              title="Activate removable ₹1 live testing mode"
            >
              [QA ₹1 Test]
            </button>
          )}
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
              <span>Phone: +91 7904943234 · photomagicphotographystudio@gmail.com</span>
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

            <Link
              href={`/invoice?ref=${encodeURIComponent(receiptData.referenceId || '')}&pkg=${encodeURIComponent(receiptData.packageName || '')}&paid=${receiptData.paidAmount || 0}&total=${receiptData.grossTotal || 0}&bal=${receiptData.remainingBalance || 0}&name=${encodeURIComponent(receiptData.clientName || '')}&phone=${encodeURIComponent(receiptData.clientPhone || '')}&email=${encodeURIComponent(receiptData.clientEmail || '')}&date=${encodeURIComponent(receiptData.eventDate || '')}&city=${encodeURIComponent(receiptData.eventCity || '')}&method=${encodeURIComponent(receiptData.paymentMethod || '')}&tx=${encodeURIComponent(receiptData.transactionId || '')}&struct=${encodeURIComponent(receiptData.paymentStructure || '')}&time=${encodeURIComponent(receiptData.verifiedAt || '')}`}
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-purple-700 via-purple-600 to-rose-600 hover:opacity-95 text-white text-xs font-nav font-bold uppercase tracking-wider flex items-center gap-2 shadow-lg transition-all"
            >
              <FileText size={15} />
              <span>Open Dedicated Invoice & Share Page →</span>
            </Link>

            <Link href={ROUTES.PUBLIC.MY_EVENTS}>
              <button className="px-7 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-nav font-bold uppercase tracking-wider shadow-lg border border-white/10">
                Enter Client Portal (My Events)
              </button>
            </Link>
          </div>
        </div>
      ) : (
        /* CHECKOUT CONFIGURATOR & PAYMENT METHODS */
        <div className="flex flex-col gap-6">
          {/* REMOVABLE 1 RUPEE PAYMENT TESTING BANNER (ONLY DISPLAYED IN TEST MODE) */}
          {isTestRupeeMode && (
            <div className="p-4 sm:p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30 dark:border-amber-400/30 flex flex-col md:flex-row md:items-center justify-between gap-4 animate-in fade-in duration-200">
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 font-bold flex items-center justify-center flex-shrink-0 shadow-sm">
                  <FlaskConical size={18} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-hero font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                      Live Payment Gateway ₹1 Verification Mode
                    </span>
                    <span className="text-[9px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700 uppercase">
                      Active: ₹1.00
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-snug mt-1">
                    Payable amount is locked to <strong>₹1.00</strong> to test UPI QR scanning,
                    mobile apps, and Razorpay live cards to{' '}
                    <strong>{STUDIO_BANKING_DETAILS.phoneUpiId}</strong> (Rozar Khan).
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 flex-shrink-0">
                <button
                  type="button"
                  onClick={() => {
                    setClientName('Rozar Khan (Gateway Test)');
                    setClientPhone('7904943234');
                    setClientEmail('photomagicphotographystudio@gmail.com');
                    setEventCity('Madurai');
                    setEventDate(new Date().toISOString().split('T')[0]);
                  }}
                  className="px-3.5 py-2 rounded-xl bg-white dark:bg-purple-950/80 hover:bg-slate-100 border border-slate-300 dark:border-purple-800 text-slate-800 dark:text-purple-200 text-xs font-mono font-semibold transition-colors"
                >
                  Autofill QA Data
                </button>

                <button
                  type="button"
                  onClick={() => setIsTestRupeeMode(false)}
                  className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-mono font-bold uppercase transition-all flex items-center gap-1.5 shadow-sm"
                >
                  <X size={14} />
                  <span>Exit ₹1 Mode</span>
                </button>
              </div>
            </div>
          )}

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
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <span className="font-mono text-xs uppercase tracking-wider text-purple-900 dark:text-purple-300 font-bold">
                    02. Choose Payment Structure
                  </span>
                  {isTestRupeeMode && (
                    <span className="text-[10px] font-mono text-amber-700 dark:text-amber-400 font-bold bg-amber-100/80 dark:bg-amber-950/60 px-2.5 py-0.5 rounded-full border border-amber-300 dark:border-amber-800">
                      Live QA Mode: All structures charge ₹1.00
                    </span>
                  )}
                </div>

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
                        {isTestRupeeMode
                          ? 'Test live 25% token flow with ₹1.'
                          : 'Lock your date on calendar immediately.'}
                      </p>
                    </div>
                    <span className="font-mono text-base font-extrabold text-purple-950 dark:text-white mt-3 block">
                      {formatCurrency(isTestRupeeMode ? 1 : Math.round(grossTotal * 0.25))}
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
                        {isTestRupeeMode
                          ? 'Test live 50% milestone flow with ₹1.'
                          : 'Includes pre-production priority.'}
                      </p>
                    </div>
                    <span className="font-mono text-base font-extrabold text-purple-950 dark:text-white mt-3 block">
                      {formatCurrency(isTestRupeeMode ? 1 : Math.round(grossTotal * 0.5))}
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
                        {isTestRupeeMode ? 'Full Settlement' : '5% Instant Discount'}
                      </span>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white mt-1">
                        100% Full Payment
                      </h4>
                      <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-1 leading-snug">
                        {isTestRupeeMode
                          ? 'Test 100% full settlement flow with ₹1.'
                          : 'Save 5% with single full settlement.'}
                      </p>
                    </div>
                    <span className="font-mono text-base font-extrabold text-emerald-800 dark:text-emerald-400 mt-3 block">
                      {formatCurrency(
                        isTestRupeeMode ? 1 : grossTotal - Math.round(grossTotal * 0.05),
                      )}
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
                          Supports UPI (GPay/PhonePe), Credit & Debit Cards (Visa, RuPay,
                          Mastercard), 50+ NetBanking banks & Wallets.
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

                {/* METHOD 2: DYNAMIC & UNIVERSAL UPI QR CODE */}
                {paymentMethod === 'upi_qr' && (
                  <form
                    onSubmit={handleUpiVerification}
                    className="p-6 rounded-2xl bg-purple-50/60 dark:bg-purple-950/30 border border-purple-200/80 dark:border-purple-900/40 flex flex-col gap-6"
                  >
                    {/* Mode Selector Tabs: Universal vs Auto-Fill */}
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
                          Select UPI QR Mode
                        </span>
                        <span className="text-[10px] font-mono text-emerald-700 dark:text-emerald-400 font-bold bg-emerald-100/70 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full">
                          NPCI UPI 2.0 Compliant
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => setQrMode('universal')}
                          className={`p-3 rounded-xl border text-left flex flex-col gap-1 transition-all ${
                            qrMode === 'universal'
                              ? 'bg-purple-900 text-white border-purple-700 shadow-sm'
                              : 'bg-white dark:bg-purple-950/40 text-slate-700 dark:text-purple-200 border-slate-200 dark:border-purple-800 hover:border-purple-400'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold font-hero flex items-center gap-1.5">
                              <ShieldCheck
                                size={14}
                                className={
                                  qrMode === 'universal' ? 'text-emerald-400' : 'text-emerald-600'
                                }
                              />
                              Universal Scan QR
                            </span>
                            <span
                              className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded-full ${
                                qrMode === 'universal'
                                  ? 'bg-white/20 text-white'
                                  : 'bg-emerald-100 text-emerald-800'
                              }`}
                            >
                              Recommended
                            </span>
                          </div>
                          <p
                            className={`text-[10px] leading-tight ${
                              qrMode === 'universal'
                                ? 'text-purple-200'
                                : 'text-slate-500 dark:text-slate-400'
                            }`}
                          >
                            Zero bank declines. Scan and manually enter{' '}
                            <strong>{formatCurrency(payableAmount)}</strong> in your app.
                          </p>
                        </button>

                        <button
                          type="button"
                          onClick={() => setQrMode('autofill')}
                          className={`p-3 rounded-xl border text-left flex flex-col gap-1 transition-all ${
                            qrMode === 'autofill'
                              ? 'bg-purple-900 text-white border-purple-700 shadow-sm'
                              : 'bg-white dark:bg-purple-950/40 text-slate-700 dark:text-purple-200 border-slate-200 dark:border-purple-800 hover:border-purple-400'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold font-hero flex items-center gap-1.5">
                              <Zap
                                size={14}
                                className={
                                  qrMode === 'autofill' ? 'text-amber-300' : 'text-amber-500'
                                }
                              />
                              Auto-Fill Amount QR
                            </span>
                            <span
                              className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded-full ${
                                qrMode === 'autofill'
                                  ? 'bg-white/20 text-white'
                                  : 'bg-purple-100 text-purple-800'
                              }`}
                            >
                              Pre-filled
                            </span>
                          </div>
                          <p
                            className={`text-[10px] leading-tight ${
                              qrMode === 'autofill'
                                ? 'text-purple-200'
                                : 'text-slate-500 dark:text-slate-400'
                            }`}
                          >
                            Pre-locks exactly {formatCurrency(payableAmount)}. (Switch to Universal
                            if your bank restricts).
                          </p>
                        </button>
                      </div>
                    </div>

                    {/* Payee VPA Chooser */}
                    <div className="flex flex-col gap-1.5">
                      <span className="text-[11px] font-mono font-semibold text-slate-600 dark:text-slate-400">
                        Select Target Studio UPI ID:
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {[
                          { id: STUDIO_BANKING_DETAILS.upiId, label: 'rozarkhan@ptyes (Primary)' },
                          {
                            id: STUDIO_BANKING_DETAILS.phoneUpiId,
                            label: '7904943234@upi (Mobile UPI)',
                          },
                          {
                            id: STUDIO_BANKING_DETAILS.hdfcUpiId,
                            label: '7904943234@okhdfcbank (GPay HDFC)',
                          },
                        ].map((vpa) => (
                          <button
                            key={vpa.id}
                            type="button"
                            onClick={() => setSelectedUpiVpa(vpa.id)}
                            className={`text-xs font-mono px-3 py-1.5 rounded-lg border transition-all ${
                              selectedUpiVpa === vpa.id
                                ? 'bg-purple-950 text-purple-100 border-purple-600 font-bold ring-1 ring-purple-500'
                                : 'bg-white dark:bg-purple-900/30 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-purple-800 hover:border-purple-400'
                            }`}
                          >
                            {vpa.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* QR Presentation & Mobile Pay */}
                    <div className="flex flex-col md:flex-row items-center gap-6 p-4 rounded-2xl bg-white dark:bg-purple-900/30 border border-purple-200/90 dark:border-purple-800/60 shadow-sm">
                      {/* Live Dynamic QR Code Container */}
                      <div className="p-3 bg-white rounded-2xl border border-purple-200 shadow-sm flex flex-col items-center gap-2 flex-shrink-0">
                        <img
                          src={dynamicQrUrl}
                          alt="Scan UPI QR Code to Pay Token"
                          className="w-52 h-52 rounded-xl object-contain"
                        />
                        <div className="text-center flex flex-col items-center">
                          <span className="text-[11px] font-mono text-slate-800 font-bold">
                            {qrMode === 'universal' ? (
                              <span className="text-emerald-700">
                                Scan & Enter {formatCurrency(payableAmount)}
                              </span>
                            ) : (
                              <span className="text-purple-900">
                                Pre-locked: {formatCurrency(payableAmount)}
                              </span>
                            )}
                          </span>
                          <span className="text-[9px] font-mono text-slate-500">
                            Scan with GPay · PhonePe · Paytm · BHIM
                          </span>
                        </div>
                      </div>

                      {/* VPA Details, Copy Actions & Direct Mobile Intent */}
                      <div className="flex-1 flex flex-col gap-3 w-full">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-mono font-bold text-rose-700 dark:text-rose-400 uppercase tracking-wider block">
                              Payee: Rozar Khan
                            </span>
                            <span className="text-[10px] font-mono text-purple-700 bg-purple-50 px-2 py-0.5 rounded border border-purple-200">
                              PhotoMagic Studios
                            </span>
                          </div>
                          <h4 className="text-sm font-bold font-hero text-slate-900 dark:text-white mt-1">
                            Amount Due Now: {formatCurrency(payableAmount)}
                          </h4>
                        </div>

                        {/* Active UPI ID Display with Copy */}
                        <div className="p-3 rounded-xl bg-slate-50 dark:bg-purple-950/60 border border-slate-200 dark:border-purple-800 flex justify-between items-center text-xs font-mono">
                          <div>
                            <span className="text-[10px] text-slate-500 block">
                              Active Payee UPI ID
                            </span>
                            <span className="font-bold text-purple-950 dark:text-purple-200 text-sm">
                              {selectedUpiVpa}
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() => copyToClipboard(selectedUpiVpa, 'upi')}
                            className="px-3 py-1.5 rounded-lg bg-purple-100 dark:bg-purple-950 text-purple-900 dark:text-purple-200 hover:bg-purple-200 flex items-center gap-1 font-bold transition-colors"
                          >
                            {copiedField === 'upi' ? <Check size={13} /> : <Copy size={13} />}
                            <span>{copiedField === 'upi' ? 'Copied' : 'Copy'}</span>
                          </button>
                        </div>

                        {/* Guidance banner for smooth bank authorization */}
                        <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 text-amber-900 dark:text-amber-200 text-[11px] leading-relaxed flex items-start gap-2">
                          <Info size={14} className="text-amber-700 mt-0.5 flex-shrink-0" />
                          <div>
                            <strong>Bank Security Note:</strong> If your bank declines with{' '}
                            <em>&quot;Transaction not permitted to payee&quot;</em>, it is due to an
                            Indian bank policy on fixed-amount dynamic QRs for personal accounts.
                            Simply switch to the <strong>Universal Scan QR</strong> above and enter{' '}
                            {formatCurrency(payableAmount)} manually.
                          </div>
                        </div>

                        {/* Direct Mobile App Intent Buttons */}
                        <div className="flex flex-col gap-1.5 pt-1">
                          <span className="text-[10px] font-mono text-slate-500 font-bold uppercase tracking-wider">
                            Open in UPI App on Mobile:
                          </span>
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                            <a
                              href={mobileIntentUrls.gpay}
                              className="py-2 px-2.5 rounded-lg bg-white dark:bg-purple-950/80 border border-slate-300 dark:border-purple-800 hover:border-purple-600 text-slate-800 dark:text-purple-200 text-[11px] font-mono font-bold flex items-center justify-center gap-1 text-center shadow-sm hover:shadow"
                            >
                              <Smartphone size={12} className="text-blue-600" />
                              <span>GPay</span>
                            </a>

                            <a
                              href={mobileIntentUrls.phonepe}
                              className="py-2 px-2.5 rounded-lg bg-white dark:bg-purple-950/80 border border-slate-300 dark:border-purple-800 hover:border-purple-600 text-slate-800 dark:text-purple-200 text-[11px] font-mono font-bold flex items-center justify-center gap-1 text-center shadow-sm hover:shadow"
                            >
                              <Smartphone size={12} className="text-purple-600" />
                              <span>PhonePe</span>
                            </a>

                            <a
                              href={mobileIntentUrls.paytm}
                              className="py-2 px-2.5 rounded-lg bg-white dark:bg-purple-950/80 border border-slate-300 dark:border-purple-800 hover:border-purple-600 text-slate-800 dark:text-purple-200 text-[11px] font-mono font-bold flex items-center justify-center gap-1 text-center shadow-sm hover:shadow"
                            >
                              <Smartphone size={12} className="text-cyan-600" />
                              <span>Paytm</span>
                            </a>

                            <a
                              href={mobileIntentUrls.generic}
                              className="py-2 px-2.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-[11px] font-mono font-bold flex items-center justify-center gap-1 text-center shadow-sm"
                            >
                              <Smartphone size={12} />
                              <span>Any App</span>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* UTR Submission & Date-Lock Confirmation Box */}
                    <div className="pt-4 border-t border-purple-200 dark:border-purple-800/60 flex flex-col gap-3">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                        <label className="text-xs font-mono font-bold text-slate-800 dark:text-slate-200">
                          Enter 12-Digit UPI UTR / Reference No. after completing payment: *
                        </label>
                        <span className="text-[10px] font-mono text-purple-700 dark:text-purple-300">
                          Found in your payment app under &quot;UPI Ref No.&quot; or &quot;UTR&quot;
                        </span>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-2">
                        <input
                          type="text"
                          required
                          placeholder="e.g. 423985019284"
                          value={upiUtrNumber}
                          onChange={(e) => setUpiUtrNumber(e.target.value)}
                          className="flex-1 p-3.5 rounded-xl border border-purple-300 dark:border-purple-800 bg-white dark:bg-purple-950/60 text-xs font-mono font-bold text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-purple-500"
                        />
                        <button
                          type="submit"
                          disabled={isProcessing}
                          className="px-7 py-3.5 rounded-xl bg-purple-900 hover:bg-purple-800 text-white text-xs font-nav font-bold uppercase tracking-wider shadow-md disabled:opacity-50 transition-all flex items-center justify-center gap-2"
                        >
                          {isProcessing ? (
                            <RefreshCw size={14} className="animate-spin" />
                          ) : (
                            <CheckCircle2 size={14} />
                          )}
                          <span>Verify & Lock Date</span>
                        </button>

                        {/* Demo Quick Verify for testing and sandbox */}
                        <button
                          type="button"
                          onClick={() => handleQuickTestVerification('upi_qr')}
                          disabled={isProcessing}
                          title="Simulate successful booking verification during development/demo"
                          className="px-4 py-3.5 rounded-xl border border-purple-300 dark:border-purple-700 bg-purple-50 dark:bg-purple-950 text-purple-900 dark:text-purple-200 hover:bg-purple-100 text-xs font-mono font-bold flex items-center justify-center gap-1.5 transition-all"
                        >
                          <FlaskConical
                            size={14}
                            className="text-purple-600 dark:text-purple-300"
                          />
                          <span>Demo Quick Verify</span>
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
                          onClick={() =>
                            copyToClipboard(STUDIO_BANKING_DETAILS.accountName, 'name')
                          }
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
                          onClick={() =>
                            copyToClipboard(STUDIO_BANKING_DETAILS.accountNumber, 'acc')
                          }
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
                    {effectivePackageName}
                  </h3>
                  <span className="text-xs text-purple-900 dark:text-purple-300 font-medium">
                    {isTestRupeeMode
                      ? 'Removable ₹1 Payment Verification Token'
                      : matchedPackage.creativeTier}
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

                  {discountAmount > 0 && !isTestRupeeMode && (
                    <div className="flex justify-between items-center text-emerald-700 dark:text-emerald-400 font-bold bg-emerald-50 dark:bg-emerald-950/40 p-2 rounded-lg">
                      <span>Pay-in-Full Discount (5%):</span>
                      <span>-{formatCurrency(discountAmount)}</span>
                    </div>
                  )}

                  {isTestRupeeMode && (
                    <div className="flex justify-between items-center text-amber-800 dark:text-amber-300 font-bold bg-amber-50 dark:bg-amber-950/40 p-2.5 rounded-xl border border-amber-200 dark:border-amber-900/60">
                      <span className="flex items-center gap-1.5">
                        <FlaskConical size={14} className="text-amber-600" />
                        Live Testing Override:
                      </span>
                      <span>Locked to ₹1.00</span>
                    </div>
                  )}

                  <div className="flex justify-between items-center pt-2 border-t border-slate-200 dark:border-purple-900/40 text-slate-900 dark:text-white font-bold">
                    <span>Gross Collection Value:</span>
                    <span>{formatCurrency(effectiveGrossTotal)}</span>
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
                    {isTestRupeeMode
                      ? '⚡ Live Gateway Verification: Charges strictly ₹1.00 across all channels.'
                      : paymentStructure === 'token_25'
                        ? '25% Advance Token to lock your date.'
                        : paymentStructure === 'milestone_50'
                          ? '50% Milestone Booking.'
                          : '100% Full Payment with 5% Instant Savings.'}
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
        </div>
      )}

      {/* RAZORPAY SANDBOX SIMULATION MODAL (When Live Keys are not configured) */}
      {showSandboxModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-white dark:bg-[#150A22] rounded-3xl border border-purple-200 dark:border-purple-800 shadow-2xl p-6 sm:p-8 flex flex-col gap-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-purple-900 dark:text-purple-300">
                <FlaskConical size={20} className="text-purple-600" />
                <h3 className="font-hero font-bold text-base text-slate-900 dark:text-white">
                  Razorpay Sandbox Active
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowSandboxModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-white"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-purple-50 dark:bg-purple-950/50 border border-purple-200 dark:border-purple-800/80 flex flex-col gap-2 text-xs text-slate-700 dark:text-slate-300">
              <div className="flex justify-between font-mono font-bold">
                <span>Collection:</span>
                <span>{packageName}</span>
              </div>
              <div className="flex justify-between font-mono font-bold text-purple-900 dark:text-purple-300">
                <span>Token Payable:</span>
                <span>{formatCurrency(payableAmount)}</span>
              </div>
              <p className="text-[11px] text-slate-500 pt-2 border-t border-purple-200 dark:border-purple-800/60 leading-relaxed">
                Live Razorpay credentials are not configured in your environment. You can simulate a
                successful test payment confirmation to test the date-lock and tax invoice
                generation, or switch to Dynamic UPI QR.
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <button
                type="button"
                onClick={() => handleQuickTestVerification('razorpay')}
                disabled={isProcessing}
                className="w-full py-3.5 rounded-xl bg-purple-900 hover:bg-purple-800 text-white font-nav text-xs font-bold uppercase tracking-wider shadow-md transition-all flex items-center justify-center gap-2"
              >
                {isProcessing ? (
                  <RefreshCw size={14} className="animate-spin" />
                ) : (
                  <CheckCircle2 size={14} />
                )}
                <span>Simulate Successful Payment</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setShowSandboxModal(false);
                  setPaymentMethod('upi_qr');
                }}
                className="w-full py-3 rounded-xl border border-slate-300 dark:border-purple-700 text-slate-800 dark:text-purple-200 text-xs font-mono font-bold hover:bg-slate-50 dark:hover:bg-purple-950/60 transition-all flex items-center justify-center gap-1.5"
              >
                <QrCode size={14} />
                <span>Switch to Dynamic UPI QR</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
