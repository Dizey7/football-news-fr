import { NextRequest, NextResponse } from 'next/server';
import { ARTICLES, TRANSFERS, MATCHES, CLUBS, PLAYERS } from '@/lib/mock-data';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get('q')?.toLowerCase().trim() ?? '';

  if (!q) {
    return NextResponse.json({ articles: [], transfers: [], matches: [], clubs: [], players: [] });
  }

  const articles = ARTICLES.filter(
    (a) =>
      a.title.toLowerCase().includes(q) ||
      a.summary.toLowerCase().includes(q) ||
      a.tags.some((t) => t.toLowerCase().includes(q))
  );

  const transfers = TRANSFERS.filter(
    (t) =>
      t.player.name.toLowerCase().includes(q) ||
      t.fromClub.name.toLowerCase().includes(q) ||
      (t.toClub?.name.toLowerCase().includes(q) ?? false)
  );

  const matches = MATCHES.filter(
    (m) =>
      m.homeTeam.name.toLowerCase().includes(q) ||
      m.awayTeam.name.toLowerCase().includes(q) ||
      m.league.toLowerCase().includes(q)
  );

  const clubs = CLUBS.filter(
    (c) =>
      c.name.toLowerCase().includes(q) ||
      c.league.toLowerCase().includes(q) ||
      c.country.toLowerCase().includes(q)
  );

  const players = PLAYERS.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.nationality.toLowerCase().includes(q) ||
      p.position.toLowerCase().includes(q)
  );

  return NextResponse.json({ articles, transfers, matches, clubs, players });
}
