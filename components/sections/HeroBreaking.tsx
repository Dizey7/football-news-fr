'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { ExternalLink, Clock, Zap, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Article } from '@/types';
import { timeAgoFr } from '@/lib/utils';

interface HeroBreakingProps {
  article: Article;
}

export default function HeroBreaking({ article }: HeroBreakingProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative overflow-hidden rounded-3xl border border-white/10 group cursor-pointer"
    >
      <div className="relative h-[480px] md:h-[520px]">
        <Image
          src={article.imageUrl}
          alt={article.title}
          fill
          priority
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 100vw"
        />
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0f1e]/95 via-[#0a0f1e]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1e]/70 via-transparent to-transparent" />

        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-10">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
              {article.isBreaking && (
                <motion.span
                  animate={{ opacity: [1, 0.5, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="flex items-center gap-1.5 rounded-full bg-red-500 px-3 py-1.5 text-xs font-bold text-white uppercase tracking-widest"
                >
                  <Zap className="h-3 w-3" /> Breaking
                </motion.span>
              )}
              {article.isTrending && (
                <span className="flex items-center gap-1.5 rounded-full bg-orange-500/20 border border-orange-500/30 px-3 py-1.5 text-xs font-semibold text-orange-400">
                  <TrendingUp className="h-3 w-3" /> Tendance
                </span>
              )}
              <span className="rounded-full bg-white/10 border border-white/15 px-3 py-1.5 text-xs font-medium text-white/70">
                {article.league ?? article.category}
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl font-black text-white leading-tight mb-4 tracking-tight group-hover:text-emerald-200 transition-colors duration-300">
              {article.title}
            </h1>

            <p className="text-base text-white/65 leading-relaxed mb-6 line-clamp-2 max-w-xl">
              {article.summary}
            </p>

            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-4">
                <span className="text-sm font-bold text-emerald-400">{article.source.name}</span>
                <span className="flex items-center gap-1.5 text-sm text-white/40">
                  <Clock className="h-3.5 w-3.5" />
                  {timeAgoFr(article.publishedAt)}
                </span>
              </div>
              <a href={article.originalUrl} target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="gap-2 font-semibold">
                  Lire l&apos;article <ExternalLink className="h-4 w-4" />
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
