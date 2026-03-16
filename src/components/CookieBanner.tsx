import React, { useState, useEffect } from 'react';
import { ShieldCheck, X } from 'lucide-react';

declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

export const CookieBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if consent is already saved
    const consent = localStorage.getItem('cookie_consent');
    if (!consent) {
      // Delay showing the banner slightly for better UX
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleConsent = (accepted: boolean) => {
    localStorage.setItem('cookie_consent', accepted ? 'accepted' : 'declined');
    setIsVisible(false);

    if (accepted) {
      // Push consent update to GTM
      window.dataLayer = window.dataLayer || [];
      // @ts-ignore
      const gtag = function() { window.dataLayer.push(arguments); };
      // @ts-expect-error gtag accepts a variable number of arguments
      gtag('consent', 'update', {
        'analytics_storage': 'granted',
        'ad_storage': 'granted'
      });
      console.log('Les cookies analytiques GTM ont été acceptés.');
    } else {
      console.log('Les cookies analytiques GTM ont été refusés.');
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 z-[100] p-4 flex justify-center animate-fade-in pointer-events-none">
      <div className="bg-gray-900 text-white rounded-2xl shadow-2xl p-6 md:p-5 w-full max-w-2xl border border-gray-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-5 pointer-events-auto">
        <button 
          onClick={() => handleConsent(false)}
          className="absolute top-3 right-3 p-1.5 text-gray-400 hover:text-white transition-colors md:hidden"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-start gap-4">
          <div className="bg-emerald-500/10 p-2.5 rounded-full hidden sm:block">
             <ShieldCheck className="w-6 h-6 text-emerald-400" />
          </div>
          <div>
            <h3 className="font-bold text-base md:text-sm tracking-tight mb-1 text-gray-50">Confidentialité et Cookies</h3>
            <p className="text-gray-400 text-sm leading-snug">
              Nous utilisons des cookies analytiques (comme Google Analytics) pour comprendre la répartition de notre audience par quartier et améliorer notre campagne. Acceptez-vous ces cookies ?
            </p>
          </div>
        </div>

        <div className="flex flex-row md:flex-col gap-2 w-full md:w-auto shrink-0 mt-2 md:mt-0">
          <button 
            onClick={() => handleConsent(true)}
            className="flex-1 md:flex-none bg-emerald-500 hover:bg-emerald-400 text-white text-sm font-bold py-2.5 px-6 rounded-xl transition-colors active:scale-95"
          >
            J'accepte
          </button>
          <button 
            onClick={() => handleConsent(false)}
            className="flex-1 md:flex-none bg-gray-800 hover:bg-gray-700 text-white text-sm font-semibold py-2.5 px-6 rounded-xl transition-colors active:scale-95"
          >
            Refuser
          </button>
        </div>
      </div>
    </div>
  );
};
