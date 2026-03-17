import React from 'react';
import { ArrowLeft, Shield, Server, Scale, Mail } from 'lucide-react';

interface LegalPageProps {
  onBack: () => void;
}

export const LegalPage: React.FC<LegalPageProps> = ({ onBack }) => {
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

        <h1 className="text-3xl font-extrabold tracking-tight mb-8">Mentions Légales</h1>
        
        <div className="space-y-6">
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center space-x-2 mb-2">
              <Scale className="w-5 h-5 text-emerald-600" />
              <h3 className="font-bold text-lg">Éditeur du site</h3>
            </div>
            <p className="text-sm text-gray-600">
              Ce site est édité à titre personnel et non professionnel, conformément à l'article 6 de la loi n° 2004-575 du 21 juin 2004 pour la confiance dans l'économie numérique (LCEN).
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center space-x-2 mb-2">
              <Server className="w-5 h-5 text-emerald-600" />
              <h3 className="font-bold text-lg">Hébergement</h3>
            </div>
            <p className="text-sm text-gray-600">
              Ce site web est hébergé par Vercel Inc.<br />
              440 N Barranca Ave #4133<br />
              Covina, CA 91723<br />
              États-Unis
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center space-x-2 mb-2">
              <Shield className="w-5 h-5 text-emerald-600" />
              <h3 className="font-bold text-lg">Données Personnelles & Confidentialité</h3>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              <strong>Zéro conservation de données :</strong> Les adresses saisies dans la barre de recherche sont traitées anonymement. Aucune adresse ou coordonnée GPS n'est conservée ni stockée sur nos serveurs.
            </p>
            <p className="text-sm text-gray-600">
              Ce site n'utilise pas de cookies de traçage publicitaire. Les éventuels cookies ou stockages locaux utilisés sont strictement anonymes et nécessaires au fonctionnement technique de l'application.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center space-x-2 mb-2">
              <Mail className="w-5 h-5 text-emerald-600" />
              <h3 className="font-bold text-lg">Propriété Intellectuelle</h3>
            </div>
            <p className="text-sm text-gray-600">
              Les données exploitées proviennent de sources publiques sous licence ouverte. La mise en forme, la conception graphique et le code source du site restent la propriété intellectuelle de leurs auteurs.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
