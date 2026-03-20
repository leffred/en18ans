import React from 'react';
import { ArrowLeft, Database, AlertOctagon, TrendingUp, Trees, GraduationCap } from 'lucide-react';

interface SourcesPageProps {
  onBack: () => void;
}

export const SourcesPage: React.FC<SourcesPageProps> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-gray-50 font-sans p-6 text-gray-900 pb-20">
      <div className="max-w-md mx-auto">
        <button 
          onClick={onBack}
          className="flex items-center space-x-2 text-emerald-600 font-semibold mb-8 hover:text-emerald-700 transition"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Retour au Bilan</span>
        </button>

        <h1 className="text-3xl font-extrabold tracking-tight mb-4">Sources & Méthodologie</h1>
        
        {/* DISCLAIMER */}
        <div className="bg-rose-50 border border-rose-200 p-4 rounded-2xl mb-8 flex items-start space-x-3">
          <AlertOctagon className="w-6 h-6 text-rose-600 shrink-0 mt-0.5" />
          <div>
            <h2 className="text-rose-900 font-bold mb-1">Avertissement</h2>
            <p className="text-sm text-rose-800 leading-relaxed">
              Ce site présente une <strong>interprétation indépendante</strong> de différentes bases de données publiques (OpenData). 
              Ni les chiffres ni les conclusions présentées ici n'engagent la responsabilité des administrations productrices des données (INSEE, Ministères, etc.).
              Les comparaisons et agrégations effectuées résultent de choix méthodologiques propres à l'équipe éditrice de ce site.
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center space-x-2 mb-2">
              <TrendingUp className="w-5 h-5 text-emerald-600" />
              <h3 className="font-bold text-lg">Finances et Impôts</h3>
            </div>
            <p className="text-sm text-gray-600 mb-2">
              Les données fiscales (Impôts locaux) et l'explosion de la dette (+56% depuis 2019) proviennent des comptes de gestion officiels de la commune de Boulogne-Billancourt de 2012 à 2024.
            </p>
            <a href="https://data.economie.gouv.fr/explore/dataset/balances-comptables-des-communes" target="_blank" rel="noreferrer" className="text-xs text-blue-600 hover:underline">
              Source: data.economie.gouv.fr (Comptes individuels des communes)
            </a>
          </div>

          <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center space-x-2 mb-2">
              <ArrowLeft className="w-5 h-5 text-emerald-600" />
              <h3 className="font-bold text-lg">Inflation Municipale & Tarifs</h3>
            </div>
            <p className="text-sm text-gray-600 mb-2">
              L'évolution des tarifs de la cantine (+25.4%), du conservatoire, et de l'École Municipale des Sports a été extraite des délibérations du Conseil Municipal de 2015 à 2025. L'inflation comparative est basée sur l'IPC de l'INSEE (+19.8% sur la même période). Les tarifs de l'ACBB (Natation) et des réseaux privés (Dupanloup) sont tirés des conventions financières publiques des établissements.
            </p>
            <div className="flex flex-col space-y-1 mt-3">
              <a href="https://www.insee.fr/fr/statistiques/8719836" target="_blank" rel="noreferrer" className="text-xs text-blue-600 hover:underline">
                Source: INSEE (Indice des prix à la consommation - IPC)
              </a>
              <a href="https://eaf.boulognebillancourt.com/transfertAccueil/-1/2194993" target="_blank" rel="noreferrer" className="text-xs text-blue-600 hover:underline">
                Source: Délibérations du Conseil Municipal (Portail Famille)
              </a>
              <a href="https://www.acbb.fr/wp-content/uploads/2025/07/Natation-2025-2026-2.pdf" target="_blank" rel="noreferrer" className="text-xs text-blue-600 hover:underline">
                Source: Règlement financier ACBB Natation 2025-2026
              </a>
              <a href="https://dupanloup.net/etablissement/convention-financiere/" target="_blank" rel="noreferrer" className="text-xs text-blue-600 hover:underline">
                Source: Convention Financière - Ecole Dupanloup
              </a>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center space-x-2 mb-2">
              <GraduationCap className="w-5 h-5 text-emerald-600" />
              <h3 className="font-bold text-lg">Effectifs Scolaires</h3>
            </div>
            <p className="text-sm text-gray-600 mb-2">
              La chute des effectifs (-1462 enfants en 10 ans) est calculée par agrégation des effectifs de toutes les écoles primaires de la ville pour chaque rentrée scolaire de 2009 à 2024. 
              Les effectifs des collèges et lycées (généraux, technologiques et professionnels) ont également été audités sur la même période pour confirmer ces tendances démographiques.
            </p>
            <div className="flex flex-col space-y-1">
              <a href="https://data.education.gouv.fr/explore/dataset/fr-en-ecoles-effectifs-nb_classes" target="_blank" rel="noreferrer" className="text-xs text-blue-600 hover:underline">
                Source: Effectifs des écoles (data.education.gouv.fr)
              </a>
              <a href="https://data.education.gouv.fr/explore/dataset/fr-en-college-effectifs-niveau-sexe-lv" target="_blank" rel="noreferrer" className="text-xs text-blue-600 hover:underline">
                Source: Effectifs des collèges (data.education.gouv.fr)
              </a>
              <a href="https://data.education.gouv.fr/explore/dataset/fr-en-lycee_gt-effectifs-niveau-sexe-lv" target="_blank" rel="noreferrer" className="text-xs text-blue-600 hover:underline">
                Source: Effectifs des lycées (data.education.gouv.fr)
              </a>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center space-x-2 mb-2">
              <Database className="w-5 h-5 text-emerald-600" />
              <h3 className="font-bold text-lg">Démographie & Logements</h3>
            </div>
            <p className="text-sm text-gray-600 mb-2">
              Les ratios de construction (11 296 logements pour 9 954 habitants) et l'augmentation faramineuse des résidences secondaires (+63%) sont extraits des recensements de la population.
            </p>
            <a href="https://www.insee.fr/fr/statistiques/2011101?geo=COM-92012" target="_blank" rel="noreferrer" className="text-xs text-blue-600 hover:underline">
              Source: INSEE (Dossier Complet Boulogne-Billancourt RP2006-2022)
            </a>
          </div>

          <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center space-x-2 mb-2">
              <Trees className="w-5 h-5 text-emerald-600" />
              <h3 className="font-bold text-lg">Nature & Pistes Cyclables</h3>
            </div>
            <p className="text-sm text-gray-600 mb-2">
              Le calcul autour de votre adresse (rayon de 500m) utilise un algorithme de distance géodésique sur des relevés GPS publics des arbres et itinéraires cyclables franciliens.
            </p>
            <div className="flex flex-col space-y-1 mt-3">
              <a href="https://data.iledefrance.fr/explore/" target="_blank" rel="noreferrer" className="text-xs text-blue-600 hover:underline">
                Source: GPSO / data.iledefrance.fr (Cartographie des arbres)
              </a>
              <a href="https://www.apur.org/sites/default/files/documents/publication/etudes/note_122_evolution_nature_paris_1730_2017.pdf" target="_blank" rel="noreferrer" className="text-xs text-blue-600 hover:underline">
                Source: APUR (Évolution de la nature de 1730 à 2017)
              </a>
              <a href="https://www.boulognebillancourt.com/information-transversale/actualites/proteger-nos-arbres-une-priorite-pour-la-ville-663" target="_blank" rel="noreferrer" className="text-xs text-blue-600 hover:underline">
                Source: Mairie (Protéger nos arbres, une priorité)
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
