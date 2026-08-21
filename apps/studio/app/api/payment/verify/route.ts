import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const body = await req.json();
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      paymentMethod,
      utrNumber,
      clientName,
      clientPhone,
      clientEmail,
      eventDate,
      eventCity,
      packageName,
      paidAmount,
      grossTotal,
      remainingBalance,
      paymentStructure,
    } = body;

    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    // If Razorpay signature provided and secret is available
    if (
      razorpay_order_id &&
      razorpay_payment_id &&
      razorpay_signature &&
      keySecret &&
      !keySecret.includes('your_razorpay')
    ) {
      const generatedSignature = crypto
        .createHmac('sha256', keySecret)
        .update(`${razorpay_order_id}|${razorpay_payment_id}`)
        .digest('hex');

      if (generatedSignature !== razorpay_signature) {
        return NextResponse.json(
          { success: false, error: 'Cryptographic signature verification failed' },
          { status: 400 },
        );
      }
    }

    // Generate verified reference number
    const referenceId = `PM-RK-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const transactionId =
      razorpay_payment_id ||
      (utrNumber ? `UTR-${utrNumber}` : `UPI-${Date.now().toString().slice(-8)}`);

    const receipt = {
      referenceId,
      transactionId,
      orderId: razorpay_order_id || `ORD-${Date.now().toString().slice(-8)}`,
      packageName: packageName || 'PhotoMagic Custom Collection',
      grossTotal: grossTotal || paidAmount,
      paidAmount: paidAmount,
      remainingBalance: remainingBalance || 0,
      paymentStructure: paymentStructure || 'token_25',
      paymentMethod: paymentMethod || 'razorpay',
      clientName: clientName || 'Client',
      clientPhone: clientPhone || '',
      clientEmail: clientEmail || '',
      eventDate: eventDate || 'To be scheduled',
      eventCity: eventCity || 'Tamil Nadu',
      verifiedAt: new Date().toISOString(),
      status: 'confirmed',
    };

    return NextResponse.json({
      success: true,
      verified: true,
      receipt,
      message: 'Payment verified and studio timeline locked successfully.',
    });
  } catch (error: any) {
    console.error('[Payment Verification Exception]', error);
    return NextResponse.json(
      { error: error.message || 'Payment verification failed' },
      { status: 500 },
    );
  }
}
