'use client';

import React, { useState } from 'react';
import { Card, Badge, Button, Input } from '@photomagic/ui';
import { ClientListTable, ClientRecord } from '../../components/ClientListTable';
import { UserPlus, Search, Mail, Phone, Tag } from 'lucide-react';

export default function ClientsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClient, setSelectedClient] = useState<ClientRecord | null>(null);

  const [clients, setClients] = useState<ClientRecord[]>([
    {
      id: 'cli-101',
      fullName: 'Eleanor Vance',
      email: 'eleanor@vance-estates.com',
      phone: '+1 (555) 234-5678',
      familyMembers: ['Julian Vance (Groom)', 'Clara Vance (Mother)'],
      notes: 'Prefers warm film-like tones; planning 3-day royal palace celebration.',
      tags: ['VIP Client', 'Royal Wedding', 'High Budget'],
      totalBookings: 2,
    },
    {
      id: 'cli-102',
      fullName: 'Sarah Montgomery',
      email: 'sarah.m@vogue-editorial.com',
      phone: '+33 1 42 68 55 00',
      familyMembers: ['Antoine Montgomery (Brother)'],
      notes: 'Haute couture fashion model for Paris session.',
      tags: ['Editorial', 'International'],
      totalBookings: 1,
    },
  ]);

  const filteredClients = clients.filter(
    (c) =>
      c.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.email.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <main className="p-8 max-w-7xl mx-auto flex flex-col gap-8 pb-24">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <Badge variant="gold">Customer Directory</Badge>
          <h1 className="text-3xl font-extrabold text-text-primary mt-1">
            Client Management Engine
          </h1>
          <p className="text-sm text-text-secondary">
            Manage client contacts, family participants, custom tags, and communication history.
          </p>
        </div>

        <Button variant="primary" className="flex items-center gap-2">
          <UserPlus size={16} />
          Add New Client Profile
        </Button>
      </div>

      {/* Search & Stats Bar */}
      <Card
        variant="glass"
        className="p-4 flex flex-col sm:flex-row justify-between items-center gap-4"
      >
        <div className="relative w-full sm:w-80">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary"
          />
          <input
            type="text"
            placeholder="Search by name, email or tag..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-9 pl-9 pr-3 rounded-lg bg-surface-base text-xs text-text-primary placeholder:text-text-tertiary border border-border-subtle focus:outline-none focus:ring-1 focus:ring-gold-500"
          />
        </div>

        <Badge variant="gold">{clients.length} Registered Clients</Badge>
      </Card>

      {/* Main Table View */}
      <Card variant="glass" className="p-6">
        <ClientListTable
          clients={filteredClients}
          onSelectClient={(client) => setSelectedClient(client)}
        />
      </Card>

      {/* Selected Client Profile Drawer / Modal */}
      {selectedClient && (
        <Card variant="glass" className="p-6 flex flex-col gap-4 border-gold-500/40">
          <div className="flex justify-between items-center pb-2 border-b border-border-subtle">
            <h3 className="text-lg font-bold text-text-primary">
              Profile: {selectedClient.fullName}
            </h3>
            <Button variant="ghost" size="sm" onClick={() => setSelectedClient(null)}>
              Close
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="flex flex-col gap-1">
              <span className="font-semibold text-text-tertiary">Contact Info</span>
              <span className="text-text-primary">{selectedClient.email}</span>
              <span className="text-text-primary">{selectedClient.phone}</span>
            </div>

            <div className="flex flex-col gap-1">
              <span className="font-semibold text-text-tertiary">Family / Event Participants</span>
              <span className="text-text-primary">{selectedClient.familyMembers.join(', ')}</span>
            </div>
          </div>

          <div className="flex flex-col gap-1 text-xs">
            <span className="font-semibold text-text-tertiary">Studio Notes</span>
            <p className="text-text-secondary bg-surface-base p-3 rounded-lg border border-border-subtle">
              {selectedClient.notes}
            </p>
          </div>
        </Card>
      )}
    </main>
  );
}
