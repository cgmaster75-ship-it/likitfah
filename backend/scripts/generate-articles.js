const fs = require('fs');
const path = require('path');
const db = require('../db');

// ฟังก์ชันสร้างความยาวของบทความโดยการเสริมเนื้อหาเสริมดวงและคำถามที่พบบ่อย
function getFAQs(type, name) {
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
                <p class="text-amber-400 font-medium text-sm">Q: วิธีเสริมดวงชะตาที่ดีที่สุดสำหรับชาวราศี ${name} คืออะไร?</p>
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

// ฟังก์ชันไฮไลต์คีย์เวิร์ด
function highlightKeywords(text) {
    if (!text) return '';
    const keywords = [
        'ดวงชะตา', 'คำทำนาย', 'ความรัก', 'การเงิน', 'การงาน', 'สุขภาพ', 'สถิติ', 'เลขมงคล', 
        'เลขเด็ด', 'ราศี', 'โชคลาภ', 'ระมัดระวัง', 'พยากรณ์', 'แนะนำ', 'ความเชื่อ', 'บาจื่อ'
    ];
    let highlighted = text;
    keywords.forEach(kw => {
        const regex = new RegExp(kw, 'g');
        highlighted = highlighted.replace(regex, `<strong class="text-amber-400 font-bold">${kw}</strong>`);
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
        "https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?q=80&w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45?q=80&w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1464802686167-b939a6910659?q=80&w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1538370965046-79c0d6907d47?q=80&w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?q=80&w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?q=80&w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?q=80&w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?q=80&w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?q=80&w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1502134249126-9f3755a50d78?q=80&w=600&auto=format&fit=crop"
    ];
    return zodiacImages[index % 12];
}

function getWesternZodiacImageUrl(index) {
    const westernZodiacImages = [
        "https://images.unsplash.com/photo-1502134249126-9f3755a50d78?q=80&w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45?q=80&w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1454789548928-9efd52dc4031?q=80&w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?q=80&w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1519074002996-a69e7ac46a42?q=80&w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?q=80&w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1497294815431-9365093b7331?q=80&w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?q=80&w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?q=80&w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?q=80&w=600&auto=format&fit=crop"
    ];
    return westernZodiacImages[index % 12];
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
    if (kw.includes('งู')) return "https://images.unsplash.com/photo-1545249390-6bdfa286032f?q=80&w=600&auto=format&fit=crop";
    if (kw.includes('ทอง')) return "https://images.unsplash.com/photo-1589758438368-0ad531db3366?q=80&w=600&auto=format&fit=crop";
    if (kw.includes('เสือ')) return "https://images.unsplash.com/photo-1508817628294-5a453fa0b8fb?q=80&w=600&auto=format&fit=crop";
    if (kw.includes('แมว')) return "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=600&auto=format&fit=crop";
    if (kw.includes('หมา') || kw.includes('สุนัข')) return "https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=600&auto=format&fit=crop";
    if (kw.includes('มังกร')) return "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=600&auto=format&fit=crop";
    if (kw.includes('ฟัน')) return "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=600&auto=format&fit=crop";
    if (kw.includes('น้ำ') || kw.includes('ทะเล')) return "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=600&auto=format&fit=crop";
    if (kw.includes('ไฟ') || kw.includes('เพลิง')) return "https://images.unsplash.com/photo-1524135329990-07660cd5bf10?q=80&w=600&auto=format&fit=crop";
    if (kw.includes('เงิน') || kw.includes('เหรียญ')) return "https://images.unsplash.com/photo-1561414927-6d86591d0c4f?q=80&w=600&auto=format&fit=crop";
    if (kw.includes('พระ') || kw.includes('เจดีย์') || kw.includes('วัด')) return "https://images.unsplash.com/photo-1460574283810-2aab119d8511?q=80&w=600&auto=format&fit=crop";
    if (kw.includes('นก') || kw.includes('บิน')) return "https://images.unsplash.com/photo-1452570053594-1b985d6ea890?q=80&w=600&auto=format&fit=crop";

    const dreamFallbacks = [
        "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?q=80&w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?q=80&w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?q=80&w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1502134249126-9f3755a50d78?q=80&w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45?q=80&w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1464802686167-b939a6910659?q=80&w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?q=80&w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?q=80&w=600&auto=format&fit=crop"
    ];

    const numId = parseInt(id) || 0;
    return dreamFallbacks[numId % dreamFallbacks.length];
}

// เทมเพลตโครงสร้างหลักของหน้าบทความ (Static Page)
function getHtmlTemplate(title, description, category, imgUrl, contentHtml, schemaJson, filename) {
    return `<!DOCTYPE html>
<html lang="th">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title} | ลิขิตฟ้า (Likit Fah)</title>
    <meta name="description" content="${description}">
    <meta name="keywords" content="${category}, ทำนายดวง, เลขมงคล, ลิขิตฟ้า, พยากรณ์ศาสตร์">
    
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
            <div class="text-[9px] text-slate-600 mb-2 uppercase tracking-widest">โฆษณา</div>
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
                <a href="../../index.html" class="hover:text-amber-400">หน้าหลัก</a>
                <i class="fa-solid fa-chevron-right text-[8px]"></i>
                <a href="../../blog.html" class="hover:text-amber-400">บทความ</a>
                <i class="fa-solid fa-chevron-right text-[8px]"></i>
                <span class="text-slate-300 truncate">${title}</span>
            </nav>

            <article class="article-body">
                <h1 class="text-2xl md:text-4xl font-extrabold text-white mb-6 leading-tight font-serif gold-gradient-text tracking-wide">${title}</h1>
                
                <div class="flex flex-wrap items-center gap-4 text-xs text-slate-400 border-b border-white/5 pb-6 mb-8">
                    <span><i class="fa-solid fa-folder-open mr-1 text-amber-500"></i> ${category}</span>
                    <span><i class="fa-solid fa-clock mr-1"></i> ใช้เวลาอ่าน 5 นาที</span>
                    <span><i class="fa-solid fa-eye mr-1"></i> ดึงจากสถิติพรีเมียม</span>
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
                    <h3 class="text-xs uppercase tracking-widest text-slate-500 font-bold mb-4">แนะนำสำหรับคุณ</h3>
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
            <div class="text-[9px] text-slate-600 mb-2 uppercase tracking-widest">โฆษณา</div>
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
    
    // สร้างโฟลเดอร์ถ้าไม่มี
    if (!fs.existsSync(blogDir)) fs.mkdirSync(blogDir, { recursive: true });
    if (!fs.existsSync(articlesDir)) fs.mkdirSync(articlesDir, { recursive: true });

    const articlesList = [];

    console.log("🚀 [Scrip-Generator] เริ่มต้นเชื่อมต่อฐานข้อมูล...");

    try {
        // 1. ไพ่ยิปซี (Tarot Cards) - 28 บทความ
        console.log("📥 ดึงข้อมูลไพ่ยิปซี...");
        const [tarotRows] = await db.query("SELECT * FROM tarot_cards_premium LIMIT 28");
        for (const r of tarotRows) {
            const filename = `tarot-card-${r.card_id}.html`;
            const title = `ความหมายไพ่ยิปซีพรีเมียม: ไพ่ ${r.name_en} (${r.name_th}) เจาะลึกคำทำนาย`;
            const desc = `ศึกษาประวัติ ความลับ และคำทำนายพยากรณ์ของไพ่ ${r.name_en} (${r.name_th}) ทั้งด้านความรัก การเงิน การงาน และความหมายหัวกลับอย่างละเอียด`;
            const imgUrl = getTarotImageUrl(r.card_id);
            
            const content = `
                <p>ไพ่ <strong>${r.name_en} (${r.name_th})</strong> เป็นหนึ่งในสัญลักษณ์ที่มีความลึกลับและอิทธิพลสูงในศาสตร์การพยากรณ์ไพ่ยิปซี โดยสถิติความเชื่อระบุว่าพลังงานของไพ่ใบนี้มักเชื่อมโยงกับธาตุ <strong>${r.element || 'ลม'}</strong> และมีสีมงคลประจำไพ่คือ <strong>${r.color_theme || 'ทอง'}</strong></p>
                
                <h2 class="text-xl font-bold text-white mt-6 mb-3"><i class="fa-solid fa-book-open text-amber-500 mr-2"></i> ความหมายทั่วไปและการพยากรณ์ชะตา</h2>
                <p>${highlightKeywords(r.meaning_general)}</p>
                
                <h2 class="text-xl font-bold text-white mt-6 mb-3"><i class="fa-solid fa-heart text-amber-500 mr-2"></i> คำทำนายด้านความรักและความสัมพันธ์</h2>
                <p>${highlightKeywords(r.meaning_love || 'ความสัมพันธ์ที่มั่นคงและอาศัยการพูดคุยที่สุภาพเพื่อสร้างความเข้าใจที่ยั่งยืน')}</p>
                
                <h2 class="text-xl font-bold text-white mt-6 mb-3"><i class="fa-solid fa-briefcase text-amber-500 mr-2"></i> คำทำนายด้านการงานและการเงิน</h2>
                <p>${highlightKeywords(r.meaning_work_finance || 'การเงินมั่นคงและมีสถิติการเติบโตของรายได้ที่ดีขึ้นอย่างต่อเนื่อง')}</p>
                
                <h2 class="text-xl font-bold text-white mt-6 mb-3"><i class="fa-solid fa-heart-pulse text-amber-500 mr-2"></i> คำทำนายด้านสุขภาพร่างกาย</h2>
                <p>${highlightKeywords(r.meaning_health || 'ควรดูแลรักษาสุขภาพอย่างเหมาะสมและไม่ประมาทในการดำเนินชีวิตประจำวัน')}</p>

                <h2 class="text-xl font-bold text-white mt-6 mb-3"><i class="fa-solid fa-rotate text-amber-500 mr-2"></i> ความหมายในตำแหน่งไพ่หัวกลับ (Reversed)</h2>
                <p>${highlightKeywords(r.meaning_reversed || 'บ่งบอกถึงความระมัดระวังในเรื่องอารมณ์และสิ่งกระตุ้นภายนอก')}</p>

                <h2 class="text-xl font-bold text-white mt-6 mb-3"><i class="fa-solid fa-star text-amber-500 mr-2"></i> คำแนะนำและข้อคิดจากไพ่ (Advice)</h2>
                <p>${highlightKeywords(r.advice || 'จงเชื่อมั่นในเป้าหมายและการทำงานด้วยความรอบคอบประณีต')}</p>

                ${getFAQs('tarot', r.name_th)}
            `;

            const schema = {
                "@context": "https://schema.org",
                "@type": "BlogPosting",
                "headline": title,
                "description": desc,
                "image": imgUrl,
                "author": { "@type": "Organization", "name": "Likit Fah" },
                "publisher": { "@type": "Organization", "name": "Likit Fah" },
                "datePublished": new Date().toISOString()
            };

            const html = getHtmlTemplate(title, desc, "ความหมายไพ่ยิปซี", imgUrl, content, schema, filename);
            fs.writeFileSync(path.join(articlesDir, filename), html, 'utf8');

            articlesList.push({
                title,
                desc,
                category: "ความหมายไพ่ยิปซี",
                imgUrl,
                url: `blog/articles/${filename}`
            });
        }

        // 2. ราศีไทย (Thai Zodiac) - 12 บทความ
        console.log("📥 ดึงข้อมูลราศีไทย...");
        const [thaiZodiacRows] = await db.query("SELECT * FROM thai_zodiac_premium LIMIT 12");
        for (const r of thaiZodiacRows) {
            const filename = `thai-zodiac-${r.id}.html`;
            const title = `เจาะลึกดวงชะตาและลักษณะนิสัยของราศี ${r.zodiac_name} ประจำปี 2569-2570`;
            const desc = `ศึกษาลักษณะเด่น จุดแข็ง จุดอ่อน ดวงความรัก การเงิน การงาน และวิธีเสริมดวงชะตาตามวันเกิดของชาวราศี ${r.zodiac_name}`;
            const imgUrl = getZodiacImageUrl(r.id);
            
            const content = `
                <p>ชาวราศี <strong>${r.zodiac_name}</strong> จัดเป็นผู้อยู่ภายใต้การปกครองของธาตุ <strong>${r.element}</strong> และมีดาวเคราะห์ควบคุมคือดาว <strong>${r.ruler_planet}</strong> ส่งผลต่อวิสัยทัศน์และการมองโลก</p>
                
                <h2 class="text-xl font-bold text-white mt-6 mb-3"><i class="fa-solid fa-gem text-amber-500 mr-2"></i> จุดเด่นและลักษณะนิสัยเชิงบวก</h2>
                <p>${highlightKeywords(r.trait_strengths)}</p>
                
                <h2 class="text-xl font-bold text-white mt-6 mb-3"><i class="fa-solid fa-triangle-exclamation text-amber-500 mr-2"></i> จุดอ่อนที่ควรแก้ไขและระวัง</h2>
                <p>${highlightKeywords(r.trait_weaknesses)}</p>
                
                <h2 class="text-xl font-bold text-white mt-6 mb-3"><i class="fa-solid fa-briefcase text-amber-500 mr-2"></i> ดวงชะตาการงานและการเงิน</h2>
                <p>${highlightKeywords(r.career_finance)}</p>
                
                <h2 class="text-xl font-bold text-white mt-6 mb-3"><i class="fa-solid fa-heart text-amber-500 mr-2"></i> ดวงความรักและความสัมพันธ์</h2>
                <p>${highlightKeywords(r.love_relationships)}</p>

                <h2 class="text-xl font-bold text-white mt-6 mb-3"><i class="fa-solid fa-wand-magic-sparkles text-amber-500 mr-2"></i> การเสริมดวงนำโชค</h2>
                <p>สิ่งนำโชคสำหรับคุณประกอบด้วย สีมงคลเสริมดวงคือ <strong>${r.lucky_colors}</strong> และมีเลขเด็ดนำโชคประจำราศีคือเลข <strong>${r.lucky_numbers}</strong></p>

                ${getFAQs('zodiac', r.zodiac_name)}
            `;

            const schema = {
                "@context": "https://schema.org",
                "@type": "BlogPosting",
                "headline": title,
                "description": desc,
                "image": imgUrl,
                "author": { "@type": "Organization", "name": "Likit Fah" },
                "publisher": { "@type": "Organization", "name": "Likit Fah" },
                "datePublished": new Date().toISOString()
            };

            const html = getHtmlTemplate(title, desc, "ดวงชะตาราศีไทย", imgUrl, content, schema, filename);
            fs.writeFileSync(path.join(articlesDir, filename), html, 'utf8');

            articlesList.push({
                title,
                desc,
                category: "ดวงชะตาราศีไทย",
                imgUrl,
                url: `blog/articles/${filename}`
            });
        }

        // 3. ราศีตะวันตก (Western Zodiac) - 12 บทความ
        console.log("📥 ดึงข้อมูลราศีตะวันตก...");
        const [westernRows] = await db.query("SELECT * FROM western_zodiac_premium LIMIT 12");
        for (const r of westernRows) {
            const filename = `western-zodiac-${r.id}.html`;
            const title = `เจาะลึกจิตวิทยาและตัวตนที่แท้จริงของราศี ${r.zodiac_name} (Zodiac Energy)`;
            const desc = `วิเคราะห์ขั้วพลังงาน จิตวิทยา ความปรารถนาลึกๆ เงามืด และข้อแนะนำการพัฒนาตนเองของราศี ${r.zodiac_name} ตามศาสตร์สถิติจักรราศีตะวันตก`;
            const imgUrl = getWesternZodiacImageUrl(r.id);
            
            const content = `
                <p>ในจิตวิทยาและการพยากรณ์ตะวันตก ราศี <strong>${r.zodiac_name}</strong> ถูกจัดประเภทอยู่ในกลุ่ม <strong>${r.modality}</strong> ซึ่งมีแรงขับเคลื่อนเฉพาะในการแสดงออกและเป้าหมาย</p>
                
                <h2 class="text-xl font-bold text-white mt-6 mb-3"><i class="fa-solid fa-compass text-amber-500 mr-2"></i> ความปรารถนาสูงสุดและตัวตนด้านบวก</h2>
                <p>${highlightKeywords(r.core_desire)}</p>
                
                <h2 class="text-xl font-bold text-white mt-6 mb-3"><i class="fa-solid fa-moon text-amber-500 mr-2"></i> ตัวตนด้านมืดและสิ่งที่เป็นอุปสรรค (Shadow Self)</h2>
                <p>${highlightKeywords(r.shadow_self)}</p>
                
                <h2 class="text-xl font-bold text-white mt-6 mb-3"><i class="fa-solid fa-arrow-up-right-dots text-amber-500 mr-2"></i> ข้อแนะนำสำหรับการพัฒนาตนเองและการเติบโต</h2>
                <p>${highlightKeywords(r.growth_advice)}</p>

                ${getFAQs('zodiac', r.zodiac_name)}
            `;

            const schema = {
                "@context": "https://schema.org",
                "@type": "BlogPosting",
                "headline": title,
                "description": desc,
                "image": imgUrl,
                "author": { "@type": "Organization", "name": "Likit Fah" },
                "publisher": { "@type": "Organization", "name": "Likit Fah" },
                "datePublished": new Date().toISOString()
            };

            const html = getHtmlTemplate(title, desc, "ดวงชะตาราศีตะวันตก", imgUrl, content, schema, filename);
            fs.writeFileSync(path.join(articlesDir, filename), html, 'utf8');

            articlesList.push({
                title,
                desc,
                category: "ดวงชะตาราศีตะวันตก",
                imgUrl,
                url: `blog/articles/${filename}`
            });
        }

        // 4. ดวงจีน บาจื่อ (Chinese Bazi) - 10 บทความ
        console.log("📥 ดึงข้อมูลดวงจีน...");
        const [baziRows] = await db.query("SELECT * FROM chinese_bazi_premium LIMIT 10");
        for (const r of baziRows) {
            const filename = `chinese-bazi-${r.id}.html`;
            const title = `วิเคราะห์ดิถีและดวงชะตาบาจื่อ: ดิถี ${r.symbol} ธาตุ ${r.element_name} (${r.polarity})`;
            const desc = `เจาะลึกพลังงานหลัก ลักษณะเด่นตามธรรมชาติ ดวงชะตาความมั่งคั่งการเงิน และคู่ธาตุส่งเสริมตามวันเกิดของดิถี ${r.symbol}`;
            const imgUrl = getBaziImageUrl(r.element_name, r.symbol);
            
            const content = `
                <p>ตามศาสตร์การดูลักษณะชะตาดวงจีนบาจื่อ (Bazi) พลังงานดิถีวันเกิดของคุณคือ <strong>ดิถี ${r.symbol} ธาตุ ${r.element_name}</strong> ซึ่งแสดงขั้วความร้อนเย็นเป็นแบบ <strong>${r.polarity}</strong></p>
                
                <h2 class="text-xl font-bold text-white mt-6 mb-3"><i class="fa-solid fa-yin-yang text-amber-500 mr-2"></i> ลักษณะเด่นธรรมชาติของดิถีชะตา</h2>
                <p>${highlightKeywords(r.core_character)}</p>
                
                <h2 class="text-xl font-bold text-white mt-6 mb-3"><i class="fa-solid fa-sack-dollar text-amber-500 mr-2"></i> ชะตาชีวิตด้านความมั่งคั่งและการเงิน</h2>
                <p>${highlightKeywords(r.wealth_luck)}</p>
                
                <h2 class="text-xl font-bold text-white mt-6 mb-3"><i class="fa-solid fa-circle-plus text-amber-500 mr-2"></i> ธาตุสำคัญที่ส่งเสริมดวงชะตา (Favorable)</h2>
                <p>ธาตุที่ช่วยส่งเสริมการดำเนินชีวิตและเรียกทรัพย์สินให้คุณคือ: <strong>${r.favorable_elements || 'ไม้, ไฟ'}</strong></p>

                <h2 class="text-xl font-bold text-white mt-6 mb-3"><i class="fa-solid fa-circle-minus text-amber-500 mr-2"></i> ธาตุที่หักล้างชะตาและควรเลี่ยง (Unfavorable)</h2>
                <p>ธาตุและพลังงานที่อาจทำลายโชคลาภควรระมัดระวังคือ: <strong>${r.unfavorable_elements || 'น้ำ'}</strong></p>

                ${getFAQs('zodiac', `ดิถี ${r.symbol}`)}
            `;

            const schema = {
                "@context": "https://schema.org",
                "@type": "BlogPosting",
                "headline": title,
                "description": desc,
                "image": imgUrl,
                "author": { "@type": "Organization", "name": "Likit Fah" },
                "publisher": { "@type": "Organization", "name": "Likit Fah" },
                "datePublished": new Date().toISOString()
            };

            const html = getHtmlTemplate(title, desc, "ศาสตร์ดวงจีนบาจื่อ", imgUrl, content, schema, filename);
            fs.writeFileSync(path.join(articlesDir, filename), html, 'utf8');

            articlesList.push({
                title,
                desc,
                category: "ศาสตร์ดวงจีนบาจื่อ",
                imgUrl,
                url: `blog/articles/${filename}`
            });
        }

        // 5. ทำนายฝันนำโชค (Dreams) - 138 บทความ
        console.log("📥 ดึงข้อมูลทำนายฝันนำโชค...");
        const [dreamRows] = await db.query("SELECT * FROM dreams_premium WHERE keyword != '' AND meaning != '' LIMIT 138");
        for (const r of dreamRows) {
            const filename = `dream-${r.id}.html`;
            const title = `ทำนายฝันพรีเมียม: ฝันเห็น "${r.keyword}" แปลว่าอะไร พร้อมตีความหมายเลขนำโชค`;
            const desc = `ไขความหมาย ทำนายลางบอกเหตุล่วงหน้าในชีวิต พร้อมวิเคราะห์ถอดตัวเลขนำโชคเชิงสถิติจากการฝันเห็น ${r.keyword}`;
            const imgUrl = getDreamImageUrl(r.keyword, r.id);
            
            const content = `
                <p>ตามศาสตร์การทำนายฝันโบราณและสถิติตัวเลขนำโชคของลิขิตฟ้า การที่คุณฝันเห็น <strong>"${r.keyword}"</strong> นั้น ถูกจัดอยู่ในหมวดหมู่ทำนายฝันเรื่อง <strong>${r.category || 'โชคลาภทั่วไป'}</strong></p>
                
                <h2 class="text-xl font-bold text-white mt-6 mb-3"><i class="fa-solid fa-comment-dots text-amber-500 mr-2"></i> ความหมายและลางบอกเหตุจากความฝัน</h2>
                <p>${highlightKeywords(r.meaning)}</p>
                
                <h2 class="text-xl font-bold text-white mt-6 mb-3"><i class="fa-solid fa-lightbulb text-amber-500 mr-2"></i> การตีความและคำแนะนำเชิงสถิติ</h2>
                <p>การฝันเห็นสิ่งนี้ตามหลักจิตวิทยา มักเกี่ยวข้องกับความระมัดระวังในเรื่องความรักหรือการทำงาน ซึ่งลิขิตฟ้าขอพยากรณ์แนะนำให้ท่านดำเนินชีวิตอย่างมีสติรอบคอบและหมั่นทำบุญตามวันเกิดเพื่อหนุนโชคลาภ</p>

                <h2 class="text-xl font-bold text-white mt-6 mb-3"><i class="fa-solid fa-coins text-amber-500 mr-2"></i> ตัวเลขเด่นและเลขมงคลนำโชค</h2>
                <p>จากการถอดรหัสเชิงสถิติตัวเลขนำโชคสำหรับการฝันเห็นสิ่งนี้ คือเลขเด่น: <strong class="text-emerald-400 font-bold text-lg px-2 py-1 bg-emerald-950/40 border border-emerald-500/30 rounded-lg">${r.lucky_numbers || '3, 7, 89, 74'}</strong></p>

                ${getFAQs('dream', r.keyword)}
            `;

            const schema = {
                "@context": "https://schema.org",
                "@type": "BlogPosting",
                "headline": title,
                "description": desc,
                "image": imgUrl,
                "author": { "@type": "Organization", "name": "Likit Fah" },
                "publisher": { "@type": "Organization", "name": "Likit Fah" },
                "datePublished": new Date().toISOString()
            };

            const html = getHtmlTemplate(title, desc, "ทำนายฝันนำโชค", imgUrl, content, schema, filename);
            fs.writeFileSync(path.join(articlesDir, filename), html, 'utf8');

            articlesList.push({
                title,
                desc,
                category: "ทำนายฝันนำโชค",
                imgUrl,
                url: `blog/articles/${filename}`
            });
        }

        // เขียนไฟล์บล็อกดัชนี blog-list.json
        console.log("💾 บันทึกไฟล์ดัชนีบทความ blog-list.json...");
        fs.writeFileSync(path.join(blogDir, 'blog-list.json'), JSON.stringify(articlesList, null, 2), 'utf8');

        // 6. Generate sitemap.xml
        console.log("💾 กำลังสร้างไฟล์ sitemap.xml...");
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
        xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
        
        // Static root pages
        for (const p of staticPages) {
            xml += `  <url>\n`;
            xml += `    <loc>${domain}/${p}</loc>\n`;
            xml += `    <lastmod>${today}</lastmod>\n`;
            xml += `    <changefreq>${p === '' || p === 'blog.html' ? 'daily' : 'weekly'}</changefreq>\n`;
            xml += `    <priority>${p === '' ? '1.0' : '0.8'}</priority>\n`;
            xml += `  </url>\n`;
        }
        
        // Blog articles
        for (const art of articlesList) {
            xml += `  <url>\n`;
            xml += `    <loc>${domain}/${art.url}</loc>\n`;
            xml += `    <lastmod>${today}</lastmod>\n`;
            xml += `    <changefreq>monthly</changefreq>\n`;
            xml += `    <priority>0.6</priority>\n`;
            xml += `  </url>\n`;
        }
        
        xml += `</urlset>\n`;
        
        fs.writeFileSync(path.join(__dirname, '../../frontend/sitemap.xml'), xml, 'utf8');
        console.log("🎉 บันทึก sitemap.xml สำเร็จ!");

        console.log(`🎉 [Scrip-Generator] เสร็จสมบูรณ์! เจนบทความทั้งหมด ${articlesList.length} ไฟล์สำเร็จ!`);
        process.exit(0);

    } catch (err) {
        console.error("❌ ล้มเหลวระหว่างดำเนินการสร้างบทความ:", err);
        process.exit(1);
    }
}

run();
