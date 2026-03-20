import React, { useRef, useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { Download, QrCode } from 'lucide-react';
import { NeighborhoodStat } from '../lib/supabase';
import { mockData } from '../lib/data';

interface Props {
  data: NeighborhoodStat[];
  currentSlug: string;
}

export const QRCodeGenerator: React.FC<Props> = ({ currentSlug }) => {
  const [selectedSlug, setSelectedSlug] = useState(currentSlug);
  const qrRef = useRef<HTMLCanvasElement>(null);

  const downloadQRCode = () => {
    const canvas = qrRef.current;
    if (canvas) {
      const url = canvas.toDataURL("image/png");
      const a = document.createElement("a");
      a.download = `QR_Code_${selectedSlug}.png`;
      a.href = url;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  // Build the target URL for the QR code
  // We use the current origin if in browser context, fallback to prod URL
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://www.en18ans.com';
  const qrUrl = selectedSlug === 'all' ? baseUrl : `${baseUrl}/?q=${selectedSlug}`;

  return (
    <div className="bg-gray-900 border-t-4 border-emerald-500 p-6 pb-32 text-white text-center rounded-t-3xl shadow-2xl mt-8">
      <div className="flex items-center justify-center space-x-2 mb-4 text-emerald-400">
        <QrCode className="w-6 h-6" />
        <h2 className="text-xl font-bold tracking-tight">QR Code</h2>
      </div>
      
      <p className="text-gray-400 text-sm mb-6 max-w-sm mx-auto">
        Générez un QR Code pré-configuré pour un quartier spécifique. Imprimez-le sur vos flyers : les habitants atterriront directement sur le bilan de leur quartier !
      </p>

      <div className="max-w-xs mx-auto space-y-4">
        <select 
          value={selectedSlug} 
          onChange={(e) => setSelectedSlug(e.target.value)}
          className="w-full bg-gray-800 border-2 border-gray-700 text-white rounded-xl px-4 py-3 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 font-medium"
        >
          {mockData.map((d) => (
            <option key={d.slug} value={d.slug}>
              Cible : {d.display_name}
            </option>
          ))}
        </select>

        <div className="bg-white p-4 rounded-xl flex items-center justify-center mx-auto w-48 h-48">
          <QRCodeCanvas 
            id="qrCode" 
            value={qrUrl} 
            size={160} 
            bgColor={"#ffffff"}
            fgColor={"#000000"}
            level={"H"}
            includeMargin={false}
            ref={qrRef}
          />
        </div>

        <button 
          onClick={downloadQRCode}
          className="w-full bg-emerald-600 text-white font-bold py-3 px-4 rounded-xl hover:bg-emerald-500 transition-colors flex items-center justify-center space-x-2 shadow-lg shadow-emerald-900/20 active:scale-95"
        >
          <Download className="w-5 h-5" />
          <span>Télécharger (PNG)</span>
        </button>
      </div>
      <div className="mt-8 opacity-50 text-xs">
         URL encodée: <br/>
         <span className="break-all font-mono">{qrUrl}</span>
      </div>
    </div>
  );
};
