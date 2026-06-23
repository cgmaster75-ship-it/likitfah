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
                <a href="about.html" class="hover:text-amber-400 transition-colors">เกี่ยวกับเรา</a>
                <a href="contact.html" class="hover:text-amber-400 transition-colors">ติดต่อเรา</a>
                <a href="policy.html" class="hover:text-amber-400 transition-colors">นโยบายความเป็นส่วนตัว</a>
                <a href="terms.html" class="hover:text-amber-400 transition-colors">ข้อตกลงการใช้งาน</a>
                <a href="blog.html" class="hover:text-amber-400 transition-colors">บทความพยากรณ์</a>
            </div>

            <p class="text-xs text-slate-500 font-light tracking-wide leading-relaxed">
                © ${new Date().getFullYear()} ลิขิตฟ้า (Likit Fah). All Rights Reserved.<br>
                ระบบวิเคราะห์สถิติตัวเลขเพื่อความบันเทิงและการเรียนรู้ทางสถิติเท่านั้น
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
