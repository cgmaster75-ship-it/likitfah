// ==========================================
// 📊 Google Analytics 4 (GA4) Tracking (ระบบควบคุมการทำงาน)
// ==========================================
const GA_MEASUREMENT_ID = 'G-H6C7M9DE6Q'; 

function loadAnalytics() {
    if (window.gtagLoaded) return; 
    window.gtagLoaded = true;
    
    const gtagScript = document.createElement('script');
    gtagScript.async = true;
    gtagScript.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(gtagScript);
    
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', GA_MEASUREMENT_ID);
}

// ฟังก์ชันสลับการแสดงผลตารางรายละเอียด
window.toggleCookieDetails = function(id) {
    const el = document.getElementById(id);
    if(el.classList.contains('hidden')) {
        el.classList.remove('hidden');
    } else {
        el.classList.add('hidden');
    }
}

// ==========================================
// 🍪 PDPA & Cookie Consent Banner (Production Version)
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    
    const newConsentStr = localStorage.getItem('pdpa_consent');
    const oldConsentAuto = localStorage.getItem('pdpa_consent_accepted'); 
    
    let hasConsented = false;
    let currentSettings = { necessary: true, analytics: true, marketing: true }; 

    if (oldConsentAuto === 'true') {
        localStorage.setItem('pdpa_consent', JSON.stringify(currentSettings));
        localStorage.removeItem('pdpa_consent_accepted');
        loadAnalytics();
        hasConsented = true;
    } else if (newConsentStr) {
        currentSettings = JSON.parse(newConsentStr);
        if (currentSettings.analytics) loadAnalytics();
        hasConsented = true;
    }

    const cookieUI = document.createElement('div');
    cookieUI.id = 'pdpa-cookie-wrapper';
    
    cookieUI.innerHTML = `
        <div id="pdpa-floating-icon" class="fixed bottom-4 left-4 w-12 h-12 bg-slate-900 border border-amber-500/50 rounded-full shadow-[0_0_15px_rgba(245,158,11,0.3)] flex items-center justify-center cursor-pointer z-[9990] hover:scale-110 transition-transform ${hasConsented ? '' : 'hidden'} group" title="ตั้งค่าความเป็นส่วนตัว">
            <i class="fa-solid fa-cookie-bite text-amber-400 text-2xl group-hover:animate-pulse"></i>
        </div>

        <div id="pdpa-banner" class="fixed bottom-0 left-0 w-full bg-slate-900/95 border-t border-emerald-500/30 p-4 md:p-5 z-[9998] flex flex-col md:flex-row items-center justify-between shadow-[0_-10px_30px_rgba(0,0,0,0.6)] backdrop-blur-md transition-transform duration-500 ${hasConsented ? 'translate-y-full hidden' : 'translate-y-0'}">
            <div class="text-xs md:text-sm text-slate-300 mb-4 md:mb-0 md:mr-6 flex-1 font-light leading-relaxed">
                <p class="mb-1 text-white font-medium text-sm md:text-base">
                    <i class="fa-solid fa-cookie-bite text-amber-400 mr-2 drop-shadow-[0_0_5px_#fbbf24]"></i> ลิขิตฟ้า ขออนุญาตใช้คุกกี้
                </p>
                <p>
                    เว็บไซต์นี้ใช้คุกกี้เพื่อนำเสนอประสบการณ์ที่ดีที่สุด รวมถึงเก็บสถิติเพื่อพัฒนาศาสตร์พยากรณ์ การใช้งานเว็บไซต์ต่อถือว่าคุณยอมรับ 
                    <a href="policy.html" class="text-emerald-400 font-medium underline hover:text-emerald-300 transition-colors">นโยบายความเป็นส่วนตัว</a> และ 
                    <a href="policy.html#cookie-policy" class="text-amber-400 font-medium underline hover:text-amber-300 transition-colors">นโยบายคุกกี้</a> ของเรา
                </p>
            </div>
            <div class="flex flex-wrap w-full md:w-auto shrink-0 gap-3 justify-end">
                <button id="btn-cookie-settings" class="px-5 py-2.5 bg-slate-800 text-slate-300 font-bold rounded-xl border border-slate-600 hover:bg-slate-700 transition-all text-xs md:text-sm">
                    ตั้งค่าคุกกี้
                </button>
                <button id="btn-accept-all" class="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-500 text-white font-bold rounded-xl hover:from-emerald-500 hover:to-teal-400 transition-all shadow-[0_0_15px_rgba(16,185,129,0.4)] text-xs md:text-sm">
                    ยอมรับทั้งหมด
                </button>
            </div>
        </div>

        <div id="pdpa-modal" class="fixed inset-0 bg-black/80 z-[9999] hidden flex items-center justify-center backdrop-blur-sm opacity-0 transition-opacity duration-300 p-4">
            <div id="pdpa-modal-content" class="bg-slate-900 border border-emerald-500/30 rounded-2xl max-w-2xl w-full shadow-2xl transform scale-95 transition-transform duration-300 flex flex-col max-h-[90vh]">
                
                <div class="flex justify-between items-center p-5 md:p-6 border-b border-white/10">
                    <h3 class="text-xl font-bold text-white">การตั้งค่าความเป็นส่วนตัว</h3>
                    <button id="btn-close-modal" class="text-slate-400 hover:text-rose-400 transition-colors"><i class="fa-solid fa-xmark text-2xl"></i></button>
                </div>

                <div class="p-5 md:p-6 overflow-y-auto no-scrollbar space-y-4">
                    
                    <div class="bg-slate-800/50 border border-slate-700 rounded-xl p-4 md:p-5">
                        <div class="flex items-center justify-between mb-2">
                            <h4 class="text-white font-bold">คุกกี้พื้นฐานที่จำเป็น</h4>
                            <span class="text-xs md:text-sm text-amber-500 font-medium bg-amber-900/30 px-3 py-1 rounded-full border border-amber-500/20">เปิดใช้งานเสมอ</span>
                        </div>
                        <p class="text-xs md:text-sm text-slate-400 leading-relaxed font-light mb-2">
                            คุกกี้พื้นฐานที่จำเป็น เพื่อช่วยให้การทำงานหลักของเว็บไซต์ใช้งานได้ รวมถึงการเข้าถึงพื้นที่ที่ปลอดภัยต่างๆ ของเว็บไซต์ หากไม่มีคุกกี้นี้เว็บไซต์จะไม่สามารถทำงานได้อย่างเหมาะสม
                        </p>
                        <button onclick="toggleCookieDetails('detail-nec')" class="text-xs text-emerald-400 hover:text-emerald-300 underline underline-offset-2"><i class="fa-solid fa-list mr-1"></i> แสดงรายละเอียดคุกกี้</button>
                        
                        <div id="detail-nec" class="hidden mt-3 bg-black/40 rounded-lg p-4 border border-slate-700 text-xs space-y-4">
                            <div class="grid grid-cols-[80px_1fr] gap-1">
                                <span class="text-slate-400 font-bold">Name</span><span class="text-white">pdpa_consent</span>
                                <span class="text-slate-400 font-bold">Host</span><span class="text-slate-300">likitfah.com</span>
                                <span class="text-slate-400 font-bold">Duration</span><span class="text-slate-300">1 ปี</span>
                                <span class="text-slate-400 font-bold">Category</span><span class="text-slate-300">คุกกี้พื้นฐานที่จำเป็น</span>
                                <span class="text-slate-400 font-bold">Description</span><span class="text-slate-300">ใช้เก็บสถานะการอนุญาตและความยินยอมทาง PDPA ของผู้ใช้งาน</span>
                            </div>
                            <div class="border-t border-slate-700/50 pt-3 grid grid-cols-[80px_1fr] gap-1">
                                <span class="text-slate-400 font-bold">Name</span><span class="text-white">user_data</span>
                                <span class="text-slate-400 font-bold">Host</span><span class="text-slate-300">likitfah.com</span>
                                <span class="text-slate-400 font-bold">Duration</span><span class="text-slate-300">LocalStorage</span>
                                <span class="text-slate-400 font-bold">Category</span><span class="text-slate-300">คุกกี้พื้นฐานที่จำเป็น</span>
                                <span class="text-slate-400 font-bold">Description</span><span class="text-slate-300">ใช้เก็บข้อมูลพื้นฐานเพื่อประมวลผลคำทำนายชะตาชีวิต โดยไม่ส่งมอบข้อมูลให้บุคคลที่สาม</span>
                            </div>
                        </div>
                    </div>

                    <div class="bg-slate-800/50 border border-slate-700 rounded-xl p-4 md:p-5">
                        <div class="flex items-center justify-between mb-2">
                            <h4 class="text-white font-bold">คุกกี้ในส่วนวิเคราะห์</h4>
                            <label class="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" id="toggle-analytics" class="sr-only peer" ${currentSettings.analytics ? 'checked' : ''}>
                                <div class="w-11 h-6 bg-slate-600 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                            </label>
                        </div>
                        <p class="text-xs md:text-sm text-slate-400 leading-relaxed font-light mb-2">
                            คุกกี้ในส่วนวิเคราะห์ จะช่วยให้เว็บไซต์เข้าใจรูปแบบการใช้งานของผู้เข้าชมและจะช่วยปรับปรุงประสบการณ์การใช้งาน โดยการเก็บรวบรวมข้อมูลและรายงานผลสถิติแบบไม่ระบุตัวตน
                        </p>
                        <button onclick="toggleCookieDetails('detail-ana')" class="text-xs text-emerald-400 hover:text-emerald-300 underline underline-offset-2"><i class="fa-solid fa-list mr-1"></i> แสดงรายละเอียดคุกกี้</button>
                        
                        <div id="detail-ana" class="hidden mt-3 bg-black/40 rounded-lg p-4 border border-slate-700 text-xs space-y-4">
                            <div class="grid grid-cols-[80px_1fr] gap-1">
                                <span class="text-slate-400 font-bold">Name</span><span class="text-white">_ga</span>
                                <span class="text-slate-400 font-bold">Host</span><span class="text-slate-300">.google.com</span>
                                <span class="text-slate-400 font-bold">Duration</span><span class="text-slate-300">2 ปี</span>
                                <span class="text-slate-400 font-bold">Category</span><span class="text-slate-300">คุกกี้ในส่วนวิเคราะห์</span>
                                <span class="text-slate-400 font-bold">Description</span><span class="text-slate-300">ใช้ลงทะเบียนรหัสเฉพาะเพื่อสร้างข้อมูลสถิติว่าผู้เยี่ยมชมใช้เว็บไซต์อย่างไร (Google Analytics 4)</span>
                            </div>
                            <div class="border-t border-slate-700/50 pt-3 grid grid-cols-[80px_1fr] gap-1">
                                <span class="text-slate-400 font-bold">Name</span><span class="text-white">_gid</span>
                                <span class="text-slate-400 font-bold">Host</span><span class="text-slate-300">.google.com</span>
                                <span class="text-slate-400 font-bold">Duration</span><span class="text-slate-300">1 วัน</span>
                                <span class="text-slate-400 font-bold">Category</span><span class="text-slate-300">คุกกี้ในส่วนวิเคราะห์</span>
                                <span class="text-slate-400 font-bold">Description</span><span class="text-slate-300">ใช้รวบรวมข้อมูลผู้ใช้งานรายวัน เพื่อวิเคราะห์พฤติกรรมในหน้าต่างๆ ของเว็บไซต์</span>
                            </div>
                        </div>
                    </div>

                    <div class="bg-slate-800/50 border border-slate-700 rounded-xl p-4 md:p-5">
                        <div class="flex items-center justify-between mb-2">
                            <h4 class="text-white font-bold">คุกกี้ในส่วนการตลาด</h4>
                            <label class="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" id="toggle-marketing" class="sr-only peer" ${currentSettings.marketing ? 'checked' : ''}>
                                <div class="w-11 h-6 bg-slate-600 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                            </label>
                        </div>
                        <p class="text-xs md:text-sm text-slate-400 leading-relaxed font-light mb-2">
                            คุกกี้ในส่วนการตลาด ใช้เพื่อติดตามพฤติกรรมผู้เข้าชมเพื่อแสดงโฆษณาที่เหมาะสม และวัดผลประสิทธิภาพแคมเปญโฆษณาของบุคคลที่สาม (Third-party)
                        </p>
                        <button onclick="toggleCookieDetails('detail-mkt')" class="text-xs text-emerald-400 hover:text-emerald-300 underline underline-offset-2"><i class="fa-solid fa-list mr-1"></i> แสดงรายละเอียดคุกกี้</button>
                        
                        <div id="detail-mkt" class="hidden mt-3 bg-black/40 rounded-lg p-4 border border-slate-700 text-xs space-y-4">
                            <div class="grid grid-cols-[80px_1fr] gap-1">
                                <span class="text-slate-400 font-bold">Name</span><span class="text-white">_fbp</span>
                                <span class="text-slate-400 font-bold">Host</span><span class="text-slate-300">.facebook.com</span>
                                <span class="text-slate-400 font-bold">Duration</span><span class="text-slate-300">3 เดือน</span>
                                <span class="text-slate-400 font-bold">Category</span><span class="text-slate-300">คุกกี้ในส่วนการตลาด</span>
                                <span class="text-slate-400 font-bold">Description</span><span class="text-slate-300">ใช้โดย Facebook เพื่อนำเสนอชุดโฆษณาที่เกี่ยวข้อง และติดตามความสนใจของผู้เข้าชม</span>
                            </div>
                            <div class="border-t border-slate-700/50 pt-3 grid grid-cols-[80px_1fr] gap-1">
                                <span class="text-slate-400 font-bold">Name</span><span class="text-white">_gcl_au</span>
                                <span class="text-slate-400 font-bold">Host</span><span class="text-slate-300">.google.com</span>
                                <span class="text-slate-400 font-bold">Duration</span><span class="text-slate-300">3 เดือน</span>
                                <span class="text-slate-400 font-bold">Category</span><span class="text-slate-300">คุกกี้ในส่วนการตลาด</span>
                                <span class="text-slate-400 font-bold">Description</span><span class="text-slate-300">ใช้โดย Google AdSense สำหรับวิเคราะห์ประสิทธิภาพโฆษณาข้ามแพลตฟอร์ม</span>
                            </div>
                        </div>
                    </div>

                </div>

                <div class="p-5 md:p-6 border-t border-white/10 bg-slate-900/80 rounded-b-2xl">
                    <button id="btn-save-settings" class="w-full bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-500 hover:to-yellow-500 text-black font-bold py-3.5 rounded-xl transition-all shadow-[0_0_15px_rgba(245,158,11,0.3)] mb-3">
                        ยืนยันตัวเลือกของฉัน
                    </button>
                    <div class="text-center">
                        <a href="policy.html" target="_blank" class="text-xs text-slate-400 hover:text-emerald-400 underline transition-colors">อ่านนโยบายความเป็นส่วนตัวและคุกกี้ฉบับเต็ม</a>
                    </div>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(cookieUI);

    const banner = document.getElementById('pdpa-banner');
    const floatingIcon = document.getElementById('pdpa-floating-icon');
    const modal = document.getElementById('pdpa-modal');
    const modalContent = document.getElementById('pdpa-modal-content');

    function hideBannerShowIcon() {
        banner.style.transform = 'translateY(100%)';
        setTimeout(() => {
            banner.classList.add('hidden');
            floatingIcon.classList.remove('hidden');
        }, 500);
    }

    function openModal() {
        const savedStr = localStorage.getItem('pdpa_consent');
        if(savedStr) {
            const saved = JSON.parse(savedStr);
            document.getElementById('toggle-analytics').checked = saved.analytics;
            document.getElementById('toggle-marketing').checked = saved.marketing;
        }

        modal.classList.remove('hidden');
        setTimeout(() => {
            modal.classList.remove('opacity-0');
            modalContent.classList.remove('scale-95');
            modalContent.classList.add('scale-100');
        }, 10);
    }

    function closeModal() {
        modal.classList.add('opacity-0');
        modalContent.classList.remove('scale-100');
        modalContent.classList.add('scale-95');
        setTimeout(() => modal.classList.add('hidden'), 300);
    }

    document.getElementById('btn-cookie-settings').addEventListener('click', openModal);
    floatingIcon.addEventListener('click', openModal);
    document.getElementById('btn-close-modal').addEventListener('click', closeModal);

    document.getElementById('btn-accept-all').addEventListener('click', () => {
        localStorage.setItem('pdpa_consent', JSON.stringify({ necessary: true, analytics: true, marketing: true }));
        loadAnalytics(); 
        hideBannerShowIcon();
    });

    document.getElementById('btn-save-settings').addEventListener('click', () => {
        const allowAnalytics = document.getElementById('toggle-analytics').checked;
        const allowMarketing = document.getElementById('toggle-marketing').checked;
        
        localStorage.setItem('pdpa_consent', JSON.stringify({ 
            necessary: true, 
            analytics: allowAnalytics,
            marketing: allowMarketing
        }));
        
        if(allowAnalytics) loadAnalytics();
        
        closeModal();
        if(!banner.classList.contains('hidden')) {
            hideBannerShowIcon();
        }
    });
});