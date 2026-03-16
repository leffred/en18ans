import fs from 'fs';

const arbresPath = 'C:/Users/lefeb/Documents/Projets/adj/en18ans/arbres-v2.json';
const velosPath = 'C:/Users/lefeb/Documents/Projets/adj/en18ans/les-amenagements-cyclables.json';

const getInfo = (path, name) => {
    try {
        const data = JSON.parse(fs.readFileSync(path, 'utf8'));
        console.log(`--- ${name} ---`);
        const arr = Array.isArray(data) ? data : (data.features || []);
        console.log(`Total elements: ${arr.length}`);
        
        if (arr.length > 0) {
            console.log(`Keys:`, Object.keys(arr[0]));
            if (arr[0].properties) {
                 console.log(`Properties Keys:`, Object.keys(arr[0].properties));
            }
            console.log(`Sample:`, JSON.stringify(arr[0], null, 2));
            console.log(``);
        }
    } catch (e) {
        console.error(`Error reading ${path}:`, e.message);
    }
}

getInfo(arbresPath, 'Arbres');
getInfo(velosPath, 'Aménagements Cyclables');
