'use client';

import React, { useState } from 'react';
import { Card, Badge, Button } from '@photomagic/ui';
import {
  BookOpen,
  Search,
  Plus,
  Filter,
  Calendar,
  User,
  SlidersHorizontal,
  CheckCircle2,
  Clock,
  Printer,
  Eye,
} from 'lucide-react';

export interface AlbumProjectItem {
  id: string;
  clientName: string;
  eventTitle: string;
  albumSize: string;
  totalPages: number;
  status: 'in_progress' | 'awaiting_approval' | 'approved' | 'ready_for_print' | 'delivered';
  coverImage: string;
  assignedDesigner: string;
  lastUpdated: string;
}

interface AlbumStudioDashboardProps {
  onSelectProject: (project: AlbumProjectItem) => void;
  onOpenAutoBuilder: () => void;
}

export const AlbumStudioDashboard: React.FC<AlbumStudioDashboardProps> = ({
  onSelectProject,
  onOpenAutoBuilder,
}) => {
  const [activeTab, setActiveTab] = useState<
    'all' | 'in_progress' | 'awaiting_approval' | 'approved' | 'ready_for_print' | 'delivered'
  >('all');
  const [searchQuery, setSearchQuery] = useState('');

  const projects: AlbumProjectItem[] = [
    {
      id: 'alb-1',
      clientName: 'Eleanor Vance & Julian',
      eventTitle: 'Royal Udaipur Destination Wedding',
      albumSize: '12x18 Inches',
      totalPages: 30,
      status: 'awaiting_approval',
      coverImage:
        'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80',
      assignedDesigner: 'Vikram Sethi (Lead Designer)',
      lastUpdated: '10 mins ago',
    },
    {
      id: 'alb-2',
      clientName: 'Sarah Sterling & Marcus',
      eventTitle: 'Beverly Hills Estate Gala Wedding',
      albumSize: '10x14 Inches',
      totalPages: 24,
      status: 'approved',
      coverImage:
        'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=600&q=80',
      assignedDesigner: 'Ananya Roy (Senior Editor)',
      lastUpdated: '2 hours ago',
    },
    {
      id: 'alb-3',
      clientName: 'Devon & Clara',
      eventTitle: 'Parisian Chateau Celebration',
      albumSize: '12x18 Inches',
      totalPages: 40,
      status: 'ready_for_print',
      coverImage:
        'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=600&q=80',
      assignedDesigner: 'Master Print Director',
      lastUpdated: 'Yesterday',
    },
    {
      id: 'alb-4',
      clientName: 'Karan & Natasha',
      eventTitle: 'Mumbai Palace Reception',
      albumSize: '12x12 Inches Square',
      totalPages: 20,
      status: 'in_progress',
      coverImage:
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
      assignedDesigner: 'Vikram Sethi (Lead Designer)',
      lastUpdated: '3 hours ago',
    },
  ];

  const filteredProjects = projects.filter((p) => {
    if (activeTab !== 'all' && p.status !== activeTab) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return p.clientName.toLowerCase().includes(q) || p.eventTitle.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <Card variant="glass" className="p-6 flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-border-subtle">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-gold-500/10 text-gold-500 border border-gold-500/20">
            <BookOpen size={22} />
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-text-primary">
              Professional Album Studio Dashboard
            </h2>
            <p className="text-xs text-text-secondary">
              Manage album projects, AI auto-builders, spread layouts, print orders & client
              approvals.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="secondary"
            size="sm"
            onClick={onOpenAutoBuilder}
            className="flex items-center gap-1 text-xs"
          >
            <SlidersHorizontal size={14} /> AI Auto Album Builder
          </Button>
          <Button variant="primary" size="sm" className="flex items-center gap-1 text-xs">
            <Plus size={14} /> Create New Album Project
          </Button>
        </div>
      </div>

      {/* Filter Tabs & Search */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex flex-wrap gap-2 text-xs">
          {(
            [
              'all',
              'in_progress',
              'awaiting_approval',
              'approved',
              'ready_for_print',
              'delivered',
            ] as const
          ).map((tab) => (
            <Button
              key={tab}
              variant={activeTab === tab ? 'primary' : 'secondary'}
              size="sm"
              onClick={() => setActiveTab(tab)}
              className="capitalize text-xs"
            >
              {tab.replace(/_/g, ' ')}
            </Button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search size={16} className="absolute left-3 top-2.5 text-text-tertiary" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search client, event, size..."
            className="w-full h-9 pl-9 pr-3 rounded-lg bg-surface-base border border-border-subtle text-xs text-text-primary font-mono focus:outline-none focus:ring-1 focus:ring-gold-500"
          />
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredProjects.map((project) => (
          <Card
            key={project.id}
            variant="glass"
            className="p-0 overflow-hidden group cursor-pointer border-border-subtle hover:border-gold-500/40 transition-all flex flex-col justify-between"
            onClick={() => onSelectProject(project)}
          >
            <div className="relative h-48 w-full overflow-hidden bg-surface-base">
              <img
                src={project.coverImage}
                alt={project.clientName}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <Badge
                variant={
                  project.status === 'approved'
                    ? 'success'
                    : project.status === 'ready_for_print'
                      ? 'gold'
                      : 'info'
                }
                className="absolute top-3 right-3 text-[9px] uppercase tracking-wider font-bold"
              >
                {project.status.replace(/_/g, ' ')}
              </Badge>
              <div className="absolute bottom-2 left-2 bg-canvas/90 backdrop-blur-md px-2.5 py-1 rounded-md text-[10px] font-mono text-gold-500 border border-gold-500/20">
                {project.albumSize} • {project.totalPages} Pages
              </div>
            </div>

            <div className="p-4 flex flex-col gap-2">
              <div>
                <h3 className="font-bold text-text-primary text-sm group-hover:text-gold-500 transition-colors line-clamp-1">
                  {project.clientName}
                </h3>
                <p className="text-[11px] text-text-secondary line-clamp-1">{project.eventTitle}</p>
              </div>

              <div className="flex flex-col gap-1 pt-2 border-t border-border-subtle text-[10px] text-text-tertiary">
                <span className="flex items-center gap-1">
                  <User size={10} className="text-gold-500" /> {project.assignedDesigner}
                </span>
                <span className="flex items-center gap-1 font-mono">
                  <Clock size={10} className="text-gold-500" /> Updated {project.lastUpdated}
                </span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </Card>
  );
};
