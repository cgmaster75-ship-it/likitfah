const fs = require('fs');
const path = require('path');

const html = fs.readFileSync(path.join(__dirname, 'raw.html'), 'utf-8');

console.log("=== Checking for window. or global variables ===");
const lines = html.split('\n');
lines.forEach((line, index) => {
    if (line.includes("window.") || line.includes("var lotto") || line.includes("const lotto") || line.includes("lotto_") || line.includes("lottoData")) {
        if (line.length < 500) {
            console.log(`Line ${index + 1}:`, line.trim());
        } else {
            console.log(`Line ${index + 1} (Long):`, line.substring(0, 200).trim() + "...");
        }
    }
});

// Let's print all script tags and their first 100 characters to see what's in them
console.log("\n=== All Script Tags ===");
const scriptRegex = /<script\b[^>]*>([\s\S]*?)<\/script>/gi;
let match;
let scriptIndex = 0;
while ((match = scriptRegex.exec(html)) !== null) {
    scriptIndex++;
    const content = match[1];
    const type = match[0].match(/type="([^"]+)"/) ? match[0].match(/type="([^"]+)"/)[1] : "inline";
    console.log(`Script ${scriptIndex}: type=${type}, length=${content.length}, preview=${content.substring(0, 100).replace(/\s+/g, ' ').trim()}`);
}
