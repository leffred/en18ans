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
import { QRCodeGenerator } from './components/QRCodeGenerator';
import { fetchNeighborhoodData, mockData } from './lib/data';
import { NeighborhoodStat } from './lib/supabase';
import { getTreesInRadius, getBikePathsInRadius, getDistance } from './lib/geo';

function App() {
  const [selectedSlug, setSelectedSlug] = useState('all');
  const [data, setData] = useState<NeighborhoodStat | null>(null);
  const [userLocation, setUserLocation] = useState<AddressResult | null>(null);
  const [showSources, setShowSources] = useState(false);
  const [isMilitantMode, setIsMilitantMode] = useState(false);

  // Sync URL params (virality point)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const q = params.get('q');
    if (q && mockData.some(d => d.slug === q)) {
      setSelectedSlug(q);
    }
    
    // Check for militant mode
    if (params.get('militant') === 'true') {
      setIsMilitantMode(true);
    }
  }, []);

  // Update slug based on user exact location coordinates
  useEffect(() => {
    if (userLocation && userLocation.coordinates) {
      // Rough center coordinates for each main neighborhood [lon, lat]
      const neighborhoodCenters = [
        { slug: 'trapeze', coords: [2.235, 48.828] as [number, number] }, // Sud / Seine
        { slug: 'centre-ville', coords: [2.240, 48.835] as [number, number] }, // Centre
        { slug: 'nord', coords: [2.245, 48.845] as [number, number] } // Nord et Bois
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

  const neighborhoodOptions = mockData.map(d => ({ slug: d.slug, name: d.display_name }));

  const displayData = { ...data };
  if (userLocation) {
    displayData.is_radius = true;
    displayData.kpi_trees = getTreesInRadius(userLocation.coordinates);
    displayData.kpi_bike_paths = parseFloat(getBikePathsInRadius(userLocation.coordinates).toFixed(2));
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
        
        <LeadCapture neighborhoodSlug={selectedSlug} />
        
        <ViralFooter data={data} onShowSources={() => setShowSources(true)} />

        {isMilitantMode && (
          <QRCodeGenerator data={mockData} currentSlug={selectedSlug} />
        )}
      </div>
    </div>
  );
}

export default App;
