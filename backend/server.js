const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const axios = require('axios');
require('dotenv').config();
const db = require('./db');
const path = require('path'); 

const app = express();

// 🛡️ SECURITY: CORS Policy
const corsOptions = {
    origin: ['https://likitfah.com', 'https://www.likitfah.com', 'http://localhost', 'http://localhost:3000', 'http://127.0.0.1:5500'],
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// 🛡️ SECURITY: Rate Limiting
const apiLimiter = rateLimit({
    windowMs: 1 * 60 * 1000, 
    max: 50, 
    message: { error: "คุณทำรายการบ่อยเกินไป กรุณารอสักครู่แล้วลองใหม่อีกครั้ง" },
    standardHeaders: true, 
    legacyHeaders: false, 
});

app.use('/api/', apiLimiter);
app.use(express.json());

const translator = require('./utils/translator');
// Initialize translation cache table in the background
translator.setupCacheTable();

// Translation Interceptor Middleware
app.use(async (req, res, next) => {
    if (req.path.startsWith('/api') && req.query.lang === 'en') {
        const originalJson = res.json;
        res.json = async function (body) {
            try {
                const translatedBody = await translator.translateObject(body, 'en');
                return originalJson.call(this, translatedBody);
            } catch (err) {
                console.error("[Middleware Translator Error]:", err.message);
                return originalJson.call(this, body);
            }
        };
    }
    next();
});

// 🌟 สั่งให้ Node.js อ่านไฟล์เว็บจากโฟลเดอร์ public (สำคัญมากสำหรับการรวมร่าง)
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, '../frontend')));

app.get('/api/health', (req, res) => res.send('API is running securely with Premium Data!'));

// ==========================================
// 1-7. API: หมวดดูดวง (Astrology, Phone, Tarot, Plate, Siemsi, Name, Dream)
// ==========================================
app.get('/api/astrology', async (req, res) => {
    try {
        const t_idx = parseInt(req.query.t_idx) || 0; const w_idx = parseInt(req.query.w_idx) || 0; const b_idx = parseInt(req.query.b_idx) || 0;
        const [thai] = await db.query(`SELECT * FROM thai_zodiac_premium WHERE id = ?`, [t_idx]);
        const [western] = await db.query(`SELECT * FROM western_zodiac_premium WHERE id = ?`, [w_idx]);
        const [bazi] = await db.query(`SELECT * FROM chinese_bazi_premium WHERE id = ?`, [b_idx]);
        res.json({ thai: thai.length > 0 ? thai[0] : null, western: western.length > 0 ? western[0] : null, bazi: bazi.length > 0 ? bazi[0] : null });
    } catch (error) { res.status(500).json({ error: "Database error" }); }
});

app.get('/api/phone/:number', async (req, res) => {
    try {
        const phone = req.params.number;
        if (!phone || phone.length !== 10) return res.status(400).json({ error: "Invalid phone number" });
        let sum = 0; for(let i=0; i<10; i++) sum += parseInt(phone[i]);
        const last7 = phone.slice(3); const pairsToSearch = [];
        for(let i=0; i<6; i++) pairsToSearch.push(last7.slice(i, i+2));
        const [rows] = await db.query(`SELECT * FROM phone_numerology_premium WHERE pair IN (?)`, [pairsToSearch]);
        const pairsResult = pairsToSearch.map(p => { const found = rows.find(r => r.pair === p); return found ? found : { pair: p, category: 'neutral', title: 'พลังงานทั่วไป', finance_work: '-', love_charm: '-', health_warning: '-', suitable_career: '-' }; });
        let score = (sum * 2) % 60 + 40;
        pairsResult.forEach(p => { if(p.category === 'good') score += 5; if(p.category === 'bad') score -= 10; });
        res.json({ phone, sum, score: Math.max(30, Math.min(score, 99)), pairs_analysis: pairsResult });
    } catch (error) { res.status(500).json({ error: "Database error" }); }
});

app.get('/api/tarot/draw', async (req, res) => {
    try { const limit = parseInt(req.query.limit) || 3; const [rows] = await db.query(`SELECT * FROM tarot_cards_premium ORDER BY RAND() LIMIT ?`, [limit]); res.json({ cards: rows }); } 
    catch (error) { res.status(500).json({ error: "Database error" }); }
});

app.get('/api/plate/:sum', async (req, res) => {
    try { const sum = parseInt(req.params.sum); const [rows] = await db.query(`SELECT * FROM plate_numerology_premium WHERE total_sum = ?`, [sum]); if (rows.length > 0) res.json(rows[0]); else res.json({ total_sum: sum, grade: "C", travel_luck: "พลังงานระดับกลาง ไม่เด่นและไม่ร้าย", wealth_aura: "-", accident_warning: "-" }); } 
    catch (error) { res.status(500).json({ error: "Database error" }); }
});

app.get('/api/siemsi/draw', async (req, res) => {
    try { const [rows] = await db.query(`SELECT * FROM siemsi_premium ORDER BY RAND() LIMIT 1`); res.json(rows[0]); } 
    catch (error) { res.status(500).json({ error: "Database error" }); }
});

app.get('/api/name/:score', async (req, res) => {
    try { const score = parseInt(req.params.score); const [rows] = await db.query('SELECT * FROM name_numerology_premium WHERE score = ?', [score]); if (rows.length > 0) res.json(rows[0]); else res.json({ score: score, grade: score > 40 ? "B+" : "C+", summary: "พลังแห่งความพยายามและวิริยะ" }); } 
    catch (error) { res.status(500).json({ error: "Database error" }); }
});

app.get('/api/dream/search', async (req, res) => {
    try { const query = req.query.q; if (!query) return res.json([]); const [rows] = await db.query("SELECT * FROM dreams_premium WHERE keyword LIKE ? ORDER BY keyword ASC", [`%${query}%`]); res.json(rows); } 
    catch (error) { res.status(500).json({ error: "Database error" }); }
});

// ==========================================
// 8. API: วิเคราะห์สถิติหวย
// ==========================================
app.get('/api/lotto/analyze', async (req, res) => {
    try {
        const { day, month, year } = req.query;
        let whereClause = "WHERE 1=1"; let queryParams = [];
        if (day && day !== 'all') { whereClause += " AND draw_day_of_week = ?"; queryParams.push(day); }
        if (month && month !== 'all') { whereClause += " AND draw_month = ?"; queryParams.push(month); }
        if (year && year !== 'all') { whereClause += " AND draw_year = ?"; queryParams.push(year); }

        const [countRows] = await db.query(`SELECT COUNT(*) as total FROM lotto_history ${whereClause}`, queryParams);
        const total = Number(countRows[0].total);
        if (total === 0) return res.json({ system_status: "no_data" });

        const [bottomRows] = await db.query(`SELECT prize_2digits as num, COUNT(*) as c FROM lotto_history ${whereClause} AND prize_2digits != '' GROUP BY num ORDER BY c DESC, num ASC LIMIT 5`, queryParams);
        const [topRows] = await db.query(`SELECT RIGHT(prize_1, 2) as num, COUNT(*) as c FROM lotto_history ${whereClause} AND prize_1 != '' GROUP BY num ORDER BY c DESC, num ASC LIMIT 5`, queryParams);
        const [coldRows] = await db.query(`SELECT prize_2digits as num, MAX(draw_date) as last FROM lotto_history ${whereClause} AND prize_2digits != '' GROUP BY num ORDER BY last ASC LIMIT 5`, queryParams);

        const format = (list) => {
            let max = list.length > 0 ? Number(list[0].c) : 1;
            return list.map(item => ({ number: item.num, count: Number(item.c), percent: ((Number(item.c) / total) * 100).toFixed(2), w: `width: ${((Number(item.c) / max) * 100).toFixed(0)}%;` }));
        };
        res.json({ status: "success", total, top_bottom: format(bottomRows), top_top: format(topRows), colds: coldRows.map(i => { const d = new Date(i.last); return { n: i.num, d: `${d.getDate()}/${d.getMonth()+1}/${d.getFullYear()+543}` }; }) });
    } catch (e) { res.status(500).json({ error: e.message }); }
});

// ==========================================
// 9. API: ประวัติผลหวย
// ==========================================
app.get('/api/lotto/history', async (req, res) => {
    try {
        const { year } = req.query;
        if(!year || year === 'all') return res.json([]);
        const [rows] = await db.query("SELECT * FROM lotto_history WHERE draw_year = ? ORDER BY draw_date DESC", [year]);
        const m = ["ม.ค.","ก.พ.","มี.ค.","เม.ย.","พ.ค.","มิ.ย.","ก.ค.","ส.ค.","ก.ย.","ต.ค.","พ.ย.","ธ.ค."];
        res.json(rows.map(r => { const d = new Date(r.draw_date); return { ...r, date_th: `${d.getDate()} ${m[d.getMonth()]} ${d.getFullYear()+543}` }; }));
    } catch (e) { res.status(500).json({ error: e.message }); }
});

// ==========================================
// 10. 🌟 หุ่นยนต์ดูดผลหวยอัตโนมัติ (Sanook Lotto Scraper)
// ==========================================
const thaiMonthsFull = ["มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"];
const daysTH = ['อาทิตย์', 'จันทร์', 'อังคาร', 'พุธ', 'พฤหัสบดี', 'ศุกร์', 'เสาร์'];

async function getLatestSanookLottoDate() {
    const response = await axios.get('https://news.sanook.com/lotto/', {
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        }
    });
    const html = response.data;
    const jsonLdRegex = /<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi;
    let match;
    let publishDate = null;
    
    while ((match = jsonLdRegex.exec(html)) !== null) {
        try {
            const json = JSON.parse(match[1].trim());
            if (json['@type'] === 'NewsArticle' && json.datePublished) {
                publishDate = json.datePublished;
                break;
            }
        } catch (e) {}
    }
    
    if (!publishDate) {
        throw new Error("Could not find latest lottery date from Sanook index page");
    }
    
    const dateObj = new Date(publishDate);
    const d = String(dateObj.getDate()).padStart(2, '0');
    const m = String(dateObj.getMonth() + 1).padStart(2, '0');
    const y = dateObj.getFullYear();
    const yTH = y + 543;
    
    return {
        ddmmyyyy: `${d}${m}${yTH}`,
        draw_date: `${y}-${m}-${d}`
    };
}

async function scrapeSanookLotto(ddmmyyyy) {
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
        throw new Error(`Could not find lottery data for ${ddmmyyyy}`);
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
    
    const prize1Near = getNumbersAfterKeyword(cleanText, "รางวัลข้างเคียงรางวัลที่ 1", 6, 2);
    const prize2 = getNumbersAfterKeyword(cleanText, "รางวัลที่ 2", 6, 5);
    const prize3 = getNumbersAfterKeyword(cleanText, "รางวัลที่ 3", 6, 10);
    const prize4 = getNumbersAfterKeyword(cleanText, "รางวัลที่ 4", 6, 50);
    const prize5 = getNumbersAfterKeyword(cleanText, "รางวัลที่ 5", 6, 100);
    
    if (!prize1 || front3.length < 2 || back3.length < 2 || !prize2d) {
        throw new Error(`Scraped data is incomplete for ${ddmmyyyy}.`);
    }
    
    return {
        prize_1: prize1,
        prize_3digits_front1: front3[0],
        prize_3digits_front2: front3[1],
        prize_3digits_back1: back3[0],
        prize_3digits_back2: back3[1],
        prize_2digits: prize2d,
        prize_1_near: JSON.stringify(prize1Near),
        prize_2: JSON.stringify(prize2),
        prize_3: JSON.stringify(prize3),
        prize_4: JSON.stringify(prize4),
        prize_5: JSON.stringify(prize5),
    };
}

async function fetchLatestLotto() {
    try {
        console.log("[Auto-Lotto] 🔍 กำลังตรวจสอบงวดสลากกินแบ่งล่าสุดจาก Sanook...");
        const { ddmmyyyy, draw_date } = await getLatestSanookLottoDate();
        
        const [existing] = await db.query("SELECT id FROM lotto_history WHERE draw_date = ?", [draw_date]);
        if (existing.length > 0) return { status: 'already_updated', date: draw_date };

        console.log(`[Auto-Lotto] 📥 พบงวดใหม่ที่ยังไม่มีในระบบ: ${ddmmyyyy} กำลังเริ่มดูดข้อมูล...`);
        const lotto = await scrapeSanookLotto(ddmmyyyy);
        
        const dateObj = new Date(draw_date);
        const draw_day_of_week = daysTH[dateObj.getDay()];
        const draw_month = dateObj.getMonth() + 1;
        const draw_year = dateObj.getFullYear();

        await db.query(`
            INSERT INTO lotto_history 
            (draw_date, draw_day_of_week, draw_month, draw_year, prize_1, prize_3digits_front1, prize_3digits_front2, prize_3digits_back1, prize_3digits_back2, prize_2digits, prize_1_near, prize_2, prize_3, prize_4, prize_5) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `, [
            draw_date, draw_day_of_week, draw_month, draw_year, 
            lotto.prize_1, lotto.prize_3digits_front1, lotto.prize_3digits_front2, 
            lotto.prize_3digits_back1, lotto.prize_3digits_back2, lotto.prize_2digits, 
            lotto.prize_1_near, lotto.prize_2, lotto.prize_3, lotto.prize_4, lotto.prize_5
        ]);

        console.log(`[Auto-Lotto] 🎉 ดูดข้อมูลสำเร็จ! อัปเดตผลงวด ${draw_date} เรียบร้อย`);
        return { status: 'success', date: draw_date };

    } catch (error) {
        console.error("❌ [Auto-Lotto] ล้มเหลว:", error.message);
        return { status: 'error', message: error.message };
    }
}

app.get('/api/lotto/sync-latest', async (req, res) => { const result = await fetchLatestLotto(); res.json(result); });

// ==========================================
// 11. API: ดึงรายชื่องวดหวยทั้งหมด
// ==========================================
app.get('/api/lotto/dates', async (req, res) => {
    try {
        const [rows] = await db.query("SELECT DISTINCT draw_date FROM lotto_history ORDER BY draw_date DESC LIMIT 48");
        res.json(rows);
    } catch (error) { res.status(500).json({ error: "Database error" }); }
});

// ==========================================
// 12. 🌟 API: ระบบตรวจสลากกินแบ่งฯ
// ==========================================
app.get('/api/lotto/check', async (req, res) => {
    try {
        const { ticket, date } = req.query;
        if (!ticket || ticket.length !== 6 || !/^\d+$/.test(ticket)) return res.status(400).json({ error: "กรุณากรอกตัวเลขให้ครบ 6 หลัก" });

        let query = "SELECT * FROM lotto_history ORDER BY draw_date DESC LIMIT 1";
        let params = [];
        if (date) { query = "SELECT * FROM lotto_history WHERE draw_date = ? LIMIT 1"; params = [date]; }

        const [rows] = await db.query(query, params);
        if (rows.length === 0) return res.status(404).json({ error: "ไม่พบข้อมูลของงวดที่เลือก" });

        const draw = rows[0];
        let wonPrizes = [];

        if (ticket === draw.prize_1) wonPrizes.push("รางวัลที่ 1");

        const p1NearArr = draw.prize_1_near ? JSON.parse(draw.prize_1_near) : [];
        const p1Num = parseInt(draw.prize_1, 10);
        const p1_plus = String(p1Num + 1).padStart(6, '0');
        const p1_minus = String(p1Num - 1).padStart(6, '0');
        if (p1NearArr.includes(ticket) || ticket === p1_plus || ticket === p1_minus) {
            if(!wonPrizes.includes("รางวัลข้างเคียงรางวัลที่ 1")) wonPrizes.push("รางวัลข้างเคียงรางวัลที่ 1");
        }

        const checkArrayPrize = (dbField, prizeName) => {
            if (dbField && dbField !== '[]') {
                try {
                    const arr = JSON.parse(dbField);
                    if (arr.includes(ticket)) wonPrizes.push(prizeName);
                } catch(e) {}
            }
        };

        checkArrayPrize(draw.prize_2, "รางวัลที่ 2");
        checkArrayPrize(draw.prize_3, "รางวัลที่ 3");
        checkArrayPrize(draw.prize_4, "รางวัลที่ 4");
        checkArrayPrize(draw.prize_5, "รางวัลที่ 5");

        if (ticket.startsWith(draw.prize_3digits_front1) || ticket.startsWith(draw.prize_3digits_front2)) wonPrizes.push("รางวัลเลขหน้า 3 ตัว");
        if (ticket.endsWith(draw.prize_3digits_back1) || ticket.endsWith(draw.prize_3digits_back2)) wonPrizes.push("รางวัลเลขท้าย 3 ตัว");
        if (ticket.endsWith(draw.prize_2digits)) wonPrizes.push("รางวัลเลขท้าย 2 ตัว");

        const d = new Date(draw.draw_date);
        const thaiMonths = ["ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.", "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค."];
        const dateStr = `${d.getDate()} ${thaiMonths[d.getMonth()]} ${d.getFullYear() + 543}`;

        setTimeout(() => {
            res.json({ ticket: ticket, draw_date: dateStr, isWin: wonPrizes.length > 0, prizes: wonPrizes, winning_numbers: { p1: draw.prize_1, p2d: draw.prize_2digits } });
        }, 1500); 

    } catch (error) { res.status(500).json({ error: "เกิดข้อผิดพลาดในระบบตรวจหวย" }); }
});

// ==========================================
// 13. 🌟 API: เรดาร์ 100 ประตู 
// ==========================================
app.get('/api/lotto/heatmap', async (req, res) => {
    try {
        const { day, month } = req.query;
        let filterSql = "";
        let params = [];

        if (day) { filterSql += " AND draw_day_of_week = ?"; params.push(day); }
        if (month) { filterSql += " AND draw_month = ?"; params.push(Number(month)); }

        const [bottomRows] = await db.query(`SELECT prize_2digits as num, COUNT(*) as count FROM lotto_history WHERE prize_2digits != '' AND prize_2digits IS NOT NULL ${filterSql} GROUP BY num`, params);
        const [topRows] = await db.query(`SELECT RIGHT(prize_1, 2) as num, COUNT(*) as count FROM lotto_history WHERE prize_1 != '' AND prize_1 IS NOT NULL ${filterSql} GROUP BY num`, params);

        const processData = (rows) => {
            let heatmap = []; let maxCount = 0;
            let stats = { evenEven: 0, oddOdd: 0, evenOdd: 0, oddEven: 0, high: 0, low: 0, total: 0 };
            rows.forEach(r => { if(r.count > maxCount) maxCount = r.count; });
            for (let i = 0; i <= 99; i++) {
                let strNum = String(i).padStart(2, '0');
                let found = rows.find(r => r.num === strNum);
                let c = found ? found.count : 0;
                let heat = maxCount > 0 ? (c / maxCount) * 100 : 0;
                heatmap.push({ number: strNum, count: c, heat: Math.round(heat) });
                if (c > 0) {
                    stats.total += c;
                    let n1 = parseInt(strNum[0]); let n2 = parseInt(strNum[1]);
                    if (n1 % 2 === 0 && n2 % 2 === 0) stats.evenEven += c; 
                    else if (n1 % 2 !== 0 && n2 % 2 !== 0) stats.oddOdd += c; 
                    else if (n1 % 2 === 0 && n2 % 2 !== 0) stats.evenOdd += c; 
                    else stats.oddEven += c; 
                    if (i >= 50) stats.high += c; else stats.low += c; 
                }
            }
            return { max_count: maxCount, data: heatmap, stats: stats };
        };

        res.json({ bottom: processData(bottomRows), top: processData(topRows) });
    } catch (error) { res.status(500).json({ error: "Database error" }); }
});


// ==========================================
// 14. 🌟 API: ไทม์แมชชีนดูดหวยย้อนหลัง 
// ==========================================
app.get('/api/lotto/sync-specific', async (req, res) => {
    try {
        const { ddmmyyyy } = req.query; 
        if (!ddmmyyyy || ddmmyyyy.length !== 8) return res.status(400).json({ error: "รูปแบบวันที่ไม่ถูกต้อง" });

        const dStr = ddmmyyyy.substring(0, 2); 
        const mStr = ddmmyyyy.substring(2, 4); 
        const yearInput = Number(ddmmyyyy.substring(4, 8));
        const yearCE = yearInput > 2400 ? yearInput - 543 : yearInput;
        const draw_date = `${yearCE}-${mStr}-${dStr}`;

        const [existing] = await db.query("SELECT id FROM lotto_history WHERE draw_date = ?", [draw_date]);
        if (existing.length > 0) return res.json({ status: 'already_exists', date: draw_date });
        
        console.log(`[Sync-Specific] 📥 ดึงข้อมูลหวยงวด ${ddmmyyyy} จาก Sanook Scraper...`);
        const lotto = await scrapeSanookLotto(ddmmyyyy);
        
        const dateObj = new Date(draw_date); 
        const draw_day_of_week = daysTH[dateObj.getDay()];

        await db.query(`
            INSERT INTO lotto_history 
            (draw_date, draw_day_of_week, draw_month, draw_year, prize_1, prize_3digits_front1, prize_3digits_front2, prize_3digits_back1, prize_3digits_back2, prize_2digits, prize_1_near, prize_2, prize_3, prize_4, prize_5) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `, [
            draw_date, draw_day_of_week, Number(mStr), yearCE, 
            lotto.prize_1, lotto.prize_3digits_front1 || '', lotto.prize_3digits_front2 || '', 
            lotto.prize_3digits_back1 || '', lotto.prize_3digits_back2 || '', lotto.prize_2digits, 
            lotto.prize_1_near, lotto.prize_2, lotto.prize_3, lotto.prize_4, lotto.prize_5
        ]);

        return res.json({ status: 'success', date: draw_date });
    } catch (error) { 
        console.error(`❌ [Sync-Specific] งวด ${req.query.ddmmyyyy} ล้มเหลว:`, error.message);
        if (error.response && (error.response.status === 404 || error.response.status === 400)) {
            const dStr = req.query.ddmmyyyy.substring(0, 2); 
            const mStr = req.query.ddmmyyyy.substring(2, 4); 
            const yearInput = Number(req.query.ddmmyyyy.substring(4, 8));
            const yearCE = yearInput > 2400 ? yearInput - 543 : yearInput;
            const draw_date = `${yearCE}-${mStr}-${dStr}`;
            return res.json({ status: 'not_found', date: draw_date, message: 'ไม่มีข้อมูลในระบบต้นทาง' });
        }
        return res.json({ status: 'error', message: error.message }); 
    }
});

// ==========================================
// 15. 🔮 API: ระบบเลขตาม / เลขไหล 
// ==========================================
app.get('/api/lotto/predict-next', async (req, res) => {
    try {
        const { target_number, mode } = req.query; 
        if (!target_number || target_number.length !== 2) return res.status(400).json({ error: "กรุณาระบุตัวเลข 2 หลัก" });

        let targetColumn = "prize_2digits";
        if (mode === 'top') targetColumn = "RIGHT(prize_1, 2)";

        const query = `
            WITH OrderedDraws AS (
                SELECT draw_date, ${targetColumn} as current_num, LEAD(${targetColumn}) OVER (ORDER BY draw_date ASC) as next_num
                FROM lotto_history WHERE prize_1 IS NOT NULL AND prize_1 != ''
            )
            SELECT next_num as num, COUNT(*) as count FROM OrderedDraws
            WHERE current_num = ? AND next_num IS NOT NULL GROUP BY next_num ORDER BY count DESC, next_num ASC LIMIT 10
        `;

        const [results] = await db.query(query, [target_number]);
        const totalOccurrences = results.reduce((sum, row) => sum + row.count, 0);

        res.json({
            target: target_number, mode: mode, total_found: totalOccurrences,
            predictions: results.map(r => ({ number: r.num, count: r.count, percent: totalOccurrences > 0 ? Math.round((r.count / totalOccurrences) * 100) : 0 }))
        });
    } catch (error) { res.status(500).json({ error: "Database error" }); }
});

// ==========================================
// 16. 🧠 API: AI Analytics Dashboard 
// ==========================================
app.get('/api/lotto/analytics-dashboard', async (req, res) => {
    try {
        const [sleepingRows] = await db.query(`SELECT prize_2digits as num, MAX(draw_date) as last_seen, DATEDIFF(CURDATE(), MAX(draw_date)) as days_asleep FROM lotto_history WHERE prize_2digits IS NOT NULL AND prize_2digits != '' GROUP BY prize_2digits ORDER BY days_asleep DESC LIMIT 5`);
        const [coOccurRows] = await db.query(`SELECT RIGHT(prize_1, 2) as top_num, prize_2digits as bottom_num, COUNT(*) as count FROM lotto_history WHERE prize_1 IS NOT NULL AND prize_2digits IS NOT NULL AND prize_1 != '' AND prize_2digits != '' GROUP BY top_num, bottom_num HAVING count > 1 ORDER BY count DESC LIMIT 5`);
        const [allDraws] = await db.query(`SELECT draw_date, prize_1, prize_2digits, prize_3digits_back1, prize_3digits_back2 FROM lotto_history WHERE prize_1 IS NOT NULL AND prize_1 != '' ORDER BY draw_date DESC`);

        let doubleCount = 0, brotherCount = 0, normalCount = 0;
        let threeDigitsMap = {}; let scores = {};
        
        for(let i=0; i<=99; i++) { let n = String(i).padStart(2, '0'); scores[n] = { number: n, hot_score: 0, sleep_score: 0, total_score: 0 }; }
        let total = allDraws.length;

        allDraws.forEach((draw, index) => {
            let b2 = draw.prize_2digits;
            if (b2 && b2.length === 2) {
                let n1 = parseInt(b2[0]), n2 = parseInt(b2[1]);
                if (n1 === n2) doubleCount++;
                else if (Math.abs(n1 - n2) === 1 || Math.abs(n1 - n2) === 9) brotherCount++;
                else normalCount++;
                if (index < 50) scores[b2].hot_score += (50 - index);
            }
            if(draw.prize_3digits_back1 && draw.prize_3digits_back1 !== '') threeDigitsMap[draw.prize_3digits_back1] = (threeDigitsMap[draw.prize_3digits_back1] || 0) + 1;
            if(draw.prize_3digits_back2 && draw.prize_3digits_back2 !== '') threeDigitsMap[draw.prize_3digits_back2] = (threeDigitsMap[draw.prize_3digits_back2] || 0) + 1;
        });

        sleepingRows.forEach((sleepData, index) => { if(scores[sleepData.num]) scores[sleepData.num].sleep_score = (10 - index) * 15; });

        let aiPredictions = Object.values(scores).map(s => { s.total_score = s.hot_score + s.sleep_score; return s; }).sort((a, b) => b.total_score - a.total_score).slice(0, 5);
        let top3Digits = Object.entries(threeDigitsMap).map(([num, count]) => ({num, count})).sort((a, b) => b.count - a.count).slice(0, 5);

        res.json({ ai_prediction: aiPredictions, sleeping: sleepingRows, twins: coOccurRows, patterns: { double: Math.round((doubleCount/total)*100), brother: Math.round((brotherCount/total)*100), normal: Math.round((normalCount/total)*100) }, three_digits: top3Digits });
    } catch (error) { res.status(500).json({ error: "Database error" }); }
});

// ==========================================
// 17. ☁️ API: ทำนายฝันพรีเมียม 
// ==========================================
app.get('/api/dream/search', async (req, res) => {
    try {
        const { q } = req.query; if (!q) return res.json([]);
        const [rows] = await db.query(`SELECT keyword, meaning, lucky_numbers, category FROM dreams_premium WHERE keyword LIKE ? OR meaning LIKE ? LIMIT 20`, [`%${q}%`, `%${q}%`]);
        res.json(rows);
    } catch (error) { res.status(500).json({ error: "Database error" }); }
});

// ==========================================
// 18. 🃏 API: สุ่มไพ่ทาโรต์ 
// ==========================================
app.get('/api/tarot/draw', async (req, res) => {
    try {
        const count = parseInt(req.query.count) || 1; 
        const [cards] = await db.query(`SELECT * FROM tarot_cards_premium ORDER BY RAND() LIMIT ?`, [count]);
        const drawnCards = cards.map(card => {
            const isReversed = Math.random() < 0.3; 
            return { ...card, isReversed: isReversed, active_meaning: isReversed ? card.meaning_reversed : card.meaning_upright };
        });
        res.json(drawnCards);
    } catch (error) { res.status(500).json({ error: "Database error" }); }
});

// ==========================================
// 19. 📱 API: วิเคราะห์เบอร์มงคล 
// ==========================================
app.get('/api/phone/analyze', async (req, res) => {
    try {
        const { number } = req.query;
        if (!number || number.length < 7) return res.status(400).json({ error: 'เบอร์โทรศัพท์ไม่ถูกต้อง' });

        let total_sum = 0; for (let i = 0; i < number.length; i++) total_sum += parseInt(number[i]);
        const last7 = number.slice(-7); let pairs = [];
        for (let i = 0; i < last7.length - 1; i++) pairs.push(last7.substring(i, i + 2));

        const placeholders = pairs.map(() => '?').join(',');
        const [pairRows] = await db.query(`SELECT pair, meaning, grade FROM phone_numerology_premium WHERE pair IN (${placeholders})`, pairs);

        const pairResults = pairs.map(p => {
            const found = pairRows.find(r => r.pair === p);
            return { pair: p, meaning: found ? found.meaning : 'พลังงานทั่วไป ไม่ส่งผลเสีย', grade: found ? found.grade : 'B' };
        });

        const [sumRows] = await db.query(`SELECT meaning, grade FROM name_numerology_premium WHERE score = ?`, [total_sum]);
        let sum_meaning = sumRows.length > 0 ? sumRows[0].meaning : 'ผลรวมนี้มีพลังงานระดับปานกลาง';
        let overall_grade = sumRows.length > 0 ? sumRows[0].grade : 'B';

        let summary = "เบอร์นี้มีพลังงานผสมผสาน ควรใช้ด้วยความระมัดระวัง";
        if (pairResults.every(p => p.grade === 'A' || p.grade === 'A+')) summary = "เบอร์มงคลระดับสูงสุด! ส่งเสริมทุกด้านของชีวิต";
        else if (pairResults.some(p => p.grade === 'C' || p.grade === 'D')) summary = "เบอร์นี้มีจุดอ่อนที่ต้องระวัง อาจมีอุปสรรคแฝงอยู่";

        res.json({ total_sum, sum_meaning, pairs: pairResults, overall_grade, summary });
    } catch (error) { res.status(500).json({ error: "Database error" }); }
});


// ==========================================
// 20. 🚗 API: วิเคราะห์ทะเบียนรถ 
// ==========================================
function getThaiCharNumber(char) {
    const scores = { 1: ['ก', 'ด', 'ถ', 'ท', 'ภ', 'ฤ'], 2: ['ข', 'ช', 'บ', 'ป', 'ง'], 3: ['ต', 'ฒ', 'ฆ'], 4: ['ค', 'ธ', 'ร', 'ญ', 'ษ'], 5: ['ฉ', 'ฌ', 'ฎ', 'ฏ', 'ฐ', 'ณ', 'ฬ', 'ห'], 6: ['จ', 'ล', 'ว', 'อ'], 7: ['ซ', 'ศ', 'ส'], 8: ['ผ', 'ฝ', 'พ', 'ฟ', 'ย'], 9: ['ม'] };
    for (let s in scores) { if (scores[s].includes(char)) return parseInt(s); }
    return 0; 
}

app.get('/api/plate/analyze', async (req, res) => {
    try {
        const { char, num } = req.query;
        if (!char || !num) return res.status(400).json({ error: 'ข้อมูลไม่ครบถ้วน' });

        let text_val = 0;
        for (let i = 0; i < char.length; i++) {
            if (!isNaN(parseInt(char[i]))) text_val += parseInt(char[i]); 
            else text_val += getThaiCharNumber(char[i]); 
        }

        let num_val = 0; for (let i = 0; i < num.length; i++) num_val += parseInt(num[i]);
        let total_sum = text_val + num_val;

        const [rows] = await db.query(`SELECT meaning, grade FROM plate_numerology_premium WHERE total_sum = ?`, [total_sum]);
        let meaning = rows.length > 0 ? rows[0].meaning : 'เป็นป้ายทะเบียนที่พลังงานเป็นกลาง เดินทางปลอดภัย';
        let grade = rows.length > 0 ? rows[0].grade : 'B';
        
        let advice = "หมั่นทำบุญและขับรถด้วยความไม่ประมาท";
        if (grade === 'A+' || grade === 'A') advice = "ทะเบียนมงคลยิ่ง! เสริมบารมี หน้าที่การงาน และแคล้วคลาดปลอดภัย";
        else if (grade === 'C' || grade === 'D') advice = "แนะนำให้หาแผ่นทองมนต์ตรา หรือพระเครื่องมาตั้งหน้ารถเพื่อแก้เคล็ด";

        res.json({ text_val, num_val, total_sum, meaning, grade, advice });
    } catch (error) { res.status(500).json({ error: "Database error" }); }
});

// ==========================================
// 🌟 ฟังก์ชันคำนวณเลขศาสตร์ (ทักษา) ภาษาไทย
// ==========================================
function calculateNameScore(name) {
    if(!name) return 0;
    const charScores = { 'ก':1, 'ด':1, 'ถ':1, 'ท':1, 'ภ':1, 'ฤ':1, 'า':1, 'ำ':1, 'ุ':1, '่':1, 'ๅ':1, 'ข':2, 'ช':2, 'บ':2, 'ป':2, 'ง':2, 'เ':2, 'แ':2, 'โ':2, 'ใ':2, 'ไ':2, 'ต':3, 'ฒ':3, 'ฆ':3, '้':3, 'ค':4, 'ธ':4, 'ร':4, 'ญ':4, 'ษ':4, 'ะ':4, 'ั':4, 'ิ':4, 'ฉ':5, 'ฌ':5, 'ฎ':5, 'ฏ':5, 'ฐ':5, 'ณ':5, 'ฬ':5, 'ห':5, 'ึ':5, 'ี':5, 'จ':6, 'ล':6, 'ว':6, 'อ':6, 'ซ':7, 'ศ':7, 'ส':7, 'ู':7, 'ผ':8, 'ฝ':8, 'พ':8, 'ฟ':8, 'ย':8, '็':8, 'ม':9, '์':9, '๋':9, '๊':9 };
    let score = 0;
    for (let i = 0; i < name.length; i++) { if (charScores[name[i]]) score += charScores[name[i]]; }
    return score;
}

// ==========================================
// 21. 📝 API: วิเคราะห์ชื่อมงคล 
// ==========================================
app.get('/api/name/analyze', async (req, res) => {
    try {
        const { firstname, lastname } = req.query;
        if (!firstname) return res.status(400).json({ error: 'กรุณาระบุชื่อ' });

        const firstScore = calculateNameScore(firstname);
        const lastScore = calculateNameScore(lastname || '');
        const totalScore = firstScore + lastScore;

        const scoresToFetch = [firstScore, lastScore, totalScore].filter(s => s > 0);
        const [rows] = await db.query(`SELECT score, meaning, grade FROM name_numerology_premium WHERE score IN (?)`, [scoresToFetch.length > 0 ? scoresToFetch : 0]);

        const getResult = (score) => {
            const found = rows.find(r => r.score === score);
            return { score: score, meaning: found ? found.meaning : 'พลังงานระดับปานกลาง เป็นไปตามกรรมและการกระทำ', grade: found ? found.grade : 'B' };
        };

        res.json({ firstname: { name: firstname, ...getResult(firstScore) }, lastname: lastname ? { name: lastname, ...getResult(lastScore) } : null, total: getResult(totalScore) });
    } catch (error) { res.status(500).json({ error: "Database error" }); }
});

// ==========================================
// 22. 👶 API: ระบบผู้เชี่ยวชาญตั้งชื่อ 
// ==========================================
app.get('/api/naming/suggest', async (req, res) => {
    try {
        const { day, gender } = req.query;
        const mockNames = [ { name_th: "ญาณวิชญ์", meaning: "ผู้มีความรู้หยั่งรู้", numerology_score: 45 }, { name_th: "ธัญชนก", meaning: "ผู้ให้กำเนิดสิริมงคล", numerology_score: 24 }, { name_th: "ปวริศา", meaning: "ผู้ประเสริฐและยิ่งใหญ่", numerology_score: 41 }, { name_th: "กฤติน", meaning: "ผู้ที่ทำกิจสำเร็จ", numerology_score: 15 }, { name_th: "นภัสวรรณ", meaning: "มีผิวพรรณงดงามดั่งฟ้า", numerology_score: 51 } ];
        const shuffled = mockNames.sort(() => 0.5 - Math.random());
        res.json(shuffled.slice(0, 3));
    } catch (error) { res.status(500).json({ error: "Database error" }); }
});

// ==========================================
// 23. ☯️ API: ดวงชะตาพื้นฐาน 
// ==========================================
app.get('/api/astrology/analyze', async (req, res) => {
    try {
        const { zodiac, year } = req.query; 
        const [western] = await db.query(`SELECT * FROM western_zodiac_premium WHERE name_th = ?`, [zodiac]);
        const [thai] = await db.query(`SELECT * FROM thai_zodiac_premium WHERE name_th = ?`, [year]);
        res.json({ western: western[0] || { meaning: "ดวงชะตาพัดพาไปตามกาลเวลา" }, thai: thai[0] || { meaning: "ชะตาชีวิตลิขิตด้วยการกระทำ" } });
    } catch (error) { res.status(500).json({ error: "Database error" }); }
});

// ==========================================
// 24. ⛩️ API: เสี่ยงเซียมซี 
// ==========================================
app.get('/api/siemsi/draw', async (req, res) => {
    try {
        const [rows] = await db.query(`SELECT * FROM siemsi_premium ORDER BY RAND() LIMIT 1`);
        if (rows.length === 0) return res.status(404).json({ error: "ไม่พบใบเซียมซี" });
        res.json(rows[0]);
    } catch (error) { res.status(500).json({ error: "Database error" }); }
});

// ==========================================
// 25. 📅 API: ปฏิทินฤกษ์มงคล 
// ==========================================
app.get('/api/calendar/events', async (req, res) => {
    try {
        const { month, year } = req.query; 
        const [rows] = await db.query(`SELECT event_date as date, title, description, icon, color_theme as color FROM auspicious_days_premium WHERE MONTH(event_date) = ? AND YEAR(event_date) = ?`, [month, year]);
        res.json(rows);
    } catch (error) { res.json([]); }
});

// ==========================================
// 🤖 ระบบ Automation: ดึงผลหวยอัตโนมัติ 
// ==========================================
const cron = require('node-cron');

cron.schedule('0 30 16 1,16 * *', async () => {
    console.log("⏰ [CRON-JOB] เริ่มต้นระบบดูดผลหวยอัตโนมัติ...");
    await fetchLatestLotto();
}, {
    scheduled: true,
    timezone: "Asia/Bangkok"
});


setInterval(fetchLatestLotto, 7200000);

// 🌟 จุดที่ต้องแก้ไข 🌟
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✨ Likit Fah Server is running on port ${PORT}`));


// ดึงไฟล์ที่เราเพิ่งสร้างเข้ามา
const blueprintRoutes = require('./routes/api-blueprint'); // หรืออ้างอิงตามพาร์ทที่บอสเซฟไว้

// สั่งให้เซิร์ฟเวอร์ใช้งาน Route นี้
app.use('/api/v1', blueprintRoutes);

// ดึงไฟล์ API ที่เราเพิ่งสร้าง
const lottoScienceRoutes = require('./routes/api-lotto-science');

// ให้เซิร์ฟเวอร์เปิดทางเชื่อม
app.use('/api/v1', lottoScienceRoutes);

app.use('/api/v1', require('./routes/api-chinese-calendar'));