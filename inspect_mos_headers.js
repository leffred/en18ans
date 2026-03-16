import fs from 'fs';
import readline from 'readline';

const CSV_FILE = 'Occupation_du_sol_2025_%26_2021_en_79_Postes_de_la_r%C3%A9gion_%C3%8Ele-de-France.csv';

async function processData() {
  const fileStream = fs.createReadStream(CSV_FILE);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  let isFirstLine = true;

  for await (const line of rl) {
    if (isFirstLine) {
      console.log('Headers:', line);
      isFirstLine = false;
      continue;
    } else {
        console.log('Sample Data Line:', line);
        break; // Just need headers and one line
    }
  }
}

processData().catch(console.error);
