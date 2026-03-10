'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Calendar, Users, Plane, Activity, TrendingUp } from 'lucide-react';
import ArticleCard from '@/components/cards/ArticleCard';
import MatchCard from '@/components/cards/MatchCard';
import SectionHeader from '@/components/sections/SectionHeader';
import { ARTICLES, MATCHES, ALGERIAN_PLAYERS_ABROAD, PLAYERS } from '@/lib/mock-data';

const algeriaArticles = ARTICLES.filter((a) => a.category === 'algerie');
const algeriaMatches = MATCHES.filter((m) => m.league === 'CAN');
const algerianPlayers = ALGERIAN_PLAYERS_ABROAD;

const CONVOCATIONS = [
  { name: 'Riyad Mahrez', poste: 'Ailier', club: 'PSG', flag: '🇩🇿' },
  { name: 'Youcef Atal', poste: 'Latéral droit', club: 'Nice', flag: '🇩🇿' },
  { name: 'Islam Slimani', poste: 'Attaquant', club: 'Besiktas', flag: '🇩🇿' },
  { name: 'Andy Delort', poste: 'Attaquant', club: 'Al-Qadsiah', flag: '🇩🇿' },
  { name: 'Sofiane Feghouli', poste: 'Milieu', club: 'Al-Hilal', flag: '🇩🇿' },
  { name: 'Aissa Mandi', poste: 'Défenseur', club: 'Villarreal', flag: '🇩🇿' },
];

export default function AlgeriePage() {
  return (
    <div className="min-h-screen space-y-10">
      {/* Hero banner */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl border border-emerald-500/20 bg-gradient-to-br from-emerald-950/80 via-[#0a0f1e] to-[#0a0f1e] p-8 md:p-12"
      >
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-emerald-500/10 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-green-500/8 blur-3xl" />
        </div>
        <div className="relative flex items-center gap-6">
          <div className="text-6xl md:text-8xl">🇩🇿</div>
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="rounded-full bg-emerald-500/15 border border-emerald-500/25 px-3 py-1 text-xs font-bold text-emerald-400 uppercase tracking-wider">
                Équipe Nationale
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight">
              Les <span className="text-emerald-400">Fennecs</span>
            </h1>
            <p className="text-white/50 mt-2 text-sm md:text-base">
              Toute l&apos;actualité de l&apos;équipe nationale d&apos;Algérie de football
            </p>
          </div>
        </div>

        {/* Quick stats */}
        <div className="relative grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8">
          {[
            { label: 'Classement FIFA', value: '#34', icon: TrendingUp },
            { label: 'Joueurs convoqués', value: '25', icon: Users },
            { label: 'Prochain match', value: '15 Mar', icon: Calendar },
            { label: 'À l\'étranger', value: '18', icon: Plane },
          ].map((stat) => (
            <div key={stat.label} className="rounded-xl bg-white/5 border border-white/8 p-3 text-center">
              <stat.icon className="h-4 w-4 text-emerald-400 mx-auto mb-1.5" />
              <p className="text-xl font-black text-white">{stat.value}</p>
              <p className="text-[11px] text-white/40 mt-0.5">{stat.label}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Convocations */}
      <section>
        <SectionHeader
          title="Convocations"
          subtitle="Liste des joueurs sélectionnés"
          icon={Users}
          accentColor="text-emerald-400"
        />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          {CONVOCATIONS.map((player, i) => (
            <motion.div
              key={player.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.06 }}
              className="group rounded-2xl border border-white/8 bg-white/4 hover:border-emerald-500/30 hover:bg-emerald-500/5 p-4 text-center transition-all duration-200"
            >
              <span className="text-2xl">{player.flag}</span>
              <p className="text-xs font-bold text-white mt-2 leading-tight">{player.name}</p>
              <p className="text-[10px] text-emerald-400/70 mt-1">{player.poste}</p>
              <p className="text-[10px] text-white/30 mt-0.5">{player.club}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Matchs Algeria */}
      <section>
        <SectionHeader
          title="Matchs des Fennecs"
          icon={Activity}
          accentColor="text-emerald-400"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {algeriaMatches.map((match, i) => (
            <MatchCard key={match.id} match={match} index={i} />
          ))}
        </div>
      </section>

      {/* Actualités Algeria */}
      <section>
        <SectionHeader
          title="Actualités de l'Algérie"
          icon={TrendingUp}
          viewAllHref="/actualites"
          accentColor="text-emerald-400"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {algeriaArticles.map((article, i) => (
            <ArticleCard key={article.id} article={article} index={i} />
          ))}
        </div>
      </section>

      {/* Joueurs algériens à l'étranger */}
      <section>
        <SectionHeader
          title="Joueurs algériens à l'étranger"
          subtitle="Nos talents qui rayonnent dans les grands championnats"
          icon={Plane}
          accentColor="text-emerald-400"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {algerianPlayers.map((player, i) => (
            <motion.div
              key={player.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="group rounded-2xl border border-white/8 bg-white/4 hover:border-emerald-500/25 hover:bg-emerald-500/5 p-5 transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="relative h-14 w-14 rounded-full overflow-hidden border-2 border-emerald-500/30">
                  <Image
                    src={player.imageUrl}
                    alt={player.name}
                    fill
                    className="object-cover"
                    sizes="56px"
                  />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">{player.name}</p>
                  <p className="text-xs text-emerald-400/70">{player.position}</p>
                </div>
              </div>
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-white/40">Club</span>
                  <span className="text-white/70 font-medium">{player.currentClub.name}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-white/40">Ligue</span>
                  <span className="text-white/70">{player.currentClub.league}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-white/40">Âge</span>
                  <span className="text-white/70">{player.age} ans</span>
                </div>
                {player.marketValue && (
                  <div className="flex justify-between text-xs">
                    <span className="text-white/40">Valeur</span>
                    <span className="text-emerald-400 font-semibold">{player.marketValue}</span>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
