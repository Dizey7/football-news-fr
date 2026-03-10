import type { Article } from '@/types';

const RSS_FEEDS = [
  {
    url: 'https://www.lequipe.fr/rss/actu_rss_Football.xml',
    name: "L'Équipe",
    sourceUrl: 'https://www.lequipe.fr',
    country: 'fr',
    category: 'actualites' as const,
  },
  {
    url: 'https://feeds.bbci.co.uk/sport/football/rss.xml',
    name: 'BBC Sport',
    sourceUrl: 'https://www.bbc.co.uk/sport/football',
    country: 'gb',
    category: 'actualites' as const,
  },
  {
    url: 'https://www.eurosport.fr/football/rss.xml',
    name: 'Eurosport',
    sourceUrl: 'https://www.eurosport.fr',
    country: 'fr',
    category: 'actualites' as const,
  },
];

const FALLBACK_IMAGES = [
  'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&h=450&fit=crop&q=80',
  'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800&h=450&fit=crop&q=80',
  'https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=800&h=450&fit=crop&q=80',
  'https://images.unsplash.com/photo-1553778263-73a83bab9b0c?w=800&h=450&fit=crop&q=80',
  'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&h=450&fit=crop&q=80',
  'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800&h=450&fit=crop&q=80',
  'https://images.unsplash.com/photo-1599058917765-a780eda07a3e?w=800&h=450&fit=crop&q=80',
  'https://images.unsplash.com/photo-1606925797300-0b35e9d1794e?w=800&h=450&fit=crop&q=80',
];

function extractText(raw: string): string {
  return raw
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
    .replace(/<[^>]+>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .trim();
}

function parseItems(xml: string, feed: typeof RSS_FEEDS[0], offset: number): Article[] {
  const items = xml.match(/<item[^>]*>[\s\S]*?<\/item>/g) ?? [];

  return items.slice(0, 10).flatMap((item, i) => {
    const titleRaw = item.match(/<title[^>]*>([\s\S]*?)<\/title>/)?.[1] ?? '';
    const linkRaw =
      item.match(/<link>(https?:\/\/[^\s<]+)<\/link>/)?.[1] ??
      item.match(/<link[^>]+href="([^"]+)"/)?.[1] ??
      '';
    const descRaw = item.match(/<description[^>]*>([\s\S]*?)<\/description>/)?.[1] ?? '';
    const pubDateRaw = item.match(/<pubDate[^>]*>([\s\S]*?)<\/pubDate>/)?.[1] ?? '';

    const imageRaw =
      item.match(/<media:content[^>]+url="([^"]+)"/)?.[1] ??
      item.match(/<media:thumbnail[^>]+url="([^"]+)"/)?.[1] ??
      item.match(/<enclosure[^>]+url="([^"]+\.(?:jpe?g|png|webp)[^"]*)"/)?.[1] ??
      null;

    const title = extractText(titleRaw);
    const link = linkRaw.trim();
    const summary = extractText(descRaw).slice(0, 300);
    const imageUrl = imageRaw ?? FALLBACK_IMAGES[(offset + i) % FALLBACK_IMAGES.length];

    let publishedAt = new Date().toISOString();
    if (pubDateRaw) {
      const parsed = new Date(pubDateRaw.trim());
      if (!isNaN(parsed.getTime())) publishedAt = parsed.toISOString();
    }

    if (!title || !link) return [];

    return [{
      id: `rss-${feed.country}-${offset + i}`,
      title,
      summary,
      imageUrl,
      originalUrl: link,
      source: {
        id: feed.name.toLowerCase().replace(/[^a-z]/g, ''),
        name: feed.name,
        logo: '',
        url: feed.sourceUrl,
        trusted: true,
        country: feed.country,
      },
      category: feed.category,
      tags: [],
      publishedAt,
      viewCount: Math.floor(Math.random() * 20000) + 2000,
      isBreaking: false,
      isTrending: (offset + i) < 4,
      isPopular: (offset + i) < 6,
    }];
  });
}

export async function fetchRealTimeNews(): Promise<Article[]> {
  const results = await Promise.allSettled(
    RSS_FEEDS.map(async (feed, fi) => {
      const res = await fetch(feed.url, {
        next: { revalidate: 180 },
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; lilKFootball/1.0; +https://lilkfootball.com)',
          Accept: 'application/rss+xml, application/xml, text/xml',
        },
        signal: AbortSignal.timeout(6000),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status} from ${feed.url}`);
      const xml = await res.text();
      return parseItems(xml, feed, fi * 10);
    })
  );

  const articles = results
    .filter((r): r is PromiseFulfilledResult<Article[]> => r.status === 'fulfilled')
    .flatMap((r) => r.value)
    .filter((a) => a.title.length > 5 && a.originalUrl.startsWith('http'))
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

  // Tag the freshest article as breaking
  if (articles.length > 0) articles[0].isBreaking = true;

  return articles;
}
