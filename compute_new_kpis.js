import fs from 'fs';

const arbresPath = 'C:/Users/lefeb/Documents/Projets/adj/en18ans/arbres-v2.json';
const velosPath = 'C:/Users/lefeb/Documents/Projets/adj/en18ans/les-amenagements-cyclables.json';

try {
    const arbresData = JSON.parse(fs.readFileSync(arbresPath, 'utf8'));
    const arbresArr = Array.isArray(arbresData) ? arbresData : (arbresData.features || []);
    const arbresBoulogne = arbresArr.filter(t => t.commune && t.commune.toUpperCase() === 'BOULOGNE-BILLANCOURT');
    console.log(`Trees in Boulogne: ${arbresBoulogne.length}`);

    const velosData = JSON.parse(fs.readFileSync(velosPath, 'utf8'));
    const velosArr = Array.isArray(velosData) ? velosData : (velosData.features || []);
    const velosBoulogne = velosArr.filter(v => v.commune && v.commune.toUpperCase().includes('BOULOGNE'));
    
    let totalBikeMeters = 0;
    velosBoulogne.forEach(v => {
        if (v.longueur_m) {
            totalBikeMeters += v.longueur_m;
        } else if (v.properties && v.properties.longueur_m) {
            totalBikeMeters += v.properties.longueur_m;
        }
    });
    console.log(`Bike paths in Boulogne: ${(totalBikeMeters / 1000).toFixed(2)} km`);
} catch(e) {
    console.error(e.message);
}
