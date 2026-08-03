'use client';

import React, { useState } from 'react';
import { Card, Badge, Button, DataTable } from '@photomagic/ui';
import { BookingCalendarView } from '../../../components/BookingCalendarView';
import { BookingItem } from '../../actions/booking-actions';
import { Calendar, Plus, CheckCircle2, AlertCircle } from 'lucide-react';
import Link from 'next/link';

export default function BookingsPage() {
  const [bookings, setBookings] = useState<BookingItem[]>([
    {
      id: 'bkg-1',
      workspaceId: 'ws_photomagic_demo',
      clientName: 'Eleanor Vance & Julian',
      email: 'eleanor@example.com',
      packageName: 'Royal Heirloom Collection',
      totalAmount: 8500,
      depositAmount: 2500,
      depositPaid: true,
      contractSigned: true,
      eventDate: '2026-10-24',
      location: 'Udaipur, India',
      status: 'confirmed',
      projectId: 'prj-101',
      createdAt: '2026-07-29T11:00:00Z',
    },
    {
      id: 'bkg-2',
      workspaceId: 'ws_photomagic_demo',
      clientName: 'Sarah Montgomery',
      email: 'sarah@editorial.com',
      packageName: 'Imperial Legacy Collection',
      totalAmount: 15000,
      depositAmount: 5000,
      depositPaid: false,
      contractSigned: false,
      eventDate: '2026-10-24', // Conflict date
      location: 'Paris, France',
      status: 'contract_pending',
      createdAt: '2026-07-28T16:00:00Z',
    },
  ]);

  const columns = [
    {
      header: 'Client & Event',
      accessorKey: (row: BookingItem) => (
        <div>
          <Link
            href={`/bookings/${row.id}`}
            className="font-bold text-text-primary hover:text-gold-500"
          >
            {row.clientName}
          </Link>
          <div className="text-xs text-text-tertiary">{row.packageName}</div>
        </div>
      ),
    },
    { header: 'Event Date', accessorKey: 'eventDate' as const },
    {
      header: 'Investment ($)',
      accessorKey: (row: BookingItem) => (
        <span className="font-semibold text-gold-500">${row.totalAmount.toLocaleString()}</span>
      ),
    },
    {
      header: 'Deposit Status',
      accessorKey: (row: BookingItem) => (
        <Badge variant={row.depositPaid ? 'success' : 'warning'}>
          {row.depositPaid ? 'Deposit Paid' : 'Pending Deposit'}
        </Badge>
      ),
    },
    {
      header: 'Contract',
      accessorKey: (row: BookingItem) => (
        <Badge variant={row.contractSigned ? 'success' : 'info'}>
          {row.contractSigned ? 'Signed' : 'Pending Signature'}
        </Badge>
      ),
    },
    {
      header: 'Production Project',
      accessorKey: (row: BookingItem) =>
        row.projectId ? (
          <Link
            href={`/projects/${row.projectId}`}
            className="text-xs text-gold-500 font-semibold hover:underline"
          >
            View Project prj-101 →
          </Link>
        ) : (
          <span className="text-xs text-text-tertiary">Not Initialized</span>
        ),
    },
  ];

  return (
    <main className="p-8 max-w-7xl mx-auto flex flex-col gap-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <Badge variant="gold">Workflow Engine</Badge>
          <h1 className="text-3xl font-extrabold text-text-primary mt-1">
            Booking & Project Engine
          </h1>
          <p className="text-sm text-text-secondary">
            Convert leads, track deposit contracts, and manage production calendars.
          </p>
        </div>

        <Button variant="primary" className="flex items-center gap-2">
          <Plus size={16} />
          Create Direct Booking
        </Button>
      </div>

      {/* Calendar & Conflict Overview */}
      <BookingCalendarView bookings={bookings} />

      {/* Bookings Table */}
      <Card variant="glass" className="p-6">
        <h3 className="text-lg font-bold text-text-primary mb-4">Confirmed & Pending Bookings</h3>
        <DataTable columns={columns} data={bookings} />
      </Card>
    </main>
  );
}
