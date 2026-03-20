import { useEffect, useState } from 'react';
import { Header } from './components/Header';
import { NeighborhoodSelector } from './components/NeighborhoodSelector';
import { AddressSearch, AddressResult } from './components/AddressSearch';
import { ImpactTracker } from './components/ImpactTracker';
import { StatsGrid } from './components/StatsGrid';
import { HeroChart } from './components/HeroChart';
import { LeadCapture } from './components/LeadCapture';
import { ViralFooter } from './components/ViralFooter';
import { SourcesPage } from './components/SourcesPage';
import { LegalPage } from './components/LegalPage';
import { QRCodeGenerator } from './components/QRCodeGenerator';
import { CookieBanner } from './components/CookieBanner';
import { fetchNeighborhoodData, mockData } from './lib/data';
import { NeighborhoodStat } from './lib/supabase';
import { getTreesInRadius, getBikePathsInRadius, getDistance } from './lib/geo';

function App() {
  const [selectedSlug, setSelectedSlug] = useState('all');
  const [data, setData] = useState<NeighborhoodStat | null>(null);
  const [userLocation, setUserLocation] = useState<AddressResult | null>(null);
  const [showSources, setShowSources] = useState(false);
  const [showLegal, setShowLegal] = useState(false);
  const [isQrCodeMode, setIsQrCodeMode] = useState(false);

  // Sync URL params (virality point)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const q = params.get('q');
    if (q && mockData.some(d => d.slug === q)) {
      setSelectedSlug(q);
    }
    
    // Check for qr code mode
    if (params.get('qrcode') === 'true') {
      setIsQrCodeMode(true);
    }
  }, []);

  // Update slug based on user exact location coordinates
  useEffect(() => {
    if (userLocation && userLocation.coordinates) {
      // Rough center coordinates for each main neighborhood [lon, lat]
      const neighborhoodCenters = [
        { slug: 'parchamp', coords: [2.230, 48.845] as [number, number] },
        { slug: 'princes', coords: [2.250, 48.843] as [number, number] },
        { slug: 'silly', coords: [2.230, 48.835] as [number, number] },
        { slug: 'centre-ville', coords: [2.240, 48.835] as [number, number] },
        { slug: 'billancourt', coords: [2.235, 48.828] as [number, number] },
        { slug: 'republique', coords: [2.250, 48.832] as [number, number] }
      ];
      
      let closestSlug = 'centre-ville';
      let minDistance = Infinity;
      
      for (const center of neighborhoodCenters) {
        const dist = getDistance(userLocation.coordinates, center.coords);
        if (dist < minDistance) {
          minDistance = dist;
          closestSlug = center.slug;
        }
      }
      
      if (selectedSlug !== closestSlug) {
        setSelectedSlug(closestSlug);
      }
    }
  }, [userLocation]);

  useEffect(() => {
    // Update URL without reload
    const url = new URL(window.location.href);
    url.searchParams.set('q', selectedSlug);
    window.history.replaceState({}, '', url.toString());

    // Fetch data
    let mounted = true;
    fetchNeighborhoodData(selectedSlug).then((result) => {
      if (mounted) setData(result);
    });
    return () => { mounted = false; };
  }, [selectedSlug]);

  if (!data) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  if (showSources) {
    return <SourcesPage onBack={() => setShowSources(false)} />;
  }

  if (showLegal) {
    return <LegalPage onBack={() => setShowLegal(false)} />;
  }

  const neighborhoodOptions = mockData.map(d => ({ slug: d.slug, name: d.display_name }));

  const displayData = { ...data };
  if (userLocation) {
    displayData.is_radius = true;
    displayData.kpi_trees = getTreesInRadius(userLocation.coordinates);
    displayData.kpi_bike_paths = parseFloat(getBikePathsInRadius(userLocation.coordinates).toFixed(2));
  } else if (displayData.coords) {
    // If no user location but we clicked a neighborhood with predefined coords
    displayData.kpi_trees = getTreesInRadius(displayData.coords);
    displayData.kpi_bike_paths = parseFloat(getBikePathsInRadius(displayData.coords).toFixed(2));
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans selection:bg-emerald-200">
      <div className="max-w-md mx-auto bg-white shadow-2xl shadow-gray-200/50 min-h-screen relative overflow-x-hidden">
        {/* Decorative background shape */}
        <div className="absolute top-0 inset-x-0 h-64 bg-gradient-to-b from-gray-50/80 to-transparent pointer-events-none" />
        
        <Header />

        <ImpactTracker />
        
        <NeighborhoodSelector 
          selected={selectedSlug} 
          onSelect={setSelectedSlug} 
          options={neighborhoodOptions} 
        />
        
        <AddressSearch onAddressSelect={setUserLocation} />
        
        <StatsGrid data={displayData} />
        
        <HeroChart data={displayData} />
        
        <LeadCapture neighborhood={displayData} />
        
        <ViralFooter 
          data={data} 
          onShowSources={() => setShowSources(true)} 
          onShowLegal={() => setShowLegal(true)} 
          isQrCodeMode={isQrCodeMode} 
        />

        {isQrCodeMode && (
          <QRCodeGenerator data={mockData} currentSlug={selectedSlug} />
        )}

        <CookieBanner />
      </div>
    </div>
  );
}

export default App;
