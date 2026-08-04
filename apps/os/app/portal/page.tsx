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
  Clapperboard,
  Camera,
  Tv,
} from 'lucide-react';
import { WorkspacePanel, MetadataPanel, InspectorSidebar, Filmstrip } from '@photomagic/ui';

export default function ClientPortalPage() {
  const [activeNav, setActiveNav] = useState('Your Story');
  const [inspectorOpen, setInspectorOpen] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState('/images/hindu_wedding_ceremony.png');

  const navItems = [
    { label: 'Overview', icon: LayoutDashboard, href: '/portal' },
    { label: 'Event Collection', icon: FolderHeart, href: '/portal' },
    { label: 'Photo Proofs', icon: ImageIcon, href: '/portal' },
    { label: 'Favorite Moments', icon: Heart, href: '/portal', badge: '24' },
    { label: 'Album Selection', icon: BookOpen, href: '/portal' },
    { label: 'Studio Notes', icon: MessageCircle, href: '/portal' },
    { label: 'High-Res Downloads', icon: Download, href: '/portal' },
    { label: 'Timeline', icon: Clock, href: '/portal' },
    { label: 'Billing Ledger', icon: CreditCard, href: '/portal' },
    { label: 'Client Profile', icon: User, href: '/portal' },
    { label: 'Studio Concierge', icon: HelpCircle, href: '/portal' },
  ];

  return (
    <div className="flex min-h-screen bg-[#090909] text-[#F5F3EF] font-body selection:bg-gold-500 selection:text-black film-grain">
      {/* Client Gallery Navigation Sidebar */}
      <aside className="w-64 bg-[#141414] border-r border-white/10 flex flex-col justify-between flex-shrink-0 min-h-screen">
        <div>
          {/* Top Brand Logo Hallmark */}
          <div className="p-6 border-b border-white/10 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#1D1D1D] border border-gold-500/40 p-[1px] flex items-center justify-center shadow-kodakGlow">
              <Camera size={20} className="text-gold-400" />
            </div>
            <div className="flex flex-col">
              <span className="font-hero font-bold text-sm tracking-[0.2em] text-ivory">
                PHOTOMAGIC
              </span>
              <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-gold-500 font-semibold">
                CLIENT GALLERY
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
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg font-nav text-[11px] font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-[#1D1D1D] text-gold-300 border-l-2 border-gold-500 font-semibold shadow-kodakGlow'
                      : 'text-silver/80 hover:text-ivory hover:bg-white/[0.04]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon size={16} className={isActive ? 'text-gold-400' : 'text-silver/60'} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="px-2 py-0.5 rounded-md text-[9px] font-mono font-bold bg-gold-500/20 text-gold-300 border border-gold-500/30">
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
          <div className="p-4 rounded-xl bg-[#1D1D1D] border border-gold-500/20 text-center film-case">
            <span className="font-heading italic text-xs text-gold-300 tracking-wide block">
              PRESERVING TIMELESS MEMORIES WITH LUXURY ELEGANCE.
            </span>
            <div className="w-8 h-[1px] bg-gold-500/40 mx-auto my-2" />
          </div>

          {/* Profile User Badge */}
          <div className="p-3 rounded-xl bg-[#1D1D1D] border border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
                alt="Arifa Bivi"
                className="w-9 h-9 rounded-full object-cover border border-gold-500/40"
              />
              <div className="flex flex-col">
                <span className="text-xs font-bold text-ivory">Arifa Bivi</span>
                <span className="text-[10px] text-gold-400 font-mono font-medium">
                  Client Account
                </span>
              </div>
            </div>
            <ChevronDown size={14} className="text-silver/60" />
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header Navbar */}
        <header className="h-20 px-8 bg-[#090909]/90 backdrop-blur-2xl border-b border-white/10 flex items-center justify-between sticky top-0 z-30">
          <div>
            <h1 className="font-heading text-2xl font-bold text-ivory flex items-center gap-2">
              Welcome to Your Client Photo Gallery{' '}
              <Sparkles size={18} className="text-gold-400 animate-pulse" />
            </h1>
            <p className="text-xs text-silver/70 font-mono">
              Relive your memories in high-resolution photography
            </p>
          </div>

          {/* Action Icons & Concierge Support */}
          <div className="flex items-center gap-4">
            <button
              aria-label="Notifications"
              className="relative p-2.5 rounded-lg bg-[#141414] border border-white/10 text-silver hover:text-ivory hover:border-gold-500/30 transition-colors"
            >
              <Bell size={18} />
              <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-gold-500 text-black text-[9px] font-bold flex items-center justify-center">
                3
              </span>
            </button>

            <button
              aria-label="Messages"
              className="p-2.5 rounded-lg bg-[#141414] border border-white/10 text-silver hover:text-ivory hover:border-gold-500/30 transition-colors"
            >
              <MessageSquare size={18} />
            </button>

            <button
              onClick={() => setInspectorOpen(!inspectorOpen)}
              className="px-4 py-2 rounded-lg bg-[#1D1D1D] border border-gold-500/40 text-xs font-nav text-gold-400 hover:bg-gold-500/10 flex items-center gap-2 transition-colors"
            >
              <Camera size={15} />
              <span>{inspectorOpen ? 'Close Inspector' : 'EXIF Inspector'}</span>
            </button>

            <button className="px-4 py-2 rounded-lg bg-[#1D1D1D] border border-white/10 text-xs font-nav text-silver hover:text-ivory flex items-center gap-2 transition-colors">
              <Headphones size={15} />
              <span>Studio Concierge</span>
            </button>
          </div>
        </header>

        {/* Screening Dashboard Grid Container */}
        <main className="p-8 max-w-[1600px] w-full mx-auto flex flex-col gap-8 pb-16">
          {/* Row 1: Current Production Hero Card & Production Summary */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Current Production Hero Card */}
            <div className="lg:col-span-2 rounded-xl bg-[#141414] border border-white/10 p-6 flex flex-col md:flex-row justify-between items-center relative overflow-hidden group shadow-museum film-case">
              <div className="flex flex-col gap-3 z-10 max-w-md">
                <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-gold-400 font-semibold">
                  CURRENT PRODUCTION
                </span>
                <h2 className="font-hero text-3xl font-bold text-ivory tracking-wide">
                  Arifa & Rozar
                </h2>
                <p className="text-xs text-silver/80 font-mono">
                  🎬 30 Aug 2026 • Royal Nikkah Production
                </p>

                <div className="pt-2">
                  <button className="px-5 py-2.5 rounded-lg border border-gold-500/50 text-gold-300 hover:bg-gold-500/10 hover:border-gold-400 text-xs font-nav font-semibold tracking-wider flex items-center gap-2 transition-all shadow-kodakGlow">
                    <span>Explore Production Scenes</span>
                    <ChevronRight size={15} />
                  </button>
                </div>
              </div>

              {/* Cover Photo Frame */}
              <div className="w-full md:w-72 h-44 rounded-lg overflow-hidden mt-4 md:mt-0 relative border border-white/10 shadow-lg">
                <img
                  src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80"
                  alt="Arifa & Rozar Nikkah Production"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              </div>
            </div>

            {/* Production Summary Card */}
            <div className="rounded-xl bg-[#141414] border border-white/10 p-6 flex flex-col justify-between shadow-museum film-case">
              <h3 className="font-heading text-lg font-bold text-ivory border-b border-white/10 pb-3">
                Production Manifest
              </h3>

              <div className="flex flex-col gap-4 my-auto pt-3">
                <div className="flex items-center justify-between p-3 rounded-lg bg-[#1D1D1D] border border-white/5">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-gold-500/10 text-gold-400">
                      <Camera size={18} />
                    </div>
                    <span className="text-xs text-silver">Frames Captured</span>
                  </div>
                  <span className="font-mono text-sm font-bold text-ivory">2,458 Frames</span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg bg-[#1D1D1D] border border-white/5">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-gold-500/10 text-gold-400">
                      <Film size={18} />
                    </div>
                    <span className="text-xs text-silver">Director's Cuts</span>
                  </div>
                  <span className="font-mono text-sm font-bold text-ivory">14 Reels</span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg bg-[#1D1D1D] border border-white/5">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-gold-500/10 text-gold-400">
                      <Heart size={18} />
                    </div>
                    <span className="text-xs text-silver">Curated Favorites</span>
                  </div>
                  <span className="font-mono text-sm font-bold text-gold-400">24 Scenes</span>
                </div>
              </div>
            </div>
          </div>

          {/* Row 2: Scenes & Quick Actions */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Scenes Section */}
            <div className="lg:col-span-2 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <h3 className="font-heading text-xl font-bold text-ivory flex items-center gap-2">
                  <Clapperboard size={20} className="text-gold-400" />
                  <span>Production Scenes</span>
                </h3>
                <button className="text-xs font-nav text-gold-400 hover:text-gold-300 font-medium">
                  View All Scenes
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  {
                    title: 'Scene 01: Nikkah Ceremony',
                    count: '940 Frames • 4 Reels',
                    image:
                      'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80',
                  },
                  {
                    title: 'Scene 02: Sangeet Gala',
                    count: '680 Frames • 3 Reels',
                    image:
                      'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=600&q=80',
                  },
                  {
                    title: 'Scene 03: Editorial Portraits',
                    count: '420 Frames',
                    image:
                      'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=600&q=80',
                  },
                  {
                    title: 'Scene 04: Production Details',
                    count: '418 Frames',
                    image:
                      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
                  },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="h-44 rounded-xl overflow-hidden relative group border border-white/10 cursor-pointer shadow-museum film-case"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-4 flex flex-col justify-end">
                      <h4 className="font-heading text-lg font-bold text-ivory">{item.title}</h4>
                      <span className="text-xs text-silver/80 font-mono">{item.count}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Production Actions Card */}
            <div className="rounded-xl bg-[#141414] border border-white/10 p-6 flex flex-col gap-4 shadow-museum film-case">
              <h3 className="font-heading text-lg font-bold text-ivory border-b border-white/10 pb-3">
                Production Controls
              </h3>

              <div className="flex flex-col gap-3">
                {[
                  {
                    title: 'Download Master Archive',
                    desc: 'High-res 35mm archival format',
                    icon: Download,
                  },
                  {
                    title: 'Share Screening Access',
                    desc: 'Invite cast & family members',
                    icon: Share2,
                  },
                  {
                    title: "Editor's Revision Request",
                    desc: "Provide director's notes & feedback",
                    icon: Edit3,
                  },
                  {
                    title: 'Production Ledger',
                    desc: 'Review billing & invoice manifest',
                    icon: FileText,
                  },
                ].map((action, idx) => {
                  const Icon = action.icon;
                  return (
                    <button
                      key={idx}
                      className="w-full p-3.5 rounded-lg bg-[#1D1D1D] border border-white/5 hover:border-gold-500/40 hover:bg-[#242424] flex items-center justify-between group transition-all"
                    >
                      <div className="flex items-center gap-3 text-left">
                        <div className="p-2 rounded-lg bg-gold-500/10 text-gold-400">
                          <Icon size={16} />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-xs font-bold text-ivory group-hover:text-gold-300 transition-colors">
                            {action.title}
                          </span>
                          <span className="text-[10px] text-silver/70 font-mono">
                            {action.desc}
                          </span>
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

          {/* Row 3: Final Cut Review & Production Timeline */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Final Cut Review Suite */}
            <div className="lg:col-span-2 flex flex-col gap-4">
              <h3 className="font-heading text-xl font-bold text-ivory flex items-center gap-2">
                <BookOpen size={20} className="text-gold-400" />
                <span>Final Cut Approval Suite</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Main Feature Film Book */}
                <div className="md:col-span-2 rounded-xl bg-[#141414] border border-white/10 p-6 flex flex-col md:flex-row gap-6 items-center shadow-museum film-case">
                  <div className="w-full md:w-56 h-36 rounded-lg overflow-hidden relative border border-white/10 flex-shrink-0">
                    <img
                      src="https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=600&q=80"
                      alt="Feature Film Book Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex flex-col gap-3 flex-1 w-full">
                    <div>
                      <h4 className="font-heading text-xl font-bold text-ivory">
                        Feature Film Leather Book
                      </h4>
                      <p className="text-xs text-silver/70 font-mono">
                        30 Scenes • Master Cut Edition
                      </p>
                    </div>

                    {/* Progress Bar */}
                    <div className="flex flex-col gap-1.5">
                      <div className="flex justify-between text-xs font-mono text-silver">
                        <span>12/30 Scenes Approved</span>
                        <span className="text-gold-400 font-bold">40%</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-black overflow-hidden border border-white/10">
                        <div className="h-full bg-gradient-to-r from-gold-600 to-gold-400 w-[40%]" />
                      </div>
                    </div>

                    {/* Action Controls */}
                    <div className="flex items-center gap-3 pt-2">
                      <button className="px-5 py-2.5 rounded-lg bg-[#1D1D1D] text-ivory border border-gold-500/60 font-nav font-bold text-xs shadow-kodakGlow hover:border-gold-400 hover:text-gold-300 transition-all">
                        Approve Final Cut
                      </button>
                      <button
                        aria-label="Director's Notes"
                        className="p-2.5 rounded-lg bg-[#1D1D1D] border border-white/10 text-silver hover:text-ivory transition-colors"
                      >
                        <MessageSquare size={16} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Director's Cut Companion Book */}
                <div className="rounded-xl bg-[#141414] border border-white/10 p-6 flex flex-col justify-between shadow-museum film-case">
                  <div>
                    <h4 className="font-heading text-lg font-bold text-ivory">
                      Director's Companion Book
                    </h4>
                    <span className="text-[10px] text-silver/60 uppercase font-mono block">
                      (Archival Edition)
                    </span>
                    <p className="text-xs text-silver/70 font-mono mt-2">10 Scenes</p>
                  </div>

                  <button className="w-full py-2.5 rounded-lg border border-gold-500/40 text-gold-300 hover:bg-gold-500/10 text-xs font-nav font-semibold transition-all mt-4">
                    Review Scene Layout
                  </button>
                </div>
              </div>
            </div>

            {/* Production Timeline Card */}
            <div className="rounded-xl bg-[#141414] border border-white/10 p-6 flex flex-col justify-between shadow-museum film-case">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <h3 className="font-heading text-lg font-bold text-ivory">Production Timeline</h3>
                <button className="text-xs font-nav text-gold-400 hover:text-gold-300 font-medium">
                  Full Timeline
                </button>
              </div>

              {/* Production Timeline Stepper */}
              <div className="flex flex-col gap-3 py-4 relative pl-4 border-l border-white/10 my-auto">
                {[
                  { date: 'Pre Production', title: 'Creative Reconnaissance', status: 'Completed' },
                  {
                    date: 'Principal Photography',
                    title: 'On-Location 8K Shoot',
                    status: 'Completed',
                  },
                  { date: 'Post Production', title: 'Kodak Color Grading', status: 'In Progress' },
                  { date: 'Final Review', title: 'Final Cut Approval', status: 'Pending' },
                  { date: 'Release & Archive', title: 'Vault Distribution', status: 'Upcoming' },
                ].map((step, idx) => (
                  <div key={idx} className="relative flex flex-col gap-0.5">
                    <div className="absolute -left-[21px] top-1.5 w-2.5 h-2.5 rounded-full bg-gold-400 border border-black shadow-kodakGlow" />
                    <span className="text-[10px] font-mono text-silver/60">{step.date}</span>
                    <span className="text-xs font-bold text-ivory">{step.title}</span>
                    <span className="text-[10px] font-mono text-gold-400">{step.status}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Row 4: Recent Production Log */}
          <div className="flex flex-col gap-4 pt-2">
            <h3 className="font-heading text-xl font-bold text-ivory flex items-center gap-2">
              <Clock size={20} className="text-gold-400" />
              <span>Production Activity Log</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                {
                  desc: 'New master frames added to Nikkah Scene',
                  time: '2 hours ago',
                  icon: Camera,
                },
                {
                  desc: 'Final Cut updated: 12 Scenes Approved',
                  time: '5 hours ago',
                  icon: BookOpen,
                },
                {
                  desc: 'Production ledger payment processed',
                  time: '1 day ago',
                  icon: CheckCircle2,
                },
                {
                  desc: "Director's notes logged on 3 frames",
                  time: '2 days ago',
                  icon: MessageSquare,
                },
              ].map((act, idx) => {
                const Icon = act.icon;
                return (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-[#141414] border border-white/10 flex items-center gap-3.5 shadow-museum film-case"
                  >
                    <div className="p-2.5 rounded-lg bg-[#1D1D1D] border border-white/10 text-gold-400 flex-shrink-0">
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
          <footer className="pt-8 pb-4 text-center flex flex-col items-center gap-2 border-t border-white/10 mt-8">
            <p className="font-heading italic text-sm text-gold-300/90 tracking-wide">
              Thank you for trusting PhotoMagic Film Studio with your legacy production.
            </p>
            <Heart size={14} className="text-gold-500 fill-gold-500" />
          </footer>
        </main>
      </div>

      {/* Right Workspace Inspector Panel */}
      <InspectorSidebar
        isOpen={inspectorOpen}
        onClose={() => setInspectorOpen(false)}
        title="EXIF & Photo Inspector"
        imageSrc={selectedPhoto}
      >
        <MetadataPanel
          cameraModel="Leica SL2-S"
          lensSpec="Summilux-SL 50mm f/1.4 ASPH"
          aperture="f/1.4"
          shutterSpeed="1/1000s"
          iso="ISO 100"
          resolution="6000 × 4000 (24 MP)"
          fileSize="42.8 MB RAW"
        />
      </InspectorSidebar>
    </div>
  );
}
