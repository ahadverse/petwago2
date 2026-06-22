import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@petbackend/db';
import User from '@petbackend/models/User';

export async function POST(request: NextRequest) {
  try {
    const { email } = (await request.json()) as { email?: string };

    if (typeof email !== 'string' || !/\S+@\S+\.\S+/.test(email)) {
      return NextResponse.json({ error: 'A valid email is required' }, { status: 400 });
    }

    const normalizedEmail = email.toLowerCase().trim();

    await connectDB();

    const user = await User.findOneAndUpdate(
      { email: normalizedEmail },
      { $setOnInsert: { name: 'anonymous', email: normalizedEmail } },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    return NextResponse.json({ userId: user._id.toString(), email: user.email });
  } catch (err) {
    console.error('Error creating guest user:', err);
    return NextResponse.json({ error: 'Failed to continue as guest' }, { status: 500 });
  }
}
