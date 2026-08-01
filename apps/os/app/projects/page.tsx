'use client';

import React, { useState } from 'react';
import { Card, Badge, Button, Input } from '@photomagic/ui';
import { ProjectKanbanBoard, ProjectWorkflowItem } from '../../components/ProjectKanbanBoard';
import { Plus, LayoutGrid, List, Search, Filter } from 'lucide-react';

export default function ProjectsPage() {
  const [viewMode, setViewMode] = useState<'kanban' | 'list'>('kanban');
  const [searchQuery, setSearchQuery] = useState('');

  const [projects, setProjects] = useState<ProjectWorkflowItem[]>([
    {
      id: 'prj-101',
      title: 'Udaipur Royal Wedding',
      clientName: 'Eleanor Vance & Julian',
      packageName: 'Royal Heirloom Collection',
      eventDate: '2026-10-24',
      location: 'Udaipur, India',
      paymentStatus: 'advance_paid',
      status: 'planning',
    },
    {
      id: 'prj-102',
      title: 'Paris Fashion Editorial',
      clientName: 'Sarah Montgomery',
      packageName: 'Haute Couture Package',
      eventDate: '2026-11-12',
      location: 'Paris, France',
      paymentStatus: 'paid',
      status: 'album_design',
    },
  ]);

  const handleStatusChange = (projectId: string, newStatus: ProjectWorkflowItem['status']) => {
    setProjects((prev) => prev.map((p) => (p.id === projectId ? { ...p, status: newStatus } : p)));
  };

  return (
    <main className="p-8 max-w-[1600px] mx-auto flex flex-col gap-8 pb-24">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <Badge variant="gold">Production Lifecycle</Badge>
          <h1 className="text-3xl font-extrabold text-text-primary mt-1">
            15-Step Project Management Engine
          </h1>
          <p className="text-sm text-text-secondary">
            Track projects from lead consultation through 4K cinema editing, album design, and print
            delivery.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center bg-surface-elevated p-1 rounded-lg border border-border-subtle">
            <button
              onClick={() => setViewMode('kanban')}
              className={`p-1.5 rounded-md text-xs font-semibold transition-colors ${
                viewMode === 'kanban'
                  ? 'bg-gold-500 text-canvas'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              <LayoutGrid size={16} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-md text-xs font-semibold transition-colors ${
                viewMode === 'list'
                  ? 'bg-gold-500 text-canvas'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              <List size={16} />
            </button>
          </div>

          <Button variant="primary" className="flex items-center gap-2">
            <Plus size={16} />
            Create Project
          </Button>
        </div>
      </div>

      {/* Filter Bar */}
      <Card
        variant="glass"
        className="p-4 flex flex-col sm:flex-row items-center justify-between gap-4"
      >
        <div className="relative w-full sm:w-80">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary"
          />
          <input
            type="text"
            placeholder="Search projects by title or client..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-9 pl-9 pr-3 rounded-lg bg-surface-base text-xs text-text-primary placeholder:text-text-tertiary border border-border-subtle focus:outline-none focus:ring-1 focus:ring-gold-500"
          />
        </div>

        <div className="flex items-center gap-3">
          <Badge variant="gold">{projects.length} Active Projects</Badge>
        </div>
      </Card>

      {/* Main View Mode */}
      {viewMode === 'kanban' ? (
        <ProjectKanbanBoard projects={projects} onStatusChange={handleStatusChange} />
      ) : (
        <Card variant="glass" className="p-6">
          <div className="p-8 text-center text-sm text-text-secondary">
            List View Active — Managing {projects.length} active studio projects.
          </div>
        </Card>
      )}
    </main>
  );
}
