const pathPrefix = window.location.pathname.includes('/blog/articles/') ? '../../' : '';

const bottomNavigationHTML = `
    <nav id="global-bottom-nav" class="fixed bottom-4 left-0 right-0 z-[90] px-4 pointer-events-none transition-transform duration-300">
        <div class="max-w-[280px] mx-auto rounded-full p-1.5 flex justify-between items-center px-6 pointer-events-auto shadow-[0_10px_40px_rgba(0,0,0,0.8)]" style="background: rgba(15, 15, 25, 0.9); backdrop-filter: blur(20px); border: 1px solid rgba(251, 191, 36, 0.2);">
            
            <div onclick="window.location.href='${pathPrefix}dashboard.html'" class="flex flex-col items-center p-2 text-slate-400 hover:text-amber-400 cursor-pointer transition-all hover:-translate-y-1">
                <i class="fa-solid fa-house text-lg"></i>
                <span class="text-[9px] mt-1 font-medium" style="font-family: 'Prompt', sans-serif;">
                    <span class="lang-th">หน้าหลัก</span>
                    <span class="lang-en">Home</span>
                </span>
            </div>
            
            <div onclick="window.location.href='${pathPrefix}donate.html'" class="flex flex-col items-center p-2 text-amber-500 hover:text-amber-300 cursor-pointer transition-all hover:-translate-y-1 drop-shadow-[0_0_8px_rgba(245,158,11,0.6)]">
                <i class="fa-solid fa-hand-holding-dollar text-xl animate-pulse"></i>
                <span class="text-[10px] mt-1 font-bold tracking-wide" style="font-family: 'Prompt', sans-serif;">
                    <span class="lang-th">ค่าครู</span>
                    <span class="lang-en">Donate</span>
                </span>
            </div>
            
            <div onclick="showGlobalLogoutModal()" class="flex flex-col items-center p-2 text-slate-400 hover:text-rose-400 cursor-pointer transition-all hover:-translate-y-1">
                <i class="fa-solid fa-power-off text-lg"></i>
                <span class="text-[9px] mt-1 font-medium" style="font-family: 'Prompt', sans-serif;">
                    <span class="lang-th">ออก</span>
                    <span class="lang-en">Logout</span>
                </span>
            </div>

        </div>
    </nav>

    <div id="global-logout-modal" class="fixed inset-0 z-[9999] hidden items-center justify-center opacity-0 transition-opacity duration-300" style="font-family: 'Prompt', sans-serif;">
        <div class="absolute inset-0 bg-black/80 backdrop-blur-md" onclick="closeGlobalLogoutModal()"></div>
        <div id="global-logout-content" class="border border-slate-700 w-[90%] max-w-sm rounded-3xl p-8 relative z-10 transform scale-95 transition-all duration-300" style="background: rgba(15, 15, 25, 0.95); box-shadow: 0 10px 40px rgba(0,0,0,0.8);">
            <div class="text-center">
                <div class="w-16 h-16 rounded-full bg-rose-500/10 text-rose-500 flex items-center justify-center text-3xl mx-auto mb-4 border border-rose-500/20">
                    <i class="fa-solid fa-door-open"></i>
                </div>
                <h3 class="text-2xl font-bold mb-2 text-white">
                    <span class="lang-th">ออกจากระบบ?</span>
                    <span class="lang-en">Logout?</span>
                </h3>
                <p class="text-xs text-slate-400 mb-8 leading-relaxed">
                    <span class="lang-th">ข้อมูลส่วนตัวสำหรับการทำนายจะถูกล้างออกเพื่อรักษาความปลอดภัย</span>
                    <span class="lang-en">Your personal prediction profile will be cleared for security.</span>
                </p>
                <div class="grid grid-cols-2 gap-4">
                    <button onclick="closeGlobalLogoutModal()" class="py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-medium transition-colors">
                        <span class="lang-th">ยกเลิก</span>
                        <span class="lang-en">Cancel</span>
                    </button>
                    <button onclick="confirmGlobalLogout()" class="py-3 rounded-2xl bg-gradient-to-r from-rose-600 to-red-500 hover:from-rose-500 hover:to-red-400 text-white text-sm font-medium transition-colors shadow-lg shadow-rose-500/30">
                        <span class="lang-th">ออกจากระบบ</span>
                        <span class="lang-en">Logout</span>
                    </button>
                </div>
            </div>
        </div>
    </div>
`;

document.addEventListener("DOMContentLoaded", () => {
    document.body.insertAdjacentHTML('beforeend', bottomNavigationHTML);

    // Auto-Hide bottom nav on scroll
    let lastScrollY = window.scrollY;
    const bottomNav = document.getElementById('global-bottom-nav');
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        if (currentScrollY > lastScrollY && currentScrollY > 50) {
            bottomNav.style.transform = 'translateY(150%)';
        } else {
            bottomNav.style.transform = 'translateY(0)';
        }
        lastScrollY = currentScrollY;
    }, { passive: true });
});

function showGlobalLogoutModal() {
    const modal = document.getElementById('global-logout-modal');
    const content = document.getElementById('global-logout-content');
    modal.classList.remove('hidden'); 
    modal.classList.add('flex');
    setTimeout(() => { 
        modal.classList.remove('opacity-0'); 
        content.classList.remove('scale-95'); 
    }, 10);
}

function closeGlobalLogoutModal() {
    const modal = document.getElementById('global-logout-modal');
    const content = document.getElementById('global-logout-content');
    modal.classList.add('opacity-0'); 
    content.classList.add('scale-95');
    setTimeout(() => { 
        modal.classList.add('hidden'); 
        modal.classList.remove('flex'); 
    }, 300);
}

function confirmGlobalLogout() {
    localStorage.clear(); 
    const pathPrefix = window.location.pathname.includes('/blog/articles/') ? '../../' : '';
    window.location.href = pathPrefix + 'index.html'; 
}