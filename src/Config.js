const fs = require('fs');
const path = require('path');

const baseDir = path.join('C:', 'ProgramData', 'Piu-System');
const globalDir = path.join(baseDir, 'global');
const productsListPath = path.join(globalDir, 'productsList.json');

function createConfig() {
    if (!fs.existsSync(baseDir)) {
        fs.mkdirSync(baseDir);
        console.log(`Folder created: ${baseDir}`);
    }

    if (!fs.existsSync(globalDir)) {
        fs.mkdirSync(globalDir);
        console.log(`Folder created: ${globalDir}`);
    }

    if (!fs.existsSync(productsListPath)) {
        fs.writeFileSync(productsListPath, JSON.stringify([], null, 2));
        console.log(`File created: ${productsListPath}`);
    } else {
        console.log(`File already exists: ${productsListPath}`);
    }
}

createConfig();
