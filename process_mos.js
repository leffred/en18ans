import fs from 'fs';
import readline from 'readline';

const CSV_FILE = 'Occupation_du_sol_2025_%26_2021_en_79_Postes_de_la_r%C3%A9gion_%C3%8Ele-de-France.csv';
const INSEE_BOULOGNE = '92012';

async function processData() {
  const fileStream = fs.createReadStream(CSV_FILE);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  const aggregate2021 = {};
  const aggregate2025 = {};

  let isFirstLine = true;
  let inseeIndex = -1;
  let mos21Index = -1;
  let mos25Index = -1;
  let areaIndex = -1;

  for await (const line of rl) {
    const columns = line.split(',');

    if (isFirstLine) {
      inseeIndex = columns.indexOf('insee');
      mos21Index = columns.indexOf('mos2021');
      mos25Index = columns.indexOf('mos2025');
      areaIndex = columns.indexOf('st_areashape');
      isFirstLine = false;
      continue;
    }

    if (columns[inseeIndex] === INSEE_BOULOGNE) {
      const mos21 = columns[mos21Index];
      const mos25 = columns[mos25Index];
      const area = parseFloat(columns[areaIndex]);

      aggregate2021[mos21] = (aggregate2021[mos21] || 0) + area;
      aggregate2025[mos25] = (aggregate2025[mos25] || 0) + area;
    }
  }

  // Write aggregates to JSON
  fs.writeFileSync('boulogne_mos_raw.json', JSON.stringify({
    aggregate2021,
    aggregate2025
  }, null, 2));

  console.log('MOS Data for Boulogne has been aggregated to boulogne_mos_raw.json');
}

processData().catch(console.error);
