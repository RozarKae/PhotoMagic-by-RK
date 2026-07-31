'use client';

import React, { useState } from 'react';
import { Card, Badge, Button } from '@photomagic/ui';
import { PortfolioPublisherHub } from '../../components/studio-intelligence/PortfolioPublisherHub';
import { RevenueReportsCenter } from '../../components/studio-intelligence/RevenueReportsCenter';
import { BusinessInsightsAnalytics } from '../../components/studio-intelligence/BusinessInsightsAnalytics';
import { StudioFinalExecutiveDashboard } from '../../components/studio-intelligence/StudioFinalExecutiveDashboard';
import { LayoutDashboard, Globe, DollarSign, BarChart2, Sparkles } from 'lucide-react';

export default function StudioIntelligencePage() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'portfolio' | 'revenue' | 'insights'>(
    'dashboard',
  );

  return (
    <main className="p-8 max-w-[1600px] mx-auto flex flex-col gap-8 pb-24">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="gold">Phases 10.6 – 10.9 Studio Intelligence Suite</Badge>
            <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
              Final Release Ready
            </span>
          </div>
          <h1 className="text-3xl font-extrabold text-text-primary mt-1">
            Studio Intelligence & Production Command Center
          </h1>
          <p className="text-sm text-text-secondary mt-0.5">
            Website portfolio publisher, financial revenue reports, actionable business insights,
            and master executive telemetry dashboard.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="primary" className="flex items-center gap-2 font-bold">
            <Sparkles size={16} /> Sync Studio Telemetry
          </Button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-border-subtle overflow-x-auto pb-2 scrollbar-none">
        <button
          onClick={() => setActiveTab('dashboard')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${
            activeTab === 'dashboard'
              ? 'bg-gold-500/20 text-gold-500 border border-gold-500/40 shadow-lg shadow-gold-500/5'
              : 'text-text-secondary hover:text-text-primary hover:bg-surface-elevated'
          }`}
        >
          <LayoutDashboard size={18} /> Master Executive Dashboard (10.9)
        </button>

        <button
          onClick={() => setActiveTab('portfolio')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${
            activeTab === 'portfolio'
              ? 'bg-gold-500/20 text-gold-500 border border-gold-500/40 shadow-lg shadow-gold-500/5'
              : 'text-text-secondary hover:text-text-primary hover:bg-surface-elevated'
          }`}
        >
          <Globe size={18} /> Portfolio Publisher (10.6)
        </button>

        <button
          onClick={() => setActiveTab('revenue')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${
            activeTab === 'revenue'
              ? 'bg-gold-500/20 text-gold-500 border border-gold-500/40 shadow-lg shadow-gold-500/5'
              : 'text-text-secondary hover:text-text-primary hover:bg-surface-elevated'
          }`}
        >
          <DollarSign size={18} /> Financial Revenue Reports (10.7)
        </button>

        <button
          onClick={() => setActiveTab('insights')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${
            activeTab === 'insights'
              ? 'bg-gold-500/20 text-gold-500 border border-gold-500/40 shadow-lg shadow-gold-500/5'
              : 'text-text-secondary hover:text-text-primary hover:bg-surface-elevated'
          }`}
        >
          <BarChart2 size={18} /> Business Insights (10.8)
        </button>
      </div>

      {/* Tab Content Display */}
      <div className="flex flex-col gap-8">
        {activeTab === 'dashboard' && (
          <>
            <StudioFinalExecutiveDashboard />
            <PortfolioPublisherHub />
            <RevenueReportsCenter />
            <BusinessInsightsAnalytics />
          </>
        )}

        {activeTab === 'portfolio' && <PortfolioPublisherHub />}

        {activeTab === 'revenue' && <RevenueReportsCenter />}

        {activeTab === 'insights' && <BusinessInsightsAnalytics />}
      </div>
    </main>
  );
}
