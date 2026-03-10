'use client';

import { motion } from 'framer-motion';
import { MapPin, Radio } from 'lucide-react';
import type { Match } from '@/types';
import { getStatusLabel, getStatusColor, formatDateFr } from '@/lib/utils';

interface MatchCardProps {
  match: Match;
  index?: number;
}

export default function MatchCard({ match, index = 0 }: MatchCardProps) {
  const isLive = match.status === 'en_direct';

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.07 }}
      className={`group rounded-2xl border p-5 transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 ${
        isLive
          ? 'border-red-500/30 bg-red-500/5 hover:border-red-500/50'
          : 'border-white/8 bg-white/4 hover:border-white/15'
      }`}
    >
      {/* League + Status */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-medium text-white/40">{match.league}</span>
        <div className="flex items-center gap-2">
          {isLive && (
            <span className="flex items-center gap-1 text-xs font-bold text-red-400">
              <Radio className="h-3 w-3 animate-pulse" />
              {match.minute}&apos;
            </span>
          )}
          <span className={`rounded-full border px-2.5 py-0.5 text-xs font-semibold ${getStatusColor(match.status)}`}>
            {getStatusLabel(match.status)}
          </span>
        </div>
      </div>

      {/* Score row */}
      <div className="flex items-center justify-between gap-4">
        {/* Home team */}
        <div className="flex-1 text-right">
          <p className="text-sm font-bold text-white line-clamp-1">{match.homeTeam.name}</p>
          <span className="text-3xl">{match.homeTeam.logo}</span>
        </div>

        {/* Score / VS */}
        <div className="flex-shrink-0 text-center min-w-[64px]">
          {match.homeScore !== undefined && match.awayScore !== undefined ? (
            <div className={`rounded-xl px-3 py-2 ${isLive ? 'bg-red-500/15 border border-red-500/30' : 'bg-white/8 border border-white/10'}`}>
              <span className={`text-2xl font-black tabular-nums ${isLive ? 'text-red-300' : 'text-white'}`}>
                {match.homeScore} - {match.awayScore}
              </span>
            </div>
          ) : (
            <div className="rounded-xl bg-white/6 border border-white/10 px-3 py-2">
              <span className="text-sm font-semibold text-white/40">VS</span>
            </div>
          )}
        </div>

        {/* Away team */}
        <div className="flex-1 text-left">
          <span className="text-3xl">{match.awayTeam.logo}</span>
          <p className="text-sm font-bold text-white line-clamp-1">{match.awayTeam.name}</p>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-4 pt-3 border-t border-white/6 flex items-center justify-between">
        {match.stadium ? (
          <span className="flex items-center gap-1 text-xs text-white/30">
            <MapPin className="h-3 w-3" />
            {match.stadium}
          </span>
        ) : (
          <span />
        )}
        {match.status === 'a_venir' && (
          <span className="text-xs text-white/40">{formatDateFr(match.kickoffTime)}</span>
        )}
      </div>
    </motion.div>
  );
}
