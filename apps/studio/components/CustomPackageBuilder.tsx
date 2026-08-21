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
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200/80 dark:border-purple-900/40 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-rose-700 dark:text-rose-400 font-bold bg-rose-50 px-3 py-1 rounded-full border border-rose-200">
            <SlidersHorizontal size={13} />
            <span>Interactive Custom Collection Engine</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-hero text-slate-900 dark:text-white mt-2">
            Choose on Your Own Preference
          </h2>
          <p className="text-sm text-slate-700 dark:text-slate-300 mt-1 font-normal">
            No mandatory traditional photography. Build your bespoke collection with real-time
            5%–20% combination savings.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Configurator Controls */}
        <div className="lg:col-span-7 flex flex-col gap-8">
          {/* Step 1: Number of Days */}
          <div className="p-6 rounded-3xl bg-white dark:bg-[#170C22] border border-slate-200/90 dark:border-purple-800/40 shadow-sm flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs uppercase tracking-wider text-purple-900 dark:text-purple-300 font-bold">
                01. Shooting Days
              </span>
              <span className="text-xs font-bold text-slate-900 dark:text-slate-100 font-mono">
                {days} Day{days > 1 ? 's' : ''} of Coverage
              </span>
            </div>

            <div className="grid grid-cols-4 gap-3">
              {[1, 2, 3, 4].map((d) => (
                <button
                  key={d}
                  onClick={() => setDays(d)}
                  className={`py-3.5 rounded-2xl font-mono text-xs font-bold transition-all ${
                    days === d
                      ? 'bg-purple-900 text-white shadow-md'
                      : 'bg-purple-50/70 dark:bg-purple-950/40 text-purple-950 dark:text-purple-200 border border-purple-200 dark:border-purple-800/40 hover:border-purple-400'
                  }`}
                >
                  {d} Day{d > 1 ? 's' : ''}
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Photography & Cinematography Crew */}
          <div className="p-6 rounded-3xl bg-white dark:bg-[#170C22] border border-slate-200/90 dark:border-purple-800/40 shadow-sm flex flex-col gap-5">
            <span className="font-mono text-xs uppercase tracking-wider text-rose-700 dark:text-rose-400 font-bold">
              02. Photography & Cinema Crew (Per Day)
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Candid Photo */}
              <div className="p-4 rounded-2xl bg-purple-50/70 dark:bg-purple-950/30 border border-purple-200/80 dark:border-purple-900/40 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900 dark:text-white">
                    Candid Photography
                  </span>
                  <span className="font-mono text-[11px] font-bold text-purple-800 dark:text-purple-300">
                    {formatCurrency(CUSTOM_PACKAGE_RATES.candidPhotographyPerDay)}/day
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  {[0, 1, 2, 3].map((num) => (
                    <button
                      key={num}
                      onClick={() => setCandidPhotos(num)}
                      className={`flex-1 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
                        candidPhotos === num
                          ? 'bg-purple-800 text-white shadow-sm'
                          : 'bg-white dark:bg-[#170C22] text-slate-800 dark:text-purple-200 border border-slate-300 dark:border-purple-800'
                      }`}
                    >
                      {num}
                    </button>
                  ))}
                </div>
              </div>

              {/* Candid Cinema */}
              <div className="p-4 rounded-2xl bg-rose-50/70 dark:bg-rose-950/30 border border-rose-200/80 dark:border-rose-900/40 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900 dark:text-white">
                    4K Candid Cinema
                  </span>
                  <span className="font-mono text-[11px] font-bold text-rose-800 dark:text-rose-300">
                    {formatCurrency(CUSTOM_PACKAGE_RATES.candidVideoPerDay)}/day
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  {[0, 1, 2, 3].map((num) => (
                    <button
                      key={num}
                      onClick={() => setCandidVideos(num)}
                      className={`flex-1 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
                        candidVideos === num
                          ? 'bg-rose-700 text-white shadow-sm'
                          : 'bg-white dark:bg-[#170C22] text-slate-800 dark:text-purple-200 border border-slate-300 dark:border-purple-800'
                      }`}
                    >
                      {num}
                    </button>
                  ))}
                </div>
              </div>

              {/* Traditional Photo */}
              <div className="p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-900/40 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900 dark:text-white">
                    Traditional Photo
                  </span>
                  <span className="font-mono text-[11px] font-bold text-amber-900 dark:text-amber-300">
                    {formatCurrency(CUSTOM_PACKAGE_RATES.traditionalPhotographyPerDay)}/day
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  {[0, 1, 2, 3].map((num) => (
                    <button
                      key={num}
                      onClick={() => setTraditionalPhotos(num)}
                      className={`flex-1 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
                        traditionalPhotos === num
                          ? 'bg-amber-800 text-white shadow-sm'
                          : 'bg-white dark:bg-[#170C22] text-slate-800 dark:text-purple-200 border border-slate-300 dark:border-purple-800'
                      }`}
                    >
                      {num}
                    </button>
                  ))}
                </div>
              </div>

              {/* Traditional Video */}
              <div className="p-4 rounded-2xl bg-sky-50/70 dark:bg-sky-950/30 border border-sky-200/80 dark:border-sky-900/40 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900 dark:text-white">
                    Traditional Video
                  </span>
                  <span className="font-mono text-[11px] font-bold text-sky-900 dark:text-sky-300">
                    {formatCurrency(CUSTOM_PACKAGE_RATES.traditionalVideoPerDay)}/day
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  {[0, 1, 2, 3].map((num) => (
                    <button
                      key={num}
                      onClick={() => setTraditionalVideos(num)}
                      className={`flex-1 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
                        traditionalVideos === num
                          ? 'bg-sky-800 text-white shadow-sm'
                          : 'bg-white dark:bg-[#170C22] text-slate-800 dark:text-purple-200 border border-slate-300 dark:border-purple-800'
                      }`}
                    >
                      {num}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Drone Aerial Option */}
            <div className="p-4 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200/80 dark:border-emerald-900/40 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-slate-900 dark:text-white block">
                  4K Aerial Drone Coverage
                </span>
                <span className="text-[11px] text-emerald-800 dark:text-emerald-300 font-mono font-bold">
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
                        ? 'bg-emerald-800 text-white shadow-sm'
                        : 'bg-white dark:bg-[#170C22] text-slate-800 dark:text-purple-200 border border-slate-300 dark:border-purple-800'
                    }`}
                  >
                    {num} {num === 1 ? 'Day' : 'Days'}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Step 3: Multi-Event Planning (+ Add Event) */}
          <div className="p-6 rounded-3xl bg-white dark:bg-[#170C22] border border-slate-200/90 dark:border-purple-800/40 shadow-sm flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs uppercase tracking-wider text-rose-700 dark:text-rose-400 font-bold">
                03. Multi-Event Schedule
              </span>
              <button
                onClick={addEvent}
                className="flex items-center gap-1.5 text-xs font-mono font-bold text-rose-700 dark:text-rose-400 hover:opacity-80 transition-opacity bg-rose-50 px-3 py-1.5 rounded-xl border border-rose-200"
              >
                <Plus size={14} />
                <span>Add Event</span>
              </button>
            </div>

            <div className="flex flex-col gap-3">
              {events.map((evt, idx) => (
                <div
                  key={evt.id}
                  className="p-4 rounded-2xl bg-slate-50/60 dark:bg-purple-950/30 border border-slate-200 dark:border-purple-900/40 grid grid-cols-1 sm:grid-cols-12 gap-3 items-center"
                >
                  <div className="sm:col-span-5">
                    <label className="text-[10px] font-mono uppercase tracking-wider text-slate-700 dark:text-purple-300 font-bold block mb-1">
                      Event #{idx + 1} Name
                    </label>
                    <input
                      type="text"
                      value={evt.name}
                      onChange={(e) => updateEvent(evt.id, 'name', e.target.value)}
                      placeholder="e.g. Sangeet, Muhurtham"
                      className="w-full text-xs px-3 py-2 rounded-xl bg-white dark:bg-[#170C22] border border-slate-300 dark:border-purple-800 text-slate-900 dark:text-white font-medium"
                    />
                  </div>

                  <div className="sm:col-span-4">
                    <label className="text-[10px] font-mono uppercase tracking-wider text-slate-700 dark:text-purple-300 font-bold block mb-1">
                      Date & Time
                    </label>
                    <input
                      type="date"
                      value={evt.date}
                      onChange={(e) => updateEvent(evt.id, 'date', e.target.value)}
                      className="w-full text-xs px-3 py-2 rounded-xl bg-white dark:bg-[#170C22] border border-slate-300 dark:border-purple-800 text-slate-900 dark:text-white font-mono font-semibold"
                    />
                  </div>

                  <div className="sm:col-span-3 flex items-center justify-end pt-4 sm:pt-0">
                    {events.length > 1 && (
                      <button
                        onClick={() => removeEvent(evt.id)}
                        className="p-2 text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-lg transition-colors"
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
          <div className="p-6 rounded-3xl bg-white dark:bg-[#170C22] border border-slate-200/90 dark:border-purple-800/40 shadow-sm flex flex-col gap-4">
            <span className="font-mono text-xs uppercase tracking-wider text-purple-900 dark:text-purple-300 font-bold">
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
                  className={`p-4 rounded-2xl text-left border transition-all ${
                    albumType === t.id
                      ? 'border-purple-600 bg-purple-50 dark:bg-purple-950/50 ring-2 ring-purple-600/30'
                      : 'border-slate-300 dark:border-purple-800 bg-white dark:bg-[#170C22]'
                  }`}
                >
                  <span className="text-xs font-bold text-slate-900 dark:text-white block">
                    {t.name}
                  </span>
                  <span className="font-mono text-xs font-bold text-rose-700 dark:text-rose-400 mt-1 block">
                    {t.price} / book
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Step 5: Complete Family Journey Add-ons */}
          <div className="p-6 rounded-3xl bg-white dark:bg-[#170C22] border border-slate-200/90 dark:border-purple-800/40 shadow-sm flex flex-col gap-4">
            <div>
              <span className="font-mono text-xs uppercase tracking-wider text-rose-700 dark:text-rose-400 font-bold block">
                05. Complete Family Journey
              </span>
              <span className="text-sm text-slate-700 dark:text-slate-300 font-normal">
                Lock in lifetime milestones (Maternity → Project BabyBliss → 1st Birthday).
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
                    className={`p-4 rounded-2xl text-left border transition-all flex items-start justify-between ${
                      isChecked
                        ? 'border-purple-600 bg-purple-50/80 dark:bg-purple-950/40 font-bold ring-2 ring-purple-600/30'
                        : 'border-slate-300 dark:border-purple-800 bg-white dark:bg-[#170C22]'
                    }`}
                  >
                    <div>
                      <span className="text-xs text-slate-900 dark:text-purple-100 block">
                        {milestone}
                      </span>
                      <span className="font-mono text-xs font-bold text-purple-800 dark:text-purple-300 mt-1 block">
                        +₹15,000
                      </span>
                    </div>
                    {isChecked && (
                      <CheckCircle2 size={16} className="text-purple-700 mt-0.5 flex-shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Live Savings & Price Calculation Summary */}
        <div className="lg:col-span-5">
          <div className="sticky top-28 p-8 rounded-3xl bg-white dark:bg-[#170C22] border border-slate-200/90 dark:border-purple-800/50 shadow-museum flex flex-col gap-6">
            <div className="border-b border-slate-200 dark:border-purple-900/40 pb-4">
              <span className="font-mono text-[10px] uppercase tracking-widest text-rose-700 dark:text-rose-400 font-bold bg-rose-50 px-2.5 py-0.5 rounded-full border border-rose-200">
                Live Investment Estimator
              </span>
              <h3 className="text-xl font-bold font-hero text-slate-900 dark:text-white mt-2">
                Your Bespoke Collection
              </h3>
            </div>

            {/* Breakdown List */}
            <div className="flex flex-col gap-2.5 max-h-64 overflow-y-auto pr-1 text-xs">
              {calculation.breakdown.length === 0 ? (
                <p className="text-slate-500 italic">
                  Select your coverage components on the left...
                </p>
              ) : (
                calculation.breakdown.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between text-slate-800 dark:text-slate-200 font-medium"
                  >
                    <span className="truncate pr-2">{item.label}</span>
                    <span className="font-mono font-bold flex-shrink-0 text-slate-900 dark:text-white">
                      {formatCurrency(item.amount)}
                    </span>
                  </div>
                ))
              )}
            </div>

            {/* Totals & Dynamic Combination Discount */}
            <div className="pt-4 border-t border-slate-200 dark:border-purple-900/40 flex flex-col gap-3">
              <div className="flex items-center justify-between text-xs text-slate-700 dark:text-slate-300 font-medium">
                <span>Individual Component Value:</span>
                <span className="font-mono font-bold">{formatCurrency(calculation.rawTotal)}</span>
              </div>

              {calculation.percentage > 0 && (
                <div className="flex items-center justify-between text-xs text-emerald-800 dark:text-emerald-300 font-bold bg-emerald-50 dark:bg-emerald-950/40 p-3 rounded-xl border border-emerald-300">
                  <div className="flex items-center gap-1.5">
                    <Tag size={14} className="text-emerald-700" />
                    <span>Combination Discount ({calculation.percentage}%):</span>
                  </div>
                  <span className="font-mono font-bold">
                    -{formatCurrency(calculation.discountAmount)}
                  </span>
                </div>
              )}

              <div className="flex items-baseline justify-between pt-3 border-t border-slate-200 dark:border-purple-900/40">
                <span className="font-hero text-base font-bold text-slate-900 dark:text-white">
                  Your Bespoke Collection:
                </span>
                <span className="font-mono text-2xl font-extrabold text-purple-900 dark:text-purple-200">
                  {formatCurrency(calculation.finalTotal)}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-2.5">
              <Link
                href={`/checkout?package=pkg-custom&customName=${encodeURIComponent(
                  'Bespoke Custom Collection',
                )}&customPrice=${calculation.finalTotal}`}
              >
                <button className="w-full py-4 rounded-2xl bg-gradient-to-r from-purple-700 via-rose-600 to-purple-700 text-white font-nav text-xs font-bold uppercase tracking-[0.2em] shadow-lg hover:opacity-95 transition-all flex items-center justify-center gap-2">
                  <span>Proceed to Booking & Gateway</span>
                  <ArrowRight size={15} />
                </button>
              </Link>

              <Link
                href={`/book?custom=true&total=${calculation.finalTotal}&days=${days}&events=${events.length}`}
              >
                <button className="w-full py-3 rounded-2xl border border-purple-200 dark:border-purple-800 text-slate-800 dark:text-purple-200 font-nav text-[11px] font-bold uppercase tracking-wider hover:bg-purple-50 dark:hover:bg-purple-950/40 transition-all flex items-center justify-center gap-2">
                  <span>Inquire Availability First</span>
                </button>
              </Link>
            </div>

            <div className="flex items-center gap-2 text-[10px] font-mono text-slate-600 dark:text-purple-300 justify-center font-medium">
              <ShieldCheck size={14} className="text-emerald-600" />
              <span>25% Date-Lock Token Guarantee & Archival Receipt.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
