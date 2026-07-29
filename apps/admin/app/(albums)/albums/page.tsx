'use client';

import React, { useState } from 'react';
import { Card, Badge, Button, DataTable } from '@photomagic/ui';
import { createAlbumAction, approveAlbumAction } from '../../actions/album-actions';
import { BookOpen, Printer, CheckCircle2, FileText } from 'lucide-react';
import Link from 'next/link';

export default function StudioAlbumsPage() {
  const [albums, setAlbums] = useState([
    {
      id: 'alb-101',
      title: 'Royal Palace Wedding Heirloom',
      clientName: 'Eleanor Vance & Julian',
      coverMaterial: 'Italian Leather',
      pageCount: 30,
      status: 'client_review',
      createdAt: '2026-07-29',
    },
  ]);

  const columns = [
    {
      header: 'Album Title & Client',
      accessorKey: (row: (typeof albums)[0]) => (
        <div>
          <span className="font-bold text-text-primary block">{row.title}</span>
          <span className="text-xs text-text-tertiary">{row.clientName}</span>
        </div>
      ),
    },
    { header: 'Cover Material', accessorKey: 'coverMaterial' as const },
    {
      header: 'Spreads',
      accessorKey: (row: (typeof albums)[0]) => <span>{row.pageCount / 2} Spreads</span>,
    },
    {
      header: 'Status',
      accessorKey: (row: (typeof albums)[0]) => (
        <Badge variant={row.status === 'approved' ? 'success' : 'warning'}>
          {row.status === 'approved' ? 'Approved & Queued' : 'Client Review Pending'}
        </Badge>
      ),
    },
    {
      header: 'Actions',
      accessorKey: (row: (typeof albums)[0]) => (
        <Button variant="secondary" size="sm" className="flex items-center gap-1.5">
          <Printer size={14} />
          Dispatch to Print Lab
        </Button>
      ),
    },
  ];

  return (
    <main className="p-8 max-w-7xl mx-auto flex flex-col gap-8 pb-24">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <Badge variant="gold">Production Engine</Badge>
          <h1 className="text-3xl font-extrabold text-text-primary mt-1">
            Flush-Mount Album Production
          </h1>
          <p className="text-sm text-text-secondary">
            Manage layout approvals, spatial revision notes, and Italian print vendor orders.
          </p>
        </div>

        <Button variant="primary" className="flex items-center gap-2">
          <BookOpen size={16} />
          Create Album Project
        </Button>
      </div>

      <Card variant="glass" className="p-6">
        <h3 className="text-lg font-bold text-text-primary mb-4">Active Album Projects</h3>
        <DataTable columns={columns} data={albums} />
      </Card>
    </main>
  );
}
