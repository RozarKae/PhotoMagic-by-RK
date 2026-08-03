'use client';

import React, { useState } from 'react';
import {
  Button,
  Card,
  Input,
  Select,
  Checkbox,
  Switch,
  Badge,
  Tabs,
  Alert,
  DataTable,
  Modal,
  Drawer,
  EmptyState,
  Skeleton,
  Avatar,
  Container,
  Grid,
  Stack,
  FadeIn,
} from '@photomagic/ui';

export default function DesignSystemShowcasePage() {
  const [activeTab, setActiveTab] = useState('primitives');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [checkboxVal, setCheckboxVal] = useState(true);
  const [switchVal, setSwitchVal] = useState(false);
  const [selectVal, setSelectVal] = useState('wedding');

  const sampleColumns = [
    { header: 'ID', accessorKey: 'id' as const },
    { header: 'Client Name', accessorKey: 'name' as const },
    { header: 'Event Date', accessorKey: 'date' as const },
    {
      header: 'Status',
      accessorKey: (row: { status: string }) => <Badge variant="gold">{row.status}</Badge>,
    },
  ];

  const sampleData = [
    { id: '101', name: 'Eleanor Vance & Julian', date: '2026-10-24', status: 'Proofing Active' },
    { id: '102', name: 'Sarah Montgomery', date: '2026-11-12', status: 'Deposit Paid' },
  ];

  return (
    <Container className="py-12">
      <FadeIn>
        <Stack gap={8}>
          <div>
            <Badge variant="gold">Phase 1.3 Design System</Badge>
            <h1 className="text-4xl font-extrabold text-text-primary mt-2">
              PhotoMagic Enterprise UI Showcase
            </h1>
            <p className="text-sm text-text-secondary mt-1">
              Single Source of Truth for obsidian dark luxury tokens, glass components, and
              accessible UI primitives.
            </p>
          </div>

          <Tabs
            tabs={[
              { id: 'primitives', label: 'Buttons & Inputs' },
              { id: 'selection', label: 'Selection & Tabs' },
              { id: 'data', label: 'Data Tables & Cards' },
              { id: 'overlays', label: 'Modals & Drawers' },
            ]}
            activeTab={activeTab}
            onChange={setActiveTab}
          />

          {/* Tab 1: Buttons & Inputs */}
          {activeTab === 'primitives' && (
            <Grid cols={2}>
              <Card variant="glass" className="flex flex-col gap-4">
                <h3 className="text-lg font-bold text-text-primary">Button Variants & Sizes</h3>
                <div className="flex flex-wrap gap-3">
                  <Button variant="primary">Primary Gold</Button>
                  <Button variant="secondary">Secondary Glass</Button>
                  <Button variant="ghost">Ghost Button</Button>
                  <Button variant="danger">Danger Action</Button>
                </div>
                <div className="flex flex-wrap items-center gap-3 mt-2">
                  <Button variant="primary" size="sm">
                    Small
                  </Button>
                  <Button variant="primary" size="md">
                    Medium
                  </Button>
                  <Button variant="primary" size="lg">
                    Large
                  </Button>
                </div>
              </Card>

              <Card variant="glass" className="flex flex-col gap-4">
                <h3 className="text-lg font-bold text-text-primary">Input & Select Controls</h3>
                <Input label="Client Name" placeholder="Enter full name" />
                <Select
                  label="Event Category"
                  value={selectVal}
                  onChange={setSelectVal}
                  options={[
                    { label: 'Royal Wedding', value: 'wedding' },
                    { label: 'Studio Portrait', value: 'portrait' },
                    { label: 'Commercial Shoot', value: 'commercial' },
                  ]}
                />
              </Card>
            </Grid>
          )}

          {/* Tab 2: Selection & Tabs */}
          {activeTab === 'selection' && (
            <Grid cols={2}>
              <Card variant="glass" className="flex flex-col gap-4">
                <h3 className="text-lg font-bold text-text-primary">Selection Controls</h3>
                <Checkbox
                  label="Select photo for album proofing"
                  checked={checkboxVal}
                  onChange={setCheckboxVal}
                />
                <Switch
                  label="Enable high-res download zip generation"
                  checked={switchVal}
                  onChange={setSwitchVal}
                />
                <div className="flex gap-2 mt-2">
                  <Badge variant="gold">Gold Badge</Badge>
                  <Badge variant="success">Success</Badge>
                  <Badge variant="warning">Warning</Badge>
                  <Badge variant="error">Error</Badge>
                </div>
              </Card>

              <Card variant="glass" className="flex flex-col gap-4">
                <h3 className="text-lg font-bold text-text-primary">Avatars & Skeletons</h3>
                <div className="flex items-center gap-4">
                  <Avatar name="Eleanor Vance" size="sm" />
                  <Avatar name="Eleanor Vance" size="md" />
                  <Avatar name="Eleanor Vance" size="lg" />
                </div>
                <div className="flex flex-col gap-2 mt-2">
                  <Skeleton height="16px" width="70%" />
                  <Skeleton height="12px" width="90%" />
                </div>
              </Card>
            </Grid>
          )}

          {/* Tab 3: Data Tables & Cards */}
          {activeTab === 'data' && (
            <Stack gap={6}>
              <Alert variant="info" title="Production System Active">
                Enterprise design tokens and accessible WCAG 2.2 primitives are active across
                monorepo.
              </Alert>

              <Card variant="glass">
                <h3 className="text-lg font-bold text-text-primary mb-4">Enterprise Data Table</h3>
                <DataTable columns={sampleColumns} data={sampleData} />
              </Card>
            </Stack>
          )}

          {/* Tab 4: Modals & Drawers */}
          {activeTab === 'overlays' && (
            <Card variant="glass" className="flex flex-col gap-4 items-start">
              <h3 className="text-lg font-bold text-text-primary">Overlays & Floating Dialogs</h3>
              <div className="flex gap-4">
                <Button variant="primary" onClick={() => setIsModalOpen(true)}>
                  Open Glass Modal
                </Button>
                <Button variant="secondary" onClick={() => setIsDrawerOpen(true)}>
                  Open Slide Drawer
                </Button>
              </div>

              <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Luxury Glass Modal"
              >
                <p className="text-sm text-text-secondary mb-4">
                  This dialog utilizes dark backdrop blur filters, custom focus rings, and keyboard
                  escape traps.
                </p>
                <Button variant="primary" onClick={() => setIsModalOpen(false)}>
                  Close Dialog
                </Button>
              </Modal>

              <Drawer
                isOpen={isDrawerOpen}
                onClose={() => setIsDrawerOpen(false)}
                title="Event Detail Drawer"
              >
                <p className="text-sm text-text-secondary mb-4">
                  Slide-over drawer panel for displaying shoot briefs, shot lists, and venue
                  logistics map metadata.
                </p>
                <Button variant="secondary" onClick={() => setIsDrawerOpen(false)}>
                  Dismiss Drawer
                </Button>
              </Drawer>
            </Card>
          )}
        </Stack>
      </FadeIn>
    </Container>
  );
}
