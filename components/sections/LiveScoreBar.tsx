'use client';

import { motion } from 'framer-motion';
import { Radio } from 'lucide-react';
import type { Match } from '@/types';

interface LiveScoreBarProps {
  matches: Match[];
}

export default function LiveScoreBar({ matches }: LiveScoreBarProps) {
  const liveMatches = matches.filter((m) => m.status === 'en_direct');

  if (liveMatches.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full overflow-hidden rounded-2xl border border-red-500/20 bg-red-500/5 backdrop-blur-sm"
    >
      <div className="flex items-center gap-4 px-4 py-3">
        <div className="flex items-center gap-2 flex-shrink-0">
          <motion.span
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.2, repeat: Infinity }}
            className="flex items-center gap-1.5 text-xs font-bold text-red-400 uppercase tracking-wider"
          >
            <Radio className="h-3.5 w-3.5" />
            En Direct
          </motion.span>
        </div>
        <div className="w-px h-4 bg-white/10 flex-shrink-0" />
        <div className="flex items-center gap-6 overflow-x-auto scrollbar-none">
          {liveMatches.map((match) => (
            <div key={match.id} className="flex items-center gap-3 flex-shrink-0">
              <span className="text-sm font-semibold text-white/80">{match.homeTeam.name}</span>
              <div className="flex items-center gap-1">
                <span className="text-sm font-black text-white tabular-nums">{match.homeScore}</span>
                <span className="text-xs text-red-400 font-bold">{match.minute}&apos;</span>
                <span className="text-sm font-black text-white tabular-nums">{match.awayScore}</span>
              </div>
              <span className="text-sm font-semibold text-white/80">{match.awayTeam.name}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
