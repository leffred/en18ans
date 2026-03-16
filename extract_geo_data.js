import fs from 'fs';

const arbresPath = 'C:/Users/lefeb/Documents/Projets/adj/en18ans/arbres-v2.json';
const velosPath = 'C:/Users/lefeb/Documents/Projets/adj/en18ans/les-amenagements-cyclables.json';

try {
    // 1. Process Trees
    const arbresData = JSON.parse(fs.readFileSync(arbresPath, 'utf8'));
    const arbresArr = Array.isArray(arbresData) ? arbresData : (arbresData.features || []);
    
    // Extract only coordinates [lon, lat]
    const leanTrees = arbresArr
        .filter(t => t.commune && t.commune.toUpperCase() === 'BOULOGNE-BILLANCOURT' && t.geo_point_2d)
        .map(t => [t.geo_point_2d.lon, t.geo_point_2d.lat]);

    // 2. Process Bike Paths
    const velosData = JSON.parse(fs.readFileSync(velosPath, 'utf8'));
    const velosArr = Array.isArray(velosData) ? velosData : (velosData.features || []);
    
    const leanBikes = velosArr
        .filter(v => v.commune && v.commune.toUpperCase().includes('BOULOGNE') && v.geo_shape && v.geo_shape.geometry)
        .map(v => {
            let length = v.longueur_m || (v.properties && v.properties.longueur_m) || 0;
            return {
                type: v.geo_shape.geometry.type, // 'LineString' or 'MultiLineString'
                coords: v.geo_shape.geometry.coordinates,
                length: length
            };
        });

    const output = {
        trees: leanTrees,
        bikes: leanBikes
    };

    fs.writeFileSync('C:/Users/lefeb/Documents/Projets/adj/en18ans/src/lib/geo_data.json', JSON.stringify(output));
    console.log(`Saved geo_data.json. Trees: ${leanTrees.length}, Bike Paths: ${leanBikes.length}`);
} catch(e) {
    console.error(e.message);
}
