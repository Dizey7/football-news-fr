import { NextRequest, NextResponse } from 'next/server';
import { ARTICLES } from '@/lib/mock-data';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const league = searchParams.get('league');
  const trending = searchParams.get('trending');
  const popular = searchParams.get('popular');
  const breaking = searchParams.get('breaking');
  const limit = parseInt(searchParams.get('limit') ?? '20', 10);
  const offset = parseInt(searchParams.get('offset') ?? '0', 10);

  let articles = [...ARTICLES];

  if (category) articles = articles.filter((a) => a.category === category);
  if (league) articles = articles.filter((a) => a.league === league);
  if (trending === 'true') articles = articles.filter((a) => a.isTrending);
  if (popular === 'true') articles = articles.filter((a) => a.isPopular);
  if (breaking === 'true') articles = articles.filter((a) => a.isBreaking);

  const total = articles.length;
  const paginated = articles.slice(offset, offset + limit);

  return NextResponse.json({
    articles: paginated,
    total,
    limit,
    offset,
  });
}
