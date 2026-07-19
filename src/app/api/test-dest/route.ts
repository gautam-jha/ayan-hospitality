import { NextResponse } from 'next/server';
import { getAllDestinations } from '@/lib/repository';

export async function GET() {
  const dests = await getAllDestinations();
  return NextResponse.json({
    total: dests.length,
    indian: dests.filter(d => !d.isInternational).length,
    intl: dests.filter(d => d.isInternational).length,
    dests
  });
}
