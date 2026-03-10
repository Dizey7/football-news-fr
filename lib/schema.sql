-- FootDZ — Schéma de base de données Supabase / PostgreSQL
-- Exécutez ce SQL dans votre tableau de bord Supabase > SQL Editor

-- =====================
-- TABLE: sources
-- =====================
CREATE TABLE IF NOT EXISTS sources (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  logo TEXT,
  url TEXT NOT NULL UNIQUE,
  trusted BOOLEAN DEFAULT TRUE,
  country TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================
-- TABLE: clubs
-- =====================
CREATE TABLE IF NOT EXISTS clubs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  logo TEXT,
  league TEXT NOT NULL,
  country TEXT NOT NULL,
  color TEXT DEFAULT '#000000',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================
-- TABLE: players
-- =====================
CREATE TABLE IF NOT EXISTS players (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  position TEXT NOT NULL,
  nationality TEXT NOT NULL,
  age INTEGER,
  current_club_id UUID REFERENCES clubs(id),
  image_url TEXT,
  is_algerian BOOLEAN DEFAULT FALSE,
  jersey_number INTEGER,
  market_value TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================
-- TABLE: articles
-- =====================
CREATE TABLE IF NOT EXISTS articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  summary TEXT NOT NULL,
  content TEXT,
  image_url TEXT NOT NULL,
  source_id UUID REFERENCES sources(id),
  original_url TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('actualites','transferts','algerie','matchs','analyses','interviews')),
  tags TEXT[] DEFAULT '{}',
  published_at TIMESTAMPTZ NOT NULL,
  view_count INTEGER DEFAULT 0,
  is_breaking BOOLEAN DEFAULT FALSE,
  is_trending BOOLEAN DEFAULT FALSE,
  is_popular BOOLEAN DEFAULT FALSE,
  is_hidden BOOLEAN DEFAULT FALSE,
  league TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index pour les requêtes fréquentes
CREATE INDEX IF NOT EXISTS idx_articles_category ON articles(category);
CREATE INDEX IF NOT EXISTS idx_articles_published_at ON articles(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_articles_trending ON articles(is_trending) WHERE is_trending = TRUE;
CREATE INDEX IF NOT EXISTS idx_articles_popular ON articles(is_popular) WHERE is_popular = TRUE;

-- =====================
-- TABLE: transfers
-- =====================
CREATE TABLE IF NOT EXISTS transfers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  player_id UUID REFERENCES players(id),
  from_club_id UUID REFERENCES clubs(id),
  to_club_id UUID REFERENCES clubs(id),
  status TEXT NOT NULL CHECK (status IN ('rumeur','confirme','officiel','abandonne')),
  fee TEXT,
  contract_duration TEXT,
  source_id UUID REFERENCES sources(id),
  article_id UUID REFERENCES articles(id),
  rumour_date TIMESTAMPTZ NOT NULL,
  confirmed_date TIMESTAMPTZ,
  league TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_transfers_status ON transfers(status);
CREATE INDEX IF NOT EXISTS idx_transfers_league ON transfers(league);

-- =====================
-- TABLE: matches
-- =====================
CREATE TABLE IF NOT EXISTS matches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  home_team_id UUID REFERENCES clubs(id),
  away_team_id UUID REFERENCES clubs(id),
  home_score INTEGER,
  away_score INTEGER,
  status TEXT NOT NULL CHECK (status IN ('en_direct','a_venir','termine','reporte')),
  kickoff_time TIMESTAMPTZ NOT NULL,
  league TEXT NOT NULL,
  stadium TEXT,
  minute INTEGER,
  highlights_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_matches_status ON matches(status);
CREATE INDEX IF NOT EXISTS idx_matches_kickoff ON matches(kickoff_time);

-- =====================
-- TABLE: notifications
-- =====================
CREATE TABLE IF NOT EXISTS notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type TEXT NOT NULL CHECK (type IN ('transfert','algerie','breaking','match')),
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  article_id UUID REFERENCES articles(id),
  transfer_id UUID REFERENCES transfers(id),
  match_id UUID REFERENCES matches(id),
  sent_at TIMESTAMPTZ DEFAULT NOW(),
  read_count INTEGER DEFAULT 0
);

-- =====================
-- TABLE: user_preferences (pour auth Supabase)
-- =====================
CREATE TABLE IF NOT EXISTS user_preferences (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  favorite_club_ids UUID[] DEFAULT '{}',
  favorite_player_ids UUID[] DEFAULT '{}',
  notif_transferts BOOLEAN DEFAULT TRUE,
  notif_algerie BOOLEAN DEFAULT TRUE,
  notif_breaking BOOLEAN DEFAULT TRUE,
  notif_matches BOOLEAN DEFAULT FALSE,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================
-- RLS (Row Level Security)
-- =====================
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE transfers ENABLE ROW LEVEL SECURITY;
ALTER TABLE matches ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Lecture publique pour articles non masqués
CREATE POLICY "public_read_articles" ON articles
  FOR SELECT USING (is_hidden = FALSE);

-- Lecture publique pour transferts
CREATE POLICY "public_read_transfers" ON transfers
  FOR SELECT USING (TRUE);

-- Lecture publique pour matchs
CREATE POLICY "public_read_matches" ON matches
  FOR SELECT USING (TRUE);

-- Seul l'admin peut écrire (via service role key)
-- Configurez les autres policies selon vos rôles Supabase

-- =====================
-- FONCTIONS UTILITAIRES
-- =====================

-- Incrémente le compteur de vues d'un article
CREATE OR REPLACE FUNCTION increment_article_views(article_id UUID)
RETURNS VOID AS $$
  UPDATE articles SET view_count = view_count + 1 WHERE id = article_id;
$$ LANGUAGE SQL SECURITY DEFINER;
