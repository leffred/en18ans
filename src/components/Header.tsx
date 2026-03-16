import React from 'react';
import { ShieldCheck } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="pt-8 pb-6 px-6 relative z-10 w-full flex flex-col items-center">
      <div className="flex items-center space-x-2 bg-emerald-50 text-emerald-800 px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide border border-emerald-100 shadow-sm animate-fade-in-down mb-4">
        <ShieldCheck className="w-4 h-4 text-emerald-600" />
        <span>Données Officielles 2006 - 2026</span>
      </div>
      <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight text-center">
        Boulogne <span className="text-emerald-600">Décrypté</span>
      </h1>
      <p className="mt-2 text-sm text-gray-500 font-medium text-center">
        Le diagnostic de votre quartier
      </p>
    </header>
  );
};
