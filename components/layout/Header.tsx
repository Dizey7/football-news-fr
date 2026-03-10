'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, Search, Menu, X, Star, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNotifications } from '@/hooks/useNotifications';
import { timeAgoFr } from '@/lib/utils';

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications();

  const navLinks = [
    { href: '/', label: 'Accueil' },
    { href: '/transferts', label: 'Transferts' },
    { href: '/actualites', label: 'Actualités' },
    { href: '/algerie', label: 'Algérie' },
    { href: '/matchs', label: 'Matchs' },
    { href: '/recherche', label: 'Recherche' },
  ];

  const notifTypeIcon: Record<string, string> = {
    breaking: '🚨',
    algerie: '🇩🇿',
    transfert: '🔄',
    match: '⚽',
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/8 bg-[#0a0f1e]/90 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-lg shadow-emerald-500/30 group-hover:scale-105 transition-transform duration-200">
              <span className="text-lg">⚽</span>
            </div>
            <div className="hidden sm:flex flex-col items-start leading-none">
              <div className="flex items-baseline gap-1">
                <span className="text-lg font-black text-white tracking-tight">lilK</span>
                <span className="text-lg font-black text-emerald-400 tracking-tight">football</span>
              </div>
              <span className="text-[7px] font-semibold tracking-[0.22em] text-white/25 uppercase mt-0.5 ml-0.5">From514</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2 rounded-lg text-sm font-medium text-white/60 hover:text-white hover:bg-white/8 transition-all duration-200"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Link href="/recherche">
              <Button variant="ghost" size="icon" className="hidden sm:flex h-9 w-9">
                <Search className="h-4 w-4" />
              </Button>
            </Link>

            {/* Notifications */}
            <div className="relative">
              <Button
                variant="ghost"
                size="icon"
                className="relative h-9 w-9"
                onClick={() => setNotifOpen(!notifOpen)}
              >
                <Bell className="h-4 w-4" />
                {unreadCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                    {unreadCount}
                  </span>
                )}
              </Button>

              <AnimatePresence>
                {notifOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setNotifOpen(false)} />
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: -10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: -10 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 top-12 z-50 w-80 rounded-2xl border border-white/10 bg-[#0f1629] shadow-2xl overflow-hidden"
                    >
                      <div className="flex items-center justify-between px-4 py-3 border-b border-white/8">
                        <h3 className="text-sm font-semibold text-white">Notifications</h3>
                        {unreadCount > 0 && (
                          <button
                            onClick={markAllAsRead}
                            className="text-xs text-emerald-400 hover:text-emerald-300 transition-colors"
                          >
                            Tout marquer comme lu
                          </button>
                        )}
                      </div>
                      <div className="max-h-96 overflow-y-auto">
                        {notifications.length === 0 ? (
                          <p className="py-8 text-center text-sm text-white/40">Aucune notification</p>
                        ) : (
                          notifications.map((notif) => (
                            <button
                              key={notif.id}
                              onClick={() => markAsRead(notif.id)}
                              className={`w-full text-left px-4 py-3 hover:bg-white/5 transition-colors border-b border-white/5 last:border-0 ${!notif.read ? 'bg-emerald-500/5' : ''}`}
                            >
                              <div className="flex items-start gap-3">
                                <span className="text-lg mt-0.5">{notifTypeIcon[notif.type]}</span>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center justify-between gap-2">
                                    <p className={`text-xs font-semibold ${!notif.read ? 'text-emerald-400' : 'text-white/50'}`}>
                                      {notif.title}
                                    </p>
                                    {!notif.read && (
                                      <span className="h-2 w-2 rounded-full bg-emerald-400 flex-shrink-0" />
                                    )}
                                  </div>
                                  <p className="text-sm text-white/80 leading-snug mt-0.5">{notif.message}</p>
                                  <p className="text-xs text-white/30 mt-1">{timeAgoFr(notif.createdAt)}</p>
                                </div>
                              </div>
                            </button>
                          ))
                        )}
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

            <Link href="/admin">
              <Button variant="ghost" size="icon" className="hidden sm:flex h-9 w-9">
                <Settings className="h-4 w-4" />
              </Button>
            </Link>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden h-9 w-9"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden border-t border-white/8 bg-[#0a0f1e]/95 overflow-hidden"
          >
            <nav className="px-4 py-4 space-y-1">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="block px-4 py-3 rounded-xl text-sm font-medium text-white/70 hover:text-white hover:bg-white/8 transition-all duration-200"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <div className="pt-2 border-t border-white/8 flex gap-2">
                <Link href="/admin" className="flex-1" onClick={() => setMobileOpen(false)}>
                  <Button variant="ghost" size="sm" className="w-full gap-2 text-xs">
                    <Settings className="h-3.5 w-3.5" />
                    Admin
                  </Button>
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
