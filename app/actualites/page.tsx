'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Newspaper } from 'lucide-react';
import ArticleCard from '@/components/cards/ArticleCard';
import { ARTICLES } from '@/lib/mock-data';

const CATEGORIES = [
  { value: 'all', label: 'Tout' },
  { value: 'actualites', label: 'Actualités' },
  { value: 'transferts', label: 'Transferts' },
  { value: 'algerie', label: 'Algérie' },
  { value: 'matchs', label: 'Matchs' },
  { value: 'analyses', label: 'Analyses' },
];

export default function ActualitesPage() {
  const [activeCategory, setActiveCategory] = useState('all');

  const filtered = activeCategory === 'all'
    ? ARTICLES
    : ARTICLES.filter((a) => a.category === activeCategory);

  return (
    <div className="min-h-screen space-y-8">
      <div>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 mb-2"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/15 border border-blue-500/20">
            <Newspaper className="h-5 w-5 text-blue-400" />
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight">Actualités populaires</h1>
        </motion.div>
        <p className="text-white/40 text-sm ml-[52px]">Toutes les actualités du football mondial</p>
      </div>

      {/* Category tabs */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="flex gap-2 flex-wrap"
      >
        {CATEGORIES.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setActiveCategory(cat.value)}
            className={`rounded-full px-4 py-2 text-sm font-semibold border transition-all duration-200 ${
              activeCategory === cat.value
                ? 'bg-blue-500 border-blue-500 text-white'
                : 'border-white/10 text-white/50 hover:border-white/20 hover:text-white'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </motion.div>

      <p className="text-sm text-white/30">
        {filtered.length} article{filtered.length !== 1 ? 's' : ''}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map((article, i) => (
          <ArticleCard key={article.id} article={article} index={i} />
        ))}
      </div>
    </div>
  );
}
