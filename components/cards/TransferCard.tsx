'use client';

import { motion } from 'framer-motion';
import { ArrowRight, ExternalLink } from 'lucide-react';
import type { Transfer } from '@/types';
import { getStatusLabel, getStatusColor, timeAgoFr } from '@/lib/utils';

interface TransferCardProps {
  transfer: Transfer;
  index?: number;
}

export default function TransferCard({ transfer, index = 0 }: TransferCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.07 }}
      className="group rounded-2xl border border-white/8 bg-white/4 hover:border-white/15 p-5 transition-all duration-300 hover:shadow-xl hover:shadow-black/20 hover:-translate-y-0.5"
    >
      {/* Header: Status + League */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className={`rounded-full border px-2.5 py-1 text-xs font-semibold ${getStatusColor(transfer.status)}`}>
            {getStatusLabel(transfer.status)}
          </span>
          <span className="text-xs text-white/30">{transfer.league}</span>
        </div>
        <span className="text-xs text-white/30">{timeAgoFr(transfer.rumourDate)}</span>
      </div>

      {/* Player info */}
      <div className="mb-4">
        <h3 className="text-lg font-bold text-white group-hover:text-emerald-300 transition-colors">
          {transfer.player.name}
        </h3>
        <p className="text-xs text-white/40 mt-0.5">
          {transfer.player.position} · {transfer.player.nationality}
          {transfer.player.marketValue && (
            <span className="ml-2 text-emerald-400/60">{transfer.player.marketValue}</span>
          )}
        </p>
      </div>

      {/* Club transfer arrow */}
      <div className="flex items-center gap-3 mb-4">
        <div className="flex-1 rounded-xl border border-white/8 bg-white/5 p-3 text-center">
          <span className="text-2xl">{transfer.fromClub.logo}</span>
          <p className="text-xs font-medium text-white/70 mt-1.5 line-clamp-1">{transfer.fromClub.name}</p>
          <p className="text-[10px] text-white/30 mt-0.5">{transfer.fromClub.league}</p>
        </div>

        <div className="flex flex-col items-center gap-1">
          <ArrowRight className="h-5 w-5 text-emerald-400" />
          {transfer.fee && (
            <span className="text-[10px] font-bold text-emerald-400/80 whitespace-nowrap">{transfer.fee}</span>
          )}
        </div>

        <div className="flex-1 rounded-xl border border-white/8 bg-white/5 p-3 text-center">
          {transfer.toClub ? (
            <>
              <span className="text-2xl">{transfer.toClub.logo}</span>
              <p className="text-xs font-medium text-white/70 mt-1.5 line-clamp-1">{transfer.toClub.name}</p>
              <p className="text-[10px] text-white/30 mt-0.5">{transfer.toClub.league}</p>
            </>
          ) : (
            <>
              <span className="text-2xl text-white/20">?</span>
              <p className="text-xs font-medium text-white/30 mt-1.5">Inconnu</p>
              <p className="text-[10px] text-white/20 mt-0.5">—</p>
            </>
          )}
        </div>
      </div>

      {/* Contract info */}
      {transfer.contractDuration && (
        <div className="mb-3 flex items-center gap-1.5 text-xs text-white/40">
          <span>Contrat :</span>
          <span className="text-white/60 font-medium">{transfer.contractDuration}</span>
        </div>
      )}

      {/* Footer: source + article link */}
      <div className="flex items-center justify-between pt-3 border-t border-white/6">
        <span className="text-xs font-semibold text-emerald-400/80">{transfer.source.name}</span>
        <a
          href={transfer.article.originalUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-xs text-white/40 hover:text-emerald-400 transition-colors"
        >
          Source <ExternalLink className="h-3 w-3" />
        </a>
      </div>
    </motion.div>
  );
}
