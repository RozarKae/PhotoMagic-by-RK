'use server';

import { createSuccessResponse, createErrorResponse, sendMessageSchema } from '@photomagic/config';

export interface PortalChatMessage {
  id: string;
  senderName: string;
  senderRole: 'client' | 'concierge';
  message: string;
  timestamp: string;
}

export async function sendClientMessageAction(payload: unknown) {
  try {
    const validated = sendMessageSchema.parse(payload);

    const newMessage: PortalChatMessage = {
      id: 'msg_' + Date.now(),
      senderName: 'Eleanor Vance',
      senderRole: 'client',
      message: validated.message,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    return createSuccessResponse(newMessage);
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Failed to send message';
    return createErrorResponse('INVALID_INPUT', msg);
  }
}
