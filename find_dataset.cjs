async function searchCatalog() {
    console.log("Searching data.iledefrance.fr catalog for 'chaleur' datasets...");
    const url = "https://data.iledefrance.fr/api/explore/v2.1/catalog/datasets?search=chaleur&limit=10";
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.results && data.results.length > 0) {
            data.results.forEach(ds => {
                console.log(`- Dataset ID: ${ds.dataset_id}`);
                console.log(`  Title: ${ds.title}\n`);
            });
        } else {
            console.log("No datasets found.");
        }
    } catch(e) {
        console.error("Error:", e);
    }
}

searchCatalog();
