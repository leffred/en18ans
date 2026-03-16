import React from 'react';
import { Share2 } from 'lucide-react';
import { NeighborhoodStat } from '../lib/supabase';

export const ViralFooter: React.FC<{ data: NeighborhoodStat, onShowSources: () => void }> = ({ data, onShowSources }) => {
  const handleShare = async () => {
    const text = `Le constat est clair sur ${data.display_name} : ${data.kpi_saturation}% de saturation et des espaces verts en recul (${data.stat_green_label}). Découvre le vrai bilan de Boulogne-Billancourt :`;
    const url = window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Boulogne Décrypté',
          text,
          url,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback for WhatsApp web
      const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`;
      window.open(whatsappUrl, '_blank');
    }
  };

  return (
    <>
      {/* Spacer to prevent content from hiding behind the fixed footer */}
      <div className="h-32 w-full" />
      
      <div className="fixed bottom-0 left-0 w-full bg-gradient-to-t from-gray-50 via-gray-50 to-transparent pt-12 pb-6 px-6 flex flex-col items-center justify-end z-50 pointer-events-none">
        <button
          onClick={handleShare}
          className="pointer-events-auto bg-white text-gray-900 border border-gray-200 px-6 py-3.5 rounded-full font-bold shadow-lg shadow-gray-200/50 flex items-center space-x-2 hover:bg-gray-50 active:scale-95 transition-all w-full max-w-[320px] justify-center mb-3"
        >
          <Share2 className="w-5 h-5 text-emerald-600" />
          <span>Partager le constat</span>
        </button>

        <button 
          onClick={onShowSources}
          className="text-xs text-gray-500 font-medium hover:text-emerald-600 transition-colors pointer-events-auto z-10"
        >
          Sources & Méthodologie
        </button>
      </div>
    </>
  );
};
