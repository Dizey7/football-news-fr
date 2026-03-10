import { NextRequest, NextResponse } from 'next/server';
import { MATCHES } from '@/lib/mock-data';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get('status');
  const league = searchParams.get('league');

  let matches = [...MATCHES];

  if (status) matches = matches.filter((m) => m.status === status);
  if (league) matches = matches.filter((m) => m.league === league);

  return NextResponse.json({ matches, total: matches.length });
}
