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
  Phone,
  BookOpen
} from "lucide-react";

export default function Home() {
  const [lang, setLang] = useState<"th" | "en">("th");
  const [wizardOpen, setWizardOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [faqOpen, setFaqOpen] = useState<number | null>(null);
  const [liveUserCount, setLiveUserCount] = useState(18);
  const [previewTab, setPreviewTab] = useState<"bazi" | "tarot" | "graph">("bazi");

  // Live Interactive Calculator States (Inside Hero Showcase!)
  const [calcName, setCalcName] = useState("");
  const [calcDob, setCalcDob] = useState("1994-06-23");
  const [calcTob, setCalcTob] = useState("15:30");
  const [calcNoTime, setCalcNoTime] = useState(false);
  const [isLiveCalculating, setIsLiveCalculating] = useState(false);

  // Simulated Bazi Elements derived from inputs
  const [elements, setElements] = useState({
    wood: 35,
    fire: 22,
    earth: 15,
    metal: 18,
    water: 10
  });

  const [pillars, setPillars] = useState({
    year: { stem: "甲", branch: "戌", stemName: "Yang Wood", branchName: "Dog" },
    month: { stem: "庚", branch: "午", stemName: "Yang Metal", branchName: "Horse" },
    day: { stem: "丙", branch: "子", stemName: "Yang Fire", branchName: "Rat" },
    hour: { stem: "己", branch: "亥", stemName: "Yin Earth", branchName: "Pig" }
  });

  // Calculate live values whenever inputs change
  useEffect(() => {
    setIsLiveCalculating(true);
    const timer = setTimeout(() => {
      const seed = calcDob.split("-").reduce((acc, val) => acc + parseInt(val || "0"), 0) + 
                   (calcNoTime ? 12 : parseInt(calcTob.split(":")[0] || "0") * 3);
      
      const wood = Math.max(10, Math.min(50, ((seed * 7) % 40) + 10));
      const fire = Math.max(10, Math.min(45, ((seed * 11) % 35) + 10));
      const earth = Math.max(8, Math.min(35, ((seed * 3) % 25) + 10));
      const metal = Math.max(8, Math.min(30, ((seed * 17) % 20) + 10));
      const water = 100 - (wood + fire + earth + metal);

      const stems = ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"];
      const stemNames = ["Yang Wood", "Yin Wood", "Yang Fire", "Yin Fire", "Yang Earth", "Yin Earth", "Yang Metal", "Yin Metal", "Yang Water", "Yin Water"];
      const branches = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"];
      const branchNames = ["Rat", "Ox", "Tiger", "Rabbit", "Dragon", "Snake", "Horse", "Goat", "Monkey", "Rooster", "Dog", "Pig"];

      setPillars({
        year: { stem: stems[seed % 10], branch: branches[(seed + 2) % 12], stemName: stemNames[seed % 10], branchName: branchNames[(seed + 2) % 12] },
        month: { stem: stems[(seed + 3) % 10], branch: branches[(seed + 7) % 12], stemName: stemNames[(seed + 3) % 10], branchName: branchNames[(seed + 7) % 12] },
        day: { stem: stems[(seed + 6) % 10], branch: branches[(seed + 1) % 12], stemName: stemNames[(seed + 6) % 10], branchName: branchNames[(seed + 1) % 12] },
        hour: { stem: stems[(seed * 2) % 10], branch: branches[(seed * 3) % 12], stemName: stemNames[(seed * 2) % 10], branchName: branchNames[(seed * 3) % 12] }
      });

      setElements({ wood, fire, earth, metal, water });
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

  // Translation dict
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
      bullet1: "วิเคราะห์สมดุลธาตุใน 3 นาที",
      bullet2: "รู้ลึกจังหวะการงาน การเงิน ความรักรายปี",
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
      a4: "ระบบผสานพิกัดองศาดาวจริงทางดาราศาสตร์สากลเข้ากับวิชาพลัง 5 ธาตุและปฏิทินจีนบาจื่อดั้งเดิมเพื่อความครอบคลุมและแม่นยำที่สุด",
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
      bullet1: "Analyze elements balance in 3 minutes",
      bullet2: "Decode career, wealth & love yearly transits",
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
      rev2: "I love the clean, modern dashboard design. Visualizing Bazi coordinates makes it easy to digest.",
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

  const currentTranslations = t[lang];

  // Wizard Navigation
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
    <div className="min-h-screen bg-[#03040c] bg-[linear-gradient(to_right,#1f293708_1px,transparent_1px),linear-gradient(to_bottom,#1f293708_1px,transparent_1px)] bg-[size:4rem_4rem] text-slate-100 flex flex-col font-sans selection:bg-violet-500 selection:text-white relative">
      
      {/* Linear SaaS Glowing Radial Lights */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[800px] overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-150px] left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-gradient-to-b from-indigo-500/10 via-violet-500/5 to-transparent rounded-full blur-[140px]"></div>
        <div className="absolute top-[200px] left-[15%] w-[350px] h-[350px] bg-amber-500/5 rounded-full blur-[100px]"></div>
      </div>

      {/* Floating Header */}
      <header className="sticky top-0 z-50 w-full bg-[#03040c]/70 backdrop-blur-md border-b border-white/5 py-4 px-6 md:px-12 flex justify-between items-center transition-all duration-300">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-b from-violet-600 to-indigo-950 flex items-center justify-center border border-violet-500/30 shadow-[0_0_10px_rgba(139,92,246,0.2)]">
            <Moon className="w-4.5 h-4.5 text-yellow-300" />
          </div>
          <div>
            <span className="font-serif font-black text-lg tracking-wider text-title-gradient">{currentTranslations.brand}</span>
            <p className="text-[7px] text-slate-500 uppercase tracking-widest mt-0.5 font-bold">{currentTranslations.subtitle}</p>
          </div>
        </div>

        {/* Desktop Nav links */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-medium text-slate-400">
          <a href="tarot.html" className="hover:text-white transition-colors flex items-center gap-1.5"><Sparkles className="w-3.5 h-3.5" />{currentTranslations.navTarot}</a>
          <a href="chinese-calendar.html" className="hover:text-white transition-colors flex items-center gap-1.5"><Compass className="w-3.5 h-3.5" />{currentTranslations.navCalendar}</a>
          <a href="dashboard.html" className="hover:text-white transition-colors">{currentTranslations.navDashboard}</a>
        </nav>

        {/* Right Nav buttons */}
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setLang(prev => prev === "th" ? "en" : "th")}
            className="w-8 h-8 rounded-lg border border-white/5 flex items-center justify-center text-xs font-bold text-slate-400 hover:text-white hover:bg-white/5 transition-all"
            aria-label="Toggle language"
          >
            {lang === "th" ? "EN" : "TH"}
          </button>
          
          <button 
            onClick={() => {
              setWizardOpen(true);
              setCurrentStep(1);
            }}
            className="px-4 py-2 text-xs font-extrabold rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white shadow-md hover:shadow-violet-600/25 hover:scale-[1.02] transition-all flex items-center gap-1 cursor-pointer"
          >
            {currentTranslations.navGetStarted}
          </button>
        </div>
      </header>

      {/* Main Content Container with SaaS wide Layout */}
      <main className="flex-1 max-w-6xl mx-auto w-full px-6 py-12 md:py-20 relative z-10 flex flex-col gap-24">

        {/* AdSense Top Ad Slot Placeholder */}
        <div className="w-full max-w-4xl mx-auto rounded-xl border border-white/5 bg-slate-900/10 p-3 flex flex-col items-center justify-center text-[9px] text-slate-600 uppercase tracking-widest min-h-[90px] relative overflow-hidden">
          <div className="absolute top-1 right-2 text-[7px] text-slate-700">AdSlot: Top Banner</div>
          <span>Google AdSense Advertisement</span>
          <div className="text-[7px] text-slate-500 font-mono mt-1">&lt;ins class="adsbygoogle" style="display:inline-block;width:728px;height:90px"&gt;&lt;/ins&gt;</div>
        </div>

        {/* Hero Section - Split Screen layout (SaaS style with left text, right interactive calculator!) */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Hero Left Content (5 columns) */}
          <div className="lg:col-span-5 flex flex-col gap-6 text-left items-start">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/25 text-violet-400 text-[10px] font-bold uppercase tracking-wider animate-pulse-subtle">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
              <span>Celestial Algorithm v2.0</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white font-serif tracking-tight leading-tight lg:leading-[1.1] text-saas-gradient">
              {currentTranslations.heroTitle}
            </h1>

            <p className="text-xs md:text-sm text-slate-400 font-light leading-relaxed">
              {currentTranslations.heroSubtitle}
            </p>

            <div className="flex flex-col gap-3 text-xs text-slate-300 font-semibold w-full">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{currentTranslations.bullet1}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{currentTranslations.bullet2}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 w-full pt-2">
              <button 
                onClick={() => {
                  setWizardOpen(true);
                  setCurrentStep(1);
                }}
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 hover:from-amber-400 hover:via-yellow-300 hover:to-amber-400 text-black font-extrabold text-xs shadow-[0_4px_25px_rgba(245,158,11,0.25)] transition-all hover:scale-[1.02] flex justify-center items-center gap-2 border border-yellow-300/30 cursor-pointer"
              >
                <span>{currentTranslations.btnHeroCta}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center gap-2 text-slate-500 text-[10px] font-semibold">
              <Users className="w-3.5 h-3.5 text-violet-400" />
              <span>{currentTranslations.seekersCount}</span>
            </div>
          </div>

          {/* Hero Right Content - Interactive Bazi Calculator Showcase (7 columns) */}
          <div className="lg:col-span-7 bg-[#0b0c16]/60 rounded-2xl border border-white/10 p-6 md:p-7 flex flex-col gap-5 relative overflow-hidden shadow-2xl backdrop-blur-md">
            {/* Spinning subtle astrology circles background */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] border border-dashed border-white/5 rounded-full pointer-events-none animate-spin-slow opacity-15"></div>

            <div className="flex items-center justify-between border-b border-white/5 pb-3 gap-4 relative z-10">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-violet-600/10 border border-violet-500/20 flex items-center justify-center text-violet-400">
                  {isLiveCalculating ? <Loader2 className="w-4.5 h-4.5 animate-spin" /> : <Activity className="w-4.5 h-4.5 animate-pulse" />}
                </div>
                <div>
                  <h4 className="text-white font-bold text-xs">{calcName ? calcName : (lang === "en" ? "Guest Seeker" : "ผู้เข้าตรวจดวงชะตา")}</h4>
                  <p className="text-[9px] text-slate-500 font-mono">
                    Element: <span className="text-emerald-400 font-bold uppercase">{pillars.day.stemName} ({pillars.day.stem})</span>
                  </p>
                </div>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[9px] font-bold">Interactive Sandbox</span>
            </div>

            {/* Sandbox Inputs integrated directly above Bazi output inside the card */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 relative z-10">
              <div className="flex flex-col gap-1">
                <label className="text-[8px] font-bold text-slate-500 uppercase tracking-wider">Seeker Name</label>
                <input 
                  type="text" 
                  value={calcName}
                  onChange={(e) => setCalcName(e.target.value)}
                  placeholder="ณัฐวุฒิ ใจดี"
                  className="w-full bg-slate-950/60 border border-white/5 rounded-lg px-3 py-2 text-[11px] text-yellow-100 font-bold focus:outline-none focus:border-violet-500 transition-all"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-[8px] font-bold text-slate-500 uppercase tracking-wider">Birth Date (ค.ศ.)</label>
                <input 
                  type="date" 
                  value={calcDob}
                  onChange={(e) => setCalcDob(e.target.value)}
                  className="w-full bg-slate-950/60 border border-white/5 rounded-lg px-3 py-2 text-[11px] text-yellow-100 font-bold focus:outline-none focus:border-violet-500 transition-all cursor-pointer"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-[8px] font-bold text-slate-500 uppercase tracking-wider">Birth Time</label>
                <input 
                  type="time" 
                  value={calcTob}
                  disabled={calcNoTime}
                  onChange={(e) => setCalcTob(e.target.value)}
                  className={`w-full bg-slate-950/60 border border-white/5 rounded-lg px-3 py-2 text-[11px] text-yellow-100 font-bold focus:outline-none focus:border-violet-500 transition-all ${calcNoTime ? "opacity-30 cursor-not-allowed" : "cursor-pointer"}`}
                />
              </div>
            </div>

            {/* Sandbox Bazi Results */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 relative z-10 items-stretch">
              {/* 4 Pillars Table */}
              <div className="md:col-span-5 bg-black/40 p-3 rounded-xl border border-white/5 flex flex-col gap-2.5">
                <h5 className="text-[9px] font-bold text-amber-500/80 uppercase tracking-wider">Bazi 4 Pillars</h5>
                <div className="grid grid-cols-4 gap-1.5 text-center">
                  <div className="bg-slate-900/60 p-2 rounded-lg border border-white/5">
                    <div className="text-[7px] text-slate-500 font-bold uppercase">Year</div>
                    <div className="text-sm font-bold text-white mt-0.5">{pillars.year.stem}</div>
                    <div className="text-[11px] font-bold text-slate-400">{pillars.year.branch}</div>
                    <div className="text-[6px] text-slate-600 uppercase font-mono mt-1 leading-none">{pillars.year.branchName}</div>
                  </div>
                  <div className="bg-slate-900/60 p-2 rounded-lg border border-white/5">
                    <div className="text-[7px] text-slate-500 font-bold uppercase">Month</div>
                    <div className="text-sm font-bold text-white mt-0.5">{pillars.month.stem}</div>
                    <div className="text-[11px] font-bold text-slate-400">{pillars.month.branch}</div>
                    <div className="text-[6px] text-slate-600 uppercase font-mono mt-1 leading-none">{pillars.month.branchName}</div>
                  </div>
                  <div className="bg-slate-900/60 p-2 rounded-lg border border-white/5">
                    <div className="text-[7px] text-slate-500 font-bold uppercase">Day</div>
                    <div className="text-sm font-bold text-emerald-400 mt-0.5">{pillars.day.stem}</div>
                    <div className="text-[11px] font-bold text-slate-400">{pillars.day.branch}</div>
                    <div className="text-[6px] text-slate-600 uppercase font-mono mt-1 leading-none">{pillars.day.branchName}</div>
                  </div>
                  <div className="bg-slate-900/60 p-2 rounded-lg border border-white/5">
                    <div className="text-[7px] text-slate-500 font-bold uppercase">Hour</div>
                    <div className="text-sm font-bold text-white mt-0.5">{pillars.hour.stem}</div>
                    <div className="text-[11px] font-bold text-slate-400">{pillars.hour.branch}</div>
                    <div className="text-[6px] text-slate-600 uppercase font-mono mt-1 leading-none">{pillars.hour.branchName}</div>
                  </div>
                </div>
              </div>

              {/* Elements Strength Balance */}
              <div className="md:col-span-7 bg-black/40 p-3 rounded-xl border border-white/5 flex flex-col gap-2 justify-between">
                <h5 className="text-[9px] font-bold text-amber-500/80 uppercase tracking-wider">5 Elements Strengths</h5>
                <div className="space-y-1.5">
                  <div>
                    <div className="flex justify-between text-[9px] mb-0.5"><span className="text-emerald-400 font-bold">Wood</span><span className="text-white font-mono">{elements.wood}%</span></div>
                    <div className="w-full bg-slate-800 rounded-full h-1"><div className="bg-emerald-500 h-1 rounded-full transition-all duration-500" style={{ width: `${elements.wood}%` }}></div></div>
                  </div>
                  <div>
                    <div className="flex justify-between text-[9px] mb-0.5"><span className="text-orange-400 font-bold">Fire</span><span className="text-white font-mono">{elements.fire}%</span></div>
                    <div className="w-full bg-slate-800 rounded-full h-1"><div className="bg-orange-500 h-1 rounded-full transition-all duration-500" style={{ width: `${elements.fire}%` }}></div></div>
                  </div>
                  <div>
                    <div className="flex justify-between text-[9px] mb-0.5"><span className="text-yellow-600 font-bold">Earth</span><span className="text-white font-mono">{elements.earth}%</span></div>
                    <div className="w-full bg-slate-800 rounded-full h-1"><div className="bg-yellow-600 h-1 rounded-full transition-all duration-500" style={{ width: `${elements.earth}%` }}></div></div>
                  </div>
                  <div>
                    <div className="flex justify-between text-[9px] mb-0.5"><span className="text-slate-300 font-bold">Metal</span><span className="text-white font-mono">{elements.metal}%</span></div>
                    <div className="w-full bg-slate-800 rounded-full h-1"><div className="bg-zinc-400 h-1 rounded-full transition-all duration-500" style={{ width: `${elements.metal}%` }}></div></div>
                  </div>
                  <div>
                    <div className="flex justify-between text-[9px] mb-0.5"><span className="text-sky-400 font-bold">Water</span><span className="text-white font-mono">{elements.water}%</span></div>
                    <div className="w-full bg-slate-800 rounded-full h-1"><div className="bg-sky-500 h-1 rounded-full transition-all duration-500" style={{ width: `${elements.water}%` }}></div></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Live Calculating Overlay */}
            {isLiveCalculating && (
              <div className="absolute inset-0 bg-[#03040c]/45 backdrop-blur-[1px] flex items-center justify-center z-25">
                <div className="flex items-center gap-2 bg-slate-900 border border-white/10 px-3.5 py-1.5 rounded-lg text-[10px] text-violet-400 font-bold">
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>{currentTranslations.liveCalculating}</span>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Free Services Navigation Showcase (Popular tools on Likit Fah) */}
        <section className="flex flex-col gap-10">
          <div className="text-center flex flex-col gap-2">
            <h2 className="text-xl md:text-2xl font-bold text-white font-serif">{currentTranslations.servicesTitle}</h2>
            <p className="text-slate-400 text-xs">{currentTranslations.servicesSub}</p>
            <div className="w-12 h-0.5 bg-gradient-to-r from-violet-500 to-indigo-500 mx-auto mt-2 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Calendar */}
            <a href="chinese-calendar.html" className="bg-[#0b0c16]/30 p-5 rounded-2xl border border-white/5 hover:border-violet-500/30 flex flex-col gap-3 hover:translate-y-[-2px] transition-all duration-300">
              <div className="w-9 h-9 rounded-xl bg-violet-600/10 flex items-center justify-center text-violet-400"><Calendar className="w-4.5 h-4.5" /></div>
              <h3 className="font-bold text-white text-xs">{currentTranslations.srvBazi}</h3>
              <p className="text-[11px] text-slate-400 leading-relaxed font-light">{currentTranslations.srvBaziDesc}</p>
            </a>
            {/* Tarot */}
            <a href="tarot.html" className="bg-[#0b0c16]/30 p-5 rounded-2xl border border-white/5 hover:border-violet-500/30 flex flex-col gap-3 hover:translate-y-[-2px] transition-all duration-300">
              <div className="w-9 h-9 rounded-xl bg-violet-600/10 flex items-center justify-center text-violet-400"><Sparkles className="w-4.5 h-4.5" /></div>
              <h3 className="font-bold text-white text-xs">{currentTranslations.srvTarot}</h3>
              <p className="text-[11px] text-slate-400 leading-relaxed font-light">{currentTranslations.srvTarotDesc}</p>
            </a>
            {/* Siemsi */}
            <a href="siemsi.html" className="bg-[#0b0c16]/30 p-5 rounded-2xl border border-white/5 hover:border-violet-500/30 flex flex-col gap-3 hover:translate-y-[-2px] transition-all duration-300">
              <div className="w-9 h-9 rounded-xl bg-violet-600/10 flex items-center justify-center text-violet-400"><Compass className="w-4.5 h-4.5" /></div>
              <h3 className="font-bold text-white text-xs">{currentTranslations.srvSiemsi}</h3>
              <p className="text-[11px] text-slate-400 leading-relaxed font-light">{currentTranslations.srvSiemsiDesc}</p>
            </a>
            {/* Dreams */}
            <a href="dreams.html" className="bg-[#0b0c16]/30 p-5 rounded-2xl border border-white/5 hover:border-violet-500/30 flex flex-col gap-3 hover:translate-y-[-2px] transition-all duration-300">
              <div className="w-9 h-9 rounded-xl bg-violet-600/10 flex items-center justify-center text-violet-400"><BookOpen className="w-4.5 h-4.5" /></div>
              <h3 className="font-bold text-white text-xs">{currentTranslations.srvDreams}</h3>
              <p className="text-[11px] text-slate-400 leading-relaxed font-light">{currentTranslations.srvDreamsDesc}</p>
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
        <section className="flex flex-col gap-10">
          <div className="text-center flex flex-col gap-2">
            <h2 className="text-xl md:text-2xl font-bold text-white font-serif">{currentTranslations.featuresTitle}</h2>
            <p className="text-slate-400 text-xs">{currentTranslations.featuresSub}</p>
            <div className="w-12 h-0.5 bg-gradient-to-r from-violet-500 to-indigo-500 mx-auto mt-2 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-slate-950/20 p-5 rounded-2xl border border-white/5 flex flex-col gap-3 hover:border-violet-500/20 transition-all duration-300">
              <div className="w-8 h-8 rounded-lg bg-violet-600/10 flex items-center justify-center text-violet-400 border border-violet-500/10"><User className="w-4 h-4" /></div>
              <h3 className="font-bold text-white text-xs">{currentTranslations.feat1}</h3>
              <p className="text-[11px] text-slate-400 leading-relaxed font-light">{currentTranslations.feat1Desc}</p>
            </div>
            <div className="bg-slate-950/20 p-5 rounded-2xl border border-white/5 flex flex-col gap-3 hover:border-violet-500/20 transition-all duration-300">
              <div className="w-8 h-8 rounded-lg bg-violet-600/10 flex items-center justify-center text-violet-400 border border-violet-500/10"><ShieldCheck className="w-4 h-4" /></div>
              <h3 className="font-bold text-white text-xs">{currentTranslations.feat2}</h3>
              <p className="text-[11px] text-slate-400 leading-relaxed font-light">{currentTranslations.feat2Desc}</p>
            </div>
            <div className="bg-slate-950/20 p-5 rounded-2xl border border-white/5 flex flex-col gap-3 hover:border-violet-500/20 transition-all duration-300">
              <div className="w-8 h-8 rounded-lg bg-violet-600/10 flex items-center justify-center text-violet-400 border border-violet-500/10"><Compass className="w-4 h-4" /></div>
              <h3 className="font-bold text-white text-xs">{currentTranslations.feat3}</h3>
              <p className="text-[11px] text-slate-400 leading-relaxed font-light">{currentTranslations.feat3Desc}</p>
            </div>
            <div className="bg-slate-950/20 p-5 rounded-2xl border border-white/5 flex flex-col gap-3 hover:border-violet-500/20 transition-all duration-300">
              <div className="w-8 h-8 rounded-lg bg-violet-600/10 flex items-center justify-center text-violet-400 border border-violet-500/10"><Sparkles className="w-4 h-4" /></div>
              <h3 className="font-bold text-white text-xs">{currentTranslations.feat4}</h3>
              <p className="text-[11px] text-slate-400 leading-relaxed font-light">{currentTranslations.feat4Desc}</p>
            </div>
          </div>
        </section>

        {/* Tabbed Report Preview Section */}
        <section className="flex flex-col gap-8 scroll-mt-24">
          <div className="text-center flex flex-col gap-2">
            <h2 className="text-xl md:text-2xl font-bold text-white font-serif">{currentTranslations.previewTitle}</h2>
            <p className="text-slate-400 text-xs">{currentTranslations.previewSub}</p>
          </div>

          <div className="flex border-b border-white/5 justify-center gap-6 text-xs font-bold text-slate-400 pb-3">
            <button 
              onClick={() => setPreviewTab("bazi")}
              className={`pb-3 relative transition-all ${previewTab === "bazi" ? "text-violet-400" : "hover:text-slate-200"}`}
            >
              <span>{currentTranslations.tabBazi}</span>
              {previewTab === "bazi" && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-violet-500 rounded-full"></div>}
            </button>
            <button 
              onClick={() => setPreviewTab("tarot")}
              className={`pb-3 relative transition-all ${previewTab === "tarot" ? "text-violet-400" : "hover:text-slate-200"}`}
            >
              <span>{currentTranslations.tabTarot}</span>
              {previewTab === "tarot" && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-violet-500 rounded-full"></div>}
            </button>
            <button 
              onClick={() => setPreviewTab("graph")}
              className={`pb-3 relative transition-all ${previewTab === "graph" ? "text-violet-400" : "hover:text-slate-200"}`}
            >
              <span>{currentTranslations.tabGraph}</span>
              {previewTab === "graph" && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-violet-500 rounded-full"></div>}
            </button>
          </div>

          <div className="bg-slate-950/30 rounded-2xl border border-white/5 p-6 md:p-8 min-h-[250px] flex items-center justify-center shadow-lg relative overflow-hidden">
            
            {/* Tab 1: Elements */}
            {previewTab === "bazi" && (
              <div className="w-full max-w-xl space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400 border border-emerald-500/20"><Activity className="w-4 h-4" /></div>
                  <h4 className="font-bold text-white text-xs">{currentTranslations.tabBazi} (Yang Wood Chart)</h4>
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
                  <h4 className="text-xs font-bold text-white mb-1">{currentTranslations.tabGraph}</h4>
                  <p className="text-[9px] text-slate-400 max-w-xs mb-3">{currentTranslations.previewLockDesc}</p>
                  <button 
                    onClick={() => {
                      setWizardOpen(true);
                      setCurrentStep(1);
                    }}
                    className="px-4 py-2 rounded-lg bg-gradient-to-r from-amber-500 to-yellow-500 text-black text-[9px] font-extrabold shadow-md hover:scale-[1.02] transition-all cursor-pointer"
                  >
                    {currentTranslations.btnUnlock}
                  </button>
                </div>
              </div>
            )}

          </div>
        </section>

        {/* Testimonials */}
        <section className="flex flex-col gap-10">
          <div className="text-center flex flex-col gap-2">
            <h2 className="text-xl md:text-2xl font-bold text-white font-serif">{currentTranslations.testimonialsTitle}</h2>
            <p className="text-slate-400 text-xs">{currentTranslations.testimonialsSub}</p>
            <div className="w-12 h-0.5 bg-gradient-to-r from-violet-500 to-indigo-500 mx-auto mt-2 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#0b0c16]/30 p-5 rounded-2xl border border-white/5 flex flex-col justify-between hover:border-violet-500/15 transition-all duration-300">
              <div>
                <div className="flex gap-1 text-amber-500 mb-3 text-xs">
                  {[1, 2, 3, 4, 5].map(s => <Sparkles key={s} className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />)}
                </div>
                <p className="text-slate-300 text-[11px] leading-relaxed mb-6 font-light">"{currentTranslations.rev1}"</p>
              </div>
              <div className="flex items-center gap-2.5 pt-3.5 border-t border-white/5">
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white text-xs font-bold font-mono">KP</div>
                <div>
                  <h5 className="text-white text-xs font-bold">{currentTranslations.rev1User}</h5>
                  <p className="text-[9px] text-slate-500">{currentTranslations.rev1Role}</p>
                </div>
              </div>
            </div>

            <div className="bg-[#0b0c16]/30 p-5 rounded-2xl border border-white/5 flex flex-col justify-between hover:border-violet-500/15 transition-all duration-300">
              <div>
                <div className="flex gap-1 text-amber-500 mb-3 text-xs">
                  {[1, 2, 3, 4, 5].map(s => <Sparkles key={s} className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />)}
                </div>
                <p className="text-slate-300 text-[11px] leading-relaxed mb-6 font-light">"{currentTranslations.rev2}"</p>
              </div>
              <div className="flex items-center gap-2.5 pt-3.5 border-t border-white/5">
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white text-xs font-bold font-mono">ST</div>
                <div>
                  <h5 className="text-white text-xs font-bold">{currentTranslations.rev2User}</h5>
                  <p className="text-[9px] text-slate-500">{currentTranslations.rev2Role}</p>
                </div>
              </div>
            </div>

            <div className="bg-[#0b0c16]/30 p-5 rounded-2xl border border-white/5 flex flex-col justify-between hover:border-violet-500/15 transition-all duration-300">
              <div>
                <div className="flex gap-1 text-amber-500 mb-3 text-xs">
                  {[1, 2, 3, 4, 5].map(s => <Sparkles key={s} className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />)}
                </div>
                <p className="text-slate-300 text-[11px] leading-relaxed mb-6 font-light">"{currentTranslations.rev3}"</p>
              </div>
              <div className="flex items-center gap-2.5 pt-3.5 border-t border-white/5">
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white text-xs font-bold font-mono">NL</div>
                <div>
                  <h5 className="text-white text-xs font-bold">{currentTranslations.rev3User}</h5>
                  <p className="text-[9px] text-slate-500">{currentTranslations.rev3Role}</p>
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
        <section className="flex flex-col gap-12">
          <div className="text-center flex flex-col gap-2">
            <h2 className="text-2xl md:text-3xl font-bold text-white font-serif">{currentTranslations.faqTitle}</h2>
            <p className="text-slate-400 text-xs">{currentTranslations.faqSub}</p>
            <div className="w-12 h-0.5 bg-gradient-to-r from-violet-500 to-indigo-500 mx-auto mt-2 rounded-full"></div>
          </div>

          <div className="space-y-4 max-w-3xl mx-auto w-full">
            {[1, 2, 3, 4, 5, 6, 7, 8].map(id => {
              const qText = currentTranslations[`q${id}` as keyof typeof currentTranslations];
              const aText = currentTranslations[`a${id}` as keyof typeof currentTranslations];
              const isOpen = faqOpen === id;

              return (
                <div key={id} className="bg-slate-950/20 rounded-xl border border-white/5 overflow-hidden transition-all duration-300">
                  <button 
                    onClick={() => setFaqOpen(isOpen ? null : id)}
                    className="w-full px-5 py-4 text-left flex justify-between items-center text-white hover:text-violet-400 font-semibold transition-colors text-xs sm:text-sm gap-4 cursor-pointer"
                  >
                    <span>{qText}</span>
                    <ChevronRight className={`w-4 h-4 text-violet-400 transition-transform duration-300 ${isOpen ? "rotate-90" : "rotate-0"}`} />
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
        <section className="text-center mb-12 px-4 bg-gradient-to-r from-indigo-950/15 via-[#0c0d1b] to-indigo-950/15 rounded-3xl border border-violet-500/20 p-12 md:p-16 flex flex-col items-center gap-6 shadow-2xl max-w-2xl mx-auto relative overflow-hidden">
          <div className="absolute top-[-50px] left-[-50px] w-48 h-48 bg-violet-600/10 rounded-full blur-3xl"></div>
          
          <h2 className="text-xl md:text-2xl font-serif text-white font-bold leading-tight">
            {currentTranslations.bottomTitle}
          </h2>
          <button 
            onClick={() => {
              setWizardOpen(true);
              setCurrentStep(1);
            }}
            className="px-8 py-4 rounded-xl bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-600 hover:from-amber-500 hover:via-yellow-400 hover:to-amber-500 text-black font-extrabold text-sm shadow-[0_4px_30px_rgba(245,158,11,0.3)] transition-all hover:scale-[1.02] flex items-center gap-2 border border-yellow-300/40 cursor-pointer"
          >
            <Sparkles className="w-5 h-5 text-black" />
            <span>{currentTranslations.bottomCta}</span>
          </button>
        </section>

      </main>

      {/* Footer */}
      <footer className="w-full bg-[#020207] border-t border-white/5 py-12 px-6 md:px-12 mt-16 relative z-10">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 text-slate-400 text-xs">
          
          {/* Brand desc */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg border border-violet-500/40 flex items-center justify-center bg-gradient-to-b from-violet-900 to-indigo-950">
                <Moon className="w-4 h-4 text-yellow-300" />
              </div>
              <span className="font-bold text-base tracking-widest text-title-gradient font-serif">{currentTranslations.brand}</span>
            </div>
            <p className="leading-relaxed text-[11px] font-light">{currentTranslations.footerDesc}</p>
          </div>

          {/* Links 1 */}
          <div className="space-y-3">
            <h5 className="font-bold text-white uppercase tracking-widest text-[9px]">{currentTranslations.footerCol1}</h5>
            <ul className="space-y-2.5 font-light">
              <li><a href="chinese-calendar.html" className="hover:text-white transition-colors">ปฏิทินจีนบาจื่อ</a></li>
              <li><a href="tarot.html" className="hover:text-white transition-colors">{currentTranslations.navTarot}</a></li>
              <li><a href="siemsi.html" className="hover:text-white transition-colors">เซียมซีนำทาง (Siemsi)</a></li>
              <li><a href="dreams.html" className="hover:text-white transition-colors">ทำนายฝันพยากรณ์</a></li>
            </ul>
          </div>

          {/* Links 2 */}
          <div className="space-y-3">
            <h5 className="font-bold text-white uppercase tracking-widest text-[9px]">{currentTranslations.footerCol2}</h5>
            <ul className="space-y-2.5 font-light">
              <li><a href="policy.html" target="_blank" className="hover:text-white transition-colors">นโยบายความเป็นส่วนตัว (Privacy)</a></li>
              <li><a href="terms.html" target="_blank" className="hover:text-white transition-colors">ข้อตกลงการใช้งาน (Terms)</a></li>
              <li><a href="donate.html" className="hover:text-white transition-colors">สนับสนุนผู้พัฒนา (Support Us)</a></li>
            </ul>
          </div>

          {/* Connect */}
          <div className="space-y-3">
            <h5 className="font-bold text-white uppercase tracking-widest text-[9px]">{currentTranslations.footerCol3}</h5>
            <p className="font-light">Email: support@likitfah.com</p>
            <div className="flex gap-4 pt-1.5 text-base">
              <a href="#" aria-label="Facebook" className="hover:text-white transition-colors"><Share2 className="w-4 h-4" /></a>
              <a href="#" aria-label="Email" className="hover:text-white transition-colors"><Mail className="w-4 h-4" /></a>
              <a href="#" aria-label="Website" className="hover:text-white transition-colors"><Globe className="w-4 h-4" /></a>
            </div>
          </div>

        </div>

        <div className="border-t border-white/5 mt-10 pt-6 text-center text-[10px] text-slate-600 font-medium">
          <p>&copy; 2026 LikitFah.com • The Mystic Oracle. All Rights Reserved.</p>
        </div>
      </footer>

      {/* Floating Live Activity Widget */}
      <div id="live-activity-widget" className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-[80] bg-[#03040c]/90 px-4 py-2.5 rounded-full border border-emerald-500/20 shadow-lg flex items-center gap-2.5 transition-all hover:scale-[1.02]">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
        <span className="text-[10px] sm:text-xs text-slate-300 font-semibold">
          {lang === "th" ? (
            <>มีผู้ใช้งานกำลังวิเคราะห์ดวงอยู่ <span className="text-emerald-400 font-bold font-mono">{liveUserCount}</span> คน</>
          ) : (
            <><span className="text-emerald-400 font-bold font-mono">{liveUserCount}</span> seekers are decoding destiny now</>
          )}
        </span>
      </div>

      {/* Sticky Mobile CTA */}
      <div 
        id="sticky-mobile-cta" 
        className={`fixed bottom-0 left-0 right-0 z-[90] bg-[#03040c]/95 backdrop-blur-md border-t border-violet-500/20 px-4 py-3.5 shadow-2xl flex sm:hidden justify-center items-center transition-all duration-300 ${showStickyCta ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"}`}
      >
        <button 
          onClick={() => {
            setWizardOpen(true);
            setCurrentStep(1);
          }}
          className="w-full py-3.5 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 text-black font-extrabold text-xs rounded-xl shadow-md flex justify-center items-center gap-1.5 cursor-pointer"
        >
          <span>{lang === "th" ? "🔮 วิเคราะห์ดวงชะตาฟรี →" : "🔮 Free Reading →"}</span>
        </button>
      </div>

      {/* Interactive Step Wizard Modal (Overlay Dialog) */}
      {wizardOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#03040c]/90 backdrop-blur-xs">
          <div className="absolute inset-0" onClick={() => setWizardOpen(false)}></div>
          
          <div className="bg-[#0b0c16]/95 w-full max-w-md rounded-2xl p-6 md:p-8 relative border border-violet-500/20 shadow-2xl z-10 flex flex-col gap-6 backdrop-blur-md">
            
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
                    <div className="h-full bg-violet-500 transition-all duration-300" style={{ width: `${((currentStep - 1) / 2) * 100}%` }}></div>
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
                            ? "bg-violet-600 border-violet-400 text-white shadow-lg shadow-violet-500/20" 
                            : "bg-slate-900 border-slate-700 text-slate-400"
                        }`}>
                          {isCompleted ? <Check className="w-4 h-4" /> : stepNum}
                        </div>
                        <span className={`text-[8px] font-bold mt-1.5 uppercase tracking-wider ${isActive ? "text-violet-400" : isCompleted ? "text-emerald-400" : "text-slate-500"}`}>
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
                          className="w-full bg-black/40 border border-slate-800 rounded-xl px-4 py-3 text-yellow-100 font-bold focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 text-sm transition-all"
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
                          className="w-full bg-black/40 border border-slate-800 rounded-xl px-4 py-3 text-yellow-100 font-bold focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 text-sm transition-all cursor-pointer"
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
                            className={`w-full bg-black/40 border border-slate-800 rounded-xl px-4 py-3 text-yellow-100 font-bold focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 text-sm transition-all ${noBirthTime ? "opacity-30 cursor-not-allowed" : "cursor-pointer"}`}
                          />
                        </div>
                        <label className="flex items-center gap-2.5 text-xs text-slate-400 font-medium cursor-pointer self-start">
                          <input 
                            type="checkbox" 
                            checked={noBirthTime}
                            onChange={(e) => setNoBirthTime(e.target.checked)}
                            className="w-4 h-4 rounded accent-violet-600 cursor-pointer"
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
                        className="flex-1 py-3 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg transition-all cursor-pointer"
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
                  <Loader2 className="w-8 h-8 text-violet-500 animate-spin" />
                  <h3 className="text-sm font-bold text-white mt-1">{currentTranslations.loadingTitle}</h3>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-slate-900 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-violet-500 h-1.5 transition-all duration-300" style={{ width: `${submissionProgress}%` }}></div>
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
                          isCompleted ? "text-amber-400 font-bold" : isActive ? "text-violet-400" : "text-slate-600"
                        }`}
                      >
                        <div className="shrink-0">
                          {isCompleted ? (
                            <CheckCircle2 className="w-4 h-4 text-amber-500" />
                          ) : isActive ? (
                            <Loader2 className="w-4 h-4 text-violet-400 animate-spin" />
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
