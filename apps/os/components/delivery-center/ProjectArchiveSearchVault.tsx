'use client';

import React, { useState } from 'react';
import { Card, Badge, Button } from '@photomagic/ui';
import {
  Search,
  Archive,
  FileText,
  Film,
  DollarSign,
  Calendar,
  HardDrive,
  CheckCircle2,
} from 'lucide-react';

export const ProjectArchiveSearchVault: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const archivedProjects = [
    {
      id: 'arc-1',
      client: 'Eleanor Vance & Julian',
      title: 'Royal Udaipur Destination Wedding',
      size: '45.8 GB',
      photos: 1200,
      videos: 4,
      date: 'July 2026',
      status: 'archived',
    },
    {
      id: 'arc-2',
      client: 'Priya Sharma & Rohan',
      title: 'Sunset Beach Pre-Wedding',
      size: '18.2 GB',
      photos: 450,
      videos: 2,
      date: 'May 2026',
      status: 'cold_storage',
    },
    {
      id: 'arc-3',
      client: 'Karan Johar Gala',
      title: 'High-Fashion Corporate Awards',
      size: '32.4 GB',
      photos: 820,
      videos: 3,
      date: 'Jan 2026',
      status: 'archived',
    },
  ];

  const filtered = archivedProjects.filter(
    (p) =>
      p.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <Card variant="glass" className="p-6 flex flex-col gap-5">
      <div className="flex justify-between items-center pb-2 border-b border-border-subtle">
        <div className="flex items-center gap-2">
          <Archive size={18} className="text-gold-500" />
          <h3 className="text-sm font-bold text-text-primary">
            Phase 8.7 & 8.8 Instant Project Archive & Client History Vault
          </h3>
        </div>
        <Badge variant="gold">Cloudflare R2 Cold Archive</Badge>
      </div>

      {/* Instant Search Bar */}
      <div className="relative w-full">
        <Search size={16} className="absolute left-3.5 top-3 text-text-tertiary" />
        <input
          type="text"
          placeholder="Search archived projects, contracts, invoices, or client names..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full h-10 pl-10 pr-4 rounded-xl bg-surface-base border border-border-subtle text-xs text-text-primary focus:outline-none focus:border-gold-500 font-mono"
        />
      </div>

      {/* Archived Projects List */}
      <div className="flex flex-col gap-3 text-xs">
        {filtered.map((proj) => (
          <div
            key={proj.id}
            className="p-4 rounded-xl bg-surface-base border border-border-subtle flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3"
          >
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <span className="font-bold text-text-primary text-sm">{proj.client}</span>
                <Badge
                  variant={proj.status === 'archived' ? 'success' : 'gold'}
                  className="text-[9px] uppercase"
                >
                  {proj.status.replace('_', ' ')}
                </Badge>
              </div>
              <span className="text-xs text-text-secondary">{proj.title}</span>
              <span className="text-[10px] text-text-tertiary font-mono">
                {proj.photos} Photos • {proj.videos} Videos • {proj.size} • {proj.date}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="secondary" size="sm" className="text-xs">
                View Archive Bundle
              </Button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
