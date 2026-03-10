import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-white/6 bg-[#05060c]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2.5 mb-5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-lg shadow-emerald-500/20">
                <span className="text-lg">⚽</span>
              </div>
              <div className="flex flex-col leading-none">
                <div className="flex items-baseline gap-1">
                  <span className="text-base font-black text-white">lilK</span>
                  <span className="text-base font-black text-emerald-400">football</span>
                </div>
                <span className="text-[7px] font-semibold tracking-[0.22em] text-white/20 uppercase mt-0.5">From514</span>
              </div>
            </div>
            <p className="text-sm text-white/35 leading-relaxed max-w-xs">
              Votre source premium d&apos;actualités football en temps réel. Transferts, matchs, équipe nationale d&apos;Algérie.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-xs font-bold text-white/60 uppercase tracking-widest mb-5">Navigation</h4>
            <ul className="space-y-3">
              {[
                { href: '/', label: 'Accueil' },
                { href: '/transferts', label: 'Transferts' },
                { href: '/actualites', label: 'Actualités' },
                { href: '/matchs', label: 'Matchs' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-white/35 hover:text-emerald-400 transition-colors duration-200">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Sections */}
          <div>
            <h4 className="text-xs font-bold text-white/60 uppercase tracking-widest mb-5">Sections</h4>
            <ul className="space-y-3">
              {[
                { href: '/algerie', label: "Équipe d'Algérie" },
                { href: '/recherche', label: 'Recherche' },
                { href: '/admin', label: 'Administration' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-white/35 hover:text-emerald-400 transition-colors duration-200">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Sources */}
          <div>
            <h4 className="text-xs font-bold text-white/60 uppercase tracking-widest mb-5">Sources fiables</h4>
            <ul className="space-y-3">
              {["L'Équipe", 'BBC Sport', 'Eurosport', 'RMC Sport', 'Sky Sports', 'ESPN'].map((source) => (
                <li key={source} className="flex items-center gap-2">
                  <span className="h-1 w-1 rounded-full bg-emerald-500/50" />
                  <span className="text-sm text-white/35">{source}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/20">
            © 2026 lilK football · From514. Tous droits réservés.
          </p>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-50" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              <span className="text-xs text-white/25">Actualités en temps réel</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
