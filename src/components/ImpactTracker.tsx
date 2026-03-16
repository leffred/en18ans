import React, { useState } from 'react';
import { AlertCircle, GraduationCap, TrendingUp, Building, TrendingDown, X as CloseIcon } from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title as ChartTitle,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ChartTitle,
  Tooltip,
  Legend,
  Filler
);

const historicalData = {
  impots: {
    title: "Évolution des Impôts Locaux (M€)",
    labels: ['2012', '2014', '2016', '2018', '2020', '2022', '2024'],
    datasets: [{
      label: 'Recettes fiscales (M€)',
      data: [58.2, 63.4, 71.8, 85.2, 92.1, 103.5, 111.0],
      borderColor: 'rgb(225, 29, 72)',
      backgroundColor: 'rgba(225, 29, 72, 0.1)',
      fill: true,
      tension: 0.4
    }],
    description: "Les recettes fiscales (impôts locaux payés par les contribuables boulonnais) ont presque doublé en 12 ans, marquant un matraquage fiscal continu sans amélioration proportionnelle des services publics."
  },
  dette: {
    title: "Évolution de la Dette (M€)",
    labels: ['2019', '2020', '2021', '2022', '2023', '2024'],
    datasets: [{
      label: "En-cours de la dette (M€)",
      data: [63.2, 68.5, 75.1, 86.4, 92.8, 98.4],
      borderColor: 'rgb(225, 29, 72)',
      backgroundColor: 'rgba(225, 29, 72, 0.1)',
      fill: true,
      tension: 0.4
    }],
    description: "L'endettement de la ville s'est envolé depuis 2019 (+56%), compromettant les capacités d'investissement futures, notamment pour la transition écologique et l'adaptation au changement climatique."
  },
  ecoles: {
    title: "Effectifs des Écoles Primaires Publiques",
    labels: ['2014', '2016', '2018', '2020', '2022', '2024'],
    datasets: [{
      label: "Nombre d'élèves",
      data: [10986, 10850, 10520, 10100, 9850, 9524],
      borderColor: 'rgb(225, 29, 72)',
      backgroundColor: 'rgba(225, 29, 72, 0.1)',
      fill: true,
      tension: 0.4
    }],
    description: "La bétonnisation n'attire pas les familles : le manque d'infrastructures de qualité, de verdure et d'espaces pousse les parents à quitter la ville, vidant progressivement nos écoles publiques (-13% en 10 ans)."
  },
  logements: {
    title: "Construction vs Population (Croissance cumulée)",
    labels: ['2008', '2011', '2014', '2017', '2020', '2023'],
    datasets: [
      {
        label: "Nouveaux Logements",
        data: [0, 2500, 4800, 7200, 9500, 11296],
        borderColor: 'rgb(55, 65, 81)',
        backgroundColor: 'transparent',
        borderDash: [5, 5],
        tension: 0.1
      },
      {
        label: "Nouveaux Habitants",
        data: [0, 1800, 3900, 5500, 7800, 9954],
        borderColor: 'rgb(16, 185, 129)', // emerald
        backgroundColor: 'transparent',
        tension: 0.1
      }
    ],
    description: "Un déséquilibre flagrant : Boulogne construit frénétiquement (+11 296 logements) mais la population n'augmente pas proportionnellement (+9 954 habitants). La ville se densifie pour de la spéculation ou des résidences inoccupées, pas pour loger durablement des familles."
  },
  costofliving: {
    title: "Hausse Cantine vs Inflation (Base 100)",
    labels: ['2015', '2018', '2021', '2022', '2023', '2024'],
    datasets: [
      {
        label: "Tarif Maximum Cantine (+25.4%)",
        data: [100, 105.1, 108.4, 115.2, 121.0, 125.4],
        borderColor: 'rgb(225, 29, 72)',
        backgroundColor: 'transparent',
        borderWidth: 3,
        tension: 0.1
      },
      {
        label: "Inflation Nationale INSEE (+19.8%)",
        data: [100, 102.6, 106.4, 111.9, 117.4, 119.8],
        borderColor: 'rgb(107, 114, 128)',
        backgroundColor: 'transparent',
        borderDash: [5, 5],
        borderWidth: 2,
        tension: 0.1
      }
    ],
    description: "La Mairie ponctionne la classe moyenne : le tarif de la cantine a explosé de 25,4% depuis 2015 (plafond à 11€), augmentant plus vite que l'inflation (19,8%). Parallèlement, le conservatoire et le sport municipal flambent : la natation ACBB dépasse désormais les 325€/an."
  }
};

export const ImpactTracker: React.FC = () => {
  const [selectedMetric, setSelectedMetric] = useState<keyof typeof historicalData | null>(null);

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' as const },
    },
    scales: {
      y: { beginAtZero: false } // Auto-scale to show evolution clearly
    }
  };

  return (
    <div className="w-full bg-white px-4 py-8 border-b border-gray-100">
      <div className="max-w-md mx-auto">
        <div className="flex items-center gap-2 mb-6">
          <div className="bg-rose-100 p-2 rounded-xl">
            <AlertCircle className="w-5 h-5 text-rose-600" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 tracking-tight">Le Vrai Bilan (2012-2024)</h2>
        </div>

        <div className="grid grid-cols-1 gap-4">
          
          {/* Metric 1: Matraquage Fiscal */}
          <button 
            onClick={() => setSelectedMetric('impots')}
            className="text-left bg-rose-50/50 rounded-2xl p-4 border border-rose-100 relative overflow-hidden group hover:shadow-md transition-shadow active:scale-[0.98] cursor-pointer"
          >
            <div className="absolute top-0 right-0 p-4 opacity-10 transform translate-x-4 -translate-y-4 group-hover:scale-110 transition-transform">
              <TrendingUp className="w-24 h-24 text-rose-900" />
            </div>
            <div className="relative z-10">
              <div className="flex items-center gap-2 text-rose-600 font-semibold mb-1 text-sm">
                <TrendingUp className="w-4 h-4" />
                Matraquage Fiscal
              </div>
              <p className="text-gray-900 font-bold mb-2">L'explosion des impôts locaux</p>
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-2xl font-black text-rose-700">+ 91%</span>
              </div>
              <div className="text-sm text-gray-600">
                Les impôts locaux prélevés par la ville sont passés de 58 M€ en 2012 à <strong className="text-gray-800">111 millions d'euros</strong> en 2024. Une charge fiscale doublée pour les Boulonnais.
              </div>
            </div>
          </button>

          {/* Metric 2: Dette */}
          <button 
            onClick={() => setSelectedMetric('dette')}
            className="text-left bg-rose-50/50 rounded-2xl p-4 border border-rose-100 relative overflow-hidden group hover:shadow-md transition-shadow active:scale-[0.98] cursor-pointer"
          >
            <div className="absolute top-0 right-0 p-4 opacity-10 transform translate-x-4 -translate-y-4 group-hover:scale-110 transition-transform">
              <AlertCircle className="w-24 h-24 text-rose-900" />
            </div>
            <div className="relative z-10">
              <div className="flex items-center gap-2 text-rose-600 font-semibold mb-1 text-sm">
                <AlertCircle className="w-4 h-4" />
                Dérapage Financier
              </div>
              <p className="text-gray-900 font-bold mb-2">Une dette qui s'envole</p>
              <div className="flex items-baseline gap-2 mb-1">
                 <span className="text-2xl font-black text-rose-700">98,4 M€</span>
              </div>
              <div className="text-sm text-gray-600">
                Malgré des impôts record, la dette de la ville a explosé de <strong className="text-rose-700">+56%</strong> ! Passant de 63 M€ fin 2019 à près de 100 millions en 2024.
              </div>
            </div>
          </button>

          {/* Metric 3: Ecoles */}
          <button 
            onClick={() => setSelectedMetric('ecoles')}
            className="text-left bg-rose-50/50 rounded-2xl p-4 border border-rose-100 relative overflow-hidden group hover:shadow-md transition-shadow active:scale-[0.98] cursor-pointer"
          >
            <div className="absolute top-0 right-0 p-4 opacity-10 transform translate-x-4 -translate-y-4 group-hover:scale-110 transition-transform">
              <GraduationCap className="w-24 h-24 text-rose-900" />
            </div>
            <div className="relative z-10">
              <div className="flex items-center gap-2 text-rose-600 font-semibold mb-1 text-sm">
                <TrendingDown className="w-4 h-4" />
                La fuite des familles
              </div>
              <p className="text-gray-900 font-bold mb-2">Des écoles qui se vident</p>
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-2xl font-black text-rose-700">- 1 462</span>
                <span className="text-sm font-medium text-rose-700">élèves (-13%)</span>
              </div>
              <div className="text-sm text-gray-600">
                La politique de la ville fait fuir les familles. Les effectifs des écoles primaires publiques ont lourdement chuté en 10 ans, passant de 10 986 enfants (2014) à <strong className="text-gray-800">9 524</strong> à la rentrée 2024.
              </div>
            </div>
          </button>

          {/* Metric 4: Surproduction immobilière */}
          <button 
            onClick={() => setSelectedMetric('logements')}
            className="text-left bg-gray-50 rounded-2xl p-4 border border-gray-200 relative overflow-hidden group hover:shadow-md transition-shadow active:scale-[0.98] cursor-pointer"
          >
            <div className="absolute top-0 right-0 p-4 opacity-10 transform translate-x-4 -translate-y-4 group-hover:scale-110 transition-transform">
              <Building className="w-24 h-24 text-gray-900" />
            </div>
            <div className="relative z-10">
              <div className="flex items-center gap-2 text-gray-600 font-semibold mb-1 text-sm">
                <Building className="w-4 h-4" />
                Déséquilibre démographique
              </div>
              <p className="text-gray-900 font-bold mb-2">On bétonne, mais pour qui ?</p>
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-2xl font-black text-gray-800">+11 296</span>
                <span className="text-sm font-medium text-gray-600">logements construits</span>
              </div>
              <div className="text-sm text-gray-600">
                pour seulement <strong className="text-gray-800">+9 954 habitants</strong> en 15 ans. On construit plus de béton qu'on n'accueille d'habitants. En parallèle, les résidences secondaires et inoccupées ont bondi de <strong className="text-rose-600">+63%</strong>.
              </div>
            </div>
          </button>

          {/* Metric 5: Pouvoir d'achat */}
          <button 
            onClick={() => setSelectedMetric('costofliving')}
            className="text-left bg-rose-50/50 rounded-2xl p-4 border border-rose-100 relative overflow-hidden group hover:shadow-md transition-shadow active:scale-[0.98] cursor-pointer"
          >
            <div className="absolute top-0 right-0 p-4 opacity-10 transform translate-x-4 -translate-y-4 group-hover:scale-110 transition-transform">
              <TrendingUp className="w-24 h-24 text-rose-900" />
            </div>
            <div className="relative z-10">
              <div className="flex items-center gap-2 text-rose-600 font-semibold mb-1 text-sm">
                <TrendingUp className="w-4 h-4" />
                Pouvoir d'Achat
              </div>
              <p className="text-gray-900 font-bold mb-2">La folie des tarifs municipaux</p>
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-2xl font-black text-rose-700">+ 25,4%</span>
              </div>
              <div className="text-sm text-gray-600">
                Les prix pénalisent les familles : le repas de cantine a explosé pour atteindre <strong className="text-rose-700">11€</strong> (plus cher que l'école privée). Le sport s'envole avec une inscription ACBB dépassant les <strong className="text-gray-800">325€/an</strong>.
              </div>
            </div>
          </button>

          <div className="text-xs text-center text-gray-400 mt-2 font-medium">
            Cliquez sur les données pour voir l'évolution détaillée. Sources vérifiées : Ministère de l'Éducation Nationale, Comptes de Gestion Ville, Insee.
          </div>
        </div>
      </div>
      
      {/* Modal / Popup Contextuelle */}
      {selectedMetric && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm" onClick={() => setSelectedMetric(null)} />
          <div className="bg-white rounded-[2rem] p-6 w-full max-w-lg relative z-10 shadow-2xl animate-fade-in flex flex-col max-h-[90vh]">
            <button 
              onClick={() => setSelectedMetric(null)}
              className="absolute top-5 right-5 bg-gray-100 p-2.5 rounded-full text-gray-500 hover:text-gray-900 hover:bg-gray-200 transition-colors"
            >
              <CloseIcon className="w-6 h-6" />
            </button>

            <h3 className="text-xl sm:text-2xl font-black text-gray-900 pr-12 leading-tight mb-4">
              {historicalData[selectedMetric].title}
            </h3>
            
            <div className="w-full h-64 mb-6 relative">
              <Line 
                data={{
                  labels: historicalData[selectedMetric].labels,
                  datasets: historicalData[selectedMetric].datasets
                }} 
                options={chartOptions} 
              />
            </div>

            <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100 mb-6 overflow-y-auto">
              <p className="text-sm font-medium leading-relaxed text-gray-800">
                {historicalData[selectedMetric].description}
              </p>
            </div>

            <button 
              onClick={() => setSelectedMetric(null)}
              className="w-full bg-gray-900 text-white rounded-xl py-4 text-sm font-bold hover:bg-black transition-colors"
            >
              Fermer cette page
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
