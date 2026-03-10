'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Radio, Clock, CheckCircle } from 'lucide-react';
import MatchCard from '@/components/cards/MatchCard';
import SectionHeader from '@/components/sections/SectionHeader';
import { MATCHES } from '@/lib/mock-data';
import type { Match } from '@/types';

const TABS = [
  { value: 'all', label: 'Tous', icon: Radio },
  { value: 'en_direct', label: 'En Direct', icon: Radio },
  { value: 'a_venir', label: 'À Venir', icon: Clock },
  { value: 'termine', label: 'Terminés', icon: CheckCircle },
];

const LEAGUE_FILTERS = ['Toutes', 'Champions League', 'Premier League', 'La Liga', 'Serie A', 'Bundesliga', 'Ligue 1', 'CAN'];

export default function MatchsPage() {
  const [activeTab, setActiveTab] = useState('all');
  const [activeLeague, setActiveLeague] = useState('Toutes');

  const filtered = MATCHES.filter((m) => {
    const statusMatch = activeTab === 'all' || m.status === activeTab;
    const leagueMatch = activeLeague === 'Toutes' || m.league === activeLeague;
    return statusMatch && leagueMatch;
  });

  const liveMatches = MATCHES.filter((m) => m.status === 'en_direct');
  const upcomingMatches = MATCHES.filter((m) => m.status === 'a_venir');
  const finishedMatches = MATCHES.filter((m) => m.status === 'termine');

  return (
    <div className="min-h-screen space-y-8">
      {/* Page header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-3 mb-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-500/15 border border-red-500/20">
            <Radio className="h-5 w-5 text-red-400" />
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight">Matchs</h1>
        </div>
        <p className="text-white/40 text-sm ml-[52px]">Suivez tous les matchs en direct, résultats et prochaines rencontres</p>
      </motion.div>

      {/* Live count banner */}
      {liveMatches.length > 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex items-center gap-3 rounded-2xl border border-red-500/30 bg-red-500/8 px-5 py-4"
        >
          <motion.span
            animate={{ opacity: [1, 0.4, 1] }}
            transition={{ duration: 1.2, repeat: Infinity }}
            className="h-3 w-3 rounded-full bg-red-500"
          />
          <p className="text-sm font-semibold text-red-300">
            {liveMatches.length} match{liveMatches.length > 1 ? 's' : ''} en direct actuellement
          </p>
        </motion.div>
      )}

      {/* Status tabs */}
      <div className="flex gap-2 flex-wrap">
        {TABS.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold border transition-all duration-200 ${
              activeTab === tab.value
                ? 'bg-red-500 border-red-500 text-white'
                : 'border-white/10 text-white/50 hover:border-white/20 hover:text-white'
            }`}
          >
            {tab.value === 'en_direct' && activeTab === tab.value && (
              <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
            )}
            {tab.label}
          </button>
        ))}
      </div>

      {/* League filter chips */}
      <div className="flex gap-2 flex-wrap">
        {LEAGUE_FILTERS.map((league) => (
          <button
            key={league}
            onClick={() => setActiveLeague(league)}
            className={`rounded-full px-3 py-1.5 text-xs font-medium border transition-all duration-200 ${
              activeLeague === league
                ? 'bg-white/15 border-white/30 text-white'
                : 'border-white/8 text-white/35 hover:text-white/60 hover:border-white/15'
            }`}
          >
            {league}
          </button>
        ))}
      </div>

      {/* Matches grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((match, i) => (
            <MatchCard key={match.id} match={match} index={i} />
          ))}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center py-24 text-center"
        >
          <span className="text-5xl mb-4">⚽</span>
          <p className="text-lg font-semibold text-white/50">Aucun match trouvé</p>
          <p className="text-sm text-white/30 mt-2">Modifiez vos filtres</p>
        </motion.div>
      )}

      {/* Summary stats at bottom */}
      <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/8">
        {[
          { label: 'En direct', count: liveMatches.length, color: 'text-red-400', dot: true },
          { label: 'À venir', count: upcomingMatches.length, color: 'text-blue-400', dot: false },
          { label: 'Terminés', count: finishedMatches.length, color: 'text-white/40', dot: false },
        ].map((stat) => (
          <div key={stat.label} className="text-center">
            <p className={`text-2xl font-black ${stat.color}`}>{stat.count}</p>
            <p className="text-xs text-white/30 mt-1">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
