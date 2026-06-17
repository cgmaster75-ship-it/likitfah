const axios = require('axios');
const fs = require('fs');
const path = require('path');

async function test() {
    try {
        console.log("Fetching...");
        const response = await axios.get('https://news.sanook.com/lotto/16052569/', {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
            }
        });
        const html = response.data;
        console.log("HTML Length:", html.length);
        
        // Let's write the raw HTML to a file in tmp so we can view it
        fs.writeFileSync(path.join(__dirname, 'raw.html'), html);
        console.log("Saved raw.html successfully!");
        
        // Find some keywords
        const keywords = ["รางวัลที่ 1", "รางวัลที่ 2", "รางวัลที่ 3", "รางวัลที่ 4", "รางวัลที่ 5", "เลขท้าย 2 ตัว", "เลขท้าย 3 ตัว", "เลขหน้า 3 ตัว"];
        for (const kw of keywords) {
            console.log(`Contains "${kw}":`, html.includes(kw));
        }
    } catch (err) {
        console.error("Error:", err.message);
    }
}
test();
