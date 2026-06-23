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

// Low-level call to Google Translate API for a batch of strings
async function translateTextBatch(texts, targetLang = 'en') {
    if (texts.length === 0) return [];
    
    // Normalize newlines in each text to a placeholder
    const normalized = texts.map(t => t.replace(/\r?\n/g, ' ___NL___ '));
    const combined = normalized.join('\n');
    
    try {
        const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${targetLang}&dt=t&q=${encodeURIComponent(combined)}`;
        const response = await axios.get(url, { timeout: 10000 });
        if (response.data && response.data[0]) {
            const translatedCombined = response.data[0].map(item => item[0]).join('');
            const lines = translatedCombined.split('\n');
            
            return texts.map((original, index) => {
                let line = lines[index] || '';
                line = line.replace(/\s*___NL___\s*/gi, '\n').trim();
                return line || original;
            });
        }
        return texts;
    } catch (e) {
        console.error(`[Translator Batch Error] Translation request failed:`, e.message);
        return texts;
    }
}

const skipKeys = [
    'id', 'card_id', 'pair', 'color_theme', 'icon', 'image_url', 
    'created_at', 'draw_date', 'draw_day_of_week', 'draw_month', 'draw_year',
    'formula', 'formula_code', 'category', 'status'
];

// Helper to collect all unique Thai strings recursively
function collectThaiStrings(obj, collected = new Set()) {
    if (obj === null || obj === undefined) return collected;

    if (typeof obj === 'string') {
        if (/[\u0E00-\u0E7F]/.test(obj)) {
            collected.add(obj);
        }
        return collected;
    }

    if (Array.isArray(obj)) {
        for (const item of obj) {
            collectThaiStrings(item, collected);
        }
        return collected;
    }

    if (typeof obj === 'object') {
        if (!(obj instanceof Object) || obj instanceof Date) return collected;
        
        for (const [key, value] of Object.entries(obj)) {
            if (skipKeys.includes(key)) continue;
            collectThaiStrings(value, collected);
        }
        return collected;
    }

    return collected;
}

// Helper to replace Thai strings in an object using the translation map
function replaceThaiStrings(obj, translationMap) {
    if (obj === null || obj === undefined) return obj;

    if (typeof obj === 'string') {
        return translationMap.get(obj) || obj;
    }

    if (Array.isArray(obj)) {
        return obj.map(item => replaceThaiStrings(item, translationMap));
    }

    if (typeof obj === 'object') {
        if (!(obj instanceof Object) || obj instanceof Date) return obj;
        
        const newObj = {};
        for (const [key, value] of Object.entries(obj)) {
            if (skipKeys.includes(key)) {
                newObj[key] = value;
            } else {
                newObj[key] = replaceThaiStrings(value, translationMap);
            }
        }
        return newObj;
    }

    return obj;
}

// Translate with persistent DB caching and batching
async function translateObject(obj, targetLang = 'en') {
    if (obj === null || obj === undefined) return obj;

    // 1. Collect all unique Thai strings
    const thaiStringsSet = collectThaiStrings(obj);
    const thaiStrings = Array.from(thaiStringsSet);
    if (thaiStrings.length === 0) return obj;

    const translationMap = new Map();
    const missedTexts = [];
    const hashToText = new Map();
    const hashes = [];

    // Map each string to its MD5 hash
    for (const text of thaiStrings) {
        const hash = crypto.createHash('md5').update(text + '_' + targetLang).digest('hex');
        hashes.push(hash);
        hashToText.set(hash, text);
    }

    try {
        // 2. Query the DB cache for all hashes in a single query
        const placeholders = hashes.map(() => '?').join(',');
        const [rows] = await db.query(
            `SELECT id, text_en FROM translation_cache WHERE id IN (${placeholders})`,
            hashes
        );

        // Map hits
        const hitHashes = new Set();
        for (const row of rows) {
            const originalText = hashToText.get(row.id);
            if (originalText) {
                translationMap.set(originalText, row.text_en);
                hitHashes.add(row.id);
            }
        }

        // Identify misses
        for (const hash of hashes) {
            if (!hitHashes.has(hash)) {
                missedTexts.push(hashToText.get(hash));
            }
        }
    } catch (e) {
        console.error("[Translator] Cache query failed, falling back to direct batch translation:", e.message);
        // On DB error, treat everything as cache miss
        missedTexts.push(...thaiStrings);
    }

    // 3. Translate misses in batches
    if (missedTexts.length > 0) {
        // Chunk misses into batches of combined length <= 3000 chars
        const batches = [];
        let currentBatch = [];
        let currentLen = 0;

        for (const text of missedTexts) {
            if (currentLen + text.length > 3000 && currentBatch.length > 0) {
                batches.push(currentBatch);
                currentBatch = [];
                currentLen = 0;
            }
            currentBatch.push(text);
            currentLen += text.length;
        }
        if (currentBatch.length > 0) {
            batches.push(currentBatch);
        }

        // Process batches
        for (const batch of batches) {
            const translatedBatch = await translateTextBatch(batch, targetLang);
            
            // Map translated texts and save to DB cache
            const dbSavePromises = [];
            for (let i = 0; i < batch.length; i++) {
                const original = batch[i];
                const translated = translatedBatch[i];
                translationMap.set(original, translated);

                const hash = crypto.createHash('md5').update(original + '_' + targetLang).digest('hex');
                // Insert into cache
                dbSavePromises.push(
                    db.query(
                        'INSERT INTO translation_cache (id, text_th, text_en) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE text_en = ?',
                        [hash, original, translated, translated]
                    ).catch(err => console.error("[Translator] Cache write failed:", err.message))
                );
            }
            // Wait for DB writes in background
            await Promise.all(dbSavePromises);
        }
    }

    // 4. Replace Thai strings in the input object/array
    return replaceThaiStrings(obj, translationMap);
}

module.exports = {
    setupCacheTable,
    translateTextBatch,
    translateObject
};
