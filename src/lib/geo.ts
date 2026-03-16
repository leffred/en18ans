import geoData from './geo_data.json';

// Coordinates are [lon, lat]
export type Coordinates = [number, number];

// Haversine formula to calculate distance in meters between two points
export const getDistance = (coord1: Coordinates, coord2: Coordinates): number => {
  const R = 6371e3; // Earth radius in meters
  const [lon1, lat1] = coord1;
  const [lon2, lat2] = coord2;

  const φ1 = (lat1 * Math.PI) / 180;
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
};

// Calculate total trees within radius (meters)
export const getTreesInRadius = (center: Coordinates, radius: number = 500): number => {
  const trees = geoData.trees as [number, number][];
  let count = 0;
  for (const tree of trees) {
    if (getDistance(center, tree) <= radius) {
      count++;
    }
  }
  return count;
};

// Calculate total bike paths length (km) within radius (meters)
export const getBikePathsInRadius = (center: Coordinates, radius: number = 500): number => {
  const bikes = geoData.bikes as { type: string; coords: any[]; length: number }[];
  let totalLength = 0;

  for (const path of bikes) {
    if (!path.coords || path.coords.length === 0) continue;

    // For simplicity, we check if the FIRST coordinate of the path is within the radius.
    // A more precise calculation would check bounding boxes or line intersection.
    let isInside = false;
    
    // Some coordinates are nested (MultiLineString)
    const checkCoords = (coordsArray: any[]) => {
      if (typeof coordsArray[0] === 'number') {
         // [lon, lat]
         if (getDistance(center, coordsArray as [number, number]) <= radius) {
           isInside = true;
         }
      } else {
        for(let i=0; i<coordsArray.length;i++){
           if(isInside) break;
           checkCoords(coordsArray[i]);
        }
      }
    };
    
    checkCoords(path.coords);
    
    if (isInside) {
      totalLength += path.length;
    }
  }
  
  return totalLength / 1000; // Return in km
};
