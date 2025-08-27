import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import User from '@/models/User';

export async function POST(req) {
  const { email } = await req.json();

  if (!email) {
    return NextResponse.json({ error: 'Email required' }, { status: 400 });
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI);

    await User.findOneAndUpdate(
      { email },
      { $set: { isAdmin: true } },
      { upsert: true, new: true }
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('DB error:', error);
    return NextResponse.json({ error: 'Failed to update' }, { status: 500 });
  }
}
