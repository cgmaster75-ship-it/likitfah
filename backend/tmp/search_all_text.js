const fs = require('fs');
const path = require('path');

const html = fs.readFileSync(path.join(__dirname, 'raw.html'), 'utf-8');

console.log("=== All occurrences of 'รางวัลที่' ===");
const regex = /รางวัลที่\s*\d+/g;
const matches = html.match(regex);
console.log("Matches:", matches ? [...new Set(matches)] : "none");

console.log("\n=== Checking for other awards in the page ===");
const keywords = [
    "รางวัลที่สอง", "รางวัลที่สาม", "รางวัลที่สี่", "รางวัลที่ห้า",
    "รางวัลที่ 2", "รางวัลที่ 3", "รางวัลที่ 4", "รางวัลที่ 5",
    "รางวัลข้างเคียง", "ข้างเคียง"
];
keywords.forEach(kw => {
    console.log(`Contains "${kw}":`, html.includes(kw));
});

// Let's print all <div> ids or section ids that contain "prize"
console.log("\n=== IDs containing 'prize' ===");
const idRegex = /id="([^"]*prize[^"]*)"/gi;
let m;
while ((m = idRegex.exec(html)) !== null) {
    console.log(m[1]);
}
