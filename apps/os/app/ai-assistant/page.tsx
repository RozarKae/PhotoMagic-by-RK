'use client';

import React from 'react';
import { Card, Badge, Button } from '@photomagic/ui';
import { AIChatAssistant } from '../../components/AIChatAssistant';
import { AutomationWorkflowBuilder } from '../../components/AutomationWorkflowBuilder';
import { SmartSchedulingCard } from '../../components/SmartSchedulingCard';
import { Sparkles, Bot, Zap, Search, BrainCircuit } from 'lucide-react';

export default function AIAssistantPage() {
  return (
    <main className="p-8 max-w-7xl mx-auto flex flex-col gap-8 pb-24">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <Badge variant="gold">Provider-Agnostic Intelligence Layer</Badge>
          <h1 className="text-3xl font-extrabold text-text-primary mt-1">
            AI Studio Assistant & Automation
          </h1>
          <p className="text-sm text-text-secondary">
            Execute natural language queries, build visual automation workflows, and predict
            completion timelines.
          </p>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gold-500/10 border border-gold-500/20 text-gold-500 text-xs font-bold">
          <BrainCircuit size={16} />
          <span>Gemini 1.5 Flash Active</span>
        </div>
      </div>

      {/* Main Grid: AI Chat Command Center & Smart Scheduling */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <AIChatAssistant />
        </div>
        <div className="lg:col-span-1">
          <SmartSchedulingCard />
        </div>
      </div>

      {/* Visual Trigger -> Action Automation Engine */}
      <AutomationWorkflowBuilder />
    </main>
  );
}
