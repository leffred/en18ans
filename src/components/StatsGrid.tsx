import React from 'react';
import { TrendingDown, TrendingUp, Trees, Car, Building2, Expand, Bike } from 'lucide-react';
import { NeighborhoodStat } from '../lib/supabase';
import { cn } from '../lib/utils';

export const StatsGrid: React.FC<{ data: NeighborhoodStat }> = ({ data }) => {
  return (
    <div className="grid grid-cols-2 gap-4 w-full mt-4 px-2">
      <StatCard
        title="Bétonnisation"
        value={`${data.kpi_beton}%`}
        label={data.is_radius ? "Moy. du quartier" : "Surface bâtie"}
        icon={<Building2 className="w-5 h-5 text-gray-500" />}
        trend={data.kpi_beton > 80 ? 'bad' : 'neutral'}
      />
      <StatCard
        title="Espaces Verts"
        value={`${data.kpi_green}%`}
        label={data.is_radius ? "Moy. du quartier" : data.stat_green_label}
        icon={<Trees className="w-5 h-5 text-emerald-600" />}
        trend={data.kpi_green < 20 ? 'bad' : 'good'}
        trendIcon={<TrendingDown className="w-4 h-4 ml-1" />}
      />
      <StatCard
        title="Saturation / Trafic"
        value={`${data.kpi_saturation}%`}
        label={data.stat_noise_label}
        icon={<Car className="w-5 h-5 text-rose-500" />}
        trend="bad"
        trendIcon={<TrendingUp className="w-4 h-4 ml-1" />}
      />
      <StatCard
        title="Densité relative"
        value={`${data.kpi_density}%`}
        label={data.is_radius ? "Moy. du quartier" : "vs Moyenne IDF"}
        icon={<Expand className="w-5 h-5 text-gray-500" />}
        trend={data.kpi_density > 85 ? 'neutral' : 'good'}
      />
      {data.kpi_trees !== undefined && (
        <StatCard
          title="Patrimoine Arboré"
          value={data.kpi_trees.toLocaleString('fr-FR')}
          label={data.is_radius ? "< 500m" : "Arbres en ville"}
          icon={<Trees className="w-5 h-5 text-emerald-600" />}
          trend="good"
        />
      )}
      {data.kpi_bike_paths !== undefined && (
        <StatCard
          title="Réseau Cyclable"
          value={`${data.kpi_bike_paths} km`}
          label={data.is_radius ? "< 500m" : "Total ville"}
          icon={<Bike className="w-5 h-5 text-emerald-600" />}
          trend="good"
        />
      )}
    </div>
  );
};

const StatCard: React.FC<{
  title: string;
  value: string;
  label: string;
  icon: React.ReactNode;
  trend: 'good' | 'bad' | 'neutral';
  trendIcon?: React.ReactNode;
}> = ({ title, value, label, icon, trend, trendIcon }) => {
  return (
    <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100 flex flex-col justify-between transition-all hover:shadow-md hover:-translate-y-1 duration-300">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-gray-600 tracking-tight">{title}</h3>
        <div className="bg-gray-50 p-2 rounded-2xl">{icon}</div>
      </div>
      <div className="flex items-end space-x-2">
        <span className={cn(
          "text-3xl font-bold tracking-tighter",
          trend === 'bad' && "text-rose-600",
          trend === 'good' && "text-emerald-600",
          trend === 'neutral' && "text-gray-900"
        )}>
          {value}
        </span>
        <div className={cn(
          "flex items-center text-xs font-bold mb-1 px-1.5 py-0.5 rounded-full",
          trend === 'bad' ? "bg-rose-50 text-rose-700" : (trend === 'good' ? "bg-emerald-50 text-emerald-700" : "text-gray-400 bg-gray-100")
        )}>
          {label}
          {trendIcon}
        </div>
      </div>
    </div>
  );
};
