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
  Phone,
  Bell,
  Menu
} from "lucide-react";

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
    a3: "ปลอดภัยสูงสุดแน่นอน ข้อมูลวันเดือนปีเกิดจะถูกประมวลผลสด in หน้าบราวเซอร์เพื่อวาดชาร์ตคำนวณ และจะไม่มีการจัดเก็บหรือส่งข้อมูลไปเผยแพร่ใดๆ ทั้งสิ้น",
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
  const [liveUserCount, setLiveUserCount] = useState(18);

  // Form Wizard states
  const [fullName, setFullName] = useState("");
  const [dob, setDob] = useState("");
  const [tob, setTob] = useState("12:00");
  const [noBirthTime, setNoBirthTime] = useState(false);
  const [formError, setFormError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionProgress, setSubmissionProgress] = useState(0);
  const [completedAnimationSteps, setCompletedAnimationSteps] = useState<number[]>([]);

  // Simulation of live active seekers
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

  return (
    <div className="min-h-screen bg-[#060214] text-slate-100 flex flex-col font-sans selection:bg-amber-500 selection:text-black relative pb-16 md:pb-0">
      
      {/* Mystical Nebula Glow Ambient Backgrounds */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[800px] overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-100px] left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-gradient-to-b from-purple-500/10 via-indigo-500/5 to-transparent rounded-full blur-[140px]"></div>
        <div className="absolute top-[250px] right-[5%] w-[350px] h-[350px] bg-amber-500/5 rounded-full blur-[100px]"></div>
      </div>

      {/* Floating Dark Navbar matching the mockup header */}
      <header className="sticky top-0 z-50 w-full bg-[#060214]/80 backdrop-blur-md border-b border-purple-950/20 py-4.5 px-6 md:px-12 flex justify-between items-center text-slate-200">
        <div className="flex items-center gap-4">
          <button className="text-slate-350 hover:text-white transition-colors cursor-pointer" aria-label="Menu">
            <Menu className="w-5 h-5" />
          </button>
        </div>

        {/* Center Logo matching mockup */}
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-full bg-gradient-to-b from-amber-500 to-amber-700 flex items-center justify-center border border-amber-500/30">
            <Moon className="w-4 h-4 text-white" />
          </div>
          <div className="text-center">
            <span className="font-serif font-black text-sm md:text-base tracking-wider text-title-gradient">Likit Fah</span>
            <p className="text-[6px] text-slate-500 uppercase tracking-widest mt-0.5 font-bold">ศาลาพยากรณ์</p>
          </div>
        </div>

        {/* Right tools matching mockup */}
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setLang(prev => prev === "th" ? "en" : "th")}
            className="text-[10px] font-bold text-slate-400 hover:text-amber-400 transition-all border border-purple-950/40 rounded px-1.5 py-0.5"
          >
            {lang === "th" ? "EN" : "TH"}
          </button>
          
          <button className="relative text-slate-350 hover:text-white transition-colors cursor-pointer" aria-label="Notifications">
            <Bell className="w-5 h-5" />
            <span className="absolute top-0 right-0 w-2 h-2 rounded-full bg-amber-500"></span>
          </button>
          
          <a href="profile.html" className="w-7 h-7 rounded-full bg-slate-900 border border-purple-950/50 flex items-center justify-center text-slate-400 hover:text-white transition-colors">
            <User className="w-4 h-4" />
          </a>
        </div>
      </header>

      {/* Main Content Container with Mockup Layout */}
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-8 md:py-12 relative z-10 flex flex-col gap-12">

        {/* 1. Hero Section - Mystic cosmic background and rotating zodiac */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-gradient-to-b from-[#120a2e]/30 to-transparent rounded-3xl p-6 md:p-8 border border-purple-950/20 relative overflow-hidden">
          {/* Subtle cosmic particle overlay */}
          <div className="absolute inset-0 bg-cover bg-center opacity-[0.05] pointer-events-none mix-blend-overlay" style={{ backgroundImage: "url('/zodiac_bg.png')" }}></div>
          
          {/* Left Text Column */}
          <div className="md:col-span-7 flex flex-col gap-5 text-left items-start z-10">
            <h1 className="text-3xl md:text-4xl font-extrabold text-white font-serif tracking-tight leading-tight">
              ค้นพบคำตอบ <br />
              <span className="text-amber-400">ที่จักรวาลอยากบอกคุณ</span>
            </h1>
            
            <p className="text-xs text-slate-400 font-light leading-relaxed max-w-md">
              ดูดวง แม่นยำ โดยนักพยากรณ์มืออาชีพ พร้อมให้คำแนะนำในทุกเรื่องของชีวิตและแผนผังธาตุกำเนิด
            </p>

            <div className="flex items-center gap-3.5 w-full pt-1">
              <button 
                onClick={() => {
                  setWizardOpen(true);
                  setCurrentStep(1);
                }}
                className="px-6 py-3 rounded-full bg-gradient-to-r from-amber-500 to-yellow-450 hover:from-amber-400 hover:to-yellow-350 text-black font-extrabold text-xs transition-all hover:scale-[1.02] shadow-[0_4px_25px_rgba(245,158,11,0.25)] flex items-center gap-1.5 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-black" />
                <span>ดูดวงของฉันเลย</span>
              </button>
              
              <button 
                onClick={() => setWizardOpen(true)}
                className="px-6 py-3 rounded-full border border-purple-500/20 bg-purple-950/15 hover:bg-purple-950/30 text-purple-300 font-bold text-xs transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <span>ปรึกษาเรื่องที่กังวล</span>
              </button>
            </div>

            {/* Mockup Trust Indicators underneath Hero */}
            <div className="grid grid-cols-3 gap-3 border-t border-purple-950/30 pt-5 mt-3 w-full">
              <div className="flex items-start gap-2 text-left">
                <ShieldCheck className="w-4.5 h-4.5 text-amber-550 shrink-0 mt-0.5" />
                <div>
                  <div className="text-[10px] text-white font-bold">แม่นยำ</div>
                  <div className="text-[7.5px] text-slate-500">โดยนักพยากรณ์มืออาชีพ</div>
                </div>
              </div>
              <div className="flex items-start gap-2 text-left">
                <Lock className="w-4.5 h-4.5 text-amber-550 shrink-0 mt-0.5" />
                <div>
                  <div className="text-[10px] text-white font-bold">ปลอดภัย</div>
                  <div className="text-[7.5px] text-slate-500">ข้อมูลของคุณเป็นความลับ</div>
                </div>
              </div>
              <div className="flex items-start gap-2 text-left">
                <Award className="w-4.5 h-4.5 text-amber-550 shrink-0 mt-0.5" />
                <div>
                  <div className="text-[10px] text-white font-bold">ครบทุกศาสตร์</div>
                  <div className="text-[7.5px] text-slate-500">ไพ่ยิปซี, ฮวงจุ้ย, บาจื่อ</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Zodiac Wheel Image Column */}
          <div className="md:col-span-5 flex justify-center items-center relative z-10">
            <div className="relative w-48 h-48 md:w-56 md:h-56">
              {/* Star dust halo */}
              <div className="absolute inset-[-10px] bg-purple-650/10 rounded-full blur-2xl animate-pulse"></div>
              {/* Glowing Zodiac Background Rotating */}
              <img 
                src="/zodiac_bg.png" 
                alt="Astrology Zodiac Chart Wheel" 
                className="w-full h-full object-contain animate-spin-slow filter drop-shadow-[0_0_20px_rgba(245,158,11,0.2)]"
              />
            </div>
          </div>
        </section>

        {/* AdSense Top Ad Slot Placeholder */}
        <div className="w-full rounded-xl border border-purple-950/20 bg-[#120a2e]/10 p-2.5 flex flex-col items-center justify-center text-[9px] text-slate-650 uppercase tracking-widest min-h-[90px] relative overflow-hidden">
          <div className="absolute top-1 right-2 text-[7px] text-slate-700">AdSlot: Top Banner</div>
          <span>Google AdSense Advertisement</span>
          <div className="text-[7px] text-slate-500 font-mono mt-1">&lt;ins class="adsbygoogle" style="display:inline-block;width:728px;height:90px"&gt;&lt;/ins&gt;</div>
        </div>

        {/* 2. Services Grid Section (บริการของเรา) - 8 circular mystical services */}
        <section className="flex flex-col gap-4">
          <div className="flex justify-between items-center px-1">
            <h2 className="text-base md:text-lg font-serif font-black text-white">บริการของเรา</h2>
            <a href="chinese-calendar.html" className="text-xs text-purple-400 hover:text-purple-300 font-bold">ดูทั้งหมด &gt;</a>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            
            {/* Service 1: Tarot Card */}
            <div 
              onClick={() => {
                setWizardOpen(true);
                setCurrentStep(1);
              }}
              className="bg-gradient-to-b from-[#120a2e]/50 to-[#060214]/80 border border-purple-950/30 p-5 rounded-2xl flex flex-col items-center text-center cursor-pointer hover:border-purple-500/40 hover:scale-[1.01] transition-all group"
            >
              <div className="w-16 h-16 rounded-full bg-[#1c1242] flex items-center justify-center text-amber-400 mb-3 border border-purple-500/10 shadow-[0_0_15px_rgba(139,92,246,0.15)] group-hover:shadow-[0_0_20px_rgba(245,158,11,0.25)] transition-all">
                <Sparkles className="w-6 h-6 text-amber-400" />
              </div>
              <h3 className="text-xs font-bold text-white mb-1">ดูดวงไพ่ยิปซี</h3>
              <p className="text-[9px] text-slate-500 font-light leading-relaxed">ไพ่คำทำนายด้วยไพ่ยิปซี 78 ใบ</p>
            </div>

            {/* Service 2: Bazi Calendar / Monthly */}
            <div 
              onClick={() => {
                setWizardOpen(true);
                setCurrentStep(1);
              }}
              className="bg-gradient-to-b from-[#120a2e]/50 to-[#060214]/80 border border-purple-950/30 p-5 rounded-2xl flex flex-col items-center text-center cursor-pointer hover:border-purple-500/40 hover:scale-[1.01] transition-all group"
            >
              <div className="w-16 h-16 rounded-full bg-[#1c1242] flex items-center justify-center text-indigo-400 mb-3 border border-purple-500/10 shadow-[0_0_15px_rgba(139,92,246,0.15)] group-hover:shadow-[0_0_20px_rgba(139,92,246,0.25)] transition-all">
                <Compass className="w-6 h-6 text-indigo-400" />
              </div>
              <h3 className="text-xs font-bold text-white mb-1">ดูดวงรายเดือน</h3>
              <p className="text-[9px] text-slate-500 font-light leading-relaxed">ทำนายดวงชะตา 12 ราศีเจาะลึก</p>
            </div>

            {/* Service 3: Love */}
            <div 
              onClick={() => {
                setWizardOpen(true);
                setCurrentStep(1);
              }}
              className="bg-gradient-to-b from-[#120a2e]/50 to-[#060214]/80 border border-purple-950/30 p-5 rounded-2xl flex flex-col items-center text-center cursor-pointer hover:border-purple-500/40 hover:scale-[1.01] transition-all group"
            >
              <div className="w-16 h-16 rounded-full bg-[#1c1242] flex items-center justify-center text-pink-400 mb-3 border border-purple-500/10 shadow-[0_0_15px_rgba(244,114,182,0.15)] group-hover:shadow-[0_0_20px_rgba(244,114,182,0.25)] transition-all">
                <Moon className="w-6 h-6 text-pink-400" />
              </div>
              <h3 className="text-xs font-bold text-white mb-1">ดูดวงความรัก</h3>
              <p className="text-[9px] text-slate-500 font-light leading-relaxed">เช็คดวงความรัก เนื้อคู่ คนโสด</p>
            </div>

            {/* Service 4: Personal Expert */}
            <div 
              onClick={() => {
                setWizardOpen(true);
                setCurrentStep(1);
              }}
              className="bg-gradient-to-b from-[#120a2e]/50 to-[#060214]/80 border border-purple-950/30 p-5 rounded-2xl flex flex-col items-center text-center cursor-pointer hover:border-purple-500/40 hover:scale-[1.01] transition-all group"
            >
              <div className="w-16 h-16 rounded-full bg-[#1c1242] flex items-center justify-center text-cyan-400 mb-3 border border-purple-500/10 shadow-[0_0_15px_rgba(34,211,238,0.15)] group-hover:shadow-[0_0_20px_rgba(34,211,238,0.25)] transition-all">
                <User className="w-6 h-6 text-cyan-400" />
              </div>
              <h3 className="text-xs font-bold text-white mb-1">ดูดวงส่วนตัว</h3>
              <p className="text-[9px] text-slate-500 font-light leading-relaxed">ปรึกษาส่วนตัวกับนักพยากรณ์</p>
            </div>

            {/* Service 5: Money & Career */}
            <div 
              onClick={() => {
                setWizardOpen(true);
                setCurrentStep(1);
              }}
              className="bg-gradient-to-b from-[#120a2e]/50 to-[#060214]/80 border border-purple-950/30 p-5 rounded-2xl flex flex-col items-center text-center cursor-pointer hover:border-purple-500/40 hover:scale-[1.01] transition-all group"
            >
              <div className="w-16 h-16 rounded-full bg-[#1c1242] flex items-center justify-center text-orange-400 mb-3 border border-purple-500/10 shadow-[0_0_15px_rgba(251,146,60,0.15)] group-hover:shadow-[0_0_20px_rgba(251,146,60,0.25)] transition-all">
                <Activity className="w-6 h-6 text-orange-400" />
              </div>
              <h3 className="text-xs font-bold text-white mb-1">การเงิน การงาน</h3>
              <p className="text-[9px] text-slate-500 font-light leading-relaxed">วิเคราะห์เจาะลึกตำแหน่งกระแสดวง</p>
            </div>

            {/* Service 6: Feng Shui */}
            <div 
              onClick={() => {
                setWizardOpen(true);
                setCurrentStep(1);
              }}
              className="bg-gradient-to-b from-[#120a2e]/50 to-[#060214]/80 border border-purple-950/30 p-5 rounded-2xl flex flex-col items-center text-center cursor-pointer hover:border-purple-500/40 hover:scale-[1.01] transition-all group"
            >
              <div className="w-16 h-16 rounded-full bg-[#1c1242] flex items-center justify-center text-emerald-400 mb-3 border border-purple-500/10 shadow-[0_0_15px_rgba(52,211,153,0.15)] group-hover:shadow-[0_0_20px_rgba(52,211,153,0.25)] transition-all">
                <ShieldCheck className="w-6 h-6 text-emerald-400" />
              </div>
              <h3 className="text-xs font-bold text-white mb-1">ฮวงจุ้ย</h3>
              <p className="text-[9px] text-slate-500 font-light leading-relaxed">ปรับดวงชะตาสถานที่อยู่อาศัย</p>
            </div>

            {/* Service 7: Auspicious Timing */}
            <div 
              onClick={() => {
                setWizardOpen(true);
                setCurrentStep(1);
              }}
              className="bg-gradient-to-b from-[#120a2e]/50 to-[#060214]/80 border border-purple-950/30 p-5 rounded-2xl flex flex-col items-center text-center cursor-pointer hover:border-purple-500/40 hover:scale-[1.01] transition-all group"
            >
              <div className="w-16 h-16 rounded-full bg-[#1c1242] flex items-center justify-center text-red-400 mb-3 border border-purple-500/10 shadow-[0_0_15px_rgba(248,113,113,0.15)] group-hover:shadow-[0_0_20px_rgba(248,113,113,0.25)] transition-all">
                <Calendar className="w-6 h-6 text-red-400" />
              </div>
              <h3 className="text-xs font-bold text-white mb-1">ฤกษ์มงคล</h3>
              <p className="text-[9px] text-slate-500 font-light leading-relaxed">เลือกเวลาฤกษ์เริ่มสิ่งสำคัญ</p>
            </div>

            {/* Service 8: Palmistry */}
            <div 
              onClick={() => {
                setWizardOpen(true);
                setCurrentStep(1);
              }}
              className="bg-gradient-to-b from-[#120a2e]/50 to-[#060214]/80 border border-purple-950/30 p-5 rounded-2xl flex flex-col items-center text-center cursor-pointer hover:border-purple-500/40 hover:scale-[1.01] transition-all group"
            >
              <div className="w-16 h-16 rounded-full bg-[#1c1242] flex items-center justify-center text-teal-400 mb-3 border border-purple-500/10 shadow-[0_0_15px_rgba(45,212,191,0.15)] group-hover:shadow-[0_0_20px_rgba(45,212,191,0.25)] transition-all">
                <BookOpen className="w-6 h-6 text-teal-400" />
              </div>
              <h3 className="text-xs font-bold text-white mb-1">ลายมือ</h3>
              <p className="text-[9px] text-slate-500 font-light leading-relaxed">ถอดลายมือวิเคราะห์เส้นชีวิต</p>
            </div>

          </div>
        </section>

        {/* 3. Recommendation Highlight Section (แนะนำสำหรับคุณ) */}
        <section className="flex flex-col gap-4">
          <div className="flex justify-between items-center px-1">
            <h2 className="text-base md:text-lg font-serif font-black text-white">แนะนำสำหรับคุณ</h2>
            <a href="tarot.html" className="text-xs text-purple-400 hover:text-purple-300 font-bold">ดูทั้งหมด &gt;</a>
          </div>

          {/* Horizontal Highlight Card matching mockup */}
          <div className="bg-[#0b061e]/40 rounded-2xl border border-purple-950/30 overflow-hidden flex flex-col sm:flex-row gap-5 p-4 items-center">
            {/* Left side image banner */}
            <div className="w-full sm:w-1/3 aspect-[1.8/1] sm:aspect-[1.5/1] rounded-xl overflow-hidden relative border border-purple-950/20 shrink-0">
              <img 
                src="/tarot_banner.png" 
                alt="Tarot recommended banner" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0b061e]/20"></div>
            </div>

            {/* Right side copy and CTA */}
            <div className="flex-1 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 w-full text-left">
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-white">เปิดไพ่พลังจักรวาล</h3>
                <p className="text-[10px] text-slate-450 leading-relaxed font-light">เปิดไพ่ 3 ใบ รับคำแนะนำจากจักรวาล เพื่อค้นพบแนวทางที่ดีที่สุดสำหรับคุณในการดำเนินชีวิต</p>
                <div className="flex items-center gap-2.5 pt-1">
                  <span className="text-amber-400 font-black text-xs">199.-</span>
                  <span className="text-slate-500 line-through text-[9px]">299.-</span>
                </div>
              </div>
              <button 
                onClick={() => {
                  setWizardOpen(true);
                  setCurrentStep(1);
                }}
                className="px-5 py-3 rounded-lg bg-gradient-to-r from-amber-500 to-yellow-450 hover:from-amber-400 hover:to-yellow-350 text-black font-extrabold text-[10px] shadow-sm flex items-center gap-1.5 cursor-pointer shrink-0"
              >
                <span>ดูรายละเอียด 👈</span>
              </button>
            </div>
          </div>
        </section>

        {/* AdSense Mid-Feed Ad Slot Placeholder */}
        <div className="w-full rounded-xl border border-purple-950/20 bg-[#120a2e]/10 p-2.5 flex flex-col items-center justify-center text-[9px] text-slate-650 uppercase tracking-widest min-h-[90px] relative overflow-hidden my-1">
          <div className="absolute top-1 right-2 text-[7px] text-slate-700">AdSlot: Mid Banner</div>
          <span>Google AdSense Advertisement</span>
          <div className="text-[7px] text-slate-500 font-mono mt-1">&lt;ins class="adsbygoogle" style="display:inline-block;width:728px;height:90px"&gt;&lt;/ins&gt;</div>
        </div>

        {/* 4. Articles & Guides Section (บทความ & คู่มือ) */}
        <section className="flex flex-col gap-4">
          <div className="flex justify-between items-center px-1">
            <h2 className="text-base md:text-lg font-serif font-black text-white">บทความ & คู่มือ</h2>
            <a href="dreams.html" className="text-xs text-purple-400 hover:text-purple-300 font-bold">ดูทั้งหมด &gt;</a>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            
            {/* Article 1 */}
            <a href="chinese-calendar.html" className="bg-[#0b061e]/20 border border-purple-950/30 rounded-xl overflow-hidden flex flex-col justify-between hover:border-purple-500/30 transition-all shadow-sm">
              <div className="aspect-[1.5/1] overflow-hidden w-full relative">
                <img src="/zodiac_bg.png" alt="Zodiac Forecast Article" className="w-full h-full object-cover" />
              </div>
              <div className="p-3 text-left space-y-1">
                <h4 className="text-[10px] font-bold text-white line-clamp-2">เช็คดวงรายเดือนทั้ง 12 ราศี</h4>
                <span className="text-[7px] text-slate-500 block">20 พ.ค. 2567</span>
              </div>
            </a>

            {/* Article 2 */}
            <a href="dreams.html" className="bg-[#0b061e]/20 border border-purple-950/30 rounded-xl overflow-hidden flex flex-col justify-between hover:border-purple-500/30 transition-all shadow-sm">
              <div className="aspect-[1.5/1] overflow-hidden w-full relative">
                <img src="/art_coins.png" alt="Wealth Article" className="w-full h-full object-cover" />
              </div>
              <div className="p-3 text-left space-y-1">
                <h4 className="text-[10px] font-bold text-white line-clamp-2">5 วิธีเสริมดวงการเงินให้ปังตลอดปี 2567</h4>
                <span className="text-[7px] text-slate-500 block">18 พ.ค. 2567</span>
              </div>
            </a>

            {/* Article 3 */}
            <a href="tarot.html" className="bg-[#0b061e]/20 border border-purple-950/30 rounded-xl overflow-hidden flex flex-col justify-between hover:border-purple-500/30 transition-all shadow-sm">
              <div className="aspect-[1.5/1] overflow-hidden w-full relative">
                <img src="/art_love.png" alt="Love Article" className="w-full h-full object-cover" />
              </div>
              <div className="p-3 text-left space-y-1">
                <h4 className="text-[10px] font-bold text-white line-clamp-2">ดูดวงความรัก คนโสด vs คนมีคู่</h4>
                <span className="text-[7px] text-slate-500 block">15 พ.ค. 2567</span>
              </div>
            </a>

            {/* Article 4 */}
            <a href="dreams.html" className="bg-[#0b061e]/20 border border-purple-950/30 rounded-xl overflow-hidden flex flex-col justify-between hover:border-purple-500/30 transition-all shadow-sm">
              <div className="aspect-[1.5/1] overflow-hidden w-full relative">
                <img src="/art_bedroom.png" alt="Bedroom Feng Shui Article" className="w-full h-full object-cover" />
              </div>
              <div className="p-3 text-left space-y-1">
                <h4 className="text-[10px] font-bold text-white line-clamp-2">ฮวงจุ้ยห้องนอน เสริมรัก เสริมโชค</h4>
                <span className="text-[7px] text-slate-500 block">10 พ.ค. 2567</span>
              </div>
            </a>

          </div>
        </section>

        {/* AdSense Bottom Ad Slot Placeholder */}
        <div className="w-full rounded-xl border border-purple-950/20 bg-[#120a2e]/10 p-2.5 flex flex-col items-center justify-center text-[9px] text-slate-655 uppercase tracking-widest min-h-[90px] relative overflow-hidden my-1">
          <div className="absolute top-1 right-2 text-[7px] text-slate-700">AdSlot: Bottom Banner</div>
          <span>Google AdSense Advertisement</span>
          <div className="text-[7px] text-slate-500 font-mono mt-1">&lt;ins class="adsbygoogle" style="display:inline-block;width:728px;height:90px"&gt;&lt;/ins&gt;</div>
        </div>

        {/* 5. Promotion Membership Banner at the bottom */}
        <section className="bg-gradient-to-r from-purple-950/30 via-[#120a2e]/60 to-purple-950/30 border border-purple-500/20 rounded-3xl p-6 md:p-8 flex flex-col sm:flex-row justify-between items-center gap-6 relative overflow-hidden">
          {/* Glowing stardust overlay decoration */}
          <div className="absolute top-0 right-0 w-44 h-full pointer-events-none opacity-20 select-none">
            <img src="/tarot_banner.png" alt="Tarot cards promo art overlay" className="w-full h-full object-cover" />
          </div>

          <div className="text-left space-y-3 z-10">
            <span className="text-[8px] font-bold uppercase tracking-wider text-amber-500">สมัครสมาชิกวันนี้</span>
            <h2 className="text-lg md:text-xl font-serif font-black text-white">รับสิทธิพิเศษทันที!</h2>
            
            <div className="flex flex-col gap-1.5 text-[10px] text-slate-300 font-medium">
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>ดูดวงรายวันไม่จำกัด</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>ส่วนลดบริการคำพากย์พิเศษ 10%</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>สิทธิ์ปรึกษารายวันพิเศษราคาเฉพาะสมาชิก</span>
              </div>
            </div>
          </div>

          <button 
            onClick={() => {
              setWizardOpen(true);
              setCurrentStep(1);
            }}
            className="px-6 py-3 rounded-full bg-gradient-to-r from-amber-500 to-yellow-450 hover:from-amber-400 hover:to-yellow-350 text-black font-extrabold text-xs shadow-md transition-all hover:scale-[1.02] flex items-center gap-1.5 cursor-pointer z-10 shrink-0"
          >
            <span>สมัครสมาชิก ✛</span>
          </button>
        </section>

      </main>

      {/* Real Footer with Social Media Links */}
      <footer className="w-full bg-[#020108] border-t border-purple-950/20 py-8 px-6 md:px-12 mt-12 relative z-10 text-slate-500 text-xs">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[10px] font-medium">&copy; 2026 Likit Fah ศาลาพยากรณ์ All rights reserved.</p>
          
          <div className="flex gap-4 text-base">
            <a href="#" className="hover:text-white transition-colors" aria-label="Facebook"><Share2 className="w-4 h-4" /></a>
            <a href="#" className="hover:text-white transition-colors" aria-label="Line"><Mail className="w-4 h-4" /></a>
            <a href="#" className="hover:text-white transition-colors" aria-label="Instagram"><Globe className="w-4 h-4" /></a>
          </div>
        </div>
      </footer>

      {/* 6. Sticky Mobile Bottom Navigation Bar matching mockup */}
      <div className="fixed bottom-0 left-0 right-0 z-[100] bg-[#060214]/90 backdrop-blur-md border-t border-purple-950/20 py-2.5 px-4 flex justify-around items-center text-slate-400 text-[10px] md:hidden shadow-[0_-2px_15px_rgba(0,0,0,0.4)]">
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
