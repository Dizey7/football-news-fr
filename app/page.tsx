import { Newspaper, Flame, ArrowLeftRight, TrendingUp, Radio } from 'lucide-react';
import ArticleCard from '@/components/cards/ArticleCard';
import TransferCard from '@/components/cards/TransferCard';
import MatchCard from '@/components/cards/MatchCard';
import HeroBreaking from '@/components/sections/HeroBreaking';
import SectionHeader from '@/components/sections/SectionHeader';
import LiveScoreBar from '@/components/sections/LiveScoreBar';
import TrendingTicker from '@/components/sections/TrendingTicker';
import { TRANSFERS, MATCHES } from '@/lib/mock-data';
import { fetchRealTimeNews } from '@/lib/rss';

export const revalidate = 180;

export default async function HomePage() {
  const articles = await fetchRealTimeNews();

  const breakingArticle = articles.find((a) => a.isBreaking) ?? articles[0];
  const latestArticles = articles.slice(0, 6);
  const popularArticles = articles.filter((a) => a.isPopular).slice(0, 4);
  const trendingArticles = articles.filter((a) => a.isTrending).slice(0, 4);
  const recentTransfers = TRANSFERS.slice(0, 3);

  return (
    <div className="min-h-screen space-y-10">
      <LiveScoreBar matches={MATCHES} />

      {breakingArticle && <HeroBreaking article={breakingArticle} />}

      <TrendingTicker />

      <section>
        <SectionHeader
          title="Dernières actualités"
          subtitle="Les infos les plus récentes du football"
          icon={Newspaper}
          viewAllHref="/actualites"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {latestArticles.map((article, i) => (
            <ArticleCard key={article.id} article={article} index={i} />
          ))}
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <section>
          <SectionHeader
            title="Actualités populaires"
            icon={Flame}
            viewAllHref="/actualites"
            accentColor="text-orange-400"
          />
          <div className="space-y-3">
            {popularArticles.map((article, i) => (
              <ArticleCard key={article.id} article={article} variant="compact" index={i} />
            ))}
          </div>
        </section>

        <section>
          <SectionHeader
            title="Tendances du moment"
            icon={TrendingUp}
            viewAllHref="/actualites"
            accentColor="text-purple-400"
          />
          <div className="space-y-3">
            {trendingArticles.map((article, i) => (
              <ArticleCard key={article.id} article={article} variant="compact" index={i} />
            ))}
          </div>
        </section>
      </div>

      <section>
        <SectionHeader
          title="Transferts récents"
          subtitle="Rumeurs et mouvements du mercato"
          icon={ArrowLeftRight}
          viewAllHref="/transferts"
          accentColor="text-purple-400"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {recentTransfers.map((transfer, i) => (
            <TransferCard key={transfer.id} transfer={transfer} index={i} />
          ))}
        </div>
      </section>

      <section>
        <SectionHeader
          title="Matchs"
          subtitle="En direct, résultats et prochains matchs"
          icon={Radio}
          viewAllHref="/matchs"
          accentColor="text-red-400"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {MATCHES.slice(0, 6).map((match, i) => (
            <MatchCard key={match.id} match={match} index={i} />
          ))}
        </div>
      </section>
    </div>
  );
}
