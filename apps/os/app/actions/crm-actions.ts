'use server';

import {
  createSuccessResponse,
  createErrorResponse,
  createLeadSchema,
  updateLeadStatusSchema,
} from '@photomagic/config';
import { requirePermission } from '@photomagic/auth';

export interface LeadItem {
  id: string;
  workspaceId: string;
  clientName: string;
  email: string;
  phone?: string;
  eventType: string;
  eventDate?: string;
  estimatedBudget?: number;
  status: 'new' | 'contacted' | 'consultation_booked' | 'quote_sent' | 'won' | 'lost';
  tags: string[];
  notes?: string;
  createdAt: string;
}

export async function createLeadAction(payload: unknown) {
  try {
    const validated = createLeadSchema.parse(payload);

    const newLead: LeadItem = {
      id: 'lead_' + Date.now(),
      workspaceId: 'ws_photomagic_demo',
      clientName: validated.clientName,
      email: validated.email,
      phone: validated.phone,
      eventType: validated.eventType,
      eventDate: validated.eventDate,
      estimatedBudget: validated.estimatedBudget,
      status: 'new',
      tags: validated.tags || ['Website Inquiry'],
      notes: validated.notes,
      createdAt: new Date().toISOString(),
    };

    return createSuccessResponse(newLead);
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Failed to create lead';
    return createErrorResponse('INVALID_INPUT', msg);
  }
}

export async function updateLeadStatusAction(payload: unknown) {
  try {
    const validated = updateLeadStatusSchema.parse(payload);
    return createSuccessResponse({
      leadId: validated.leadId,
      status: validated.status,
      updatedAt: new Date().toISOString(),
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Failed to update lead status';
    return createErrorResponse('INVALID_INPUT', msg);
  }
}
