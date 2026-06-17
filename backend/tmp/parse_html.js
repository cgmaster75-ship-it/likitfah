const fs = require('fs');
const path = require('path');

const html = fs.readFileSync(path.join(__dirname, 'raw.html'), 'utf-8');

// Find all occurrences of "รางวัล" and print surrounding text
const regex = /รางวัล/g;
let match;
console.log("=== Matching 'รางวัล' ===");
let count = 0;
while ((match = regex.exec(html)) !== null && count < 30) {
    const start = Math.max(0, match.index - 50);
    const end = Math.min(html.length, match.index + 100);
    console.log(`Match ${++count}:`, html.substring(start, end).replace(/\s+/g, ' ').trim());
}

// Let's also search for typical lotto prize keys or ids
console.log("\n=== Checking common lotto IDs or class names ===");
const patterns = [
    /lotto/i,
    /prize/i,
    /runningNumber/i,
    /ตรวจหวย/
];

patterns.forEach(pat => {
    const matches = html.match(pat);
    console.log(`Pattern ${pat}:`, !!matches);
});

// Let's print some blocks where numbers are listed
// A standard lottery prize 1 is a 6-digit number. Let's find 6 digit numbers.
console.log("\n=== 6 Digit Numbers ===");
const sixDigits = html.match(/\b\d{6}\b/g);
console.log("6 digits found:", sixDigits ? [...new Set(sixDigits)].slice(0, 20) : "none");

// 2 digit numbers
console.log("\n=== 2 Digit Numbers ===");
const twoDigits = html.match(/\b\d{2}\b/g);
console.log("2 digits found (first 20 unique):", twoDigits ? [...new Set(twoDigits)].slice(0, 20) : "none");

// Let's search for the actual Prize 1 "107387" or "08" or front/back 3 digits
console.log("\n=== Specific Draw numbers (May 16, 2026: P1=107387, 2D=08, F3=091/298, B3=602/716) ===");
console.log("Contains 107387:", html.includes("107387"));
console.log("Contains '08' as full number:", html.includes("08"));
console.log("Contains 091:", html.includes("091"));
console.log("Contains 298:", html.includes("298"));
console.log("Contains 602:", html.includes("602"));
console.log("Contains 716:", html.includes("716"));

if (html.includes("107387")) {
    const idx = html.indexOf("107387");
    console.log("Around 107387:", html.substring(idx - 100, idx + 200).replace(/\s+/g, ' ').trim());
}
