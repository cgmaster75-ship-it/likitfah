const pathPrefix = window.location.pathname.includes('/blog/articles/') ? '../../' : '';

// 1. Inject Bilingual CSS toggles instantly to prevent text flashing
const style = document.createElement('style');
style.textContent = `
    [lang="th"] .lang-en { display: none !important; }
    [lang="en"] .lang-th { display: none !important; }
`;
document.head.appendChild(style);

// 1.1 Global Fetch Interceptor to append lang query param to all /api/ requests
const originalFetch = window.fetch;
window.fetch = function(input, init) {
    const currentLang = localStorage.getItem('lang') || 'th';
    if (typeof input === 'string' && input.includes('/api/')) {
        try {
            const isAbsolute = input.startsWith('http://') || input.startsWith('https://') || input.startsWith('//');
            const url = isAbsolute ? new URL(input) : new URL(input, window.location.origin);
            if (!url.searchParams.has('lang')) {
                url.searchParams.set('lang', currentLang);
            }
            input = isAbsolute ? url.toString() : url.pathname + url.search;
        } catch (e) {
            if (input.includes('?')) {
                input += `&lang=${currentLang}`;
            } else {
                input += `?lang=${currentLang}`;
            }
        }
    } else if (input && typeof input === 'object' && typeof input.url === 'string' && input.url.includes('/api/')) {
        try {
            const url = new URL(input.url);
            if (!url.searchParams.has('lang')) {
                url.searchParams.set('lang', currentLang);
                const clonedRequest = new Request(url.toString(), input);
                return originalFetch(clonedRequest, init);
            }
        } catch (e) {
            console.error("Fetch interceptor Request object parsing failed:", e);
        }
    }
    return originalFetch(input, init);
};

// 2. Helper to set language attribute on HTML document
function setDocumentLanguage(lang) {
    document.documentElement.lang = lang;
    const btnText = document.getElementById('global-lang-btn-text');
    if (btnText) {
        btnText.textContent = lang === 'th' ? 'EN' : 'TH';
    }
}

// 3. Language Detection Engine
function detectAndApplyLanguage() {
    const urlParams = new URLSearchParams(window.location.search);
    const urlLang = urlParams.get('lang');

    // Priority 1: URL query parameter
    if (urlLang === 'th' || urlLang === 'en') {
        localStorage.setItem('lang', urlLang);
        setDocumentLanguage(urlLang);
        return;
    }

    // Priority 2: Saved user preference
    const savedLang = localStorage.getItem('lang');
    if (savedLang === 'th' || savedLang === 'en') {
        setDocumentLanguage(savedLang);
        return;
    }

    // Priority 3: Browser language default
    const browserLang = navigator.language.startsWith('th') ? 'th' : 'en';
    localStorage.setItem('lang', browserLang);
    setDocumentLanguage(browserLang);

    // Async Priority 4: Geolocation check (freeipapi is fast and CORS-friendly)
    fetch('https://freeipapi.com/api/json')
        .then(res => res.json())
        .then(data => {
            const geoLang = String(data.countryCode).toUpperCase() === 'TH' ? 'th' : 'en';
            localStorage.setItem('lang', geoLang);
            setDocumentLanguage(geoLang);
        })
        .catch(err => console.log('Geo detection fallback:', err));
}

// 4. Toggle Language Handler
window.toggleGlobalLanguage = function() {
    const currentLang = document.documentElement.lang || 'th';
    const targetLang = currentLang === 'th' ? 'en' : 'th';
    localStorage.setItem('lang', targetLang);
    setDocumentLanguage(targetLang);

    // Redirect to translated blog article if reading a blog post
    const altLink = document.querySelector(`link[rel="alternate"][hreflang="${targetLang}"]`);
    if (altLink && altLink.getAttribute('href')) {
        window.location.href = altLink.getAttribute('href');
    } else {
        const url = new URL(window.location.href);
        url.searchParams.set('lang', targetLang);
        window.location.href = url.toString();
    }
};

// =========================================================================
// 🌟 Dynamic DOM Translation Engine
// =========================================================================

// Regex patterns for dynamic strings
const DYNAMIC_PATTERNS = [
    { regex: /^สำหรับ\s+(.+)$/i, replace: "For $1" },
    { regex: /^ตั้งสมาธิ\s+แล้วเลือกไพ่\s+(\d+)\s+/\s+(\d+)\s+ใบ$/i, replace: "Concentrate and choose $1 / $2 cards" },
    { regex: /^เซียมซีใบที่\s+(.+)$/i, replace: "Siemsi Sheet No. $1" },
    { regex: /^ชะตาของคุณตกที่\s+(.+)$/i, replace: "Your fortune lands on $1" },
    { regex: /^ผลรวมตัวเลข\s+(.+)$/i, replace: "Total Sum: $1" },
    { regex: /^ทะเบียนรถ\s+(.+)$/i, replace: "License Plate: $1" },
    { regex: /^อายุ\s+(\d+)\s+ปี$/i, replace: "$1 years old" },
    { regex: /^ผู้เสี่ยงทาย:\s+คุณ\s+(.+)$/i, replace: "Seeker: Mr/Ms $1" },
    { regex: /^ผู้เสี่ยงทาย:\s+(.+)$/i, replace: "Seeker: $1" },
    { regex: /^คำทำนายปี\s+(\d+)$/i, replace: "Year $1 Prophecy" },
    { regex: /^อายุย่าง\s+(\d+)\s+ปี$/i, replace: "$1 years old" }
];

// Cache of translated texts to avoid multiple calls for the same text
const localTranslationCache = new Map();

// Low-level client call to the backend batch translation API
async function fetchBatchTranslation(texts) {
    if (texts.length === 0) return [];
    try {
        const response = await fetch('/api/translate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ texts })
        });
        if (response.ok) {
            const data = await response.json();
            return data.translated || [];
        }
    } catch (e) {
        console.error("[DOM Translation API Error]:", e);
    }
    return texts;
}

// Translate all text nodes inside a root node
async function translateDOM(root = document.body) {
    const currentLang = localStorage.getItem('lang') || 'th';
    if (currentLang !== 'en' || !root) return;

    const walker = document.createTreeWalker(
        root,
        NodeFilter.SHOW_TEXT,
        null,
        false
    );

    const nodesToTranslate = [];
    const textsToTranslate = [];

    let node;
    while (node = walker.nextNode()) {
        const originalText = node.nodeValue.trim();
        if (!originalText || !/[\u0E00-\u0E7F]/.test(originalText)) continue;

        // Check local cache first
        if (localTranslationCache.has(originalText)) {
            node.nodeValue = node.nodeValue.replace(originalText, localTranslationCache.get(originalText));
            continue;
        }

        // Check dynamic regex patterns
        let matchedPattern = false;
        for (const pattern of DYNAMIC_PATTERNS) {
            if (pattern.regex.test(originalText)) {
                // We need to translate the variable part (e.g. name or house)
                const match = originalText.match(pattern.regex);
                const variablePart = match[1];
                
                if (/[\u0E00-\u0E7F]/.test(variablePart)) {
                    // Translate variable part first
                    nodesToTranslate.push({ node, originalText, pattern, variablePart });
                    textsToTranslate.push(variablePart);
                } else {
                    const translated = originalText.replace(pattern.regex, pattern.replace);
                    localTranslationCache.set(originalText, translated);
                    node.nodeValue = node.nodeValue.replace(originalText, translated);
                }
                matchedPattern = true;
                break;
            }
        }

        if (!matchedPattern) {
            nodesToTranslate.push({ node, originalText });
            textsToTranslate.push(originalText);
        }
    }

    // Translate placeholder attributes in inputs
    const inputs = root.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        const ph = input.getAttribute('placeholder');
        if (ph && /[\u0E00-\u0E7F]/.test(ph)) {
            if (localTranslationCache.has(ph)) {
                input.setAttribute('placeholder', localTranslationCache.get(ph));
            } else {
                nodesToTranslate.push({ input, attribute: 'placeholder', originalText: ph });
                textsToTranslate.push(ph);
            }
        }
    });

    // Run batch API translation
    if (textsToTranslate.length > 0) {
        // Collect unique texts to minimize request payload
        const uniqueTexts = Array.from(new Set(textsToTranslate));
        const translatedList = await fetchBatchTranslation(uniqueTexts);
        
        const tempMap = new Map();
        uniqueTexts.forEach((text, i) => {
            tempMap.set(text, translatedList[i] || text);
        });

        // Apply translations
        nodesToTranslate.forEach(item => {
            if (item.node) {
                if (item.pattern) {
                    const translatedVar = tempMap.get(item.variablePart);
                    const translatedText = item.originalText.replace(item.pattern.regex, item.pattern.replace).replace(item.variablePart, translatedVar);
                    localTranslationCache.set(item.originalText, translatedText);
                    item.node.nodeValue = item.node.nodeValue.replace(item.originalText, translatedText);
                } else {
                    const translatedText = tempMap.get(item.originalText);
                    localTranslationCache.set(item.originalText, translatedText);
                    item.node.nodeValue = item.node.nodeValue.replace(item.originalText, translatedText);
                }
            } else if (item.input) {
                const translatedText = tempMap.get(item.originalText);
                localTranslationCache.set(item.originalText, translatedText);
                item.input.setAttribute(item.attribute, translatedText);
            }
        });
    }
}

// Setup MutationObserver to translate dynamically loaded/updated content
let domObserver = null;
function setupDOMTranslationObserver() {
    const currentLang = localStorage.getItem('lang') || 'th';
    if (currentLang !== 'en') return;

    if (domObserver) domObserver.disconnect();

    domObserver = new MutationObserver((mutations) => {
        domObserver.disconnect();
        
        const addedElements = [];
        mutations.forEach(mutation => {
            if (mutation.type === 'childList') {
                mutation.addedNodes.forEach(node => {
                    if (node.nodeType === Node.ELEMENT_NODE) {
                        addedElements.push(node);
                    } else if (node.nodeType === Node.TEXT_NODE) {
                        const text = node.nodeValue.trim();
                        if (text && /[\u0E00-\u0E7F]/.test(text)) {
                            translateDOM(node.parentNode || document.body);
                        }
                    }
                });
            } else if (mutation.type === 'characterData') {
                const text = mutation.target.nodeValue.trim();
                if (text && /[\u0E00-\u0E7F]/.test(text)) {
                    translateDOM(mutation.target.parentNode || document.body);
                }
            }
        });

        // Translate added elements
        addedElements.forEach(el => translateDOM(el));

        domObserver.observe(document.body, {
            childList: true,
            subtree: true,
            characterData: true
        });
    });

    domObserver.observe(document.body, {
        childList: true,
        subtree: true,
        characterData: true
    });
}

// Initial invocation on script load to apply language before DOM renders
detectAndApplyLanguage();

document.addEventListener("DOMContentLoaded", () => {
    // Run translation immediately
    translateDOM(document.body);
    setupDOMTranslationObserver();
    // Robust check for index page based on existence of astroForm
    const isIndexPage = document.getElementById('astroForm') !== null;
    const isDashboardPage = document.getElementById('greeting-text') !== null;

    if (isDashboardPage) {
        const currentLang = document.documentElement.lang || 'th';
        const btnText = document.getElementById('global-lang-btn-text');
        if (btnText) {
            btnText.textContent = currentLang === 'th' ? 'EN' : 'TH';
        }
        return; // Skip top header injection on dashboard
    }

    const logoOnClick = isIndexPage ? '' : `onclick="window.location.href='${pathPrefix}dashboard.html'"`;
    const logoCursorClass = isIndexPage ? '' : 'cursor-pointer';

    const buttonsHTML = isIndexPage ? `
        <!-- Language Switcher Button Only -->
        <button onclick="toggleGlobalLanguage()" class="text-[10px] md:text-xs px-2.5 py-1.5 rounded-full border border-slate-700 bg-slate-800/40 hover:bg-slate-700/60 text-slate-300 transition-all font-medium flex items-center gap-1 shadow-md" style="font-family: 'Prompt', sans-serif;">
            <i class="fa-solid fa-globe text-amber-400"></i>
            <span id="global-lang-btn-text">EN</span>
        </button>
    ` : `
        <!-- Language Switcher Button -->
        <button onclick="toggleGlobalLanguage()" class="text-[10px] md:text-xs px-2.5 py-1.5 rounded-full border border-slate-700 bg-slate-800/40 hover:bg-slate-700/60 text-slate-300 transition-all font-medium flex items-center gap-1 shadow-md" style="font-family: 'Prompt', sans-serif;">
            <i class="fa-solid fa-globe text-amber-400"></i>
            <span id="global-lang-btn-text">EN</span>
        </button>

        <button onclick="window.location.href='${pathPrefix}donate.html'" class="text-[10px] md:text-xs px-3 py-1.5 rounded-full border border-rose-500/50 bg-rose-500/20 hover:bg-rose-500/40 text-rose-200 transition-all font-medium flex items-center shadow-[0_0_10px_rgba(225,29,72,0.3)]" style="font-family: 'Prompt', sans-serif;">
            <i class="fa-solid fa-mug-hot mr-1.5 text-rose-400"></i>
            <span class="lang-th">เลี้ยงกาแฟ</span>
            <span class="lang-en">Buy Coffee</span>
        </button>

        <button onclick="window.location.href='${pathPrefix}dashboard.html'" class="text-[10px] md:text-xs px-3 py-1.5 rounded-full border border-amber-500/40 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 transition-all font-medium" style="font-family: 'Prompt', sans-serif;">
            <i class="fa-solid fa-arrow-left-long mr-1 text-amber-400"></i>
            <span class="lang-th">เมนู</span>
            <span class="lang-en">Menu</span>
        </button>
    `;

    const topHeaderHTML = `
        <nav id="global-top-header" class="fixed top-0 left-0 right-0 z-[90] transition-transform duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.5)] rounded-b-2xl border-b border-amber-500/20" style="background: rgba(11, 11, 26, 0.85); backdrop-filter: blur(16px);">
             <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div class="flex items-center justify-between h-14 md:h-16">
                      <div class="flex items-center gap-3 ${logoCursorClass}" ${logoOnClick}>
                          <img src="${pathPrefix}img/logo-likitfah.png" alt="ลิขิตฟ้า" class="w-8 h-8 md:w-10 md:h-10 rounded-full border border-amber-500/50 shadow-[0_0_10px_rgba(245,158,11,0.5)] object-cover">
                          <h1 class="font-bold text-lg md:text-xl tracking-widest gold-gradient-text" style="font-family: 'Cinzel', serif;">
                              <span class="lang-th">ลิขิตฟ้า</span>
                              <span class="lang-en">Likit Fah</span>
                          </h1>
                      </div>
                      <div class="flex items-center gap-2">
                          ${buttonsHTML}
                      </div>
                  </div>
             </div>
          </nav>
          <div class="h-16 md:h-20 w-full"></div>
    `;

    document.body.insertAdjacentHTML('afterbegin', topHeaderHTML);
    
    // Set switcher text based on active lang after DOM loads
    const currentLang = document.documentElement.lang || 'th';
    const btnText = document.getElementById('global-lang-btn-text');
    if (btnText) {
        btnText.textContent = currentLang === 'th' ? 'EN' : 'TH';
    }

    let lastScrollY = window.scrollY;
    const header = document.getElementById('global-top-header');
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        if (currentScrollY > lastScrollY && currentScrollY > 50) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        lastScrollY = currentScrollY;
    }, { passive: true });
});