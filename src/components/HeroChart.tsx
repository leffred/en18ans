import React from 'react';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
} from 'chart.js';
import { Radar } from 'react-chartjs-2';
import { NeighborhoodStat } from '../lib/supabase';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

export const HeroChart: React.FC<{ data: NeighborhoodStat }> = ({ data }) => {
  const chartData = {
    labels: ['Bétonnisation', 'Densité', 'Saturation', 'Espaces Verts (inversé)'],
    datasets: [
      {
        label: 'Taux de critique (%)',
        data: [
          data.kpi_beton,
          data.kpi_density,
          data.kpi_saturation,
          100 - data.kpi_green, // Inverted for the "bad" radar shape
        ],
        backgroundColor: 'rgba(225, 29, 72, 0.2)', // Rose-600 with opacity
        borderColor: 'rgba(225, 29, 72, 1)',
        borderWidth: 2,
        pointBackgroundColor: 'rgba(225, 29, 72, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(225, 29, 72, 1)',
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: {
        angleLines: {
          display: true,
          color: 'rgba(0, 0, 0, 0.05)',
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
        },
        suggestedMin: 0,
        suggestedMax: 100,
        ticks: {
          display: false,
        },
        pointLabels: {
          font: {
            size: 11,
            family: "'Inter', sans-serif",
            weight: "bold" as const,
          },
          color: '#6b7280'
        }
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: '#111827',
        titleFont: { family: "'Inter', sans-serif" },
        bodyFont: { family: "'Inter', sans-serif" },
        padding: 12,
        cornerRadius: 8,
      }
    },
  };

  return (
    <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-gray-100 mx-4 mt-6 relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-32 h-32 bg-rose-50 rounded-full blur-3xl -mr-10 -mt-10 transition-opacity group-hover:opacity-75" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-emerald-50 rounded-full blur-3xl -ml-10 -mb-10 transition-opacity group-hover:opacity-75" />
      
      <div className="relative z-10">
        <h2 className="text-xl font-bold text-gray-900 mb-1">Diagnostic Global</h2>
        <p className="text-sm text-gray-500 mb-6">Empreinte urbaine (plus la zone est large, plus la situation est critique)</p>
        <div className="w-full h-64">
          <Radar data={chartData} options={options} />
        </div>
        <p className="mt-6 text-sm text-gray-700 leading-relaxed font-medium bg-gray-50 p-4 rounded-2xl border border-gray-100">
          "{data.description}"
        </p>
      </div>
    </div>
  );
};
