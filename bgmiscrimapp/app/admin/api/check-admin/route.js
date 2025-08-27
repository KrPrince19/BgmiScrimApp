import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import User from '@/models/User';

export async function GET(req) {
  const email = req.nextUrl.searchParams.get('email');

  if (!email) {
    return NextResponse.json({ isAdmin: false });
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI);

    const user = await User.findOne({ email });

    return NextResponse.json({ isAdmin: user?.isAdmin || false });
  } catch (error) {
    console.error('DB error:', error);
    return NextResponse.json({ isAdmin: false });
  }
}
