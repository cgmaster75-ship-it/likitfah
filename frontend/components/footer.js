const pathPrefix = window.location.pathname.includes('/blog/articles/') ? '../../' : '';

const globalFooterHTML = `
    <!-- Google AdSense Footer Ad -->
    <div class="max-w-4xl mx-auto px-4 mb-6 text-center">
        <ins class="adsbygoogle"
             style="display:block"
             data-ad-client="ca-pub-4506936315719674"
             data-ad-slot="9383948884"
             data-ad-format="auto"
             data-full-width-responsive="true"></ins>
    </div>

    <footer class="w-full py-8 mt-12 border-t border-amber-500/10" style="background: rgba(11, 11, 26, 0.4); backdrop-filter: blur(8px); font-family: 'Prompt', sans-serif;">
        <div class="max-w-7xl mx-auto px-4 text-center">
            <!-- Trust Pages Links -->
            <div class="flex flex-wrap justify-center gap-6 mb-6 text-xs md:text-sm font-medium text-slate-400">
                <a href="${pathPrefix}about.html" class="hover:text-amber-400 transition-colors">
                    <span class="lang-th">เกี่ยวกับเรา</span>
                    <span class="lang-en">About Us</span>
                </a>
                <a href="${pathPrefix}contact.html" class="hover:text-amber-400 transition-colors">
                    <span class="lang-th">ติดต่อเรา</span>
                    <span class="lang-en">Contact Us</span>
                </a>
                <a href="${pathPrefix}policy.html" class="hover:text-amber-400 transition-colors">
                    <span class="lang-th">นโยบายความเป็นส่วนตัว</span>
                    <span class="lang-en">Privacy Policy</span>
                </a>
                <a href="${pathPrefix}terms.html" class="hover:text-amber-400 transition-colors">
                    <span class="lang-th">ข้อตกลงการใช้งาน</span>
                    <span class="lang-en">Terms of Use</span>
                </a>
                <a href="${pathPrefix}blog.html" class="hover:text-amber-400 transition-colors">
                    <span class="lang-th">บทความพยากรณ์</span>
                    <span class="lang-en">Articles</span>
                </a>
            </div>

            <p class="text-xs text-slate-500 font-light tracking-wide leading-relaxed">
                <span class="lang-th">
                    &copy; ${new Date().getFullYear()} ลิขิตฟ้า (Likit Fah). สงวนลิขสิทธิ์.<br>
                    ระบบวิเคราะห์สถิติตัวเลขเพื่อความบันเทิงและการเรียนรู้ทางสถิติเท่านั้น
                </span>
                <span class="lang-en">
                    &copy; ${new Date().getFullYear()} Likit Fah. All Rights Reserved.<br>
                    Numerology and statistics analytical system for entertainment and statistical learning purposes only.
                </span>
            </p>
        </div>
    </footer>
`;

document.addEventListener("DOMContentLoaded", () => {
    const footerContainer = document.getElementById('likitfah-footer');
    if (footerContainer) {
        footerContainer.innerHTML = globalFooterHTML;
        
        // Dynamically load Google AdSense script if not already present
        if (!document.querySelector('script[src*="adsbygoogle.js"]')) {
            const adScript = document.createElement('script');
            adScript.async = true;
            adScript.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4506936315719674";
            adScript.setAttribute("crossorigin", "anonymous");
            document.head.appendChild(adScript);
        }
        
        // Trigger adsbygoogle push
        try {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (e) {
            console.error("AdSense Footer Error:", e);
        }
    }
});
