-- Script de création des tables Supabase pour Boulogne Décrypté

-- 1. Table de capture d'emails (LeadCapture)
CREATE TABLE public.leads_campagne (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    neighborhood TEXT,
    kpi_beton INTEGER,
    kpi_debt INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Sécurité RLS (Row Level Security)
-- On permet à tout le monde d'insérer (anonyme), mais personne ne peut lire à part les admins
ALTER TABLE public.leads_campagne ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public insert" ON public.leads_campagne
    FOR INSERT WITH CHECK (true);

-- (Optionnel) Table de statistiques par quartier si on passe sur une DB en ligne plutôt que du JSON statique
-- CREATE TABLE public.neighborhood_stats (
--    id TEXT PRIMARY KEY,
--    display_name TEXT NOT NULL,
--    kpi_beton INTEGER NOT NULL,
--    kpi_density INTEGER NOT NULL,
--    stat_population TEXT NOT NULL,
--    stat_green_label TEXT NOT NULL,
--    stat_density_label TEXT NOT NULL,
--    saturation_percent INTEGER NOT NULL
-- );
