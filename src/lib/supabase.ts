import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder_key';

export const supabase = createClient(supabaseUrl, supabaseKey);

export type NeighborhoodStat = {
  id: string;
  slug: string;
  display_name: string;
  kpi_beton: number;
  kpi_density: number;
  kpi_green: number;
  kpi_saturation: number;
  description: string;
  stat_green_label: string;
  stat_noise_label: string;
  kpi_trees?: number;
  kpi_bike_paths?: number;
  is_radius?: boolean;
};

export type LeadCampagne = {
  email: string;
  neighborhood_interest: string;
};
