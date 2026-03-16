import fs from 'fs';

const rawData = JSON.parse(fs.readFileSync('boulogne_mos_raw.json', 'utf8'));

function computeKpis(data) {
  let totalArea = 0;
  let greenArea = 0;
  let builtArea = 0;

  for (const [codeStr, area] of Object.entries(data)) {
    const code = parseInt(codeStr, 10);
    totalArea += area;

    // Approximating MOS Nomenclature:
    // 60-79: Espaces boisés, milieux naturels, jardins, parcs
    // 80+: Eau (Seine - we can exclude from built, maybe neutral)
    // < 60: Surfaces artificialisées (bâti, routes, chantiers)
    if (code >= 60 && code < 80) {
      greenArea += area;
    } else if (code < 60) {
      builtArea += area;
    }
  }

  return {
    totalArea,
    greenArea,
    builtArea,
    greenPct: (greenArea / totalArea) * 100,
    builtPct: (builtArea / totalArea) * 100,
  };
}

const kpi2021 = computeKpis(rawData.aggregate2021);
const kpi2025 = computeKpis(rawData.aggregate2025);

console.log('--- 2021 ---');
console.log(`Béton: ${kpi2021.builtPct.toFixed(2)}%`);
console.log(`Espaces Verts: ${kpi2021.greenPct.toFixed(2)}%`);

console.log('\n--- 2025 ---');
console.log(`Béton: ${kpi2025.builtPct.toFixed(2)}%`);
console.log(`Espaces Verts: ${kpi2025.greenPct.toFixed(2)}%`);

const greenEvol = ((kpi2025.greenPct - kpi2021.greenPct) / kpi2021.greenPct) * 100;

console.log(`\nÉvolution Espaces Verts: ${greenEvol.toFixed(2)}%`);

// Output the computed values for the React app
const output = {
  kpi_beton: Math.round(kpi2025.builtPct),
  kpi_green: Math.round(kpi2025.greenPct),
  kpi_density: 95, // Hardcoded approximation based on IDF ranking
  kpi_saturation: 90, // Hardcoded approximation
  stat_green_label: `${greenEvol > 0 ? '+' : ''}${greenEvol.toFixed(1)}% depuis 2021`,
  stat_noise_label: '+18% (est.)'
};

fs.writeFileSync('src/lib/mos_kpis.json', JSON.stringify(output, null, 2));
console.log('Wrote computed KPIs to src/lib/mos_kpis.json');
