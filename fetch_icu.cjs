const fs = require('fs');

async function fetchICU() {
    console.log("Fetching Îlots de Chaleur Urbains (ICU) data for Boulogne-Billancourt...");
    
    // Dataset: ilots-morphologiques-urbains-imu-2022-aleas-et-vulnerabilites-a-la-chaleur-d
    // We will query the API for records in Boulogne-Billancourt (insee: 92012 or nom: Boulogne-Billancourt)
    const url = "https://data.iledefrance.fr/api/explore/v2.1/catalog/datasets/ilots-morphologiques-urbains-imu-2022-aleas-et-vulnerabilites-a-la-chaleur-d/records?limit=100&refine=nom_com%3ABoulogne-Billancourt";
    
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        
        console.log(`Found ${data.total_count} records for Boulogne-Billancourt.`);
        
        let veryHighVulnerabilityNight = 0;
        let highVulnerabilityNight = 0;
        
        // Analyze vulnerabilities
        if (data.results && data.results.length > 0) {
            data.results.forEach(record => {
                // vulne_nuit: Vulnerability at night 
                // alea_nuit: Hazard at night
                const vulNuit = record.vulne_nuit;
                if (vulNuit === 'Très forte') veryHighVulnerabilityNight++;
                if (vulNuit === 'Forte') highVulnerabilityNight++;
            });
            
            console.log("\n--- Vulnérabilité aux vagues de chaleur (Nuit) ---");
            console.log(`Très forte vulnérabilité : ${veryHighVulnerabilityNight} îlots`);
            console.log(`Forte vulnérabilité : ${highVulnerabilityNight} îlots`);
            
            const total = data.results.length;
            const percentageHighAndVeryHigh = ((veryHighVulnerabilityNight + highVulnerabilityNight) / total * 100).toFixed(1);
            console.log(`\n% de la ville en situation de vulnérabilité forte ou très forte la nuit : ${percentageHighAndVeryHigh}%`);
            
            fs.writeFileSync('C:/Users/lefeb/Documents/Projets/adj/en18ans/sources/icu_boulogne.json', JSON.stringify(data.results, null, 2));
            console.log("Data saved to sources/icu_boulogne.json");
        } else {
            console.log("No detailed results found, trying a different dataset or query.");
        }
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

fetchICU();
