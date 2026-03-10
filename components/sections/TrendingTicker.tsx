'use client';

import { motion } from 'framer-motion';
import { TrendingUp } from 'lucide-react';

const TRENDING_TOPICS = [
  'Mbappé prolonge au Real',
  'CAN 2025 : Algérie vs Guinée',
  'PSG en demi de C1',
  'Arsenal leader de PL',
  'Transfert Atal officialisé',
  'Bundesliga : Leverkusen champion',
];

export default function TrendingTicker() {
  return (
    <div className="overflow-hidden rounded-xl border border-white/8 bg-white/3">
      <div className="flex items-center">
        <div className="flex-shrink-0 flex items-center gap-2 px-4 py-2.5 border-r border-white/8 bg-emerald-500/10">
          <TrendingUp className="h-3.5 w-3.5 text-emerald-400" />
          <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Tendances</span>
        </div>
        <div className="overflow-hidden flex-1 py-2.5 px-4">
          <motion.div
            animate={{ x: ['0%', '-50%'] }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            className="flex items-center gap-8 whitespace-nowrap"
          >
            {[...TRENDING_TOPICS, ...TRENDING_TOPICS].map((topic, i) => (
              <span key={i} className="text-xs text-white/50 font-medium cursor-default hover:text-white/80 transition-colors">
                {topic}
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
