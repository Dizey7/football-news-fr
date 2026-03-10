import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { formatDistanceToNow, format, parseISO } from 'date-fns';
import { fr } from 'date-fns/locale';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDateFr(dateString: string): string {
  const date = parseISO(dateString);
  return format(date, "d MMMM yyyy 'à' HH:mm", { locale: fr });
}

export function timeAgoFr(dateString: string): string {
  const date = parseISO(dateString);
  return formatDistanceToNow(date, { addSuffix: true, locale: fr });
}

export function formatShortDate(dateString: string): string {
  const date = parseISO(dateString);
  return format(date, 'dd/MM/yyyy', { locale: fr });
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trimEnd() + '…';
}

export function getStatusLabel(status: string): string {
  const labels: Record<string, string> = {
    rumeur: 'Rumeur',
    confirme: 'Confirmé',
    officiel: 'Officiel',
    abandonne: 'Abandonné',
    en_direct: 'En Direct',
    a_venir: 'À Venir',
    termine: 'Terminé',
    reporte: 'Reporté',
  };
  return labels[status] ?? status;
}

export function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    rumeur: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20',
    confirme: 'text-blue-400 bg-blue-400/10 border-blue-400/20',
    officiel: 'text-green-400 bg-green-400/10 border-green-400/20',
    abandonne: 'text-red-400 bg-red-400/10 border-red-400/20',
    en_direct: 'text-red-400 bg-red-400/10 border-red-400/20',
    a_venir: 'text-blue-400 bg-blue-400/10 border-blue-400/20',
    termine: 'text-gray-400 bg-gray-400/10 border-gray-400/20',
    reporte: 'text-orange-400 bg-orange-400/10 border-orange-400/20',
  };
  return colors[status] ?? 'text-gray-400 bg-gray-400/10 border-gray-400/20';
}

export function getLeagueEmoji(league: string): string {
  const emojis: Record<string, string> = {
    'Premier League': '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
    'La Liga': '🇪🇸',
    'Serie A': '🇮🇹',
    'Bundesliga': '🇩🇪',
    'Ligue 1': '🇫🇷',
    "Championnat d'Algérie": '🇩🇿',
    'Champions League': '🌟',
    'Europa League': '🔶',
    'Coupe du Monde': '🏆',
    'CAN': '🌍',
    'Autres': '⚽',
  };
  return emojis[league] ?? '⚽';
}

export const LEAGUE_OPTIONS = [
  { value: 'all', label: 'Toutes les ligues' },
  { value: 'Premier League', label: 'Premier League' },
  { value: 'La Liga', label: 'La Liga' },
  { value: 'Serie A', label: 'Serie A' },
  { value: 'Bundesliga', label: 'Bundesliga' },
  { value: 'Ligue 1', label: 'Ligue 1' },
  { value: "Championnat d'Algérie", label: "Championnat d'Algérie" },
  { value: 'Champions League', label: 'Champions League' },
  { value: 'CAN', label: 'CAN' },
  { value: 'Autres', label: 'Autres' },
];
