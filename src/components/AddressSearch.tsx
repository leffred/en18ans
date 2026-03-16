import React, { useState, useEffect, useRef } from 'react';
import { Search, MapPin } from 'lucide-react';

export type AddressResult = {
  label: string;
  coordinates: [number, number]; // [lon, lat]
};

interface AddressSearchProps {
  onAddressSelect: (address: AddressResult | null) => void;
}

export const AddressSearch: React.FC<AddressSearchProps> = ({ onAddressSelect }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<AddressResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const searchAddress = async (q: string) => {
    if (!q || q.length < 3) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    setIsLoading(true);
    try {
      // Focus search on Boulogne-Billancourt area using API Adresse coordinates config
      // Lat / Lon of Boulogne to bias results
      const url = `https://api-adresse.data.gouv.fr/search/?q=${encodeURIComponent(q)}&lat=48.835&lon=2.24&citycode=92012&limit=5`;
      const response = await fetch(url);
      const data = await response.json();
      
      const mapped = (data.features || []).map((f: any) => ({
        label: f.properties.label,
        coordinates: f.geometry.coordinates as [number, number]
      }));
      
      setResults(mapped);
      setIsOpen(true);
    } catch (error) {
      console.error('Error fetching address:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    
    if (debounceRef.current) clearTimeout(debounceRef.current);
    
    if (value === '') {
      onAddressSelect(null);
      setResults([]);
      setIsOpen(false);
    } else {
      debounceRef.current = setTimeout(() => {
        searchAddress(value);
      }, 400); // 400ms debounce
    }
  };

  const handleSelect = (result: AddressResult) => {
    setQuery(result.label);
    setIsOpen(false);
    onAddressSelect(result);
  };

  const clearSelection = () => {
    setQuery('');
    setResults([]);
    setIsOpen(false);
    onAddressSelect(null);
  };

  return (
    <div ref={wrapperRef} className="relative px-5 pb-5">
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        Statistiques autour de moi (500m)
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          onFocus={() => { if (results.length > 0) setIsOpen(true); }}
          placeholder="Entrez votre adresse à Boulogne..."
          className="block w-full pl-10 pr-10 py-3 border border-gray-200 rounded-2xl leading-5 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 sm:text-sm transition-all shadow-sm"
        />
        {query && (
          <button
            onClick={clearSelection}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none"
          >
            <span className="sr-only">Effacer</span>
            &times;
          </button>
        )}
      </div>

      {isOpen && (
        <ul className="absolute z-10 mt-1 w-[calc(100%-2.5rem)] ml-5 mr-5 bg-white shadow-xl max-h-60 rounded-2xl py-2 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm border border-gray-100 divide-y divide-gray-50 left-0 right-0">
          {isLoading ? (
            <li className="text-gray-500 px-4 py-3 text-sm text-center">Recherche...</li>
          ) : results.length > 0 ? (
            results.map((result, idx) => (
              <li
                key={idx}
                className="cursor-pointer select-none relative px-4 py-3 hover:bg-emerald-50 hover:text-emerald-900 transition-colors flex items-start gap-3"
                onClick={() => handleSelect(result)}
              >
                <MapPin className="w-5 h-5 text-emerald-600 mt-0.5 shrink-0" />
                <span className="block truncate font-medium text-gray-700">{result.label}</span>
              </li>
            ))
          ) : query.length >= 3 ? (
            <li className="text-gray-500 px-4 py-3 text-sm text-center">Aucune adresse trouvée</li>
          ) : null}
        </ul>
      )}
    </div>
  );
};
