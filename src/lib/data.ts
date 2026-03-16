import { NeighborhoodStat } from './supabase';

export const mockData: NeighborhoodStat[] = [
  {
    id: '1',
    slug: 'all',
    display_name: 'Tout Boulogne-Billancourt',
    kpi_beton: 69,
    kpi_density: 95,
    kpi_green: 31,
    kpi_saturation: 90,
    description: "Une bétonnisation continue avec 69.3% de surface artificialisée en 2025. Les espaces verts reculent légèrement (-0.5%) depuis 2021.",
    stat_green_label: '-0.5% depuis 2021',
    stat_noise_label: '+18% (est.)',
    kpi_trees: 9188,
    kpi_bike_paths: 79.1,
  },
  {
    id: '2',
    slug: 'trapeze',
    display_name: 'Rives de Seine / Trapèze',
    kpi_beton: 95,
    kpi_density: 98,
    kpi_green: 10,
    kpi_saturation: 94,
    description: "Le quartier le plus emblématique de la bétonnisation récente. Un manque criant d'équipements sportifs et une densité record créant des îlots de chaleur.",
    stat_green_label: '-18%',
    stat_noise_label: '+24%',
  },
  {
    id: '3',
    slug: 'centre-ville',
    display_name: 'Centre-Ville',
    kpi_beton: 80,
    kpi_density: 85,
    kpi_green: 20,
    kpi_saturation: 90,
    description: "Sursaturation automobile et une disparition progressive des commerces de proximité au profit des grandes chaînes de restauration rapide.",
    stat_green_label: '-8%',
    stat_noise_label: '+15%',
  },
  {
    id: '4',
    slug: 'nord',
    display_name: 'Nord (Silly-Gallieni / Prince-Marmottan)',
    kpi_beton: 70,
    kpi_density: 75,
    kpi_green: 30,
    kpi_saturation: 80,
    description: "Des quartiers plus préservés mais rattrapés par des politiques d'urbanisme agressives en lisière du bois de Boulogne.",
    stat_green_label: '-4%',
    stat_noise_label: '+10%',
  }
];

export const fetchNeighborhoodData = async (slug: string): Promise<NeighborhoodStat> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const data = mockData.find(d => d.slug === slug) || mockData[0];
      resolve(data);
    }, 300);
  });
};
