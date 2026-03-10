import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? 'placeholder-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Database = {
  public: {
    Tables: {
      articles: {
        Row: {
          id: string;
          title: string;
          summary: string;
          content: string | null;
          image_url: string;
          source_id: string;
          original_url: string;
          category: string;
          tags: string[];
          published_at: string;
          view_count: number;
          is_breaking: boolean;
          is_trending: boolean;
          is_popular: boolean;
          league: string | null;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['articles']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['articles']['Insert']>;
      };
      sources: {
        Row: {
          id: string;
          name: string;
          logo: string;
          url: string;
          trusted: boolean;
          country: string;
        };
      };
      transfers: {
        Row: {
          id: string;
          player_id: string;
          from_club_id: string;
          to_club_id: string | null;
          status: string;
          fee: string | null;
          contract_duration: string | null;
          source_id: string;
          article_id: string;
          rumour_date: string;
          confirmed_date: string | null;
          league: string;
        };
      };
      matches: {
        Row: {
          id: string;
          home_team_id: string;
          away_team_id: string;
          home_score: number | null;
          away_score: number | null;
          status: string;
          kickoff_time: string;
          league: string;
          stadium: string | null;
          minute: number | null;
        };
      };
    };
  };
};
