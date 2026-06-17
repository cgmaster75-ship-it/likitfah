const axios = require('axios');

async function testDate(ddmmyyyy) {
    try {
        console.log(`\nFetching ${ddmmyyyy}...`);
        const url = `https://news.sanook.com/lotto/check/${ddmmyyyy}/`;
        const response = await axios.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
            }
        });
        const html = response.data;
        
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
            } catch (e) {}
        }
        
        if (!articleBody) {
            console.log(`Failed to find articleBody for ${ddmmyyyy}`);
            return;
        }
        
        let cleanText = articleBody
            .replace(/&nbsp;/gi, ' ')
            .replace(/\r\n/g, '\n')
            .replace(/\r/g, '\n');
            
        cleanText = cleanText.replace(/\b\d{1,3}(?:,\d{3})+\b/g, '');
        
        const getNumbersAfterKeyword = (text, keyword, numDigits, count) => {
            const index = text.indexOf(keyword);
            if (index === -1) return [];
            const sub = text.substring(index + keyword.length, index + keyword.length + 1000);
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
        
        console.log(`Results for ${ddmmyyyy}:`);
        console.log(`  Prize 1: ${prize1}`);
        console.log(`  Front 3: ${front3.join(', ')}`);
        console.log(`  Back 3: ${back3.join(', ')}`);
        console.log(`  2-digits: ${prize2d}`);
    } catch (e) {
        console.error(`Error for ${ddmmyyyy}:`, e.message);
    }
}

async function run() {
    await testDate("02052569");
    await testDate("16042569");
    await testDate("01042569");
}
run();
