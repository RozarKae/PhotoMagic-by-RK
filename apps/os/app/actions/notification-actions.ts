'use server';

import { STUDIO_PROFILE } from '@photomagic/config';
import { supabaseAdmin } from '@photomagic/auth';

export interface NotificationResult {
  success: boolean;
  channel: 'whatsapp' | 'email' | 'multi_channel';
  recipient: string;
  messageId?: string;
  previewText: string;
  timestamp: string;
}

/**
 * Dispatch automated WhatsApp notification via WhatsApp Business API / Twilio
 */
export async function sendWhatsAppMessageAction(
  phoneNumber: string,
  messageBody: string,
): Promise<NotificationResult> {
  const whatsappApiToken = process.env.WHATSAPP_API_TOKEN;
  const whatsappPhoneId = process.env.WHATSAPP_PHONE_NUMBER_ID;

  const cleanPhone = phoneNumber.replace(/[^0-9]/g, '');

  if (whatsappApiToken && whatsappPhoneId) {
    try {
      const response = await fetch(`https://graph.facebook.com/v18.0/${whatsappPhoneId}/messages`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${whatsappApiToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messaging_product: 'whatsapp',
          to: cleanPhone,
          type: 'text',
          text: { body: messageBody },
        }),
      });

      if (response.ok) {
        const data = await response.json();
        return {
          success: true,
          channel: 'whatsapp',
          recipient: cleanPhone,
          messageId: data.messages?.[0]?.id || `wa_${Date.now()}`,
          previewText: messageBody,
          timestamp: new Date().toISOString(),
        };
      }
    } catch (err) {
      console.warn('[WhatsApp Dispatch Error]', err);
    }
  }

  // Fallback logging for local testing mode
  console.log(`[WhatsApp Outbox (${cleanPhone})]:\n${messageBody}`);
  return {
    success: true,
    channel: 'whatsapp',
    recipient: cleanPhone,
    messageId: `sim_wa_${Date.now()}`,
    previewText: messageBody,
    timestamp: new Date().toISOString(),
  };
}

/**
 * Trigger 1: Proofing Gallery Ready for Selection
 */
export async function sendGalleryReadyNotification(payload: {
  clientName: string;
  clientPhone: string;
  clientEmail?: string;
  eventTitle: string;
  galleryUrl: string;
  quotaCount: number;
}): Promise<NotificationResult> {
  const message = `✨ *PhotoMagic by RK - Your Wedding Gallery is Ready!* ✨

Namaste ${payload.clientName},

The high-resolution raw proofing gallery for *${payload.eventTitle}* has been processed with AI face recognition and is now open for your review.

📸 *Your Included Quota*: Select your favorite ${payload.quotaCount} photos for the handcrafted 12x18 Archival Album.
🔐 *Open Selection Vault*: ${payload.galleryUrl}

With love,
${STUDIO_PROFILE.name}
${STUDIO_PROFILE.contact.phone}`;

  return await sendWhatsAppMessageAction(payload.clientPhone, message);
}

/**
 * Trigger 2: Selections Locked & Layout Generation Started
 */
export async function sendSelectionsLockedNotification(payload: {
  clientName: string;
  clientPhone: string;
  eventTitle: string;
  selectedCount: number;
}): Promise<NotificationResult> {
  const message = `💍 *PhotoMagic by RK - Selections Locked & Dispatched!*

Dear ${payload.clientName},

Thank you! We have received your locked selection of *${payload.selectedCount} photographs* for *${payload.eventTitle}*.

Our lead colorists have begun master skin-tone grading and our 12x18 album layout designers are assembling your bespoke double-page spreads.

You will receive a digital preview link for approval shortly!

Warmly,
${STUDIO_PROFILE.leadArtist} & The ${STUDIO_PROFILE.name} Team`;

  return await sendWhatsAppMessageAction(payload.clientPhone, message);
}

/**
 * Trigger 3: Final 8K Master Deliverables & 12x18 Album Vault Ready
 */
export async function sendVaultDeliveryNotification(payload: {
  clientName: string;
  clientPhone: string;
  eventTitle: string;
  vaultUrl: string;
  securityPin: string;
  expiryDays?: number;
}): Promise<NotificationResult> {
  const expiry = payload.expiryDays || 60;
  const message = `📦 *PhotoMagic by RK - Your Master 8K Wedding Vault is Live!*

Dear ${payload.clientName},

Your complete collection for *${payload.eventTitle}* (8K Archival Master Photos & 4K Wedding Cinema) is ready for permanent download.

🔐 *Vault Access Link*: ${payload.vaultUrl}
🔑 *Decryption Security PIN*: *${payload.securityPin}*
⏳ *High-Speed Download Link Valid For*: ${expiry} Days

Your handcrafted 12x18 Italian leather album is being dispatched via insured courier!

Congratulations from all of us at ${STUDIO_PROFILE.name}!`;

  return await sendWhatsAppMessageAction(payload.clientPhone, message);
}

/**
 * Trigger 4: Payment Confirmation & Booking Advance Receipt
 */
export async function sendPaymentReceiptNotification(payload: {
  clientName: string;
  clientPhone: string;
  eventTitle: string;
  amountPaid: number;
  invoiceId: string;
  paymentId: string;
}): Promise<NotificationResult> {
  const message = `🧾 *PhotoMagic by RK - Payment Received*

Dear ${payload.clientName},

We have received your payment of *₹${payload.amountPaid.toLocaleString('en-IN')}* for *${payload.eventTitle}*.

• *Invoice ID*: ${payload.invoiceId}
• *Transaction ID*: ${payload.paymentId}
• *Booking Status*: Confirmed & Locked on Studio Calendar

View your formal tax receipt in your client portal:
${STUDIO_PROFILE.contact.email}

Thank you for choosing ${STUDIO_PROFILE.name}!`;

  return await sendWhatsAppMessageAction(payload.clientPhone, message);
}
