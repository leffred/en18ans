import fs from 'fs';
import readline from 'readline';

const CSV_FILE = 'C:/Users/lefeb/Documents/Projets/adj/en18ans/sources/fr-en-ecoles-effectifs-nb_classes.csv';
const OUTPUT_FILE = 'C:/Users/lefeb/Documents/Projets/adj/en18ans/ecoles_boulogne.csv';

async function processData() {
  const fileStream = fs.createReadStream(CSV_FILE);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  const writeStream = fs.createWriteStream(OUTPUT_FILE);

  let isFirstLine = true;
  let linesFound = 0;

  for await (const line of rl) {
    if (isFirstLine) {
      writeStream.write(line + '\n');
      console.log('Headers:', line.substring(0, 100) + '...');
      isFirstLine = false;
      continue;
    }

    if (line.includes('BOULOGNE BILLANCOURT') || line.includes('BOULOGNE-BILLANCOURT') || line.includes('92012')) {
      writeStream.write(line + '\n');
      linesFound++;
    }
  }

  writeStream.end();
  console.log(`Extracted ${linesFound} rows for Boulogne-Billancourt to ecoles_boulogne.csv`);
}

processData().catch(console.error);
