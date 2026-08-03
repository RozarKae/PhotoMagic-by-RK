'use client';

import React from 'react';
import { Card, Badge, Button } from '@photomagic/ui';
import { FileText, Download, ShieldCheck } from 'lucide-react';

export default function DocumentsPage() {
  const documents = [
    {
      title: 'Master Photography & Cinema Agreement',
      type: 'Executed Contract',
      date: '2026-07-29',
    },
    {
      title: 'Venue Logistics Brief & Timeline Schedule',
      type: 'Production Plan',
      date: '2026-07-29',
    },
  ];

  return (
    <main className="p-8 max-w-7xl mx-auto flex flex-col gap-8 pb-24">
      <div>
        <Badge variant="gold">Legal & Logistics</Badge>
        <h1 className="text-3xl font-extrabold text-text-primary mt-1">
          Contract & Document Center
        </h1>
        <p className="text-sm text-text-secondary">
          Access executed agreements, event briefs, and production plans.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {documents.map((doc, idx) => (
          <Card key={idx} variant="glass" className="p-6 flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-gold-500/10 p-3 text-gold-500 border border-gold-500/20">
                <FileText size={20} />
              </div>
              <div>
                <h3 className="font-bold text-text-primary text-sm">{doc.title}</h3>
                <span className="text-xs text-text-tertiary">
                  {doc.type} • {doc.date}
                </span>
              </div>
            </div>

            <Button variant="secondary" size="sm" className="flex items-center gap-2">
              <Download size={14} />
              Download
            </Button>
          </Card>
        ))}
      </div>
    </main>
  );
}
