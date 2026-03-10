'use client';

import { motion } from 'framer-motion';
import { ExternalLink, Clock, Eye, Zap, TrendingUp } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import type { Article } from '@/types';
import { timeAgoFr, truncate } from '@/lib/utils';

interface ArticleCardProps {
  article: Article;
  variant?: 'default' | 'featured' | 'compact';
  index?: number;
}

const categoryColors: Record<string, string> = {
  actualites: 'bg-sky-500/10 text-sky-400 border-sky-500/20',
  transferts: 'bg-violet-500/10 text-violet-400 border-violet-500/20',
  algerie: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  matchs: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  analyses: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
  interviews: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
};

const categoryLabels: Record<string, string> = {
  actualites: 'Actualités',
  transferts: 'Transferts',
  algerie: 'Algérie',
  matchs: 'Matchs',
  analyses: 'Analyses',
  interviews: 'Interviews',
};

function ArticleImage({ src, alt, className }: { src: string; alt: string; className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      className={className}
      onError={(e) => {
        (e.target as HTMLImageElement).src =
          'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&h=450&fit=crop&q=80';
      }}
    />
  );
}

export default function ArticleCard({ article, variant = 'default', index = 0 }: ArticleCardProps) {
  if (variant === 'featured') {
    return (
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: index * 0.1 }}
        className="group relative overflow-hidden rounded-2xl border border-white/8 bg-[#0d1120] hover:border-emerald-500/25 transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-500/5"
      >
        <a href={article.originalUrl} target="_blank" rel="noopener noreferrer" className="block">
          <div className="relative h-64 overflow-hidden">
            <ArticleImage
              src={article.imageUrl}
              alt={article.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0d1120] via-[#0d1120]/40 to-transparent" />
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
            <p className="text-sm text-white/50 leading-relaxed mb-4 line-clamp-2">
              {article.summary}
            </p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wide">{article.source.name}</span>
                <span className="flex items-center gap-1 text-xs text-white/30">
                  <Clock className="h-3 w-3" />
                  {timeAgoFr(article.publishedAt)}
                </span>
              </div>
              <span className="flex items-center gap-1.5 text-xs text-emerald-400/80 font-medium">
                Lire <ExternalLink className="h-3 w-3" />
              </span>
            </div>
          </div>
        </a>
      </motion.article>
    );
  }

  if (variant === 'compact') {
    return (
      <motion.article
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, delay: index * 0.05 }}
        className="group"
      >
        <a
          href={article.originalUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-start gap-3 p-3 rounded-xl border border-white/6 bg-[#0d1120] hover:bg-[#111827] hover:border-white/12 transition-all duration-200 block"
        >
          <div className="relative h-16 w-24 flex-shrink-0 overflow-hidden rounded-lg">
            <ArticleImage
              src={article.imageUrl}
              alt={article.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 mb-1">
              <span className={`rounded-full border px-1.5 py-0.5 text-[10px] font-semibold ${categoryColors[article.category]}`}>
                {categoryLabels[article.category]}
              </span>
            </div>
            <h3 className="text-sm font-semibold text-white/90 leading-snug line-clamp-2 group-hover:text-emerald-300 transition-colors">
              {article.title}
            </h3>
            <div className="flex items-center gap-2 mt-1.5">
              <span className="text-xs font-bold text-emerald-400/70 uppercase tracking-wide">{article.source.name}</span>
              <span className="text-xs text-white/25">{timeAgoFr(article.publishedAt)}</span>
            </div>
          </div>
          <ExternalLink className="h-4 w-4 flex-shrink-0 mt-1 text-white/15 group-hover:text-emerald-400 transition-colors" />
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
      className="group overflow-hidden rounded-2xl border border-white/7 bg-[#0d1120] hover:border-emerald-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/5 hover:-translate-y-0.5"
    >
      <a href={article.originalUrl} target="_blank" rel="noopener noreferrer" className="block h-full">
        <div className="relative h-48 overflow-hidden">
          <ArticleImage
            src={article.imageUrl}
            alt={article.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d1120]/90 via-transparent to-transparent" />
          <div className="absolute top-3 left-3 flex items-center gap-2">
            {article.isBreaking && (
              <span className="flex items-center gap-1 rounded-full bg-red-500 px-2 py-0.5 text-[10px] font-bold text-white uppercase animate-pulse">
                <Zap className="h-2.5 w-2.5" /> Breaking
              </span>
            )}
            {article.isTrending && !article.isBreaking && (
              <span className="flex items-center gap-1 rounded-full bg-amber-500/15 border border-amber-500/25 px-2 py-0.5 text-[10px] font-semibold text-amber-400">
                <TrendingUp className="h-2.5 w-2.5" /> Tendance
              </span>
            )}
          </div>
          {/* Source badge top-right */}
          <div className="absolute top-3 right-3">
            <span className="rounded-lg bg-black/50 backdrop-blur-sm px-2 py-0.5 text-[10px] font-bold text-white/70 border border-white/10">
              {article.source.name}
            </span>
          </div>
        </div>
        <div className="p-4">
          <div className="flex items-center gap-2 mb-2.5">
            <span className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold ${categoryColors[article.category]}`}>
              {categoryLabels[article.category]}
            </span>
            {article.league && (
              <span className="text-[10px] text-white/25 font-medium">{article.league}</span>
            )}
          </div>
          <h3 className="text-[15px] font-bold text-white/95 leading-snug mb-2 line-clamp-2 group-hover:text-emerald-300 transition-colors">
            {article.title}
          </h3>
          <p className="text-xs text-white/45 leading-relaxed mb-4 line-clamp-2">
            {article.summary}
          </p>
          <div className="flex items-center justify-between pt-3 border-t border-white/6">
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1 text-xs text-white/30">
                <Clock className="h-3 w-3" />
                {timeAgoFr(article.publishedAt)}
              </span>
              <span className="text-white/15">·</span>
              <span className="flex items-center gap-1 text-xs text-white/25">
                <Eye className="h-3 w-3" />
                {article.viewCount.toLocaleString('fr-FR')}
              </span>
            </div>
            <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400 group-hover:text-emerald-300 transition-colors">
              Lire l'article <ExternalLink className="h-3 w-3" />
            </span>
          </div>
        </div>
      </a>
    </motion.article>
  );
}
