export type ArticleCategory =
  | 'actualites'
  | 'transferts'
  | 'algerie'
  | 'matchs'
  | 'analyses'
  | 'interviews';

export type TransferStatus = 'rumeur' | 'confirme' | 'officiel' | 'abandonne';

export type MatchStatus = 'en_direct' | 'a_venir' | 'termine' | 'reporte';

export type League =
  | 'Premier League'
  | 'La Liga'
  | 'Serie A'
  | 'Bundesliga'
  | 'Ligue 1'
  | 'Championnat d\'Algérie'
  | 'Champions League'
  | 'Europa League'
  | 'Coupe du Monde'
  | 'CAN'
  | 'Autres';

export interface Source {
  id: string;
  name: string;
  logo: string;
  url: string;
  trusted: boolean;
  country: string;
}

export interface Article {
  id: string;
  title: string;
  summary: string;
  content?: string;
  imageUrl: string;
  source: Source;
  originalUrl: string;
  category: ArticleCategory;
  tags: string[];
  publishedAt: string;
  viewCount: number;
  isBreaking: boolean;
  isTrending: boolean;
  isPopular: boolean;
  league?: League;
}

export interface Player {
  id: string;
  name: string;
  position: string;
  nationality: string;
  age: number;
  currentClub: Club;
  imageUrl: string;
  isAlgerian: boolean;
  jerseyNumber?: number;
  marketValue?: string;
}

export interface Club {
  id: string;
  name: string;
  logo: string;
  league: League;
  country: string;
  color: string;
}

export interface Transfer {
  id: string;
  player: Player;
  fromClub: Club;
  toClub: Club | null;
  status: TransferStatus;
  fee?: string;
  contractDuration?: string;
  source: Source;
  article: Article;
  rumourDate: string;
  confirmedDate?: string;
  league: League;
}

export interface Match {
  id: string;
  homeTeam: Club;
  awayTeam: Club;
  homeScore?: number;
  awayScore?: number;
  status: MatchStatus;
  kickoffTime: string;
  league: League;
  stadium?: string;
  minute?: number;
  highlights?: string;
}

export interface Notification {
  id: string;
  type: 'transfert' | 'algerie' | 'breaking' | 'match';
  title: string;
  message: string;
  articleId?: string;
  transferId?: string;
  matchId?: string;
  createdAt: string;
  read: boolean;
}

export interface UserPreferences {
  favoriteClubs: string[];
  favoritePlayers: string[];
  notificationSettings: {
    transferts: boolean;
    algerie: boolean;
    breakingNews: boolean;
    matches: boolean;
  };
  darkMode: boolean;
}

export interface AdminUser {
  id: string;
  email: string;
  role: 'admin' | 'moderator';
  name: string;
}

export interface SearchResult {
  articles: Article[];
  players: Player[];
  clubs: Club[];
  transfers: Transfer[];
}
