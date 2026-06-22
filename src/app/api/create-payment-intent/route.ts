import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@petbackend/stripe';
import { connectDB } from '@petbackend/db';
import { auth } from '@/auth';
import { Order } from '@petbackend/models/Order';
import { Transaction } from '@petbackend/models/Transaction';
import User from '@petbackend/models/User';

interface IncomingItem {
  productId: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
}

interface IncomingShipping {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

function generateOrderNumber(): string {
  const time = Date.now().toString(36).toUpperCase();
  const rand = Math.random().toString(36).substring(2, 5).toUpperCase();
  return `MMP-${time}-${rand}`;
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth();

    const { amount, subtotal, shippingCost, items, shipping, guestUserId } = (await request.json()) as {
      amount?: number;
      subtotal?: number;
      shippingCost?: number;
      items?: IncomingItem[];
      shipping?: IncomingShipping;
      guestUserId?: string;
    };

    let userId = session?.user?.id;
    if (!userId) {
      if (!guestUserId) {
        return NextResponse.json({ error: 'You must be signed in to checkout' }, { status: 401 });
      }
      await connectDB();
      const guestUser = await User.findById(guestUserId);
      if (!guestUser) {
        return NextResponse.json({ error: 'You must be signed in to checkout' }, { status: 401 });
      }
      userId = guestUser._id.toString();
    }

    if (typeof amount !== 'number' || !Number.isFinite(amount) || amount <= 0) {
      return NextResponse.json({ error: 'Invalid amount' }, { status: 400 });
    }
    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: 'Cart is empty' }, { status: 400 });
    }
    if (!shipping) {
      return NextResponse.json({ error: 'Shipping information is required' }, { status: 400 });
    }

    const amountInCents = Math.round(amount * 100);
    if (amountInCents < 50) {
      return NextResponse.json({ error: 'Amount too small' }, { status: 400 });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInCents,
      currency: 'usd',
      automatic_payment_methods: { enabled: true },
    });

    await connectDB();

    const order = await Order.create({
      orderNumber: generateOrderNumber(),
      customerName: `${shipping.firstName} ${shipping.lastName}`.trim(),
      customerEmail: shipping.email,
      shippingAddress: {
        address: shipping.address,
        city: shipping.city,
        state: shipping.state,
        zip: shipping.zip,
        country: shipping.country,
      },
      items: items.map((i) => ({
        productId: i.productId,
        productName: i.name,
        productImage: i.image,
        unitPrice: i.price,
        quantity: i.quantity,
      })),
      subtotal: subtotal ?? amount,
      shipping: shippingCost ?? 0,
      total: amount,
      user: userId,
      paymentIntentId: paymentIntent.id,
      paymentStatus: 'pending',
    });

    await Transaction.create({
      order: order._id,
      orderNumber: order.orderNumber,
      amount,
      method: 'card',
      status: 'pending',
      paymentIntentId: paymentIntent.id,
      currency: 'usd',
      paymentMethodTypes: [],
    });

    return NextResponse.json({ clientSecret: paymentIntent.client_secret, orderNumber: order.orderNumber });
  } catch (err) {
    console.error('Error creating PaymentIntent:', err);
    return NextResponse.json({ error: 'Failed to create payment intent' }, { status: 500 });
  }
}
