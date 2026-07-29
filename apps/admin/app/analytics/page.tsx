'use client';

import React from 'react';
import { Card, Badge, Button } from '@photomagic/ui';
import { ExecutiveKPICards } from '../../components/ai-bi/ExecutiveKPICards';
import { AIBusinessAdvisor } from '../../components/ai-bi/AIBusinessAdvisor';
import { RevenueForecastChart } from '../../components/ai-bi/RevenueForecastChart';
import { TeamProductivityMatrix } from '../../components/ai-bi/TeamProductivityMatrix';
import { CustomReportExporter } from '../../components/ai-bi/CustomReportExporter';
import { BarChart2, TrendingUp, Download, Sparkles, Filter } from 'lucide-react';

export default function BusinessIntelligencePage() {
  return (
    <main className="p-8 max-w-[1600px] mx-auto flex flex-col gap-8 pb-24">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <Badge variant="gold">Phase 3.6 AI Business Intelligence</Badge>
          <h1 className="text-3xl font-extrabold text-text-primary mt-1">AI Business Intelligence & Studio Analytics</h1>
          <p className="text-sm text-text-secondary">C-Suite financial overviews, 6-month AI revenue forecasting, strategic AI growth recommendations, and team productivity matrices.</p>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="secondary" className="flex items-center gap-1.5">
            <Filter size={16} /> Filter Date Range
          </Button>
          <Button variant="primary" className="flex items-center gap-2">
            <Download size={16} />
            Export Executive PDF Report
          </Button>
        </div>
      </div>

      {/* C-Suite Executive KPI Cards */}
      <ExecutiveKPICards />

      {/* 6-Month AI Revenue & Booking Forecast */}
      <RevenueForecastChart />

      {/* AI Strategic Advisor & Growth Engine */}
      <AIBusinessAdvisor />

      {/* Team Productivity Matrix & Custom Report Exporter */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card variant="glass" className="p-6">
          <h3 className="text-lg font-bold text-text-primary mb-4">Team Performance & Delivery Matrix</h3>
          <TeamProductivityMatrix />
        </Card>

        <CustomReportExporter />
      </div>
    </main>
  );
}
