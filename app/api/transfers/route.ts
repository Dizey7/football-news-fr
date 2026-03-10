import { NextRequest, NextResponse } from 'next/server';
import { TRANSFERS } from '@/lib/mock-data';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const league = searchParams.get('league');
  const status = searchParams.get('status');
  const limit = parseInt(searchParams.get('limit') ?? '20', 10);
  const offset = parseInt(searchParams.get('offset') ?? '0', 10);

  let transfers = [...TRANSFERS];

  if (league) transfers = transfers.filter((t) => t.league === league);
  if (status) transfers = transfers.filter((t) => t.status === status);

  const total = transfers.length;
  const paginated = transfers.slice(offset, offset + limit);

  return NextResponse.json({ transfers: paginated, total, limit, offset });
}
