"use client";

import React, { useState, useEffect } from "react";
import { 
  Sparkles, 
  Moon, 
  Sun, 
  Compass, 
  CheckCircle2, 
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
  Award,
  BookOpen,
  Bell,
  Menu,
  Heart,
  TrendingUp,
  Sliders,
  DollarSign,
  Phone,
  HelpCircle,
  Users,
  Star,
  Zap,
  Activity,
  Layers,
  ChevronDown,
  ChevronRight
} from "lucide-react";

// Premium Translation & Content Dictionary
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
    heroSubtitle: "ดูดวงแม่นยำ ด้วยศาสตร์โหราศาสตร์หลายแขนง พร้อม AI วิเคราะห์เฉพาะบุคคลโดยผู้เชี่ยวชาญศาสตร์พลังธาตุจีนและดาราศาตร์สากล",
    btnHeroCta: "🔮 ดูดวงของฉันเลย",
    btnHeroSample: "💬 ปรึกษาเรื่องที่กังวล",
    seekersCount: "มีผู้เปิดดวงชะตาแล้วกว่า 23,481+ คน",
    bullet1: "✨ ตรวจสมดุล 5 ธาตุและสีมงคลประจำตัว",
    bullet2: "🃏 เปิดไพ่ยิปซีพยากรณ์ความรักและการงาน",
    bullet3: "🍀 รหัสตัวเลขมงคลและเลขเด่นนำโชคลาภ",
    
    whyTitle: "ทำไมต้องเลือก ลิขิตฟ้า",
    whySub: "เราผสมผสานศาสตร์พยากรณ์โบราณเข้ากับเทคโนโลยีการคำนวณที่แม่นยำที่สุดในยุคปัจจุบัน",
    why1Title: "แม่นยำระดับองศา",
    why1Desc: "วิเคราะห์พิกัดองศาดาวจริงตามตำแหน่งพิกัดภูมิศาสตร์เวลาตกฟากแบบนาทีต่อนาที",
    why2Title: "ความลับปลอดภัย 100%",
    why2Desc: "ข้อมูลวันเดือนปีเกิดและพารามิเตอร์ของคุณได้รับการดูแลในระดับความปลอดภัยขั้นสูง",
    why3Title: "ศาสตร์ครอบคลุม",
    why3Desc: "ครบถ้วนในหนึ่งเดียว ทั้งโหราศาสตร์จีน บาจื่อ ไพ่ยิปซี ลายมือ และศาสตร์ตัวเลข",
    why4Title: "ผู้เชี่ยวชาญร่วมพัฒนา",
    why4Desc: "บทวิเคราะห์ทั้งหมดร่วมพัฒนาโดยนักพยากรณ์มืออาชีพที่คร่ำหวอดในวงการกว่า 15 ปี",

    widgetTitle: "ดัชนีดวงดาวประจำวันของคุณ",
    widgetSub: "คำนวณตำแหน่งลัคนาของคุุณผสมผสานพลังดวงดาวจรวันนี้แบบย่อกระชับ",
    widgetScoreLabel: "ดวงโดยรวมวันนี้",
    widgetLuckyNum: "เลขนำโชค",
    widgetLuckyColor: "สีมงคลประจำตัว",
    widgetLuckyTime: "ช่วงเวลาดีที่สุด",
    widgetLink: "[ ดูคำทำนายทั้งหมดแบบละเอียด ]",

    popularTitle: "บริการยอดนิยม",
    popularSub: "ศาสตร์ยอดฮิตที่มีผู้ใช้งานและวิเคราะห์เฉลี่ยต่อวันสูงสุด",

    servicesTitle: "บริการพยากรณ์ทั้งหมด",
    servicesSub: "เลือกใช้งานศาสตร์และเครื่องมือวิเคราะห์ชะตาชีวิตอัจฉริยะแบบฟรีไม่มีค่าใช้จ่าย",
    viewAll: "ดูทั้งหมด",

    bottomTitle: "พร้อมถอดรหัสและค้นพบแผนผังชะตาชีวิตของคุณหรือยัง?",
    bottomCta: "🔮 เริ่มถอดรหัสดวงชะตาฟรี",
    footerDesc: "พลิกชะตาฟ้าลิขิต ด้วยศาสตร์พยากรณ์ตัวเลขดาราศาสตร์และแผนผังธาตุจีนอัจฉริยะวิเคราะห์เฉพาะบุคคล",
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
    btnHeroCta: "🔮 Reveal My Destiny",
    btnHeroSample: "💬 Ask a Specialist",
    seekersCount: "Over 23,481+ seekers have checked their charts",
    bullet1: "✨ Analyze your 5-element strengths & colors",
    bullet2: "🃏 Access tarot roadmap for love & work",
    bullet3: "🍀 Access lucky numbers and codes",
    
    whyTitle: "Why Choose Likit Fah",
    whySub: "We blend ancient astrological wisdom with modern astronomical calculations.",
    why1Title: "Astrometric Precision",
    why1Desc: "Planetary coordinates mapped exactly to your geographical birth coordinates.",
    why2Title: "100% Secure & Private",
    why2Desc: "Your birth parameters and data are strictly handled in accordance with privacy laws.",
    why3Title: "Diverse Oracles",
    why3Desc: "Includes Chinese Bazi Elements, Tarot, Palmistry, and Numerology analysis.",
    why4Title: "Expert Verified",
    why4Desc: "All interpretive guidelines are co-developed with masters of astrology.",

    widgetTitle: "Your Daily Cosmic Alignment",
    widgetSub: "Quick transit values calculated based on your birth coordinates.",
    widgetScoreLabel: "Today's Luck Index",
    widgetLuckyNum: "Lucky Number",
    widgetLuckyColor: "Lucky Color",
    widgetLuckyTime: "Lucky Time",
    widgetLink: "[ View Detailed Predictions ]",

    popularTitle: "Popular Services",
    popularSub: "Our most requested and highly calculated astrology categories.",

    servicesTitle: "All Astrology Services",
    servicesSub: "Choose from our suite of professional calculators and interactive readings free of charge.",
    viewAll: "View All",

    bottomTitle: "Ready to Reveal Your Cosmic Blueprint?",
    bottomCta: "🔮 Begin Free Calculation",
    footerDesc: "Take charge of your life with advanced astronomical calculations and element balance.",
    footerCol1: "Free Oracles",
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

  // AI Recommendation Section Interactive State
  const [aiActiveTab, setAiActiveTab] = useState<"love" | "finance" | "fengshui">("love");
  
  // Popular Services Carousel Interactive State
  const [popularActiveFilter, setPopularActiveFilter] = useState<"all" | "love" | "money" | "cards">("all");

  // Live Interactive Widget state (calculated dynamically based on user input or defaults)
  const [widgetName, setWidgetName] = useState("");
  const [widgetDob, setWidgetDob] = useState("1995-06-23");
  const [widgetScore, setWidgetScore] = useState(78);
  const [widgetNum, setWidgetNum] = useState("3, 8");
  const [widgetColor, setWidgetColor] = useState("เขียวเหนี่ยวทรัพย์ (Green)");
  const [widgetTime, setWidgetTime] = useState("09:00 - 11:00 น. (Gold Hours)");

  // Form Wizard inputs
  const [fullName, setFullName] = useState("");
  const [dob, setDob] = useState("");
  const [tob, setTob] = useState("12:00");
  const [noBirthTime, setNoBirthTime] = useState(false);
  const [formError, setFormError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionProgress, setSubmissionProgress] = useState(0);
  const [completedAnimationSteps, setCompletedAnimationSteps] = useState<number[]>([]);

  // FAQ Accordion State
  const [faqOpenIndex, setFaqOpenIndex] = useState<number | null>(0);

  // Update Horoscope Widget values on input changes
  useEffect(() => {
    const seed = widgetDob.split("-").reduce((acc, val) => acc + parseInt(val || "0"), 0) + (widgetName ? widgetName.length * 5 : 45);
    const score = 70 + (seed % 28); // between 70% and 98%
    setWidgetScore(score);

    const numbers = [`3, 8`, `1, 9`, `2, 7`, `4, 6`, `5, 0`][seed % 5];
    setWidgetNum(numbers);

    const colors = [
      "เขียวเหนี่ยวทรัพย์ (Green)",
      "ทองคำส่องสว่าง (Gold)",
      "น้ำเงินมหาสมุทร (Navy Blue)",
      "เหลืองครีม (Yellow)",
      "ขาวบริสุทธิ์ (White)"
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
    }, 4500);
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
    { id: 1, title: "ดูดวงรายวัน (Daily Horoscope)", desc: "เช็คทิศทางโชคลาภรายธาตุและดัชนีดาวจรวันต่อวันฟรี", badge: "ยอดนิยม", rating: 5, category: "love", icon: <Sun className="w-5 h-5" /> },
    { id: 2, title: "ดูดวงรายเดือน (Monthly Horoscope)", desc: "ตรวจลัคนาราศีวิเคราะห์ลึก 12 ราศีพร้อมทรานสิตปี", badge: "แนะนำ", rating: 5, category: "love", icon: <Calendar className="w-5 h-5" /> },
    { id: 3, title: "ดูดวงความรัก (Love Horoscope)", desc: "เจาะลึกเกณฑ์เนื้อคู่ คนโสด คนมีคู่ และองศาดาวแห่งคู่ครอง", badge: "Hot", rating: 5, category: "love", icon: <Heart className="w-5 h-5" /> },
    { id: 4, title: "ปฏิทินจีนบาจื่อ (Bazi Chart)", desc: "ตรวจวิเคราะห์สัดส่วนกำลังสมดุล 5 ธาตุหลักประจำวันเกิด", badge: "AI Recommended", rating: 5, category: "money", icon: <Compass className="w-5 h-5" /> },
    { id: 5, title: "ทำนายไพ่ยิปซี (Tarot Readings)", desc: "เปิดไพ่พยากรณ์สากล 78 ใบคลายข้อสงสัยชีวิตเฉพาะด้าน", badge: "NEW", rating: 5, category: "cards", icon: <Sparkles className="w-5 h-5" /> },
    { id: 6, title: "ฮวงจุ้ยบ้าน & โต๊ะทำงาน (Feng Shui)", desc: "ปรับสมดุลทิศทางและตำแหน่งเพื่อส่งเสริมพลังบวกโชคลาภ", badge: "Premium", rating: 5, category: "money", icon: <ShieldCheck className="w-5 h-5" /> },
    { id: 7, title: "เลขนำโชคเบอร์โทรศัพท์ (Lucky Numbers)", desc: "วิเคราะห์ความหมายคู่ตัวเลขเบอร์โทรศัพท์มือถือที่ใช้หนุนชีวิต", badge: "NEW", rating: 4, category: "money", icon: <Phone className="w-5 h-5" /> },
    { id: 8, title: "ทำนายฝันพยากรณ์ (Dream Decode)", desc: "ถอดรหัสเหตุการณ์ในฝันเป็นคำเตือนภัยและเลขนำโชคประจำวัน", badge: "Popular", rating: 4, category: "all", icon: <BookOpen className="w-5 h-5" /> }
  ];

  // Filtered list for popular services carousel
  const filteredPopularServices = servicesList.filter(srv => {
    if (popularActiveFilter === "all") return true;
    return srv.category === popularActiveFilter;
  });

  const faqs = [
    { q: "การวิเคราะห์ของลิขิตฟ้ามีค่าใช้จ่ายหรือไม่?", a: "บริการพยากรณ์และรายงานวิเคราะห์เบื้องต้นทั้งหมดสามารถใช้งานได้ฟรี 100% โดยไม่มีข้อผูกมัดหรือการเรียกเก็บเงินใดๆ" },
    { q: "หากไม่รู้เวลาเกิดที่แน่นอน จะคำนวณชะตาได้หรือไม่?", a: "คำนวณได้ครับ โดยระบบจะใช้ค่ากึ่งกลางวันเฉลี่ยทำการประมวลผล อย่างไรก็ตามจุดคำนวณลัคนาราศีเกิดอาจมีสัดส่วนความแม่นยำลดลงเล็กน้อย" },
    { q: "ข้อมูลส่วนตัวของฉันจะถูกเก็บไว้ปลอดภัยหรือไม่?", a: "ปลอดภัยสูงสุดแน่นอน ข้อมูลวันเดือนปีเกิดจะถูกประมวลผลสด in หน้าบราวเซอร์เพื่อวาดชาร์ตคำนวณ และจะไม่มีการจัดเก็บหรือส่งข้อมูลไปเผยแพร่ใดๆ ทั้งสิ้น" },
    { q: "ศาสตร์ที่ระบบใช้คำนวณอ้างอิงจากหลักการใด?", a: "ระบบผสมผสานตำแหน่งพิกัดองศาดาวจริงทางดาราศาสตร์สากลเข้ากับวิชาพลัง 5 ธาตุและปฏิทินจีนบาจื่อดั้งเดิมเพื่อความครอบคลุมและแม่นยำที่สุด" }
  ];

  return (
    <div className="min-h-screen bg-[#070714] text-slate-100 flex flex-col font-sans selection:bg-amber-500 selection:text-black relative pb-16 md:pb-0 overflow-x-hidden">
      
      {/* Astrological Cosmic Nebula Background Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1440px] h-[800px] overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-100px] left-1/2 -translate-x-1/2 w-[850px] h-[550px] bg-gradient-to-b from-purple-500/15 via-indigo-500/5 to-transparent rounded-full blur-[140px]"></div>
        <div className="absolute top-[300px] right-[5%] w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[130px]"></div>
        <div className="absolute top-[450px] left-[-10%] w-[400px] h-[400px] bg-pink-500/5 rounded-full blur-[110px]"></div>
      </div>

      {/* 1. Header (Navbar) - Glassmorphism floating header */}
      <header className="sticky top-0 z-50 w-full bg-[#070714]/75 backdrop-blur-md border-b border-white/[0.06] py-4.5 px-6 md:px-12 flex justify-between items-center text-slate-200">
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
      <main className="flex-1 max-w-[1440px] mx-auto w-full px-6 md:px-12 py-8 md:py-12 relative z-10 flex flex-col gap-16 md:gap-20">

        {/* AdSense Top Ad Slot Placeholder */}
        <div className="w-full rounded-2xl border border-white/[0.08] bg-white/[0.02] p-2.5 flex flex-col items-center justify-center text-[9px] text-slate-650 uppercase tracking-widest min-h-[90px] relative overflow-hidden">
          <div className="absolute top-1 right-2 text-[7px] text-slate-750">AdSlot: Top Banner</div>
          <span>Google AdSense Advertisement</span>
          <div className="text-[7px] text-slate-500 font-mono mt-1">&lt;ins class="adsbygoogle" style="display:inline-block;width:728px;height:90px"&gt;&lt;/ins&gt;</div>
        </div>

        {/* 2. Hero Section - Purple Nebula space with 30% larger rotating zodiac wheel */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center bg-white/[0.02] border border-white/[0.06] rounded-[24px] p-8 md:p-14 relative overflow-hidden backdrop-blur-md min-h-[500px]">
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
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 block sm:inline mt-2.5">
                {currentTranslations.heroTitleHighlight}
              </span>
            </h1>
            
            <p className="text-xs md:text-sm text-slate-400 font-light leading-relaxed max-w-lg">
              {currentTranslations.heroSubtitle}
            </p>

            {/* Bullets */}
            <div className="flex flex-col gap-3.5 text-xs text-slate-350 font-semibold w-full">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4.5 h-4.5 text-amber-400 shrink-0" />
                <span>{currentTranslations.bullet1}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4.5 h-4.5 text-amber-400 shrink-0" />
                <span>{currentTranslations.bullet2}</span>
              </div>
              <div className="flex items-center gap-2.5">
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

          {/* Right spinning zodiac wheel (Enlarged by 20% to eat half of right side) */}
          <div className="lg:col-span-5 flex justify-center items-center relative z-10">
            <div className="relative w-64 h-64 md:w-96 md:h-96">
              {/* Outer glowing cosmos nebula glows */}
              <div className="absolute inset-[-25px] bg-purple-600/10 rounded-full blur-[100px] animate-pulse"></div>
              <div className="absolute inset-[-10px] bg-amber-550/5 rounded-full blur-[60px]"></div>
              
              {/* Spinning wheel */}
              <img 
                src="/zodiac_bg.png" 
                alt="Glowing Zodiac Calendar Wheel" 
                className="w-full h-full object-contain animate-spin-slow filter drop-shadow-[0_0_35px_rgba(233,196,106,0.22)]"
              />
              
              {/* Overlay elements for premium feel (particles/stars/crystals) */}
              <div className="absolute top-[10%] left-[10%] w-2.5 h-2.5 bg-amber-300 rounded-full blur-[1px] animate-ping duration-1000"></div>
              <div className="absolute bottom-[20%] right-[15%] w-2 h-2 bg-purple-400 rounded-full blur-[1px] animate-ping duration-[3000ms]"></div>
            </div>
          </div>
        </section>

        {/* 3. AI Section (ระหว่าง Hero กับ Services - AI แนะนำสำหรับคุณ) */}
        <section className="flex flex-col gap-6 text-left">
          <div className="flex flex-col gap-2">
            <span className="text-[9px] font-black uppercase tracking-widest text-amber-500 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
              <span>Personalized Cosmic Guidance</span>
            </span>
            <h2 className="text-xl md:text-2xl font-serif font-black text-white">AI แนะนำระบบดวงชะตาสำหรับคุณ</h2>
            <p className="text-slate-450 text-xs">เลือกหัวข้อที่คุณต้องการรับพลังและคำตอบเร่งด่วนในวันนี้</p>
          </div>

          {/* Interactive filter tabs */}
          <div className="flex gap-2.5 border-b border-white/[0.06] pb-3 overflow-x-auto">
            <button 
              onClick={() => setAiActiveTab("love")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                aiActiveTab === "love" 
                  ? "bg-pink-500/10 border border-pink-500/20 text-pink-400" 
                  : "bg-white/[0.02] border border-white/[0.06] text-slate-400 hover:text-white"
              }`}
            >
              ❤️ ความรัก & เนื้อคู่
            </button>
            <button 
              onClick={() => setAiActiveTab("finance")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                aiActiveTab === "finance" 
                  ? "bg-amber-500/10 border border-amber-500/20 text-amber-400" 
                  : "bg-white/[0.02] border border-white/[0.06] text-slate-400 hover:text-white"
              }`}
            >
              💰 การเงิน & การงาน
            </button>
            <button 
              onClick={() => setAiActiveTab("fengshui")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                aiActiveTab === "fengshui" 
                  ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-450" 
                  : "bg-white/[0.02] border border-white/[0.06] text-slate-400 hover:text-white"
              }`}
            >
              🏠 ฮวงจุ้ย & ทิศมงคล
            </button>
          </div>

          {/* Dynamic display block matching category */}
          <div className="bg-white/[0.03] border border-white/[0.08] rounded-3xl p-6.5 relative overflow-hidden flex flex-col md:flex-row items-center gap-6 justify-between shadow-lg">
            <div className="flex items-center gap-4 text-left">
              <div className="w-12 h-12 rounded-2xl bg-purple-550/15 border border-purple-550/25 flex items-center justify-center text-purple-400 shrink-0">
                {aiActiveTab === "love" && <Heart className="w-6 h-6 text-pink-400" />}
                {aiActiveTab === "finance" && <DollarSign className="w-6 h-6 text-amber-400" />}
                {aiActiveTab === "fengshui" && <Compass className="w-6 h-6 text-emerald-450" />}
              </div>
              <div className="space-y-1">
                <span className="text-[8px] font-bold text-purple-400 uppercase tracking-widest">คำทำนายอัจฉริยะ</span>
                <p className="text-[12.5px] font-bold text-slate-200">
                  {aiActiveTab === "love" && "สำหรับดวงความรักในสัปดาห์นี้ ดาวศุกร์ทำมุมมงคลกับลัคนา คนโสดมีเกณฑ์พบเจอผู้เกื้อหนุนจากต่างที่ต่างแดน"}
                  {aiActiveTab === "finance" && "การทำธุรกรรมหรือลงทุนในวันนี้จะมีกำลังธาตุเกิดเข้าอุ้มชู เหมาะแก่การขยับขยาย ปิดสัญญาร่วมมือ"}
                  {aiActiveTab === "fengshui" && "ทิศตะวันออกเฉียงเหนือเป็นตำแหน่งรับแสงทองคำประจำวัน ควรจัดโต๊ะทำงานให้ปลอดโปร่งเพื่อเรียกทรัพย์"}
                </p>
              </div>
            </div>
            <button 
              onClick={() => {
                setWizardOpen(true);
                setCurrentStep(1);
              }}
              className="px-5 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-extrabold text-[10.5px] whitespace-nowrap cursor-pointer transition-all flex items-center gap-1 shadow-md shadow-purple-500/10"
            >
              <span>ถอดรหัสชะตารายบุคคลฟรี</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </section>

        {/* 4. Simplified Today's Horoscope Widget */}
        <section className="flex flex-col gap-6 text-left">
          <div className="flex flex-col gap-1">
            <h2 className="text-lg md:text-xl font-serif font-black text-white">{currentTranslations.widgetTitle}</h2>
            <p className="text-slate-450 text-xs">{currentTranslations.widgetSub}</p>
          </div>

          <div className="bg-white/[0.03] border border-white/[0.08] rounded-3xl p-6.5 grid grid-cols-1 md:grid-cols-12 gap-6 items-center backdrop-blur-md shadow-xl">
            
            {/* Left: Summary today & Rating stars (5 columns) */}
            <div className="md:col-span-5 flex flex-col items-start gap-3 text-left md:border-r border-white/[0.08] md:pr-8">
              <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">ดวงชะตาโดยรวม</span>
              <div className="flex items-center gap-1 text-amber-450">
                <Star className="w-5.5 h-5.5 fill-amber-500 stroke-amber-500" />
                <Star className="w-5.5 h-5.5 fill-amber-500 stroke-amber-500" />
                <Star className="w-5.5 h-5.5 fill-amber-500 stroke-amber-500" />
                <Star className="w-5.5 h-5.5 fill-amber-500 stroke-amber-500" />
                <Star className="w-5.5 h-5.5 stroke-amber-500" />
                <span className="text-lg font-black text-white font-mono ml-2">78%</span>
              </div>
              <p className="text-[11px] text-slate-400 font-light leading-relaxed">
                พลังธาตุประจำตัวทำงานร่วมกับองศาดาววันนี้ได้อย่างสมดุลปานกลาง มีทิศทางไหลลื่นในเรื่องคำเจรจาเป็นบวก
              </p>
            </div>

            {/* Right: Colors, numbers, time & view link (7 columns) */}
            <div className="md:col-span-7 grid grid-cols-3 gap-4 text-left md:pl-4 justify-between items-center w-full">
              <div className="flex flex-col gap-1.5">
                <span className="text-[7.5px] font-bold text-slate-500 uppercase tracking-widest">{currentTranslations.widgetLuckyColor}</span>
                <span className="text-xs font-bold text-slate-200">เขียวเหนี่ยวทรัพย์</span>
              </div>
              <div className="flex flex-col gap-1.5">
                <span className="text-[7.5px] font-bold text-slate-500 uppercase tracking-widest">{currentTranslations.widgetLuckyNum}</span>
                <span className="text-xs font-black text-amber-400 font-mono">3, 8</span>
              </div>
              <div className="flex flex-col gap-1.5">
                <span className="text-[7.5px] font-bold text-slate-500 uppercase tracking-widest">{currentTranslations.widgetLuckyTime}</span>
                <span className="text-[10px] font-bold text-slate-300 font-mono">09:00 - 11:00</span>
              </div>
              
              {/* Bottom View All Link spans full grid bottom */}
              <div className="col-span-3 pt-3 border-t border-white/[0.04] text-center md:text-left">
                <button 
                  onClick={() => {
                    setWizardOpen(true);
                    setCurrentStep(1);
                  }}
                  className="text-[10.5px] text-amber-400 hover:text-amber-300 font-extrabold cursor-pointer transition-all hover:underline"
                >
                  {currentTranslations.widgetLink}
                </button>
              </div>
            </div>

          </div>
        </section>

        {/* 5. Why Choose Us Section (4 premium feature cards - Taller height, Learn more link) */}
        <section className="flex flex-col gap-8 text-left">
          <div className="flex flex-col gap-2 text-center md:text-left">
            <span className="text-[9px] font-black uppercase tracking-widest text-purple-400">Our Value Proposition</span>
            <h2 className="text-xl md:text-2xl font-serif font-black text-white">{currentTranslations.whyTitle}</h2>
            <p className="text-slate-450 text-xs">{currentTranslations.whySub}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1 */}
            <div className="bg-white/[0.03] border border-white/[0.08] p-6.5 rounded-3xl hover:border-purple-500/30 hover:translate-y-[-4px] transition-all duration-300 flex flex-col justify-between min-h-[220px] shadow-md group">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 group-hover:bg-purple-500/20 group-hover:text-purple-300 transition-colors">
                  <Compass className="w-6 h-6" />
                </div>
                <h3 className="text-xs font-serif font-black text-white">{currentTranslations.why1Title}</h3>
                <p className="text-[10.5px] text-slate-450 leading-relaxed font-light">{currentTranslations.why1Desc}</p>
              </div>
              <button onClick={() => setWizardOpen(true)} className="text-[9.5px] text-amber-500 hover:text-amber-400 font-black self-start mt-4 transition-colors">
                เรียนรู้เพิ่มเติม ➔
              </button>
            </div>
            {/* Card 2 */}
            <div className="bg-white/[0.03] border border-white/[0.08] p-6.5 rounded-3xl hover:border-purple-500/30 hover:translate-y-[-4px] transition-all duration-300 flex flex-col justify-between min-h-[220px] shadow-md group">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 group-hover:bg-purple-500/20 group-hover:text-purple-300 transition-colors">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-xs font-serif font-black text-white">{currentTranslations.why2Title}</h3>
                <p className="text-[10.5px] text-slate-450 leading-relaxed font-light">{currentTranslations.why2Desc}</p>
              </div>
              <button onClick={() => setWizardOpen(true)} className="text-[9.5px] text-amber-500 hover:text-amber-400 font-black self-start mt-4 transition-colors">
                เรียนรู้เพิ่มเติม ➔
              </button>
            </div>
            {/* Card 3 */}
            <div className="bg-white/[0.03] border border-white/[0.08] p-6.5 rounded-3xl hover:border-purple-500/30 hover:translate-y-[-4px] transition-all duration-300 flex flex-col justify-between min-h-[220px] shadow-md group">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 group-hover:bg-purple-500/20 group-hover:text-purple-300 transition-colors">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h3 className="text-xs font-serif font-black text-white">{currentTranslations.why3Title}</h3>
                <p className="text-[10.5px] text-slate-450 leading-relaxed font-light">{currentTranslations.why3Desc}</p>
              </div>
              <button onClick={() => setWizardOpen(true)} className="text-[9.5px] text-amber-500 hover:text-amber-400 font-black self-start mt-4 transition-colors">
                เรียนรู้เพิ่มเติม ➔
              </button>
            </div>
            {/* Card 4 */}
            <div className="bg-white/[0.03] border border-white/[0.08] p-6.5 rounded-3xl hover:border-purple-500/30 hover:translate-y-[-4px] transition-all duration-300 flex flex-col justify-between min-h-[220px] shadow-md group">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 group-hover:bg-purple-500/20 group-hover:text-purple-300 transition-colors">
                  <Award className="w-6 h-6" />
                </div>
                <h3 className="text-xs font-serif font-black text-white">{currentTranslations.why4Title}</h3>
                <p className="text-[10.5px] text-slate-450 leading-relaxed font-light">{currentTranslations.why4Desc}</p>
              </div>
              <button onClick={() => setWizardOpen(true)} className="text-[9.5px] text-amber-500 hover:text-amber-400 font-black self-start mt-4 transition-colors">
                เรียนรู้เพิ่มเติม ➔
              </button>
            </div>
          </div>
        </section>

        {/* 6. Popular Services Carousel Section */}
        <section className="flex flex-col gap-6 text-left">
          <div className="flex flex-col gap-2">
            <span className="text-[9px] font-black uppercase tracking-widest text-amber-500">Trending Astrology</span>
            <h2 className="text-xl md:text-2xl font-serif font-black text-white">{currentTranslations.popularTitle}</h2>
            <p className="text-slate-450 text-xs">{currentTranslations.popularSub}</p>
          </div>

          {/* Interactive filter tabs for Carousel */}
          <div className="flex gap-2 pb-2 overflow-x-auto">
            <button 
              onClick={() => setPopularActiveFilter("all")}
              className={`px-3.5 py-1.5 rounded-full text-[10px] font-extrabold transition-all cursor-pointer ${
                popularActiveFilter === "all" ? "bg-amber-500 text-black shadow-sm" : "bg-white/[0.03] border border-white/[0.06] text-slate-400 hover:text-white"
              }`}
            >
              🔥 ทั้งหมด (All)
            </button>
            <button 
              onClick={() => setPopularActiveFilter("love")}
              className={`px-3.5 py-1.5 rounded-full text-[10px] font-extrabold transition-all cursor-pointer ${
                popularActiveFilter === "love" ? "bg-amber-500 text-black shadow-sm" : "bg-white/[0.03] border border-white/[0.06] text-slate-400 hover:text-white"
              }`}
            >
              ❤️ ความรัก (Love)
            </button>
            <button 
              onClick={() => setPopularActiveFilter("money")}
              className={`px-3.5 py-1.5 rounded-full text-[10px] font-extrabold transition-all cursor-pointer ${
                popularActiveFilter === "money" ? "bg-amber-500 text-black shadow-sm" : "bg-white/[0.03] border border-white/[0.06] text-slate-400 hover:text-white"
              }`}
            >
              💰 การเงิน (Finance)
            </button>
            <button 
              onClick={() => setPopularActiveFilter("cards")}
              className={`px-3.5 py-1.5 rounded-full text-[10px] font-extrabold transition-all cursor-pointer ${
                popularActiveFilter === "cards" ? "bg-amber-500 text-black shadow-sm" : "bg-white/[0.03] border border-white/[0.06] text-slate-400 hover:text-white"
              }`}
            >
              🎴 ไพ่ยิปซี (Cards)
            </button>
          </div>

          {/* Carousel container (swipeable grid layout) */}
          <div className="flex gap-6 overflow-x-auto pb-4 pt-1 snap-x scrollbar-thin">
            {filteredPopularServices.map(srv => (
              <div 
                key={srv.id}
                onClick={() => setWizardOpen(true)}
                className="min-w-[260px] md:min-w-[280px] bg-white/[0.03] border border-white/[0.08] p-5 rounded-2xl flex flex-col justify-between min-h-[200px] snap-start hover:border-purple-500/20 hover:translate-y-[-2px] transition-all cursor-pointer relative group"
              >
                <div>
                  <div className="flex justify-between items-start gap-4">
                    <div className="w-9 h-9 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                      {srv.icon}
                    </div>
                    {srv.badge && (
                      <span className="text-[7px] font-bold bg-amber-500/10 border border-amber-500/20 text-amber-400 px-2 py-0.5 rounded-full uppercase tracking-wider">
                        {srv.badge}
                      </span>
                    )}
                  </div>
                  <h4 className="text-xs font-serif font-black text-white mt-4.5 mb-1.5">{srv.title}</h4>
                  <p className="text-[10px] text-slate-450 leading-relaxed font-light">{srv.desc}</p>
                </div>
                
                <div className="flex justify-between items-center pt-3 border-t border-white/[0.04] mt-4 text-[9.5px] font-bold">
                  <span className="text-emerald-400 bg-emerald-500/5 px-2 py-0.5 rounded border border-emerald-500/10">เริ่มต้น ฟรี</span>
                  <span className="text-slate-400 group-hover:text-white transition-colors">วิเคราะห์ดวงเลย →</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 7. Services Grid Section (บริการพยากรณ์ทั้งหมด - Redesigned with badges, ratings, and free labels) */}
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
                className="bg-white/[0.03] border border-white/[0.08] p-5.5 rounded-3xl hover:border-purple-550/30 hover:translate-y-[-4px] transition-all duration-300 flex flex-col justify-between min-h-[240px] cursor-pointer relative group overflow-hidden shadow-md"
              >
                {/* Glow circle overlay inside cards */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/0 group-hover:bg-purple-500/[0.02] rounded-full blur-2xl transition-all duration-300"></div>

                <div>
                  <div className="flex justify-between items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-purple-550/10 border border-purple-550/20 flex items-center justify-center text-purple-400 shadow-[0_0_15px_rgba(139,92,246,0.15)] group-hover:shadow-[0_0_20px_rgba(139,92,246,0.25)] transition-all shrink-0">
                      {srv.icon}
                    </div>
                    
                    {/* Badge */}
                    <span className="text-[7.5px] font-bold bg-amber-500/10 border border-amber-500/20 text-amber-400 px-2 py-0.5 rounded-full uppercase tracking-wider">
                      {srv.badge || "Free"}
                    </span>
                  </div>

                  <h3 className="text-xs font-serif font-black text-white mt-4 mb-1">{srv.title}</h3>
                  
                  {/* Star Rating */}
                  <div className="flex items-center gap-0.5 text-amber-450 mb-2">
                    {[...Array(srv.rating)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-amber-500 stroke-amber-500" />
                    ))}
                    {[...Array(5 - srv.rating)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 stroke-amber-500" />
                    ))}
                  </div>

                  <p className="text-[10px] text-slate-455 leading-relaxed font-light">{srv.desc}</p>
                </div>

                <div className="flex justify-between items-center pt-3.5 border-t border-white/[0.04] mt-4 text-[10px] font-bold">
                  <div className="flex flex-col">
                    <span className="text-[7.5px] text-slate-500 uppercase">ราคาสำหรับสมาชิก</span>
                    <span className="text-emerald-450 text-[11px]">เริ่มต้น ฟรี</span>
                  </div>
                  <span className="text-slate-400 group-hover:text-white flex items-center gap-1 transition-colors bg-white/[0.04] px-2.5 py-1 rounded-lg border border-white/[0.06]">
                    ทำนายฟรี →
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 8. Apple-style Recommended Banner (Crystal recommended banner, eating full width) */}
        <section className="flex flex-col gap-4 text-left">
          <div className="bg-gradient-to-r from-purple-950/30 via-[#0a051d]/60 to-purple-950/30 rounded-3xl border border-white/[0.08] overflow-hidden flex flex-col lg:flex-row gap-8 p-8 md:p-10 items-center relative shadow-2xl">
            {/* Background gold glow */}
            <div className="absolute top-0 right-0 w-96 h-full bg-amber-500/[0.03] rounded-full blur-[100px] pointer-events-none"></div>

            {/* Left banner image (Apple style landscape) */}
            <div className="w-full lg:w-2/5 aspect-[1.8/1] rounded-2xl overflow-hidden relative border border-white/[0.08] shrink-0">
              <img 
                src="/tarot_banner.png" 
                alt="Tarot recommended banner illustration" 
                className="w-full h-full object-cover filter brightness-[0.85] contrast-[1.05]"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0b061e]/40"></div>
            </div>

            {/* Right details */}
            <div className="flex-1 flex flex-col justify-between items-start gap-6 w-full text-left">
              <div className="space-y-2">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded bg-amber-500/10 border border-amber-500/20 text-amber-400 text-[8.5px] font-bold uppercase tracking-wider">
                  <Star className="w-2.5 h-2.5 fill-amber-400 stroke-amber-400 animate-pulse" />
                  <span>แนะนำพิเศษวันนี้</span>
                </span>
                
                <h3 className="text-xl md:text-2xl font-serif font-black text-white">เปิดไพ่พลังจักรวาลผ่านดวงจิต</h3>
                <p className="text-xs text-slate-400 leading-relaxed font-light">
                  เปิดทำนายไพ่ยิปซีพลังจักรวาล 3 ใบ ถอดรหัสคำชี้แนะที่เป็นประโยชน์ที่สุดสำหรับการตัดสินใจด้านการงาน การเงิน และอุปสรรคสำคัญที่จะก้าวเข้ามา ให้คุณดำเนินชีวิตได้อย่างสง่างาม มั่นใจ และปลอดภัย
                </p>
                <div className="flex items-center gap-2 pt-1.5">
                  <span className="text-emerald-450 bg-emerald-500/10 border border-emerald-500/20 text-[9.5px] font-black px-2.5 py-0.5 rounded">
                    วิเคราะห์ฟรี 100% ไม่มีโฆษณาแทรกระหว่างการอ่าน
                  </span>
                </div>
              </div>
              
              <button 
                onClick={() => setWizardOpen(true)}
                className="w-full sm:w-auto px-8 py-4.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-450 hover:from-amber-400 hover:to-yellow-350 text-black font-extrabold text-[10.5px] shadow-lg transition-all hover:scale-[1.01] cursor-pointer flex justify-center items-center gap-2"
              >
                <span>🔮 เปิดไพ่พยากรณ์ชะตาชีวิตฟรี</span>
                <ArrowRight className="w-4 h-4 text-black" />
              </button>
            </div>
          </div>
        </section>

        {/* 9. Trust & Statistics Section */}
        <section className="bg-white/[0.02] border border-white/[0.06] rounded-[24px] p-8 md:p-10 text-center relative overflow-hidden backdrop-blur-md">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex flex-col items-center gap-1.5">
              <span className="text-3xl md:text-4xl font-mono font-black text-amber-400 tracking-tight">100,000+</span>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">ผู้ใช้งานในระบบ</span>
            </div>
            <div className="flex flex-col items-center gap-1.5">
              <span className="text-3xl md:text-4xl font-mono font-black text-amber-400 tracking-tight">1,000,000+</span>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">คำทำนายที่เสร็จสิ้น</span>
            </div>
            <div className="flex flex-col items-center gap-1.5">
              <span className="text-3xl md:text-4xl font-mono font-black text-amber-400 tracking-tight">4.9 ★</span>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">คะแนนรีวิวจากผู้ใช้</span>
            </div>
            <div className="flex flex-col items-center gap-1.5">
              <span className="text-3xl md:text-4xl font-mono font-black text-amber-400 tracking-tight">10+ ปี</span>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">ประสบการณ์ผู้พัฒนาร่วม</span>
            </div>
          </div>
        </section>

        {/* 10. Articles Section (Enhanced with metadata) */}
        <section className="flex flex-col gap-6 text-left">
          <div className="flex justify-between items-center px-1">
            <h2 className="text-lg md:text-xl font-serif font-black text-white">บทความ & คู่มือ</h2>
            <a href="dreams.html" className="text-xs text-purple-400 hover:text-purple-300 font-bold">{currentTranslations.viewAll} &gt;</a>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Article 1 */}
            <a href="chinese-calendar.html" className="bg-white/[0.02] border border-white/[0.06] rounded-2xl overflow-hidden flex flex-col justify-between hover:border-purple-500/20 hover:translate-y-[-4px] transition-all shadow-md group">
              <div className="aspect-[1.5/1] overflow-hidden w-full relative">
                <img src="/zodiac_bg.png" alt="12 Zodiac Forecast Article" className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500" />
              </div>
              <div className="p-4 text-left space-y-1.5">
                <div className="flex justify-between items-center text-[7.5px] font-bold text-purple-400 uppercase tracking-wider">
                  <span>โหราศาสตร์จีน</span>
                  <span className="text-slate-500">อ่าน 5 นาที</span>
                </div>
                <h4 className="text-[10px] font-bold text-white leading-relaxed line-clamp-2">เช็คดวงรายเดือนทั้ง 12 ราศีดวงดาวทรานสิทปี</h4>
                <div className="flex justify-between items-center text-[7px] text-slate-550 pt-2 font-mono">
                  <span>ผู้เขียน: พรหมลิขิต</span>
                  <span>10,481 วิว</span>
                </div>
              </div>
            </a>

            {/* Article 2 */}
            <a href="dreams.html" className="bg-white/[0.02] border border-white/[0.06] rounded-2xl overflow-hidden flex flex-col justify-between hover:border-purple-500/20 hover:translate-y-[-4px] transition-all shadow-md group">
              <div className="aspect-[1.5/1] overflow-hidden w-full relative">
                <img src="/art_coins.png" alt="Wealth & Prosperity Article" className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500" />
              </div>
              <div className="p-4 text-left space-y-1.5">
                <div className="flex justify-between items-center text-[7.5px] font-bold text-purple-400 uppercase tracking-wider">
                  <span>เสริมดวงการเงิน</span>
                  <span className="text-slate-500">อ่าน 4 นาที</span>
                </div>
                <h4 className="text-[10px] font-bold text-white leading-relaxed line-clamp-2">5 วิธีเสริมดวงการเงินให้มีกินใช้ตลอดปี 2567</h4>
                <div className="flex justify-between items-center text-[7px] text-slate-550 pt-2 font-mono">
                  <span>ผู้เขียน: ซินแสอู๋</span>
                  <span>8,391 วิว</span>
                </div>
              </div>
            </a>

            {/* Article 3 */}
            <a href="tarot.html" className="bg-white/[0.02] border border-white/[0.06] rounded-2xl overflow-hidden flex flex-col justify-between hover:border-purple-500/20 hover:translate-y-[-4px] transition-all shadow-md group">
              <div className="aspect-[1.5/1] overflow-hidden w-full relative">
                <img src="/art_love.png" alt="Relationship Forecast Article" className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500" />
              </div>
              <div className="p-4 text-left space-y-1.5">
                <div className="flex justify-between items-center text-[7.5px] font-bold text-purple-400 uppercase tracking-wider">
                  <span>ความสัมพันธ์</span>
                  <span className="text-slate-500">อ่าน 6 นาที</span>
                </div>
                <h4 className="text-[10px] font-bold text-white leading-relaxed line-clamp-2">ดูดวงความรัก คนโสดพบลัคนา คนมีคู่เสริมพลังบวก</h4>
                <div className="flex justify-between items-center text-[7px] text-slate-550 pt-2 font-mono">
                  <span>ผู้เขียน: เมลทาโรต์</span>
                  <span>12,042 วิว</span>
                </div>
              </div>
            </a>

            {/* Article 4 */}
            <a href="dreams.html" className="bg-white/[0.02] border border-white/[0.06] rounded-2xl overflow-hidden flex flex-col justify-between hover:border-purple-500/20 hover:translate-y-[-4px] transition-all shadow-md group">
              <div className="aspect-[1.5/1] overflow-hidden w-full relative">
                <img src="/art_bedroom.png" alt="Bedroom Feng Shui Article" className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500" />
              </div>
              <div className="p-4 text-left space-y-1.5">
                <div className="flex justify-between items-center text-[7.5px] font-bold text-purple-400 uppercase tracking-wider">
                  <span>ฮวงจุ้ยที่พัก</span>
                  <span className="text-slate-500">อ่าน 5 นาที</span>
                </div>
                <h4 className="text-[10px] font-bold text-white leading-relaxed line-clamp-2">ฮวงจุ้ยห้องนอน ปลดล็อกพลังธาตุนอนรับโชค</h4>
                <div className="flex justify-between items-center text-[7px] text-slate-550 pt-2 font-mono">
                  <span>ผู้เขียน: ซินแสอู๋</span>
                  <span>9,881 วิว</span>
                </div>
              </div>
            </a>

          </div>
        </section>

        {/* 11. FAQ accordion section (Before footer - helpful for SEO) */}
        <section className="flex flex-col gap-6 text-left max-w-4xl mx-auto w-full">
          <div className="text-center md:text-left space-y-1">
            <span className="text-[9px] font-black uppercase tracking-widest text-amber-500">Frequently Asked Questions</span>
            <h2 className="text-lg md:text-xl font-serif font-black text-white">คำถามที่พบบ่อย (FAQ)</h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = faqOpenIndex === idx;
              return (
                <div 
                  key={idx} 
                  className="bg-white/[0.02] border border-white/[0.06] rounded-2xl overflow-hidden transition-all"
                >
                  <button 
                    onClick={() => setFaqOpenIndex(isOpen ? null : idx)}
                    className="w-full p-5.5 flex justify-between items-center text-left font-bold text-xs text-white hover:text-amber-400 transition-colors cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? "transform rotate-180" : ""}`} />
                  </button>
                  {isOpen && (
                    <div className="px-5.5 pb-5.5 text-[10.5px] text-slate-400 leading-relaxed font-light border-t border-white/[0.04] pt-4.5">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* AdSense Lower Ad Slot Placeholder */}
        <div className="w-full rounded-2xl border border-white/[0.08] bg-white/[0.02] p-2.5 flex flex-col items-center justify-center text-[9px] text-slate-650 uppercase tracking-widest min-h-[90px] relative overflow-hidden my-1">
          <div className="absolute top-1 right-2 text-[7px] text-slate-750">AdSlot: Bottom Banner</div>
          <span>Google AdSense Advertisement</span>
          <div className="text-[7px] text-slate-500 font-mono mt-1">&lt;ins class="adsbygoogle" style="display:inline-block;width:728px;height:90px"&gt;&lt;/ins&gt;</div>
        </div>

        {/* 12. Membership Section (Redesigned with gold gradient button, larger CTA, premium typography) */}
        <section className="bg-gradient-to-r from-purple-950/20 via-[#120a2e]/60 to-purple-950/20 border border-purple-500/15 rounded-[24px] p-8 md:p-12 flex flex-col md:flex-row justify-between items-center gap-8 relative overflow-hidden shadow-2xl text-left">
          {/* Glowing stardust overlay decoration */}
          <div className="absolute top-0 right-0 w-64 h-full pointer-events-none opacity-[0.08] select-none">
            <img src="/tarot_banner.png" alt="Tarot card promo overlay decoration" className="w-full h-full object-cover" />
          </div>

          <div className="space-y-4 z-10">
            <span className="text-[8.5px] font-black uppercase tracking-wider text-amber-500">สิทธิประโยชน์สมาชิก</span>
            <h2 className="text-xl md:text-2xl font-serif font-black text-white">สมัครสมาชิกเปิดชะตาชีวิตวันนี้</h2>
            
            <div className="flex flex-col gap-2 text-[10px] text-slate-350 font-medium">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 animate-pulse" />
                <span>ดูดวงรายวันและตรวจสมดุล 5 ธาตุไม่จำกัดจำนวนครั้งฟรี</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 animate-pulse" />
                <span>รับสรุปรายงานการคำนวณตำแหน่งดวงดาวแบบละเอียด PDF ส่งตรงเข้าเมล</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 animate-pulse" />
                <span>สิทธิ์การขอคำแนะนำแบบเจาะลึกฟรีโดยระบบปัญญาประดิษฐ์ AI</span>
              </div>
            </div>
          </div>

          <button 
            onClick={() => setWizardOpen(true)}
            className="px-8 py-5 rounded-full bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-550 text-black font-black text-xs shadow-lg hover:scale-[1.03] hover:shadow-[0_4px_30px_rgba(233,196,106,0.4)] transition-all flex items-center gap-1.5 cursor-pointer z-10 shrink-0"
          >
            <span>สมัครสมาชิกฟรี ✛</span>
          </button>
        </section>

      </main>

      {/* 13. Expanded Footer Section (Company, Services, Horoscope, Legal, Support, Contact, Download App) */}
      <footer className="w-full bg-[#020208] border-t border-white/[0.04] py-16 px-6 md:px-12 mt-16 relative z-10 text-slate-500 text-xs text-left">
        <div className="max-w-[1440px] mx-auto grid grid-cols-2 md:grid-cols-5 gap-8">
          
          {/* Logo & description (Takes 2 cols on desktop) */}
          <div className="col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-7.5 h-7.5 rounded-full bg-gradient-to-b from-amber-400 to-amber-600 flex items-center justify-center border border-amber-500/30">
                <Moon className="w-4 h-4 text-slate-950 font-bold" />
              </div>
              <div>
                <span className="font-serif font-black text-sm tracking-wider text-white">{currentTranslations.brand}</span>
                <p className="text-[6px] text-slate-500 uppercase tracking-widest font-bold">{currentTranslations.subtitle}</p>
              </div>
            </div>
            <p className="leading-relaxed text-[11px] font-light max-w-sm">{currentTranslations.footerDesc}</p>
            <div className="flex gap-4 pt-1 text-base">
              <a href="#" className="hover:text-amber-400 transition-colors" aria-label="Facebook"><Share2 className="w-4.5 h-4.5" /></a>
              <a href="#" className="hover:text-amber-400 transition-colors" aria-label="Line"><Mail className="w-4.5 h-4.5" /></a>
              <a href="#" className="hover:text-amber-400 transition-colors" aria-label="Website"><Globe className="w-4.5 h-4.5" /></a>
            </div>
          </div>

          {/* Col 2 - Company & Sitemap */}
          <div className="space-y-3">
            <h5 className="font-serif font-black text-white text-xs uppercase tracking-wider">Company</h5>
            <ul className="space-y-2 font-light">
              <li><a href="about.html" className="hover:text-amber-400 transition-colors">เกี่ยวกับเรา</a></li>
              <li><a href="team.html" className="hover:text-amber-400 transition-colors">ทีมนักพยากรณ์</a></li>
              <li><a href="careers.html" className="hover:text-amber-400 transition-colors">ร่วมงานกับเรา</a></li>
              <li><a href="press.html" className="hover:text-amber-400 transition-colors">ข่าวประชาสัมพันธ์</a></li>
            </ul>
          </div>

          {/* Col 3 - Services Sitemap */}
          <div className="space-y-3">
            <h5 className="font-serif font-black text-white text-xs uppercase tracking-wider">Horoscope & Services</h5>
            <ul className="space-y-2 font-light">
              <li><a href="chinese-calendar.html" className="hover:text-amber-400 transition-colors">ปฏิทินจีนบาจื่อ</a></li>
              <li><a href="tarot.html" className="hover:text-amber-400 transition-colors">ทำนายไพ่ยิปซี</a></li>
              <li><a href="siemsi.html" className="hover:text-amber-400 transition-colors">เสี่ยงเซียมซีนำทาง</a></li>
              <li><a href="dreams.html" className="hover:text-amber-400 transition-colors">ทำนายฝันพยากรณ์</a></li>
            </ul>
          </div>

          {/* Col 4 - Legal & Support */}
          <div className="space-y-3">
            <h5 className="font-serif font-black text-white text-xs uppercase tracking-wider">Legal & Support</h5>
            <ul className="space-y-2 font-light">
              <li><a href="policy.html" className="hover:text-amber-400 transition-colors">นโยบายความเป็นส่วนตัว</a></li>
              <li><a href="terms.html" className="hover:text-amber-400 transition-colors">ข้อตกลงและเงื่อนไข</a></li>
              <li><a href="disclaimer.html" className="hover:text-amber-400 transition-colors">ข้อปฏิเสธความรับผิดชอบ</a></li>
              <li><a href="help.html" className="hover:text-amber-400 transition-colors">ศูนย์ช่วยเหลือ (Help)</a></li>
            </ul>
          </div>

        </div>

        {/* Footer bottom bar */}
        <div className="max-w-[1440px] mx-auto border-t border-white/[0.04] mt-12 pt-6 text-center text-[10px] text-slate-650 font-medium flex flex-col sm:flex-row justify-between items-center gap-4">
          <p>&copy; 2026 LikitFah.com • ศาลาพยากรณ์ ออลไรท์สงวนลิขสิทธิ์.</p>
          <div className="flex gap-4">
            <a href="policy.html" className="hover:text-white transition-colors">Privacy Policy</a>
            <span>•</span>
            <a href="terms.html" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </footer>

      {/* 14. Sticky Mobile Bottom Navigation Bar */}
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
                            <CheckCircle2 className="w-4 h-4 text-amber-555" />
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
