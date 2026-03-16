const fs = require('fs');
const path = require('path');

const SOURCES_DIR = 'C:/Users/lefeb/Documents/Projets/adj/en18ans/sources';

const files = [
  'fr-en-college-effectifs-niveau-sexe-lv.json',
  'fr-en-lycee_gt-effectifs-niveau-sexe-lv.json',
  'fr-en-lycee_pro-effectifs-niveau-sexe-lv.json'
];

const results = {}; 

files.forEach(file => {
  const filePath = path.join(SOURCES_DIR, file);
  if (!fs.existsSync(filePath)) return;
  
  console.log(`Reading ${file} ...`);
  const typeName = file.includes('college') ? 'College' : (file.includes('lycee_gt') ? 'Lycee GT' : 'Lycee Pro');
  if (!results[typeName]) results[typeName] = {};

  try {
    const rawData = fs.readFileSync(filePath, 'utf-8');
    const data = JSON.parse(rawData);
    
    data.forEach(item => {
      // Data contains either direct fields or item.fields
      let commune = '';
      let code = '';
      let year = '';
      let students = 0;
      
      // Some json have direct fields, some have "fields" object
      if (item.fields) {
          commune = item.fields.nom_commune || item.fields.libelle_commune || '';
          code = item.fields.code_commune || item.fields.commune_code || '';
          year = item.fields.rentree_scolaire;
          students = item.fields.nombre_eleves_total || item.fields.nombre_d_eleves_total || item.fields.effectifs || item.fields.nombre_d_eleves || 0;
      } else {
          commune = item.nom_commune || item.libelle_commune || item.commune_nom || '';
          code = item.code_commune || item.commune_code || item.code_commune_insee || '';
          year = item.rentree_scolaire || item.annee_scolaire;
          students = item.nombre_eleves_total || item.nombre_d_eleves_total || item.effectifs || item.nombre_d_eleves || item.nb_eleves || 0;
      }
      
      commune = String(commune).toUpperCase();
      
      if (commune.includes('BOULOGNE') || code === '92012') {
        if (year && typeof students === 'number') {
           const parsedYear = parseInt(String(year).substring(0, 4));
           if (!results[typeName][parsedYear]) results[typeName][parsedYear] = 0;
           results[typeName][parsedYear] += students;
        }
      }
    });
  } catch(e) {
    console.error(`Error parsing ${file}:`, e.message);
  }
});

console.log("\nEvolution des effectifs dans le secondaire à Boulogne-Billancourt:");
for (const type in results) {
  console.log(`\n--- ${type} ---`);
  const sortedYears = Object.keys(results[type]).sort();
  sortedYears.forEach(y => {
    console.log(`${y}: ${results[type][y]} élèves`);
  });
}
