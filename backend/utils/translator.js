const axios = require('axios');
const crypto = require('crypto');
const db = require('../db');

// Setup the translation cache table in MySQL
async function setupCacheTable() {
    try {
        console.log("[Translator] Ensuring translation_cache table exists...");
        await db.query(`
            CREATE TABLE IF NOT EXISTS translation_cache (
                id VARCHAR(64) PRIMARY KEY,
                text_th TEXT NOT NULL,
                text_en TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            ) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
        `);
        console.log("[Translator] translation_cache table is ready.");
    } catch (e) {
        console.error("[Translator] Failed to setup cache table:", e.message);
    }
}

// Low-level call to Google Translate API
async function translateText(text, targetLang = 'en') {
    try {
        const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`;
        const response = await axios.get(url, { timeout: 6000 });
        if (response.data && response.data[0]) {
            return response.data[0].map(item => item[0]).join('');
        }
        return text;
    } catch (e) {
        console.error(`[Translator] Translation request failed for "${text.slice(0, 30)}...":`, e.message);
        return text;
    }
}

// Translate with persistent DB caching
async function translateTextCached(text, targetLang = 'en') {
    if (!text || typeof text !== 'string') return text;
    // Only translate strings containing Thai characters
    if (!/[\u0E00-\u0E7F]/.test(text)) return text;

    const hash = crypto.createHash('md5').update(text + '_' + targetLang).digest('hex');

    try {
        // Query the cache
        const [rows] = await db.query('SELECT text_en FROM translation_cache WHERE id = ?', [hash]);
        if (rows.length > 0) {
            return rows[0].text_en;
        }

        // Translate
        const translated = await translateText(text, targetLang);

        // Save to cache (using ON DUPLICATE KEY UPDATE to avoid concurrent write collisions)
        await db.query(
            'INSERT INTO translation_cache (id, text_th, text_en) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE text_en = ?',
            [hash, text, translated, translated]
        );

        return translated;
    } catch (e) {
        console.error("[Translator] Cache query/insert failed:", e.message);
        // Fallback to direct translation on database error
        return await translateText(text, targetLang);
    }
}

// Recursively traverse and translate object fields
async function translateObject(obj, targetLang = 'en') {
    if (obj === null || obj === undefined) return obj;

    if (typeof obj === 'string') {
        return await translateTextCached(obj, targetLang);
    }

    if (Array.isArray(obj)) {
        const translatedArray = [];
        for (const item of obj) {
            translatedArray.push(await translateObject(item, targetLang));
        }
        return translatedArray;
    }

    if (typeof obj === 'object') {
        const translatedObj = {};
        for (const [key, value] of Object.entries(obj)) {
            // Skip translating technical fields or fields that must stay unchanged
            const skipKeys = [
                'id', 'card_id', 'pair', 'color_theme', 'icon', 'image_url', 
                'created_at', 'draw_date', 'draw_day_of_week', 'draw_month', 'draw_year',
                'formula', 'formula_code', 'category', 'status'
            ];
            if (skipKeys.includes(key)) {
                translatedObj[key] = value;
            } else {
                translatedObj[key] = await translateObject(value, targetLang);
            }
        }
        return translatedObj;
    }

    return obj;
}

module.exports = {
    setupCacheTable,
    translateText,
    translateTextCached,
    translateObject
};
