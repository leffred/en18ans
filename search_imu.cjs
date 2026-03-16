async function searchCatalog() {
    console.log("Searching catalog for 'coulée verte', 'chaleur', 'imu'...");
    const url = "https://data.iledefrance.fr/api/explore/v2.1/catalog/datasets?search=imu&limit=20";
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.results && data.results.length > 0) {
            data.results.forEach(ds => {
                console.log(`- ID: ${ds.dataset_id}`);
            });
        } else {
            console.log("No IMU datasets found.");
        }
    } catch(e) {
        console.error("Error:", e);
    }
}
searchCatalog();
