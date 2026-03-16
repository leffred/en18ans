import React, { useState } from 'react';
import { Share2, Facebook, Twitter, Linkedin, Mail, MessageCircle, MessageSquare, X as CloseIcon } from 'lucide-react';
import { NeighborhoodStat } from '../lib/supabase';

export const ViralFooter: React.FC<{ data: NeighborhoodStat, onShowSources: () => void, isMilitantMode?: boolean }> = ({ data, onShowSources, isMilitantMode }) => {
  const [isOpen, setIsOpen] = useState(false);

  // We make sure the text is dynamic based on the selected region
  const text = `Le constat est clair sur ${data.display_name} : ${data.kpi_saturation}% de saturation et des espaces verts en recul (${data.stat_green_label}). Découvre le vrai bilan de Boulogne-Billancourt :`;
  const url = window.location.href;
  const encodedText = encodeURIComponent(text);
  const encodedUrl = encodeURIComponent(url);

  const shareLinks = [
    {
      name: 'WhatsApp',
      icon: <MessageCircle className="w-5 h-5 text-white" />,
      bg: 'bg-[#25D366] hover:bg-[#128C7E]',
      href: `https://wa.me/?text=${encodedText}%20${encodedUrl}`,
    },
    {
      name: 'SMS',
      icon: <MessageSquare className="w-5 h-5 text-white" />,
      bg: 'bg-emerald-500 hover:bg-emerald-600',
      href: `sms:?body=${encodedText}%20${encodedUrl}`,
    },
    {
      name: 'Email',
      icon: <Mail className="w-5 h-5 text-white" />,
      bg: 'bg-gray-700 hover:bg-gray-800',
      href: `mailto:?subject=${encodeURIComponent('Le vrai Bilan de Boulogne-Billancourt')}&body=${encodedText}%20${encodedUrl}`,
    },
    {
      name: 'Facebook',
      icon: <Facebook className="w-5 h-5 text-white" />,
      bg: 'bg-[#1877F2] hover:bg-[#0C5ECA]',
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    },
    {
      name: 'X (Twitter)',
      icon: <Twitter className="w-5 h-5 text-white" />,
      bg: 'bg-black hover:bg-gray-800',
      href: `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`,
    },
    {
      name: 'LinkedIn',
      icon: <Linkedin className="w-5 h-5 text-white" />,
      bg: 'bg-[#0A66C2] hover:bg-[#004182]',
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    }
  ];

  return (
    <>
      <div className="h-40 w-full" />
      
      <div className="fixed bottom-0 left-0 w-full bg-gradient-to-t from-gray-50 via-gray-50/90 to-transparent pt-12 pb-6 px-6 flex flex-col items-center justify-end z-50 pointer-events-none">
        
        {isOpen && (
           <div className="pointer-events-auto bg-white rounded-[2rem] p-5 shadow-2xl shadow-gray-300/50 border border-gray-100 mb-4 w-full max-w-[340px] flex flex-col animate-fade-in relative origin-bottom">
              <button onClick={() => setIsOpen(false)} className="absolute top-4 right-4 bg-gray-50 p-1.5 rounded-full text-gray-400 hover:text-gray-900 transition-colors">
                <CloseIcon className="w-5 h-5" />
              </button>
              <h4 className="text-sm font-bold text-gray-900 mb-5 px-1">Partager le constat</h4>
              
              <div className="grid grid-cols-3 gap-y-5 gap-x-2">
                 {shareLinks.map((link) => (
                    <a 
                      key={link.name} 
                      href={link.href} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex flex-col items-center space-y-2 group"
                    >
                       <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm transition-transform group-active:scale-95 group-hover:-translate-y-1 ${link.bg}`}>
                          {link.icon}
                       </div>
                       <span className="text-[11px] font-semibold text-gray-600">{link.name}</span>
                    </a>
                 ))}
                 
                 {/* Option native */}
                 {navigator?.share && (
                    <button
                      onClick={() => navigator.share({ title: 'Boulogne Décrypté', text, url })}
                      className="flex flex-col items-center space-y-2 group"
                    >
                       <div className="w-12 h-12 rounded-2xl bg-gray-100 text-gray-700 flex items-center justify-center shadow-sm border border-gray-200 transition-transform group-active:scale-95 group-hover:-translate-y-1 hover:bg-gray-200">
                          <Share2 className="w-5 h-5" />
                       </div>
                       <span className="text-[11px] font-semibold text-gray-600">Autre...</span>
                    </button>
                 )}
              </div>
           </div>
        )}

        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="pointer-events-auto bg-green-950 text-white border border-gray-800 px-6 py-4 rounded-full font-bold shadow-xl shadow-gray-300/40 flex items-center space-x-2 hover:bg-black hover:scale-105 active:scale-95 transition-all w-full max-w-[320px] justify-center mb-3"
          >
            <Share2 className="w-5 h-5 text-emerald-400" />
            <span className="tracking-wide">Partager le constat</span>
          </button>
        )}

        {/* Small transparent backdrop when menu is open */}
        {isOpen && (
          <div 
            className="fixed inset-0 bg-white/20 backdrop-blur-sm z-[-1] pointer-events-auto" 
            onClick={() => setIsOpen(false)}
          />
        )}

        <div className="flex items-center space-x-6 pointer-events-auto z-10">
          <button 
            onClick={onShowSources}
            className="text-xs text-gray-500 font-medium hover:text-emerald-700 transition-colors"
          >
            Sources & Méthodologie
          </button>
          
          {isMilitantMode ? (
            <a 
              href="/"
              className="text-xs text-gray-400 font-bold hover:text-gray-600 transition-colors"
            >
              Autre
            </a>
          ) : (
            <a 
              href="?militant=true"
              className="text-xs text-emerald-700 font-bold hover:text-emerald-900 transition-colors"
            >
              Militant
            </a>
          )}
        </div>
      </div>
    </>
  );
};
