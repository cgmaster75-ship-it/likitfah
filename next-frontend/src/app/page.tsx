"use client";

import React, { useState, useEffect } from "react";
import { 
  Sparkles, 
  Moon, 
  Sun, 
  Compass, 
  Users, 
  CheckCircle2, 
  ChevronRight, 
  Lock, 
  ArrowRight, 
  ShieldCheck, 
  Mail, 
  Share2, 
  Globe, 
  Calendar, 
  Clock, 
  User, 
  Check, 
  Loader2, 
  AlertCircle, 
  X,
  Activity,
  Award,
  BookOpen,
  Bell,
  Menu,
  Heart,
  TrendingUp,
  Sliders,
  DollarSign,
  Phone
} from "lucide-react";

// Premium Translation & content dictionary matching user prompt
const t = {
  th: {
    brand: "Likit Fah",
    subtitle: "ศาลาพยากรณ์",
    navTarot: "ทำนายไพ่ยิปซี",
    navCalendar: "ปฏิทินจีนบาจื่อ",
    navDashboard: "แดชบอร์ดดวงชะตา",
    navGetStarted: "🔮 เริ่มวิเคราะห์ฟรี",
    
    heroTitle: "ค้นพบคำตอบ",
    heroTitleHighlight: "ที่จักรวาลอยากบอกคุณ",
    heroSubtitle: "ดูดวงแม่นยำ ด้วยศาสตร์โหราศาสตร์หลายแขนง พร้อม AI วิเคราะห์เฉพาะบุคคลโดยผู้เชี่ยวชาญ",
    btnHeroCta: "🌟 ดูดวงของฉันเลย",
    btnHeroSample: "💬 ปรึกษาเรื่องที่กังวล",
    seekersCount: "มีผู้เปิดดวงชะตาแล้วกว่า 23,481+ คน",
    bullet1: "✨ ตรวจสมดุล 5 ธาตุและสีมงคลประจำตัว",
    bullet2: "🃏 เปิดไพ่ยิปซีพยากรณ์ความรักและการงาน",
    bullet3: "🍀 รหัสตัวเลขมงคลและเลขเด่นนำโชคลาภ",
    
    feat1Title: "แม่นยำสูง",
    feat1Desc: "วิเคราะห์พิกัดองศาดาวตามเวลาตกฟากจริงด้วยดาราศาสตร์คำนวณ",
    feat2Title: "ปลอดภัย 100%",
    feat2Desc: "ข้อมูลส่วนตัวและวันเดือนปีเกิดของคุณจะได้รับการดูแลเป็นความลับสูงสุด",
    feat3Title: "ครอบคลุมทุกศาสตร์",
    feat3Desc: "ครบถ้วนในหนึ่งเดียว ทั้งโหราศาสตร์จีน บาจื่อ ไพ่ยิปซี ลายมือ และตัวเลขมงคล",

    widgetTitle: "ดัชนีดวงดาวประจำวันของคุณ",
    widgetSub: "ประมวลผลดวงชะตาปัจจุบันด้วยค่าพิกัดลัคนาผสมผสานปฏิทินพลังธาตุเกิดวันนี้",
    widgetScoreLabel: "ดวงโดยรวมวันนี้",
    widgetLuckyNum: "เลขนำโชค",
    widgetLuckyColor: "สีมงคลประจำตัว",
    widgetLuckyTime: "ช่วงเวลาทองคำ",
    widgetAiRecommend: "คำชี้แนะจากระบบ AI ลิขิตฟ้า",
    widgetAiRecommendText: "ดาวพฤหัสโคจรเข้าทับเรือนชะตาในตำแหน่งการเงิน จังหวะชีวิตวันนี้เหมาะแก่การริเริ่มเจรจาค้าขาย หรือประสานงานโปรเจกต์ใหญ่ จะได้รับผลลัพธ์ที่ดีเลิศ",
    
    servicesTitle: "บริการของเราทั้งหมด",
    servicesSub: "เลือกเข้าใช้งานศาสตร์และเครื่องมือวิเคราะห์ชะตาชีวิตอัจฉริยะได้ทันที",
    viewAll: "ดูทั้งหมด",

    bottomTitle: "พร้อมเปิดแผนผังชะตาชีวิตของคุณหรือยัง?",
    bottomCta: "🔮 เริ่มถอดรหัสดวงชะตาฟรี",
    footerDesc: "พลิกชะตาชีวิตด้วยการคำนวณตำแหน่งองศาดาวจริงและหลักการสมดุลห้าธาตุสากล",
    footerCol1: "ฟีเจอร์พยากรณ์",
    footerCol2: "ข้อตกลงและนโยบาย",
    footerCol3: "ติดต่อสนับสนุน",
    
    wizardTitle: "เริ่มวิเคราะห์ดวงชะตา",
    wizardStep1: "ชื่อผู้เปิดดวง",
    wizardStep2: "วันเกิด ค.ศ.",
    wizardStep3: "เวลาตกฟาก",
    placeholderName: "กรอกชื่อ-นามสกุล เช่น ณัฐวุฒิ ใจดี",
    btnNext: "ขั้นตอนถัดไป",
    btnPrev: "ย้อนกลับ",
    btnSubmit: "🔮 เริ่มคำนวณดวงชะตา",
    disclaimer: "ข้อมูลความปลอดภัยได้รับการวิเคราะห์เฉพาะบนเบราว์เซอร์และเป็นส่วนตัว 100%",
    loadingTitle: "ระบบเซิร์ฟเวอร์ดวงดาวกำลังถอดรหัส...",
    loadingS1: "ตรวจสอบพิกัดองศาดาว ณ วันและเวลาเกิด",
    loadingS2: "คำนวณสมดุลองศาลัคนาและดาวเจ้าเรือน",
    loadingS3: "จัดสัดส่วนเปอร์เซ็นต์สมดุลพลังธาตุทั้ง 5",
    loadingS4: "จัดเตรียมกราฟชีวิตทิศทางชะตา 100 ปีล่วงหน้า",
    loadingS5: "จัดทำแผนภูมิแดชบอร์ดเฉพาะตัวบุคคลเสร็จสิ้น...",
    unknownTime: "ฉันไม่ทราบเวลาเกิดของฉัน"
  },
  en: {
    brand: "Likit Fah",
    subtitle: "Mystic Oracle",
    navTarot: "Tarot Readings",
    navCalendar: "Bazi Calendar",
    navDashboard: "Report Dashboard",
    navGetStarted: "🔮 Free Reading",
    
    heroTitle: "Discover The Answers",
    heroTitleHighlight: "The Universe Has For You",
    heroSubtitle: "High-precision calculations and multi-branch astrology reports powered by personalized AI.",
    btnHeroCta: "🌟 Reveal My Destiny",
    btnHeroSample: "💬 Ask a Specialist",
    seekersCount: "Over 23,481+ seekers have checked their charts",
    bullet1: "✨ Analyze your 5-element strengths & colors",
    bullet2: "🃏 Access tarot roadmap for love & work",
    bullet3: "🍀 Access lucky numbers and codes",
    
    feat1Title: "High Precision",
    feat1Desc: "Astronomical calculation mapped to your exact birth time coordinates.",
    feat2Title: "100% Private",
    feat2Desc: "Your birth parameters and personal data are strictly private and secure.",
    feat3Title: "Universal Oracles",
    feat3Desc: "Bazi Elements, Tarot roadmaps, Palmistry analysis, and Lucky numbers in one place.",

    widgetTitle: "Your Daily Cosmic Alignment",
    widgetSub: "Live transit calculations based on your birth coordinates and current celestial paths.",
    widgetScoreLabel: "Today's Luck Index",
    widgetLuckyNum: "Lucky Number",
    widgetLuckyColor: "Lucky Color",
    widgetLuckyTime: "Golden Hours",
    widgetAiRecommend: "Cosmic AI Recommendation",
    widgetAiRecommendText: "Jupiter enters your financial house today. The current planetary alignment is highly supportive for contract signatures, wealth decisions, and launching ambitious designs.",
    
    servicesTitle: "Our Astrology Services",
    servicesSub: "Choose from our suite of professional destiny calculators and interactive readings.",
    viewAll: "View All",

    bottomTitle: "Ready to Reveal Your Cosmic Blueprint?",
    bottomCta: "🔮 Begin Free Calculation",
    footerDesc: "Empower your choices with advanced celestial mathematics and classic elemental balancing.",
    footerCol1: "Oracles",
    footerCol2: "Terms & Policies",
    footerCol3: "Support",
    
    wizardTitle: "Decode Your Destiny Map",
    wizardStep1: "Name",
    wizardStep2: "Birth Date",
    wizardStep3: "Birth Hour",
    placeholderName: "Enter your full name e.g., Nuttawoot Jaidee",
    btnNext: "Continue",
    btnPrev: "Back",
    btnSubmit: "🔮 Generate My Report",
    disclaimer: "Your birth coordinates are calculated locally and are 100% private.",
    loadingTitle: "Astro-servers processing...",
    loadingS1: "Checking coordinate alignments at birth",
    loadingS2: "Calculating ascendant and natal houses",
    loadingS3: "Balancing Bazi 5-Element strengths",
    loadingS4: "Drawing 100-year decade transit graph",
    loadingS5: "Creating personalized Bazi PDF dashboard...",
    unknownTime: "I do not know my birth hour"
  }
};

export default function Home() {
  const [lang, setLang] = useState<"th" | "en">("th");
  const currentTranslations = t[lang];
  const [wizardOpen, setWizardOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [liveUserCount, setLiveUserCount] = useState(18);

  // Live Interactive Widget state (calculated dynamically based on user input or defaults)
  const [widgetDob, setWidgetDob] = useState("1995-06-23");
  const [widgetName, setWidgetName] = useState("");
  const [widgetScore, setWidgetScore] = useState(88);
  const [widgetNum, setWidgetNum] = useState("3, 8");
  const [widgetColor, setWidgetColor] = useState("เขียวเหนี่ยวทรัพย์, ทองคำ (Green, Gold)");
  const [widgetTime, setWidgetTime] = useState("09:00 - 11:00 น. (Gold Hours)");
  
  const [widgetLove, setWidgetLove] = useState(85);
  const [widgetMoney, setWidgetMoney] = useState(92);
  const [widgetCareer, setWidgetCareer] = useState(78);
  const [widgetHealth, setWidgetHealth] = useState(90);

  // Form Wizard inputs
  const [fullName, setFullName] = useState("");
  const [dob, setDob] = useState("");
  const [tob, setTob] = useState("12:00");
  const [noBirthTime, setNoBirthTime] = useState(false);
  const [formError, setFormError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionProgress, setSubmissionProgress] = useState(0);
  const [completedAnimationSteps, setCompletedAnimationSteps] = useState<number[]>([]);

  // Update Horoscope Widget values on input changes
  useEffect(() => {
    const seed = widgetDob.split("-").reduce((acc, val) => acc + parseInt(val || "0"), 0) + (widgetName ? widgetName.length * 5 : 45);
    const score = 70 + (seed % 28); // between 70% and 98%
    setWidgetScore(score);

    const love = 65 + (seed % 31);
    const money = 60 + ((seed * 7) % 36);
    const career = 65 + ((seed * 11) % 31);
    const health = 70 + ((seed * 3) % 26);
    
    setWidgetLove(love);
    setWidgetMoney(money);
    setWidgetCareer(career);
    setWidgetHealth(health);

    const numbers = [`3, 8`, `1, 9`, `2, 7`, `4, 6`, `5, 0`][seed % 5];
    setWidgetNum(numbers);

    const colors = [
      "เขียวเหนี่ยวทรัพย์, ชมพู (Green, Pink)",
      "ทองคำส่องสว่าง, แดงมงคล (Gold, Red)",
      "น้ำเงินมหาสมุทร, เทาเงิน (Navy Blue, Silver)",
      "เหลืองครีม, ส้มสดใส (Yellow, Orange)",
      "ขาวบริสุทธิ์, ดำขลับ (White, Black)"
    ][seed % 5];
    setWidgetColor(colors);

    const times = [
      "09:00 - 11:00 น. (Gold Hours)",
      "13:00 - 15:00 น. (Lucky Hours)",
      "17:00 - 19:00 น. (Auspicious Hours)",
      "07:00 - 09:00 น. (Morning Hours)",
      "19:00 - 21:00 น. (Evening Hours)"
    ][seed % 5];
    setWidgetTime(times);

  }, [widgetDob, widgetName]);

  // Simulation of live active seekers count
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveUserCount(prev => {
        const delta = Math.floor(Math.random() * 5) - 2;
        return Math.max(8, Math.min(45, prev + delta));
      });
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleNextStep = () => {
    setFormError("");
    if (currentStep === 1) {
      if (!fullName.trim() || fullName.trim().length < 2) {
        setFormError(lang === "en" ? "Please enter your name." : "กรุณากรอกชื่อของคุณให้สมบูรณ์");
        return;
      }
    } else if (currentStep === 2) {
      if (!dob) {
        setFormError(lang === "en" ? "Please select your birth date." : "กรุณาเลือกวันเกิดของคุณ");
        return;
      }
    }
    setCurrentStep(prev => prev + 1);
  };

  const handlePrevStep = () => {
    setFormError("");
    setCurrentStep(prev => Math.max(1, prev - 1));
  };

  const handleWizardSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");
    
    setIsSubmitting(true);
    setSubmissionProgress(0);
    setCompletedAnimationSteps([]);

    localStorage.setItem("user_fullname", fullName);
    localStorage.setItem("user_dob", dob);
    localStorage.setItem("user_tob", noBirthTime ? "12:00" : tob);
    localStorage.setItem("pdpa_consent_accepted", "true");

    const steps = [1, 2, 3, 4, 5];
    steps.forEach((step, idx) => {
      setTimeout(() => {
        setCompletedAnimationSteps(prev => [...prev, step]);
        setSubmissionProgress((step / 5) * 100);
        if (step === 5) {
          setTimeout(() => {
            window.location.href = "dashboard.html";
          }, 600);
        }
      }, (idx + 1) * 1100);
    });
  };

  // List of all services (completely free of pricing tags to align with request)
  const servicesList = [
    { id: 1, title: "ดูดวงรายวัน (Daily Horoscope)", desc: "เช็คทิศทางโชคลาภรายธาตุและดัชนีดาวจรวันต่อวันฟรี", badge: "ยอดนิยม", icon: <Sun className="w-5 h-5" /> },
    { id: 2, title: "ดูดวงรายเดือน (Monthly Horoscope)", desc: "ตรวจลัคนาราศีวิเคราะห์ลึก 12 ราศีพร้อมทรานสิตปี", badge: "แนะนำ", icon: <Calendar className="w-5 h-5" /> },
    { id: 3, title: "ดูดวงความรัก (Love Horoscope)", desc: "เจาะลึกเกณฑ์เนื้อคู่ คนโสด คนมีคู่ และองศาดาวแห่งคู่ครอง", badge: null, icon: <Heart className="w-5 h-5" /> },
    { id: 4, title: "ปฏิทินจีนบาจื่อ (Bazi Chart)", desc: "ตรวจวิเคราะห์สัดส่วนกำลังสมดุล 5 ธาตุหลักประจำวันเกิด", badge: "พรีเมียม", icon: <Compass className="w-5 h-5" /> },
    { id: 5, title: "ทำนายไพ่ยิปซี (Tarot Readings)", desc: "เปิดไพ่พยากรณ์สากล 78 ใบคลายข้อสงสัยชีวิตเฉพาะด้าน", badge: null, icon: <Sparkles className="w-5 h-5" /> },
    { id: 6, title: "ฮวงจุ้ยบ้าน & โต๊ะทำงาน (Feng Shui)", desc: "ปรับสมดุลทิศทางและตำแหน่งเพื่อส่งเสริมพลังบวกโชคลาภ", badge: null, icon: <ShieldCheck className="w-5 h-5" /> },
    { id: 7, title: "เลขนำโชคเบอร์โทรศัพท์ (Lucky Numbers)", desc: "วิเคราะห์ความหมายคู่ตัวเลขเบอร์โทรศัพท์มือถือที่ใช้หนุนชีวิต", badge: null, icon: <Phone className="w-5 h-5" /> },
    { id: 8, title: "ทำนายฝันพยากรณ์ (Dream Decode)", desc: "ถอดรหัสเหตุการณ์ในฝันเป็นคำเตือนภัยและเลขนำโชคประจำวัน", badge: null, icon: <BookOpen className="w-5 h-5" /> }
  ];

  return (
    <div className="min-h-screen bg-[#070714] text-slate-100 flex flex-col font-sans selection:bg-amber-500 selection:text-black relative pb-16 md:pb-0 overflow-x-hidden">
      
      {/* Astrological Cosmic Nebula Background Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1440px] h-[800px] overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-100px] left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-b from-purple-500/10 via-indigo-500/5 to-transparent rounded-full blur-[140px]"></div>
        <div className="absolute top-[300px] right-[5%] w-[450px] h-[450px] bg-amber-500/5 rounded-full blur-[120px]"></div>
        <div className="absolute top-[450px] left-[-10%] w-[350px] h-[350px] bg-pink-500/5 rounded-full blur-[100px]"></div>
      </div>

      {/* 1. Header (Navbar) - Glassmorphism floating header */}
      <header className="sticky top-0 z-50 w-full bg-[#070714]/70 backdrop-blur-md border-b border-white/[0.06] py-4.5 px-6 md:px-12 flex justify-between items-center text-slate-200">
        <div className="flex items-center gap-4">
          <button className="text-slate-400 hover:text-white transition-colors cursor-pointer" aria-label="Menu">
            <Menu className="w-5 h-5" />
          </button>
        </div>

        {/* Center Logo matching mockup */}
        <div className="flex items-center gap-2.5">
          <div className="w-7.5 h-7.5 rounded-full bg-gradient-to-b from-amber-400 to-amber-600 flex items-center justify-center border border-amber-500/30">
            <Moon className="w-4 h-4 text-slate-950 font-bold" />
          </div>
          <div className="text-center">
            <span className="font-serif font-black text-sm md:text-base tracking-wider text-white">{currentTranslations.brand}</span>
            <p className="text-[6.5px] text-slate-500 uppercase tracking-widest mt-0.5 font-bold">{currentTranslations.subtitle}</p>
          </div>
        </div>

        {/* Right tools */}
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setLang(prev => prev === "th" ? "en" : "th")}
            className="text-[10px] font-bold text-slate-400 hover:text-amber-400 transition-all border border-white/[0.08] rounded px-2 py-0.5"
          >
            {lang === "th" ? "EN" : "TH"}
          </button>
          
          <button className="relative text-slate-400 hover:text-white transition-colors cursor-pointer">
            <Bell className="w-5 h-5" />
            <span className="absolute top-0 right-0 w-1.5 h-1.5 rounded-full bg-amber-500"></span>
          </button>
        </div>
      </header>

      {/* Main Content Layout with 1440px max width constraints */}
      <main className="flex-1 max-w-[1440px] mx-auto w-full px-6 md:px-12 py-10 md:py-16 relative z-10 flex flex-col gap-24">

        {/* AdSense Top Ad Slot Placeholder */}
        <div className="w-full rounded-2xl border border-white/[0.08] bg-white/[0.02] p-2.5 flex flex-col items-center justify-center text-[9px] text-slate-600 uppercase tracking-widest min-h-[90px] relative overflow-hidden">
          <div className="absolute top-1 right-2 text-[7px] text-slate-700">AdSlot: Top Banner</div>
          <span>Google AdSense Advertisement</span>
          <div className="text-[7px] text-slate-500 font-mono mt-1">&lt;ins class="adsbygoogle" style="display:inline-block;width:728px;height:90px"&gt;&lt;/ins&gt;</div>
        </div>

        {/* 2. Hero Section - Purple Nebula space with rotating zodiac wheel */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center bg-white/[0.02] border border-white/[0.06] rounded-[24px] p-8 md:p-12 relative overflow-hidden backdrop-blur-md">
          {/* Subtle star particle background */}
          <div className="absolute inset-0 bg-cover bg-center opacity-[0.05] pointer-events-none mix-blend-overlay" style={{ backgroundImage: "url('/zodiac_bg.png')" }}></div>
          
          {/* Left copy */}
          <div className="lg:col-span-7 flex flex-col gap-6 text-left items-start z-10">
            
            {/* Live seekers tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-400 text-[10px] font-bold uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
              <span>⭐ {currentTranslations.seekersCount}</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black font-serif tracking-tight leading-none text-white">
              {currentTranslations.heroTitle} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 block sm:inline mt-2">
                {currentTranslations.heroTitleHighlight}
              </span>
            </h1>
            
            <p className="text-xs md:text-sm text-slate-400 font-light leading-relaxed max-w-lg">
              {currentTranslations.heroSubtitle}
            </p>

            {/* Bullets */}
            <div className="flex flex-col gap-3.5 text-xs text-slate-300 font-semibold w-full">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4.5 h-4.5 text-amber-400 shrink-0" />
                <span>{currentTranslations.bullet1}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4.5 h-4.5 text-amber-400 shrink-0" />
                <span>{currentTranslations.bullet2}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4.5 h-4.5 text-amber-400 shrink-0" />
                <span>{currentTranslations.bullet3}</span>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full pt-2">
              <button 
                onClick={() => {
                  setWizardOpen(true);
                  setCurrentStep(1);
                }}
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-amber-500 to-yellow-450 hover:from-amber-400 hover:to-yellow-350 text-black font-extrabold text-xs transition-all hover:scale-[1.02] shadow-[0_4px_30px_rgba(233,196,106,0.3)] cursor-pointer flex justify-center items-center gap-2"
              >
                <span>{currentTranslations.btnHeroCta}</span>
                <ArrowRight className="w-4 h-4 text-black" />
              </button>
              
              <button 
                onClick={() => setWizardOpen(true)}
                className="w-full sm:w-auto px-8 py-4 rounded-full border border-purple-500/20 bg-purple-950/15 hover:bg-purple-950/30 text-purple-300 font-bold text-xs transition-all flex justify-center items-center gap-2 cursor-pointer"
              >
                <span>{currentTranslations.btnHeroSample}</span>
              </button>
            </div>
          </div>

          {/* Right spinning zodiac wheel */}
          <div className="lg:col-span-5 flex justify-center items-center relative z-10">
            <div className="relative w-56 h-56 md:w-72 md:h-72">
              <div className="absolute inset-[-15px] bg-purple-500/5 rounded-full blur-3xl animate-pulse"></div>
              <img 
                src="/zodiac_bg.png" 
                alt="Glowing Zodiac Calendar Wheel" 
                className="w-full h-full object-contain animate-spin-slow filter drop-shadow-[0_0_25px_rgba(233,196,106,0.18)]"
              />
            </div>
          </div>
        </section>

        {/* 3. Feature Highlights Section (3 Glass cards) */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="bg-white/[0.03] border border-white/[0.08] p-6 rounded-3xl hover:border-purple-500/30 hover:translate-y-[-4px] transition-all duration-300 flex flex-col gap-4 text-left shadow-lg">
            <div className="w-10 h-10 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-serif font-black text-white">{currentTranslations.feat1Title}</h3>
            <p className="text-xs text-slate-450 leading-relaxed font-light">{currentTranslations.feat1Desc}</p>
          </div>
          {/* Card 2 */}
          <div className="bg-white/[0.03] border border-white/[0.08] p-6 rounded-3xl hover:border-purple-500/30 hover:translate-y-[-4px] transition-all duration-300 flex flex-col gap-4 text-left shadow-lg">
            <div className="w-10 h-10 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
              <Lock className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-serif font-black text-white">{currentTranslations.feat2Title}</h3>
            <p className="text-xs text-slate-450 leading-relaxed font-light">{currentTranslations.feat2Desc}</p>
          </div>
          {/* Card 3 */}
          <div className="bg-white/[0.03] border border-white/[0.08] p-6 rounded-3xl hover:border-purple-500/30 hover:translate-y-[-4px] transition-all duration-300 flex flex-col gap-4 text-left shadow-lg">
            <div className="w-10 h-10 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-serif font-black text-white">{currentTranslations.feat3Title}</h3>
            <p className="text-xs text-slate-450 leading-relaxed font-light">{currentTranslations.feat3Desc}</p>
          </div>
        </section>

        {/* 4. Today's Horoscope Widget (Dashboard style) */}
        <section className="flex flex-col gap-6 text-left">
          <div className="flex flex-col gap-2">
            <h2 className="text-lg md:text-xl font-serif font-black text-white">{currentTranslations.widgetTitle}</h2>
            <p className="text-slate-450 text-xs">{currentTranslations.widgetSub}</p>
          </div>

          <div className="bg-white/[0.03] border border-white/[0.08] rounded-3xl p-6 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center backdrop-blur-md relative overflow-hidden shadow-2xl">
            {/* Ambient gold/purple background glow inside card */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-[80px] pointer-events-none"></div>

            {/* Circular Luck Index score dial (4 columns on desktop) */}
            <div className="lg:col-span-4 flex flex-col items-center justify-center border-b lg:border-b-0 lg:border-r border-white/[0.08] pb-6 lg:pb-0 lg:pr-8 text-center min-h-[200px]">
              
              {/* Sandbox controls inside the widget to make it extremely interactive */}
              <div className="w-full max-w-[180px] flex flex-col gap-1.5 mb-5 text-left">
                <label className="text-[8px] font-bold text-slate-500 uppercase tracking-widest">ชื่อผู้เปิดดวงชะตา</label>
                <input 
                  type="text" 
                  value={widgetName}
                  onChange={(e) => setWidgetName(e.target.value)}
                  placeholder="ณัฐวุฒิ ใจดี"
                  className="bg-black/40 border border-white/[0.08] rounded-lg px-2.5 py-1.5 text-[10px] text-amber-400 font-bold focus:outline-none focus:border-amber-500 transition-all w-full"
                />
              </div>

              <div className="text-[9px] text-slate-400 font-bold uppercase tracking-wider mb-3">{currentTranslations.widgetScoreLabel}</div>
              
              <div className="relative w-28 h-28 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="42" stroke="rgba(255,255,255,0.03)" strokeWidth="6" fill="transparent" />
                  <circle cx="50" cy="50" r="42" stroke="#E9C46A" strokeWidth="6" fill="transparent"
                    strokeDasharray="263.8" strokeDashoffset={263.8 - (263.8 * widgetScore) / 100} strokeLinecap="round" className="transition-all duration-700 ease-out" />
                </svg>
                <div className="absolute flex flex-col items-center">
                  <span className="text-2xl font-black text-amber-400 font-mono tracking-tighter">{widgetScore}%</span>
                  <span className="text-[7px] text-emerald-400 font-bold uppercase tracking-widest mt-0.5">High Transit</span>
                </div>
              </div>
            </div>

            {/* Lucky coordinates lists (4 columns on desktop) */}
            <div className="lg:col-span-4 flex flex-col gap-4.5 border-b lg:border-b-0 lg:border-r border-white/[0.08] pb-6 lg:pb-0 lg:pr-8 text-left justify-center min-h-[200px]">
              <div className="flex flex-col gap-1">
                <span className="text-[8px] font-bold text-slate-500 uppercase tracking-widest">{currentTranslations.widgetLuckyNum}</span>
                <span className="text-sm font-black text-amber-400 font-mono">{widgetNum}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[8px] font-bold text-slate-500 uppercase tracking-widest">{currentTranslations.widgetLuckyColor}</span>
                <span className="text-xs font-bold text-slate-200">{widgetColor}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[8px] font-bold text-slate-500 uppercase tracking-widest">{currentTranslations.widgetLuckyTime}</span>
                <span className="text-[11px] font-bold text-slate-300 font-mono">{widgetTime}</span>
              </div>
            </div>

            {/* Parameters levels & AI summary (4 columns on desktop) */}
            <div className="lg:col-span-4 flex flex-col justify-between text-left min-h-[220px]">
              
              {/* Parameters levels */}
              <div className="space-y-2.5">
                <div>
                  <div className="flex justify-between text-[10px] font-bold mb-1"><span className="text-pink-400">ความรัก (Love)</span><span className="text-white font-mono">{widgetLove}%</span></div>
                  <div className="w-full bg-[#120e2e] rounded-full h-1"><div className="bg-pink-500 h-1 rounded-full transition-all duration-500" style={{ width: `${widgetLove}%` }}></div></div>
                </div>
                <div>
                  <div className="flex justify-between text-[10px] font-bold mb-1"><span className="text-amber-450">การเงิน (Money)</span><span className="text-white font-mono">{widgetMoney}%</span></div>
                  <div className="w-full bg-[#120e2e] rounded-full h-1"><div className="bg-amber-500 h-1 rounded-full transition-all duration-500" style={{ width: `${widgetMoney}%` }}></div></div>
                </div>
                <div>
                  <div className="flex justify-between text-[10px] font-bold mb-1"><span className="text-indigo-400">การงาน (Career)</span><span className="text-white font-mono">{widgetCareer}%</span></div>
                  <div className="w-full bg-[#120e2e] rounded-full h-1"><div className="bg-indigo-500 h-1 rounded-full transition-all duration-500" style={{ width: `${widgetCareer}%` }}></div></div>
                </div>
                <div>
                  <div className="flex justify-between text-[10px] font-bold mb-1"><span className="text-emerald-450">สุขภาพ (Health)</span><span className="text-white font-mono">{widgetHealth}%</span></div>
                  <div className="w-full bg-[#120e2e] rounded-full h-1"><div className="bg-emerald-500 h-1 rounded-full transition-all duration-500" style={{ width: `${widgetHealth}%` }}></div></div>
                </div>
              </div>

              {/* AI Badge & Advice summary */}
              <div className="bg-white/[0.02] border border-white/[0.04] p-3 rounded-xl mt-4">
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-purple-500/10 border border-purple-500/20 text-purple-400 text-[8px] font-bold uppercase tracking-wider mb-1.5">
                  <Sparkles className="w-2.5 h-2.5 text-purple-400" />
                  <span>{currentTranslations.widgetAiRecommend}</span>
                </span>
                <p className="text-[10px] text-slate-450 leading-relaxed font-light">
                  "{currentTranslations.widgetAiRecommendText}"
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* 5. Services Responsive Grid Section (บริการของเรา) - completely free of pricing to match the user's specific request */}
        <section className="flex flex-col gap-6 text-left">
          <div className="flex justify-between items-center px-1">
            <h2 className="text-lg md:text-xl font-serif font-black text-white">{currentTranslations.servicesTitle}</h2>
            <a href="chinese-calendar.html" className="text-xs text-purple-400 hover:text-purple-300 font-bold">{currentTranslations.viewAll} &gt;</a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {servicesList.map(srv => (
              <div 
                key={srv.id}
                onClick={() => {
                  setWizardOpen(true);
                  setCurrentStep(1);
                }}
                className="bg-white/[0.03] border border-white/[0.08] p-5.5 rounded-3xl hover:border-purple-550/30 hover:translate-y-[-4px] transition-all duration-300 flex flex-col justify-between min-h-[220px] cursor-pointer relative group overflow-hidden shadow-md"
              >
                {/* Glow circle overlay inside cards */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/0 group-hover:bg-purple-500/[0.02] rounded-full blur-2xl transition-all duration-300"></div>

                <div>
                  <div className="flex justify-between items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-purple-550/10 border border-purple-550/20 flex items-center justify-center text-purple-400 shadow-[0_0_15px_rgba(139,92,246,0.15)] group-hover:shadow-[0_0_20px_rgba(139,92,246,0.25)] transition-all shrink-0">
                      {srv.icon}
                    </div>
                    {srv.badge && (
                      <span className="text-[7.5px] font-bold bg-amber-500/10 border border-amber-500/20 text-amber-400 px-2 py-0.5 rounded-full uppercase tracking-wider">
                        {srv.badge}
                      </span>
                    )}
                  </div>

                  <h3 className="text-xs font-serif font-black text-white mt-4 mb-2">{srv.title}</h3>
                  <p className="text-[10px] text-slate-450 leading-relaxed font-light">{srv.desc}</p>
                </div>

                <div className="flex justify-between items-center pt-3.5 border-t border-white/[0.04] mt-4 text-[10px] font-bold">
                  <span className="text-emerald-400 bg-emerald-500/5 px-2 py-0.5 rounded border border-emerald-500/10">✨ ตรวจฟรี</span>
                  <span className="text-slate-400 hover:text-white flex items-center gap-1 transition-colors">วิเคราะห์เลย →</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 6. Recommended Highlight Banner (เปิดไพ่พลังจักรวาล - Price free to match request) */}
        <section className="flex flex-col gap-4 text-left">
          <div className="flex justify-between items-center px-1">
            <h2 className="text-lg md:text-xl font-serif font-black text-white">แนะนำพยากรณ์พิเศษ</h2>
            <a href="tarot.html" className="text-xs text-purple-400 hover:text-purple-300 font-bold">{currentTranslations.viewAll} &gt;</a>
          </div>

          <div className="bg-[#0b061e]/40 rounded-3xl border border-white/[0.08] overflow-hidden flex flex-col md:flex-row gap-6 p-6 items-center backdrop-blur-md relative shadow-2xl">
            {/* Background gold glow */}
            <div className="absolute top-0 right-0 w-64 h-full bg-amber-500/[0.02] rounded-full blur-[80px] pointer-events-none"></div>

            {/* Left banner image */}
            <div className="w-full md:w-1/3 aspect-[1.8/1] md:aspect-[1.5/1] rounded-2xl overflow-hidden relative border border-white/[0.08] shrink-0">
              <img 
                src="/tarot_banner.png" 
                alt="Tarot recommended banner illustration" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0b061e]/20"></div>
            </div>

            {/* Right details */}
            <div className="flex-1 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 w-full text-left">
              <div className="space-y-1.5 max-w-xl">
                <span className="text-[8px] font-bold text-amber-500 uppercase tracking-widest">ศาสตร์พยากรณ์เด่น</span>
                <h3 className="text-base font-serif font-black text-white">เปิดไพ่พลังจักรวาล</h3>
                <p className="text-[11px] text-slate-450 leading-relaxed font-light">เปิดไพ่ยิปซีพลังจักรวาล 3 ใบ รับคำวิเคราะห์สวรรค์ ชี้พิกัดการงานและการเงินเพื่อแนวทางประกอบการตัดสินใจของชีวิตคุณฟรี</p>
                <div className="flex items-center gap-2 pt-1">
                  <span className="text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 text-[9px] font-bold px-2 py-0.5 rounded">ตรวจพยากรณ์ได้ฟรีไม่มีค่าบริการ</span>
                </div>
              </div>
              <button 
                onClick={() => {
                  setWizardOpen(true);
                  setCurrentStep(1);
                }}
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-450 hover:from-amber-400 hover:to-yellow-350 text-black font-extrabold text-[10px] shadow-sm flex items-center gap-1.5 cursor-pointer shrink-0"
              >
                <span>เปิดไพ่พยากรณ์เลย 👈</span>
              </button>
            </div>
          </div>
        </section>

        {/* AdSense In-Feed Ad Slot Placeholder */}
        <div className="w-full rounded-2xl border border-white/[0.08] bg-white/[0.02] p-2.5 flex flex-col items-center justify-center text-[9px] text-slate-600 uppercase tracking-widest min-h-[90px] relative overflow-hidden my-1">
          <div className="absolute top-1 right-2 text-[7px] text-slate-700">AdSlot: Mid Banner</div>
          <span>Google AdSense Advertisement</span>
          <div className="text-[7px] text-slate-500 font-mono mt-1">&lt;ins class="adsbygoogle" style="display:inline-block;width:728px;height:90px"&gt;&lt;/ins&gt;</div>
        </div>

        {/* 7. Articles Grid Section (บทความ & คู่มือ) */}
        <section className="flex flex-col gap-6 text-left">
          <div className="flex justify-between items-center px-1">
            <h2 className="text-lg md:text-xl font-serif font-black text-white">บทความ & คู่มือ</h2>
            <a href="dreams.html" className="text-xs text-purple-400 hover:text-purple-300 font-bold">{currentTranslations.viewAll} &gt;</a>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Article 1 */}
            <a href="chinese-calendar.html" className="bg-white/[0.02] border border-white/[0.06] rounded-2xl overflow-hidden flex flex-col justify-between hover:border-purple-500/20 hover:translate-y-[-2px] transition-all shadow-sm">
              <div className="aspect-[1.5/1] overflow-hidden w-full relative">
                <img src="/zodiac_bg.png" alt="12 Zodiac Forecast Article Banner" className="w-full h-full object-cover" />
              </div>
              <div className="p-4 text-left space-y-1.5">
                <span className="text-[7.5px] font-bold text-purple-400 uppercase tracking-wider block">โหราศาสตร์จีน</span>
                <h4 className="text-[10px] font-bold text-white leading-relaxed line-clamp-2">เช็คดวงรายเดือนทั้ง 12 ราศี</h4>
                <span className="text-[7px] text-slate-550 block font-mono">20 พ.ค. 2567</span>
              </div>
            </a>

            {/* Article 2 */}
            <a href="dreams.html" className="bg-white/[0.02] border border-white/[0.06] rounded-2xl overflow-hidden flex flex-col justify-between hover:border-purple-500/20 hover:translate-y-[-2px] transition-all shadow-sm">
              <div className="aspect-[1.5/1] overflow-hidden w-full relative">
                <img src="/art_coins.png" alt="Wealth & Prosperity Article Banner" className="w-full h-full object-cover" />
              </div>
              <div className="p-4 text-left space-y-1.5">
                <span className="text-[7.5px] font-bold text-purple-400 uppercase tracking-wider block">เสริมชะตาการเงิน</span>
                <h4 className="text-[10px] font-bold text-white leading-relaxed line-clamp-2">5 วิธีเสริมดวงการเงินให้ปังตลอดปี 2567</h4>
                <span className="text-[7px] text-slate-550 block font-mono">18 พ.ค. 2567</span>
              </div>
            </a>

            {/* Article 3 */}
            <a href="tarot.html" className="bg-white/[0.02] border border-white/[0.06] rounded-2xl overflow-hidden flex flex-col justify-between hover:border-purple-500/20 hover:translate-y-[-2px] transition-all shadow-sm">
              <div className="aspect-[1.5/1] overflow-hidden w-full relative">
                <img src="/art_love.png" alt="Relationship Forecast Article Banner" className="w-full h-full object-cover" />
              </div>
              <div className="p-4 text-left space-y-1.5">
                <span className="text-[7.5px] font-bold text-purple-400 uppercase tracking-wider block">ความสัมพันธ์</span>
                <h4 className="text-[10px] font-bold text-white leading-relaxed line-clamp-2">ดูดวงความรัก คนโสด vs คนมีคู่</h4>
                <span className="text-[7px] text-slate-550 block font-mono">15 พ.ค. 2567</span>
              </div>
            </a>

            {/* Article 4 */}
            <a href="dreams.html" className="bg-white/[0.02] border border-white/[0.06] rounded-2xl overflow-hidden flex flex-col justify-between hover:border-purple-500/20 hover:translate-y-[-2px] transition-all shadow-sm">
              <div className="aspect-[1.5/1] overflow-hidden w-full relative">
                <img src="/art_bedroom.png" alt="Bedroom Feng Shui Article Banner" className="w-full h-full object-cover" />
              </div>
              <div className="p-4 text-left space-y-1.5">
                <span className="text-[7.5px] font-bold text-purple-400 uppercase tracking-wider block">ฮวงจุ้ยที่อยู่อาศัย</span>
                <h4 className="text-[10px] font-bold text-white leading-relaxed line-clamp-2">ฮวงจุ้ยห้องนอน เสริมรัก เสริมโชค</h4>
                <span className="text-[7px] text-slate-550 block font-mono">10 พ.ค. 2567</span>
              </div>
            </a>

          </div>
        </section>

        {/* AdSense Lower Ad Slot Placeholder */}
        <div className="w-full rounded-2xl border border-white/[0.08] bg-white/[0.02] p-2.5 flex flex-col items-center justify-center text-[9px] text-slate-600 uppercase tracking-widest min-h-[90px] relative overflow-hidden my-1">
          <div className="absolute top-1 right-2 text-[7px] text-slate-700">AdSlot: Bottom Banner</div>
          <span>Google AdSense Advertisement</span>
          <div className="text-[7px] text-slate-500 font-mono mt-1">&lt;ins class="adsbygoogle" style="display:inline-block;width:728px;height:90px"&gt;&lt;/ins&gt;</div>
        </div>

        {/* 8. Premium Membership Section (Large Premium Banner) */}
        <section className="bg-gradient-to-r from-purple-950/20 via-[#120a2e]/50 to-purple-950/20 border border-purple-500/15 rounded-[24px] p-8 md:p-12 flex flex-col md:flex-row justify-between items-center gap-8 relative overflow-hidden shadow-2xl text-left">
          {/* Glowing stardust overlay decoration */}
          <div className="absolute top-0 right-0 w-64 h-full pointer-events-none opacity-[0.08] select-none">
            <img src="/tarot_banner.png" alt="Tarot card promo overlay decoration" className="w-full h-full object-cover" />
          </div>

          <div className="space-y-4 z-10">
            <span className="text-[8px] font-black uppercase tracking-wider text-amber-500">สิทธิประโยชน์สมาชิก</span>
            <h2 className="text-xl md:text-2xl font-serif font-black text-white">สมัครสมาชิกเปิดชะตาชีวิตวันนี้</h2>
            
            <div className="flex flex-col gap-2 text-[10px] text-slate-350 font-medium">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>ดูดวงรายวันและตรวจสมดุล 5 ธาตุไม่จำกัดจำนวนครั้ง</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>รับสรุปรายงานการคำนวณตำแหน่งดวงดาวแบบละเอียด PDF</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>สิทธิ์การขอคำแนะนำแบบเจาะลึกฟรีโดยระบบปัญญาประดิษฐ์ AI</span>
              </div>
            </div>
          </div>

          <button 
            onClick={() => {
              setWizardOpen(true);
              setCurrentStep(1);
            }}
            className="px-8 py-4 rounded-full bg-gradient-to-r from-amber-500 to-yellow-450 hover:from-amber-400 hover:to-yellow-350 text-black font-extrabold text-xs shadow-md transition-all hover:scale-[1.02] flex items-center gap-1.5 cursor-pointer z-10 shrink-0"
          >
            <span>สมัครสมาชิกฟรี ✛</span>
          </button>
        </section>

      </main>

      {/* 9. Footer Section */}
      <footer className="w-full bg-[#020208] border-t border-white/[0.04] py-12 px-6 md:px-12 mt-16 relative z-10 text-slate-500 text-xs text-left">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Logo & description */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-7.5 h-7.5 rounded-full bg-gradient-to-b from-amber-400 to-amber-600 flex items-center justify-center border border-amber-500/30">
                <Moon className="w-4 h-4 text-slate-950 font-bold" />
              </div>
              <div>
                <span className="font-serif font-black text-sm md:text-base tracking-wider text-white">{currentTranslations.brand}</span>
                <p className="text-[6px] text-slate-500 uppercase tracking-widest font-bold">{currentTranslations.subtitle}</p>
              </div>
            </div>
            <p className="leading-relaxed text-[11px] font-light">{currentTranslations.footerDesc}</p>
          </div>

          {/* Col 2 */}
          <div className="space-y-3">
            <h5 className="font-serif font-black text-white text-xs uppercase tracking-wider">{currentTranslations.footerCol1}</h5>
            <ul className="space-y-2 font-light">
              <li><a href="chinese-calendar.html" className="hover:text-amber-400 transition-colors">ปฏิทินจีนบาจื่อ</a></li>
              <li><a href="tarot.html" className="hover:text-amber-400 transition-colors">ทำนายไพ่ยิปซี</a></li>
              <li><a href="siemsi.html" className="hover:text-amber-400 transition-colors">เสี่ยงเซียมซีนำทาง</a></li>
              <li><a href="dreams.html" className="hover:text-amber-400 transition-colors">ทำนายฝันพยากรณ์</a></li>
            </ul>
          </div>

          {/* Col 3 */}
          <div className="space-y-3">
            <h5 className="font-serif font-black text-white text-xs uppercase tracking-wider">{currentTranslations.footerCol2}</h5>
            <ul className="space-y-2 font-light">
              <li><a href="policy.html" className="hover:text-amber-400 transition-colors">นโยบายความเป็นส่วนตัว (Privacy)</a></li>
              <li><a href="terms.html" className="hover:text-amber-400 transition-colors">ข้อตกลงการใช้งาน (Terms)</a></li>
              <li><a href="donate.html" className="hover:text-amber-400 transition-colors">สนับสนุนลิขิตฟ้า</a></li>
            </ul>
          </div>

          {/* Col 4 - Social and newsletter */}
          <div className="space-y-3">
            <h5 className="font-serif font-black text-white text-xs uppercase tracking-wider">{currentTranslations.footerCol3}</h5>
            <p className="font-light">Email: contact@likitfah.com</p>
            <div className="flex gap-4 pt-1 text-base">
              <a href="#" className="hover:text-amber-400 transition-colors" aria-label="Facebook"><Share2 className="w-4 h-4" /></a>
              <a href="#" className="hover:text-amber-400 transition-colors" aria-label="Line"><Mail className="w-4 h-4" /></a>
              <a href="#" className="hover:text-amber-400 transition-colors" aria-label="Website"><Globe className="w-4 h-4" /></a>
            </div>
          </div>

        </div>

        <div className="max-w-[1440px] mx-auto border-t border-white/[0.04] mt-10 pt-6 text-center text-[10px] text-slate-650 font-medium flex flex-col sm:flex-row justify-between items-center gap-4">
          <p>&copy; 2026 LikitFah.com • The Mystic Oracle. All Rights Reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <span>•</span>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </footer>

      {/* 10. Sticky Mobile Bottom Navigation Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-[100] bg-[#070714]/90 backdrop-blur-md border-t border-white/[0.06] py-2.5 px-4 flex justify-around items-center text-slate-400 text-[10px] md:hidden shadow-[0_-2px_15px_rgba(0,0,0,0.5)]">
        <a href="index.html" className="flex flex-col items-center gap-1 text-amber-500">
          <span>🏠</span>
          <span className="font-bold text-[9px]">หน้าหลัก</span>
        </a>
        <a href="dashboard.html" className="flex flex-col items-center gap-1 hover:text-white transition-colors">
          <span>⭐</span>
          <span className="font-bold text-[9px]">ดูดวงของฉัน</span>
        </a>
        <a href="chinese-calendar.html" className="flex flex-col items-center gap-1 hover:text-white transition-colors">
          <span>㗊</span>
          <span className="font-bold text-[9px]">บริการ</span>
        </a>
        <a href="dreams.html" className="flex flex-col items-center gap-1 hover:text-white transition-colors">
          <span>📖</span>
          <span className="font-bold text-[9px]">บทความ</span>
        </a>
        <a href="profile.html" className="flex flex-col items-center gap-1 hover:text-white transition-colors">
          <span>👤</span>
          <span className="font-bold text-[9px]">โปรไฟล์</span>
        </a>
      </div>

      {/* Interactive Step Wizard Modal (Overlay Dialog) */}
      {wizardOpen && (
        <div className="fixed inset-0 z-[105] flex items-center justify-center p-4 bg-[#03040c]/90 backdrop-blur-xs">
          <div className="absolute inset-0" onClick={() => setWizardOpen(false)}></div>
          
          <div className="bg-[#0b0c16]/95 w-full max-w-md rounded-2xl p-6 md:p-8 relative border border-purple-500/20 shadow-2xl z-10 flex flex-col gap-6 backdrop-blur-md">
            
            {/* Close Button */}
            <button 
              onClick={() => setWizardOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors cursor-pointer"
              aria-label="Close wizard"
            >
              <X className="w-5 h-5" />
            </button>

            {!isSubmitting ? (
              <>
                {/* Stepper circles */}
                <div className="flex items-center justify-between relative px-2 mb-2">
                  <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-0.5 bg-slate-800 z-0">
                    <div className="h-full bg-amber-550 transition-all duration-300" style={{ width: `${((currentStep - 1) / 2) * 100}%` }}></div>
                  </div>
                  
                  {[1, 2, 3].map(stepNum => {
                    const isActive = currentStep === stepNum;
                    const isCompleted = currentStep > stepNum;
                    
                    return (
                      <div key={stepNum} className="relative z-10 flex flex-col items-center">
                        <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center font-bold text-xs transition-all ${
                          isCompleted 
                            ? "bg-emerald-500 border-emerald-400 text-white shadow-md"
                            : isActive 
                            ? "bg-amber-600 border-amber-400 text-white shadow-lg shadow-amber-500/20" 
                            : "bg-slate-900 border-slate-700 text-slate-400"
                        }`}>
                          {isCompleted ? <Check className="w-4 h-4" /> : stepNum}
                        </div>
                        <span className={`text-[8px] font-bold mt-1.5 uppercase tracking-wider ${isActive ? "text-amber-400" : isCompleted ? "text-emerald-400" : "text-slate-500"}`}>
                          {stepNum === 1 ? currentTranslations.wizardStep1 : stepNum === 2 ? currentTranslations.wizardStep2 : currentTranslations.wizardStep3}
                        </span>
                      </div>
                    );
                  })}
                </div>

                <form onSubmit={handleWizardSubmit} className="flex flex-col gap-6">
                  {/* Step 1: Name */}
                  {currentStep === 1 && (
                    <div className="flex flex-col gap-4">
                      <div className="text-center">
                        <h3 className="text-base font-bold text-white">{currentTranslations.wizardStep1}</h3>
                        <p className="text-xs text-slate-400 mt-1">{currentTranslations.placeholderName}</p>
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1">
                          <User className="w-3 h-3 text-amber-500" />
                          <span>Name</span>
                        </label>
                        <input 
                          type="text" 
                          placeholder={currentTranslations.placeholderName}
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          className="w-full bg-black/40 border border-slate-800 rounded-xl px-4 py-3 text-yellow-100 font-bold focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 text-sm transition-all"
                        />
                      </div>
                    </div>
                  )}

                  {/* Step 2: DOB */}
                  {currentStep === 2 && (
                    <div className="flex flex-col gap-4">
                      <div className="text-center">
                        <h3 className="text-base font-bold text-white">{currentTranslations.wizardStep2}</h3>
                        <p className="text-xs text-slate-400 mt-1 font-sans">Select date in C.E. (ค.ศ.)</p>
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-amber-500" />
                          <span>Birth Date</span>
                        </label>
                        <input 
                          type="date" 
                          value={dob}
                          onChange={(e) => setDob(e.target.value)}
                          className="w-full bg-black/40 border border-slate-800 rounded-xl px-4 py-3 text-yellow-100 font-bold focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 text-sm transition-all cursor-pointer"
                        />
                      </div>
                    </div>
                  )}

                  {/* Step 3: TOB */}
                  {currentStep === 3 && (
                    <div className="flex flex-col gap-4">
                      <div className="text-center">
                        <h3 className="text-base font-bold text-white">{currentTranslations.wizardStep3}</h3>
                        <p className="text-xs text-slate-400 mt-1">Choose birth time coordinates</p>
                      </div>
                      <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-2">
                          <label className="text-[10px] font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1">
                            <Clock className="w-3 h-3 text-amber-500" />
                            <span>Birth Time</span>
                          </label>
                          <input 
                            type="time" 
                            value={tob}
                            disabled={noBirthTime}
                            onChange={(e) => setTob(e.target.value)}
                            className={`w-full bg-black/40 border border-slate-800 rounded-xl px-4 py-3 text-yellow-100 font-bold focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 text-sm transition-all ${noBirthTime ? "opacity-30 cursor-not-allowed" : "cursor-pointer"}`}
                          />
                        </div>
                        <label className="flex items-center gap-2.5 text-xs text-slate-400 font-medium cursor-pointer self-start">
                          <input 
                            type="checkbox" 
                            checked={noBirthTime}
                            onChange={(e) => setNoBirthTime(e.target.checked)}
                            className="w-4 h-4 rounded accent-amber-600 cursor-pointer"
                          />
                          <span>{currentTranslations.unknownTime}</span>
                        </label>
                      </div>
                    </div>
                  )}

                  {/* Error state */}
                  {formError && (
                    <div className="flex items-center gap-2 text-xs text-rose-400 bg-rose-500/10 border border-rose-500/20 p-3.5 rounded-xl">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{formError}</span>
                    </div>
                  )}

                  {/* Actions buttons */}
                  <div className="flex items-center gap-3 pt-2">
                    {currentStep > 1 && (
                      <button 
                        type="button" 
                        onClick={handlePrevStep}
                        className="flex-1 py-3 border border-slate-800 hover:bg-slate-900 text-slate-300 font-bold text-xs rounded-xl transition-all cursor-pointer"
                      >
                        {currentTranslations.btnPrev}
                      </button>
                    )}
                    {currentStep < 3 ? (
                      <button 
                        type="button" 
                        onClick={handleNextStep}
                        className="flex-1 py-3 bg-gradient-to-r from-amber-500 to-yellow-500 text-black font-bold text-xs rounded-xl shadow-lg transition-all cursor-pointer"
                      >
                        {currentTranslations.btnNext}
                      </button>
                    ) : (
                      <button 
                        type="submit"
                        className="flex-1 py-3 bg-gradient-to-r from-amber-600 to-yellow-500 text-black font-extrabold text-xs rounded-xl shadow-lg hover:scale-[1.01] transition-all cursor-pointer"
                      >
                        {currentTranslations.btnSubmit}
                      </button>
                    )}
                  </div>
                  <p className="text-[9px] text-slate-500 text-center">{currentTranslations.disclaimer}</p>
                </form>
              </>
            ) : (
              /* Loading / Submission State */
              <div className="flex flex-col gap-6 py-4">
                <div className="text-center flex flex-col items-center gap-3">
                  <Loader2 className="w-8 h-8 text-amber-555 animate-spin" />
                  <h3 className="text-sm font-bold text-white mt-1">{currentTranslations.loadingTitle}</h3>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-slate-900 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-amber-500 h-1.5 transition-all duration-300" style={{ width: `${submissionProgress}%` }}></div>
                </div>

                {/* Checklist animated loading states */}
                <div className="flex flex-col gap-3 text-xs text-slate-400 font-medium">
                  {[1, 2, 3, 4, 5].map(stepIndex => {
                    const isCompleted = completedAnimationSteps.includes(stepIndex);
                    const isActive = completedAnimationSteps.length + 1 === stepIndex;
                    
                    let label = "";
                    if (stepIndex === 1) label = currentTranslations.loadingS1;
                    else if (stepIndex === 2) label = currentTranslations.loadingS2;
                    else if (stepIndex === 3) label = currentTranslations.loadingS3;
                    else if (stepIndex === 4) label = currentTranslations.loadingS4;
                    else if (stepIndex === 5) label = currentTranslations.loadingS5;

                    return (
                      <div 
                        key={stepIndex} 
                        className={`flex items-center gap-3 transition-colors duration-300 ${
                          isCompleted ? "text-amber-400 font-bold" : isActive ? "text-amber-400" : "text-slate-655"
                        }`}
                      >
                        <div className="shrink-0">
                          {isCompleted ? (
                            <CheckCircle2 className="w-4 h-4 text-amber-500" />
                          ) : isActive ? (
                            <Loader2 className="w-4 h-4 text-amber-555 animate-spin" />
                          ) : (
                            <div className="w-4 h-4 rounded-full border border-slate-700 bg-slate-900"></div>
                          )}
                        </div>
                        <span>{label}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
