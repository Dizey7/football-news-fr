import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-white/8 bg-[#07090f]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600">
                <span className="text-lg">⚽</span>
              </div>
              <div>
                <span className="text-lg font-bold text-white">Foot</span>
                <span className="text-lg font-bold text-emerald-400">DZ</span>
              </div>
            </div>
            <p className="text-sm text-white/40 leading-relaxed max-w-xs">
              Votre source premium d&apos;actualités football en français. Transferts, matchs, équipe nationale d&apos;Algérie.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Navigation</h4>
            <ul className="space-y-2.5">
              {[
                { href: '/', label: 'Accueil' },
                { href: '/transferts', label: 'Transferts' },
                { href: '/actualites', label: 'Actualités' },
                { href: '/matchs', label: 'Matchs' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-white/40 hover:text-emerald-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Sections */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Sections</h4>
            <ul className="space-y-2.5">
              {[
                { href: '/algerie', label: 'Équipe d\'Algérie' },
                { href: '/recherche', label: 'Recherche' },
                { href: '/admin', label: 'Administration' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-white/40 hover:text-emerald-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Sources */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Sources fiables</h4>
            <ul className="space-y-2.5">
              {['L\'Équipe', 'RMC Sport', 'FootMercato', 'Sky Sports', 'BBC Sport', 'ESPN'].map((source) => (
                <li key={source}>
                  <span className="text-sm text-white/40">{source}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/30">
            © 2026 FootDZ. Tous droits réservés.
          </p>
          <div className="flex items-center gap-6">
            <span className="text-xs text-white/20">Mode sombre activé</span>
            <div className="flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs text-white/30">Données en temps réel</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
