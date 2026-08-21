'use client';

import React, { useState, useMemo } from 'react';
import { PackageItem, STUDIO_PROFILE, ROUTES } from '@photomagic/config';
import { formatCurrency } from '@photomagic/shared';
import {
  X,
  CheckCircle2,
  Sparkles,
  Camera,
  Film,
  Compass,
  Layers,
  Clock,
  ShieldCheck,
  ArrowRight,
  MessageCircle,
  Plus,
  Check,
  Calendar,
  Lock,
  Tag,
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export interface PackagePreviewModalProps {
  packageData: PackageItem | null;
  isOpen: boolean;
  onClose: () => void;
  onProceedToBooking?: (
    pkg: PackageItem,
    selectedAddons: string[],
    calculatedPrice: number,
  ) => void;
}

interface AddonOption {
  id: string;
  name: string;
  price: number;
  description: string;
  icon: React.ReactNode;
}

const AVAILABLE_ADDONS: AddonOption[] = [
  {
    id: 'addon-prewedding',
    name: 'Destination Pre-Wedding Shoot',
    price: 25000,
    description: '1 Full Day scenic couple session with 4K teaser reel & 50 retouched portraits.',
    icon: <Camera size={16} className="text-purple-600" />,
  },
  {
    id: 'addon-parent-album',
    name: 'Italian Leather Parent Album',
    price: 10999,
    description: '10x14 Handcrafted flush-mount album (30 Pages) in luxury gift box.',
    icon: <Layers size={16} className="text-amber-600" />,
  },
  {
    id: 'addon-drone-day',
    name: 'Additional 4K Drone Coverage',
    price: 15000,
    description: 'Licensed aerial cinematic cinematography for grand procession & venue views.',
    icon: <Compass size={16} className="text-sky-600" />,
  },
  {
    id: 'addon-sameday-reel',
    name: 'Same-Day AI Photo Preview Reel',
    price: 15000,
    description:
      'First 50 master color-graded portraits delivered within 6 hours for instant sharing.',
    icon: <Sparkles size={16} className="text-rose-600" />,
  },
];

export const PackagePreviewModal: React.FC<PackagePreviewModalProps> = ({
  packageData,
  isOpen,
  onClose,
  onProceedToBooking,
}) => {
  const router = useRouter();
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [eventDate, setEventDate] = useState<string>('');
  const [eventCity, setEventCity] = useState<string>('');

  // Toggle addon
  const toggleAddon = (id: string) => {
    setSelectedAddons((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  // Pricing calculations
  const { totalPrice, advanceAmount, addonsTotal } = useMemo(() => {
    if (!packageData) return { totalPrice: 0, advanceAmount: 0, addonsTotal: 0 };
    const base = packageData.price;
    const addAmt = selectedAddons.reduce((sum, id) => {
      const found = AVAILABLE_ADDONS.find((a) => a.id === id);
      return sum + (found ? found.price : 0);
    }, 0);
    const total = base + addAmt;
    // 25% Advance Token to lock date
    const advance = Math.round(total * 0.25);
    return { totalPrice: total, advanceAmount: advance, addonsTotal: addAmt };
  }, [packageData, selectedAddons]);

  if (!isOpen || !packageData) return null;

  const handleProceed = () => {
    if (onProceedToBooking) {
      onProceedToBooking(packageData, selectedAddons, totalPrice);
    } else {
      const queryParams = new URLSearchParams({
        package: packageData.id,
        addons: selectedAddons.join(','),
        total: totalPrice.toString(),
        advance: advanceAmount.toString(),
        date: eventDate,
        city: eventCity,
      });
      router.push(`/checkout?${queryParams.toString()}`);
    }
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[92vh] flex flex-col bg-white dark:bg-[#150A22] rounded-3xl shadow-2xl border border-purple-200/90 dark:border-purple-900/60 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Header Banner */}
        <div className="relative p-6 sm:p-8 bg-gradient-to-r from-purple-900 via-slate-900 to-slate-950 text-white flex items-start justify-between border-b border-purple-800/40">
          <div className="flex flex-col gap-2 max-w-xl">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-mono text-[10px] uppercase tracking-widest text-rose-300 font-bold bg-white/10 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
                {packageData.creativeTier}
              </span>
              {packageData.badge && (
                <span className="font-mono text-[10px] uppercase tracking-widest text-amber-300 font-bold bg-amber-500/20 px-3 py-1 rounded-full border border-amber-400/40 flex items-center gap-1">
                  <Sparkles size={11} />
                  <span>{packageData.badge}</span>
                </span>
              )}
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold font-hero text-white tracking-tight mt-1">
              {packageData.name}
            </h2>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal">
              {packageData.description}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2.5 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Content Scroll Area */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 flex flex-col gap-8 text-slate-900 dark:text-slate-100">
          {/* Investment & Advance Token Summary Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-5 rounded-2xl bg-[#FAF8FC] dark:bg-purple-950/40 border border-purple-200/80 dark:border-purple-800/50">
            <div className="flex flex-col">
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 dark:text-purple-300 font-bold">
                Total Collection Investment
              </span>
              <span className="text-2xl sm:text-3xl font-extrabold font-mono text-purple-950 dark:text-white mt-0.5">
                {formatCurrency(totalPrice)}
              </span>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
                Includes all taxes & color grading
              </span>
            </div>

            <div className="flex flex-col sm:border-l sm:border-slate-200 dark:sm:border-purple-800/60 sm:pl-5">
              <span className="text-[11px] font-mono uppercase tracking-wider text-rose-700 dark:text-rose-400 font-bold flex items-center gap-1">
                <Lock size={12} />
                <span>25% Date-Lock Advance Token</span>
              </span>
              <span className="text-2xl sm:text-3xl font-extrabold font-mono text-rose-700 dark:text-rose-400 mt-0.5">
                {formatCurrency(advanceAmount)}
              </span>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
                Pay token now to lock your date on Rozar Khan's calendar
              </span>
            </div>

            <div className="flex flex-col sm:border-l sm:border-slate-200 dark:sm:border-purple-800/60 sm:pl-5">
              <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-800 dark:text-emerald-400 font-bold flex items-center gap-1">
                <ShieldCheck size={13} />
                <span>Studio Guarantees</span>
              </span>
              <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 mt-1">
                {packageData.coverageDays} Day(s) Coverage · 10-Year Cloud Vault
              </span>
              <span className="text-[10px] text-emerald-700 dark:text-emerald-400 mt-0.5 font-mono">
                100% Date Protection Policy
              </span>
            </div>
          </div>

          {/* Deliverables & Inclusions Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left: What's Included */}
            <div className="p-6 rounded-2xl bg-white dark:bg-purple-950/20 border border-slate-200 dark:border-purple-900/50 shadow-sm flex flex-col gap-4">
              <div className="flex items-center gap-2 border-b border-slate-100 dark:border-purple-900/40 pb-3">
                <Camera size={16} className="text-purple-700 dark:text-purple-400" />
                <h3 className="font-hero font-bold text-sm uppercase tracking-wider text-slate-900 dark:text-white">
                  Crew & Deliverables
                </h3>
              </div>

              <div className="flex flex-col gap-2.5">
                {packageData.components.map((comp: string, idx: number) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2.5 text-xs text-slate-800 dark:text-slate-200"
                  >
                    <CheckCircle2
                      size={15}
                      className="text-purple-700 dark:text-purple-400 flex-shrink-0 mt-0.5"
                    />
                    <span className="font-medium leading-relaxed">{comp}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Master Output & Turnaround */}
            <div className="p-6 rounded-2xl bg-white dark:bg-purple-950/20 border border-slate-200 dark:border-purple-900/50 shadow-sm flex flex-col gap-4">
              <div className="flex items-center gap-2 border-b border-slate-100 dark:border-purple-900/40 pb-3">
                <Clock size={16} className="text-rose-600 dark:text-rose-400" />
                <h3 className="font-hero font-bold text-sm uppercase tracking-wider text-slate-900 dark:text-white">
                  Final Deliverables & Turnaround
                </h3>
              </div>

              <div className="flex flex-col gap-2.5">
                {packageData.deliverables.map((del: string, idx: number) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2.5 text-xs text-slate-800 dark:text-slate-200"
                  >
                    <Sparkles size={15} className="text-amber-500 flex-shrink-0 mt-0.5" />
                    <span className="font-medium leading-relaxed">{del}</span>
                  </div>
                ))}
                {packageData.complimentaryItems &&
                  packageData.complimentaryItems.map((comp: string, idx: number) => (
                    <div
                      key={`comp-${idx}`}
                      className="flex items-start gap-2.5 text-xs text-emerald-800 dark:text-emerald-300 font-semibold"
                    >
                      <Tag size={15} className="text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span>Complimentary Perk: {comp}</span>
                    </div>
                  ))}
              </div>
            </div>
          </div>

          {/* Bespoke Add-on Enhancements */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-widest text-rose-700 dark:text-rose-400 font-bold block">
                  Custom Atelier Add-Ons
                </span>
                <h3 className="font-hero font-bold text-base text-slate-900 dark:text-white">
                  Enhance Your Wedding Collection
                </h3>
              </div>
              {selectedAddons.length > 0 && (
                <span className="text-xs font-mono font-bold text-purple-800 dark:text-purple-300 bg-purple-50 dark:bg-purple-950/60 px-3 py-1 rounded-full border border-purple-200">
                  +{formatCurrency(addonsTotal)} selected
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {AVAILABLE_ADDONS.map((addon) => {
                const isSelected = selectedAddons.includes(addon.id);
                return (
                  <div
                    key={addon.id}
                    onClick={() => toggleAddon(addon.id)}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-start justify-between gap-3 ${
                      isSelected
                        ? 'border-purple-600 bg-purple-50/80 dark:bg-purple-950/50 ring-2 ring-purple-600/30'
                        : 'border-slate-200 dark:border-purple-900/40 bg-white dark:bg-purple-950/10 hover:border-purple-300'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-xl bg-slate-100 dark:bg-purple-900/40 flex-shrink-0 mt-0.5">
                        {addon.icon}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-slate-900 dark:text-white">
                          {addon.name}
                        </span>
                        <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-0.5 leading-snug">
                          {addon.description}
                        </p>
                        <span className="font-mono text-xs font-extrabold text-purple-900 dark:text-purple-300 mt-1">
                          +{formatCurrency(addon.price)}
                        </span>
                      </div>
                    </div>

                    <div
                      className={`w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors ${
                        isSelected
                          ? 'bg-purple-700 text-white'
                          : 'border border-slate-300 text-transparent'
                      }`}
                    >
                      <Check size={14} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick Date & City Input for Direct Reservation */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-5 rounded-2xl bg-slate-50 dark:bg-purple-950/30 border border-slate-200 dark:border-purple-900/40">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-mono font-bold text-slate-800 dark:text-slate-200">
                Preferred Celebration Date (Optional)
              </label>
              <input
                type="date"
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
                className="p-3 rounded-xl border border-slate-300 dark:border-purple-800 bg-white dark:bg-purple-950/60 text-xs font-mono font-semibold text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-mono font-bold text-slate-800 dark:text-slate-200">
                City / Mandapam Venue (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g. Chennai, Madurai, Coimbatore"
                value={eventCity}
                onChange={(e) => setEventCity(e.target.value)}
                className="p-3 rounded-xl border border-slate-300 dark:border-purple-800 bg-white dark:bg-purple-950/60 text-xs font-medium text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>
        </div>

        {/* Modal Bottom Sticky Action Bar */}
        <div className="p-5 sm:p-6 bg-slate-50 dark:bg-purple-950/80 border-t border-slate-200 dark:border-purple-900/60 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex flex-col">
              <span className="text-[10px] font-mono uppercase text-slate-500 font-bold">
                Lock Date with Token
              </span>
              <span className="font-mono text-xl font-extrabold text-rose-700 dark:text-rose-400">
                {formatCurrency(advanceAmount)}
              </span>
              <span className="text-[10px] text-slate-500">
                (Total Investment: {formatCurrency(totalPrice)})
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <a
              href={`https://wa.me/917904943234?text=Hi%20Rozar%20Khan,%20I%20am%20interested%20in%20${encodeURIComponent(
                packageData.name,
              )}%20for%20my%20event.`}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-3 rounded-xl border border-emerald-300 dark:border-emerald-700 text-emerald-800 dark:text-emerald-300 bg-emerald-50/80 dark:bg-emerald-950/40 text-xs font-nav font-bold uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-emerald-100 transition-colors"
            >
              <MessageCircle size={15} />
              <span className="hidden sm:inline">WhatsApp Concierge</span>
            </a>

            <button
              onClick={handleProceed}
              className="flex-1 sm:flex-initial px-8 py-3.5 rounded-xl bg-gradient-to-r from-purple-700 via-rose-600 to-purple-700 text-white font-nav text-xs font-bold uppercase tracking-[0.18em] shadow-lg hover:opacity-95 transition-all flex items-center justify-center gap-2"
            >
              <span>Proceed to Booking & Gateway</span>
              <ArrowRight size={15} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
