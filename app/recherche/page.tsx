'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import ArticleCard from '@/components/cards/ArticleCard';
import TransferCard from '@/components/cards/TransferCard';
import MatchCard from '@/components/cards/MatchCard';
import { ARTICLES, TRANSFERS, MATCHES, CLUBS, PLAYERS } from '@/lib/mock-data';

type SearchTab = 'tout' | 'articles' | 'transferts' | 'matchs' | 'clubs' | 'joueurs';

const SEARCH_TABS: { value: SearchTab; label: string }[] = [
  { value: 'tout', label: 'Tout' },
  { value: 'articles', label: 'Articles' },
  { value: 'transferts', label: 'Transferts' },
  { value: 'matchs', label: 'Matchs' },
  { value: 'clubs', label: 'Clubs' },
  { value: 'joueurs', label: 'Joueurs' },
];

export default function RecherchePage() {
  const [query, setQuery] = useState('');
  const [activeTab, setActiveTab] = useState<SearchTab>('tout');

  const q = query.toLowerCase().trim();

  const results = useMemo(() => {
    if (!q) return { articles: [], transfers: [], matches: [], clubs: [], players: [] };

    const articles = ARTICLES.filter(
      (a) =>
        a.title.toLowerCase().includes(q) ||
        a.summary.toLowerCase().includes(q) ||
        a.tags.some((t) => t.toLowerCase().includes(q)) ||
        a.source.name.toLowerCase().includes(q)
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
        p.position.toLowerCase().includes(q) ||
        p.currentClub.name.toLowerCase().includes(q)
    );

    return { articles, transfers, matches, clubs, players };
  }, [q]);

  const totalCount =
    results.articles.length +
    results.transfers.length +
    results.matches.length +
    results.clubs.length +
    results.players.length;

  return (
    <div className="min-h-screen space-y-8">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-3 mb-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/15 border border-cyan-500/20">
            <Search className="h-5 w-5 text-cyan-400" />
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight">Recherche</h1>
        </div>
        <p className="text-white/40 text-sm ml-[52px]">
          Recherchez des joueurs, clubs, transferts, articles et ligues
        </p>
      </motion.div>

      {/* Search bar */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="relative"
      >
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Rechercher un joueur, club, actualité..."
          className="h-14 pl-11 pr-10 text-base rounded-2xl border-white/12 bg-white/6 focus-visible:ring-cyan-500/50"
          autoFocus
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/70 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </motion.div>

      <AnimatePresence mode="wait">
        {!q ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center py-24 text-center"
          >
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-xl font-semibold text-white/40">Commencez à taper pour chercher</p>
            <p className="text-sm text-white/25 mt-2">
              Articles, joueurs, clubs, transferts, ligues...
            </p>
            <div className="mt-8 flex flex-wrap gap-2 justify-center max-w-sm">
              {['Mbappé', 'Algérie', 'Real Madrid', 'Champions League', 'Transferts'].map((s) => (
                <button
                  key={s}
                  onClick={() => setQuery(s)}
                  className="rounded-full border border-white/10 bg-white/4 px-4 py-2 text-sm text-white/50 hover:text-white hover:bg-white/8 hover:border-white/20 transition-all"
                >
                  {s}
                </button>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="results"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            {/* Results summary */}
            <div className="flex items-center justify-between flex-wrap gap-3">
              <p className="text-sm text-white/40">
                <span className="text-white font-semibold">{totalCount}</span> résultat{totalCount !== 1 ? 's' : ''} pour &quot;{query}&quot;
              </p>
              <div className="flex gap-2 flex-wrap">
                {SEARCH_TABS.map((tab) => (
                  <button
                    key={tab.value}
                    onClick={() => setActiveTab(tab.value)}
                    className={`rounded-full px-3.5 py-1.5 text-xs font-semibold border transition-all ${
                      activeTab === tab.value
                        ? 'bg-cyan-500 border-cyan-500 text-white'
                        : 'border-white/10 text-white/40 hover:text-white/70'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Articles */}
            {(activeTab === 'tout' || activeTab === 'articles') && results.articles.length > 0 && (
              <section>
                <h2 className="text-base font-bold text-white/60 mb-4 uppercase tracking-wider text-xs">
                  Articles ({results.articles.length})
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {results.articles.map((article, i) => (
                    <ArticleCard key={article.id} article={article} index={i} />
                  ))}
                </div>
              </section>
            )}

            {/* Transfers */}
            {(activeTab === 'tout' || activeTab === 'transferts') && results.transfers.length > 0 && (
              <section>
                <h2 className="text-xs font-bold text-white/60 mb-4 uppercase tracking-wider">
                  Transferts ({results.transfers.length})
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {results.transfers.map((t, i) => (
                    <TransferCard key={t.id} transfer={t} index={i} />
                  ))}
                </div>
              </section>
            )}

            {/* Matches */}
            {(activeTab === 'tout' || activeTab === 'matchs') && results.matches.length > 0 && (
              <section>
                <h2 className="text-xs font-bold text-white/60 mb-4 uppercase tracking-wider">
                  Matchs ({results.matches.length})
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {results.matches.map((m, i) => (
                    <MatchCard key={m.id} match={m} index={i} />
                  ))}
                </div>
              </section>
            )}

            {/* Clubs */}
            {(activeTab === 'tout' || activeTab === 'clubs') && results.clubs.length > 0 && (
              <section>
                <h2 className="text-xs font-bold text-white/60 mb-4 uppercase tracking-wider">
                  Clubs ({results.clubs.length})
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                  {results.clubs.map((club, i) => (
                    <motion.div
                      key={club.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.05 }}
                      className="rounded-xl border border-white/8 bg-white/4 p-4 text-center hover:border-white/15 transition-all"
                    >
                      <span className="text-3xl">{club.logo}</span>
                      <p className="text-sm font-semibold text-white mt-2">{club.name}</p>
                      <p className="text-xs text-white/40 mt-0.5">{club.league}</p>
                      <p className="text-[10px] text-white/25">{club.country}</p>
                    </motion.div>
                  ))}
                </div>
              </section>
            )}

            {/* Players */}
            {(activeTab === 'tout' || activeTab === 'joueurs') && results.players.length > 0 && (
              <section>
                <h2 className="text-xs font-bold text-white/60 mb-4 uppercase tracking-wider">
                  Joueurs ({results.players.length})
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {results.players.map((player, i) => (
                    <motion.div
                      key={player.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="flex items-center gap-3 rounded-xl border border-white/8 bg-white/4 p-4 hover:border-white/15 transition-all"
                    >
                      <div className="h-12 w-12 rounded-full bg-white/10 flex items-center justify-center text-xl flex-shrink-0">
                        ⚽
                      </div>
                      <div>
                        <p className="text-sm font-bold text-white">{player.name}</p>
                        <p className="text-xs text-white/40">{player.position}</p>
                        <p className="text-xs text-emerald-400/70 mt-0.5">{player.currentClub.name}</p>
                      </div>
                      {player.isAlgerian && (
                        <span className="ml-auto text-lg" title="Joueur algérien">🇩🇿</span>
                      )}
                    </motion.div>
                  ))}
                </div>
              </section>
            )}

            {/* No results */}
            {totalCount === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center py-16 text-center"
              >
                <span className="text-5xl mb-4">😕</span>
                <p className="text-lg font-semibold text-white/50">Aucun résultat trouvé</p>
                <p className="text-sm text-white/30 mt-2">Essayez un autre terme de recherche</p>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
