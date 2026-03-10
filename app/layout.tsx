import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: {
    default: 'FootDZ — Actualités Football en Français',
    template: '%s | FootDZ',
  },
  description:
    'Votre source premium d\'actualités football en français. Transferts, matchs, équipe nationale d\'Algérie, Champions League et tous les grands championnats.',
  keywords: [
    'football',
    'actualités football',
    'transferts',
    'équipe algérie',
    'ligue 1',
    'premier league',
    'champions league',
    'fennecs',
    'mercato',
  ],
  authors: [{ name: 'FootDZ' }],
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    siteName: 'FootDZ',
    title: 'FootDZ — Actualités Football en Français',
    description: 'Toutes les actualités football, transferts, matchs et équipe nationale d\'Algérie.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FootDZ',
    description: 'Actualités football premium en français',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className="dark">
      <body className="font-sans antialiased bg-[#080c18] text-white min-h-screen">
        <div className="relative min-h-screen">
          {/* Background ambient blobs */}
          <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
            <div className="absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-emerald-500/5 blur-[120px]" />
            <div className="absolute top-1/2 -right-40 h-[400px] w-[400px] rounded-full bg-blue-500/4 blur-[100px]" />
            <div className="absolute bottom-0 left-1/3 h-[300px] w-[300px] rounded-full bg-purple-500/3 blur-[80px]" />
          </div>

          <Header />

          <main className="mx-auto max-w-7xl px-4 sm:px-6 pt-24 pb-16">
            {children}
          </main>

          <Footer />
        </div>
      </body>
    </html>
  );
}
