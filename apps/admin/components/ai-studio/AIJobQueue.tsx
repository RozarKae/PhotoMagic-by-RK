'use client';

import React, { useState } from 'react';
import { Card, Badge, Button } from '@photomagic/ui';
import { Activity, RefreshCw, XCircle, CheckCircle2, Clock, Play } from 'lucide-react';

export interface AIJobItem {
  id: string;
  jobId: string;
  modelName: string;
  promptSnippet: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  progressPercent: number;
  errorMessage?: string;
  createdAt: string;
}

export const AIJobQueue: React.FC = () => {
  const [jobs, setJobs] = useState<AIJobItem[]>([
    {
      id: 'j-101',
      jobId: 'JOB-2026-001',
      modelName: 'Gemini 1.5 Flash Vision',
      promptSnippet: 'Royal Palace Golden Hour Lighting...',
      status: 'processing',
      progressPercent: 65,
      createdAt: '12:44 PM',
    },
    {
      id: 'j-102',
      jobId: 'JOB-2026-002',
      modelName: 'Flux 1.1 Pro',
      promptSnippet: 'Haute Couture Vogue Portrait...',
      status: 'completed',
      progressPercent: 100,
      createdAt: '12:30 PM',
    },
  ]);

  const handleRetry = (id: string) => {
    setJobs((prev) =>
      prev.map((j) => (j.id === id ? { ...j, status: 'processing', progressPercent: 10 } : j)),
    );
  };

  const handleCancel = (id: string) => {
    setJobs((prev) =>
      prev.map((j) =>
        j.id === id ? { ...j, status: 'failed', errorMessage: 'Cancelled by user' } : j,
      ),
    );
  };

  return (
    <Card variant="glass" className="p-6 flex flex-col gap-4">
      <div className="flex justify-between items-center pb-2 border-b border-border-subtle">
        <div className="flex items-center gap-2">
          <Activity size={18} className="text-gold-500" />
          <h3 className="text-sm font-bold text-text-primary">
            Background AI Generation Queue Engine
          </h3>
        </div>
        <Badge variant="gold">{jobs.length} Jobs Tracked</Badge>
      </div>

      <div className="flex flex-col gap-3">
        {jobs.map((job) => (
          <div
            key={job.id}
            className="p-4 rounded-xl bg-surface-base border border-border-subtle flex flex-col gap-2 text-xs"
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-text-primary">{job.jobId}</span>
                <span className="text-text-tertiary">• {job.modelName}</span>
              </div>
              <Badge
                variant={
                  job.status === 'completed'
                    ? 'success'
                    : job.status === 'failed'
                      ? 'error'
                      : 'warning'
                }
              >
                {job.status}
              </Badge>
            </div>

            <p className="text-text-secondary truncate">{job.promptSnippet}</p>

            {job.status === 'processing' && (
              <div className="flex flex-col gap-1 mt-1">
                <div className="flex justify-between text-[10px] text-text-tertiary">
                  <span>Processing Progress</span>
                  <span>{job.progressPercent}%</span>
                </div>
                <div className="h-1.5 w-full bg-surface-elevated rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gold-500 transition-all duration-300"
                    style={{ width: `${job.progressPercent}%` }}
                  />
                </div>
              </div>
            )}

            <div className="flex justify-between items-center pt-2 text-[10px] text-text-tertiary border-t border-border-subtle mt-1">
              <span>Started {job.createdAt}</span>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" onClick={() => handleRetry(job.id)}>
                  <RefreshCw size={12} />
                  Retry
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleCancel(job.id)}
                  className="text-status-error"
                >
                  <XCircle size={12} />
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
