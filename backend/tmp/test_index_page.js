const axios = require('axios');

async function testIndex() {
    try {
        console.log("Fetching index page...");
        const response = await axios.get('https://news.sanook.com/lotto/', {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
            }
        });
        const html = response.data;
        console.log("HTML Length:", html.length);
        
        // Find title
        const titleMatch = html.match(/<title>([\s\S]*?)<\/title>/i);
        console.log("Title:", titleMatch ? titleMatch[1].trim() : "not found");
        
        // Check for JSON-LD articleBody
        const jsonLdRegex = /<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi;
        let match;
        let articleBody = null;
        let publishDate = null;
        
        while ((match = jsonLdRegex.exec(html)) !== null) {
            try {
                const json = JSON.parse(match[1].trim());
                if (json['@type'] === 'NewsArticle') {
                    if (json.articleBody) {
                        articleBody = json.articleBody;
                    }
                    if (json.datePublished) {
                        publishDate = json.datePublished;
                    }
                }
            } catch (e) {}
        }
        
        console.log("Found NewsArticle articleBody:", !!articleBody);
        console.log("Published Date:", publishDate);
        
        if (articleBody) {
            console.log("First 200 chars of body:", articleBody.substring(0, 200).replace(/\s+/g, ' '));
        }
        
        // Can we get the date of the latest lotto from this?
        // E.g., title is "ตรวจหวย ตรวจผลสลากกินแบ่งรัฐบาล งวด 16 พฤษภาคม 2569"
        // datePublished is "2026-05-16T16:00:42+07:00"
        if (publishDate) {
            const dateObj = new Date(publishDate);
            console.log("Parsed Date Object:", dateObj);
            const d = String(dateObj.getDate()).padStart(2, '0');
            const m = String(dateObj.getMonth() + 1).padStart(2, '0');
            const y = dateObj.getFullYear();
            console.log(`CE Date: ${y}-${m}-${d}`);
            
            const yTH = y + 543;
            const ddmmyyyy = `${d}${m}${yTH}`;
            console.log(`Thai ddmmyyyy date: ${ddmmyyyy}`);
        }
    } catch (e) {
        console.error("Error:", e.message);
    }
}
testIndex();
