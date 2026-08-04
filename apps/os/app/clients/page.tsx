'use client';

import React, { useState } from 'react';
import { Card, Badge, Button, Input } from '@photomagic/ui';
import { ClientListTable, ClientRecord } from '../../components/ClientListTable';
import { UserPlus, Search, Mail, Phone, Tag, CheckCircle2, X } from 'lucide-react';
import { registerAction } from '@photomagic/auth';

export default function ClientsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClient, setSelectedClient] = useState<ClientRecord | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  // New Client Form State
  const [newName, setNewName] = useState('Test Client');
  const [newEmail, setNewEmail] = useState('testclient@photomagic.studio');
  const [newPhone, setNewPhone] = useState('9876543210');
  const [newAddress, setNewAddress] = useState('Madurai');

  // Credential Strategy Selection (Option A vs Option B)
  const [credentialMethod, setCredentialMethod] = useState<'invite_email' | 'manual_password'>(
    'manual_password',
  );
  const [newPassword, setNewPassword] = useState('Temp@12345');

  const [clients, setClients] = useState<ClientRecord[]>([
    {
      id: 'cli-101',
      fullName: 'Test Client',
      email: 'testclient@photomagic.studio',
      phone: '9876543210',
      familyMembers: ['Madurai Event Family'],
      notes: 'Active client registered for fine art wedding proofing.',
      tags: ['Active', 'Madurai Client'],
      totalBookings: 1,
    },
    {
      id: 'cli-102',
      fullName: 'Eleanor Vance',
      email: 'eleanor@vance-estates.com',
      phone: '+1 (555) 234-5678',
      familyMembers: ['Julian Vance (Groom)'],
      notes: 'Royal palace celebration.',
      tags: ['VIP Client', 'Royal Wedding'],
      totalBookings: 2,
    },
  ]);

  const handleCreateClient = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatusMessage(null);

    const isInvite = credentialMethod === 'invite_email';

    const res = await registerAction({
      email: newEmail,
      password: isInvite ? undefined : newPassword,
      fullName: newName,
      phone: newPhone,
      address: newAddress,
      role: 'client',
      sendInviteEmail: isInvite,
    });

    if (!res.success) {
      setStatusMessage(`❌ Error: ${res.error.message}`);
      setIsSubmitting(false);
      return;
    }

    const authUserId = res.data.userId;

    const newRecord: ClientRecord = {
      id: `cli-${Date.now()}`,
      fullName: newName,
      email: newEmail,
      phone: newPhone,
      familyMembers: [newAddress],
      notes: `Auth User ID: ${authUserId}. ${
        isInvite
          ? `Supabase password setup email dispatched to ${newEmail}.`
          : `Manual password generated (${newPassword}). Change required on first login.`
      }`,
      tags: ['Active', isInvite ? 'Invite Sent' : 'Password Issued'],
      totalBookings: 1,
    };

    setClients((prev) => [newRecord, ...prev]);
    setIsSubmitting(false);
    setStatusMessage(
      isInvite
        ? `✅ Supabase Auth User Created (ID: ${authUserId}). Password setup email sent to ${newEmail}!`
        : `✅ Supabase Auth User Created (ID: ${authUserId}) with initial password: ${newPassword}`,
    );

    setTimeout(() => {
      setIsAddModalOpen(false);
      setStatusMessage(null);
    }, 2000);
  };

  const filteredClients = clients.filter(
    (c) =>
      c.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.email.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <main className="p-8 max-w-7xl mx-auto flex flex-col gap-8 pb-24 relative">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <Badge variant="gold">Cast Roster Directory</Badge>
          <h1 className="text-3xl font-extrabold text-ivory font-hero tracking-wide mt-1">
            Cast Roster & Client Engine
          </h1>
          <p className="text-sm text-silver font-mono">
            Provision new client accounts, manage production tags, and handle client portal access.
          </p>
        </div>

        <Button
          variant="primary"
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 font-bold"
        >
          <UserPlus size={16} />
          Add Client
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

      {/* Provision New Client Modal Overlay */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <Card
            variant="glass"
            className="max-w-lg w-full p-8 border-gold-500/40 flex flex-col gap-6 shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <span className="font-mono text-[10px] text-gold-400 uppercase tracking-widest block font-bold">
                  STEP 1: CLIENT PROVISIONING
                </span>
                <h3 className="font-hero text-2xl text-ivory">Register Real Client</h3>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-2 text-silver hover:text-white rounded-lg hover:bg-white/10"
              >
                <X size={18} />
              </button>
            </div>

            {statusMessage && (
              <div className="p-3 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono">
                {statusMessage}
              </div>
            )}

            <form onSubmit={handleCreateClient} className="flex flex-col gap-4">
              <div>
                <label className="block text-xs font-mono text-silver mb-1">Full Client Name</label>
                <input
                  type="text"
                  required
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full bg-[#141414] border border-white/15 px-3 py-2 text-sm text-ivory rounded-lg focus:outline-none focus:border-gold-500"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-silver mb-1">
                  Client Access Email
                </label>
                <input
                  type="email"
                  required
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  className="w-full bg-[#141414] border border-white/15 px-3 py-2 text-sm text-ivory rounded-lg focus:outline-none focus:border-gold-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-silver mb-1">Phone Number</label>
                  <input
                    type="text"
                    required
                    value={newPhone}
                    onChange={(e) => setNewPhone(e.target.value)}
                    className="w-full bg-[#141414] border border-white/15 px-3 py-2 text-sm text-ivory rounded-lg focus:outline-none focus:border-gold-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-silver mb-1">
                    Address / Location
                  </label>
                  <input
                    type="text"
                    required
                    value={newAddress}
                    onChange={(e) => setNewAddress(e.target.value)}
                    className="w-full bg-[#141414] border border-white/15 px-3 py-2 text-sm text-ivory rounded-lg focus:outline-none focus:border-gold-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-silver mb-2">
                  Credential Generation Strategy (STEP 2)
                </label>
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <button
                    type="button"
                    onClick={() => setCredentialMethod('invite_email')}
                    className={`p-3 rounded-lg border text-left transition-all ${
                      credentialMethod === 'invite_email'
                        ? 'bg-gold-500/10 border-gold-500 text-gold-300 font-bold'
                        : 'bg-[#141414] border-white/10 text-silver hover:border-white/20'
                    }`}
                  >
                    <span className="block text-xs font-semibold">Option A (Preferred)</span>
                    <span className="text-[10px] text-silver/70 font-mono block mt-0.5">
                      Send Supabase password setup email
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setCredentialMethod('manual_password')}
                    className={`p-3 rounded-lg border text-left transition-all ${
                      credentialMethod === 'manual_password'
                        ? 'bg-gold-500/10 border-gold-500 text-gold-300 font-bold'
                        : 'bg-[#141414] border-white/10 text-silver hover:border-white/20'
                    }`}
                  >
                    <span className="block text-xs font-semibold">Option B</span>
                    <span className="text-[10px] text-silver/70 font-mono block mt-0.5">
                      Set manual initial password
                    </span>
                  </button>
                </div>

                {credentialMethod === 'manual_password' ? (
                  <div>
                    <label className="block text-[11px] font-mono text-gold-400 mb-1">
                      Initial Temporary Password (e.g. Temp@12345)
                    </label>
                    <input
                      type="text"
                      required
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Temp@12345"
                      className="w-full bg-[#141414] border border-gold-500/40 px-3 py-2 text-sm font-mono text-gold-300 rounded-lg focus:outline-none focus:border-gold-500"
                    />
                    <span className="text-[10px] text-silver/60 font-mono mt-1 block">
                      Client will be required to update password upon first portal login.
                    </span>
                  </div>
                ) : (
                  <div className="p-3 rounded-lg bg-gold-500/10 border border-gold-500/30 text-gold-300 text-xs font-mono">
                    📧 A secure password creation link will be dispatched to {newEmail} via Supabase
                    Auth.
                  </div>
                )}
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                <Button type="button" variant="ghost" onClick={() => setIsAddModalOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" variant="primary" disabled={isSubmitting}>
                  {isSubmitting ? 'Provisioning...' : 'Provision Client Account'}
                </Button>
              </div>
            </form>
          </Card>
        </div>
      )}
    </main>
  );
}
