const xlsx = require('xlsx');

const ODS_FILE = 'C:/Users/lefeb/Documents/Projets/adj/en18ans/sources/Edition commune BOULOGNE-BILLANCOURT - Hauts-de-Seine - Exercice 2024.ods';

try {
  const workbook = xlsx.readFile(ODS_FILE);
  const sheetNames = workbook.SheetNames;
  console.log("Sheet names:", sheetNames);
  
  if (sheetNames.length > 0) {
      const firstSheet = workbook.Sheets[sheetNames[0]];
      const data = xlsx.utils.sheet_to_json(firstSheet, { header: 1 });
      
      console.log(`\nRows in first sheet (${sheetNames[0]}): ${data.length}`);
      
      // Print first 50 rows to understand structure
      for(let i=0; i<Math.min(50, data.length); i++) {
          console.log(`Row ${i}:`, data[i]);
      }
  }
} catch (e) {
  console.error("Error reading ODS:", e.message);
}
