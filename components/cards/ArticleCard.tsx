'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { ExternalLink, Clock, Eye, Zap } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { Article } from '@/types';
import { timeAgoFr, truncate } from '@/lib/utils';

interface ArticleCardProps {
  article: Article;
  variant?: 'default' | 'featured' | 'compact';
  index?: number;
}

const categoryColors: Record<string, string> = {
  actualites: 'bg-blue-500/15 text-blue-400 border-blue-500/20',
  transferts: 'bg-purple-500/15 text-purple-400 border-purple-500/20',
  algerie: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/20',
  matchs: 'bg-orange-500/15 text-orange-400 border-orange-500/20',
  analyses: 'bg-cyan-500/15 text-cyan-400 border-cyan-500/20',
  interviews: 'bg-pink-500/15 text-pink-400 border-pink-500/20',
};

const categoryLabels: Record<string, string> = {
  actualites: 'Actualités',
  transferts: 'Transferts',
  algerie: 'Algérie',
  matchs: 'Matchs',
  analyses: 'Analyses',
  interviews: 'Interviews',
};

export default function ArticleCard({ article, variant = 'default', index = 0 }: ArticleCardProps) {
  if (variant === 'featured') {
    return (
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: index * 0.1 }}
        className="group relative overflow-hidden rounded-2xl border border-white/8 bg-white/4 hover:border-white/15 transition-all duration-300 hover:shadow-2xl hover:shadow-black/40"
      >
        <div className="relative h-64 overflow-hidden">
          <Image
            src={article.imageUrl}
            alt={article.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1e] via-[#0a0f1e]/50 to-transparent" />
          <div className="absolute top-4 left-4 flex items-center gap-2">
            {article.isBreaking && (
              <span className="flex items-center gap-1 rounded-full bg-red-500 px-2.5 py-1 text-xs font-bold text-white uppercase tracking-wider animate-pulse">
                <Zap className="h-3 w-3" /> Breaking
              </span>
            )}
            <span className={`rounded-full border px-2.5 py-1 text-xs font-semibold ${categoryColors[article.category]}`}>
              {categoryLabels[article.category]}
            </span>
          </div>
        </div>
        <div className="p-5">
          <h2 className="text-xl font-bold text-white leading-tight mb-2 group-hover:text-emerald-300 transition-colors line-clamp-2">
            {article.title}
          </h2>
          <p className="text-sm text-white/55 leading-relaxed mb-4 line-clamp-2">
            {article.summary}
          </p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold text-emerald-400">{article.source.name}</span>
              <span className="flex items-center gap-1 text-xs text-white/30">
                <Clock className="h-3 w-3" />
                {timeAgoFr(article.publishedAt)}
              </span>
              <span className="flex items-center gap-1 text-xs text-white/30">
                <Eye className="h-3 w-3" />
                {article.viewCount.toLocaleString('fr-FR')}
              </span>
            </div>
            <a href={article.originalUrl} target="_blank" rel="noopener noreferrer">
              <Button size="sm" className="gap-1.5 text-xs">
                Lire <ExternalLink className="h-3 w-3" />
              </Button>
            </a>
          </div>
        </div>
      </motion.article>
    );
  }

  if (variant === 'compact') {
    return (
      <motion.article
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, delay: index * 0.05 }}
        className="group flex items-start gap-3 p-3 rounded-xl border border-white/6 bg-white/3 hover:bg-white/6 hover:border-white/12 transition-all duration-200"
      >
        <div className="relative h-16 w-24 flex-shrink-0 overflow-hidden rounded-lg">
          <Image
            src={article.imageUrl}
            alt={article.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="96px"
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 mb-1">
            <span className={`rounded-full border px-1.5 py-0.5 text-[10px] font-semibold ${categoryColors[article.category]}`}>
              {categoryLabels[article.category]}
            </span>
          </div>
          <h3 className="text-sm font-semibold text-white leading-snug line-clamp-2 group-hover:text-emerald-300 transition-colors">
            {article.title}
          </h3>
          <div className="flex items-center gap-2 mt-1.5">
            <span className="text-xs font-medium text-emerald-400/70">{article.source.name}</span>
            <span className="text-xs text-white/25">{timeAgoFr(article.publishedAt)}</span>
          </div>
        </div>
        <a href={article.originalUrl} target="_blank" rel="noopener noreferrer" className="flex-shrink-0 mt-1">
          <ExternalLink className="h-4 w-4 text-white/20 group-hover:text-emerald-400 transition-colors" />
        </a>
      </motion.article>
    );
  }

  // Default card
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="group overflow-hidden rounded-2xl border border-white/8 bg-white/4 hover:border-white/15 transition-all duration-300 hover:shadow-2xl hover:shadow-black/30 hover:-translate-y-0.5"
    >
      <div className="relative h-48 overflow-hidden">
        <Image
          src={article.imageUrl}
          alt={article.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1e]/80 to-transparent" />
        <div className="absolute top-3 left-3 flex items-center gap-2">
          {article.isBreaking && (
            <span className="flex items-center gap-1 rounded-full bg-red-500 px-2 py-0.5 text-[10px] font-bold text-white uppercase animate-pulse">
              <Zap className="h-2.5 w-2.5" /> Breaking
            </span>
          )}
          {article.isTrending && !article.isBreaking && (
            <span className="rounded-full bg-orange-500/20 border border-orange-500/30 px-2 py-0.5 text-[10px] font-semibold text-orange-400">
              Tendance
            </span>
          )}
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <span className={`rounded-full border px-2 py-0.5 text-[11px] font-semibold ${categoryColors[article.category]}`}>
            {categoryLabels[article.category]}
          </span>
          {article.league && (
            <span className="text-[11px] text-white/30">{article.league}</span>
          )}
        </div>
        <h3 className="text-base font-bold text-white leading-snug mb-2 line-clamp-2 group-hover:text-emerald-300 transition-colors">
          {article.title}
        </h3>
        <p className="text-xs text-white/50 leading-relaxed mb-3 line-clamp-2">
          {article.summary}
        </p>
        <div className="flex items-center justify-between pt-3 border-t border-white/6">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-emerald-400">{article.source.name}</span>
            <span className="text-white/20">·</span>
            <span className="flex items-center gap-1 text-xs text-white/30">
              <Clock className="h-3 w-3" />
              {timeAgoFr(article.publishedAt)}
            </span>
          </div>
          <a href={article.originalUrl} target="_blank" rel="noopener noreferrer">
            <Button size="sm" variant="ghost" className="h-7 px-2.5 text-xs gap-1">
              Lire <ExternalLink className="h-3 w-3" />
            </Button>
          </a>
        </div>
      </div>
    </motion.article>
  );
}
