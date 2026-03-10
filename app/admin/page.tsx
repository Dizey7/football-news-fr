'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Settings, Newspaper, AlertTriangle, Bell, Globe,
  Plus, Trash2, Eye, EyeOff, Check, X, BarChart3,
  Users, TrendingUp, Radio,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ARTICLES, SOURCES, MATCHES } from '@/lib/mock-data';
import { timeAgoFr } from '@/lib/utils';

type AdminTab = 'dashboard' | 'sources' | 'contenus' | 'notifications';

const STAT_CARDS = [
  { label: 'Articles publiés', value: '248', change: '+12 aujourd\'hui', icon: Newspaper, color: 'text-blue-400', bg: 'bg-blue-500/10 border-blue-500/20' },
  { label: 'Sources actives', value: '8', change: '2 en attente', icon: Globe, color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/20' },
  { label: 'Notifications envoyées', value: '1 420', change: '+65 ce soir', icon: Bell, color: 'text-purple-400', bg: 'bg-purple-500/10 border-purple-500/20' },
  { label: 'Visiteurs actifs', value: '3 812', change: '+18%', icon: Users, color: 'text-orange-400', bg: 'bg-orange-500/10 border-orange-500/20' },
];

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');
  const [newSourceUrl, setNewSourceUrl] = useState('');
  const [newSourceName, setNewSourceName] = useState('');
  const [articles, setArticles] = useState(ARTICLES.slice(0, 6));
  const [hiddenArticles, setHiddenArticles] = useState<string[]>([]);
  const [notifTitle, setNotifTitle] = useState('');
  const [notifMessage, setNotifMessage] = useState('');
  const [notifType, setNotifType] = useState('breaking');

  const toggleArticleVisibility = (id: string) => {
    setHiddenArticles((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const deleteArticle = (id: string) => {
    setArticles((prev) => prev.filter((a) => a.id !== id));
  };

  const ADMIN_TABS = [
    { value: 'dashboard' as AdminTab, label: 'Tableau de bord', icon: BarChart3 },
    { value: 'sources' as AdminTab, label: 'Sources', icon: Globe },
    { value: 'contenus' as AdminTab, label: 'Contenus', icon: Newspaper },
    { value: 'notifications' as AdminTab, label: 'Notifications', icon: Bell },
  ];

  return (
    <div className="min-h-screen space-y-8">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-3 mb-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/15 border border-amber-500/20">
            <Settings className="h-5 w-5 text-amber-400" />
          </div>
          <div>
            <h1 className="text-3xl font-black text-white tracking-tight">Administration</h1>
          </div>
          <span className="ml-auto rounded-full bg-amber-500/15 border border-amber-500/25 px-3 py-1 text-xs font-bold text-amber-400 uppercase">
            Admin
          </span>
        </div>
        <p className="text-white/40 text-sm ml-[52px]">Gérez le contenu, les sources et les notifications</p>
      </motion.div>

      {/* Tabs */}
      <div className="flex gap-2 flex-wrap border-b border-white/8 pb-0">
        {ADMIN_TABS.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            className={`flex items-center gap-2 px-4 py-3 text-sm font-semibold border-b-2 transition-all duration-200 -mb-px ${
              activeTab === tab.value
                ? 'border-amber-400 text-amber-400'
                : 'border-transparent text-white/40 hover:text-white/70'
            }`}
          >
            <tab.icon className="h-4 w-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* DASHBOARD TAB */}
      {activeTab === 'dashboard' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
          {/* Stat cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {STAT_CARDS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className={`rounded-2xl border p-5 ${stat.bg}`}
              >
                <div className="flex items-center justify-between mb-3">
                  <stat.icon className={`h-5 w-5 ${stat.color}`} />
                  <span className="text-xs text-white/30">{stat.change}</span>
                </div>
                <p className={`text-3xl font-black ${stat.color}`}>{stat.value}</p>
                <p className="text-xs text-white/50 mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          {/* Recent activity */}
          <div className="rounded-2xl border border-white/8 bg-white/4 overflow-hidden">
            <div className="px-5 py-4 border-b border-white/8">
              <h3 className="text-sm font-bold text-white">Activité récente</h3>
            </div>
            <div className="divide-y divide-white/5">
              {ARTICLES.slice(0, 5).map((article) => (
                <div key={article.id} className="flex items-center gap-4 px-5 py-3.5">
                  <div className={`h-2 w-2 rounded-full flex-shrink-0 ${article.isBreaking ? 'bg-red-400' : 'bg-emerald-400'}`} />
                  <p className="flex-1 text-sm text-white/70 truncate">{article.title}</p>
                  <span className="text-xs text-white/30 flex-shrink-0">{timeAgoFr(article.publishedAt)}</span>
                  <span className="text-xs font-medium text-emerald-400/70 flex-shrink-0">{article.source.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Matches live */}
          <div className="rounded-2xl border border-white/8 bg-white/4">
            <div className="px-5 py-4 border-b border-white/8 flex items-center gap-2">
              <Radio className="h-4 w-4 text-red-400" />
              <h3 className="text-sm font-bold text-white">Matchs en cours</h3>
              <span className="ml-auto text-xs text-white/30">{MATCHES.filter(m => m.status === 'en_direct').length} live</span>
            </div>
            <div className="p-4 space-y-2">
              {MATCHES.filter((m) => m.status === 'en_direct').map((match) => (
                <div key={match.id} className="flex items-center justify-between rounded-xl bg-red-500/5 border border-red-500/15 px-4 py-3">
                  <span className="text-sm text-white/80">{match.homeTeam.name} vs {match.awayTeam.name}</span>
                  <span className="text-sm font-black text-red-300">{match.homeScore} - {match.awayScore} ({match.minute}&apos;)</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* SOURCES TAB */}
      {activeTab === 'sources' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="rounded-2xl border border-white/8 bg-white/4 p-5">
            <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
              <Plus className="h-4 w-4 text-emerald-400" />
              Ajouter une source fiable
            </h3>
            <div className="flex gap-3 flex-wrap">
              <Input
                value={newSourceName}
                onChange={(e) => setNewSourceName(e.target.value)}
                placeholder="Nom de la source"
                className="flex-1 min-w-40"
              />
              <Input
                value={newSourceUrl}
                onChange={(e) => setNewSourceUrl(e.target.value)}
                placeholder="URL (https://...)"
                className="flex-1 min-w-60"
              />
              <Button
                onClick={() => { setNewSourceName(''); setNewSourceUrl(''); }}
                className="flex-shrink-0"
                disabled={!newSourceName || !newSourceUrl}
              >
                <Plus className="h-4 w-4 mr-1" /> Ajouter
              </Button>
            </div>
          </div>

          <div className="rounded-2xl border border-white/8 bg-white/4 overflow-hidden">
            <div className="px-5 py-4 border-b border-white/8">
              <h3 className="text-sm font-bold text-white">Sources actives ({SOURCES.length})</h3>
            </div>
            <div className="divide-y divide-white/5">
              {SOURCES.map((source, i) => (
                <motion.div
                  key={source.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className="flex items-center gap-4 px-5 py-4"
                >
                  <div className="h-8 w-8 rounded-lg bg-white/8 flex items-center justify-center text-sm font-bold text-white flex-shrink-0">
                    {source.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-white">{source.name}</p>
                    <p className="text-xs text-white/35 truncate">{source.url}</p>
                  </div>
                  <span className="text-xs text-white/40 hidden sm:block">{source.country}</span>
                  <div className="flex items-center gap-2">
                    {source.trusted ? (
                      <span className="flex items-center gap-1 rounded-full bg-emerald-500/15 border border-emerald-500/25 px-2.5 py-1 text-xs font-semibold text-emerald-400">
                        <Check className="h-3 w-3" /> Fiable
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 rounded-full bg-red-500/15 border border-red-500/25 px-2.5 py-1 text-xs font-semibold text-red-400">
                        <AlertTriangle className="h-3 w-3" /> Non vérifié
                      </span>
                    )}
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-red-400/50 hover:text-red-400 hover:bg-red-500/10">
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* CONTENUS TAB */}
      {activeTab === 'contenus' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
          <p className="text-sm text-white/40">
            Gérez la visibilité des articles et supprimez les fausses nouvelles.
          </p>
          <div className="rounded-2xl border border-white/8 bg-white/4 overflow-hidden">
            <div className="px-5 py-4 border-b border-white/8 flex items-center justify-between">
              <h3 className="text-sm font-bold text-white">Articles ({articles.length})</h3>
              <span className="text-xs text-white/30">{hiddenArticles.length} masqué{hiddenArticles.length !== 1 ? 's' : ''}</span>
            </div>
            <div className="divide-y divide-white/5">
              {articles.map((article, i) => {
                const isHidden = hiddenArticles.includes(article.id);
                return (
                  <motion.div
                    key={article.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.04 }}
                    className={`flex items-center gap-4 px-5 py-4 transition-colors ${isHidden ? 'opacity-40' : ''}`}
                  >
                    <div className={`h-2 w-2 rounded-full flex-shrink-0 ${
                      article.isBreaking ? 'bg-red-400' : article.isTrending ? 'bg-orange-400' : 'bg-white/20'
                    }`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white truncate">{article.title}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-xs text-emerald-400/70">{article.source.name}</span>
                        <span className="text-xs text-white/25">{timeAgoFr(article.publishedAt)}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      <Button
                        variant="ghost"
                        size="icon"
                        className={`h-8 w-8 ${isHidden ? 'text-white/30 hover:text-white' : 'text-white/50 hover:text-white'}`}
                        onClick={() => toggleArticleVisibility(article.id)}
                        title={isHidden ? 'Afficher' : 'Masquer'}
                      >
                        {isHidden ? <Eye className="h-3.5 w-3.5" /> : <EyeOff className="h-3.5 w-3.5" />}
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-red-400/50 hover:text-red-400 hover:bg-red-500/10"
                        onClick={() => deleteArticle(article.id)}
                        title="Supprimer"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>
      )}

      {/* NOTIFICATIONS TAB */}
      {activeTab === 'notifications' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="rounded-2xl border border-white/8 bg-white/4 p-6 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Bell className="h-4 w-4 text-purple-400" />
              Envoyer une notification push
            </h3>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-medium text-white/50 block mb-1.5">Type de notification</label>
                <div className="flex gap-2 flex-wrap">
                  {[
                    { value: 'breaking', label: 'Breaking News', emoji: '🚨' },
                    { value: 'algerie', label: 'Algérie', emoji: '🇩🇿' },
                    { value: 'transfert', label: 'Transfert', emoji: '🔄' },
                    { value: 'match', label: 'Match', emoji: '⚽' },
                  ].map((type) => (
                    <button
                      key={type.value}
                      onClick={() => setNotifType(type.value)}
                      className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold border transition-all ${
                        notifType === type.value
                          ? 'bg-purple-500 border-purple-500 text-white'
                          : 'border-white/10 text-white/50 hover:text-white/70'
                      }`}
                    >
                      <span>{type.emoji}</span> {type.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-white/50 block mb-1.5">Titre</label>
                <Input
                  value={notifTitle}
                  onChange={(e) => setNotifTitle(e.target.value)}
                  placeholder="Titre de la notification..."
                />
              </div>

              <div>
                <label className="text-xs font-medium text-white/50 block mb-1.5">Message</label>
                <textarea
                  value={notifMessage}
                  onChange={(e) => setNotifMessage(e.target.value)}
                  placeholder="Contenu de la notification..."
                  rows={3}
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/50 resize-none"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <Button
                  className="flex-1 bg-purple-500 hover:bg-purple-600 shadow-lg shadow-purple-500/20"
                  disabled={!notifTitle || !notifMessage}
                  onClick={() => { setNotifTitle(''); setNotifMessage(''); }}
                >
                  <Bell className="h-4 w-4 mr-2" /> Envoyer la notification
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => { setNotifTitle(''); setNotifMessage(''); }}
                >
                  Réinitialiser
                </Button>
              </div>
            </div>
          </div>

          {/* Notification settings */}
          <div className="rounded-2xl border border-white/8 bg-white/4 overflow-hidden">
            <div className="px-5 py-4 border-b border-white/8">
              <h3 className="text-sm font-bold text-white">Paramètres de notification</h3>
            </div>
            <div className="divide-y divide-white/5">
              {[
                { label: 'Alertes transferts', desc: 'Notifier pour chaque nouveau transfert', active: true },
                { label: 'Alertes équipe d\'Algérie', desc: 'Convocations, matchs et résultats', active: true },
                { label: 'Breaking news', desc: 'Actualités urgentes en temps réel', active: true },
                { label: 'Buts en direct', desc: 'Alertes lors des buts dans les matchs', active: false },
                { label: 'Résumés quotidiens', desc: 'Récapitulatif du jour à 20h', active: false },
              ].map((setting) => (
                <div key={setting.label} className="flex items-center justify-between px-5 py-4">
                  <div>
                    <p className="text-sm font-medium text-white">{setting.label}</p>
                    <p className="text-xs text-white/35 mt-0.5">{setting.desc}</p>
                  </div>
                  <div className={`h-6 w-11 rounded-full border transition-all cursor-pointer relative ${
                    setting.active ? 'bg-emerald-500 border-emerald-500' : 'bg-white/8 border-white/15'
                  }`}>
                    <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all ${
                      setting.active ? 'left-[calc(100%-1.375rem)]' : 'left-0.5'
                    }`} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
