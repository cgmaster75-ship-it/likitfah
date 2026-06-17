const fs = require('fs');
const path = require('path');

const html = fs.readFileSync(path.join(__dirname, 'raw_check.html'), 'utf-8');

const keywords = [
    "รางวัลที่ 1", 
    "รางวัลที่ 2", 
    "รางวัลที่ 3", 
    "รางวัลที่ 4", 
    "รางวัลที่ 5", 
    "รางวัลข้างเคียงรางวัลที่ 1",
    "เลขหน้า 3 ตัว",
    "เลขท้าย 3 ตัว",
    "เลขท้าย 2 ตัว"
];

keywords.forEach(kw => {
    console.log(`\n=== Around Keyword: "${kw}" ===`);
    const idx = html.indexOf(kw);
    if (idx !== -1) {
        console.log(html.substring(idx - 150, idx + 600).replace(/\s+/g, ' ').trim() + "...");
    } else {
        console.log("NOT FOUND");
    }
});
