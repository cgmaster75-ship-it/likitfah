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
  BookOpen,
  Phone
} from "lucide-react";

// Translation dictionary
const t = {
  th: {
    brand: "ลิขิตฟ้า",
    subtitle: "ASTRONOMICAL ASTROLOGY",
    navTarot: "ทำนายไพ่ยิปซี",
    navCalendar: "ปฏิทินจีนบาจื่อ",
    navDashboard: "แดชบอร์ดดวงชะตา",
    navGetStarted: "🔮 เริ่มวิเคราะห์ฟรี",
    
    heroTitle: "ถอดรหัสชะตาชีวิต เฉพาะบุคคล ครบวงจร",
    heroSubtitle: "วิเคราะห์สมดุลพลังธาตุ ค้นหาจุดแข็งเพื่อคว้าความสำเร็จ และวางรากฐานดวงชะตารับปีมงคลอย่างมั่นใจโดยผู้เชี่ยวชาญศาสตร์จีนและดาราศาสตร์สากล",
    bullet1: "✨ ตรวจสมดุล 5 ธาตุและสีมงคลประจำตัว",
    bullet2: "🃏 เปิดไพ่ยิปซีพยากรณ์ความรักและการงาน",
    bullet3: "🍀 รหัสตัวเลขมงคลและเลขเด่นนำโชคลาภ",
    btnHeroCta: "🔮 เริ่มวิเคราะห์ดวงชะตาฟรี",
    btnHeroSample: "ดูศาสตร์พยากรณ์ทั้งหมด",
    seekersCount: "มีผู้เปิดดวงชะตาแล้วกว่า 23,481+ คน",
    
    calculatorTitle: "เครื่องมือวิเคราะห์ชะตาชีวิตเรียลไทม์",
    liveCalculating: "กำลังคำนวณตำแหน่งพิกัดดาว...",
    
    servicesTitle: "ศาสตร์พยากรณ์และบริการของเรา",
    servicesSub: "เลือกใช้งานศาสตร์และเครื่องมือวิเคราะห์ชะตาชีวิตต่างๆ ของลิขิตฟ้าได้ฟรีโดยไม่มีค่าใช้จ่าย",
    srvBazi: "ปฏิทินจีนบาจื่อ (Bazi Calendar)",
    srvBaziDesc: "ตรวจวิเคราะห์สัดส่วนกำลังพลังธาตุ ไม้ ไฟ ดิน ทอง น้ำ เพื่อหาจุดเด่นที่ส่งเสริมดวงชะตาในการงานและการทำธุรกิจ",
    srvTarot: "ทำนายไพ่ยิปซี (Tarot Readings)",
    srvTarotDesc: "ไขข้อข้องใจในจิตใจด้วยศาสตร์เปิดไพ่ทาโรต์พยากรณ์รายวันและแนวทางรายสัปดาห์ในทุกมิติชีวิต",
    srvSiemsi: "เสี่ยงเซียมซีนำทาง (Siemsi Oracle)",
    srvSiemsiDesc: "เสี่ยงทายใบคำทำนายแนวทางชีวิตจากวัดดังทั่วประเทศ เพื่อค้นหาคำตอบและทางออกที่ดีที่สุดสำหรับคุณ",
    srvDreams: "ทำนายฝันพยากรณ์ (Dream Interpretation)",
    srvDreamsDesc: "ตีความความฝันลึกลับบอกลางดีลางร้ายล่วงหน้า พร้อมถอดรหัสออกมาเป็นตัวเลขนำโชคมงคลเฉพาะตัวคุณ",
    srvMobileNum: "วิเคราะห์เบอร์มงคล (Lucky Mobile)",
    srvMobileNumDesc: "ถอดรหัสความหมายคู่ตัวเลขเบอร์โทรศัพท์มือถือที่ใช้งาน เพื่อปรับเสริมพลังบวกด้านเจรจาค้าขายและบารมี",
    srvGraph: "กราฟชีวิต 100 ปี (100-Year Life Graph)",
    srvGraphDesc: "ประมวลผลทิศทางดวงชะตาขึ้นลงในแต่ละทศวรรษ เพื่อช่วยวางแผนชีวิตระยะยาวอย่างปลอดภัยและมั่นคง",

    featuresTitle: "สิ่งที่จะได้รับการประมวลผล",
    featuresSub: "รายงานดวงชะตาระดับพรีเมียมที่ถูกจัดทำขึ้นหลังส่งข้อมูลเวลาเกิดและพิกัดดวงดาว",
    feat1: "สมดุลธาตุเกิด (Bazi Balance)",
    feat1Desc: "วิเคราะห์อัตราส่วนพลังงานธรรมชาติเพื่อนำมาปรับใช้ในสภาพแวดล้อมและห้องทำงานเพื่อการเจริญรุ่งเรือง",
    feat2: "จุดแข็ง & จุดทรานสิทดวง",
    feat2Desc: "ชี้ประเด็นสำคัญที่จะเกิดผลลัพธ์ที่ดี และจุดเฝ้าระวังช่วงปีชงหรือธาตุขัดแย้งเพื่อหลีกเลี่ยงความเสี่ยง",
    feat3: "แนวทางการงานที่รุ่งเรือง",
    feat3Desc: "แนะนำกลุ่มธุรกิจและอาชีพเสริมที่สอดรับกับธาตุเกิดและส่งพลังให้ชีวิตก้าวหน้าได้รวดเร็วที่สุด",
    feat4: "พื้นฐานความรักและคู่ครอง",
    feat4Desc: "วิเคราะห์ลักษณะดวงชะตาคู่ครองที่สมพงษ์ เกื้อหนุน และการปรับความสัมพันธ์ตามพลังธาตุธรรมชาติ",

    previewTitle: "ตัวอย่างหน้าแดชบอร์ดผลลัพธ์",
    previewSub: "ชาร์ตรายละเอียดข้อมูลที่จะแสดงผลทันทีหลังการคำนวณถอดรหัสลัคนาของคุุณ",
    tabBazi: "สมดุล 5 ธาตุหลัก",
    tabTarot: "ไพ่ทาโรต์นำชีวิต",
    tabGraph: "กราฟชีวิต 100 ปี",
    previewLockDesc: "กรอกข้อมูลในขั้นตอนด้านล่างเพื่อปลดล็อกกราฟทิศทางชะตารายทศวรรษของคุณ",
    btnUnlock: "🔮 ปลดล็อกดวงชะตาของฉันฟรี",

    testimonialsTitle: "ความรู้สึกจากผู้ใช้บริการลิขิตฟ้า",
    testimonialsSub: "เสียงสะท้อนจากบุคคลทั่วไปและนักธุรกิจที่ได้รับแผนผังวิเคราะห์ลิขิตฟ้า",
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

    bottomTitle: "พร้อมถอดรหัสและค้นพบแผนผังชะตาชีวิตของคุณหรือยัง?",
    bottomCta: "🔮 เริ่มถอดรหัสดวงชะตาวันนี้",
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
    
    heroTitle: "Decode Your Cosmic Blueprint & Destiny Map",
    heroSubtitle: "Analyze your elemental balance, discover structural strengths, and navigate critical transits with guidance from astronomical data and classic Bazi principles.",
    bullet1: "✨ Analyze your 5-element strengths & colors",
    bullet2: "🃏 Access tarot roadmap for love & work",
    bullet3: "🍀 Access lucky numbers and codes",
    btnHeroCta: "🔮 Begin Free Analysis",
    btnHeroSample: "Browse All Oracles",
    seekersCount: "Over 23,481+ seekers have checked their charts",
    
    calculatorTitle: "Live Destiny Calculation Machine",
    liveCalculating: "Recalculating planetary positions...",
    
    servicesTitle: "Astrology & Oracle Services",
    servicesSub: "Choose from our suite of professional calculators and interactive predictions free of charge.",
    srvBazi: "Chinese Bazi Calendar (Bazi Calendar)",
    srvBaziDesc: "Analyze Wood, Fire, Earth, Metal, and Water ratios to harmonize your internal energies for business and career success.",
    srvTarot: "Tarot Readings (Tarot Readings)",
    srvTarotDesc: "Unlock daily guidance and weekly forecast roadmaps across career, finance, and partnership fields.",
    srvSiemsi: "Siemsi Temple Oracle (Siemsi Oracle)",
    srvSiemsiDesc: "Shake the virtual cup and draw paper prophecy advice from famous Thailand temples for clear solutions.",
    srvDreams: "Dream Interpretation (Dream Interpretation)",
    srvDreamsDesc: "Decode your dreams into signs of warnings and receive your personalized lucky lottery numbers.",
    srvMobileNum: "Lucky Mobile Numbers (Lucky Mobile)",
    srvMobileNumDesc: "Parse the energy of your phone numbers to boost negotiation, wealth, and commercial status.",
    srvGraph: "100-Year Life Graph (100-Year Life Graph)",
    srvGraphDesc: "Map the rise and fall of your decade transit curves to plan career adjustments safely and long-term.",

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
      
      {/* 1. White Navbar Header matching the design reference layout */}
      <header className="sticky top-0 z-50 w-full bg-white border-b border-slate-200 py-3.5 px-6 md:px-12 flex justify-between items-center text-slate-700 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-b from-amber-500 to-amber-700 flex items-center justify-center border border-amber-500/20 shadow-xs">
            <Moon className="w-4 h-4 text-white" />
          </div>
          <div>
            <span className="font-serif font-black text-lg tracking-wider text-slate-900">{currentTranslations.brand}</span>
            <p className="text-[7px] text-slate-400 uppercase tracking-widest mt-0.5 font-bold">{currentTranslations.subtitle}</p>
          </div>
        </div>

        {/* Navigation links matching the design reference style */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-semibold text-slate-500">
          <a href="index.html" className="text-amber-600 hover:text-amber-700 transition-colors">หน้าแรก</a>
          <a href="chinese-calendar.html" className="hover:text-slate-900 transition-colors flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{currentTranslations.srvBazi}</a>
          <a href="tarot.html" className="hover:text-slate-900 transition-colors flex items-center gap-1"><Sparkles className="w-3.5 h-3.5" />{currentTranslations.srvTarot}</a>
          <a href="dashboard.html" className="hover:text-slate-900 transition-colors">{currentTranslations.navDashboard}</a>
        </nav>

        {/* Right buttons matching the design reference details */}
        <div className="flex items-center gap-4 text-xs font-medium text-slate-400">
          <div className="hidden lg:flex items-center gap-2.5 border-r border-slate-250 pr-4">
            <span className="cursor-pointer hover:text-slate-650 text-[10px]">A-</span>
            <span className="cursor-pointer hover:text-slate-650 font-bold text-slate-700">A</span>
            <span className="cursor-pointer hover:text-slate-650 text-[13px]">A+</span>
          </div>

          <button 
            onClick={() => setLang(prev => prev === "th" ? "en" : "th")}
            className="w-12 py-1 rounded border border-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-500 hover:text-slate-800 hover:bg-slate-50 transition-all"
          >
            {lang === "th" ? "TH / EN" : "EN / TH"}
          </button>
          
          <button 
            onClick={() => {
              setWizardOpen(true);
              setCurrentStep(1);
            }}
            className="px-4.5 py-2.5 text-xs font-extrabold rounded-lg bg-[#d97706] hover:bg-[#b45309] text-white shadow-md hover:scale-[1.01] transition-all cursor-pointer"
          >
            {currentTranslations.navGetStarted}
          </button>
        </div>
      </header>

      {/* 2. Deep Navy Blue Hero Section matching the image split screen exactly */}
      <section className="bg-[#0a0f24] text-white py-16 md:py-24 px-6 md:px-12 relative overflow-hidden">
        {/* Star orbit glow lines */}
        <div className="absolute inset-0 z-0 bg-cover bg-center bg-fixed opacity-[0.03] pointer-events-none"
          style={{ backgroundImage: "url('https://likitfah.com/img/9396.jpg')" }}
        ></div>
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          
          {/* Hero Left Content (7 columns) */}
          <div className="lg:col-span-7 flex flex-col gap-6 text-left items-start">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-400 text-[10px] font-semibold tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
              <span>⭐ Likit Fah Advisor & Astrology Consultant</span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black font-serif tracking-tight leading-tight lg:leading-[1.2] text-white">
              {currentTranslations.heroTitle.split(" ").map((w, idx) => (
                <span key={idx} className={w.includes("ชะตาชีวิต") || w.includes("Cosmic") ? "text-amber-400 block sm:inline" : ""}>
                  {w}{" "}
                </span>
              ))}
            </h1>

            <p className="text-xs md:text-sm text-slate-350 font-light leading-relaxed max-w-xl">
              {currentTranslations.heroSubtitle}
            </p>

            {/* Bullets */}
            <div className="flex flex-col gap-3.5 text-xs text-slate-200 font-semibold w-full">
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

            {/* Buttons matching the law layout styling */}
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full pt-3">
              <button 
                onClick={() => {
                  setWizardOpen(true);
                  setCurrentStep(1);
                }}
                className="w-full sm:w-auto px-7 py-4 rounded-lg bg-[#d97706] hover:bg-[#b45309] text-white font-extrabold text-xs transition-all hover:scale-[1.02] flex justify-center items-center gap-2 cursor-pointer shadow-[0_4px_25px_rgba(217,119,6,0.3)]"
              >
                <span>{currentTranslations.btnHeroCta}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              
              <a 
                href="#services-sec"
                className="w-full sm:w-auto px-7 py-4 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 text-white font-bold text-xs transition-all flex justify-center items-center gap-2 cursor-pointer"
              >
                <span>{currentTranslations.btnHeroSample}</span>
              </a>
            </div>

            <div className="flex items-center gap-2 text-slate-500 text-[10px] font-semibold mt-1">
              <Users className="w-3.5 h-3.5 text-amber-400" />
              <span>มีผู้ร่วมเดินทางตรวจสอบดวงชะตาแล้วกว่า 23,481+ คน</span>
            </div>
          </div>

          {/* Hero Right Content (5 columns) - Astrologer Portrait & Overlapping Badges exactly like the law layout */}
          <div className="lg:col-span-5 flex justify-center relative">
            <div className="relative w-full max-w-sm aspect-[3.2/4] rounded-2xl overflow-hidden border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
              {/* Astrologer image loaded locally */}
              <img 
                src="/astrologer.png" 
                alt="Astrologer Specialist" 
                className="w-full h-full object-cover"
              />
              
              {/* Astrologer image overlay dark gradient at bottom */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>

              {/* Floating Badge 1 (Top Left) */}
              <div className="absolute top-6 -left-4 z-20 bg-slate-950/80 backdrop-blur-md border border-amber-500/30 px-3.5 py-2.5 rounded-xl flex items-center gap-2.5 shadow-lg">
                <div className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center text-black text-xs font-black">99%</div>
                <div>
                  <div className="text-[9px] text-white font-bold">{lang === "th" ? "ความแม่นยำดวงชะตา" : "Cosmic Accuracy"}</div>
                  <div className="text-[8px] text-slate-400">{lang === "th" ? "อิงองศาดาวจริง" : "Celestial Aligned"}</div>
                </div>
              </div>

              {/* Floating Badge 2 (Bottom Right) */}
              <div className="absolute bottom-16 -right-4 z-20 bg-[#0a0f24]/90 border border-emerald-500/30 px-3.5 py-2.5 rounded-xl flex items-center gap-2.5 shadow-lg">
                <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                  <Check className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[9px] text-white font-bold">{lang === "th" ? "วิเคราะห์รายลัคนา" : "Ascendant Report"}</div>
                  <div className="text-[8px] text-slate-400">{lang === "th" ? "ประมวลผลด่วน 100%" : "Processed Instantly"}</div>
                </div>
              </div>

              {/* Nameplate Overlay Card (Bottom Center) */}
              <div className="absolute bottom-4 left-4 right-4 z-20 bg-white/95 backdrop-blur-md px-4 py-3 rounded-xl flex justify-between items-center shadow-lg border border-slate-200">
                <div className="text-left">
                  <h4 className="text-slate-900 font-serif font-black text-xs md:text-sm">{lang === "th" ? "อ. รินลดา โพธิ์ทอง" : "Linda Phothong"}</h4>
                  <p className="text-[9px] text-slate-500 mt-0.5 font-semibold uppercase tracking-wider">{lang === "th" ? "ผู้เชี่ยวชาญศาสตร์จีนสากล" : "Bazi Specialist & Advisor"}</p>
                </div>
                <div className="w-7 h-7 rounded-full bg-amber-550/10 flex items-center justify-center text-amber-600 border border-amber-500/20">
                  <Award className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 3. Services / Oracles Section (Light Theme with White Cards on Light Gray Background) */}
      <section id="services-sec" className="bg-[#f8fafc] text-slate-800 py-16 md:py-24 px-6 md:px-12 relative z-10 scroll-mt-16">
        <div className="max-w-6xl mx-auto flex flex-col gap-12">
          
          <div className="text-center flex flex-col gap-2">
            <h2 className="text-2xl md:text-3xl font-serif font-black text-slate-900">{currentTranslations.servicesTitle}</h2>
            <p className="text-slate-500 text-xs md:text-sm font-medium">{currentTranslations.servicesSub}</p>
            <div className="w-12 h-0.5 bg-[#d97706] mx-auto mt-2 rounded-full"></div>
          </div>

          {/* 6 Grid cards matching the layout and detail indicators */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Card 1: Bazi */}
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs hover:shadow-md hover:translate-y-[-2px] transition-all duration-300 flex flex-col justify-between min-h-[230px]">
              <div>
                <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600 mb-4 border border-amber-550/10">
                  <Calendar className="w-5 h-5" />
                </div>
                <h3 className="font-serif font-black text-slate-900 text-sm md:text-base mb-2">{currentTranslations.srvBazi}</h3>
                <p className="text-xs text-slate-500 leading-relaxed font-light">{currentTranslations.srvBaziDesc}</p>
              </div>
              <div className="flex justify-between items-center pt-4 border-t border-slate-100 mt-4 text-[11px] font-bold">
                <span className="text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-100">🏷️ ฟรีตลอดชีพ</span>
                <a href="chinese-calendar.html" className="text-slate-700 hover:text-slate-950 flex items-center gap-1 transition-colors">วิเคราะห์เลย →</a>
              </div>
            </div>

            {/* Card 2: Tarot */}
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs hover:shadow-md hover:translate-y-[-2px] transition-all duration-300 flex flex-col justify-between min-h-[230px]">
              <div>
                <div className="w-10 h-10 rounded-xl bg-amber-550/10 flex items-center justify-center text-amber-600 mb-4 border border-amber-550/10">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h3 className="font-serif font-black text-slate-900 text-sm md:text-base mb-2">{currentTranslations.srvTarot}</h3>
                <p className="text-xs text-slate-500 leading-relaxed font-light">{currentTranslations.srvTarotDesc}</p>
              </div>
              <div className="flex justify-between items-center pt-4 border-t border-slate-100 mt-4 text-[11px] font-bold">
                <span className="text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-100">🏷️ เปิดไพ่ฟรี</span>
                <a href="tarot.html" className="text-slate-700 hover:text-slate-950 flex items-center gap-1 transition-colors">ทำนายเลย →</a>
              </div>
            </div>

            {/* Card 3: Siemsi */}
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs hover:shadow-md hover:translate-y-[-2px] transition-all duration-300 flex flex-col justify-between min-h-[230px]">
              <div>
                <div className="w-10 h-10 rounded-xl bg-amber-550/10 flex items-center justify-center text-amber-600 mb-4 border border-amber-550/10">
                  <Compass className="w-5 h-5" />
                </div>
                <h3 className="font-serif font-black text-slate-900 text-sm md:text-base mb-2">{currentTranslations.srvSiemsi}</h3>
                <p className="text-xs text-slate-500 leading-relaxed font-light">{currentTranslations.srvSiemsiDesc}</p>
              </div>
              <div className="flex justify-between items-center pt-4 border-t border-slate-100 mt-4 text-[11px] font-bold">
                <span className="text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-100">🏷️ แม่นยำสูง</span>
                <a href="siemsi.html" className="text-slate-700 hover:text-slate-950 flex items-center gap-1 transition-colors">เสี่ยงเซียมซี →</a>
              </div>
            </div>

            {/* Card 4: Dreams */}
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs hover:shadow-md hover:translate-y-[-2px] transition-all duration-300 flex flex-col justify-between min-h-[230px]">
              <div>
                <div className="w-10 h-10 rounded-xl bg-amber-550/10 flex items-center justify-center text-amber-600 mb-4 border border-amber-550/10">
                  <BookOpen className="w-5 h-5" />
                </div>
                <h3 className="font-serif font-black text-slate-900 text-sm md:text-base mb-2">{currentTranslations.srvDreams}</h3>
                <p className="text-xs text-slate-500 leading-relaxed font-light">{currentTranslations.srvDreamsDesc}</p>
              </div>
              <div className="flex justify-between items-center pt-4 border-t border-slate-100 mt-4 text-[11px] font-bold">
                <span className="text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-100">🏷️ ฟรีไม่มีกั๊ก</span>
                <a href="dreams.html" className="text-slate-700 hover:text-slate-950 flex items-center gap-1 transition-colors">ดูคำทำนาย →</a>
              </div>
            </div>

            {/* Card 5: Mobile Num */}
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs hover:shadow-md hover:translate-y-[-2px] transition-all duration-300 flex flex-col justify-between min-h-[230px]">
              <div>
                <div className="w-10 h-10 rounded-xl bg-amber-550/10 flex items-center justify-center text-amber-600 mb-4 border border-amber-550/10">
                  <Phone className="w-5 h-5" />
                </div>
                <h3 className="font-serif font-black text-slate-900 text-sm md:text-base mb-2">{currentTranslations.srvMobileNum}</h3>
                <p className="text-xs text-slate-500 leading-relaxed font-light">{currentTranslations.srvMobileNumDesc}</p>
              </div>
              <div className="flex justify-between items-center pt-4 border-t border-slate-100 mt-4 text-[11px] font-bold">
                <span className="text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-100">🏷️ เสริมดวงการค้า</span>
                <a href="mobile-analysis.html" className="text-slate-700 hover:text-slate-950 flex items-center gap-1 transition-colors">วิเคราะห์เบอร์ →</a>
              </div>
            </div>

            {/* Card 6: Life Graph */}
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs hover:shadow-md hover:translate-y-[-2px] transition-all duration-300 flex flex-col justify-between min-h-[230px]">
              <div>
                <div className="w-10 h-10 rounded-xl bg-amber-550/10 flex items-center justify-center text-amber-600 mb-4 border border-amber-550/10">
                  <Activity className="w-5 h-5" />
                </div>
                <h3 className="font-serif font-black text-slate-900 text-sm md:text-base mb-2">{currentTranslations.srvGraph}</h3>
                <p className="text-xs text-slate-500 leading-relaxed font-light">{currentTranslations.srvGraphDesc}</p>
              </div>
              <div className="flex justify-between items-center pt-4 border-t border-slate-100 mt-4 text-[11px] font-bold">
                <span className="text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-100">🏷️ วิเคราะห์เจาะลึก</span>
                <a href="dashboard.html" className="text-slate-700 hover:text-slate-950 flex items-center gap-1 transition-colors">ดูตัวอย่าง →</a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* AdSense In-Feed Ad Slot Placeholder */}
      <div className="w-full max-w-4xl mx-auto rounded-xl border border-white/5 bg-slate-900/10 p-3 flex flex-col items-center justify-center text-[9px] text-slate-650 uppercase tracking-widest min-h-[90px] relative overflow-hidden my-4 z-10">
        <div className="absolute top-1 right-2 text-[7px] text-slate-700">AdSlot: Mid Banner</div>
        <span>Google AdSense Advertisement</span>
        <div className="text-[7px] text-slate-500 font-mono mt-1">&lt;ins class="adsbygoogle" style="display:inline-block;width:728px;height:90px"&gt;&lt;/ins&gt;</div>
      </div>

      {/* 4. Deep Navy Blue Footer Section matching the reference layout exactly */}
      <footer className="w-full bg-[#0a0f24] text-slate-400 py-16 px-6 md:px-12 relative z-10 border-t border-white/5">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 text-xs leading-relaxed">
          
          {/* Col 1: Logo & Brief Description */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-b from-amber-500 to-amber-700 flex items-center justify-center border border-amber-500/20 shadow-xs">
                <Moon className="w-4 h-4 text-white" />
              </div>
              <span className="font-serif font-black text-lg tracking-wider text-white">{currentTranslations.brand}</span>
            </div>
            <p className="text-slate-450 leading-relaxed font-light text-[11px]">{currentTranslations.footerDesc}</p>
          </div>

          {/* Col 2: เมนูด่วน (Quick Menu) */}
          <div className="space-y-3.5">
            <h5 className="font-serif font-black text-white text-xs uppercase tracking-wider">เมนูด่วน</h5>
            <ul className="space-y-2.5 font-light">
              <li><a href="index.html" className="hover:text-amber-400 transition-colors">หน้าแรก</a></li>
              <li><a href="chinese-calendar.html" className="hover:text-amber-400 transition-colors">ปฏิทินจีนบาจื่อ</a></li>
              <li><a href="tarot.html" className="hover:text-amber-400 transition-colors">ทำนายไพ่ยิปซี</a></li>
              <li><a href="siemsi.html" className="hover:text-amber-400 transition-colors">เสี่ยงเซียมซีนำทาง</a></li>
              <li><a href="dreams.html" className="hover:text-amber-400 transition-colors">ทำนายฝันพยากรณ์</a></li>
            </ul>
          </div>

          {/* Col 3: บริการหลัก (Main Services) */}
          <div className="space-y-3.5">
            <h5 className="font-serif font-black text-white text-xs uppercase tracking-wider">บริการหลัก</h5>
            <ul className="space-y-2.5 font-light">
              <li><a href="chinese-calendar.html" className="hover:text-amber-400 transition-colors">ถอดรหัส 5 ธาตุเกิด</a></li>
              <li><a href="dashboard.html" className="hover:text-amber-400 transition-colors">กราฟชีวิต 100 ปี</a></li>
              <li><a href="mobile-analysis.html" className="hover:text-amber-400 transition-colors">วิเคราะห์เบอร์โทรศัพท์</a></li>
              <li><a href="policy.html" className="hover:text-amber-400 transition-colors">นโยบายความเป็นส่วนตัว</a></li>
              <li><a href="terms.html" className="hover:text-amber-400 transition-colors">ข้อตกลงการใช้งาน</a></li>
            </ul>
          </div>

          {/* Col 4: ติดต่อสอบถาม (Contact Panel matching the reference UI boxes) */}
          <div className="space-y-4">
            <h5 className="font-serif font-black text-white text-xs uppercase tracking-wider">ติดต่อสอบถาม</h5>
            <div className="flex flex-col gap-3">
              <a 
                href="tel:0896636592" 
                className="bg-slate-900/60 hover:bg-slate-900/90 border border-white/5 hover:border-amber-500/20 px-4 py-3 rounded-lg flex items-center gap-3 transition-all text-slate-200"
              >
                <div className="w-8 h-8 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-500 border border-amber-500/20">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[8px] text-slate-500 uppercase tracking-widest font-bold">สายตรงเปิดดวง</div>
                  <div className="text-xs font-black font-mono">089-663-6592</div>
                </div>
              </a>

              <a 
                href="mailto:support@likitfah.com" 
                className="bg-slate-900/60 hover:bg-slate-900/90 border border-white/5 hover:border-amber-500/20 px-4 py-3 rounded-lg flex items-center gap-3 transition-all text-slate-200"
              >
                <div className="w-8 h-8 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-500 border border-amber-500/20">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[8px] text-slate-500 uppercase tracking-widest font-bold">ส่งอีเมลติดต่อ</div>
                  <div className="text-xs font-semibold font-mono">support@likitfah.com</div>
                </div>
              </a>
            </div>
          </div>

        </div>

        <div className="max-w-6xl mx-auto border-t border-white/5 mt-12 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] text-slate-550 font-medium">
          <p>&copy; 2026 JK LAW Advisor. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <span>•</span>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
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
        className={`fixed bottom-0 left-0 right-0 z-[90] bg-white border-t border-slate-200 px-4 py-3.5 shadow-2xl flex sm:hidden justify-center items-center transition-all duration-300 ${showStickyCta ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"}`}
      >
        <button 
          onClick={() => {
            setWizardOpen(true);
            setCurrentStep(1);
          }}
          className="w-full py-3.5 bg-[#d97706] hover:bg-[#b45309] text-white font-extrabold text-xs rounded-lg shadow-md flex justify-center items-center gap-1.5 cursor-pointer"
        >
          <span>{lang === "th" ? "🔮 ทำนายดวงชะตาสวรรค์ฟรี →" : "🔮 Free Destiny Reading →"}</span>
        </button>
      </div>

      {/* Interactive Step Wizard Modal (Overlay Dialog) */}
      {wizardOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#03040c]/90 backdrop-blur-xs">
          <div className="absolute inset-0" onClick={() => setWizardOpen(false)}></div>
          
          <div className="bg-[#0b0c16]/95 w-full max-w-md rounded-2xl p-6 md:p-8 relative border border-amber-500/20 shadow-2xl z-10 flex flex-col gap-6 backdrop-blur-md">
            
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
