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
    slug: 'parchamp',
    display_name: 'Parchamp - Albert Kahn',
    kpi_beton: 65,
    kpi_density: 70,
    kpi_green: 35,
    kpi_saturation: 75,
    coords: [2.230, 48.845],
    description: "Quartier historiquement préservé, mais la pression immobilière récente menace son équilibre et grignote ses espaces verts.",
    stat_green_label: '-3%',
    stat_noise_label: '+12%',
  },
  {
    id: '3',
    slug: 'princes',
    display_name: 'Les Princes - Marmottan',
    kpi_beton: 75,
    kpi_density: 80,
    kpi_green: 25,
    kpi_saturation: 85,
    coords: [2.250, 48.843],
    description: "A proximité des infrastructures sportives majeures, ce quartier subit des aménagements favorisant le tout-béton au détriment de la biodiversité.",
    stat_green_label: '-10%',
    stat_noise_label: '+20%',
  },
  {
    id: '4',
    slug: 'silly',
    display_name: 'Silly - Gallieni',
    kpi_beton: 80,
    kpi_density: 85,
    kpi_green: 20,
    kpi_saturation: 88,
    coords: [2.230, 48.835],
    description: "Un quartier de passage en mutation, où les grands axes routiers créent des nuisances sonores et limitent la mobilité douce.",
    stat_green_label: '-12%',
    stat_noise_label: '+22%',
  },
  {
    id: '5',
    slug: 'centre-ville',
    display_name: 'Centre-Ville',
    kpi_beton: 85,
    kpi_density: 90,
    kpi_green: 15,
    kpi_saturation: 92,
    coords: [2.240, 48.835],
    description: "Sursaturation automobile et disparition progressive des petits commerces au profit des franchises.",
    stat_green_label: '-8%',
    stat_noise_label: '+15%',
  },
  {
    id: '6',
    slug: 'billancourt',
    display_name: 'Billancourt - Rives de Seine',
    kpi_beton: 95,
    kpi_density: 95,
    kpi_green: 5,
    kpi_saturation: 98,
    coords: [2.235, 48.828],
    description: "Le quartier emblématique de la bétonnisation massive. Une densité record, un manque d'équipements et la création d'îlots de chaleur.",
    stat_green_label: '-18%',
    stat_noise_label: '+24%',
  },
  {
    id: '7',
    slug: 'republique',
    display_name: 'République - Point-du-Jour',
    kpi_beton: 82,
    kpi_density: 88,
    kpi_green: 18,
    kpi_saturation: 90,
    coords: [2.250, 48.832],
    description: "Une densification accélérée aux portes de Paris, avec une minéralisation constante de l'espace public et des trottoirs saturés.",
    stat_green_label: '-15%',
    stat_noise_label: '+18%',
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
