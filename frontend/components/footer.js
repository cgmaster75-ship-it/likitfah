const globalFooterHTML = `
    <footer class="w-full py-8 mt-12 border-t border-amber-500/10" style="background: rgba(11, 11, 26, 0.4); backdrop-filter: blur(8px); font-family: 'Prompt', sans-serif;">
        <div class="max-w-7xl mx-auto px-4 text-center">
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
    }
});
