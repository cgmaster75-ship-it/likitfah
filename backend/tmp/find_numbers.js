const fs = require('fs');
const path = require('path');

const html = fs.readFileSync(path.join(__dirname, 'raw.html'), 'utf-8');
const lines = html.split('\n');

// Let's print lines 1740 to 1840 to see the exact structure of the HTML
console.log("=== Printing lines 1740 to 1840 ===");
for (let i = 1739; i < 1840 && i < lines.length; i++) {
    console.log(`${i+1}: ${lines[i].trim()}`);
}
