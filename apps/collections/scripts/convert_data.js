const fs = require('fs');
const path = require('path');

const CSV_PATH = path.join(__dirname, '../neographer_export.csv');
const HTML_PATH = path.join(__dirname, '../india_post_permanent_pictorial_cancellations_registry.html');
const DATA_DIR = path.join(__dirname, '../data');

// 1. Ensure target data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Robust CSV Parser
function parseCSV(csvText) {
  const lines = [];
  let currentLine = [];
  let currentField = '';
  let inQuotes = false;
  
  for (let i = 0; i < csvText.length; i++) {
    const char = csvText[i];
    const nextChar = csvText[i + 1];
    
    if (inQuotes) {
      if (char === '"') {
        if (nextChar === '"') {
          currentField += '"';
          i++; // skip next quote
        } else {
          inQuotes = false;
        }
      } else {
        currentField += char;
      }
    } else {
      if (char === '"') {
        inQuotes = true;
      } else if (char === ',') {
        currentLine.push(currentField.trim());
        currentField = '';
      } else if (char === '\n' || char === '\r') {
        if (char === '\r' && nextChar === '\n') {
          i++; // skip \n
        }
        currentLine.push(currentField.trim());
        if (currentLine.length > 1 || currentLine[0] !== '') {
          lines.push(currentLine);
        }
        currentLine = [];
        currentField = '';
      } else {
        currentField += char;
      }
    }
  }
  
  if (currentField || currentLine.length > 0) {
    currentLine.push(currentField.trim());
    lines.push(currentLine);
  }
  
  return lines;
}

// Convert Numista CSV to JSON
function processCSV() {
  console.log('Reading Numista CSV...');
  const csvContent = fs.readFileSync(CSV_PATH, 'utf-8');
  const rows = parseCSV(csvContent);
  
  if (rows.length === 0) {
    console.error('CSV is empty or could not be parsed.');
    return;
  }
  
  const headers = rows[0];
  const items = [];
  
  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];
    if (row.length < headers.length) continue;
    
    const item = {};
    headers.forEach((header, idx) => {
      item[header] = row[idx];
    });
    
    // Normalize properties
    const typeLower = (item['Type'] || '').toLowerCase();
    let category = 'Exonumia & Tokens';
    if (typeLower.includes('coin')) {
      category = 'Coins';
    } else if (typeLower.includes('banknote') || typeLower.includes('note') || typeLower.includes('paper')) {
      category = 'Banknotes';
    } else if (typeLower.includes('medal')) {
      category = 'Medals';
    } else if (typeLower.includes('token')) {
      category = 'Tokens';
    }
    
    item._category = category;
    items.push(item);
  }
  
  // Show breakdown statistic
  const stats = {};
  items.forEach(item => {
    stats[item._category] = (stats[item._category] || 0) + 1;
  });
  console.log('Processed collection items breakdown:', stats);
  
  const outputPath = path.join(DATA_DIR, 'collection.json');
  fs.writeFileSync(outputPath, JSON.stringify(items, null, 2), 'utf-8');
  console.log(`Saved ${items.length} items to ${outputPath}`);
}

// Extract PPC data from HTML
function processHTML() {
  console.log('Reading legacy Cancellations HTML...');
  const htmlContent = fs.readFileSync(HTML_PATH, 'utf-8');
  
  // Look for the PPC_DATA variable declaration
  const startIndex = htmlContent.indexOf('const PPC_DATA = [');
  if (startIndex === -1) {
    console.error('Could not find const PPC_DATA in HTML file.');
    return;
  }
  
  // Find the end marker of the array
  const endMarker = '];';
  const restOfHtml = htmlContent.substring(startIndex);
  const endOffset = restOfHtml.indexOf(endMarker);
  
  if (endOffset === -1) {
    console.error('Could not find closing ]; of PPC_DATA in HTML file.');
    return;
  }
  
  // Extracted block (e.g. "[ ... ]")
  const arrayText = restOfHtml.substring('const PPC_DATA = '.length, endOffset + 1);
  
  // Safely parse the Javascript array text using standard function evaluation
  let ppcData = [];
  try {
    ppcData = new Function(`return ${arrayText}`)();
  } catch (err) {
    console.error('Failed to parse legacy array text via evaluation:', err.message);
    return;
  }
  
  console.log(`Extracted ${ppcData.length} pictorial cancellations.`);
  const outputPath = path.join(DATA_DIR, 'cancellations.json');
  fs.writeFileSync(outputPath, JSON.stringify(ppcData, null, 2), 'utf-8');
  console.log(`Saved cancellations to ${outputPath}`);
}

try {
  processCSV();
  processHTML();
  console.log('Data extraction complete.');
} catch (err) {
  console.error('Error during data extraction:', err);
  process.exit(1);
}
