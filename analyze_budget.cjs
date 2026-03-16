const xlsx = require('xlsx');
const fs = require('fs');
const path = require('path');

const SOURCES_DIR = 'C:/Users/lefeb/Documents/Projets/adj/en18ans/sources';

const files = fs.readdirSync(SOURCES_DIR).filter(f => f.endsWith('.ods') && f.includes('Exercice'));

const results = [];

files.forEach(file => {
  const match = file.match(/Exercice (\d{4})/);
  if (!match) return;
  const year = match[1];
  
  const workbook = xlsx.readFile(path.join(SOURCES_DIR, file));
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const data = xlsx.utils.sheet_to_json(sheet, { header: 1 });
  
  let chargesFonctionnement = 0;
  let chargesPersonnel = 0;
  let impotsLocaux = 0;
  let dette = 0;

  for (const row of data) {
    if (!row || !row.length) continue;
    const labelCol = row[4]; // The label is usually in column index 4 (0-indexed) or nearby. Let's join the row as string to be safe.
    const rowStr = row.join(' ').toLowerCase();

    // Sometimes the value is in column 0. We remove non-breaking spaces and normal spaces for parsing.
    const valStr = String(row[0]).replace(/[\s\u00A0]/g, '');
    const val = parseInt(valStr, 10);

    if (rowStr.includes('total des charges de fonctionnement') && rowStr.includes('= b')) {
      chargesFonctionnement = val;
    }
    if (rowStr.includes('charges de personnel') && rowStr.includes('dont')) {
      chargesPersonnel = val;
    }
    if (rowStr.includes('impôts locaux') && rowStr.includes('dont')) {
      impotsLocaux = val;
    }
    if (rowStr.includes('encours total de la dette au 31')) {
      dette = val;
    }
  }
  
  results.push({
    Year: year,
    ChargesFonctionnement: chargesFonctionnement,
    ChargesPersonnel: chargesPersonnel,
    ImpotsLocaux: impotsLocaux,
    Dette: dette
  });
});

results.sort((a,b) => a.Year - b.Year);

console.log("Evolution des finances de Boulogne-Billancourt (en milliers d'euros):");
console.table(results);
