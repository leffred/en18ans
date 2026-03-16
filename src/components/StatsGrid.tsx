import React, { useState } from 'react';
import { TrendingDown, TrendingUp, Trees, Car, Building2, Expand, Bike, ThermometerSun, XIcon } from 'lucide-react';
import { NeighborhoodStat } from '../lib/supabase';
import { cn } from '../lib/utils';

type StatExplanation = {
  title: string;
  source: string;
  period: string;
  description: string;
};

const STAT_INFO: Record<string, StatExplanation> = {
  "Bétonnisation": {
    title: "Surface Bâtie & Bétonnisation",
    source: "Institut Paris Région (MOS)",
    period: "Dernier recensement 2021",
    description: "Cet indicateur mesure la part de l'espace artificialisé (béton, bitume, bâtiments) par rapport à la surface totale du quartier. Plus ce chiffre est élevé, moins l'eau pénètre dans les sols et plus le quartier accumule la chaleur."
  },
  "Îlot de Chaleur": {
    title: "Risque Canicule & Îlots de Chaleur",
    source: "Algorithme basé sur la densité bâtie",
    period: "Projection 2024-2026",
    description: "Les îlots de chaleur urbains (ICU) sont des dômes d'air chaud créés par l'accumulation massive de béton et le manque de pleine terre. La nuit, le béton recrache la chaleur emmagasinée, empêchant le rafraîchissement des logements."
  },
  "Espaces Verts": {
    title: "Part d'Espaces Verts",
    source: "Institut Paris Région",
    period: "2021",
    description: "Pourcentage de la surface occupée par des végétaux (parcs, jardins, bois). À Boulogne-Billancourt, la moyenne par habitant est très largement inférieure aux recommandations de l'Organisation Mondiale de la Santé (OMS)."
  },
  "Saturation / Trafic": {
    title: "Saturation du Trafic & Bruit",
    source: "Bruitparif & Open Data",
    period: "2023",
    description: "Évalue le degré d'encombrement routier et l'exposition au bruit. Les axes saturés dégradent significativement la qualité de l'air et l'espérance de vie en bonne santé des riverains."
  },
  "Densité relative": {
    title: "Densité de population",
    source: "INSEE",
    period: "Recensement 2020",
    description: "Avec plus de 120 000 habitants sur un petit territoire, Boulogne-Billancourt est la 2e ville la plus densément peuplée d'Europe, derrière Levallois-Perret, entraînant la saturation des services publics."
  },
  "Patrimoine Arboré": {
    title: "Inventaire du Patrimoine Arboré",
    source: "Open Data Boulogne-Billancourt",
    period: "Evolution 2019 - 2024",
    description: "La ville recense 9 188 arbres sur l'espace public aujourd'hui, contre 9 471 en 2019 (soit une perte globale de près de 300 arbres en 5 ans). L'abattage récurrent d'arbres matures (les seuls climatiseurs naturels de la ville) remplace une canopée protectrice par des îlots de chaleur."
  },
  "Réseau Cyclable": {
    title: "Maillage Cyclable",
    source: "Open Data Région IDF",
    period: "2023",
    description: "Kilométrage total des pistes et bandes cyclables protégées. Un réseau continu et sécurisé est indispensable pour offrir une véritable alternative à la voiture individuelle en ville."
  }
};

export const StatsGrid: React.FC<{ data: NeighborhoodStat }> = ({ data }) => {
  const [selectedStat, setSelectedStat] = useState<string | null>(null);

  const getHeatRisk = (beton: number) => {
    if (beton >= 85) return { value: 'Critique', trend: 'bad' as const, label: "Fournaise" };
    if (beton >= 70) return { value: 'Élevé', trend: 'warning' as const, label: "Risque été" };
    return { value: 'Modéré', trend: 'neutral' as const, label: "Standard" };
  };

  const heatRisk = getHeatRisk(data.kpi_beton);

  const openModal = (title: string) => {
    setSelectedStat(title);
  };

  const closeModal = () => setSelectedStat(null);

  return (
    <>
      <div className="grid grid-cols-2 gap-4 w-full mt-4 px-2">
        <StatCard
          title="Bétonnisation"
          value={`${data.kpi_beton}%`}
          label={data.is_radius ? "Moy. du quartier" : "Surface bâtie"}
          icon={<Building2 className="w-5 h-5 text-gray-500" />}
          trend={data.kpi_beton > 80 ? 'bad' : 'neutral'}
          onClick={() => openModal("Bétonnisation")}
        />
        <StatCard
          title="Îlot de Chaleur"
          value={heatRisk.value}
          label={heatRisk.label}
          icon={<ThermometerSun className={cn("w-5 h-5", heatRisk.trend === 'bad' ? "text-rose-500" : (heatRisk.trend === 'warning' ? "text-amber-500" : "text-gray-500"))} />}
          trend={heatRisk.trend}
          className={heatRisk.trend === 'bad' ? "ring-2 ring-rose-500/20 bg-rose-50/30" : ""}
          onClick={() => openModal("Îlot de Chaleur")}
        />
        <StatCard
          title="Espaces Verts"
          value={`${data.kpi_green}%`}
          label={data.is_radius ? "Moy. du quartier" : data.stat_green_label}
          icon={<Trees className="w-5 h-5 text-emerald-600" />}
          trend={data.kpi_green < 20 ? 'bad' : 'good'}
          trendIcon={<TrendingDown className="w-4 h-4 ml-1" />}
          onClick={() => openModal("Espaces Verts")}
        />
        <StatCard
          title="Saturation / Trafic"
          value={`${data.kpi_saturation}%`}
          label={data.stat_noise_label}
          icon={<Car className="w-5 h-5 text-rose-500" />}
          trend="bad"
          trendIcon={<TrendingUp className="w-4 h-4 ml-1" />}
          onClick={() => openModal("Saturation / Trafic")}
        />
        <StatCard
          title="Densité relative"
          value={`${data.kpi_density}%`}
          label={data.is_radius ? "Moy. du quartier" : "vs Moyenne IDF"}
          icon={<Expand className="w-5 h-5 text-gray-500" />}
          trend={data.kpi_density > 85 ? 'neutral' : 'good'}
          onClick={() => openModal("Densité relative")}
        />
        
        {data.kpi_trees !== undefined && (
          <StatCard
            title="Patrimoine Arboré"
            value={data.kpi_trees.toLocaleString('fr-FR')}
            label={data.is_radius ? `- ${Math.max(1, Math.round(data.kpi_trees * (9471/9188 - 1)))} abattus (depuis 2019)` : "- 283 arbres perdus villes"}
            icon={<Trees className="w-5 h-5 text-emerald-600" />}
            trend="warning"
            trendIcon={<TrendingDown className="w-4 h-4 ml-1" />}
            onClick={() => openModal("Patrimoine Arboré")}
          />
        )}
        {data.kpi_bike_paths !== undefined ? (
          <StatCard
            title="Réseau Cyclable"
            value={`${data.kpi_bike_paths} km`}
            label={data.is_radius ? "< 500m" : "Total ville"}
            icon={<Bike className="w-5 h-5 text-emerald-600" />}
            trend="good"
            className="col-span-2"
            onClick={() => openModal("Réseau Cyclable")}
          />
        ) : (
          <div className="col-span-1 border border-dashed border-gray-200 rounded-3xl opacity-50 flex items-center justify-center min-h-[120px]">
            <span className="text-xs text-center px-4 text-gray-400">Pistes cyclables en cours d'audit</span>
          </div>
        )}
      </div>

      {selectedStat && STAT_INFO[selectedStat] && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm" onClick={closeModal} />
          <div className="bg-white rounded-[2rem] p-6 w-full max-w-sm relative z-10 shadow-2xl animate-fade-in flex flex-col">
            <button 
              onClick={closeModal}
              className="absolute top-5 right-5 bg-gray-100 p-2 rounded-full text-gray-500 hover:text-gray-900 hover:bg-gray-200 transition-colors"
            >
              <XIcon className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-black text-gray-900 pr-10 leading-tight mb-2">
              {STAT_INFO[selectedStat].title}
            </h3>
            
            <div className="flex flex-col space-y-1 mb-5">
              <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">
                Source : {STAT_INFO[selectedStat].source}
              </span>
              <span className="text-xs font-medium text-gray-500">
                Période : {STAT_INFO[selectedStat].period}
              </span>
            </div>

            <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100 mb-6">
              <p className="text-sm font-medium leading-relaxed text-gray-700">
                {STAT_INFO[selectedStat].description}
              </p>
            </div>

            <button 
              onClick={closeModal}
              className="w-full py-4 text-sm font-bold text-gray-500 hover:text-gray-900 mt-auto border-t border-gray-100 transition-colors"
            >
              Fermer cette page
            </button>
          </div>
        </div>
      )}
    </>
  );
};

const StatCard: React.FC<{
  title: string;
  value: string;
  label: string;
  icon: React.ReactNode;
  trend: 'good' | 'bad' | 'warning' | 'neutral';
  trendIcon?: React.ReactNode;
  className?: string;
  onClick?: () => void;
}> = ({ title, value, label, icon, trend, trendIcon, className, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "bg-white rounded-3xl p-5 shadow-sm border border-gray-100 flex flex-col justify-between transition-all hover:shadow-md hover:-translate-y-1 duration-300 text-left active:scale-[0.98]", 
        className,
        onClick && "cursor-pointer"
      )}
    >
      <div className="flex items-center justify-between mb-3 w-full">
        <h3 className="text-sm font-semibold text-gray-600 tracking-tight">{title}</h3>
        <div className="bg-gray-50 p-2 rounded-2xl shrink-0 ml-2">{icon}</div>
      </div>
      <div className="flex items-end space-x-2">
        <span className={cn(
          "text-2xl sm:text-3xl font-bold tracking-tighter",
          trend === 'bad' && "text-rose-600",
          trend === 'warning' && "text-amber-500",
          trend === 'good' && "text-emerald-600",
          trend === 'neutral' && "text-gray-900"
        )}>
          {value}
        </span>
        <div className={cn(
          "flex items-center text-xs font-bold mb-1 px-1.5 py-0.5 rounded-full text-center leading-tight whitespace-nowrap",
          trend === 'bad' ? "bg-rose-50 text-rose-700" : 
          (trend === 'warning' ? "bg-amber-50 text-amber-700" :
          (trend === 'good' ? "bg-emerald-50 text-emerald-700" : "text-gray-400 bg-gray-100"))
        )}>
          {label}
          {trendIcon}
        </div>
      </div>
    </button>
  );
};
