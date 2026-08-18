import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { supabaseAdmin } from '@photomagic/auth';

export async function POST(req: NextRequest): Promise<NextResponse> {
  const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;
  const signature = req.headers.get('x-razorpay-signature');

  try {
    const rawBody = await req.text();

    // 1. Verify HMAC SHA-256 Cryptographic Webhook Signature if secret configured
    if (webhookSecret && signature) {
      const expectedSignature = crypto
        .createHmac('sha256', webhookSecret)
        .update(rawBody)
        .digest('hex');

      if (expectedSignature !== signature) {
        console.error('[Razorpay Webhook] Invalid signature verification failed.');
        return NextResponse.json({ error: 'Invalid HMAC signature' }, { status: 400 });
      }
    }

    const payload = JSON.parse(rawBody);
    const event = payload.event;
    const paymentEntity = payload.payload?.payment?.entity;
    const orderEntity = payload.payload?.order?.entity;

    console.log(`[Razorpay Webhook Received] Event: ${event}, Payment ID: ${paymentEntity?.id}`);

    // 2. Event Handler: Payment Captured / Order Paid
    if (event === 'payment.captured' || event === 'order.paid') {
      const paymentId = paymentEntity?.id;
      const orderId = paymentEntity?.order_id || orderEntity?.id;
      const amountInr = (paymentEntity?.amount || 0) / 100;
      const clientEmail = paymentEntity?.email;
      const clientPhone = paymentEntity?.contact;
      const notes = paymentEntity?.notes || {};

      const invoiceId = notes.invoice_id || notes.invoiceId;
      const bookingId = notes.booking_id || notes.bookingId;

      // Update Supabase Database Invoice Record
      if (invoiceId) {
        try {
          await supabaseAdmin
            .from('invoices')
            .update({
              status: 'paid',
              payment_id: paymentId,
              amount_paid: amountInr,
              paid_at: new Date().toISOString(),
            })
            .eq('id', invoiceId);
        } catch (dbErr) {
          console.warn('[Razorpay Webhook] Could not update invoice in DB:', dbErr);
        }
      }

      // Update Booking Milestone Status to Confirmed
      if (bookingId) {
        try {
          await supabaseAdmin
            .from('bookings')
            .update({
              status: 'confirmed',
              advance_paid: amountInr,
              updated_at: new Date().toISOString(),
            })
            .eq('id', bookingId);
        } catch (dbErr) {
          console.warn('[Razorpay Webhook] Could not update booking in DB:', dbErr);
        }
      }

      return NextResponse.json({
        success: true,
        reconciled: true,
        event,
        paymentId,
        amount: amountInr,
      });
    }

    // 3. Event Handler: Payment Failed
    if (event === 'payment.failed') {
      const paymentId = paymentEntity?.id;
      const errorReason = paymentEntity?.error_description || 'Payment declined by bank';

      console.warn(`[Razorpay Webhook] Payment failed (${paymentId}): ${errorReason}`);

      return NextResponse.json({
        success: true,
        status: 'recorded_failure',
        paymentId,
        errorReason,
      });
    }

    return NextResponse.json({ success: true, message: `Event ${event} acknowledged.` });
  } catch (err: any) {
    console.error('[Razorpay Webhook Exception]', err);
    return NextResponse.json(
      { error: err.message || 'Webhook processing failed' },
      { status: 500 },
    );
  }
}
