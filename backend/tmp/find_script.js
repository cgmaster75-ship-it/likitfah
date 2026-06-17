const fs = require('fs');
const path = require('path');

const html = fs.readFileSync(path.join(__dirname, 'raw.html'), 'utf-8');

console.log("Searching script tags containing interesting words:");
const scriptRegex = /<script\b[^>]*>([\s\S]*?)<\/script>/gi;
let match;
let scriptIndex = 0;
while ((match = scriptRegex.exec(html)) !== null) {
    scriptIndex++;
    const content = match[1];
    if (content.includes("prize") || content.includes("running") || content.includes("107387") || content.includes("08")) {
        console.log(`\n--- Script ${scriptIndex} (Length: ${content.length}) ---`);
        console.log(content.substring(0, 1000).replace(/\s+/g, ' ').trim() + "...");
        if (content.length > 1000) {
            // Check if it's JSON or has lottery data
            if (content.includes("107387")) {
                console.log("This script contains 107387!");
                // Let's write it to a file to examine
                fs.writeFileSync(path.join(__dirname, `script_${scriptIndex}.js`), content);
            }
        }
    }
}
