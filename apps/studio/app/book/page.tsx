'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { OFFICIAL_CATEGORIES, DEFAULT_PACKAGES, STUDIO_PROFILE, ROUTES } from '@photomagic/config';
import { formatCurrency } from '@photomagic/shared';
import {
  Calendar,
  CheckCircle2,
  Clock,
  Sparkles,
  MapPin,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Building,
  Phone,
  Mail,
  User,
  Plus,
  Trash2,
} from 'lucide-react';
import Link from 'next/link';

interface MultiEventDetail {
  id: string;
  name: string;
  date: string;
  startTime: string;
  endTime: string;
}

export default function CheckYourDatePage() {
  const searchParams = useSearchParams();
  const preSelectedCategory = searchParams.get('category') || 'weddings';
  const preSelectedPackage = searchParams.get('package');
  const isCustom = searchParams.get('custom') === 'true';

  const [step, setStep] = useState<number>(1);

  // Step 1: Category
  const [selectedCategory, setSelectedCategory] = useState<string>(preSelectedCategory);

  // Step 2: Event Details
  const [primaryDate, setPrimaryDate] = useState<string>('');
  const [days, setDays] = useState<number>(1);
  const [eventType, setEventType] = useState<string>('Traditional Wedding & Reception');

  // Step 3: Multi-events
  const [multiEvents, setMultiEvents] = useState<MultiEventDetail[]>([
    { id: '1', name: 'Main Ceremony (Muhurtham)', date: '', startTime: '06:00', endTime: '13:00' },
  ]);

  // Step 4: Venue & Location
  const [venueName, setVenueName] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [city, setCity] = useState<string>('Chennai');
  const [state, setState] = useState<string>('Tamil Nadu');
  const [locationNotes, setLocationNotes] = useState<string>('');

  // Step 5: Package Choice
  const [packageChoice, setPackageChoice] = useState<'default' | 'custom'>(
    isCustom ? 'custom' : 'default',
  );
  const [selectedPackageId, setSelectedPackageId] = useState<string>(
    preSelectedPackage || 'pkg-obsidian',
  );

  // Step 6: Contact Information
  const [clientName, setClientName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [whatsapp, setWhatsapp] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [notes, setNotes] = useState<string>('');

  // Step 7: Submission state
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const addMultiEvent = () => {
    setMultiEvents((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        name: `Sub-event ${prev.length + 1}`,
        date: primaryDate,
        startTime: '18:00',
        endTime: '22:00',
      },
    ]);
  };

  const removeMultiEvent = (id: string) => {
    if (multiEvents.length <= 1) return;
    setMultiEvents((prev) => prev.filter((e) => e.id !== id));
  };

  const updateMultiEvent = (id: string, field: keyof MultiEventDetail, val: string) => {
    setMultiEvents((prev) => prev.map((e) => (e.id === id ? { ...e, [field]: val } : e)));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate recording on studio timeline
      await new Promise((resolve) => setTimeout(resolve, 900));
      setIsSubmitting(false);
      setIsSubmitted(true);
    } catch {
      setIsSubmitting(false);
      alert('Error submitting date inquiry. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-[var(--color-canvas,#FFF5F7)] text-[var(--color-text-primary,#1E0A3C)] flex flex-col transition-colors duration-300">
      <Navbar />

      <main className="flex-1 pt-36 pb-24 px-6 max-w-4xl mx-auto w-full">
        {/* Step Indicator Header */}
        {!isSubmitted && (
          <header className="mb-12 text-center flex flex-col items-center gap-3">
            <div className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-rose-600 dark:text-rose-400 font-bold bg-rose-50 dark:bg-rose-950/40 px-3 py-1 rounded-full border border-rose-200 dark:border-rose-800/40">
              <Calendar size={12} />
              <span>Step 0{step} of 06 • Private Date Concierge</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold font-hero text-purple-950 dark:text-purple-50 tracking-tight">
              Check Your Date Availability
            </h1>
            <p className="font-tamil text-xs sm:text-sm text-purple-800 dark:text-purple-300 font-medium">
              இல்லத்தின் இன்ப நிகழ்வுகள், விழிகளின் வழியே
            </p>

            {/* Progress Step Bar */}
            <div className="w-full max-w-md h-1.5 bg-purple-100 dark:bg-purple-950 rounded-full mt-4 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-purple-600 to-rose-500 transition-all duration-300"
                style={{ width: `${(step / 6) * 100}%` }}
              />
            </div>
          </header>
        )}

        {/* Step 7 / Cinematic Confirmation View */}
        {isSubmitted ? (
          <section className="p-8 sm:p-14 rounded-3xl bg-gradient-to-r from-purple-950 via-[#19062B] to-purple-950 text-white text-center flex flex-col items-center gap-6 shadow-museum border border-purple-800/50 animate-in fade-in zoom-in-95 duration-500">
            <div className="w-20 h-20 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center shadow-lg">
              <CheckCircle2 size={44} />
            </div>

            <div className="flex flex-col gap-2">
              <span className="font-mono text-xs uppercase tracking-[0.3em] text-gold-400 font-bold">
                Timeline Recorded
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-hero tracking-tight">
                Your Event has been Recorded on Our Timeline, {clientName}!
              </h2>
              <p className="text-sm text-purple-200/90 max-w-lg leading-relaxed mt-2">
                Thank you for entrusting your memories to PhotoMagic Studios by RK. Our concierge
                desk will review private team availability for{' '}
                <strong>{primaryDate || 'your scheduled dates'}</strong> and contact you via
                WhatsApp / Phone within 4 hours.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 text-left text-xs font-mono w-full max-w-md flex flex-col gap-2">
              <div className="flex justify-between text-purple-300">
                <span>Category:</span>
                <span className="text-white font-bold">{selectedCategory.toUpperCase()}</span>
              </div>
              <div className="flex justify-between text-purple-300">
                <span>Location:</span>
                <span className="text-white font-bold">
                  {city}, {state}
                </span>
              </div>
              <div className="flex justify-between text-purple-300">
                <span>Contact:</span>
                <span className="text-white font-bold">{phone}</span>
              </div>
            </div>

            <div className="pt-4 flex flex-wrap gap-4 justify-center">
              <Link href={ROUTES.PUBLIC.MY_EVENTS}>
                <button className="px-7 py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-nav text-xs font-bold uppercase tracking-wider">
                  Access My Events Portal
                </button>
              </Link>
              <Link href="/">
                <button className="px-7 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-nav text-xs font-semibold uppercase tracking-wider border border-white/20">
                  Return to Studio Home
                </button>
              </Link>
            </div>
          </section>
        ) : (
          <div className="p-6 sm:p-10 rounded-3xl bg-white dark:bg-[#170C22] border border-purple-200/80 dark:border-purple-800/40 shadow-museum">
            {/* STEP 1: What Are We Capturing? */}
            {step === 1 && (
              <div className="flex flex-col gap-6 animate-in fade-in duration-200">
                <div>
                  <h2 className="text-2xl font-bold font-hero text-purple-950 dark:text-purple-50">
                    What Are We Capturing?
                  </h2>
                  <p className="text-xs text-purple-800 dark:text-purple-300 mt-1">
                    Select your primary photography category:
                  </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                  {OFFICIAL_CATEGORIES.map((cat) => {
                    const isSelected = selectedCategory === cat.slug;
                    return (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => setSelectedCategory(cat.slug)}
                        className={`p-3 rounded-2xl flex flex-col items-center text-center gap-2 border transition-all ${
                          isSelected
                            ? 'border-purple-600 bg-purple-50 dark:bg-purple-950/60 ring-2 ring-purple-400/30'
                            : 'border-purple-200 dark:border-purple-800/40 bg-white dark:bg-[#170C22] hover:border-rose-400'
                        }`}
                      >
                        <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-purple-100 dark:bg-purple-950">
                          <img
                            src={cat.heroMedia}
                            alt={cat.actualName}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <span className="text-xs font-bold text-purple-950 dark:text-purple-100 font-hero truncate w-full">
                          {cat.actualName}
                        </span>
                      </button>
                    );
                  })}
                </div>

                <div className="flex justify-end pt-4 border-t border-purple-100 dark:border-purple-900/40">
                  <button
                    onClick={() => setStep(2)}
                    className="px-8 py-3 rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-nav text-xs font-bold uppercase tracking-wider flex items-center gap-2"
                  >
                    <span>Next: Event Dates</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: Event Details */}
            {step === 2 && (
              <div className="flex flex-col gap-6 animate-in fade-in duration-200">
                <div>
                  <h2 className="text-2xl font-bold font-hero text-purple-950 dark:text-purple-50">
                    Event Details & Duration
                  </h2>
                  <p className="text-xs text-purple-800 dark:text-purple-300 mt-1">
                    When is your milestone taking place?
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-xs font-bold text-purple-950 dark:text-purple-200 block mb-1">
                      Primary Event Date *
                    </label>
                    <input
                      type="date"
                      required
                      value={primaryDate}
                      onChange={(e) => setPrimaryDate(e.target.value)}
                      className="w-full text-xs px-4 py-3 rounded-xl bg-purple-50/50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800 text-purple-950 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-purple-950 dark:text-purple-200 block mb-1">
                      Number of Shooting Days
                    </label>
                    <div className="grid grid-cols-4 gap-2">
                      {[1, 2, 3, 4].map((d) => (
                        <button
                          key={d}
                          type="button"
                          onClick={() => setDays(d)}
                          className={`py-2.5 rounded-xl text-xs font-mono font-bold border transition-all ${
                            days === d
                              ? 'bg-purple-700 text-white border-purple-700'
                              : 'bg-purple-50 dark:bg-purple-950/40 border-purple-200 dark:border-purple-800 text-purple-950 dark:text-purple-200'
                          }`}
                        >
                          {d} Day{d > 1 ? 's' : ''}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex justify-between pt-4 border-t border-purple-100 dark:border-purple-900/40">
                  <button
                    onClick={() => setStep(1)}
                    className="px-6 py-3 rounded-xl border border-purple-200 dark:border-purple-800 text-purple-950 dark:text-purple-200 font-nav text-xs font-semibold uppercase tracking-wider flex items-center gap-2"
                  >
                    <ArrowLeft size={14} />
                    <span>Back</span>
                  </button>

                  <button
                    onClick={() => setStep(3)}
                    disabled={!primaryDate}
                    className="px-8 py-3 rounded-xl bg-purple-700 hover:bg-purple-800 disabled:opacity-50 text-white font-nav text-xs font-bold uppercase tracking-wider flex items-center gap-2"
                  >
                    <span>Next: Multi-Event Plan</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: Multi-Event Planning */}
            {step === 3 && (
              <div className="flex flex-col gap-6 animate-in fade-in duration-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold font-hero text-purple-950 dark:text-purple-50">
                      Multi-Event Breakdown
                    </h2>
                    <p className="text-xs text-purple-800 dark:text-purple-300 mt-1">
                      Add your event sub-ceremonies (e.g. Sangeet, Haldi, Reception).
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={addMultiEvent}
                    className="flex items-center gap-1.5 text-xs font-mono font-bold text-rose-600 dark:text-rose-400"
                  >
                    <Plus size={14} />
                    <span>Add Event</span>
                  </button>
                </div>

                <div className="flex flex-col gap-3">
                  {multiEvents.map((evt, idx) => (
                    <div
                      key={evt.id}
                      className="p-4 rounded-2xl bg-purple-50/50 dark:bg-purple-950/30 border border-purple-200/60 dark:border-purple-900/40 grid grid-cols-1 sm:grid-cols-12 gap-3 items-center"
                    >
                      <div className="sm:col-span-5">
                        <label className="text-[9px] font-mono uppercase tracking-wider text-purple-700 dark:text-purple-300 block mb-1">
                          Ceremony #{idx + 1}
                        </label>
                        <input
                          type="text"
                          value={evt.name}
                          onChange={(e) => updateMultiEvent(evt.id, 'name', e.target.value)}
                          className="w-full text-xs px-3 py-2 rounded-xl bg-white dark:bg-[#170C22] border border-purple-200 dark:border-purple-800 text-purple-950 dark:text-white"
                        />
                      </div>

                      <div className="sm:col-span-3">
                        <label className="text-[9px] font-mono uppercase tracking-wider text-purple-700 dark:text-purple-300 block mb-1">
                          Start Time
                        </label>
                        <input
                          type="time"
                          value={evt.startTime}
                          onChange={(e) => updateMultiEvent(evt.id, 'startTime', e.target.value)}
                          className="w-full text-xs px-3 py-2 rounded-xl bg-white dark:bg-[#170C22] border border-purple-200 dark:border-purple-800 text-purple-950 dark:text-white"
                        />
                      </div>

                      <div className="sm:col-span-3">
                        <label className="text-[9px] font-mono uppercase tracking-wider text-purple-700 dark:text-purple-300 block mb-1">
                          End Time
                        </label>
                        <input
                          type="time"
                          value={evt.endTime}
                          onChange={(e) => updateMultiEvent(evt.id, 'endTime', e.target.value)}
                          className="w-full text-xs px-3 py-2 rounded-xl bg-white dark:bg-[#170C22] border border-purple-200 dark:border-purple-800 text-purple-950 dark:text-white"
                        />
                      </div>

                      <div className="sm:col-span-1 flex justify-end">
                        {multiEvents.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeMultiEvent(evt.id)}
                            className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                          >
                            <Trash2 size={15} />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between pt-4 border-t border-purple-100 dark:border-purple-900/40">
                  <button
                    onClick={() => setStep(2)}
                    className="px-6 py-3 rounded-xl border border-purple-200 dark:border-purple-800 text-purple-950 dark:text-purple-200 font-nav text-xs font-semibold uppercase tracking-wider flex items-center gap-2"
                  >
                    <ArrowLeft size={14} />
                    <span>Back</span>
                  </button>

                  <button
                    onClick={() => setStep(4)}
                    className="px-8 py-3 rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-nav text-xs font-bold uppercase tracking-wider flex items-center gap-2"
                  >
                    <span>Next: Venue & Location</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 4: Venue & Location Information */}
            {step === 4 && (
              <div className="flex flex-col gap-6 animate-in fade-in duration-200">
                <div>
                  <h2 className="text-2xl font-bold font-hero text-purple-950 dark:text-purple-50">
                    Venue & Location Information
                  </h2>
                  <p className="text-xs text-purple-800 dark:text-purple-300 mt-1">
                    Help our crew map your venue location seamlessly.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-purple-950 dark:text-purple-200 block mb-1">
                      Venue Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Leela Palace / Mayor Ramanathan Mandapam"
                      value={venueName}
                      onChange={(e) => setVenueName(e.target.value)}
                      className="w-full text-xs px-4 py-3 rounded-xl bg-purple-50/50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800 text-purple-950 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-purple-950 dark:text-purple-200 block mb-1">
                      City *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Chennai, Madurai, Kochi"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full text-xs px-4 py-3 rounded-xl bg-purple-50/50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800 text-purple-950 dark:text-white"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="text-xs font-bold text-purple-950 dark:text-purple-200 block mb-1">
                      Full Address / Landmark Notes
                    </label>
                    <input
                      type="text"
                      placeholder="Full venue address or Google Map link notes"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full text-xs px-4 py-3 rounded-xl bg-purple-50/50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800 text-purple-950 dark:text-white"
                    />
                  </div>
                </div>

                <div className="flex justify-between pt-4 border-t border-purple-100 dark:border-purple-900/40">
                  <button
                    onClick={() => setStep(3)}
                    className="px-6 py-3 rounded-xl border border-purple-200 dark:border-purple-800 text-purple-950 dark:text-purple-200 font-nav text-xs font-semibold uppercase tracking-wider flex items-center gap-2"
                  >
                    <ArrowLeft size={14} />
                    <span>Back</span>
                  </button>

                  <button
                    onClick={() => setStep(5)}
                    disabled={!venueName || !city}
                    className="px-8 py-3 rounded-xl bg-purple-700 hover:bg-purple-800 disabled:opacity-50 text-white font-nav text-xs font-bold uppercase tracking-wider flex items-center gap-2"
                  >
                    <span>Next: Package Selection</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 5: Package Choice */}
            {step === 5 && (
              <div className="flex flex-col gap-6 animate-in fade-in duration-200">
                <div>
                  <h2 className="text-2xl font-bold font-hero text-purple-950 dark:text-purple-50">
                    Select Your Photography Collection
                  </h2>
                  <p className="text-xs text-purple-800 dark:text-purple-300 mt-1">
                    Choose from our 5 signature collections or customize freely.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {DEFAULT_PACKAGES.map((pkg) => {
                    const isSelected = selectedPackageId === pkg.id && packageChoice === 'default';
                    return (
                      <button
                        key={pkg.id}
                        type="button"
                        onClick={() => {
                          setPackageChoice('default');
                          setSelectedPackageId(pkg.id);
                        }}
                        className={`p-4 rounded-2xl text-left border transition-all ${
                          isSelected
                            ? 'border-purple-600 bg-purple-50 dark:bg-purple-950/60 ring-2 ring-purple-400/30'
                            : 'border-purple-200 dark:border-purple-800/40 bg-white dark:bg-[#170C22] hover:border-rose-400'
                        }`}
                      >
                        <span className="font-mono text-[9px] uppercase tracking-wider text-rose-600 dark:text-rose-400 font-bold block">
                          {pkg.creativeTier}
                        </span>
                        <h3 className="font-hero text-sm font-bold text-purple-950 dark:text-purple-100 mt-0.5">
                          {pkg.name}
                        </h3>
                        <div className="text-lg font-extrabold text-purple-900 dark:text-purple-200 font-mono mt-1 mb-2">
                          {pkg.formattedPrice}
                        </div>
                        <p className="text-[11px] text-purple-800/80 dark:text-purple-300/80 line-clamp-2">
                          {pkg.description}
                        </p>
                      </button>
                    );
                  })}
                </div>

                <div className="flex justify-between pt-4 border-t border-purple-100 dark:border-purple-900/40">
                  <button
                    onClick={() => setStep(4)}
                    className="px-6 py-3 rounded-xl border border-purple-200 dark:border-purple-800 text-purple-950 dark:text-purple-200 font-nav text-xs font-semibold uppercase tracking-wider flex items-center gap-2"
                  >
                    <ArrowLeft size={14} />
                    <span>Back</span>
                  </button>

                  <button
                    onClick={() => setStep(6)}
                    className="px-8 py-3 rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-nav text-xs font-bold uppercase tracking-wider flex items-center gap-2"
                  >
                    <span>Next: Contact Information</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 6: Contact Information & Submit */}
            {step === 6 && (
              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-6 animate-in fade-in duration-200"
              >
                <div>
                  <h2 className="text-2xl font-bold font-hero text-purple-950 dark:text-purple-50">
                    Contact & Confirmation
                  </h2>
                  <p className="text-xs text-purple-800 dark:text-purple-300 mt-1">
                    Where can our studio reach you with availability details?
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-purple-950 dark:text-purple-200 block mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Priya Sundaram"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      className="w-full text-xs px-4 py-3 rounded-xl bg-purple-50/50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800 text-purple-950 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-purple-950 dark:text-purple-200 block mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 9876543210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full text-xs px-4 py-3 rounded-xl bg-purple-50/50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800 text-purple-950 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-purple-950 dark:text-purple-200 block mb-1">
                      WhatsApp Number (For instant quote)
                    </label>
                    <input
                      type="tel"
                      placeholder="e.g. 9876543210"
                      value={whatsapp}
                      onChange={(e) => setWhatsapp(e.target.value)}
                      className="w-full text-xs px-4 py-3 rounded-xl bg-purple-50/50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800 text-purple-950 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-purple-950 dark:text-purple-200 block mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. priya@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full text-xs px-4 py-3 rounded-xl bg-purple-50/50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800 text-purple-950 dark:text-white"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="text-xs font-bold text-purple-950 dark:text-purple-200 block mb-1">
                      Additional Vision & Requirements
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Tell us about special rituals, themes, or custom requests..."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="w-full text-xs px-4 py-3 rounded-xl bg-purple-50/50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800 text-purple-950 dark:text-white"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs font-mono text-purple-700 dark:text-purple-400">
                  <ShieldCheck size={14} className="text-emerald-500" />
                  <span>
                    Availability remains private. Our lead artist reviews every commission
                    personally.
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-purple-100 dark:border-purple-900/40">
                  <button
                    type="button"
                    onClick={() => setStep(5)}
                    className="w-full sm:w-auto px-6 py-3 rounded-xl border border-purple-200 dark:border-purple-800 text-purple-950 dark:text-purple-200 font-nav text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2"
                  >
                    <ArrowLeft size={14} />
                    <span>Back</span>
                  </button>

                  <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto px-6 py-3.5 rounded-xl border border-purple-300 dark:border-purple-700 text-purple-950 dark:text-white font-nav text-xs font-bold uppercase tracking-wider hover:bg-purple-50 dark:hover:bg-purple-950/40"
                    >
                      <span>
                        {isSubmitting ? 'Recording on Timeline...' : 'Inquire Availability First'}
                      </span>
                    </button>

                    <Link
                      href={`/checkout?package=${selectedPackageId}&name=${encodeURIComponent(
                        clientName,
                      )}&phone=${encodeURIComponent(phone)}&email=${encodeURIComponent(
                        email,
                      )}&date=${primaryDate}&city=${encodeURIComponent(city)}`}
                      className="w-full sm:w-auto"
                    >
                      <button
                        type="button"
                        disabled={!clientName || !phone}
                        className="w-full px-8 py-3.5 rounded-xl bg-gradient-to-r from-purple-700 via-rose-600 to-purple-700 hover:opacity-95 disabled:opacity-50 text-white font-nav text-xs font-bold uppercase tracking-[0.18em] shadow-lg flex items-center justify-center gap-2"
                      >
                        <span>Proceed to Payment Gateway</span>
                        <Sparkles size={14} />
                      </button>
                    </Link>
                  </div>
                </div>
              </form>
            )}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
