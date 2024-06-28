const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, 'src'); // Změňte na kořenový adresář vašeho projektu

function replaceImgTags(filePath) {
  console.log(`Processing file: ${filePath}`);
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const imgTagRegex = /<img\s+([^>]*?)\s*\/?>/g;
  const newContent = fileContent.replace(imgTagRegex, (match, attributes) => {
    if (!attributes.includes('width')) {
      attributes += ' width={500}'; // Výchozí šířka
    }
    if (!attributes.includes('height')) {
      attributes += ' height={500}'; // Výchozí výška
    }
    return `<Image ${attributes} />`;
  });

  if (newContent !== fileContent) {
    const importStatement = "import Image from 'next/image';\n";
    const hasImageImport = newContent.includes(importStatement);

    const finalContent = hasImageImport ? newContent : importStatement + newContent;
    fs.writeFileSync(filePath, finalContent, 'utf8');
    console.log(`Updated ${filePath}`);
  } else {
    console.log(`No changes needed for ${filePath}`);
  }
}

function traverseDirectory(directory) {
  fs.readdirSync(directory).forEach(file => {
    const fullPath = path.join(directory, file);
    if (fs.lstatSync(fullPath).isDirectory()) {
      traverseDirectory(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.jsx')) {
      replaceImgTags(fullPath);
    }
  });
}

traverseDirectory(directoryPath);