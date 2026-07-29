'use server';

import {
  createSuccessResponse,
  createErrorResponse,
  createBookingSchema,
  convertLeadToBookingSchema,
} from '@photomagic/config';

export interface BookingItem {
  id: string;
  workspaceId: string;
  leadId?: string;
  clientName: string;
  email: string;
  packageName: string;
  totalAmount: number;
  depositAmount: number;
  depositPaid: boolean;
  contractSigned: boolean;
  eventDate: string;
  location?: string;
  status: 'draft' | 'quotation_sent' | 'contract_pending' | 'confirmed' | 'cancelled';
  projectId?: string;
  createdAt: string;
}

export async function createBookingAction(payload: unknown) {
  try {
    const validated = createBookingSchema.parse(payload);

    const bookingId = 'bkg_' + Date.now();
    const projectId = 'prj_' + Date.now();

    const newBooking: BookingItem = {
      id: bookingId,
      workspaceId: 'ws_photomagic_demo',
      leadId: validated.leadId,
      clientName: validated.clientName,
      email: validated.email,
      packageName: validated.packageName,
      totalAmount: validated.totalAmount,
      depositAmount: validated.depositAmount,
      depositPaid: false,
      contractSigned: false,
      eventDate: validated.eventDate,
      location: validated.location,
      status: 'confirmed',
      projectId: projectId,
      createdAt: new Date().toISOString(),
    };

    return createSuccessResponse({
      booking: newBooking,
      projectId: projectId,
      message: 'Booking confirmed and production project auto-initialized.',
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Failed to create booking';
    return createErrorResponse('INVALID_INPUT', msg);
  }
}

export async function convertLeadToBookingAction(payload: unknown) {
  try {
    const validated = convertLeadToBookingSchema.parse(payload);

    const bookingId = 'bkg_' + Date.now();
    const projectId = 'prj_' + Date.now();

    return createSuccessResponse({
      bookingId,
      projectId,
      leadId: validated.leadId,
      status: 'confirmed',
      message: 'Lead successfully converted to Booking & Production Project!',
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Failed to convert lead';
    return createErrorResponse('INVALID_INPUT', msg);
  }
}
