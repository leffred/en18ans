import fs from 'fs';

const CSV_FILE = 'C:/Users/lefeb/Documents/Projets/adj/en18ans/ecoles_boulogne.csv';

const rawData = fs.readFileSync(CSV_FILE, 'utf-8');
const lines = rawData.split('\n').filter(l => l.trim().length > 0);

const studentsPerYear = {};

// Skip header
for (let i = 1; i < lines.length; i++) {
  const cols = lines[i].split(';');
  const yearStr = cols[0];
  const studentsStr = cols[17]; // "Nombre total d'élèves"
  
  if (yearStr && studentsStr) {
    const year = parseInt(yearStr);
    const students = parseFloat(studentsStr);
    if (!isNaN(year) && !isNaN(students)) {
      if (!studentsPerYear[year]) {
        studentsPerYear[year] = 0;
      }
      studentsPerYear[year] += students;
    }
  }
}

console.log("Evolution des effectifs scolaires (Total élèves 1er degré):");
const years = Object.keys(studentsPerYear).sort();
years.forEach(y => {
  console.log(`${y}: ${studentsPerYear[y]} élèves`);
});
