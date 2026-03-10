'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeftRight, Filter } from 'lucide-react';
import TransferCard from '@/components/cards/TransferCard';
import SectionHeader from '@/components/sections/SectionHeader';
import { TRANSFERS } from '@/lib/mock-data';
import { LEAGUE_OPTIONS } from '@/lib/utils';
import type { TransferStatus } from '@/types';

const STATUS_OPTIONS = [
  { value: 'all', label: 'Tous les statuts' },
  { value: 'rumeur', label: 'Rumeur' },
  { value: 'confirme', label: 'Confirmé' },
  { value: 'officiel', label: 'Officiel' },
  { value: 'abandonne', label: 'Abandonné' },
];

export default function TransfertsPage() {
  const [selectedLeague, setSelectedLeague] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const filtered = TRANSFERS.filter((t) => {
    const leagueMatch = selectedLeague === 'all' || t.league === selectedLeague;
    const statusMatch = selectedStatus === 'all' || t.status === selectedStatus;
    return leagueMatch && statusMatch;
  });

  return (
    <div className="min-h-screen space-y-8">
      {/* Page header */}
      <div>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 mb-2"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/15 border border-purple-500/20">
            <ArrowLeftRight className="h-5 w-5 text-purple-400" />
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight">Transferts</h1>
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-white/40 text-sm ml-[52px]"
        >
          Rumeurs, confirmations et officialisation du mercato
        </motion.p>
      </div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="rounded-2xl border border-white/8 bg-white/4 p-4"
      >
        <div className="flex items-center gap-2 mb-3">
          <Filter className="h-4 w-4 text-white/40" />
          <span className="text-sm font-medium text-white/60">Filtres</span>
        </div>
        <div className="flex flex-wrap gap-3">
          {/* League filter */}
          <div className="flex flex-wrap gap-2">
            {LEAGUE_OPTIONS.slice(0, 6).map((opt) => (
              <button
                key={opt.value}
                onClick={() => setSelectedLeague(opt.value)}
                className={`rounded-full px-3.5 py-1.5 text-xs font-semibold border transition-all duration-200 ${
                  selectedLeague === opt.value
                    ? 'bg-purple-500 border-purple-500 text-white'
                    : 'border-white/10 text-white/50 hover:border-white/20 hover:text-white/80'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
          <div className="w-px bg-white/10 hidden sm:block" />
          {/* Status filter */}
          <div className="flex flex-wrap gap-2">
            {STATUS_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setSelectedStatus(opt.value)}
                className={`rounded-full px-3.5 py-1.5 text-xs font-semibold border transition-all duration-200 ${
                  selectedStatus === opt.value
                    ? 'bg-emerald-500 border-emerald-500 text-white'
                    : 'border-white/10 text-white/50 hover:border-white/20 hover:text-white/80'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Results count */}
      <p className="text-sm text-white/30">
        {filtered.length} transfert{filtered.length !== 1 ? 's' : ''} trouvé{filtered.length !== 1 ? 's' : ''}
      </p>

      {/* Transfer cards grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((transfer, i) => (
            <TransferCard key={transfer.id} transfer={transfer} index={i} />
          ))}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center py-24 text-center"
        >
          <span className="text-5xl mb-4">🔄</span>
          <p className="text-lg font-semibold text-white/50">Aucun transfert trouvé</p>
          <p className="text-sm text-white/30 mt-2">Modifiez vos filtres pour voir plus de résultats</p>
        </motion.div>
      )}
    </div>
  );
}
