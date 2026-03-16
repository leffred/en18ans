import React from 'react';
import { MapPin, ChevronDown } from 'lucide-react';

export const NeighborhoodSelector: React.FC<{
  selected: string;
  onSelect: (val: string) => void;
  options: { slug: string; name: string }[];
}> = ({ selected, onSelect, options }) => {
  return (
    <div className="px-6 mb-6">
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        Sélectionnez votre quartier :
      </label>
      <div className="relative group">
        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-600 pointer-events-none" />
        <select
          value={selected}
          onChange={(e) => onSelect(e.target.value)}
          className="appearance-none w-full bg-white border-2 border-emerald-100 rounded-2xl py-4 pl-12 pr-10 text-gray-900 font-bold shadow-sm focus:outline-none focus:ring-4 focus:ring-emerald-50 focus:border-emerald-400 transition-all cursor-pointer hover:border-emerald-300"
        >
          {options.map((opt) => (
            <option key={opt.slug} value={opt.slug}>
              {opt.name}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none group-hover:text-gray-600 transition-colors" />
      </div>
    </div>
  );
};
