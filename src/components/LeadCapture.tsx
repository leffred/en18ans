import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { supabase, NeighborhoodStat } from '../lib/supabase';

export const LeadCapture: React.FC<{ neighborhood: NeighborhoodStat }> = ({ neighborhood }) => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    
    try {
      const { error } = await supabase.from('leads_campagne').insert([
        { 
          email, 
          neighborhood: neighborhood.slug,
          kpi_beton: neighborhood.kpi_beton,
          kpi_debt: neighborhood.kpi_debt || 98400000 // Fallback to total debt if missing
        }
      ]);

      if (error) {
         throw error;
      } else {
        setStatus('success');
      }
    } catch (err) {
      console.error("Supabase insert error:", err);
      setStatus('error');
    }
  };

  return (
    <div className="px-4 mt-8 pb-32">
      <div className="bg-emerald-600 rounded-[2rem] p-8 text-white shadow-xl shadow-emerald-600/20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500 rounded-full blur-3xl opacity-50 -mr-20 -mt-20 pointer-events-none" />
        
        <div className="relative z-10">
          <h2 className="text-2xl font-extrabold mb-2 tracking-tight">Le Projet 2026</h2>
          <p className="text-emerald-50 mb-6 text-sm leading-relaxed font-medium">
            Recevez par email l'audit complet en PDF et nos solutions concrètes pour désaturer Boulogne.
          </p>

          {status === 'success' ? (
            <div className="bg-emerald-700/50 rounded-2xl p-4 flex items-center space-x-3 border border-emerald-500/30 animate-fade-in">
              <CheckCircle2 className="w-6 h-6 text-emerald-300 shrink-0" />
              <p className="text-sm font-semibold text-emerald-50">C'est noté ! Surveillez votre boîte mail pour l'audit.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col space-y-3">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="votre.email@boulogne.fr"
                className="w-full px-5 py-3.5 rounded-2xl text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-4 focus:ring-emerald-400/50 border-0 transition-all font-medium"
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full bg-gray-900 hover:bg-black text-white px-5 py-4 rounded-2xl font-bold flex items-center justify-center space-x-2 transition-all active:scale-[0.98] disabled:opacity-70"
              >
                <span>{status === 'loading' ? 'Envoi...' : 'Recevoir mon audit'}</span>
                {status !== 'loading' && <Send className="w-4 h-4 ml-1" />}
              </button>
              {status === 'error' && (
                <p className="text-xs text-rose-200 mt-2 flex items-center"><AlertCircle className="w-3 h-3 mr-1"/> Une erreur est survenue, veuillez réessayer.</p>
              )}
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
