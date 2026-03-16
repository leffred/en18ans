const fs = require('fs');
const path = require('path');

const SOURCES_DIR = 'C:/Users/lefeb/Documents/Projets/adj/en18ans/sources';

const files = [
  'fr-en-college-effectifs-niveau-sexe-lv.json',
  'fr-en-lycee_gt-effectifs-niveau-sexe-lv.json',
  'fr-en-lycee_pro-effectifs-niveau-sexe-lv.json'
];

const results = {}; // { 'College': { 2020: 100, 2021: 150 }, 'Lycee GT': ... }

files.forEach(file => {
  const filePath = path.join(SOURCES_DIR, file);
  if (!fs.existsSync(filePath)) return;
  
  console.log(`Reading ${file} ...`);
  
  // These are huge JSON files. We'll use a streaming approach or just parse if memory allows.
  // Since they are 30-100MB, we can probably just parse them directly in Node.
  try {
    const rawData = fs.readFileSync(filePath, 'utf-8');
    const data = JSON.parse(rawData);
    
    const typeName = file.includes('college') ? 'College' : (file.includes('lycee_gt') ? 'Lycee GT' : 'Lycee Pro');
    if (!results[typeName]) results[typeName] = {};
    
    // Structure is usually an array of items. 
    // Field names might vary, looking for "nom_commune", "code_commune", "rentree_scolaire", "nombre_eleves_total" etc.
    // Let's inspect the first element to be sure.
    if (data.length > 0) {
      console.log(`First element fields for ${file}:`, Object.keys(data[0]));
      // some JSON open data puts records in `data[].fields` or directly.
      const sample = data[0].fields ? data[0].fields : data[0];
      console.log(`Sample data for ${file}:`, sample);
    }
    
    data.forEach(item => {
      // Handle both flat JSON and OpenDataSoft schema (item.fields)
      const record = item.fields ? item.fields : item;
      
      const commune = record.nom_commune || record.libelle_commune || '';
      const code = record.code_commune || record.commune_code || '';
      
      if (commune.toUpperCase().includes('BOULOGNE') || code === '92012') {
        const year = record.rentree_scolaire;
        // The total number of students can be 'nombre_eleves_total' or 'nombre_d_eleves_total' or 'effectifs' 
        const students = record.nombre_eleves_total || record.nombre_d_eleves_total || record.effectifs || record.nombre_d_eleves || 0;
        
        if (year && typeof students === 'number') {
           const parsedYear = parseInt(year.toString().substring(0, 4)); // e.g. "2020-2021" -> 2020
           if (!results[typeName][parsedYear]) results[typeName][parsedYear] = 0;
           results[typeName][parsedYear] += students;
        }
      }
    });
  } catch(e) {
    console.error(`Error parsing ${file}:`, e.message);
  }
});

console.log("\nEvolution des effectifs (Secondaire):");
for (const type in results) {
  console.log(`\n--- ${type} ---`);
  const sortedYears = Object.keys(results[type]).sort();
  sortedYears.forEach(y => {
    console.log(`${y}: ${results[type][y]} élèves`);
  });
}
