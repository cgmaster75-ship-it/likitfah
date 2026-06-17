const fs = require('fs');
const path = require('path');

const html = fs.readFileSync(path.join(__dirname, 'raw_check.html'), 'utf-8');

function parseSanookLotto(html) {
    const jsonLdRegex = /<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi;
    let match;
    let articleBody = null;
    
    while ((match = jsonLdRegex.exec(html)) !== null) {
        try {
            const json = JSON.parse(match[1].trim());
            if (json['@type'] === 'NewsArticle' && json.articleBody) {
                articleBody = json.articleBody;
                break;
            }
        } catch (e) {
            // Ignore
        }
    }
    
    if (!articleBody) {
        throw new Error("Could not find NewsArticle JSON-LD");
    }
    
    // Clean up HTML entities
    let cleanText = articleBody
        .replace(/&nbsp;/gi, ' ')
        .replace(/\r\n/g, '\n')
        .replace(/\r/g, '\n');
        
    // ONLY remove numbers containing commas (e.g. 6,000,000, 4,000, 20,000)
    // This is extremely safe and robust!
    cleanText = cleanText.replace(/\b\d{1,3}(?:,\d{3})+\b/g, '');

    console.log("=== Cleaned Article Body (Minimal) ===");
    console.log(cleanText.substring(0, 1000));
    
    const getNumbersAfterKeyword = (text, keyword, numDigits, count) => {
        const index = text.indexOf(keyword);
        if (index === -1) return [];
        
        // Take 1000 characters after the keyword
        const sub = text.substring(index + keyword.length, index + keyword.length + 1000);
        
        // Match numbers of specific length, using horizontal whitespace / boundaries
        const regex = new RegExp(`\\b\\d{${numDigits}}\\b`, 'g');
        const numbers = [];
        let m;
        while ((m = regex.exec(sub)) !== null) {
            numbers.push(m[0]);
            if (numbers.length === count) break;
        }
        return numbers;
    };
    
    const prize1 = getNumbersAfterKeyword(cleanText, "รางวัลที่ 1", 6, 1)[0] || '';
    const front3 = getNumbersAfterKeyword(cleanText, "เลขหน้า 3 ตัว", 3, 2);
    const back3 = getNumbersAfterKeyword(cleanText, "เลขท้าย 3 ตัว", 3, 2);
    const prize2d = getNumbersAfterKeyword(cleanText, "เลขท้าย 2 ตัว", 2, 1)[0] || '';
    
    const prize1Near = getNumbersAfterKeyword(cleanText, "รางวัลข้างเคียงรางวัลที่ 1", 6, 2);
    const prize2 = getNumbersAfterKeyword(cleanText, "รางวัลที่ 2", 6, 5);
    const prize3 = getNumbersAfterKeyword(cleanText, "รางวัลที่ 3", 6, 10);
    const prize4 = getNumbersAfterKeyword(cleanText, "รางวัลที่ 4", 6, 50);
    const prize5 = getNumbersAfterKeyword(cleanText, "รางวัลที่ 5", 6, 100);
    
    return {
        prize_1: prize1,
        prize_3digits_front1: front3[0] || '',
        prize_3digits_front2: front3[1] || '',
        prize_3digits_back1: back3[0] || '',
        prize_3digits_back2: back3[1] || '',
        prize_2digits: prize2d,
        prize_1_near: JSON.stringify(prize1Near),
        prize_2: JSON.stringify(prize2),
        prize_3: JSON.stringify(prize3),
        prize_4: JSON.stringify(prize4),
        prize_5: JSON.stringify(prize5),
    };
}

const results = parseSanookLotto(html);
console.log("\n=== Scraped Results (Minimal Clean) ===");
console.log("Prize 1:", results.prize_1);
console.log("Front 3-1:", results.prize_3digits_front1);
console.log("Front 3-2:", results.prize_3digits_front2);
console.log("Back 3-1:", results.prize_3digits_back1);
console.log("Back 3-2:", results.prize_3digits_back2);
console.log("2-digits:", results.prize_2digits);
console.log("Prize 1 Near:", results.prize_1_near);
console.log("Prize 2 Count:", JSON.parse(results.prize_2).length, JSON.parse(results.prize_2));
console.log("Prize 3 Count:", JSON.parse(results.prize_3).length, JSON.parse(results.prize_3));
console.log("Prize 4 Count:", JSON.parse(results.prize_4).length);
console.log("Prize 5 Count:", JSON.parse(results.prize_5).length);
