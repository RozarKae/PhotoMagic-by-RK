'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Crown,
  Bell,
  MessageSquare,
  Headphones,
  LayoutDashboard,
  FolderHeart,
  ImageIcon,
  Heart,
  BookOpen,
  MessageCircle,
  Download,
  Clock,
  CreditCard,
  User,
  HelpCircle,
  ChevronRight,
  ChevronDown,
  Share2,
  Edit3,
  FileText,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Video,
  Film,
} from 'lucide-react';

export default function ClientPortalPage() {
  const [activeNav, setActiveNav] = useState('Dashboard');

  const navItems = [
    { label: 'Dashboard', icon: LayoutDashboard, href: '/portal' },
    { label: 'My Projects', icon: FolderHeart, href: '/portal' },
    { label: 'Gallery', icon: ImageIcon, href: '/portal' },
    { label: 'Favorites', icon: Heart, href: '/portal', badge: '24' },
    { label: 'Album Proofs', icon: BookOpen, href: '/portal' },
    { label: 'Comments', icon: MessageCircle, href: '/portal' },
    { label: 'Downloads', icon: Download, href: '/portal' },
    { label: 'Timeline', icon: Clock, href: '/portal' },
    { label: 'Invoices & Payments', icon: CreditCard, href: '/portal' },
    { label: 'Profile', icon: User, href: '/portal' },
    { label: 'Help & Support', icon: HelpCircle, href: '/portal' },
  ];

  return (
    <div className="flex min-h-screen bg-[#08080A] text-ivory font-body selection:bg-gold-500 selection:text-black">
      {/* Sleek Left Navigation Sidebar */}
      <aside className="w-64 bg-[#0D0D11] border-r border-white/5 flex flex-col justify-between flex-shrink-0 min-h-screen">
        <div>
          {/* Top Brand Logo Hallmark */}
          <div className="p-6 border-b border-white/5 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold-400 via-gold-500 to-gold-700 p-[1px] flex items-center justify-center shadow-watch">
              <div className="w-full h-full bg-[#0D0D11] rounded-full flex items-center justify-center text-gold-400 font-hero font-bold text-sm">
                P
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-hero font-bold text-sm tracking-[0.2em] text-ivory">
                PHOTOMAGIC
              </span>
              <span className="font-nav text-[9px] uppercase tracking-[0.25em] text-gold-500 font-semibold">
                CLIENT PORTAL
              </span>
            </div>
          </div>

          {/* Navigation Links List */}
          <nav className="p-4 flex flex-col gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeNav === item.label;

              return (
                <button
                  key={item.label}
                  onClick={() => setActiveNav(item.label)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-nav text-[11px] font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-gold-500/15 via-gold-500/10 to-transparent text-gold-300 border-l-2 border-gold-500 font-semibold'
                      : 'text-silver/80 hover:text-ivory hover:bg-white/[0.03]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon size={16} className={isActive ? 'text-gold-400' : 'text-silver/60'} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="px-2 py-0.5 rounded-full text-[9px] font-mono font-bold bg-gold-500/20 text-gold-300 border border-gold-500/30">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer Cards */}
        <div className="p-4 flex flex-col gap-4">
          {/* Hallmark Quote Box */}
          <div className="p-4 rounded-2xl bg-gradient-to-b from-white/[0.04] to-white/[0.01] border border-gold-500/20 text-center">
            <span className="font-heading italic text-xs text-gold-300 tracking-wide block">
              EVERY MOMENT, BEAUTIFULLY PRESERVED.
            </span>
            <div className="w-8 h-[1px] bg-gold-500/40 mx-auto my-2" />
          </div>

          {/* Profile User Badge */}
          <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
                alt="Arifa Bivi"
                className="w-9 h-9 rounded-full object-cover border border-gold-500/40"
              />
              <div className="flex flex-col">
                <span className="text-xs font-bold text-ivory">Arifa Bivi</span>
                <span className="text-[10px] text-gold-400 font-medium">Premium Client</span>
              </div>
            </div>
            <ChevronDown size={14} className="text-silver/60" />
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header Navbar */}
        <header className="h-20 px-8 bg-[#08080A]/90 backdrop-blur-2xl border-b border-white/5 flex items-center justify-between sticky top-0 z-30">
          <div>
            <h1 className="font-heading text-2xl font-bold text-ivory flex items-center gap-2">
              Welcome, Arifa Bivi <Sparkles size={18} className="text-gold-400 animate-pulse" />
            </h1>
            <p className="text-xs text-silver/70 font-light">Relive your beautiful moments</p>
          </div>

          {/* Action Icons & Support */}
          <div className="flex items-center gap-4">
            <button
              aria-label="Notifications"
              className="relative p-2.5 rounded-full bg-white/[0.03] border border-white/10 text-silver hover:text-ivory hover:bg-white/[0.06] transition-colors"
            >
              <Bell size={18} />
              <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-gold-500 text-black text-[9px] font-bold flex items-center justify-center">
                3
              </span>
            </button>

            <button
              aria-label="Messages"
              className="p-2.5 rounded-full bg-white/[0.03] border border-white/10 text-silver hover:text-ivory hover:bg-white/[0.06] transition-colors"
            >
              <MessageSquare size={18} />
            </button>

            <button className="px-4 py-2 rounded-full bg-white/[0.03] border border-gold-500/30 text-xs font-nav text-gold-400 hover:bg-gold-500/10 flex items-center gap-2 transition-colors">
              <Headphones size={15} />
              <span>Need Help?</span>
            </button>
          </div>
        </header>

        {/* Dashboard Grid Container */}
        <main className="p-8 max-w-[1600px] w-full mx-auto flex flex-col gap-8 pb-16">
          {/* Row 1: Current Project Hero Card & Project Summary */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Current Project Hero Card */}
            <div className="lg:col-span-2 rounded-2xl bg-[#0E0E12] border border-white/5 p-6 flex flex-col md:flex-row justify-between items-center relative overflow-hidden group shadow-museum">
              <div className="flex flex-col gap-3 z-10 max-w-md">
                <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-gold-400 font-semibold">
                  CURRENT PROJECT
                </span>
                <h2 className="font-hero text-3xl font-bold text-ivory tracking-wide">
                  Arifa & Rozar
                </h2>
                <p className="text-xs text-silver/80 font-mono">📅 30 Aug 2026 • Nikkah Ceremony</p>

                <div className="pt-2">
                  <button className="px-5 py-2.5 rounded-xl border border-gold-500/40 text-gold-300 hover:bg-gold-500/10 hover:border-gold-400 text-xs font-nav font-semibold tracking-wider flex items-center gap-2 transition-all">
                    <span>View Project</span>
                    <ChevronRight size={15} />
                  </button>
                </div>
              </div>

              {/* Cover Photo */}
              <div className="w-full md:w-72 h-44 rounded-xl overflow-hidden mt-4 md:mt-0 relative border border-white/10 shadow-lg">
                <img
                  src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80"
                  alt="Arifa & Rozar Nikkah Ceremony"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              </div>
            </div>

            {/* Project Summary Card */}
            <div className="rounded-2xl bg-[#0E0E12] border border-white/5 p-6 flex flex-col justify-between shadow-museum">
              <h3 className="font-heading text-lg font-bold text-ivory border-b border-white/5 pb-3">
                Project Summary
              </h3>

              <div className="flex flex-col gap-4 my-auto pt-3">
                <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/5">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-gold-500/10 text-gold-400">
                      <ImageIcon size={18} />
                    </div>
                    <span className="text-xs text-silver/90">Total Photos</span>
                  </div>
                  <span className="font-mono text-sm font-bold text-ivory">1,350</span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/5">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-gold-500/10 text-gold-400">
                      <Film size={18} />
                    </div>
                    <span className="text-xs text-silver/90">Total Videos</span>
                  </div>
                  <span className="font-mono text-sm font-bold text-ivory">28</span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/5">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-gold-500/10 text-gold-400">
                      <Heart size={18} />
                    </div>
                    <span className="text-xs text-silver/90">Favorites</span>
                  </div>
                  <span className="font-mono text-sm font-bold text-gold-400">24</span>
                </div>
              </div>
            </div>
          </div>

          {/* Row 2: Gallery & Quick Actions */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Gallery Section */}
            <div className="lg:col-span-2 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <h3 className="font-heading text-xl font-bold text-ivory flex items-center gap-2">
                  <ImageIcon size={20} className="text-gold-400" />
                  <span>Gallery</span>
                </h3>
                <button className="text-xs font-nav text-gold-400 hover:text-gold-300 font-medium">
                  View All
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  {
                    title: 'Nikkah Ceremony',
                    count: '532 Photos • 12 Videos',
                    image:
                      'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80',
                  },
                  {
                    title: 'Sangeet Night',
                    count: '384 Photos • 8 Videos',
                    image:
                      'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=600&q=80',
                  },
                  {
                    title: 'Couple Portraits',
                    count: '156 Photos',
                    image:
                      'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=600&q=80',
                  },
                  {
                    title: 'Details & Décor',
                    count: '278 Photos',
                    image:
                      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
                  },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="h-44 rounded-2xl overflow-hidden relative group border border-white/5 cursor-pointer shadow-museum"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent p-4 flex flex-col justify-end">
                      <h4 className="font-heading text-lg font-bold text-ivory">{item.title}</h4>
                      <span className="text-xs text-silver/80 font-mono">{item.count}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions Card */}
            <div className="rounded-2xl bg-[#0E0E12] border border-white/5 p-6 flex flex-col gap-4 shadow-museum">
              <h3 className="font-heading text-lg font-bold text-ivory border-b border-white/5 pb-3">
                Quick Actions
              </h3>

              <div className="flex flex-col gap-3">
                {[
                  {
                    title: 'Download Photos',
                    desc: 'Get your photos in high quality',
                    icon: Download,
                  },
                  {
                    title: 'Share Gallery',
                    desc: 'Share with family & friends',
                    icon: Share2,
                  },
                  {
                    title: 'Request Edits',
                    desc: 'Let us know your preferences',
                    icon: Edit3,
                  },
                  {
                    title: 'View Invoice',
                    desc: 'Payment & billing details',
                    icon: FileText,
                  },
                ].map((action, idx) => {
                  const Icon = action.icon;
                  return (
                    <button
                      key={idx}
                      className="w-full p-3.5 rounded-xl bg-white/[0.02] border border-white/5 hover:border-gold-500/30 hover:bg-white/[0.04] flex items-center justify-between group transition-all"
                    >
                      <div className="flex items-center gap-3 text-left">
                        <div className="p-2 rounded-lg bg-gold-500/10 text-gold-400">
                          <Icon size={16} />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-xs font-bold text-ivory group-hover:text-gold-300 transition-colors">
                            {action.title}
                          </span>
                          <span className="text-[10px] text-silver/70">{action.desc}</span>
                        </div>
                      </div>
                      <ChevronRight
                        size={16}
                        className="text-silver/40 group-hover:text-gold-400 group-hover:translate-x-0.5 transition-all"
                      />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Row 3: Album Proofing & Timeline */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Album Proofing Card */}
            <div className="lg:col-span-2 flex flex-col gap-4">
              <h3 className="font-heading text-xl font-bold text-ivory flex items-center gap-2">
                <BookOpen size={20} className="text-gold-400" />
                <span>Album Proofing</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Main Wedding Album Card */}
                <div className="md:col-span-2 rounded-2xl bg-[#0E0E12] border border-white/5 p-6 flex flex-col md:flex-row gap-6 items-center shadow-museum">
                  <div className="w-full md:w-56 h-36 rounded-xl overflow-hidden relative border border-white/10 flex-shrink-0">
                    <img
                      src="https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=600&q=80"
                      alt="Wedding Album Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex flex-col gap-3 flex-1 w-full">
                    <div>
                      <h4 className="font-heading text-xl font-bold text-ivory">Wedding Album</h4>
                      <p className="text-xs text-silver/70 font-mono">
                        30 Spreads • Created on 28 May 2026
                      </p>
                    </div>

                    {/* Progress Bar */}
                    <div className="flex flex-col gap-1.5">
                      <div className="flex justify-between text-xs font-mono text-silver">
                        <span>12/30 Spreads Approved</span>
                        <span className="text-gold-400 font-bold">40%</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-gold-500 to-gold-400 w-[40%]" />
                      </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex items-center gap-3 pt-2">
                      <button className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-gold-500 via-gold-400 to-gold-600 text-black font-nav font-bold text-xs shadow-watch hover:brightness-105 transition-all">
                        Review & Approve
                      </button>
                      <button
                        aria-label="Comments"
                        className="p-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-silver hover:text-ivory transition-colors"
                      >
                        <MessageSquare size={16} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Parent Album Card */}
                <div className="rounded-2xl bg-[#0E0E12] border border-white/5 p-6 flex flex-col justify-between shadow-museum">
                  <div>
                    <h4 className="font-heading text-lg font-bold text-ivory">Parent Album</h4>
                    <span className="text-[10px] text-silver/60 uppercase font-mono block">
                      (Optional)
                    </span>
                    <p className="text-xs text-silver/70 font-mono mt-2">10 Spreads</p>
                  </div>

                  <button className="w-full py-2.5 rounded-xl border border-gold-500/40 text-gold-300 hover:bg-gold-500/10 text-xs font-nav font-semibold transition-all mt-4">
                    View
                  </button>
                </div>
              </div>
            </div>

            {/* Timeline Card */}
            <div className="rounded-2xl bg-[#0E0E12] border border-white/5 p-6 flex flex-col justify-between shadow-museum">
              <div className="flex items-center justify-between border-b border-white/5 pb-3">
                <h3 className="font-heading text-lg font-bold text-ivory">Timeline</h3>
                <button className="text-xs font-nav text-gold-400 hover:text-gold-300 font-medium">
                  View Full Timeline
                </button>
              </div>

              {/* Timeline Vertical Stepper */}
              <div className="flex flex-col gap-4 py-4 relative pl-4 border-l border-white/10 my-auto">
                {[
                  { date: '30 Aug 2026', title: 'Nikkah Ceremony', status: 'Completed' },
                  { date: '29 Aug 2026', title: 'Sangeet Night', status: 'Completed' },
                  { date: '28 Aug 2026', title: 'Haldi Ceremony', status: 'Completed' },
                  { date: 'Upcoming', title: 'Valima (TBD)', status: 'Coming Soon' },
                ].map((step, idx) => (
                  <div key={idx} className="relative flex flex-col gap-0.5">
                    <div className="absolute -left-[21px] top-1.5 w-2.5 h-2.5 rounded-full bg-gold-400 border border-black shadow-watch" />
                    <span className="text-[10px] font-mono text-silver/60">{step.date}</span>
                    <span className="text-xs font-bold text-ivory">{step.title}</span>
                    <span className="text-[10px] font-mono text-gold-400">{step.status}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Row 4: Recent Activity Section */}
          <div className="flex flex-col gap-4 pt-2">
            <h3 className="font-heading text-xl font-bold text-ivory flex items-center gap-2">
              <Clock size={20} className="text-gold-400" />
              <span>Recent Activity</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                {
                  desc: 'New photos added to Nikkah Ceremony',
                  time: '2 hours ago',
                  icon: ImageIcon,
                },
                {
                  desc: 'Album proof updated: 12 Spreads Approved',
                  time: '5 hours ago',
                  icon: BookOpen,
                },
                {
                  desc: 'Your payment was successful',
                  time: '1 day ago',
                  icon: CheckCircle2,
                },
                {
                  desc: 'Comments added on 3 photos',
                  time: '2 days ago',
                  icon: MessageSquare,
                },
              ].map((act, idx) => {
                const Icon = act.icon;
                return (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-[#0E0E12] border border-white/5 flex items-center gap-3.5 shadow-museum"
                  >
                    <div className="p-2.5 rounded-full bg-white/[0.03] border border-white/10 text-gold-400 flex-shrink-0">
                      <Icon size={18} />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs font-medium text-ivory line-clamp-1">
                        {act.desc}
                      </span>
                      <span className="text-[10px] font-mono text-silver/60">{act.time}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Footer Signature */}
          <footer className="pt-8 pb-4 text-center flex flex-col items-center gap-2 border-t border-white/5 mt-8">
            <p className="font-heading italic text-sm text-gold-300/80 tracking-wide">
              Thank you for trusting us to capture your precious moments.
            </p>
            <Heart size={14} className="text-gold-500 fill-gold-500" />
          </footer>
        </main>
      </div>
    </div>
  );
}
