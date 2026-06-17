const fs = require('fs');
const path = require('path');

const html = fs.readFileSync(path.join(__dirname, 'raw.html'), 'utf-8');

console.log("=== Checking all class names ===");
const classRegex = /class="([^"]+)"/g;
let match;
const classes = new Set();
while ((match = classRegex.exec(html)) !== null) {
    match[1].split(' ').forEach(c => classes.add(c));
}
console.log("Lotto-related classes:", Array.from(classes).filter(c => c.toLowerCase().includes("lotto")));

console.log("\n=== Checking for tables ===");
const tableRegex = /<table\b[^>]*>([\s\S]*?)<\/table>/gi;
let tableCount = 0;
while ((match = tableRegex.exec(html)) !== null) {
    tableCount++;
    console.log(`Table ${tableCount}: length=${match[0].length}`);
}

console.log("\n=== Searching for lists of prizes ===");
// Let's print out lines containing numbers that look like prize numbers
// For example, prize 2 has 5 numbers of 6 digits. Let's look for sections with many 6-digit numbers.
const blocks = html.split(/<\/div>|<\/section>/i);
console.log("Number of blocks:", blocks.length);
let printed = 0;
blocks.forEach((block, idx) => {
    const digitCount = (block.match(/\b\d{6}\b/g) || []).length;
    if (digitCount > 4 && printed < 10) {
        printed++;
        console.log(`\nBlock ${idx} (6-digit count: ${digitCount}):`);
        console.log(block.replace(/\s+/g, ' ').substring(0, 500).trim() + "...");
    }
});
