const fs = require('fs');
const path = require('path');
const db = require('../db');
const axios = require('axios');

// Helper to pause execution between translation requests
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

// Standard slugify function for English text
function slugify(text) {
    if (!text) return '';
    return text.toString().toLowerCase()
        .replace(/\s+/g, '-')           // Replace spaces with -
        .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
        .replace(/\-\-+/g, '-')         // Replace multiple - with single -
        .replace(/^-+/, '')             // Trim - from start of text
        .replace(/-+$/, '');            // Trim - from end of text
}

// Thai-friendly slugify function
function thaiSlugify(text) {
    if (!text) return '';
    return text.toString().toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\u0e00-\u0e7f\w\-]+/g, '') // Keep Thai letters, numbers, and hyphens
        .replace(/\-\-+/g, '-')
        .replace(/^-+/, '')
        .replace(/-+$/, '');
}

// Google Translate integration via public client endpoint
async function translateText(text) {
    if (!text || !text.trim()) return '';
    try {
        const url = 'https://translate.googleapis.com/translate_a/single?client=gtx&sl=th&tl=en&dt=t&q=' + encodeURIComponent(text);
        const res = await axios.get(url, { 
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
            },
            timeout: 15000 
        });
        if (res.data && res.data[0]) {
            return res.data[0].map(x => x[0]).join('');
        }
        return text;
    } catch (e) {
        console.warn(`⚠️ [Translation Warning] First try failed: ${e.message}. Retrying in 2 seconds...`);
        await delay(2000);
        try {
            const url = 'https://translate.googleapis.com/translate_a/single?client=gtx&sl=th&tl=en&dt=t&q=' + encodeURIComponent(text);
            const res = await axios.get(url, { 
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
                },
                timeout: 20000 
            });
            if (res.data && res.data[0]) {
                return res.data[0].map(x => x[0]).join('');
            }
        } catch (retryErr) {
            console.error(`❌ [Translation Error] Failed after retry: ${retryErr.message}`);
        }
        return text; // Fallback to original text
    }
}

// Translate multiple fields in a single HTTP request to avoid rate limits
async function translateBatch(arr) {
    if (!arr || arr.length === 0) return [];
    const joined = arr.map(s => String(s || '').trim()).join(' @@@ ');
    const translated = await translateText(joined);
    const splitParts = translated.split(/\s*@@@\s*/);
    
    if (splitParts.length === arr.length) {
        return splitParts;
    }
    
    // Fallback: translate individually if the delimiter split failed
    console.warn(`[Translate Batch Fallback] Expected ${arr.length} parts, got ${splitParts.length}. Translating individually...`);
    const result = [];
    for (const text of arr) {
        result.push(await translateText(text));
        await delay(150);
    }
    return result;
}

// Generate bilingual FAQs
function getFAQs(type, name, lang) {
    if (lang === 'en') {
        if (type === 'tarot') {
            return `
            <div class="mt-8 bg-slate-950/40 p-6 rounded-2xl border border-white/5 space-y-4">
                <h3 class="text-white font-bold text-lg">Frequently Asked Questions (FAQ) about ${name}</h3>
                <div>
                    <p class="text-amber-400 font-medium text-sm">Q: Is the ${name} card positive or negative in a reading?</p>
                    <p class="text-slate-400 text-xs md:text-sm">A: This card has both positive aspects and warnings, depending on the question and surrounding cards. Generally, it suggests changes or new ideas.</p>
                </div>
                <div>
                    <p class="text-amber-400 font-medium text-sm">Q: What should I do if I get this card for love?</p>
                    <p class="text-slate-400 text-xs md:text-sm">A: It is recommended to communicate openly and balance your relationship according to the card's guidance.</p>
                </div>
                <div>
                    <p class="text-amber-400 font-medium text-sm">Q: How does this card relate to career and finance?</p>
                    <p class="text-slate-400 text-xs md:text-sm">A: It often indicates financial changes or rewards from direct effort and planning, rather than pure luck.</p>
                </div>
            </div>`;
        } else if (type === 'zodiac') {
            return `
            <div class="mt-8 bg-slate-950/40 p-6 rounded-2xl border border-white/5 space-y-4">
                <h3 class="text-white font-bold text-lg">Frequently Asked Questions (FAQ) for ${name}</h3>
                <div>
                    <p class="text-amber-400 font-medium text-sm">Q: Which planet rules the ${name} sign?</p>
                    <p class="text-slate-400 text-xs md:text-sm">A: According to astrology, it is ruled by a specific planetary lord that influences its annual personality and luck.</p>
                </div>
                <div>
                    <p class="text-amber-400 font-medium text-sm">Q: What is the best way to enhance fortune for ${name}?</p>
                    <p class="text-slate-400 text-xs md:text-sm">A: Wearing lucky colors, using favorable numbers, and making merit on your birth day will enhance your energy.</p>
                </div>
            </div>`;
        } else {
            return `
            <div class="mt-8 bg-slate-950/40 p-6 rounded-2xl border border-white/5 space-y-4">
                <h3 class="text-white font-bold text-lg">Frequently Asked Questions (FAQ) about Dream Interpretation</h3>
                <div>
                    <p class="text-amber-400 font-medium text-sm">Q: Does dreaming of ${name} predict future events?</p>
                    <p class="text-slate-400 text-xs md:text-sm">A: In ancient lore, dreams convey messages or warnings about life changes. The day and time of the dream also matter.</p>
                </div>
                <div>
                    <p class="text-amber-400 font-medium text-sm">Q: How can I use the lucky numbers from this dream?</p>
                    <p class="text-slate-400 text-xs md:text-sm">A: Favorable numbers can be used to select lucky digits, phone numbers, or analyze trends according to Likit Fah statistics.</p>
                </div>
            </div>`;
        }
    } else {
        // Thai FAQs
        if (type === 'tarot') {
            return `
            <div class="mt-8 bg-slate-950/40 p-6 rounded-2xl border border-white/5 space-y-4">
                <h3 class="text-white font-bold text-lg">คำถามที่พบบ่อย (FAQ) เกี่ยวกับไพ่ ${name}</h3>
                <div>
                    <p class="text-amber-400 font-medium text-sm">Q: ไพ่ ${name} ดีหรือไม่ดีในการจับพยากรณ์?</p>
                    <p class="text-slate-400 text-xs md:text-sm">A: ไพ่ใบนี้มีทั้งมุมมองที่ดีและสิ่งที่ควรระวัง ขึ้นอยู่กับคำถามและใบอื่นๆ ร่วมด้วย โดยทั่วไปคำทำนายจะเสนอการเปลี่ยนแปลงหรือแนวคิดใหม่ๆ เสมอ</p>
                </div>
                <div>
                    <p class="text-amber-400 font-medium text-sm">Q: หากได้ไพ่ใบนี้ในเรื่องความรัก ควรทำอย่างไร?</p>
                    <p class="text-slate-400 text-xs md:text-sm">A: แนะนำให้เปิดใจพูดคุยอย่างตรงไปตรงมา และปฏิบัติตามแนวทางของสัญลักษณ์ไพ่เพื่อสร้างความสมดุลในชีวิตคู่</p>
                </div>
                <div>
                    <p class="text-amber-400 font-medium text-sm">Q: ไพ่ใบนี้เกี่ยวข้องกับโชคลาภการเงินอย่างไร?</p>
                    <p class="text-slate-400 text-xs md:text-sm">A: มักบ่งบอกถึงการเปลี่ยนแปลงทางการเงิน การได้มาจากการลงมือทำและความพยายามทางสถิติมากกว่าการพึ่งพาโชคลาภลอยๆ</p>
                </div>
            </div>`;
        } else if (type === 'zodiac') {
            return `
            <div class="mt-8 bg-slate-950/40 p-6 rounded-2xl border border-white/5 space-y-4">
                <h3 class="text-white font-bold text-lg">คำถามที่พบบ่อย (FAQ) ของชาวราศี ${name}</h3>
                <div>
                    <p class="text-amber-400 font-medium text-sm">Q: ราศี ${name} มีดาวดวงใดเป็นดาวเจ้าเรือนควบคุม?</p>
                    <p class="text-slate-400 text-xs md:text-sm">A: ตามศาสตร์โหราศาสตร์ มีอิทธิพลจากดาวเจ้าเรือนเฉพาะที่ส่งพลังด้านบุคลิกภาพและการเงินประจำปี</p>
                </div>
                <div>
                    <p class="text-amber-400 font-medium text-sm">Q: วิธีเสริมดวงช้าที่ดีที่สุดสำหรับชาวราศี ${name} คืออะไร?</p>
                    <p class="text-slate-400 text-xs md:text-sm">A: การสวมใส่เสื้อผ้าหรือเลือกใช้สีมงคลประจำราศี และหมั่นทำบุญตามวันเกิดเพื่อเสริมสร้างบารมีดวงชะตา</p>
                </div>
            </div>`;
        } else {
            return `
            <div class="mt-8 bg-slate-950/40 p-6 rounded-2xl border border-white/5 space-y-4">
                <h3 class="text-white font-bold text-lg">คำถามที่พบบ่อย (FAQ) เกี่ยวกับการทำนายฝัน</h3>
                <div>
                    <p class="text-amber-400 font-medium text-sm">Q: ฝันเห็น ${name} บอกเหตุการณ์ล่วงหน้าได้จริงไหม?</p>
                    <p class="text-slate-400 text-xs md:text-sm">A: ตามตำราโบราณ ความฝันสามารถสื่อถึงการเปลี่ยนแปลงหรือลางบอกเหตุล่วงหน้า ทั้งนี้ขึ้นอยู่กับวันและเวลาที่ฝันด้วย</p>
                </div>
                <div>
                    <p class="text-amber-400 font-medium text-sm">Q: ตัวเลขมงคลจากฝันนี้สามารถนำไปใช้อะไรได้บ้าง?</p>
                    <p class="text-slate-400 text-xs md:text-sm">A: สามารถนำไปใช้เสริมดวงชะตา เลือกเบอร์โทรศัพท์มงคล หรือวิเคราะห์ตัวเลขเด่นตามสถิติของลิขิตฟ้า</p>
                </div>
            </div>`;
        }
    }
}

// Highlight keywords based on language
function highlightKeywords(text, lang) {
    if (!text) return '';
    const keywords = lang === 'en' ? [
        'destiny', 'prediction', 'love', 'finance', 'career', 'health', 'statistics', 'auspicious', 
        'lucky', 'zodiac', 'fortune', 'caution', 'forecast', 'recommend', 'belief', 'bazi'
    ] : [
        'ดวงชะตา', 'คำทำนาย', 'ความรัก', 'การเงิน', 'การงาน', 'สุขภาพ', 'สถิติ', 'เลขมงคล', 
        'เลขเด็ด', 'ราศี', 'โชคลาภ', 'ระมัดระวัง', 'พยากรณ์', 'แนะนำ', 'ความเชื่อ', 'บาจื่อ'
    ];
    let highlighted = text;
    keywords.forEach(kw => {
        const regex = new RegExp(`\\b${kw}\\b|${kw}`, 'gi');
        highlighted = highlighted.replace(regex, match => `<strong class="text-amber-400 font-bold">${match}</strong>`);
    });
    return highlighted;
}

function getTarotImageUrl(cardId) {
    if (!cardId) return 'https://likitfah.com/img/card/Front-Cover.webp';
    const id = String(cardId).toUpperCase();
    let folder = 'Arcana';
    if (id.startsWith('W')) folder = 'Wands';
    else if (id.startsWith('C')) folder = 'Cups';
    else if (id.startsWith('S')) folder = 'Swords';
    else if (id.startsWith('P')) folder = 'Pentacles';
    
    return `https://likitfah.com/img/card/${folder}/${id}.webp`;
}

function getZodiacImageUrl(index) {
    const zodiacImages = [
        "https://images.unsplash.com/photo-1553531384-cc64ac80f931?q=80&w=600&auto=format&fit=crop", // 0 Capricorn (Goat)
        "https://images.unsplash.com/photo-1508962914676-134849a727f0?q=80&w=600&auto=format&fit=crop", // 1 Aquarius (Water pouring)
        "https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?q=80&w=600&auto=format&fit=crop", // 2 Pisces (Fish)
        "https://images.unsplash.com/photo-1516467508483-a7212febe31a?q=80&w=600&auto=format&fit=crop", // 3 Aries (Ram)
        "https://images.unsplash.com/photo-1602491453631-e2a5ad90a131?q=80&w=600&auto=format&fit=crop", // 4 Taurus (Bull)
        "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?q=80&w=600&auto=format&fit=crop", // 5 Gemini (Twins)
        "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?q=80&w=600&auto=format&fit=crop", // 6 Cancer (Crab)
        "https://images.unsplash.com/photo-1546182990-dffeafbe841d?q=80&w=600&auto=format&fit=crop", // 7 Leo (Lion)
        "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=600&auto=format&fit=crop", // 8 Virgo (Maiden)
        "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=600&auto=format&fit=crop", // 9 Libra (Scales)
        "https://images.unsplash.com/photo-1551244072-5d12893278ab?q=80&w=600&auto=format&fit=crop", // 10 Scorpio (Scorpion)
        "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?q=80&w=600&auto=format&fit=crop"  // 11 Sagittarius (Archer)
    ];
    return zodiacImages[index % 12];
}

function getBaziImageUrl(elementName, symbol) {
    const el = String(elementName || '').toLowerCase();
    const sym = String(symbol || '');
    if (el.includes('ไม้') || sym === '甲' || sym === '乙') {
        return "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=600&auto=format&fit=crop";
    } else if (el.includes('ไฟ') || sym === '丙' || sym === '丁') {
        return "https://images.unsplash.com/photo-1524135329990-07660cd5bf10?q=80&w=600&auto=format&fit=crop";
    } else if (el.includes('ดิน') || sym === '戊' || sym === '己') {
        return "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=600&auto=format&fit=crop";
    } else if (el.includes('ทอง') || el.includes('โลหะ') || sym === '庚' || sym === '辛') {
        return "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop";
    } else if (el.includes('น้ำ') || sym === '壬' || sym === '癸') {
        return "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=600&auto=format&fit=crop";
    }
    return "https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=600&auto=format&fit=crop";
}

function getDreamImageUrl(keyword, id) {
    const kw = String(keyword || '');
    if (kw.includes('งู') || kw.includes('พญานาค')) return "https://images.unsplash.com/photo-1545249390-6bdfa286032f?q=80&w=600&auto=format&fit=crop";
    if (kw.includes('ทอง') || kw.includes('เพชร') || kw.includes('มรกต') || kw.includes('พลอย') || kw.includes('สร้อย') || kw.includes('ตุ้มหู')) return "https://images.unsplash.com/photo-1589758438368-0ad531db3366?q=80&w=600&auto=format&fit=crop";
    if (kw.includes('เสือ') || kw.includes('สิงโต')) return "https://images.unsplash.com/photo-1508817628294-5a453fa0b8fb?q=80&w=600&auto=format&fit=crop";
    if (kw.includes('แมว')) return "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=600&auto=format&fit=crop";
    if (kw.includes('หมา') || kw.includes('สุนัข')) return "https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=600&auto=format&fit=crop";
    if (kw.includes('มังกร')) return "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=600&auto=format&fit=crop";
    if (kw.includes('ฟัน')) return "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=600&auto=format&fit=crop";
    if (kw.includes('น้ำ') || kw.includes('ทะเล') || kw.includes('น้ำตก') || kw.includes('น้ำท่วม')) return "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=600&auto=format&fit=crop";
    if (kw.includes('ไฟ') || kw.includes('เพลิง') || kw.includes('ไหม้')) return "https://images.unsplash.com/photo-1524135329990-07660cd5bf10?q=80&w=600&auto=format&fit=crop";
    if (kw.includes('เงิน') || kw.includes('เหรียญ') || kw.includes('ธนบัตร') || kw.includes('แบงก์') || kw.includes('กระเป๋าสตางค์')) return "https://images.unsplash.com/photo-1561414927-6d86591d0c4f?q=80&w=600&auto=format&fit=crop";
    if (kw.includes('พระ') || kw.includes('เจดีย์') || kw.includes('วัด') || kw.includes('ธูป')) return "https://images.unsplash.com/photo-1590001155093-a3c66ab0c3ff?q=80&w=600&auto=format&fit=crop";
    if (kw.includes('นก') || kw.includes('ผึ้ง') || kw.includes('ผีเสื้อ') || kw.includes('บิน')) return "https://images.unsplash.com/photo-1452570053594-1b985d6ea890?q=80&w=600&auto=format&fit=crop";
    if (kw.includes('มด') || kw.includes('แมงมุม') || kw.includes('ตุ๊กแก') || kw.includes('จิ้งจก')) return "https://images.unsplash.com/photo-1560807707-8cc77767d783?q=80&w=600&auto=format&fit=crop";
    if (kw.includes('บ้าน') || kw.includes('หลังคา') || kw.includes('เตียง') || kw.includes('โต๊ะ') || kw.includes('เก้าอี้') || kw.includes('สะพาน') || kw.includes('ประตู') || kw.includes('หน้าต่าง') || kw.includes('บันได')) return "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=600&auto=format&fit=crop";
    if (kw.includes('วัว') || kw.includes('ควาย') || kw.includes('หมู') || kw.includes('ม้า') || kw.includes('กระต่าย') || kw.includes('ไก่')) return "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?q=80&w=600&auto=format&fit=crop";
    if (kw.includes('ผลไม้') || kw.includes('ดอกไม้') || kw.includes('ทุเรียน') || kw.includes('มะพร้าว') || kw.includes('กล้วย') || kw.includes('พริก') || kw.includes('ข้าวสาร') || kw.includes('ดอกกุหลาบ') || kw.includes('ดอกบัว') || kw.includes('ต้นไม้')) return "https://images.unsplash.com/photo-1481349518771-20055b2a7b24?q=80&w=600&auto=format&fit=crop";
    if (kw.includes('ภูเขา') || kw.includes('ป่าช้า') || kw.includes('ถ้ำ') || kw.includes('แผ่นดินไหว') || kw.includes('พายุ') || kw.includes('หิมะ') || kw.includes('ทะเลทราย') || kw.includes('สุริยุปราคา') || kw.includes('จันทรุปราคา') || kw.includes('ดวงดาว')) return "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=600&auto=format&fit=crop";
    if (kw.includes('โรงพยาบาล') || kw.includes('สุขภาพ')) return "https://images.unsplash.com/photo-1538108176447-28058c3f1dec?q=80&w=600&auto=format&fit=crop";
    if (kw.includes('โรงเรียน') || kw.includes('นาฬิกา') || kw.includes('สมุด') || kw.includes('คอมพิวเตอร์') || kw.includes('โทรศัพท์')) return "https://images.unsplash.com/photo-1496181130204-755241544e35?q=80&w=600&auto=format&fit=crop";
    if (kw.includes('โลงศพ') || kw.includes('ผี') || kw.includes('ป่าช้า')) return "https://images.unsplash.com/photo-1509114397022-ed747cca3f65?q=80&w=600&auto=format&fit=crop";
    if (kw.includes('ปืน') || kw.includes('ดาบ') || kw.includes('มีด') || kw.includes('อาวุธ')) return "https://images.unsplash.com/photo-1582201942988-13e60e4556ee?q=80&w=600&auto=format&fit=crop";

    const dreamFallbacks = [
        "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?q=80&w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?q=80&w=600&auto=format&fit=crop"
    ];

    const numId = parseInt(id) || 0;
    return dreamFallbacks[numId % dreamFallbacks.length];
}

// HTML static page template generator
function getHtmlTemplate(title, description, category, imgUrl, contentHtml, schemaJson, filename, lang, alternateFilename) {
    const isEn = lang === 'en';
    const siteTitle = isEn ? `${title} | Likit Fah` : `${title} | ลิขิตฟ้า (Likit Fah)`;
    const pageCategory = isEn ? (category === 'ความหมายไพ่ยิปซี' ? 'Tarot Card Meaning' : 
                                  category === 'ดวงชะตาราศีไทย' ? 'Thai Zodiac Horoscope' :
                                  category === 'ดวงชะตาราศีตะวันตก' ? 'Western Zodiac Sign' :
                                  category === 'ศาสตร์ดวงจีนบาจื่อ' ? 'Chinese Bazi Destiny' : 'Dream Interpretation') : category;
    
    const navHome = isEn ? 'Home' : 'หน้าหลัก';
    const navBlog = isEn ? 'Articles' : 'บทความ';
    const readTime = isEn ? '5 min read' : 'ใช้เวลาอ่าน 5 นาที';
    const readStat = isEn ? 'Extracted from premium stats' : 'ดึงจากสถิติพรีเมียม';
    const recommendation = isEn ? 'Recommended For You' : 'แนะนำสำหรับคุณ';

    const hreflang = isEn ? 'th' : 'en';
    const altUrl = `../../blog/articles/${alternateFilename}`;

    return `<!DOCTYPE html>
<html lang="${lang}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${siteTitle}</title>
    <meta name="description" content="${description}">
    <meta name="keywords" content="${pageCategory}, Likit Fah, Horoscope, Numbers, Oracle">
    
    <!-- SEO Multilingual Alternates -->
    <link rel="alternate" hreflang="${hreflang}" href="${altUrl}">
    <link rel="alternate" hreflang="x-default" href="${isEn ? altUrl : `../../blog/articles/${filename}`}">

    <!-- Speed Optimization Meta -->
    <link rel="preconnect" href="https://cdn.tailwindcss.com">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link rel="preconnect" href="https://cdnjs.cloudflare.com">

    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@500;700;900&family=Prompt:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">

    <style>
        :root {
            --navy-dark: #02040F;
            --gold-primary: #D4AF37;
        }
        body {
            background-color: var(--navy-dark);
            background-image: 
                radial-gradient(circle at 50% 0%, rgba(212, 175, 55, 0.05) 0%, transparent 50%),
                url('https://www.transparenttextures.com/patterns/stardust.png');
            color: #e2e8f0;
            font-family: 'Prompt', sans-serif;
        }
        .gold-gradient-text {
            background: linear-gradient(to right, #F3E5AB, var(--gold-primary), #996515);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        .article-body p {
            margin-bottom: 1.5rem;
            line-height: 1.8;
            color: #cbd5e1;
            font-weight: 300;
        }
        /* Bilingual CSS hiding rules */
        [lang="th"] .lang-en { display: none !important; }
        [lang="en"] .lang-th { display: none !important; }
    </style>

    <!-- SEO Schema.org JSON-LD -->
    <script type="application/ld+json">
    ${JSON.stringify(schemaJson, null, 2)}
    </script>
</head>
<body class="min-h-screen flex flex-col pb-12">

    <!-- Global Top Header Component loaded via header.js -->
    <script src="../../components/header.js"></script>

    <div class="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8 relative mt-16">
        
        <!-- Side Left Ad Column (Desktop only) -->
        <aside class="hidden lg:block lg:col-span-2 sticky top-24 h-[600px] text-center">
            <div class="text-[9px] text-slate-600 mb-2 uppercase tracking-widest lang-th">โฆษณา</div>
            <div class="text-[9px] text-slate-600 mb-2 uppercase tracking-widest lang-en">Advertisement</div>
            <ins class="adsbygoogle"
                 style="display:block"
                 data-ad-client="ca-pub-4506936315719674"
                 data-ad-slot="5799927093"
                 data-ad-format="auto"
                 data-full-width-responsive="true"></ins>
        </aside>

        <!-- Main Article Column -->
        <main class="col-span-1 lg:col-span-8 bg-[#111827]/40 border border-white/10 rounded-3xl p-6 md:p-10 shadow-2xl backdrop-blur-md">
            
            <nav class="text-xs text-slate-400 mb-6 flex items-center gap-2">
                <a href="../../index.html" class="hover:text-amber-400">${navHome}</a>
                <i class="fa-solid fa-chevron-right text-[8px]"></i>
                <a href="../../blog.html" class="hover:text-amber-400">${navBlog}</a>
                <i class="fa-solid fa-chevron-right text-[8px]"></i>
                <span class="text-slate-300 truncate">${title}</span>
            </nav>

            <article class="article-body">
                <h1 class="text-2xl md:text-4xl font-extrabold text-white mb-6 leading-tight font-serif gold-gradient-text tracking-wide">${title}</h1>
                
                <div class="flex flex-wrap items-center gap-4 text-xs text-slate-400 border-b border-white/5 pb-6 mb-8">
                    <span><i class="fa-solid fa-folder-open mr-1 text-amber-500"></i> ${pageCategory}</span>
                    <span><i class="fa-solid fa-clock mr-1"></i> ${readTime}</span>
                    <span><i class="fa-solid fa-eye mr-1"></i> ${readStat}</span>
                </div>

                <!-- Featured Image -->
                <div class="w-full rounded-2xl overflow-hidden mb-8 border border-white/10 shadow-xl max-h-[400px] bg-slate-950/80 flex items-center justify-center">
                    <img src="${imgUrl}" alt="${title}" class="w-full h-full ${category === 'ความหมายไพ่ยิปซี' ? 'object-contain max-h-[400px]' : 'object-cover'}" loading="lazy">
                </div>

                <!-- Content Body -->
                <div class="text-sm md:text-base">
                    ${contentHtml}
                </div>

                <!-- Multiplex Ad at the bottom of the article -->
                <div class="mt-12 pt-8 border-t border-white/10">
                    <h3 class="text-xs uppercase tracking-widest text-slate-500 font-bold mb-4">${recommendation}</h3>
                    <ins class="adsbygoogle"
                          style="display:block"
                          data-ad-format="autorelaxed"
                          data-ad-client="ca-pub-4506936315719674"
                          data-ad-slot="4209230947"></ins>
                </div>

            </article>
        </main>

        <!-- Side Right Ad Column (Desktop only) -->
        <aside class="hidden lg:block lg:col-span-2 sticky top-24 h-[600px] text-center">
            <div class="text-[9px] text-slate-600 mb-2 uppercase tracking-widest lang-th">โฆษณา</div>
            <div class="text-[9px] text-slate-600 mb-2 uppercase tracking-widest lang-en">Advertisement</div>
            <ins class="adsbygoogle"
                 style="display:block"
                 data-ad-client="ca-pub-4506936315719674"
                 data-ad-slot="6455579395"
                 data-ad-format="auto"
                 data-full-width-responsive="true"></ins>
        </aside>

    </div>

    <!-- Global Footer Element -->
    <div id="likitfah-footer" class="mt-12"></div>

    <!-- Scripts -->
    <script src="../../components/footer.js"></script>
    <script src="../../components/navbar.js"></script>

    <!-- AdSense Load/Execute -->
    <script>
        document.addEventListener("DOMContentLoaded", () => {
            // Load AdSense main library if not present
            if (!document.querySelector('script[src*="adsbygoogle.js"]')) {
                const adScript = document.createElement('script');
                adScript.async = true;
                adScript.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4506936315719674";
                adScript.setAttribute("crossorigin", "anonymous");
                document.head.appendChild(adScript);
            }
            // Push all adsbygoogle elements on page
            const adUnits = document.querySelectorAll('.adsbygoogle:not([data-adsbygoogle-status])');
            adUnits.forEach(() => {
                try { (window.adsbygoogle = window.adsbygoogle || []).push({}); } catch(e) {}
            });
        });
    </script>
</body>
</html>`;
}

async function run() {
    const blogDir = path.join(__dirname, '../../frontend/blog');
    const articlesDir = path.join(blogDir, 'articles');
    
    // Create folders if they do not exist
    if (!fs.existsSync(blogDir)) fs.mkdirSync(blogDir, { recursive: true });
    if (!fs.existsSync(articlesDir)) fs.mkdirSync(articlesDir, { recursive: true });

    // CLEAN OUT existing html files in articles directory to prevent orphans
    console.log("🧹 ล้างไฟล์บทความเดิมที่หมดอายุในโฟลเดอร์...");
    const files = fs.readdirSync(articlesDir);
    for (const file of files) {
        if (file.endsWith('.html')) {
            fs.unlinkSync(path.join(articlesDir, file));
        }
    }

    const articlesList = [];

    console.log("🚀 [Script-Generator] เริ่มต้นเชื่อมต่อฐานข้อมูลเพื่อดึงข้อมูลสองภาษา...");

    try {
        // 1. ไพ่ยิปซี (Tarot Cards) - 28 บทความ
        console.log("📥 ดึงข้อมูลไพ่ยิปซี...");
        const [tarotRows] = await db.query("SELECT * FROM tarot_cards_premium LIMIT 28");
        for (const r of tarotRows) {
            const cleanNameEn = slugify(r.name_en);
            const thaiFilename = `tarot-${cleanNameEn}-meaning.html`;
            const engFilename = `tarot-${cleanNameEn}-meaning-en.html`;

            const thaiTitle = `ความหมายไพ่ยิปซีพรีเมียม: ไพ่ ${r.name_en} (${r.name_th}) เจาะลึกคำทำนาย`;
            const thaiDesc = `ศึกษาประวัติ ความลับ และคำทำนายพยากรณ์ของไพ่ ${r.name_en} (${r.name_th}) ทั้งด้านความรัก การเงิน การงาน และความหมายหัวกลับอย่างละเอียด`;
            const imgUrl = getTarotImageUrl(r.card_id);
            
            // Build Thai Article
            const thaiContent = `
                <p>ไพ่ <strong>${r.name_en} (${r.name_th})</strong> เป็นหนึ่งในสัญลักษณ์ที่มีความลึกลับและอิทธิพลสูงในศาสตร์การพยากรณ์ไพ่ยิปซี โดยสถิติความเชื่อระบุว่าพลังงานของไพ่ใบนี้มักเชื่อมโยงกับธาตุ <strong>${r.element || 'ลม'}</strong> และมีสีมงคลประจำไพ่คือ <strong>${r.color_theme || 'ทอง'}</strong></p>
                
                <h2 class="text-xl font-bold text-white mt-6 mb-3"><i class="fa-solid fa-book-open text-amber-500 mr-2"></i> ความหมายทั่วไปและการพยากรณ์ชะตา</h2>
                <p>${highlightKeywords(r.meaning_general, 'th')}</p>
                
                <h2 class="text-xl font-bold text-white mt-6 mb-3"><i class="fa-solid fa-heart text-amber-500 mr-2"></i> คำทำนายด้านความรักและความสัมพันธ์</h2>
                <p>${highlightKeywords(r.meaning_love || 'ความสัมพันธ์ที่มั่นคงและอาศัยการพูดคุยที่สุภาพเพื่อสร้างความเข้าใจที่ยั่งยืน', 'th')}</p>
                
                <h2 class="text-xl font-bold text-white mt-6 mb-3"><i class="fa-solid fa-briefcase text-amber-500 mr-2"></i> คำทำนายด้านการงานและการเงิน</h2>
                <p>${highlightKeywords(r.meaning_work_finance || 'การเงินมั่นคงและมีสถิติการเติบโตของรายได้ที่ดีขึ้นอย่างต่อเนื่อง', 'th')}</p>
                
                <h2 class="text-xl font-bold text-white mt-6 mb-3"><i class="fa-solid fa-heart-pulse text-amber-500 mr-2"></i> คำทำนายด้านสุขภาพร่างกาย</h2>
                <p>${highlightKeywords(r.meaning_health || 'ควรดูแลรักษาสุขภาพอย่างเหมาะสมและไม่ประมาทในการดำเนินชีวิตประจำวัน', 'th')}</p>

                <h2 class="text-xl font-bold text-white mt-6 mb-3"><i class="fa-solid fa-rotate text-amber-500 mr-2"></i> ความหมายในตำแหน่งไพ่หัวกลับ (Reversed)</h2>
                <p>${highlightKeywords(r.meaning_reversed || 'บ่งบอกถึงความระมัดระวังในเรื่องอารมณ์และสิ่งกระตุ้นภายนอก', 'th')}</p>

                <h2 class="text-xl font-bold text-white mt-6 mb-3"><i class="fa-solid fa-star text-amber-500 mr-2"></i> คำแนะนำและข้อคิดจากไพ่ (Advice)</h2>
                <p>${highlightKeywords(r.advice || 'จงเชื่อมั่นในเป้าหมายและการทำงานด้วยความรอบคอบประณีต', 'th')}</p>

                ${getFAQs('tarot', r.name_th, 'th')}
            `;

            const thaiSchema = {
                "@context": "https://schema.org",
                "@type": "BlogPosting",
                "headline": thaiTitle,
                "description": thaiDesc,
                "image": imgUrl,
                "author": { "@type": "Organization", "name": "Likit Fah" },
                "publisher": { "@type": "Organization", "name": "Likit Fah" },
                "datePublished": new Date().toISOString()
            };

            const thaiHtml = getHtmlTemplate(thaiTitle, thaiDesc, "ความหมายไพ่ยิปซี", imgUrl, thaiContent, thaiSchema, thaiFilename, 'th', engFilename);
            fs.writeFileSync(path.join(articlesDir, thaiFilename), thaiHtml, 'utf8');

            articlesList.push({
                title: thaiTitle,
                desc: thaiDesc,
                category: "ความหมายไพ่ยิปซี",
                imgUrl,
                url: `blog/articles/${thaiFilename}`,
                lang: 'th',
                altUrl: `blog/articles/${engFilename}`
            });

            // Translate fields for English Article
            console.log(`  └─ แปลไพ่ [${r.name_en}]...`);
            const translatedFields = await translateBatch([
                r.meaning_general,
                r.meaning_love || 'A stable relationship that relies on polite communication to build lasting understanding.',
                r.meaning_work_finance || 'Financial stability and showing continuous income growth statistics.',
                r.meaning_health || 'Should take proper care of health and not be reckless in daily life.',
                r.meaning_reversed || 'Indicates caution regarding emotions and external stimuli.',
                r.advice || 'Believe in your goals and work with neatness and prudence.'
            ]);
            await delay(300);

            const [engGeneral, engLove, engWork, engHealth, engReversed, engAdvice] = translatedFields;
            const engTitle = `Premium Tarot Card Meaning: ${r.name_en} Deep Interpretation`;
            const engDesc = `Explore the history, secrets, and forecast of the ${r.name_en} card for love, career, finance, health, advice, and reversed meanings.`;
            
            const engContent = `
                <p>The <strong>${r.name_en}</strong> card is one of the most mysterious and influential symbols in Tarot prediction. Statistically, the energy of this card is linked to the <strong>${r.element === 'ดิน' ? 'Earth' : r.element === 'น้ำ' ? 'Water' : r.element === 'ลม' ? 'Air' : r.element === 'ไฟ' ? 'Fire' : 'Air'}</strong> element, with a lucky color theme of <strong>${r.color_theme || 'Gold'}</strong>.</p>
                
                <h2 class="text-xl font-bold text-white mt-6 mb-3"><i class="fa-solid fa-book-open text-amber-500 mr-2"></i> General Meaning and Life Forecast</h2>
                <p>${highlightKeywords(engGeneral, 'en')}</p>
                
                <h2 class="text-xl font-bold text-white mt-6 mb-3"><i class="fa-solid fa-heart text-amber-500 mr-2"></i> Love and Relationship Forecast</h2>
                <p>${highlightKeywords(engLove, 'en')}</p>
                
                <h2 class="text-xl font-bold text-white mt-6 mb-3"><i class="fa-solid fa-briefcase text-amber-500 mr-2"></i> Career and Finance Forecast</h2>
                <p>${highlightKeywords(engWork, 'en')}</p>
                
                <h2 class="text-xl font-bold text-white mt-6 mb-3"><i class="fa-solid fa-heart-pulse text-amber-500 mr-2"></i> Health and Wellbeing</h2>
                <p>${highlightKeywords(engHealth, 'en')}</p>

                <h2 class="text-xl font-bold text-white mt-6 mb-3"><i class="fa-solid fa-rotate text-amber-500 mr-2"></i> Reversed Position Meaning</h2>
                <p>${highlightKeywords(engReversed, 'en')}</p>

                <h2 class="text-xl font-bold text-white mt-6 mb-3"><i class="fa-solid fa-star text-amber-500 mr-2"></i> Advice and Wisdom from the Card</h2>
                <p>${highlightKeywords(engAdvice, 'en')}</p>

                ${getFAQs('tarot', r.name_en, 'en')}
            `;

            const engSchema = {
                "@context": "https://schema.org",
                "@type": "BlogPosting",
                "headline": engTitle,
                "description": engDesc,
                "image": imgUrl,
                "author": { "@type": "Organization", "name": "Likit Fah" },
                "publisher": { "@type": "Organization", "name": "Likit Fah" },
                "datePublished": new Date().toISOString()
            };

            const engHtml = getHtmlTemplate(engTitle, engDesc, "ความหมายไพ่ยิปซี", imgUrl, engContent, engSchema, engFilename, 'en', thaiFilename);
            fs.writeFileSync(path.join(articlesDir, engFilename), engHtml, 'utf8');

            articlesList.push({
                title: engTitle,
                desc: engDesc,
                category: "ความหมายไพ่ยิปซี",
                imgUrl,
                url: `blog/articles/${engFilename}`,
                lang: 'en',
                altUrl: `blog/articles/${thaiFilename}`
            });
        }

        // 2. ราศีไทย (Thai Zodiac) - 12 บทความ
        console.log("📥 ดึงข้อมูลราศีไทย...");
        const [thaiZodiacRows] = await db.query("SELECT * FROM thai_zodiac_premium LIMIT 12");
        for (const r of thaiZodiacRows) {
            const rawEngZodiac = r.zodiac_name.split('(')[1].replace(')', '').trim();
            const cleanZodiacName = slugify(rawEngZodiac);
            const thaiSlugName = thaiSlugify(r.zodiac_name.split(' ')[0]);
            
            const thaiFilename = `thai-zodiac-${thaiSlugName}-${cleanZodiacName}.html`;
            const engFilename = `thai-zodiac-${cleanZodiacName}-en.html`;

            const thaiTitle = `เจาะลึกดวงชะตาและลักษณะนิสัยของราศี ${r.zodiac_name} ประจำปี 2569-2570`;
            const thaiDesc = `ศึกษาลักษณะเด่น จุดแข็ง จุดอ่อน ดวงความรัก การเงิน การงาน และวิธีเสริมดวงชะตาตามวันเกิดของชาวราศี ${r.zodiac_name}`;
            const imgUrl = getZodiacImageUrl(r.id);
            
            const thaiContent = `
                <p>ชาวราศี <strong>${r.zodiac_name}</strong> จัดเป็นผู้อยู่ภายใต้การปกครองของธาตุ <strong>${r.element}</strong> และมีดาวเคราะห์ควบคุมคือดาว <strong>${r.ruler_planet}</strong> ส่งผลต่อวิสัยทัศน์และการมองโลก</p>
                
                <h2 class="text-xl font-bold text-white mt-6 mb-3"><i class="fa-solid fa-gem text-amber-500 mr-2"></i> จุดเด่นและลักษณะนิสัยเชิงบวก</h2>
                <p>${highlightKeywords(r.trait_strengths, 'th')}</p>
                
                <h2 class="text-xl font-bold text-white mt-6 mb-3"><i class="fa-solid fa-triangle-exclamation text-amber-500 mr-2"></i> จุดอ่อนที่ควรแก้ไขและระวัง</h2>
                <p>${highlightKeywords(r.trait_weaknesses, 'th')}</p>
                
                <h2 class="text-xl font-bold text-white mt-6 mb-3"><i class="fa-solid fa-briefcase text-amber-500 mr-2"></i> ดวงชะตาการงานและการเงิน</h2>
                <p>${highlightKeywords(r.career_finance, 'th')}</p>
                
                <h2 class="text-xl font-bold text-white mt-6 mb-3"><i class="fa-solid fa-heart text-amber-500 mr-2"></i> ดวงความรักและความสัมพันธ์</h2>
                <p>${highlightKeywords(r.love_relationships, 'th')}</p>

                <h2 class="text-xl font-bold text-white mt-6 mb-3"><i class="fa-solid fa-wand-magic-sparkles text-amber-500 mr-2"></i> การเสริมดวงนำโชค</h2>
                <p>สิ่งนำโชคสำหรับคุณประกอบด้วย สีมงคลเสริมดวงคือ <strong>${r.lucky_colors}</strong> และมีเลขเด็ดนำโชคประจำราศีคือเลข <strong>${r.lucky_numbers}</strong></p>

                ${getFAQs('zodiac', r.zodiac_name, 'th')}
            `;

            const thaiSchema = {
                "@context": "https://schema.org",
                "@type": "BlogPosting",
                "headline": thaiTitle,
                "description": thaiDesc,
                "image": imgUrl,
                "author": { "@type": "Organization", "name": "Likit Fah" },
                "publisher": { "@type": "Organization", "name": "Likit Fah" },
                "datePublished": new Date().toISOString()
            };

            const thaiHtml = getHtmlTemplate(thaiTitle, thaiDesc, "ดวงชะตาราศีไทย", imgUrl, thaiContent, thaiSchema, thaiFilename, 'th', engFilename);
            fs.writeFileSync(path.join(articlesDir, thaiFilename), thaiHtml, 'utf8');

            articlesList.push({
                title: thaiTitle,
                desc: thaiDesc,
                category: "ดวงชะตาราศีไทย",
                imgUrl,
                url: `blog/articles/${thaiFilename}`,
                lang: 'th',
                altUrl: `blog/articles/${engFilename}`
            });

            // Translate for English
            console.log(`  └─ แปลราศีไทย [${rawEngZodiac}]...`);
            const translatedFields = await translateBatch([
                r.trait_strengths,
                r.trait_weaknesses,
                r.career_finance,
                r.love_relationships,
                r.ruler_planet,
                r.lucky_colors
            ]);
            await delay(300);

            const [engStrengths, engWeaknesses, engCareer, engLove, engRuler, engColors] = translatedFields;
            const engTitle = `In-depth Horoscope and Traits of ${rawEngZodiac} Sign (2026-2027)`;
            const engDesc = `Discover the positive traits, weaknesses, love forecast, career path, and lucky remedies for ${rawEngZodiac} zodiac sign.`;
            
            const engElement = r.element === 'ดิน' ? 'Earth' : r.element === 'น้ำ' ? 'Water' : r.element === 'ลม' ? 'Air' : r.element === 'ไฟ' ? 'Fire' : 'Air';

            const engContent = `
                <p>People of the <strong>${rawEngZodiac}</strong> sign are governed by the <strong>${engElement}</strong> element and ruled by <strong>${engRuler}</strong>, which strongly impacts their core vision and approach to life.</p>
                
                <h2 class="text-xl font-bold text-white mt-6 mb-3"><i class="fa-solid fa-gem text-amber-500 mr-2"></i> Key Strengths and Favorable Traits</h2>
                <p>${highlightKeywords(engStrengths, 'en')}</p>
                
                <h2 class="text-xl font-bold text-white mt-6 mb-3"><i class="fa-solid fa-triangle-exclamation text-amber-500 mr-2"></i> Weaknesses and Warnings</h2>
                <p>${highlightKeywords(engWeaknesses, 'en')}</p>
                
                <h2 class="text-xl font-bold text-white mt-6 mb-3"><i class="fa-solid fa-briefcase text-amber-500 mr-2"></i> Career Path and Financial Forecast</h2>
                <p>${highlightKeywords(engCareer, 'en')}</p>
                
                <h2 class="text-xl font-bold text-white mt-6 mb-3"><i class="fa-solid fa-heart text-amber-500 mr-2"></i> Love, Family and Relationships</h2>
                <p>${highlightKeywords(engLove, 'en')}</p>

                <h2 class="text-xl font-bold text-white mt-6 mb-3"><i class="fa-solid fa-wand-magic-sparkles text-amber-500 mr-2"></i> Lucky Guide and Enhancers</h2>
                <p>Your astrological remedies include: Favorable colors: <strong>${engColors}</strong> and the lucky numbers: <strong>${r.lucky_numbers}</strong>.</p>

                ${getFAQs('zodiac', rawEngZodiac, 'en')}
            `;

            const engSchema = {
                "@context": "https://schema.org",
                "@type": "BlogPosting",
                "headline": engTitle,
                "description": engDesc,
                "image": imgUrl,
                "author": { "@type": "Organization", "name": "Likit Fah" },
                "publisher": { "@type": "Organization", "name": "Likit Fah" },
                "datePublished": new Date().toISOString()
            };

            const engHtml = getHtmlTemplate(engTitle, engDesc, "ดวงชะตาราศีไทย", imgUrl, engContent, engSchema, engFilename, 'en', thaiFilename);
            fs.writeFileSync(path.join(articlesDir, engFilename), engHtml, 'utf8');

            articlesList.push({
                title: engTitle,
                desc: engDesc,
                category: "ดวงชะตาราศีไทย",
                imgUrl,
                url: `blog/articles/${engFilename}`,
                lang: 'en',
                altUrl: `blog/articles/${thaiFilename}`
            });
        }

        // 3. ราศีตะวันตก (Western Zodiac) - 12 บทความ
        console.log("📥 ดึงข้อมูลราศีตะวันตก...");
        const [westernRows] = await db.query("SELECT * FROM western_zodiac_premium LIMIT 12");
        for (const r of westernRows) {
            const rawEngZodiac = r.zodiac_name.split('(')[1].replace(')', '').trim();
            const cleanZodiacName = slugify(rawEngZodiac);
            const thaiSlugName = thaiSlugify(r.zodiac_name.split(' ')[0]);

            const thaiFilename = `western-zodiac-${thaiSlugName}-${cleanZodiacName}.html`;
            const engFilename = `western-zodiac-${cleanZodiacName}-en.html`;

            const thaiTitle = `เจาะลึกจิตวิทยาและตัวตนที่แท้จริงของราศี ${r.zodiac_name} (Zodiac Energy)`;
            const thaiDesc = `วิเคราะห์ขั้วพลังงาน จิตวิทยา ความปรารถนาลึกๆ เงามืด และข้อแนะนำการพัฒนาตนเองของราศี ${r.zodiac_name} ตามศาสตร์สถิติจักรราศีตะวันตก`;
            const imgUrl = getZodiacImageUrl(r.id);
            
            const thaiContent = `
                <p>ในจิตวิทยาและการพยากรณ์ตะวันตก ราศี <strong>${r.zodiac_name}</strong> ถูกจัดประเภทอยู่ในกลุ่ม <strong>${r.modality}</strong> ซึ่งมีแรงขับเคลื่อนเฉพาะในการแสดงออกและเป้าหมาย</p>
                
                <h2 class="text-xl font-bold text-white mt-6 mb-3"><i class="fa-solid fa-compass text-amber-500 mr-2"></i> ความปรารถนาสูงสุดและตัวตนด้านบวก</h2>
                <p>${highlightKeywords(r.core_desire, 'th')}</p>
                
                <h2 class="text-xl font-bold text-white mt-6 mb-3"><i class="fa-solid fa-moon text-amber-500 mr-2"></i> ตัวตนด้านมืดและสิ่งที่เป็นอุปสรรค (Shadow Self)</h2>
                <p>${highlightKeywords(r.shadow_self, 'th')}</p>
                
                <h2 class="text-xl font-bold text-white mt-6 mb-3"><i class="fa-solid fa-arrow-up-right-dots text-amber-500 mr-2"></i> ข้อแนะนำสำหรับการพัฒนาตนเองและการเติบโต</h2>
                <p>${highlightKeywords(r.growth_advice, 'th')}</p>

                ${getFAQs('zodiac', r.zodiac_name, 'th')}
            `;

            const thaiSchema = {
                "@context": "https://schema.org",
                "@type": "BlogPosting",
                "headline": thaiTitle,
                "description": thaiDesc,
                "image": imgUrl,
                "author": { "@type": "Organization", "name": "Likit Fah" },
                "publisher": { "@type": "Organization", "name": "Likit Fah" },
                "datePublished": new Date().toISOString()
            };

            const thaiHtml = getHtmlTemplate(thaiTitle, thaiDesc, "ดวงชะตาราศีตะวันตก", imgUrl, thaiContent, thaiSchema, thaiFilename, 'th', engFilename);
            fs.writeFileSync(path.join(articlesDir, thaiFilename), thaiHtml, 'utf8');

            articlesList.push({
                title: thaiTitle,
                desc: thaiDesc,
                category: "ดวงชะตาราศีตะวันตก",
                imgUrl,
                url: `blog/articles/${thaiFilename}`,
                lang: 'th',
                altUrl: `blog/articles/${engFilename}`
            });

            // Translate for English
            console.log(`  └─ แปลราศีตะวันตก [${rawEngZodiac}]...`);
            const translatedFields = await translateBatch([
                r.modality,
                r.core_desire,
                r.shadow_self,
                r.growth_advice
            ]);
            await delay(300);

            const [engModality, engDesire, engShadow, engGrowth] = translatedFields;
            const engTitle = `Psychological Analysis and Frequencies of ${rawEngZodiac} Sign`;
            const engDesc = `Analyse the core desire, zodiac modality, shadow self, and personal growth guidelines for ${rawEngZodiac} according to Western astrology.`;

            const engContent = `
                <p>In Western psychological astrology, the <strong>${rawEngZodiac}</strong> sign is classified under the <strong>${engModality}</strong> modality, providing a distinct drive for their life goals and self-expression.</p>
                
                <h2 class="text-xl font-bold text-white mt-6 mb-3"><i class="fa-solid fa-compass text-amber-500 mr-2"></i> Core Desires and Favorable Personality traits</h2>
                <p>${highlightKeywords(engDesire, 'en')}</p>
                
                <h2 class="text-xl font-bold text-white mt-6 mb-3"><i class="fa-solid fa-moon text-amber-500 mr-2"></i> The Shadow Self and Astrological Obstacles</h2>
                <p>${highlightKeywords(engShadow, 'en')}</p>
                
                <h2 class="text-xl font-bold text-white mt-6 mb-3"><i class="fa-solid fa-arrow-up-right-dots text-amber-500 mr-2"></i> Self-Development and Growth Guidelines</h2>
                <p>${highlightKeywords(engGrowth, 'en')}</p>

                ${getFAQs('zodiac', rawEngZodiac, 'en')}
            `;

            const engSchema = {
                "@context": "https://schema.org",
                "@type": "BlogPosting",
                "headline": engTitle,
                "description": engDesc,
                "image": imgUrl,
                "author": { "@type": "Organization", "name": "Likit Fah" },
                "publisher": { "@type": "Organization", "name": "Likit Fah" },
                "datePublished": new Date().toISOString()
            };

            const engHtml = getHtmlTemplate(engTitle, engDesc, "ดวงชะตาราศีตะวันตก", imgUrl, engContent, engSchema, engFilename, 'en', thaiFilename);
            fs.writeFileSync(path.join(articlesDir, engFilename), engHtml, 'utf8');

            articlesList.push({
                title: engTitle,
                desc: engDesc,
                category: "ดวงชะตาราศีตะวันตก",
                imgUrl,
                url: `blog/articles/${engFilename}`,
                lang: 'en',
                altUrl: `blog/articles/${thaiFilename}`
            });
        }

        // 4. ดวงจีน บาจื่อ (Chinese Bazi) - 10 บทความ
        console.log("📥 ดึงข้อมูลดวงจีน...");
        const [baziRows] = await db.query("SELECT * FROM chinese_bazi_premium LIMIT 10");
        for (const r of baziRows) {
            const cleanPolarity = slugify(r.polarity.split('(')[1].replace(')', '').replace(' ', '-'));
            const cleanElementTh = thaiSlugify(r.element_name.split(' ')[0]);

            const thaiFilename = `chinese-bazi-${cleanElementTh}-${cleanPolarity}.html`;
            const engFilename = `chinese-bazi-${cleanPolarity}-en.html`;

            const thaiTitle = `วิเคราะห์ดิถีและดวงชะตาบาจื่อ: ดิถี ${r.symbol} ธาตุ ${r.element_name} (${r.polarity})`;
            const thaiDesc = `เจาะลึกพลังงานหลัก ลักษณะเด่นตามธรรมชาติ ดวงชะตาความมั่งคั่งการเงิน และคู่ธาตุส่งเสริมตามวันเกิดของดิถี ${r.symbol}`;
            const imgUrl = getBaziImageUrl(r.element_name, r.symbol);
            
            const thaiContent = `
                <p>ตามศาสตร์การดูลักษณะชะตาดวงจีนบาจื่อ (Bazi) พลังงานดิถีวันเกิดของคุณคือ <strong>ดิถี ${r.symbol} ธาตุ ${r.element_name}</strong> ซึ่งแสดงขั้วความร้อนเย็นเป็นแบบ <strong>${r.polarity}</strong></p>
                
                <h2 class="text-xl font-bold text-white mt-6 mb-3"><i class="fa-solid fa-yin-yang text-amber-500 mr-2"></i> ลักษณะเด่นธรรมชาติของดิถีชะตา</h2>
                <p>${highlightKeywords(r.core_character, 'th')}</p>
                
                <h2 class="text-xl font-bold text-white mt-6 mb-3"><i class="fa-solid fa-sack-dollar text-amber-500 mr-2"></i> ชะตาชีวิตด้านความมั่งคั่งและการเงิน</h2>
                <p>${highlightKeywords(r.wealth_luck, 'th')}</p>
                
                <h2 class="text-xl font-bold text-white mt-6 mb-3"><i class="fa-solid fa-circle-plus text-amber-500 mr-2"></i> ธาตุสำคัญที่ส่งเสริมดวงชะตา (Favorable)</h2>
                <p>ธาตุที่ช่วยส่งเสริมการดำเนินชีวิตและเรียกทรัพย์สินให้คุณคือ: <strong>${r.favorable_elements || 'ไม้, ไฟ'}</strong></p>

                <h2 class="text-xl font-bold text-white mt-6 mb-3"><i class="fa-solid fa-circle-minus text-amber-500 mr-2"></i> ธาตุที่หักล้างชะตาและควรเลี่ยง (Unfavorable)</h2>
                <p>ธาตุและพลังงานที่อาจทำลายโชคลาภควรระมัดระวังคือ: <strong>${r.unfavorable_elements || 'น้ำ'}</strong></p>

                ${getFAQs('zodiac', `ดิถี ${r.symbol}`, 'th')}
            `;

            const thaiSchema = {
                "@context": "https://schema.org",
                "@type": "BlogPosting",
                "headline": thaiTitle,
                "description": thaiDesc,
                "image": imgUrl,
                "author": { "@type": "Organization", "name": "Likit Fah" },
                "publisher": { "@type": "Organization", "name": "Likit Fah" },
                "datePublished": new Date().toISOString()
            };

            const thaiHtml = getHtmlTemplate(thaiTitle, thaiDesc, "ศาสตร์ดวงจีนบาจื่อ", imgUrl, thaiContent, thaiSchema, thaiFilename, 'th', engFilename);
            fs.writeFileSync(path.join(articlesDir, thaiFilename), thaiHtml, 'utf8');

            articlesList.push({
                title: thaiTitle,
                desc: thaiDesc,
                category: "ศาสตร์ดวงจีนบาจื่อ",
                imgUrl,
                url: `blog/articles/${thaiFilename}`,
                lang: 'th',
                altUrl: `blog/articles/${engFilename}`
            });

            // Translate for English
            const rawEngPolarity = r.polarity.split('(')[1].replace(')', '').trim();
            const rawEngElementName = r.element_name.split('(')[1].replace(')', '').trim();
            console.log(`  └─ แปลบาจื่อ [ดิถี ${r.symbol} (${rawEngPolarity})]...`);
            const translatedFields = await translateBatch([
                r.core_character,
                r.wealth_luck,
                r.favorable_elements || 'Wood, Fire',
                r.unfavorable_elements || 'Water'
            ]);
            await delay(300);

            const [engCharacter, engWealth, engFavorable, engUnfavorable] = translatedFields;
            const engTitle = `Bazi Day Master Analysis: ${r.symbol} (${rawEngPolarity})`;
            const engDesc = `Explore the core traits, financial wealth forecast, favorable and unfavorable elements for Bazi Day Master ${r.symbol} (${rawEngPolarity}).`;

            const engContent = `
                <p>In Chinese Bazi destiny, your natal Day Master is <strong>${r.symbol}</strong>, representing the element energy of <strong>${rawEngElementName}</strong>, acting as a <strong>${rawEngPolarity}</strong> profile.</p>
                
                <h2 class="text-xl font-bold text-white mt-6 mb-3"><i class="fa-solid fa-yin-yang text-amber-500 mr-2"></i> Natural Traits of Your Day Master</h2>
                <p>${highlightKeywords(engCharacter, 'en')}</p>
                
                <h2 class="text-xl font-bold text-white mt-6 mb-3"><i class="fa-solid fa-sack-dollar text-amber-500 mr-2"></i> Wealth Prospect and Financial Forecast</h2>
                <p>${highlightKeywords(engWealth, 'en')}</p>
                
                <h2 class="text-xl font-bold text-white mt-6 mb-3"><i class="fa-solid fa-circle-plus text-amber-500 mr-2"></i> Favorable Elements (Helpful Energies)</h2>
                <p>The elemental forces that support your fortune and attract wealth are: <strong>${engFavorable}</strong></p>

                <h2 class="text-xl font-bold text-white mt-6 mb-3"><i class="fa-solid fa-circle-minus text-amber-500 mr-2"></i> Unfavorable Elements (Challenging Energies)</h2>
                <p>The elements you should handle with caution as they might drain resources: <strong>${engUnfavorable}</strong></p>

                ${getFAQs('zodiac', `Day Master ${r.symbol}`, 'en')}
            `;

            const engSchema = {
                "@context": "https://schema.org",
                "@type": "BlogPosting",
                "headline": engTitle,
                "description": engDesc,
                "image": imgUrl,
                "author": { "@type": "Organization", "name": "Likit Fah" },
                "publisher": { "@type": "Organization", "name": "Likit Fah" },
                "datePublished": new Date().toISOString()
            };

            const engHtml = getHtmlTemplate(engTitle, engDesc, "ศาสตร์ดวงจีนบาจื่อ", imgUrl, engContent, engSchema, engFilename, 'en', thaiFilename);
            fs.writeFileSync(path.join(articlesDir, engFilename), engHtml, 'utf8');

            articlesList.push({
                title: engTitle,
                desc: engDesc,
                category: "ศาสตร์ดวงจีนบาจื่อ",
                imgUrl,
                url: `blog/articles/${engFilename}`,
                lang: 'en',
                altUrl: `blog/articles/${thaiFilename}`
            });
        }

        // 5. ทำนายฝันนำโชค (Dreams) - 138 บทความ
        console.log("📥 ดึงข้อมูลทำนายฝันนำโชค...");
        const [dreamRows] = await db.query("SELECT * FROM dreams_premium WHERE keyword != '' AND meaning != '' LIMIT 138");
        for (const r of dreamRows) {
            // Translate keyword first to build SEO-friendly filename
            const engKeywordRaw = await translateText(r.keyword);
            const cleanEngKeyword = slugify(engKeywordRaw);
            const cleanThaiKeyword = thaiSlugify(r.keyword);

            const thaiFilename = `dream-${cleanThaiKeyword}.html`;
            const engFilename = `dream-${cleanEngKeyword}-en.html`;

            const thaiTitle = `ทำนายฝันพรีเมียม: ฝันเห็น "${r.keyword}" แปลว่าอะไร พร้อมตีความหมายเลขนำโชค`;
            const thaiDesc = `ไขความหมาย ทำนายลางบอกเหตุล่วงหน้าในชีวิต พร้อมวิเคราะห์ถอดตัวเลขนำโชคเชิงสถิติจากการฝันเห็น ${r.keyword}`;
            const imgUrl = getDreamImageUrl(r.keyword, r.id);
            
            const thaiContent = `
                <p>ตามศาสตร์การทำนายฝันโบราณและสถิติตัวเลขนำโชคของลิขิตฟ้า การที่คุณฝันเห็น <strong>"${r.keyword}"</strong> นั้น ถูกจัดอยู่ในหมวดหมู่ทำนายฝันเรื่อง <strong>${r.category || 'โชคลาภทั่วไป'}</strong></p>
                
                <h2 class="text-xl font-bold text-white mt-6 mb-3"><i class="fa-solid fa-comment-dots text-amber-500 mr-2"></i> ความหมายและลางบอกเหตุจากความฝัน</h2>
                <p>${highlightKeywords(r.meaning, 'th')}</p>
                
                <h2 class="text-xl font-bold text-white mt-6 mb-3"><i class="fa-solid fa-lightbulb text-amber-500 mr-2"></i> การตีความและคำแนะนำเชิงสถิติ</h2>
                <p>การฝันเห็นสิ่งนี้ตามหลักจิตวิทยา มักเกี่ยวข้องกับความระมัดระวังในเรื่องความรักหรือการทำงาน ซึ่งลิขิตฟ้าขอพยากรณ์แนะนำให้ท่านดำเนินชีวิตอย่างมีสติรอบคอบและหมั่นทำบุญตามวันเกิดเพื่อหนุนโชคลาภ</p>
 
                <h2 class="text-xl font-bold text-white mt-6 mb-3"><i class="fa-solid fa-coins text-amber-500 mr-2"></i> ตัวเลขเด่นและเลขมงคลนำโชค</h2>
                <p>จากการถอดรหัสเชิงสถิติตัวเลขนำโชคสำหรับการฝันเห็นสิ่งนี้ คือเลขเด่น: <strong class="text-emerald-400 font-bold text-lg px-2 py-1 bg-emerald-950/40 border border-emerald-500/30 rounded-lg">${r.lucky_numbers || '3, 7, 89, 74'}</strong></p>

                ${getFAQs('dream', r.keyword, 'th')}
            `;

            const thaiSchema = {
                "@context": "https://schema.org",
                "@type": "BlogPosting",
                "headline": thaiTitle,
                "description": thaiDesc,
                "image": imgUrl,
                "author": { "@type": "Organization", "name": "Likit Fah" },
                "publisher": { "@type": "Organization", "name": "Likit Fah" },
                "datePublished": new Date().toISOString()
            };

            const thaiHtml = getHtmlTemplate(thaiTitle, thaiDesc, "ทำนายฝันนำโชค", imgUrl, thaiContent, thaiSchema, thaiFilename, 'th', engFilename);
            fs.writeFileSync(path.join(articlesDir, thaiFilename), thaiHtml, 'utf8');

            articlesList.push({
                title: thaiTitle,
                desc: thaiDesc,
                category: "ทำนายฝันนำโชค",
                imgUrl,
                url: `blog/articles/${thaiFilename}`,
                lang: 'th',
                altUrl: `blog/articles/${engFilename}`
            });

            // Translate dream details for English
            console.log(`  └─ แปลทำนายฝัน [ฝันเห็น ${r.keyword} (${engKeywordRaw})]...`);
            const translatedFields = await translateBatch([
                r.category || 'General Luck',
                r.meaning
            ]);
            await delay(250);

            const [engCategory, engMeaning] = translatedFields;
            const engTitle = `Premium Dream Interpretation: Dreaming of "${engKeywordRaw}" Meaning`;
            const engDesc = `Unveil the secrets, warning signs, psychological meanings, and statistical lucky numbers for dreaming about ${engKeywordRaw}.`;

            const engContent = `
                <p>According to ancient dream keys and Likit Fah statistics, dreaming about <strong>"${engKeywordRaw}"</strong> falls under the <strong>${engCategory}</strong> category.</p>
                
                <h2 class="text-xl font-bold text-white mt-6 mb-3"><i class="fa-solid fa-comment-dots text-amber-500 mr-2"></i> Dream Meanings and Warning Signs</h2>
                <p>${highlightKeywords(engMeaning, 'en')}</p>
                
                <h2 class="text-xl font-bold text-white mt-6 mb-3"><i class="fa-solid fa-lightbulb text-amber-500 mr-2"></i> Psychological Guide and Advice</h2>
                <p>Dreaming of this subject psychologically indicates a call to be more careful in love or career. We recommend carrying out your daily tasks with high mindfulness and making birth-day merits to support your positive luck frequencies.</p>

                <h2 class="text-xl font-bold text-white mt-6 mb-3"><i class="fa-solid fa-coins text-amber-500 mr-2"></i> Lucky Numbers Decoded</h2>
                <p>Based on our statistical database of dream decodings, the lucky digits for this dream are: <strong class="text-emerald-400 font-bold text-lg px-2 py-1 bg-emerald-950/40 border border-emerald-500/30 rounded-lg">${r.lucky_numbers || '3, 7, 89, 74'}</strong></p>

                ${getFAQs('dream', engKeywordRaw, 'en')}
            `;

            const engSchema = {
                "@context": "https://schema.org",
                "@type": "BlogPosting",
                "headline": engTitle,
                "description": engDesc,
                "image": imgUrl,
                "author": { "@type": "Organization", "name": "Likit Fah" },
                "publisher": { "@type": "Organization", "name": "Likit Fah" },
                "datePublished": new Date().toISOString()
            };

            const engHtml = getHtmlTemplate(engTitle, engDesc, "ทำนายฝันนำโชค", imgUrl, engContent, engSchema, engFilename, 'en', thaiFilename);
            fs.writeFileSync(path.join(articlesDir, engFilename), engHtml, 'utf8');

            articlesList.push({
                title: engTitle,
                desc: engDesc,
                category: "ทำนายฝันนำโชค",
                imgUrl,
                url: `blog/articles/${engFilename}`,
                lang: 'en',
                altUrl: `blog/articles/${thaiFilename}`
            });
        }

        // Save index file blog-list.json
        console.log("💾 บันทึกไฟล์ดัชนีบทความ blog-list.json...");
        fs.writeFileSync(path.join(blogDir, 'blog-list.json'), JSON.stringify(articlesList, null, 2), 'utf8');

        // 6. Generate bilingual sitemap.xml
        console.log("💾 กำลังสร้างไฟล์ sitemap.xml คู่ภาษา...");
        const domain = "https://likitfah.com";
        const today = new Date().toISOString().split('T')[0];
        
        const staticPages = [
            "",
            "dashboard.html",
            "blog.html",
            "about.html",
            "contact.html",
            "policy.html",
            "terms.html",
            "donate.html",
            "tarot.html",
            "wheel.html",
            "lucky.html",
            "calendar.html",
            "chinese-calendar.html",
            "lotto.html",
            "lotto-science.html",
            "dream.html",
            "name.html",
            "naming.html",
            "phone.html",
            "plate.html",
            "predictor.html",
            "lifegraph.html",
            "siemsi.html",
            "timemachine.html",
            "radar.html",
            "scaner.html",
            "core.html",
            "oracle-blueprint.html"
        ];
        
        let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
        xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n`;
        
        // Static root pages (handled with alternate tags using query params)
        for (const p of staticPages) {
            // Thai URL (Default)
            xml += `  <url>\n`;
            xml += `    <loc>${domain}/${p}</loc>\n`;
            xml += `    <xhtml:link rel="alternate" hreflang="th" href="${domain}/${p}${p.includes('?') ? '&amp;' : '?'}lang=th"/>\n`;
            xml += `    <xhtml:link rel="alternate" hreflang="en" href="${domain}/${p}${p.includes('?') ? '&amp;' : '?'}lang=en"/>\n`;
            xml += `    <xhtml:link rel="alternate" hreflang="x-default" href="${domain}/${p}"/>\n`;
            xml += `    <lastmod>${today}</lastmod>\n`;
            xml += `    <changefreq>${p === '' || p === 'blog.html' ? 'daily' : 'weekly'}</changefreq>\n`;
            xml += `    <priority>${p === '' ? '1.0' : '0.8'}</priority>\n`;
            xml += `  </url>\n`;
        }
        
        // Blog articles (Static alternate files)
        for (const art of articlesList) {
            const hreflang = art.lang === 'th' ? 'en' : 'th';
            const defaultLoc = art.lang === 'th' ? `${domain}/${art.url}` : `${domain}/${art.altUrl}`;
            
            xml += `  <url>\n`;
            xml += `    <loc>${domain}/${art.url}</loc>\n`;
            xml += `    <xhtml:link rel="alternate" hreflang="${art.lang}" href="${domain}/${art.url}"/>\n`;
            xml += `    <xhtml:link rel="alternate" hreflang="${hreflang}" href="${domain}/${art.altUrl}"/>\n`;
            xml += `    <xhtml:link rel="alternate" hreflang="x-default" href="${defaultLoc}"/>\n`;
            xml += `    <lastmod>${today}</lastmod>\n`;
            xml += `    <changefreq>monthly</changefreq>\n`;
            xml += `    <priority>0.6</priority>\n`;
            xml += `  </url>\n`;
        }
        
        xml += `</urlset>\n`;
        
        fs.writeFileSync(path.join(__dirname, '../../frontend/sitemap.xml'), xml, 'utf8');
        console.log("🎉 บันทึก sitemap.xml สองภาษาสำเร็จ!");
        
        console.log(`🎉 [Script-Generator] เสร็จสมบูรณ์! เจนบทความรวมทั้งหมด ${articlesList.length} ไฟล์สำเร็จ!`);
        process.exit(0);

    } catch (err) {
        console.error("❌ ล้มเหลวระหว่างดำเนินการสร้างบทความ:", err);
        process.exit(1);
    }
}

run();
