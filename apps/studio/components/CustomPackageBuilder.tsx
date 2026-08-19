'use client';

import React, { useState, useMemo } from 'react';
import { CUSTOM_PACKAGE_RATES, calculateCustomPackageDiscount, ROUTES } from '@photomagic/config';
import { formatCurrency } from '@photomagic/shared';
import {
  SlidersHorizontal,
  Plus,
  Trash2,
  Calendar,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Camera,
  Film,
  Layers,
  Heart,
  Tag,
} from 'lucide-react';
import Link from 'next/link';

interface CustomEvent {
  id: string;
  name: string;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
}

export const CustomPackageBuilder: React.FC = () => {
  // Days of coverage
  const [days, setDays] = useState<number>(1);

  // Crew & Equipment counts (per day)
  const [traditionalPhotos, setTraditionalPhotos] = useState<number>(1);
  const [traditionalVideos, setTraditionalVideos] = useState<number>(0);
  const [candidPhotos, setCandidPhotos] = useState<number>(1);
  const [candidVideos, setCandidVideos] = useState<number>(1);
  const [droneDays, setDroneDays] = useState<number>(0);

  // Albums
  const [albumType, setAlbumType] = useState<'standard' | 'luxury' | 'heirloom'>('luxury');
  const [albumCount, setAlbumCount] = useState<number>(1);
  const [additionalAlbums, setAdditionalAlbums] = useState<number>(0);

  // Special shoots & milestones
  const [preWedding, setPreWedding] = useState<boolean>(false);
  const [postWedding, setPostWedding] = useState<boolean>(false);
  const [familyJourneyMilestones, setFamilyJourneyMilestones] = useState<string[]>([]);

  // Multi-event list
  const [events, setEvents] = useState<CustomEvent[]>([
    {
      id: 'evt-1',
      name: 'Muhurtham (Main Wedding)',
      date: '',
      startTime: '06:00',
      endTime: '14:00',
      location: 'Chennai Mandapam',
    },
  ]);

  const addEvent = () => {
    setEvents((prev) => [
      ...prev,
      {
        id: `evt-${Date.now()}`,
        name: `Event ${prev.length + 1}`,
        date: '',
        startTime: '18:00',
        endTime: '22:00',
        location: '',
      },
    ]);
  };

  const removeEvent = (id: string) => {
    if (events.length <= 1) return;
    setEvents((prev) => prev.filter((e) => e.id !== id));
  };

  const updateEvent = (id: string, field: keyof CustomEvent, value: string) => {
    setEvents((prev) => prev.map((e) => (e.id === id ? { ...e, [field]: value } : e)));
  };

  const toggleMilestone = (milestone: string) => {
    setFamilyJourneyMilestones((prev) =>
      prev.includes(milestone) ? prev.filter((m) => m !== milestone) : [...prev, milestone],
    );
  };

  // Pricing calculations
  const calculation = useMemo(() => {
    let rawTotal = 0;
    let componentCount = 0;
    const breakdown: Array<{ label: string; amount: number }> = [];

    // Traditional Photos
    if (traditionalPhotos > 0) {
      const amt = traditionalPhotos * CUSTOM_PACKAGE_RATES.traditionalPhotographyPerDay * days;
      rawTotal += amt;
      componentCount += traditionalPhotos;
      breakdown.push({
        label: `${traditionalPhotos} Traditional Photographer(s) (${days} Days)`,
        amount: amt,
      });
    }

    // Traditional Video
    if (traditionalVideos > 0) {
      const amt = traditionalVideos * CUSTOM_PACKAGE_RATES.traditionalVideoPerDay * days;
      rawTotal += amt;
      componentCount += traditionalVideos;
      breakdown.push({
        label: `${traditionalVideos} Traditional Videographer(s) (${days} Days)`,
        amount: amt,
      });
    }

    // Candid Photos
    if (candidPhotos > 0) {
      const amt = candidPhotos * CUSTOM_PACKAGE_RATES.candidPhotographyPerDay * days;
      rawTotal += amt;
      componentCount += candidPhotos;
      breakdown.push({
        label: `${candidPhotos} Candid Photographer(s) (${days} Days)`,
        amount: amt,
      });
    }

    // Candid Video
    if (candidVideos > 0) {
      const amt = candidVideos * CUSTOM_PACKAGE_RATES.candidVideoPerDay * days;
      rawTotal += amt;
      componentCount += candidVideos;
      breakdown.push({
        label: `${candidVideos} Candid Cinematographer(s) (${days} Days)`,
        amount: amt,
      });
    }

    // Drone
    if (droneDays > 0) {
      const amt = droneDays * CUSTOM_PACKAGE_RATES.dronePerDay;
      rawTotal += amt;
      componentCount += droneDays;
      breakdown.push({
        label: `4K Aerial Drone Coverage (${droneDays} Day(s))`,
        amount: amt,
      });
    }

    // Main Albums
    if (albumCount > 0) {
      const rate =
        albumType === 'standard'
          ? CUSTOM_PACKAGE_RATES.albumStandard
          : albumType === 'luxury'
            ? CUSTOM_PACKAGE_RATES.albumLuxuryLeather
            : CUSTOM_PACKAGE_RATES.albumHeirloomGold;
      const amt = albumCount * rate;
      rawTotal += amt;
      componentCount += albumCount;
      breakdown.push({
        label: `${albumCount} Main ${albumType.toUpperCase()} Archival Album(s)`,
        amount: amt,
      });
    }

    // Additional Albums
    if (additionalAlbums > 0) {
      const amt = additionalAlbums * CUSTOM_PACKAGE_RATES.additionalAlbum;
      rawTotal += amt;
      componentCount += additionalAlbums;
      breakdown.push({
        label: `${additionalAlbums} Additional Keepsake Album(s)`,
        amount: amt,
      });
    }

    // Pre-Wedding Shoot
    if (preWedding) {
      rawTotal += CUSTOM_PACKAGE_RATES.preWeddingSession;
      componentCount += 1;
      breakdown.push({
        label: 'Destination Pre-Wedding Couple Shoot Session',
        amount: CUSTOM_PACKAGE_RATES.preWeddingSession,
      });
    }

    // Post-Wedding Shoot
    if (postWedding) {
      rawTotal += CUSTOM_PACKAGE_RATES.postWeddingSession;
      componentCount += 1;
      breakdown.push({
        label: 'Post-Wedding Sunset Portrait Session',
        amount: CUSTOM_PACKAGE_RATES.postWeddingSession,
      });
    }

    // Family Milestones
    familyJourneyMilestones.forEach((m) => {
      rawTotal += CUSTOM_PACKAGE_RATES.familyMilestoneAddon;
      componentCount += 1;
      breakdown.push({
        label: `Family Milestone Add-on: ${m}`,
        amount: CUSTOM_PACKAGE_RATES.familyMilestoneAddon,
      });
    });

    const discountResult = calculateCustomPackageDiscount(rawTotal, componentCount);

    return {
      rawTotal,
      componentCount,
      percentage: discountResult.percentage,
      discountAmount: discountResult.discountAmount,
      finalTotal: discountResult.finalTotal,
      breakdown,
    };
  }, [
    days,
    traditionalPhotos,
    traditionalVideos,
    candidPhotos,
    candidVideos,
    droneDays,
    albumType,
    albumCount,
    additionalAlbums,
    preWedding,
    postWedding,
    familyJourneyMilestones,
  ]);

  return (
    <div id="customize" className="flex flex-col gap-10 scroll-mt-24">
      {/* Section Headline */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-purple-200/60 dark:border-purple-900/40 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-rose-600 dark:text-rose-400 font-bold">
            <SlidersHorizontal size={13} />
            <span>Interactive Custom Collection Engine</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-hero text-purple-950 dark:text-purple-50 mt-1">
            Choose on Your Own Preference
          </h2>
          <p className="text-xs sm:text-sm text-purple-800 dark:text-purple-300 mt-1">
            No mandatory traditional photography. Build your bespoke collection with real-time
            5%–20% combination savings.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Configurator Controls */}
        <div className="lg:col-span-7 flex flex-col gap-8">
          {/* Step 1: Number of Days */}
          <div className="p-6 rounded-3xl bg-white dark:bg-[#170C22] border border-purple-200/80 dark:border-purple-800/40 shadow-sm flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs uppercase tracking-wider text-rose-600 dark:text-rose-400 font-bold">
                01. Shooting Days
              </span>
              <span className="text-xs font-bold text-purple-900 dark:text-purple-300">
                {days} Day{days > 1 ? 's' : ''} of Coverage
              </span>
            </div>

            <div className="grid grid-cols-4 gap-3">
              {[1, 2, 3, 4].map((d) => (
                <button
                  key={d}
                  onClick={() => setDays(d)}
                  className={`py-3 rounded-2xl font-mono text-xs font-bold transition-all ${
                    days === d
                      ? 'bg-gradient-to-r from-purple-600 to-rose-500 text-white shadow-md'
                      : 'bg-purple-50 dark:bg-purple-950/40 text-purple-950 dark:text-purple-200 border border-purple-200 dark:border-purple-800/40 hover:border-rose-400'
                  }`}
                >
                  {d} Day{d > 1 ? 's' : ''}
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Photography & Cinematography Crew */}
          <div className="p-6 rounded-3xl bg-white dark:bg-[#170C22] border border-purple-200/80 dark:border-purple-800/40 shadow-sm flex flex-col gap-5">
            <span className="font-mono text-xs uppercase tracking-wider text-rose-600 dark:text-rose-400 font-bold">
              02. Photography & Cinema Crew (Per Day)
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Candid Photo */}
              <div className="p-4 rounded-2xl bg-purple-50/50 dark:bg-purple-950/30 border border-purple-200/60 dark:border-purple-900/40 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-purple-950 dark:text-purple-100">
                    Candid Photography
                  </span>
                  <span className="font-mono text-[10px] text-purple-700 dark:text-purple-300">
                    {formatCurrency(CUSTOM_PACKAGE_RATES.candidPhotographyPerDay)}/day
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  {[0, 1, 2, 3].map((num) => (
                    <button
                      key={num}
                      onClick={() => setCandidPhotos(num)}
                      className={`flex-1 py-1.5 rounded-xl text-xs font-mono font-bold transition-all ${
                        candidPhotos === num
                          ? 'bg-purple-700 text-white'
                          : 'bg-white dark:bg-[#170C22] text-purple-900 dark:text-purple-200 border border-purple-200 dark:border-purple-800'
                      }`}
                    >
                      {num}
                    </button>
                  ))}
                </div>
              </div>

              {/* Candid Cinema */}
              <div className="p-4 rounded-2xl bg-purple-50/50 dark:bg-purple-950/30 border border-purple-200/60 dark:border-purple-900/40 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-purple-950 dark:text-purple-100">
                    4K Candid Cinema
                  </span>
                  <span className="font-mono text-[10px] text-purple-700 dark:text-purple-300">
                    {formatCurrency(CUSTOM_PACKAGE_RATES.candidVideoPerDay)}/day
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  {[0, 1, 2, 3].map((num) => (
                    <button
                      key={num}
                      onClick={() => setCandidVideos(num)}
                      className={`flex-1 py-1.5 rounded-xl text-xs font-mono font-bold transition-all ${
                        candidVideos === num
                          ? 'bg-purple-700 text-white'
                          : 'bg-white dark:bg-[#170C22] text-purple-900 dark:text-purple-200 border border-purple-200 dark:border-purple-800'
                      }`}
                    >
                      {num}
                    </button>
                  ))}
                </div>
              </div>

              {/* Traditional Photo */}
              <div className="p-4 rounded-2xl bg-purple-50/50 dark:bg-purple-950/30 border border-purple-200/60 dark:border-purple-900/40 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-purple-950 dark:text-purple-100">
                    Traditional Photo
                  </span>
                  <span className="font-mono text-[10px] text-purple-700 dark:text-purple-300">
                    {formatCurrency(CUSTOM_PACKAGE_RATES.traditionalPhotographyPerDay)}/day
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  {[0, 1, 2, 3].map((num) => (
                    <button
                      key={num}
                      onClick={() => setTraditionalPhotos(num)}
                      className={`flex-1 py-1.5 rounded-xl text-xs font-mono font-bold transition-all ${
                        traditionalPhotos === num
                          ? 'bg-purple-700 text-white'
                          : 'bg-white dark:bg-[#170C22] text-purple-900 dark:text-purple-200 border border-purple-200 dark:border-purple-800'
                      }`}
                    >
                      {num}
                    </button>
                  ))}
                </div>
              </div>

              {/* Traditional Video */}
              <div className="p-4 rounded-2xl bg-purple-50/50 dark:bg-purple-950/30 border border-purple-200/60 dark:border-purple-900/40 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-purple-950 dark:text-purple-100">
                    Traditional Video
                  </span>
                  <span className="font-mono text-[10px] text-purple-700 dark:text-purple-300">
                    {formatCurrency(CUSTOM_PACKAGE_RATES.traditionalVideoPerDay)}/day
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  {[0, 1, 2, 3].map((num) => (
                    <button
                      key={num}
                      onClick={() => setTraditionalVideos(num)}
                      className={`flex-1 py-1.5 rounded-xl text-xs font-mono font-bold transition-all ${
                        traditionalVideos === num
                          ? 'bg-purple-700 text-white'
                          : 'bg-white dark:bg-[#170C22] text-purple-900 dark:text-purple-200 border border-purple-200 dark:border-purple-800'
                      }`}
                    >
                      {num}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Drone Aerial Option */}
            <div className="p-4 rounded-2xl bg-purple-50/50 dark:bg-purple-950/30 border border-purple-200/60 dark:border-purple-900/40 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-purple-950 dark:text-purple-100 block">
                  4K Aerial Drone Coverage
                </span>
                <span className="text-[10px] text-purple-700 dark:text-purple-300 font-mono">
                  {formatCurrency(CUSTOM_PACKAGE_RATES.dronePerDay)}/day
                </span>
              </div>
              <div className="flex items-center gap-2">
                {[0, 1, 2].map((num) => (
                  <button
                    key={num}
                    onClick={() => setDroneDays(num)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all ${
                      droneDays === num
                        ? 'bg-purple-700 text-white'
                        : 'bg-white dark:bg-[#170C22] text-purple-900 dark:text-purple-200 border border-purple-200 dark:border-purple-800'
                    }`}
                  >
                    {num} {num === 1 ? 'Day' : 'Days'}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Step 3: Multi-Event Planning (+ Add Event) */}
          <div className="p-6 rounded-3xl bg-white dark:bg-[#170C22] border border-purple-200/80 dark:border-purple-800/40 shadow-sm flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs uppercase tracking-wider text-rose-600 dark:text-rose-400 font-bold">
                03. Multi-Event Schedule
              </span>
              <button
                onClick={addEvent}
                className="flex items-center gap-1.5 text-xs font-mono font-bold text-rose-600 dark:text-rose-400 hover:opacity-80 transition-opacity"
              >
                <Plus size={14} />
                <span>Add Event</span>
              </button>
            </div>

            <div className="flex flex-col gap-3">
              {events.map((evt, idx) => (
                <div
                  key={evt.id}
                  className="p-4 rounded-2xl bg-purple-50/50 dark:bg-purple-950/30 border border-purple-200/60 dark:border-purple-900/40 grid grid-cols-1 sm:grid-cols-12 gap-3 items-center"
                >
                  <div className="sm:col-span-5">
                    <label className="text-[9px] font-mono uppercase tracking-wider text-purple-700 dark:text-purple-300 block mb-1">
                      Event #{idx + 1} Name
                    </label>
                    <input
                      type="text"
                      value={evt.name}
                      onChange={(e) => updateEvent(evt.id, 'name', e.target.value)}
                      placeholder="e.g. Sangeet, Muhurtham"
                      className="w-full text-xs px-3 py-2 rounded-xl bg-white dark:bg-[#170C22] border border-purple-200 dark:border-purple-800 text-purple-950 dark:text-white"
                    />
                  </div>

                  <div className="sm:col-span-4">
                    <label className="text-[9px] font-mono uppercase tracking-wider text-purple-700 dark:text-purple-300 block mb-1">
                      Date & Time
                    </label>
                    <input
                      type="date"
                      value={evt.date}
                      onChange={(e) => updateEvent(evt.id, 'date', e.target.value)}
                      className="w-full text-xs px-3 py-2 rounded-xl bg-white dark:bg-[#170C22] border border-purple-200 dark:border-purple-800 text-purple-950 dark:text-white"
                    />
                  </div>

                  <div className="sm:col-span-3 flex items-center justify-end pt-4 sm:pt-0">
                    {events.length > 1 && (
                      <button
                        onClick={() => removeEvent(evt.id)}
                        className="p-2 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-lg transition-colors"
                        title="Remove Event"
                      >
                        <Trash2 size={15} />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Step 4: Albums & Deliverables */}
          <div className="p-6 rounded-3xl bg-white dark:bg-[#170C22] border border-purple-200/80 dark:border-purple-800/40 shadow-sm flex flex-col gap-4">
            <span className="font-mono text-xs uppercase tracking-wider text-rose-600 dark:text-rose-400 font-bold">
              04. Archival Albums & Print
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { id: 'standard', name: 'Silk Layflat', price: '₹8,999' },
                { id: 'luxury', name: 'Italian Leather', price: '₹10,999' },
                { id: 'heirloom', name: '24K Gold Stamped', price: '₹12,999' },
              ].map((t) => (
                <button
                  key={t.id}
                  onClick={() => setAlbumType(t.id as any)}
                  className={`p-3 rounded-2xl text-left border transition-all ${
                    albumType === t.id
                      ? 'border-rose-500 bg-rose-50/50 dark:bg-rose-950/30'
                      : 'border-purple-200 dark:border-purple-800 bg-white dark:bg-[#170C22]'
                  }`}
                >
                  <span className="text-xs font-bold text-purple-950 dark:text-white block">
                    {t.name}
                  </span>
                  <span className="font-mono text-[10px] text-rose-600 dark:text-rose-400">
                    {t.price} / book
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Step 5: Complete Family Journey Add-ons */}
          <div className="p-6 rounded-3xl bg-white dark:bg-[#170C22] border border-purple-200/80 dark:border-purple-800/40 shadow-sm flex flex-col gap-4">
            <div>
              <span className="font-mono text-xs uppercase tracking-wider text-rose-600 dark:text-rose-400 font-bold block">
                05. Complete Family Journey
              </span>
              <span className="text-xs text-purple-800 dark:text-purple-300">
                Lock in lifetime milestones (Maternity $\rightarrow$ Project BabyBliss $\rightarrow$
                1st Birthday).
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                'Maternity Atelier Session',
                'BabyBliss Newborn Series',
                '1st Birthday Milestone',
              ].map((milestone) => {
                const isChecked = familyJourneyMilestones.includes(milestone);
                return (
                  <button
                    key={milestone}
                    onClick={() => toggleMilestone(milestone)}
                    className={`p-3 rounded-2xl text-left border transition-all flex items-start justify-between ${
                      isChecked
                        ? 'border-purple-600 bg-purple-50/60 dark:bg-purple-950/40 font-bold'
                        : 'border-purple-200 dark:border-purple-800 bg-white dark:bg-[#170C22]'
                    }`}
                  >
                    <div>
                      <span className="text-xs text-purple-950 dark:text-purple-100 block">
                        {milestone}
                      </span>
                      <span className="font-mono text-[10px] text-purple-700 dark:text-purple-300">
                        +₹15,000
                      </span>
                    </div>
                    {isChecked && <CheckCircle2 size={16} className="text-purple-600 mt-0.5" />}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Live Savings & Price Calculation Summary */}
        <div className="lg:col-span-5">
          <div className="sticky top-28 p-8 rounded-3xl bg-white dark:bg-[#170C22] border border-purple-200/90 dark:border-purple-800/50 shadow-museum flex flex-col gap-6">
            <div className="border-b border-purple-200/60 dark:border-purple-900/40 pb-4">
              <span className="font-mono text-[10px] uppercase tracking-widest text-rose-600 dark:text-rose-400 font-bold block">
                Live Investment Estimator
              </span>
              <h3 className="text-xl font-bold font-hero text-purple-950 dark:text-purple-50 mt-1">
                Your Bespoke Collection
              </h3>
            </div>

            {/* Breakdown List */}
            <div className="flex flex-col gap-2.5 max-h-64 overflow-y-auto pr-1 text-xs">
              {calculation.breakdown.length === 0 ? (
                <p className="text-purple-700/60 dark:text-purple-400/60 italic">
                  Select your coverage components on the left...
                </p>
              ) : (
                calculation.breakdown.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between text-purple-950/80 dark:text-purple-200/80"
                  >
                    <span className="truncate pr-2">{item.label}</span>
                    <span className="font-mono font-semibold flex-shrink-0">
                      {formatCurrency(item.amount)}
                    </span>
                  </div>
                ))
              )}
            </div>

            {/* Totals & Dynamic Combination Discount */}
            <div className="pt-4 border-t border-purple-200/60 dark:border-purple-900/40 flex flex-col gap-3">
              <div className="flex items-center justify-between text-xs text-purple-800 dark:text-purple-300">
                <span>Individual Component Value:</span>
                <span className="font-mono">{formatCurrency(calculation.rawTotal)}</span>
              </div>

              {calculation.percentage > 0 && (
                <div className="flex items-center justify-between text-xs text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-50 dark:bg-emerald-950/40 p-2.5 rounded-xl border border-emerald-500/20">
                  <div className="flex items-center gap-1.5">
                    <Tag size={13} />
                    <span>Combination Discount ({calculation.percentage}%):</span>
                  </div>
                  <span className="font-mono">-{formatCurrency(calculation.discountAmount)}</span>
                </div>
              )}

              <div className="flex items-baseline justify-between pt-2 border-t border-purple-100 dark:border-purple-900/40">
                <span className="font-hero text-base font-bold text-purple-950 dark:text-white">
                  Your Bespoke Collection:
                </span>
                <span className="font-mono text-2xl font-extrabold text-purple-900 dark:text-purple-200">
                  {formatCurrency(calculation.finalTotal)}
                </span>
              </div>
            </div>

            {/* Submit for Review CTA */}
            <Link
              href={`/book?custom=true&total=${calculation.finalTotal}&days=${days}&events=${events.length}`}
            >
              <button className="w-full py-4 rounded-2xl bg-gradient-to-r from-purple-600 via-rose-500 to-purple-600 text-white font-nav text-xs font-bold uppercase tracking-[0.2em] shadow-lg hover:opacity-95 transition-all flex items-center justify-center gap-2">
                <span>Submit For Studio Availability Review</span>
                <ArrowRight size={15} />
              </button>
            </Link>

            <div className="flex items-center gap-2 text-[10px] font-mono text-purple-700/80 dark:text-purple-400/80 justify-center">
              <ShieldCheck size={12} className="text-emerald-500" />
              <span>Availability is confirmed after private studio review.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
