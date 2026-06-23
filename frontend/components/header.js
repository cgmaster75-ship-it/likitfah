const pathPrefix = window.location.pathname.includes('/blog/articles/') ? '../../' : '';

const topHeaderHTML = `
    <nav id="global-top-header" class="fixed top-0 left-0 right-0 z-[90] transition-transform duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.5)] rounded-b-2xl border-b border-amber-500/20" style="background: rgba(11, 11, 26, 0.85); backdrop-filter: blur(16px);">
         <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
             <div class="flex items-center justify-between h-14 md:h-16">
                 <div class="flex items-center gap-3 cursor-pointer" onclick="window.location.href='${pathPrefix}dashboard.html'">
                     <img src="${pathPrefix}img/logo-likitfah.png" alt="ลิขิตฟ้า" class="w-8 h-8 md:w-10 md:h-10 rounded-full border border-amber-500/50 shadow-[0_0_10px_rgba(245,158,11,0.5)] object-cover">
                     <h1 class="font-bold text-lg md:text-xl tracking-widest" style="background: linear-gradient(to right, #fde047, #f59e0b, #d97706); -webkit-background-clip: text; -webkit-text-fill-color: transparent; font-family: 'Cinzel', serif;">ลิขิตฟ้า</h1>
                 </div>
                 <div class="flex items-center gap-2">
                     <button onclick="window.location.href='${pathPrefix}donate.html'" class="text-[10px] md:text-xs px-3 py-1.5 rounded-full border border-rose-500/50 bg-rose-500/20 hover:bg-rose-500/40 text-rose-200 transition-all font-medium flex items-center shadow-[0_0_10px_rgba(225,29,72,0.3)]" style="font-family: 'Prompt', sans-serif;">
                         <i class="fa-solid fa-mug-hot mr-1.5 text-rose-400"></i><span class="hidden sm:inline">เลี้ยงกาแฟ</span>
                     </button>
 
                     <button onclick="window.location.href='${pathPrefix}dashboard.html'" class="text-[10px] md:text-xs px-3 py-1.5 rounded-full border border-amber-500/40 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 transition-all font-medium" style="font-family: 'Prompt', sans-serif;">
                         <i class="fa-solid fa-arrow-left mr-1"></i>เมนู
                     </button>
                 </div>
             </div>
         </div>
     </nav>
     <div class="h-16 md:h-20 w-full"></div>
`;

document.addEventListener("DOMContentLoaded", () => {
    document.body.insertAdjacentHTML('afterbegin', topHeaderHTML);
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