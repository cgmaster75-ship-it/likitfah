"use client";

import React, { useState, useEffect } from "react";
import { 
  Sparkles, 
  Moon, 
  Sun, 
  Compass, 
  Users, 
  CheckCircle2, 
  ChevronLeft, 
  ChevronRight, 
  Eye, 
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
  Zap,
  BookOpen
} from "lucide-react";

const t = {
  th: {
    brand: "ลิขิตฟ้า",
    subtitle: "ASTRONOMICAL ASTROLOGY",
    navTarot: "ทำนายไพ่ยิปซี",
    navCalendar: "ปฏิทินจีนบาจื่อ",
    navDashboard: "แดชบอร์ดดวงชะตา",
    navGetStarted: "🔮 เริ่มวิเคราะห์ฟรี",
    
    heroTitle: "ชีวิตคุณกำลังเดินมาถูกทางหรือไม่?",
    heroSubtitle: "วิเคราะห์จุดแข็ง-จุดอ่อน และระดับกำลังธาตุเกิดเฉพาะบุคคลด้วยสถิติดาราศาสตร์ประยุกต์และเวลาเกิดที่แท้จริงของคุณ",
    bullet1: "⏱️ ใช้เวลาเพียง 3 นาที",
    bullet2: "📊 ครอบคลุมกว่า 50 หัวข้อชีวิต",
    bullet3: "📄 รายงานวิเคราะห์ความยาวกว่า 30 หน้า",
    btnHeroCta: "🔮 เริ่มวิเคราะห์ดวงชะตาฟรี",
    btnHeroSample: "ดูตัวอย่างรายงาน",
    seekersCount: "มีผู้ตรวจสอบดวงชะตาแล้วกว่า 23,481+ คน",
    
    calculatorTitle: "เครื่องมือวิเคราะห์ชะตาชีวิตเรียลไทม์",
    liveCalculating: "กำลังคำนวณตำแหน่งพิกัดดาว...",
    
    servicesTitle: "ศาสตร์พยากรณ์และวิเคราะห์ครบวงจร",
    servicesSub: "เลือกใช้งานเครื่องมือวิเคราะห์ต่างๆ ของลิขิตฟ้าได้ฟรีโดยไม่มีค่าใช้จ่าย",
    srvBazi: "ปฏิทินจีนบาจื่อ",
    srvBaziDesc: "ตรวจสมดุล 5 ธาตุและเสาชะตากำเนิดเพื่อปรับดวงการงาน",
    srvTarot: "ทำนายไพ่ยิปซี",
    srvTarotDesc: "เปิดไพ่พยากรณ์คำถามเฉพาะเจาะจงและแนวทางสัปดาห์",
    srvSiemsi: "เซียมซีนำทาง",
    srvSiemsiDesc: "เสี่ยงทายใบคำทำนายจากวัดดังเพื่อชี้ทางออกชีวิต",
    srvDreams: "ทำนายฝันพยากรณ์",
    srvDreamsDesc: "ตีความความฝันเป็นเลขมงคลและคำเตือนภัยล่วงหน้า",
    
    featuresTitle: "สิ่งที่จะได้รับการประมวลผล",
    featuresSub: "รายงานดวงชะตาระดับพรีเมียมที่ถูกจัดทำขึ้นหลังส่งข้อมูลเวลาตกฟาก",
    feat1: "สมดุลธาตุเกิด (Bazi Balance)",
    feat1Desc: "วิเคราะห์อัตราส่วน ไม้ ไฟ ดิน ทอง น้ำ เพื่อหาจุดเด่นที่ส่งเสริมดวงชะตาคุณ",
    feat2: "จุดแข็ง & จุดเปราะบาง",
    feat2Desc: "ประมวลผลข้อดีที่จะนำความสำเร็จ และจุดทรานสิทเสี่ยงดวงตกที่ต้องระวัง",
    feat3: "แนวทางการงานที่รุ่งเรือง",
    feat3Desc: "ชี้ช่องทางสายอาชีพและอุตสาหกรรมที่ถูกโฉลกกับพลังธาตุมากที่สุด",
    feat4: "พื้นฐานความรักและเนื้อคู่",
    feat4Desc: "ลักษณะนิสัยของคู่ครองและแนวโน้มความสัมพันธ์ตามเกณฑ์ชะตา",

    previewTitle: "ตัวอย่างหน้าแดชบอร์ดผลลัพธ์",
    previewSub: "ชาร์ตรายละเอียดข้อมูลที่จะแสดงผลทันทีหลังการถอดรหัสลัคนา",
    tabBazi: "สมดุล 5 ธาตุหลัก",
    tabTarot: "ไพ่ทาโรต์นำชีวิต",
    tabGraph: "กราฟชีวิต 100 ปี",
    previewLockDesc: "กรอกข้อมูลในขั้นตอนเพื่อปลดล็อกกราฟทิศทางชะตารายทศวรรษ",
    btnUnlock: "🔮 ปลดล็อกดวงชะตาของฉันฟรี",

    testimonialsTitle: "ความรู้สึกจากผู้ใช้งานจริง",
    testimonialsSub: "เสียงสะท้อนจากผู้ที่ได้รับแผนผังวิเคราะห์ลิขิตฟ้า",
    rev1: "วิเคราะห์สายงานตรงกับชีวิตจริงมากเลยครับ ช่วยให้เห็นสัดส่วนกำลังธาตุเพื่อวางแผนปีนี้ได้ดีจริงๆ",
    rev1User: "กานดา พรหมรักษา",
    rev1Role: "นักการตลาดดิจิทัล • กรุงเทพฯ",
    rev2: "ชอบการดีไซน์ชาร์ตที่สะอาดตาและอ่านง่ายมากครับ ทำให้วิชาโหราศาสตร์จีนที่เข้าใจยากกลายเป็นเรื่องง่ายทันที",
    rev2User: "สมชาย ตั้งวิทยา",
    rev2Role: "ผู้ประกอบการธุรกิจ • เชียงใหม่",
    rev3: "กราฟ 100 ปีช่วยเตือนอุปสรรคชีวิตช่วงวัยได้แม่นยำมากค่ะ สีสันสวยงามสมราคาพรีเมียม แนะนำค่ะ",
    rev3User: "นลินี เลิศวิจิตร",
    rev3Role: "นักออกแบบกราฟิก • ภูเก็ต",
    
    faqTitle: "คำถามที่พบบ่อย (FAQ)",
    faqSub: "คลายข้อสงสัยเกี่ยวกับการวิเคราะห์พิกัดดาวดาราศาสตร์",
    q1: "การวิเคราะห์ของลิขิตฟ้ามีค่าใช้จ่ายหรือไม่?",
    a1: "บริการพยากรณ์และรายงานวิเคราะห์เบื้องต้นทั้งหมดสามารถใช้งานได้ฟรี 100% โดยสนับสนุนผ่านโฆษณา AdSense เพื่อให้ผู้พัฒนายังคงดูแลระบบต่อไปได้",
    q2: "หากไม่รู้เวลาเกิดที่แน่นอน จะคำนวณชะตาได้หรือไม่?",
    a2: "คำนวณได้ครับ โดยระบบจะใช้ค่ากึ่งกลางวันเฉลี่ยทำการประมวลผล อย่างไรก็ตามจุดคำนวณลัคนาราศีเกิดอาจมีสัดส่วนความแม่นยำลดลงเล็กน้อย",
    q3: "ข้อมูลส่วนตัวของฉันจะถูกเก็บไว้ปลอดภัยหรือไม่?",
    a3: "ปลอดภัยสูงสุดแน่นอน ข้อมูลวันเดือนปีเกิดจะถูกประมวลผลสดในหน้าบราวเซอร์เพื่อวาดชาร์ตคำนวณ และจะไม่มีการจัดเก็บหรือส่งข้อมูลไปเผยแพร่ใดๆ ทั้งสิ้น",
    q4: "ศาสตร์ที่ระบบใช้คำนวณอ้างอิงจากหลักการใด?",
    a4: "ระบบผสมผสานตำแหน่งพิกัดองศาดาวจริงทางดาราศาสตร์สากลเข้ากับวิชาพลัง 5 ธาตุและปฏิทินจีนบาจื่อดั้งเดิมเพื่อความครอบคลุมและแม่นยำที่สุด",
    q5: "ทำไมผลการคำนวณถึงให้ความสำคัญกับเวลาตกฟากมาก?",
    a5: "เพราะเวลาตกฟาก (นาทีเกิด) เป็นจุดตัดสินตำแหน่งลัคนาและองศาดาวที่ขยับตัวตลอดเวลา การระบุชั่วโมงเกิดจึงช่วยเจาะลึกพลังดวงชะตาได้ดีที่สุด",
    q6: "กราฟชีวิต 100 ปีวิเคราะห์แนวโน้มชะตาจากจุดใด?",
    a6: "คำนวณจากปฏิสัมพันธ์ระหว่างวัยจรทศวรรษ (วัยจร 10 ปี) ของจีนเข้ากับตาราศีดาวกำเนิดเพื่อวาดเส้นแนวโน้มจุดขึ้นลงของชะตาแต่ละช่วงวัย",
    q7: "ระบบใช้เทคโนโลยีใดในการเขียนคำพยากรณ์อัจฉริยะ?",
    a7: "เราใช้ระบบประมวลผล AI ช่วยวิเคราะห์องศาดาราศาสตร์ที่ซับซ้อนให้กลายเป็นประโยคคำพยากรณ์ที่กระชับ สวยงาม และเข้าถึงง่าย",
    q8: "โฆษณาในหน้าเว็บรบกวนการใช้งานหรือไม่?",
    a8: "โฆษณาจะถูกจัดสรรในพื้นที่ที่เหมาะสม ไม่บังการกดหรืออ่านข้อมูล เพื่อความปลอดภัยและความลื่นไหลในการใช้งานบนมือถือสูงสุด",

    bottomTitle: "พร้อมค้นพบแผนผังชะตาชีวิตของคุณหรือยัง?",
    bottomCta: "🔮 เริ่มถอดรหัสดวงชะตาของคุณ",
    footerDesc: "พลิกชะตาฟ้าลิขิต ด้วยศาสตร์พยากรณ์ตัวเลขดาราศาสตร์และแผนผังธาตุจีนอัจฉริยะ",
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
    unknownTime: "ฉันไม่ทราบเวลาเกิดของฉัน",
    emptyChart: "ระบุข้อมูลตกฟากเพื่อวาดแผนภูมิชะตาชีวิต"
  },
  en: {
    brand: "Likit Fah",
    subtitle: "ASTRONOMICAL ASTROLOGY",
    navTarot: "Tarot Readings",
    navCalendar: "Bazi Calendar",
    navDashboard: "Report Dashboard",
    navGetStarted: "🔮 Free Reading",
    
    heroTitle: "Is Your Life Heading in the Right Direction?",
    heroSubtitle: "Discover your cosmic blueprint and five elements balance computed from precise astronomical calculations.",
    bullet1: "⏱️ Analyze elements balance in 3 mins",
    bullet2: "📊 Over 50 life parameters parsed",
    bullet3: "📄 Detailed report length over 30 pages",
    btnHeroCta: "🔮 Begin Free Analysis",
    btnHeroSample: "View Sample Report",
    seekersCount: "Over 23,481+ seekers have checked their charts",
    
    calculatorTitle: "Live Destiny Calculation Machine",
    liveCalculating: "Recalculating planetary positions...",
    
    servicesTitle: "Complete Oracles & Free Tools",
    servicesSub: "Use Likit Fah's suite of interactive destiny calculators and predictions free of charge.",
    srvBazi: "Chinese Bazi Calendar",
    srvBaziDesc: "Check your birth master element balance to optimize your career path.",
    srvTarot: "Tarot Readings",
    srvTarotDesc: "Draw cards for specific questions and check your weekly roadmap.",
    srvSiemsi: "Siemsi Oracle",
    srvSiemsiDesc: "Shake the virtual cup and draw paper predictions from famous temples.",
    srvDreams: "Dream Interpretations",
    srvDreamsDesc: "Decode your dreams into lucky numbers and warnings of upcoming events.",

    featuresTitle: "What Insights You Will Receive",
    featuresSub: "A premium comprehensive report generated instantly after entering your coordinates.",
    feat1: "5 Elements Balance (Bazi)",
    feat1Desc: "Understand Wood, Fire, Earth, Metal, and Water ratios to harmonize your internal energy.",
    feat2: "Strengths & Pitfalls",
    feat2Desc: "Discover your major career capabilities and highlight critical timeframes to watch.",
    feat3: "Prosperous Career Directions",
    feat3Desc: "Top sectors and jobs that align with your elemental weights.",
    feat4: "Love & Partnership Sign",
    feat4Desc: "Compatible partner profiles and relationship stability trends based on coordinates.",

    previewTitle: "Sample Dashboard Results",
    previewSub: "Visual charts generated instantly after decoding your birth parameters.",
    tabBazi: "5 Elements Balance",
    tabTarot: "Daily Tarot Guideline",
    tabGraph: "100-Year Life Graph",
    previewLockDesc: "Provide your birth parameters to unlock and generate decade transit charts.",
    btnUnlock: "🔮 Unlock My Destiny Graph Free",

    testimonialsTitle: "What Our Seekers Say",
    testimonialsSub: "Real feedback from individuals who unlocked Likit Fah report",
    rev1: "The career alignment is spot-on. The element balance helped me plan out my year with absolute clarity.",
    rev1User: "Kanda Promraksa",
    rev1Role: "Digital Marketer • Bangkok",
    rev2: "I love the clean, modern dashboard design. Visualizing Bazi coordinates makes it easy to understand.",
    rev2User: "Somchai Tangwittaya",
    rev2Role: "Business Owner • Chiang Mai",
    rev3: "Decade transition curve is highly accurate. High-end colors and typography. Highly recommended!",
    rev3User: "Nalinee Lertwijit",
    rev3Role: "Graphic Designer • Phuket",
    
    faqTitle: "Frequently Asked Questions",
    faqSub: "Find answers about astronomical astrology calculation",
    q1: "Is there any cost for checking my destiny?",
    a1: "Likit Fah reports and basic predictions are 100% free, supported by AdSense ads to maintain our servers.",
    q2: "Can I get a report if I don't know my exact birth time?",
    a2: "Yes! Choose 'I do not know my birth hour'. Midday averages will be computed. Note that ascendant sign accuracy may decrease.",
    q3: "Will my birth details be kept safe and private?",
    a3: "Absolutely. Your data is calculated on-the-fly inside the browser locally and is never sent or stored on external servers.",
    q4: "What methodology is used in calculation?",
    a4: "We combine Western physical coordinates of celestial stars with the Chinese Bazi 5 Elements calendar.",
    q5: "Why is birth hour crucial for analysis?",
    a5: "Birth hour determines your ascendant and house layout, which changes rapidly. High-precision minutes unlock the best results.",
    q6: "How does the 100-year graph calculate trends?",
    a6: "It maps the relationship between your Chinese 10-year luck pillars and natal celestial elements to chart life transits.",
    q7: "How is Artificial Intelligence (AI) utilized?",
    a7: "We use AI to summarize complex planetary coordinates and element percentages into simple, easy-to-read instructions.",
    q8: "Do ads interfere with the page experience?",
    a8: "We arrange AdSense slots in designated, clean panels so they do not block your reading flow or buttons.",

    bottomTitle: "Ready to Reveal Your Cosmic Blueprint?",
    bottomCta: "🔮 Begin Cosmic Calculation",
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
    unknownTime: "I do not know my birth hour",
    emptyChart: "Enter coordinates to preview your chart"
  }
};

export default function Home() {
  const [lang, setLang] = useState<"th" | "en">("th");
  const currentTranslations = t[lang];
  const [wizardOpen, setWizardOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [faqOpen, setFaqOpen] = useState<number | null>(null);
  const [liveUserCount, setLiveUserCount] = useState(18);
  const [previewTab, setPreviewTab] = useState<"bazi" | "tarot" | "graph">("bazi");

  // Animated Counter States
  const [stats, setStats] = useState({
    seekers: 23400,
    reports: 120100,
    rating: 4.5
  });

  useEffect(() => {
    const duration = 1200; 
    const steps = 35;
    const stepTime = duration / steps;
    let step = 0;

    const interval = setInterval(() => {
      step++;
      setStats({
        seekers: Math.min(23481, Math.floor(23400 + (81 / steps) * step)),
        reports: Math.min(120490, Math.floor(120100 + (390 / steps) * step)),
        rating: parseFloat(Math.min(4.9, 4.5 + (0.4 / steps) * step).toFixed(1))
      });

      if (step >= steps) {
        clearInterval(interval);
      }
    }, stepTime);

    return () => clearInterval(interval);
  }, []);

  // Scroll Reveal Observer
  const [scrolledSections, setScrolledSections] = useState<string[]>([]);
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["services-sec", "features-sec", "preview-sec", "testimonials-sec", "faq-sec"];
      sections.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top < window.innerHeight * 0.85) {
            setScrolledSections(prev => prev.includes(id) ? prev : [...prev, id]);
          }
        }
      });
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Live Interactive Calculator States
  const [calcName, setCalcName] = useState("");
  const [calcDob, setCalcDob] = useState("1994-06-23");
  const [calcTob, setCalcTob] = useState("15:30");
  const [calcNoTime, setCalcNoTime] = useState(false);
  const [isLiveCalculating, setIsLiveCalculating] = useState(false);

  // Friendly simulated outputs for entertainment
  const [luckScore, setLuckScore] = useState(88);
  const [masterElement, setMasterElement] = useState({ name: "ธาตุไม้ (Wood)", desc: "จิตใจดี มีเมตตา อบอุ่นและเติบโต" });
  const [luckyNumbers, setLuckyNumbers] = useState("3, 8");
  const [luckyColors, setLuckyColors] = useState("เขียวมรกต, ชมพู (Green, Pink)");
  const [dailyAstroFortune, setDailyAstroFortune] = useState("ช่วงนี้การเงินเด่นเป็นพิเศษ มีโชคลาภลอยประปราย ความรักราบรื่นดี");

  // Calculate live values whenever inputs change
  useEffect(() => {
    setIsLiveCalculating(true);
    const timer = setTimeout(() => {
      const seed = calcDob.split("-").reduce((acc, val) => acc + parseInt(val || "0"), 0) + 
                   (calcNoTime ? 12 : parseInt(calcTob.split(":")[0] || "0") * 3);
      
      // Luck score simulation
      const computedLuck = 75 + (seed % 21); // between 75% and 96%
      setLuckScore(computedLuck);

      // Element simulation
      const elementsList = [
        { name: "ธาตุไม้ (Wood Element)", desc: "อ่อนโยน มีเมตตา ชอบช่วยเหลือ รักความยุติธรรมและเติบโต" },
        { name: "ธาตุไฟ (Fire Element)", desc: "กระตือรือร้น ร่าเริง มีเสน่ห์ รักอิสระและมีความคิดสร้างสรรค์" },
        { name: "ธาตุดิน (Earth Element)", desc: "มั่นคง น่าเชื่อถือ มีเหตุผล หนักแน่นและเก็บความรู้สึกเก่ง" },
        { name: "ธาตุทอง (Metal Element)", desc: "เด็ดขาด มีวินัย พูดจริงทำจริง แข็งแกร่งและรักศักดิ์ศรี" },
        { name: "ธาตุน้ำ (Water Element)", desc: "ปรับตัวเก่ง มีไหวพริบ เฉลียวฉลาด รักสงบและเข้ากับคนง่าย" }
      ];
      setMasterElement(elementsList[seed % 5]);

      // Numbers and Colors simulation
      const numOptions = ["1, 9", "2, 7", "3, 8", "4, 6", "5, 0"];
      setLuckyNumbers(numOptions[seed % 5]);

      const colorOptions = [
        "แดง, ส้ม, ชมพู (Red, Orange, Pink)",
        "เขียว, ฟ้า (Green, Light Blue)",
        "เหลือง, ทอง, ครีม (Yellow, Gold, Cream)",
        "ขาว, เงิน, เทา (White, Silver, Grey)",
        "น้ำเงิน, ดำ, กรม (Blue, Black, Navy)"
      ];
      setLuckyColors(colorOptions[seed % 5]);

      const fortuneOptions = [
        "ช่วงนี้มีเกณฑ์รับเงินทองจากทิศใต้ การงานมีผู้อุปถัมภ์ช่วยเหลือชี้ทางสำเร็จ",
        "ช่วงนี้เสน่ห์แรงเป็นพิเศษ มีคนสนใจชื่นชม สุขภาพแข็งแรงดี การเงินเริ่มขยับดีขึ้น",
        "มีโชคดีลอยเข้ามาแบบไม่คาดฝัน การงานเด่นด้านเจรจาค้าขายสำเร็จฉลุย",
        "ควรระวังเรื่องอารมณ์ชั่ววูบ การเงินไหลเข้ามือซ้ายออกมือขวา แต่โดยรวมยังหมุนเวียนได้ดี",
        "จังหวะชะตาเปิดเต็มที่ เหมาะกับการริเริ่มโปรเจกต์ใหม่ ความรักมีเกณฑ์พบคนรู้ใจหนุนดวง"
      ];
      setDailyAstroFortune(fortuneOptions[seed % 5]);

      setIsLiveCalculating(false);
    }, 450);

    return () => clearTimeout(timer);
  }, [calcDob, calcTob, calcNoTime]);

  // Form Wizard states
  const [fullName, setFullName] = useState("");
  const [dob, setDob] = useState("");
  const [tob, setTob] = useState("12:00");
  const [noBirthTime, setNoBirthTime] = useState(false);
  const [formError, setFormError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionProgress, setSubmissionProgress] = useState(0);
  const [completedAnimationSteps, setCompletedAnimationSteps] = useState<number[]>([]);

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

  // Sticky Mobile CTA scroll observer
  const [showStickyCta, setShowStickyCta] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowStickyCta(true);
      } else {
        setShowStickyCta(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#050510] text-slate-100 flex flex-col font-sans selection:bg-amber-500 selection:text-black relative">
      
      {/* Astrological background overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-fixed opacity-[0.06] pointer-events-none"
        style={{ backgroundImage: "url('https://likitfah.com/img/9396.jpg')" }}
      ></div>

      {/* Magical Star Orbits */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[700px] overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-100px] left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-gradient-to-b from-amber-500/10 via-violet-500/5 to-transparent rounded-full blur-[120px]"></div>
      </div>

      {/* Floating Header */}
      <header className="sticky top-0 z-50 w-full bg-[#050510]/80 backdrop-blur-md border-b border-white/5 py-4 px-6 md:px-12 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-b from-amber-500 to-indigo-950 flex items-center justify-center border border-amber-500/30 shadow-[0_0_10px_rgba(245,158,11,0.25)]">
            <Moon className="w-4.5 h-4.5 text-amber-300" />
          </div>
          <div>
            <span className="font-serif font-black text-lg tracking-wider text-title-gradient">{t[lang].brand}</span>
            <p className="text-[7px] text-slate-500 uppercase tracking-widest mt-0.5 font-bold">{t[lang].subtitle}</p>
          </div>
        </div>

        {/* Navigation links */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-semibold text-slate-400">
          <a href="tarot.html" className="hover:text-amber-400 transition-colors flex items-center gap-1.5"><Sparkles className="w-3.5 h-3.5" />{t[lang].navTarot}</a>
          <a href="chinese-calendar.html" className="hover:text-amber-400 transition-colors flex items-center gap-1.5"><Compass className="w-3.5 h-3.5" />{t[lang].navCalendar}</a>
          <a href="dashboard.html" className="hover:text-amber-400 transition-colors">{t[lang].navDashboard}</a>
        </nav>

        {/* Right buttons */}
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setLang(prev => prev === "th" ? "en" : "th")}
            className="w-8 h-8 rounded-lg border border-white/5 flex items-center justify-center text-xs font-bold text-slate-400 hover:text-amber-400 hover:bg-white/5 transition-all"
            aria-label="Toggle language"
          >
            {lang === "th" ? "EN" : "TH"}
          </button>
          
          <button 
            onClick={() => {
              setWizardOpen(true);
              setCurrentStep(1);
            }}
            className="px-4 py-2 text-xs font-extrabold rounded-full bg-gradient-to-r from-amber-500 to-yellow-500 text-black shadow-md hover:shadow-amber-500/20 hover:scale-[1.02] transition-all flex items-center gap-1 cursor-pointer"
          >
            {t[lang].navGetStarted}
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-6xl mx-auto w-full px-6 py-12 md:py-16 relative z-10 flex flex-col gap-20">

        {/* AdSense Top Ad Slot Placeholder */}
        <div className="w-full max-w-4xl mx-auto rounded-xl border border-white/5 bg-slate-900/10 p-3 flex flex-col items-center justify-center text-[9px] text-slate-600 uppercase tracking-widest min-h-[90px] relative overflow-hidden">
          <div className="absolute top-1 right-2 text-[7px] text-slate-700">AdSlot: Top Banner</div>
          <span>Google AdSense Advertisement</span>
          <div className="text-[7px] text-slate-500 font-mono mt-1">&lt;ins class="adsbygoogle" style="display:inline-block;width:728px;height:90px"&gt;&lt;/ins&gt;</div>
        </div>

        {/* Hero Section - Split Screen layout ( Astrological Split: Left Text, Right Live Fortune Slate) */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Hero Left (5 columns) */}
          <div className="lg:col-span-5 flex flex-col gap-6 text-left items-start">
            
            {/* Trust Signal Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-400 text-[10px] font-bold uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
              <span>⭐ 4.9 ({stats.seekers.toLocaleString()}+ ผู้เปิดชะตา) | {stats.reports.toLocaleString()}+ คำพากย์</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white font-serif tracking-tight leading-tight lg:leading-[1.1] text-title-gradient">
              {t[lang].heroTitle}
            </h1>

            <p className="text-xs md:text-sm text-slate-400 font-light leading-relaxed">
              {t[lang].heroSubtitle}
            </p>

            {/* Friendly bullets for entertainment */}
            <div className="flex flex-col gap-3 text-xs text-slate-300 font-semibold w-full">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>✨ ตรวจสอบสมดุลพลังธาตุและสีมงคลฟรี</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>🃏 ทำนายไพ่ยิปซีชี้ทิศการงานความรัก</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>🍀 คำนวณเลขเด็ดเลขมงคลหนุนดวงชะตา</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 w-full pt-2">
              <button 
                onClick={() => {
                  setWizardOpen(true);
                  setCurrentStep(1);
                }}
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 hover:from-amber-400 hover:via-yellow-300 hover:to-amber-400 text-black font-extrabold text-xs transition-all hover:scale-[1.02] flex justify-center items-center gap-2 cursor-pointer shadow-[0_4px_30px_rgba(245,158,11,0.4)] hover:shadow-[0_4px_45px_rgba(245,158,11,0.6)]"
              >
                <span>{t[lang].btnHeroCta}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center gap-2 text-slate-500 text-[10px] font-semibold">
              <Users className="w-3.5 h-3.5 text-amber-400" />
              <span>{t[lang].seekersCount}</span>
            </div>
          </div>

          {/* Hero Right - Magical Live Fortune Slate (7 columns) */}
          <div className="lg:col-span-7 bg-slate-950/40 rounded-3xl border border-amber-500/15 p-6 md:p-8 flex flex-col gap-5 relative overflow-hidden shadow-[0_15px_45px_rgba(245,158,11,0.1)] backdrop-blur-md">
            {/* Spinning decorative zodiac wheel background */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] h-[480px] border border-dashed border-amber-500/5 rounded-full pointer-events-none animate-spin-slow opacity-15"></div>

            <div className="flex items-center justify-between border-b border-white/5 pb-3.5 gap-4 relative z-10">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                  {isLiveCalculating ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5 animate-pulse" />}
                </div>
                <div>
                  <h4 className="text-white font-serif font-black text-sm">{calcName ? calcName : (lang === "en" ? "Guest Fortune" : "คำพยากรณ์ของคุณ")}</h4>
                  <p className="text-[10px] text-amber-400/80 font-semibold tracking-wider">
                    {lang === "th" ? "รหัสลับฟ้าลิขิต" : "Cosmic Code"}
                  </p>
                </div>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[9px] font-bold tracking-widest uppercase">Live Prophecy</span>
            </div>

            {/* Compact sandbox inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 relative z-10">
              <div className="flex flex-col gap-1">
                <label className="text-[8px] font-bold text-slate-400 uppercase tracking-wider">ชื่อของคุณ (Name)</label>
                <input 
                  type="text" 
                  value={calcName}
                  onChange={(e) => setCalcName(e.target.value)}
                  placeholder="กรอกชื่อเพื่อตรวจดวง"
                  className="w-full bg-[#050510]/80 border border-amber-500/10 rounded-xl px-3 py-2 text-[11px] text-yellow-100 font-bold focus:outline-none focus:border-amber-500 transition-all"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-[8px] font-bold text-slate-400 uppercase tracking-wider">วันเกิด ค.ศ. (Birth Date)</label>
                <input 
                  type="date" 
                  value={calcDob}
                  onChange={(e) => setCalcDob(e.target.value)}
                  className="w-full bg-[#050510]/80 border border-amber-500/10 rounded-xl px-3 py-2 text-[11px] text-yellow-100 font-bold focus:outline-none focus:border-amber-500 transition-all cursor-pointer"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-[8px] font-bold text-slate-400 uppercase tracking-wider">เวลาเกิด (Time)</label>
                <input 
                  type="time" 
                  value={calcTob}
                  disabled={calcNoTime}
                  onChange={(e) => setCalcTob(e.target.value)}
                  className={`w-full bg-[#050510]/80 border border-amber-500/10 rounded-xl px-3 py-2 text-[11px] text-yellow-100 font-bold focus:outline-none focus:border-amber-500 transition-all ${calcNoTime ? "opacity-30 cursor-not-allowed" : "cursor-pointer"}`}
                />
              </div>
            </div>

            {/* Friendly Live Fortune outputs */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-5 relative z-10 items-center mt-2">
              {/* Luck Index gauge */}
              <div className="md:col-span-4 flex flex-col items-center justify-center bg-[#050510]/40 p-4 rounded-2xl border border-white/5 text-center min-h-[140px]">
                <div className="text-[8px] text-slate-450 font-bold uppercase tracking-widest mb-2">{lang === "th" ? "ดัชนีโชควันนี้" : "Today's Luck"}</div>
                <div className="relative w-20 h-20 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="40" stroke="rgba(255,255,255,0.03)" strokeWidth="6" fill="transparent" />
                    <circle cx="50" cy="50" r="40" stroke="#f59e0b" strokeWidth="6" fill="transparent"
                      strokeDasharray="251.2" strokeDashoffset={251.2 - (251.2 * luckScore) / 100} strokeLinecap="round" />
                  </svg>
                  <div className="absolute flex flex-col items-center">
                    <span className="text-lg font-black text-amber-400 font-mono">{luckScore}%</span>
                    <span className="text-[7px] text-emerald-400 font-bold uppercase tracking-widest mt-0.5">High Luck</span>
                  </div>
                </div>
              </div>

              {/* Elements & lucky factors */}
              <div className="md:col-span-8 bg-[#050510]/40 p-4 rounded-2xl border border-white/5 flex flex-col gap-3 min-h-[140px] justify-between text-left text-xs">
                <div>
                  <div className="text-[8px] text-slate-450 font-bold uppercase tracking-widest mb-1.5">{lang === "th" ? "วิเคราะห์ธาตุและนิสัยหลัก" : "Your Cosmic Element"}</div>
                  <div className="text-white font-bold text-sm flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <span>{masterElement.name}</span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1 font-light leading-relaxed">{masterElement.desc}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4 border-t border-white/5 pt-2.5 mt-1 text-[11px] font-medium">
                  <div>
                    <span className="text-slate-500 text-[8px] uppercase block tracking-wider">เลขมงคลประจำวัน</span>
                    <span className="text-amber-400 font-bold font-mono text-xs">{luckyNumbers}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 text-[8px] uppercase block tracking-wider">สีนำโชคหนุนดวง</span>
                    <span className="text-white font-bold text-[10px] leading-none">{luckyColors}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Daily text prediction */}
            <div className="bg-[#050510]/60 p-3.5 rounded-xl border border-amber-500/10 text-xs text-slate-300 leading-relaxed font-light relative z-10 text-left">
              <span className="text-[8px] text-amber-500 font-bold block mb-1 uppercase tracking-widest">คำชี้แนะชะตาสวรรค์ (Celestial Advice)</span>
              "{dailyAstroFortune}"
            </div>

            {/* Live Calculating Overlay */}
            {isLiveCalculating && (
              <div className="absolute inset-0 bg-[#03040c]/50 backdrop-blur-[1px] flex items-center justify-center z-25">
                <div className="flex items-center gap-2 bg-slate-900 border border-white/10 px-4 py-2 rounded-xl text-xs text-amber-400 font-bold">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>{t[lang].liveCalculating}</span>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Free Services Navigation Showcase (Popular tools on Likit Fah) */}
        <section 
          id="services-sec" 
          className={`flex flex-col gap-10 scroll-mt-24 transition-all duration-700 transform ${scrolledSections.includes("services-sec") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="text-center flex flex-col gap-2">
            <h2 className="text-xl md:text-2xl font-bold text-white font-serif">{t[lang].servicesTitle}</h2>
            <p className="text-slate-400 text-xs">{t[lang].servicesSub}</p>
            <div className="w-12 h-0.5 bg-gradient-to-r from-amber-500 to-yellow-500 mx-auto mt-2 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Calendar */}
            <a href="chinese-calendar.html" className="bg-[#0b0c16]/30 p-5 rounded-2xl border border-amber-500/10 hover:border-amber-500/30 flex flex-col gap-3 hover:translate-y-[-2px] transition-all duration-300 shadow-md">
              <div className="w-9 h-9 rounded-full bg-amber-550/10 flex items-center justify-center text-amber-400 border border-amber-500/20"><Calendar className="w-4.5 h-4.5" /></div>
              <h3 className="font-bold text-white text-xs">{t[lang].srvBazi}</h3>
              <p className="text-[11px] text-slate-400 leading-relaxed font-light">{t[lang].srvBaziDesc}</p>
            </a>
            {/* Tarot */}
            <a href="tarot.html" className="bg-[#0b0c16]/30 p-5 rounded-2xl border border-amber-500/10 hover:border-amber-500/30 flex flex-col gap-3 hover:translate-y-[-2px] transition-all duration-300 shadow-md">
              <div className="w-9 h-9 rounded-full bg-amber-550/10 flex items-center justify-center text-amber-400 border border-amber-500/20"><Sparkles className="w-4.5 h-4.5" /></div>
              <h3 className="font-bold text-white text-xs">{t[lang].srvTarot}</h3>
              <p className="text-[11px] text-slate-400 leading-relaxed font-light">{t[lang].srvTarotDesc}</p>
            </a>
            {/* Siemsi */}
            <a href="siemsi.html" className="bg-[#0b0c16]/30 p-5 rounded-2xl border border-amber-500/10 hover:border-amber-500/30 flex flex-col gap-3 hover:translate-y-[-2px] transition-all duration-300 shadow-md">
              <div className="w-9 h-9 rounded-full bg-amber-550/10 flex items-center justify-center text-amber-400 border border-amber-500/20"><Compass className="w-4.5 h-4.5" /></div>
              <h3 className="font-bold text-white text-xs">{t[lang].srvSiemsi}</h3>
              <p className="text-[11px] text-slate-400 leading-relaxed font-light">{t[lang].srvSiemsiDesc}</p>
            </a>
            {/* Dreams */}
            <a href="dreams.html" className="bg-[#0b0c16]/30 p-5 rounded-2xl border border-amber-500/10 hover:border-amber-500/30 flex flex-col gap-3 hover:translate-y-[-2px] transition-all duration-300 shadow-md">
              <div className="w-9 h-9 rounded-full bg-amber-550/10 flex items-center justify-center text-amber-400 border border-amber-500/20"><BookOpen className="w-4.5 h-4.5" /></div>
              <h3 className="font-bold text-white text-xs">{t[lang].srvDreams}</h3>
              <p className="text-[11px] text-slate-400 leading-relaxed font-light">{t[lang].srvDreamsDesc}</p>
            </a>
          </div>
        </section>

        {/* AdSense In-Feed Ad Slot Placeholder */}
        <div className="w-full max-w-4xl mx-auto rounded-xl border border-white/5 bg-slate-900/10 p-3 flex flex-col items-center justify-center text-[9px] text-slate-600 uppercase tracking-widest min-h-[90px] relative overflow-hidden">
          <div className="absolute top-1 right-2 text-[7px] text-slate-700">AdSlot: Mid Banner</div>
          <span>Google AdSense Advertisement</span>
          <div className="text-[7px] text-slate-500 font-mono mt-1">&lt;ins class="adsbygoogle" style="display:inline-block;width:728px;height:90px"&gt;&lt;/ins&gt;</div>
        </div>

        {/* Report Features Showcase Info */}
        <section 
          id="features-sec" 
          className={`flex flex-col gap-10 transition-all duration-700 transform ${scrolledSections.includes("features-sec") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="text-center flex flex-col gap-2">
            <h2 className="text-xl md:text-2xl font-bold text-white font-serif">{t[lang].featuresTitle}</h2>
            <p className="text-slate-400 text-xs">{t[lang].featuresSub}</p>
            <div className="w-12 h-0.5 bg-gradient-to-r from-amber-500 to-yellow-500 mx-auto mt-2 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-[#0b0c16]/20 p-5 rounded-2xl border border-white/5 flex flex-col gap-3 hover:border-amber-500/20 transition-all duration-300">
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400 border border-amber-500/10"><User className="w-4 h-4" /></div>
              <h3 className="font-bold text-white text-xs">{t[lang].feat1}</h3>
              <p className="text-[11px] text-slate-400 leading-relaxed font-light">{t[lang].feat1Desc}</p>
            </div>
            <div className="bg-[#0b0c16]/20 p-5 rounded-2xl border border-white/5 flex flex-col gap-3 hover:border-amber-500/20 transition-all duration-300">
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400 border border-amber-500/10"><ShieldCheck className="w-4 h-4" /></div>
              <h3 className="font-bold text-white text-xs">{t[lang].feat2}</h3>
              <p className="text-[11px] text-slate-400 leading-relaxed font-light">{t[lang].feat2Desc}</p>
            </div>
            <div className="bg-[#0b0c16]/20 p-5 rounded-2xl border border-white/5 flex flex-col gap-3 hover:border-amber-500/20 transition-all duration-300">
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400 border border-amber-500/10"><Compass className="w-4 h-4" /></div>
              <h3 className="font-bold text-white text-xs">{t[lang].feat3}</h3>
              <p className="text-[11px] text-slate-400 leading-relaxed font-light">{t[lang].feat3Desc}</p>
            </div>
            <div className="bg-[#0b0c16]/20 p-5 rounded-2xl border border-white/5 flex flex-col gap-3 hover:border-amber-500/20 transition-all duration-300">
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400 border border-amber-500/10"><Sparkles className="w-4 h-4" /></div>
              <h3 className="font-bold text-white text-xs">{t[lang].feat4}</h3>
              <p className="text-[11px] text-slate-400 leading-relaxed font-light">{t[lang].feat4Desc}</p>
            </div>
          </div>
        </section>

        {/* Tabbed Report Preview Section */}
        <section 
          id="preview-sec" 
          className={`flex flex-col gap-8 scroll-mt-24 transition-all duration-700 transform ${scrolledSections.includes("preview-sec") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="text-center flex flex-col gap-2">
            <h2 className="text-xl md:text-2xl font-bold text-white font-serif">{t[lang].previewTitle}</h2>
            <p className="text-slate-400 text-xs">{t[lang].previewSub}</p>
          </div>

          <div className="flex border-b border-white/5 justify-center gap-6 text-xs font-bold text-slate-400 pb-3">
            <button 
              onClick={() => setPreviewTab("bazi")}
              className={`pb-3 relative transition-all cursor-pointer ${previewTab === "bazi" ? "text-amber-400" : "hover:text-slate-200"}`}
            >
              <span>{t[lang].tabBazi}</span>
              {previewTab === "bazi" && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-500 rounded-full"></div>}
            </button>
            <button 
              onClick={() => setPreviewTab("tarot")}
              className={`pb-3 relative transition-all cursor-pointer ${previewTab === "tarot" ? "text-amber-400" : "hover:text-slate-200"}`}
            >
              <span>{t[lang].tabTarot}</span>
              {previewTab === "tarot" && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-500 rounded-full"></div>}
            </button>
            <button 
              onClick={() => setPreviewTab("graph")}
              className={`pb-3 relative transition-all cursor-pointer ${previewTab === "graph" ? "text-amber-400" : "hover:text-slate-200"}`}
            >
              <span>{t[lang].tabGraph}</span>
              {previewTab === "graph" && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-500 rounded-full"></div>}
            </button>
          </div>

          <div className="bg-slate-950/30 rounded-2xl border border-white/5 p-6 md:p-8 min-h-[250px] flex items-center justify-center shadow-lg relative overflow-hidden">
            
            {/* Tab 1: Elements */}
            {previewTab === "bazi" && (
              <div className="w-full max-w-xl space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400 border border-emerald-500/20"><Activity className="w-4 h-4" /></div>
                  <h4 className="font-bold text-white text-xs">{t[lang].tabBazi} (Yang Wood Chart)</h4>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
                  <div className="bg-[#0b0c16]/50 p-4 rounded-xl border border-white/5 text-center">
                    <div className="text-[10px] text-slate-500 font-bold uppercase mb-1">Wood (ไม้)</div>
                    <div className="text-lg font-bold text-emerald-400 font-mono">35%</div>
                    <div className="w-full bg-slate-800 rounded-full h-1 mt-2.5"><div className="bg-emerald-500 h-1 rounded-full" style={{ width: "35%" }}></div></div>
                  </div>
                  <div className="bg-[#0b0c16]/50 p-4 rounded-xl border border-white/5 text-center">
                    <div className="text-[10px] text-slate-500 font-bold uppercase mb-1">Fire (ไฟ)</div>
                    <div className="text-lg font-bold text-orange-400 font-mono">22%</div>
                    <div className="w-full bg-slate-800 rounded-full h-1 mt-2.5"><div className="bg-orange-500 h-1 rounded-full" style={{ width: "22%" }}></div></div>
                  </div>
                  <div className="bg-[#0b0c16]/50 p-4 rounded-xl border border-white/5 text-center">
                    <div className="text-[10px] text-slate-500 font-bold uppercase mb-1">Earth (ดิน)</div>
                    <div className="text-lg font-bold text-yellow-600 font-mono">15%</div>
                    <div className="w-full bg-slate-800 rounded-full h-1 mt-2.5"><div className="bg-yellow-600 h-1 rounded-full" style={{ width: "15%" }}></div></div>
                  </div>
                  <div className="bg-[#0b0c16]/50 p-4 rounded-xl border border-white/5 text-center">
                    <div className="text-[10px] text-slate-500 font-bold uppercase mb-1">Metal (ทอง)</div>
                    <div className="text-lg font-bold text-slate-300 font-mono">18%</div>
                    <div className="w-full bg-slate-800 rounded-full h-1 mt-2.5"><div className="bg-zinc-400 h-1 rounded-full" style={{ width: "18%" }}></div></div>
                  </div>
                  <div className="bg-[#0b0c16]/50 p-4 rounded-xl border border-white/5 text-center">
                    <div className="text-[10px] text-slate-500 font-bold uppercase mb-1">Water (น้ำ)</div>
                    <div className="text-lg font-bold text-sky-400 font-mono">10%</div>
                    <div className="w-full bg-slate-800 rounded-full h-1 mt-2.5"><div className="bg-sky-500 h-1 rounded-full" style={{ width: "10%" }}></div></div>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 2: Tarot */}
            {previewTab === "tarot" && (
              <div className="w-full max-w-md flex flex-col sm:flex-row items-center gap-6">
                <div className="w-20 h-32 rounded-xl border border-amber-500/40 bg-gradient-to-b from-amber-950/40 to-slate-950 flex flex-col items-center justify-center p-3 relative shadow-[0_0_15px_rgba(245,158,11,0.15)] animate-float">
                  <Sun className="w-7 h-7 text-yellow-300" />
                  <div className="text-[8px] text-amber-200 font-bold uppercase tracking-wider mt-2">The Sun</div>
                  <div className="text-[6px] text-slate-650 uppercase font-mono absolute bottom-2">XIX • อาทิตย์</div>
                </div>
                <div className="flex-1 space-y-2 text-left">
                  <h4 className="font-bold text-white text-xs">คำทำนายส่วนตัวประจำวัน (The Sun alignment)</h4>
                  <p className="text-[11px] text-slate-400 leading-relaxed font-light">พลังงานวันของไพ่พระอาทิตย์จะช่วยส่งเสริมความก้าวหน้าและการริเริ่มสิ่งใหม่ ความสว่างจะเข้ามาขจัดอุปสรรคและประทานจังหวะที่ดีแก่การเงินการลงทุน</p>
                </div>
              </div>
            )}

            {/* Tab 3: Blurred Graph */}
            {previewTab === "graph" && (
              <div className="w-full max-w-xl relative flex flex-col items-center justify-center min-h-[200px]">
                <div className="w-full opacity-20 filter blur-[8px] pointer-events-none select-none flex items-end gap-3 h-24 px-4">
                  <div className="w-full h-[30%] bg-violet-500 rounded"></div>
                  <div className="w-full h-[60%] bg-violet-500 rounded"></div>
                  <div className="w-full h-[40%] bg-violet-500 rounded"></div>
                  <div className="w-full h-[80%] bg-indigo-500 rounded"></div>
                  <div className="w-full h-[95%] bg-indigo-500 rounded"></div>
                </div>
                
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                  <div className="w-9 h-9 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-2">
                    <Lock className="w-4 h-4" />
                  </div>
                  <h4 className="text-xs font-bold text-white mb-1">{t[lang].tabGraph}</h4>
                  <p className="text-[9px] text-slate-400 max-w-xs mb-3">{t[lang].previewLockDesc}</p>
                  <button 
                    onClick={() => {
                      setWizardOpen(true);
                      setCurrentStep(1);
                    }}
                    className="px-4 py-2 rounded-lg bg-gradient-to-r from-amber-500 to-yellow-500 text-black text-[9px] font-extrabold shadow-md hover:scale-[1.02] transition-all cursor-pointer"
                  >
                    {t[lang].btnUnlock}
                  </button>
                </div>
              </div>
            )}

          </div>
        </section>

        {/* Testimonials */}
        <section 
          id="testimonials-sec" 
          className={`flex flex-col gap-10 transition-all duration-700 transform ${scrolledSections.includes("testimonials-sec") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="text-center flex flex-col gap-2">
            <h2 className="text-xl md:text-2xl font-bold text-white font-serif">{t[lang].testimonialsTitle}</h2>
            <p className="text-slate-400 text-xs">{t[lang].testimonialsSub}</p>
            <div className="w-12 h-0.5 bg-gradient-to-r from-amber-500 to-yellow-500 mx-auto mt-2 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#0b0c16]/30 p-5 rounded-2xl border border-white/5 flex flex-col justify-between hover:border-amber-500/15 transition-all duration-300">
              <div>
                <div className="flex gap-1 text-amber-500 mb-3 text-xs">
                  {[1, 2, 3, 4, 5].map(s => <Sparkles key={s} className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />)}
                </div>
                <p className="text-slate-300 text-[11px] leading-relaxed mb-6 font-light">"{t[lang].rev1}"</p>
              </div>
              <div className="flex items-center gap-2.5 pt-3.5 border-t border-white/5">
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-amber-500 to-indigo-950 flex items-center justify-center text-white text-xs font-bold font-mono">KP</div>
                <div>
                  <h5 className="text-white text-xs font-bold">{t[lang].rev1User}</h5>
                  <p className="text-[9px] text-slate-500">{t[lang].rev1Role}</p>
                </div>
              </div>
            </div>

            <div className="bg-[#0b0c16]/30 p-5 rounded-2xl border border-white/5 flex flex-col justify-between hover:border-amber-500/15 transition-all duration-300">
              <div>
                <div className="flex gap-1 text-amber-500 mb-3 text-xs">
                  {[1, 2, 3, 4, 5].map(s => <Sparkles key={s} className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />)}
                </div>
                <p className="text-slate-300 text-[11px] leading-relaxed mb-6 font-light">"{t[lang].rev2}"</p>
              </div>
              <div className="flex items-center gap-2.5 pt-3.5 border-t border-white/5">
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-amber-500 to-indigo-950 flex items-center justify-center text-white text-xs font-bold font-mono">ST</div>
                <div>
                  <h5 className="text-white text-xs font-bold">{t[lang].rev2User}</h5>
                  <p className="text-[9px] text-slate-500">{t[lang].rev2Role}</p>
                </div>
              </div>
            </div>

            <div className="bg-[#0b0c16]/30 p-5 rounded-2xl border border-white/5 flex flex-col justify-between hover:border-amber-500/15 transition-all duration-300">
              <div>
                <div className="flex gap-1 text-amber-500 mb-3 text-xs">
                  {[1, 2, 3, 4, 5].map(s => <Sparkles key={s} className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />)}
                </div>
                <p className="text-slate-300 text-[11px] leading-relaxed mb-6 font-light">"{t[lang].rev3}"</p>
              </div>
              <div className="flex items-center gap-2.5 pt-3.5 border-t border-white/5">
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-amber-500 to-indigo-950 flex items-center justify-center text-white text-xs font-bold font-mono">NL</div>
                <div>
                  <h5 className="text-white text-xs font-bold">{t[lang].rev3User}</h5>
                  <p className="text-[9px] text-slate-500">{t[lang].rev3Role}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* AdSense Lower Ad Slot Placeholder */}
        <div className="w-full max-w-4xl mx-auto rounded-xl border border-white/5 bg-slate-900/10 p-3 flex flex-col items-center justify-center text-[9px] text-slate-600 uppercase tracking-widest min-h-[90px] relative overflow-hidden">
          <div className="absolute top-1 right-2 text-[7px] text-slate-700">AdSlot: Bottom Banner</div>
          <span>Google AdSense Advertisement</span>
          <div className="text-[7px] text-slate-500 font-mono mt-1">&lt;ins class="adsbygoogle" style="display:inline-block;width:728px;height:90px"&gt;&lt;/ins&gt;</div>
        </div>

        {/* FAQ Accordion */}
        <section 
          id="faq-sec" 
          className={`flex flex-col gap-12 transition-all duration-700 transform ${scrolledSections.includes("faq-sec") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="text-center flex flex-col gap-2">
            <h2 className="text-2xl md:text-3xl font-bold text-white font-serif">{t[lang].faqTitle}</h2>
            <p className="text-slate-400 text-xs">{t[lang].faqSub}</p>
            <div className="w-12 h-0.5 bg-gradient-to-r from-amber-500 to-yellow-500 mx-auto mt-2 rounded-full"></div>
          </div>

          <div className="space-y-4 max-w-3xl mx-auto w-full">
            {[1, 2, 3, 4, 5, 6, 7, 8].map(id => {
              const qText = t[lang][`q${id}` as keyof typeof t["th"]];
              const aText = t[lang][`a${id}` as keyof typeof t["th"]];
              const isOpen = faqOpen === id;

              return (
                <div key={id} className="bg-slate-950/20 rounded-xl border border-white/5 overflow-hidden transition-all duration-300">
                  <button 
                    onClick={() => setFaqOpen(isOpen ? null : id)}
                    className="w-full px-5 py-4 text-left flex justify-between items-center text-white hover:text-amber-400 font-semibold transition-colors text-xs sm:text-sm gap-4 cursor-pointer"
                  >
                    <span>{qText}</span>
                    <ChevronRight className={`w-4 h-4 text-amber-400 transition-transform duration-300 ${isOpen ? "rotate-90" : "rotate-0"}`} />
                  </button>
                  <div className={`transition-all duration-300 overflow-hidden bg-slate-950/10 ${isOpen ? "max-h-[300px] border-t border-white/5" : "max-h-0"}`}>
                    <div className="px-5 py-4 text-xs text-slate-400 font-light leading-relaxed">
                      {aText}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Bottom CTA banner */}
        <section className="text-center mb-12 px-4 bg-gradient-to-r from-indigo-950/15 via-[#0c0d1b] to-indigo-950/15 rounded-3xl border border-amber-500/20 p-12 md:p-16 flex flex-col items-center gap-6 shadow-2xl max-w-2xl mx-auto relative overflow-hidden">
          <div className="absolute top-[-50px] left-[-50px] w-48 h-48 bg-amber-500/10 rounded-full blur-3xl"></div>
          
          <h2 className="text-xl md:text-2xl font-serif text-white font-bold leading-tight">
            {t[lang].bottomTitle}
          </h2>
          <button 
            onClick={() => {
              setWizardOpen(true);
              setCurrentStep(1);
            }}
            className="px-8 py-4 rounded-full bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-600 hover:from-amber-500 hover:via-yellow-400 hover:to-amber-500 text-black font-extrabold text-sm shadow-[0_4px_30px_rgba(245,158,11,0.3)] transition-all hover:scale-[1.02] flex items-center gap-2 border border-yellow-300/40 cursor-pointer"
          >
            <Sparkles className="w-5 h-5 text-black" />
            <span>{t[lang].bottomCta}</span>
          </button>
        </section>

      </main>

      {/* Footer */}
      <footer className="w-full bg-[#020207] border-t border-white/5 py-12 px-6 md:px-12 mt-16 relative z-10">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 text-slate-400 text-xs">
          
          {/* Brand desc */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg border border-amber-500/40 flex items-center justify-center bg-gradient-to-b from-amber-500 to-indigo-950">
                <Moon className="w-4 h-4 text-amber-300" />
              </div>
              <span className="font-bold text-base tracking-widest text-title-gradient font-serif">{t[lang].brand}</span>
            </div>
            <p className="leading-relaxed text-[11px] font-light">{t[lang].footerDesc}</p>
          </div>

          {/* Links 1 */}
          <div className="space-y-3">
            <h5 className="font-bold text-white uppercase tracking-widest text-[9px]">{t[lang].footerCol1}</h5>
            <ul className="space-y-2.5 font-light font-medium">
              <li><a href="chinese-calendar.html" className="hover:text-amber-400 transition-colors">ปฏิทินจีนบาจื่อ</a></li>
              <li><a href="tarot.html" className="hover:text-amber-400 transition-colors">{t[lang].navTarot}</a></li>
              <li><a href="siemsi.html" className="hover:text-amber-400 transition-colors">เซียมซีนำทาง (Siemsi)</a></li>
              <li><a href="dreams.html" className="hover:text-amber-400 transition-colors">ทำนายฝันพยากรณ์</a></li>
            </ul>
          </div>

          {/* Links 2 */}
          <div className="space-y-3">
            <h5 className="font-bold text-white uppercase tracking-widest text-[9px]">{t[lang].footerCol2}</h5>
            <ul className="space-y-2.5 font-light font-medium">
              <li><a href="policy.html" target="_blank" className="hover:text-amber-400 transition-colors">นโยบายความเป็นส่วนตัว (Privacy)</a></li>
              <li><a href="terms.html" target="_blank" className="hover:text-amber-400 transition-colors">ข้อตกลงการใช้งาน (Terms)</a></li>
              <li><a href="donate.html" className="hover:text-amber-400 transition-colors">สนับสนุนผู้พัฒนา (Support Us)</a></li>
            </ul>
          </div>

          {/* Connect */}
          <div className="space-y-3">
            <h5 className="font-bold text-white uppercase tracking-widest text-[9px]">{t[lang].footerCol3}</h5>
            <p className="font-light">Email: support@likitfah.com</p>
            <div className="flex gap-4 pt-1.5 text-base">
              <a href="#" aria-label="Facebook" className="hover:text-amber-400 transition-colors"><Share2 className="w-4 h-4" /></a>
              <a href="#" aria-label="Email" className="hover:text-amber-400 transition-colors"><Mail className="w-4 h-4" /></a>
              <a href="#" aria-label="Website" className="hover:text-amber-400 transition-colors"><Globe className="w-4 h-4" /></a>
            </div>
          </div>

        </div>

        <div className="border-t border-white/5 mt-10 pt-6 text-center text-[10px] text-slate-650 font-medium">
          <p>&copy; 2026 LikitFah.com • The Mystic Oracle. All Rights Reserved.</p>
        </div>
      </footer>

      {/* Floating Live Activity Widget */}
      <div id="live-activity-widget" className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-[80] bg-[#03040c]/90 px-4 py-2.5 rounded-full border border-amber-500/20 shadow-lg flex items-center gap-2.5 transition-all hover:scale-[1.02]">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
        </span>
        <span className="text-[10px] sm:text-xs text-slate-300 font-semibold">
          {lang === "th" ? (
            <>มีผู้ใช้งานกำลังทำนายดวงอยู่ <span className="text-amber-400 font-bold font-mono">{liveUserCount}</span> คน</>
          ) : (
            <><span className="text-amber-400 font-bold font-mono">{liveUserCount}</span> seekers are checking fortunes now</>
          )}
        </span>
      </div>

      {/* Sticky Mobile CTA */}
      <div 
        id="sticky-mobile-cta" 
        className={`fixed bottom-0 left-0 right-0 z-[90] bg-[#03040c]/95 backdrop-blur-md border-t border-amber-500/20 px-4 py-3.5 shadow-2xl flex sm:hidden justify-center items-center transition-all duration-300 ${showStickyCta ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"}`}
      >
        <button 
          onClick={() => {
            setWizardOpen(true);
            setCurrentStep(1);
          }}
          className="w-full py-3.5 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 text-black font-extrabold text-xs rounded-full shadow-[0_-2px_15px_rgba(245,158,11,0.25)] flex justify-center items-center gap-1.5 cursor-pointer"
        >
          <span>{lang === "th" ? "🔮 ทำนายดวงชะตาสวรรค์ฟรี →" : "🔮 Free Destiny Reading →"}</span>
        </button>
      </div>

      {/* Interactive Step Wizard Modal (Overlay Dialog) */}
      {wizardOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#03040c]/90 backdrop-blur-xs">
          <div className="absolute inset-0" onClick={() => setWizardOpen(false)}></div>
          
          <div className="bg-[#0b0c16]/95 w-full max-w-md rounded-3xl p-6 md:p-8 relative border border-amber-500/20 shadow-2xl z-10 flex flex-col gap-6 backdrop-blur-md">
            
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
                    <div className="h-full bg-amber-500 transition-all duration-300" style={{ width: `${((currentStep - 1) / 2) * 100}%` }}></div>
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
                        <p className="text-xs text-slate-400 mt-1">Select date in C.E. (ค.ศ.)</p>
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
                  <Loader2 className="w-8 h-8 text-amber-550 animate-spin" />
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
                          isCompleted ? "text-amber-400 font-bold" : isActive ? "text-amber-400" : "text-slate-650"
                        }`}
                      >
                        <div className="shrink-0">
                          {isCompleted ? (
                            <CheckCircle2 className="w-4 h-4 text-amber-500" />
                          ) : isActive ? (
                            <Loader2 className="w-4 h-4 text-amber-550 animate-spin" />
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
