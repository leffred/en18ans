import React from 'react';
import { AlertCircle, GraduationCap, TrendingUp, Building, TrendingDown } from 'lucide-react';

export const ImpactTracker: React.FC = () => {
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
          <div className="bg-rose-50/50 rounded-2xl p-4 border border-rose-100 relative overflow-hidden group hover:shadow-md transition-shadow">
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
          </div>

          {/* Metric 2: Dette */}
          <div className="bg-rose-50/50 rounded-2xl p-4 border border-rose-100 relative overflow-hidden group hover:shadow-md transition-shadow">
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
          </div>

          {/* Metric 3: Ecoles */}
          <div className="bg-rose-50/50 rounded-2xl p-4 border border-rose-100 relative overflow-hidden group hover:shadow-md transition-shadow">
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
          </div>

          {/* Metric 4: Surproduction immobilière */}
          <div className="bg-gray-50 rounded-2xl p-4 border border-gray-200 relative overflow-hidden group hover:shadow-md transition-shadow">
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
          </div>

          <div className="text-xs text-center text-gray-400 mt-2 font-medium">
            Sources vérifiées : Ministère de l'Éducation Nationale, Comptes de Gestion Ville 2012-2024, Insee RP2006-2022
          </div>
        </div>
      </div>
    </div>
  );
};
