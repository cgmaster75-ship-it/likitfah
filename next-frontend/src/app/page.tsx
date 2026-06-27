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
  HelpCircle, 
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
  TrendingUp,
  Activity,
  Award,
  Zap,
  Info,
  ExternalLink
} from "lucide-react";

export default function Home() {
  const [lang, setLang] = useState<"th" | "en">("th");
  const [wizardOpen, setWizardOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [faqOpen, setFaqOpen] = useState<number | null>(null);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [liveUserCount, setLiveUserCount] = useState(18);

  // Form states
  const [fullName, setFullName] = useState("");
  const [dob, setDob] = useState("");
  const [tob, setTob] = useState("12:00");
  const [noBirthTime, setNoBirthTime] = useState(false);
  
  // UX states
  const [formError, setFormError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionProgress, setSubmissionProgress] = useState(0);
  const [completedAnimationSteps, setCompletedAnimationSteps] = useState<number[]>([]);

  // Simulation of live activity
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
      subtitle: "Premium Astrology & Bazi",
      navTarot: "ทำนายไพ่ยิปซี",
      navCalendar: "ปฏิทินจีนบาจื่อ",
      navDashboard: "แดชบอร์ดดวงชะตา",
      navGetStarted: "🔮 เริ่มวิเคราะห์ฟรี",
      
      heroTitle: "ชีวิตคุณกำลังเดินมาถูกทางหรือไม่?",
      heroSubtitle: "ค้นพบแผนผังชะตาและจุดแข็งของคุณ ผ่านวิทยาศาสตร์แห่งดาราศาสตร์และวิเคราะห์ธาตุเกิดเฉพาะบุคคล",
      bullet1: "วิเคราะห์จุดแข็ง-จุดอ่อนของคุณใน 3 นาที",
      bullet2: "รู้ลึกจังหวะชีวิต การงาน การเงิน ความรัก รายปี",
      btnHeroCta: "🔮 วิเคราะห์ดวงชะตาฟรี",
      btnHeroSample: "ดูตัวอย่างรายงาน",
      seekersCount: "มีผู้เปิดดวงชะตาแล้วกว่า 23,481+ คน",
      
      featuresTitle: "คัมภีร์สวรรค์จะไขปริศนาอะไรบ้าง?",
      featuresSub: "สิ่งที่คุณจะได้รับจากการวิเคราะห์ดวงดาวตามเวลาตกฟากที่แท้จริง",
      feat1: "บุคลิกภาพเชิงลึก",
      feat1Desc: "ถอดรหัสตัวตน ธาตุเกิด และพลังงานประจำราศีลัคนาของคุณ",
      feat2: "จุดแข็ง & ความเสี่ยง",
      feat2Desc: "เผยจุดเด่นที่จะนำความสำเร็จ และจุดเปราะบางที่ควรหลีกเลี่ยง",
      feat3: "การงาน & อาชีพหนุนดวง",
      feat3Desc: "ชี้ช่องทางทำกินและตำแหน่งงานที่ทำแล้วรุ่งเรืองที่สุด",
      feat4: "ความรัก & เนื้อคู่",
      feat4Desc: "ลักษณะคู่ครองที่เหมาะสมตามพลังธาตุ และจังหวะความสัมพันธ์",
      
      previewTitle: "สัมผัสประสบการณ์แดชบอร์ดจริง",
      previewSub: "ตัวอย่างรายงานที่ถูกออกแบบอย่างประณีต ปลดล็อกทันทีหลังระบุข้อมูลของคุณ",
      prevBazi: "สมดุล 5 ธาตุหลัก (วิเคราะห์ฟรี)",
      prevTarot: "ไพ่ทาโรต์นำชีวิต",
      prevIndex: "ดัชนีพลังชะตาชีวิต",
      prevGraph: "กราฟทิศทางชีวิต 100 ปี (ถูกล็อก)",
      prevLockDesc: "กรอกข้อมูลของคุณเพื่อปลดล็อกกราฟทศวรรษและรายละเอียดวิเคราะห์รายปีแบบสมบูรณ์",
      btnUnlock: "🔮 ปลดล็อกดวงชะตาของฉัน",
      
      testimonialsTitle: "ความประทับใจจากผู้เข้าตรวจชะตา",
      testimonialsSub: "เสียงตอบรับจริงจากผู้ใช้งานระบบลิขิตฟ้า",
      rev1: "แม่นยำจนน่าตกใจค่ะ! วิเคราะห์สายงานตรงกับชีวิตจริงมาก ช่วยให้เห็นจังหวะชีวิตวางแผนปีนี้ได้ดีจริง",
      rev1User: "กานดา พรหมรักษา",
      rev1Role: "ผู้ใช้งานทั่วไป • กรุงเทพฯ",
      rev2: "ชอบการออกแบบที่พรีเมียมและอ่านง่ายมากครับ การจัดโซนธาตุและเกจทำให้ดูเข้าใจง่ายขึ้นเยอะเลย",
      rev2User: "สมชาย ตั้งวิทยา",
      rev2Role: "นักธุรกิจ • เชียงใหม่",
      rev3: "กราฟทศวรรษตรงมากค่ะ โดยเฉพาะคำเตือนจุดอ่อนสะกิดใจได้ดี คุ้มค่าและอยากแนะนำให้ทุกคนลองเปิดดวงกัน",
      rev3User: "นลินี เลิศวิจิตร",
      rev3Role: "นักออกแบบ • ภูเก็ต",
      
      faqTitle: "คำถามที่พบบ่อย",
      faqSub: "ไขข้อข้องใจเกี่ยวกับการวิเคราะห์ดวงชะตา",
      q1: "การวิเคราะห์ดวงชะตาของลิขิตฟ้ามีค่าใช้จ่ายหรือไม่?",
      a1: "ไม่มีค่าใช้จ่ายสำหรับการวิเคราะห์เบื้องต้น! คุณสามารถระบุ วัน เดือน ปีเกิด และเวลาเกิด เพื่อปลดล็อกรายงาน 5 ธาตุหลัก, การวิเคราะห์ลัคนาราศี และความต้องการเฉพาะบุคคลแบบพรีเมียมได้ฟรีทันที",
      q2: "หากไม่ทราบเวลาเกิดที่แน่ชัด จะยังพยากรณ์ได้หรือไม่?",
      a2: "สามารถพยากรณ์ได้ค่ะ! คุณสามารถเลือกทำเครื่องหมาย 'ฉันไม่ทราบเวลาเกิดของฉัน' ระบบจะคำนวณตำแหน่งดวงชะตาโดยใช้ค่าเฉลี่ยกึ่งกลางวัน ทว่าผลลัพธ์ลัคนากลางวันอาจมีสัดส่วนความแม่นยำลดลงเล็กน้อยเมื่อเทียบกับการระบุเวลาตกฟากที่แท้จริง",
      q3: "ข้อมูลวันเดือนปีเกิดของฉันจะถูกเก็บรักษาอย่างปลอดภัยหรือไม่?",
      a3: "ความปลอดภัยของข้อมูลลูกค้าคือหัวใจสำคัญสูงสุดของเรา ข้อมูลดวงชะตาจะถูกประมวลผลภายในบราวเซอร์ของคุณเพื่อคำนวณลัคนา และข้อมูลส่วนบุคคลจะไม่ถูกบันทึก นำไปขาย หรือแชร์ให้บุคคลภายนอกโดยเด็ดขาด",
      q4: "ระบบนี้ใช้ศาสตร์ทางโหราศาสตร์ด้านใดในการคำนวณ?",
      a4: "ระบบของเราผสานรวมโหราศาสตร์ตะวันตก (โหราศาสตร์เชิงดาราศาสตร์ระดับพิกัดจริง) เข้ากับศาสตร์แห่งธาตุทั้ง 5 ของตะวันออก เพื่อให้ได้การวิเคราะห์ที่ครอบคลุม ทั้งด้านการกระทำ ธาตุตัวตน และแนวโน้มพลังงานประจำปี",
      q5: "ผลลัพธ์จากการวิเคราะห์มีความแม่นยำสูงแค่ไหน?",
      a5: "ความแม่นยำขึ้นอยู่กับการป้อนเวลาตกฟากที่ถูกต้องเป็นนาที ระบบของเราใช้คลังข้อมูลพิกัดดวงดาวตามจริงทางดาราศาสตร์เพื่อความเที่ยงตรงสูงสุด อย่างไรก็ตามดวงชะตาบอกแนวโน้มและความถนัดภายนอก ส่วนการเลือกทางชีวิตและการลงมือทำเป็นปัจจัยหลักในการลิขิตชีวิตจริง",
      q6: "รายงานฉบับเต็ม (Full Report) มีข้อมูลแตกต่างจากฉบับเบื้องต้นอย่างไร?",
      a6: "รายงานฉบับพรีเมียมตัวเต็มจะมีวิเคราะห์เจาะลึก 100 ปีอายุขัยเป็นช่วงๆ แบบละเอียดสูงสุด, แผนผังธาตุปรับสมดุลรายวันเพื่อดึงดูดโชคลาภ, คำพยากรณ์ความรักเจาะจงเนื้อคู่, และคำแนะนำแนวทางอาชีพที่ถูกจุด พร้อมวิธีแก้อุปสรรคช่วงอายุวัย",
      q7: "มีการรับประกันความพึงพอใจและการคืนเงินหรือไม่?",
      a7: "เรามุ่งมั่นนำเสนอบริการที่ดีที่สุด หากคุณพบข้อผิดพลาดของข้อมูล หรือหากคุณไม่พึงพอใจในผลลัพธ์รายงานฉบับเต็ม สามารถติดต่อฝ่ายสนับสนุนภายใน 7 วันเพื่อแจ้งเรื่องและทำรายการพิจารณาการขอคืนเงินได้เต็มจำนวน",
      q8: "ระบบมีการนำปัญญาประดิษฐ์ (AI) เข้ามาใช้ร่วมกับศาสตร์ดวงชะตาหรือไม่?",
      a8: "ใช่ค่ะ ระบบใช้ AI อัจฉริยะในการเรียบเรียงผลลัพธ์การจัดวางตำแหน่งดวงดาวและสมดุลธาตุที่คำนวณออกมาเป็นตัวเลขวิชาการ ให้เป็นคำพยากรณ์ภาษาเขียนที่สวยงาม เข้าใจง่าย และปรับแต่งเฉพาะบุคคลเสมือนได้พูดคุยกับซินแสระดับปรมาจารย์",

      bottomTitle: "พร้อมที่จะเปิดตำราที่จักรวาลลิขิตหรือยัง?",
      bottomCta: "🔮 เริ่มคำนวณดวงชะตาของคุณ",
      footerDesc: "พลิกชะตาฟ้าลิขิต ด้วยศาสตร์แห่งตัวเลขและพยากรณ์เชิงลึกระดับพรีเมียม",
      footerCol1: "บริการของเรา",
      footerCol2: "นโยบายและสิทธิ์",
      footerCol3: "ติดต่อ & ติดตาม",
      
      wizardTitle: "เริ่มวิเคราะห์ดวงชะตาเฉพาะคุณ",
      wizardStep1: "ระบุนามผู้เปิดดวง",
      wizardStep2: "วันเกิดของคุณ",
      wizardStep3: "เวลาตกฟาก",
      placeholderName: "กรอกชื่อ-นามสกุลของคุณ เช่น ณัฐวุฒิ ใจดี",
      btnNext: "ขั้นตอนถัดไป",
      btnPrev: "ย้อนกลับ",
      btnSubmit: "🔮 เริ่มคำนวณดวงชะตาสวรรค์",
      disclaimer: "ข้อมูลของคุณจะถูกใช้เพื่อการวิเคราะห์ทางโหราศาสตร์เท่านั้นและเป็นส่วนตัว 100%",
      loadingTitle: "ระบบกำลังถอดรหัสชะตากำเนิด...",
      loadingS1: "ตรวจสอบพิกัดดวงดาว ณ เวลาตกฟาก",
      loadingS2: "คำนวณลัคนาราศีและขอบเขตชะตาชีวิต",
      loadingS3: "จัดสมดุลระดับกำลังธาตุทั้ง 5 (บาจื่อ)",
      loadingS4: "จัดเตรียมแผนภูมิรายงานและคำแนะนำ AI",
      loadingS5: "เสร็จสิ้น! กำลังจัดทำแดชบอร์ด...",
      unknownTime: "ฉันไม่ทราบเวลาเกิดของฉัน",
      emptyChart: "ระบุข้อมูลเวลาเกิดในฟอร์มเพื่อวาดแผนภูมิชีวิตของคุณ"
    },
    en: {
      brand: "Likit Fah",
      subtitle: "Premium Astrology & Bazi",
      navTarot: "Tarot Readings",
      navCalendar: "Bazi Calendar",
      navDashboard: "Report Dashboard",
      navGetStarted: "🔮 Free Reading",
      
      heroTitle: "Is Your Life Heading in the Right Direction?",
      heroSubtitle: "Discover your destiny map & core life strengths computed from precise birth coordinates and eastern elements.",
      bullet1: "Discover your core potential in 3 minutes",
      bullet2: "Understand career, wealth & love cycles",
      btnHeroCta: "🔮 Free Destiny Reading",
      btnHeroSample: "View Sample Report",
      seekersCount: "Over 23,481+ seekers have unlocked their fate",
      
      featuresTitle: "What Insights Will You Unlock?",
      featuresSub: "Deep details computed from your exact astronomical alignments",
      feat1: "Personality Deep Dive",
      feat1Desc: "Understand your core elements, inner energy, and ascendant profile.",
      feat2: "Strengths & Pitfalls",
      feat2Desc: "Discover your major career assets and critical life warning points.",
      feat3: "Wealth & Career Alignment",
      feat3Desc: "Find matching industries and jobs that attract maximum prosperity.",
      feat4: "Relationships & Destiny",
      feat4Desc: "Compatible partner profiles and cycles of relationship harmony.",
      
      previewTitle: "Experience the Premium Dashboard",
      previewSub: "Sample of the beautiful charts unlocked instantly after entering your birth details.",
      prevBazi: "5 Elements Balance (Free Preview)",
      prevTarot: "Personal Tarot Card",
      prevIndex: "Destiny Power Index",
      prevGraph: "100-Year Life Graph (Locked)",
      prevLockDesc: "Enter your birth details to generate and unlock your comprehensive decade curves.",
      btnUnlock: "🔮 Unlock My Destiny Graph",
      
      testimonialsTitle: "What Our Seekers Say",
      testimonialsSub: "Real feedback from users who checked their destiny report",
      rev1: "Shockingly accurate! The career guidance is spot on and helped me map out my plans for this year with absolute clarity.",
      rev1User: "Kanda Promraksa",
      rev1Role: "Verified Seeker • Bangkok",
      rev2: "I love the premium design and easy-to-read charts! The element balance and circular dials make Bazi simple to digest.",
      rev2User: "Somchai Tangwittaya",
      rev2Role: "Business Owner • Chiang Mai",
      rev3: "Decade analysis is incredibly accurate. The warnings about my personal weaknesses are spot on. Highly recommended!",
      rev3User: "Nalinee Lertwijit",
      rev3Role: "Product Designer • Phuket",
      
      faqTitle: "Frequently Asked Questions",
      faqSub: "Find answers about Likit Fah readings",
      q1: "Does Likit Fah charge for destiny analysis?",
      a1: "No charges for the basic analysis! You can enter your birth date and time to instantly unlock your 5 elements balance, ascendant profile, and personal strengths report for free.",
      q2: "Can I still get a prediction if I don't know my exact birth time?",
      a2: "Yes, you can! Simply check 'I do not know my birth time'. The system will calculate predictions using the midday average. However, the ascendant analysis may have slightly lower precision compared to using your exact birth hour.",
      q3: "Will my birth details be kept secure and private?",
      a3: "Your privacy is our utmost priority. Your birth details are processed securely to calculate your charts, and your personal data will never be stored permanently on public servers, sold, or shared with third parties.",
      q4: "Which astrological methodology does this platform use?",
      a4: "Our platform integrates Western astrology (based on precise astronomical coordinates) with the Eastern 5 Elements (Bazi) system. This provides a comprehensive reading of your core elements and yearly energy cycles.",
      q5: "How accurate is the personal destiny report?",
      a5: "Accuracy relies on entering your exact birth details down to the minute. The system cross-references real-time astronomical datasets for highest alignment. However, astrology maps tendencies and potentials; your choices define your reality.",
      q6: "How does the Full Report differ from the free reading?",
      a6: "The premium Full Report includes a detailed decade-by-decade 100-year life curve, daily elemental balances to attract wealth, specific love compatibility metrics, and targeted career paths with customized mitigation steps.",
      q7: "Is there a satisfaction guarantee or refund policy?",
      a7: "We strive to deliver the highest quality. If you experience technical errors or are dissatisfied with the premium Full Report, you can contact our support within 7 days for a review and a full refund.",
      q8: "Does the system use Artificial Intelligence (AI) for predictions?",
      a8: "Yes! The system uses advanced AI engines to translate mathematical planetary layouts and element weights into beautiful, highly personalized, and easily readable textual guidance, similar to a custom consultation.",

      bottomTitle: "Ready to Uncover Your Cosmic Blueprint?",
      bottomCta: "🔮 Begin Cosmic Calculation",
      footerDesc: "Shape your destiny with premium astrology, numerology, and cosmic coordinates.",
      footerCol1: "Services",
      footerCol2: "Policies",
      footerCol3: "Connect",
      
      wizardTitle: "Calculate Your Cosmic Chart",
      wizardStep1: "Enter Seeker Name",
      wizardStep2: "Date of Birth",
      wizardStep3: "Birth Time",
      placeholderName: "Enter your full name e.g., Nuttawoot Jaidee",
      btnNext: "Continue",
      btnPrev: "Back",
      btnSubmit: "🔮 Compute My Destiny Chart",
      disclaimer: "Your data is calculated locally inside browser and is 100% private.",
      loadingTitle: "Decoding your cosmic codes...",
      loadingS1: "Checking astronomical coordinate alignments",
      loadingS2: "Computing ascendant and houses",
      loadingS3: "Balancing Eastern Bazi 5-Element strengths",
      loadingS4: "Drafting personalized AI summary guidelines",
      loadingS5: "Completed! Generating dashboard...",
      unknownTime: "I do not know my birth time",
      emptyChart: "Please fill in the time coordinates to render your destiny map"
    }
  };

  const currentTranslations = t[lang];

  // Wizard Logic
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

    // Save locally
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
    <div className="min-h-screen bg-[#05050f] text-slate-100 flex flex-col font-sans selection:bg-violet-500 selection:text-white relative">
      
      {/* Background Decorative Ambient Orbits */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-200px] left-1/4 w-[500px] h-[500px] bg-violet-600/10 rounded-full blur-[120px]"></div>
        <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-amber-500/5 rounded-full blur-[100px]"></div>
        
        {/* Magic Orbit Ring */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[700px] h-[700px] border border-dashed border-slate-800/60 rounded-full animate-spin-slow opacity-20 flex items-center justify-center">
          <div className="w-[500px] h-[500px] border border-dotted border-slate-700/60 rounded-full animate-spin-slow-rev"></div>
        </div>
      </div>

      {/* Floating Header */}
      <header className="sticky top-0 z-50 w-full bg-[#05050f]/80 backdrop-blur-md border-b border-white/5 py-4 px-6 md:px-12 flex justify-between items-center transition-all duration-300">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-gradient-to-b from-violet-600 to-indigo-950 flex items-center justify-center border border-violet-500/40 shadow-[0_0_10px_rgba(139,92,246,0.3)]">
            <Moon className="w-5 h-5 text-yellow-300" />
          </div>
          <div>
            <span className="font-serif font-black text-xl tracking-wider text-title-gradient">{currentTranslations.brand}</span>
            <p className="text-[8px] text-slate-500 uppercase tracking-widest mt-0.5 font-medium">{currentTranslations.subtitle}</p>
          </div>
        </div>

        {/* Desktop Nav links */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-semibold text-slate-400">
          <a href="tarot.html" className="hover:text-white transition-colors flex items-center gap-1.5"><Sparkles className="w-3.5 h-3.5" />{currentTranslations.navTarot}</a>
          <a href="chinese-calendar.html" className="hover:text-white transition-colors flex items-center gap-1.5"><Compass className="w-3.5 h-3.5" />{currentTranslations.navCalendar}</a>
          <a href="dashboard.html" className="hover:text-white transition-colors">{currentTranslations.navDashboard}</a>
        </nav>

        {/* Right Nav buttons */}
        <div className="flex items-center gap-4">
          {/* Language Switcher */}
          <button 
            onClick={() => setLang(prev => prev === "th" ? "en" : "th")}
            className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-xs font-bold text-slate-300 hover:bg-white/5 transition-all"
            aria-label="Toggle language"
          >
            {lang === "th" ? "EN" : "TH"}
          </button>
          
          <button 
            onClick={() => {
              setWizardOpen(true);
              setCurrentStep(1);
            }}
            className="px-4 py-2 text-xs font-extrabold rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white shadow-lg hover:shadow-violet-600/30 hover:scale-[1.03] transition-all flex items-center gap-1"
          >
            {currentTranslations.navGetStarted}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-5xl mx-auto w-full px-6 py-12 md:py-24 relative z-10 flex flex-col gap-28">

        {/* Hero Section */}
        <section className="text-center flex flex-col items-center gap-8 max-w-3xl mx-auto">
          {/* Tag highlight */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-semibold uppercase tracking-wider animate-pulse-subtle">
            <span className="w-2 h-2 rounded-full bg-violet-400"></span>
            <span>Premium Astrology Blueprint</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold text-white font-serif tracking-tight leading-tight md:leading-none">
            {currentTranslations.heroTitle}
          </h1>

          <p className="text-base md:text-lg text-slate-400 font-light leading-relaxed max-w-2xl">
            {currentTranslations.heroSubtitle}
          </p>

          {/* Action highlights */}
          <div className="flex flex-col sm:flex-row items-center gap-6 text-sm text-slate-300 font-medium py-2">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{currentTranslations.bullet1}</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{currentTranslations.bullet2}</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center">
            <button 
              onClick={() => {
                setWizardOpen(true);
                setCurrentStep(1);
              }}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 hover:from-amber-400 hover:via-yellow-300 hover:to-amber-400 text-black font-extrabold text-base shadow-[0_4px_25px_rgba(245,158,11,0.35)] transition-all hover:scale-[1.03] amber-glow-btn flex justify-center items-center gap-2 border border-yellow-300/30"
            >
              <span>{currentTranslations.btnHeroCta}</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
            
            <a 
              href="#sample-report"
              className="w-full sm:w-auto px-7 py-4 rounded-2xl border border-slate-800 bg-slate-900/40 hover:bg-slate-900/80 text-slate-300 font-semibold text-base transition-all flex items-center justify-center gap-2"
            >
              <Eye className="w-4 h-4 text-slate-400" />
              <span>{currentTranslations.btnHeroSample}</span>
            </a>
          </div>

          {/* Live seekers tag */}
          <div className="flex items-center gap-2 text-slate-500 text-xs font-medium">
            <Users className="w-4 h-4 text-violet-400" />
            <span>{currentTranslations.seekersCount}</span>
          </div>
        </section>

        {/* Features Grid */}
        <section className="flex flex-col gap-12">
          <div className="text-center flex flex-col gap-3">
            <h2 className="text-2xl md:text-3xl font-bold text-white font-serif">{currentTranslations.featuresTitle}</h2>
            <p className="text-slate-400 text-sm">{currentTranslations.featuresSub}</p>
            <div className="w-16 h-1 bg-gradient-to-r from-violet-500 to-indigo-500 mx-auto mt-2 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="glass-panel p-6 rounded-2xl border border-white/5 bg-slate-900/10 flex flex-col gap-4 hover:border-violet-500/30 hover:shadow-[0_4px_20px_rgba(139,92,246,0.15)] transition-all duration-300">
              <div className="w-10 h-10 rounded-xl bg-violet-600/10 flex items-center justify-center text-violet-400 border border-violet-500/20"><User className="w-5 h-5" /></div>
              <h3 className="font-bold text-white text-base">{currentTranslations.feat1}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{currentTranslations.feat1Desc}</p>
            </div>
            <div className="glass-panel p-6 rounded-2xl border border-white/5 bg-slate-900/10 flex flex-col gap-4 hover:border-violet-500/30 hover:shadow-[0_4px_20px_rgba(139,92,246,0.15)] transition-all duration-300">
              <div className="w-10 h-10 rounded-xl bg-violet-600/10 flex items-center justify-center text-violet-400 border border-violet-500/20"><ShieldCheck className="w-5 h-5" /></div>
              <h3 className="font-bold text-white text-base">{currentTranslations.feat2}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{currentTranslations.feat2Desc}</p>
            </div>
            <div className="glass-panel p-6 rounded-2xl border border-white/5 bg-slate-900/10 flex flex-col gap-4 hover:border-violet-500/30 hover:shadow-[0_4px_20px_rgba(139,92,246,0.15)] transition-all duration-300">
              <div className="w-10 h-10 rounded-xl bg-violet-600/10 flex items-center justify-center text-violet-400 border border-violet-500/20"><Compass className="w-5 h-5" /></div>
              <h3 className="font-bold text-white text-base">{currentTranslations.feat3}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{currentTranslations.feat3Desc}</p>
            </div>
            <div className="glass-panel p-6 rounded-2xl border border-white/5 bg-slate-900/10 flex flex-col gap-4 hover:border-violet-500/30 hover:shadow-[0_4px_20px_rgba(139,92,246,0.15)] transition-all duration-300">
              <div className="w-10 h-10 rounded-xl bg-violet-600/10 flex items-center justify-center text-violet-400 border border-violet-500/20"><Sparkles className="w-5 h-5" /></div>
              <h3 className="font-bold text-white text-base">{currentTranslations.feat4}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{currentTranslations.feat4Desc}</p>
            </div>
          </div>
        </section>

        {/* Sample Report Section */}
        <section id="sample-report" className="flex flex-col gap-12 scroll-mt-24">
          <div className="text-center flex flex-col gap-3">
            <h2 className="text-2xl md:text-3xl font-bold text-white font-serif">{currentTranslations.previewTitle}</h2>
            <p className="text-slate-400 text-sm">{currentTranslations.previewSub}</p>
            <div className="w-16 h-1 bg-gradient-to-r from-violet-500 to-indigo-500 mx-auto mt-2 rounded-full"></div>
          </div>

          <div className="glass-panel rounded-2xl border border-white/5 bg-slate-950/40 p-6 md:p-8 space-y-6 shadow-2xl relative overflow-hidden">
            {/* Header simulation */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/5 pb-6 gap-4">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-violet-600/10 border border-violet-500/30 flex items-center justify-center text-violet-400 text-lg">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-sm">ณัฐวุฒิ ใจดี (Nuttawoot Jaidee)</h4>
                  <p className="text-[10px] text-slate-400 font-mono">Bazi Element: Yang Wood (甲)</p>
                </div>
              </div>
              <div className="flex flex-col items-start sm:items-end">
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-bold">Ascendant: Leo</span>
                <p className="text-[9px] text-slate-500 font-mono mt-1">23 June 1994, 15:30</p>
              </div>
            </div>

            {/* Slider track */}
            <div className="relative overflow-hidden w-full min-h-[300px]">
              <div className="flex transition-transform duration-500 ease-out" style={{ transform: `translateX(-${carouselIndex * 100}%)` }}>
                
                {/* Slide 1: Bazi balance */}
                <div className="w-full shrink-0 px-1">
                  <div className="bg-black/30 p-6 rounded-xl border border-white/5 min-h-[280px] flex flex-col justify-between">
                    <div>
                      <h5 className="text-xs font-bold text-amber-400 uppercase tracking-widest mb-6 flex items-center gap-1.5">
                        <Activity className="w-4 h-4 text-amber-500" />
                        <span>{currentTranslations.prevBazi}</span>
                      </h5>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between text-xs mb-1"><span className="text-emerald-400 font-bold">Wood (ไม้)</span><span className="text-white font-mono">35%</span></div>
                          <div className="w-full bg-slate-800 rounded-full h-1.5"><div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: "35%" }}></div></div>
                        </div>
                        <div>
                          <div className="flex justify-between text-xs mb-1"><span className="text-orange-400 font-bold">Fire (ไฟ)</span><span className="text-white font-mono">22%</span></div>
                          <div className="w-full bg-slate-800 rounded-full h-1.5"><div className="bg-orange-500 h-1.5 rounded-full" style={{ width: "22%" }}></div></div>
                        </div>
                        <div>
                          <div className="flex justify-between text-xs mb-1"><span className="text-yellow-600 font-bold">Earth (ดิน)</span><span className="text-white font-mono">15%</span></div>
                          <div className="w-full bg-slate-800 rounded-full h-1.5"><div className="bg-yellow-600 h-1.5 rounded-full" style={{ width: "15%" }}></div></div>
                        </div>
                      </div>
                    </div>
                    <p className="text-[10px] text-slate-500">Charts are simulated using Bazi coordinates</p>
                  </div>
                </div>

                {/* Slide 2: Tarot & Destiny gauge */}
                <div className="w-full shrink-0 px-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-black/30 p-5 rounded-xl border border-white/5 flex flex-col items-center justify-center min-h-[280px] relative">
                    <h5 className="text-xs font-bold text-amber-400 uppercase tracking-widest flex items-center gap-1.5 absolute top-5 left-5">
                      <Sparkles className="w-4 h-4 text-amber-500" />
                      <span>{currentTranslations.prevTarot}</span>
                    </h5>
                    <div className="w-20 h-32 rounded-xl border border-amber-500/40 bg-gradient-to-b from-amber-950/70 to-slate-900 flex flex-col items-center justify-center p-3 relative shadow-[0_0_15px_rgba(245,158,11,0.2)] animate-pulse">
                      <Sun className="w-8 h-8 text-yellow-300" />
                      <div className="text-[9px] text-amber-200 font-bold uppercase tracking-wider mt-2">The Sun</div>
                      <div className="text-[7px] text-slate-500 uppercase font-mono absolute bottom-2">XIX • อาทิตย์</div>
                    </div>
                  </div>
                  <div className="bg-black/30 p-5 rounded-xl border border-white/5 flex flex-col items-center justify-center min-h-[280px] relative">
                    <h5 className="text-xs font-bold text-amber-400 uppercase tracking-widest flex items-center gap-1.5 absolute top-5 left-5">
                      <Award className="w-4 h-4 text-amber-500" />
                      <span>{currentTranslations.prevIndex}</span>
                    </h5>
                    <div className="relative w-24 h-24 flex items-center justify-center mt-4">
                      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="40" stroke="rgba(255,255,255,0.05)" strokeWidth="6" fill="transparent" />
                        <circle cx="50" cy="50" r="40" stroke="#8b5cf6" strokeWidth="6" fill="transparent"
                          strokeDasharray="251.2" strokeDashoffset="37.6" strokeLinecap="round" />
                      </svg>
                      <div className="absolute flex flex-col items-center justify-center">
                        <span className="text-xl font-extrabold text-white font-mono leading-none">85</span>
                        <span className="text-[7px] text-emerald-400 font-bold uppercase mt-1 tracking-wider">Excellent</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Slide 3: 100-Year Life Graph (Locked) */}
                <div className="w-full shrink-0 px-1 relative rounded-xl overflow-hidden min-h-[280px]">
                  {/* Blurry background */}
                  <div className="filter blur-[6px] opacity-25 select-none pointer-events-none grid grid-cols-3 gap-4 p-4 min-h-[280px] items-end">
                    <div className="h-[20%] bg-slate-700 rounded"></div>
                    <div className="h-[50%] bg-slate-700 rounded"></div>
                    <div className="h-[80%] bg-slate-700 rounded"></div>
                  </div>

                  {/* Lock overlay */}
                  <div className="absolute inset-0 bg-[#05050f]/60 backdrop-blur-[1px] flex flex-col items-center justify-center p-6 text-center z-20">
                    <div className="w-10 h-10 rounded-full bg-amber-500/10 border border-amber-500/40 flex items-center justify-center text-amber-400 mb-3">
                      <Lock className="w-4 h-4 text-amber-500" />
                    </div>
                    <h4 className="text-sm font-bold text-white mb-1.5">{currentTranslations.prevGraph}</h4>
                    <p className="text-[10px] text-slate-400 max-w-sm mb-4 leading-relaxed">{currentTranslations.prevLockDesc}</p>
                    <button 
                      onClick={() => {
                        setWizardOpen(true);
                        setCurrentStep(1);
                      }}
                      className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 text-black text-[10px] font-extrabold shadow-md hover:scale-[1.03] transition-all flex items-center gap-1.5"
                    >
                      <Zap className="w-3 h-3" />
                      <span>{currentTranslations.btnUnlock}</span>
                    </button>
                  </div>
                </div>

              </div>
            </div>

            {/* Slider Navigation controls */}
            <div className="flex items-center justify-between pt-4 border-t border-white/5">
              <button 
                onClick={() => setCarouselIndex(prev => Math.max(0, prev - 1))}
                className="w-8 h-8 rounded-full border border-white/10 hover:border-violet-500/40 text-slate-400 hover:text-white flex items-center justify-center transition-all"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <div className="flex items-center gap-2">
                {[0, 1, 2].map(idx => (
                  <button 
                    key={idx}
                    onClick={() => setCarouselIndex(idx)}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${carouselIndex === idx ? "bg-violet-500 w-5" : "bg-slate-700"}`}
                    aria-label={`Slide ${idx + 1}`}
                  ></button>
                ))}
              </div>
              <button 
                onClick={() => setCarouselIndex(prev => Math.min(2, prev + 1))}
                className="w-8 h-8 rounded-full border border-white/10 hover:border-violet-500/40 text-slate-400 hover:text-white flex items-center justify-center transition-all"
                aria-label="Next slide"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </section>

        {/* Testimonials */}
        <section className="flex flex-col gap-12">
          <div className="text-center flex flex-col gap-3">
            <h2 className="text-2xl md:text-3xl font-bold text-white font-serif">{currentTranslations.testimonialsTitle}</h2>
            <p className="text-slate-400 text-sm">{currentTranslations.testimonialsSub}</p>
            <div className="w-16 h-1 bg-gradient-to-r from-violet-500 to-indigo-500 mx-auto mt-2 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass-panel p-6 rounded-2xl border border-white/5 bg-slate-900/10 flex flex-col justify-between hover:border-violet-500/20 transition-all duration-300">
              <div>
                <div className="flex gap-1 text-amber-500 mb-3 text-xs">
                  {[1, 2, 3, 4, 5].map(s => <Sparkles key={s} className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />)}
                </div>
                <p className="text-slate-300 text-xs leading-relaxed mb-6 font-light">"{currentTranslations.rev1}"</p>
              </div>
              <div className="flex items-center gap-3 pt-3 border-t border-white/5">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white text-xs font-bold">KP</div>
                <div>
                  <h5 className="text-white text-xs font-bold">{currentTranslations.rev1User}</h5>
                  <p className="text-[9px] text-slate-500">{currentTranslations.rev1Role}</p>
                </div>
              </div>
            </div>

            <div className="glass-panel p-6 rounded-2xl border border-white/5 bg-slate-900/10 flex flex-col justify-between hover:border-violet-500/20 transition-all duration-300">
              <div>
                <div className="flex gap-1 text-amber-500 mb-3 text-xs">
                  {[1, 2, 3, 4, 5].map(s => <Sparkles key={s} className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />)}
                </div>
                <p className="text-slate-300 text-xs leading-relaxed mb-6 font-light">"{currentTranslations.rev2}"</p>
              </div>
              <div className="flex items-center gap-3 pt-3 border-t border-white/5">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white text-xs font-bold">ST</div>
                <div>
                  <h5 className="text-white text-xs font-bold">{currentTranslations.rev2User}</h5>
                  <p className="text-[9px] text-slate-500">{currentTranslations.rev2Role}</p>
                </div>
              </div>
            </div>

            <div className="glass-panel p-6 rounded-2xl border border-white/5 bg-slate-900/10 flex flex-col justify-between hover:border-violet-500/20 transition-all duration-300">
              <div>
                <div className="flex gap-1 text-amber-500 mb-3 text-xs">
                  {[1, 2, 3, 4, 5].map(s => <Sparkles key={s} className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />)}
                </div>
                <p className="text-slate-300 text-xs leading-relaxed mb-6 font-light">"{currentTranslations.rev3}"</p>
              </div>
              <div className="flex items-center gap-3 pt-3 border-t border-white/5">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white text-xs font-bold">NL</div>
                <div>
                  <h5 className="text-white text-xs font-bold">{currentTranslations.rev3User}</h5>
                  <p className="text-[9px] text-slate-500">{currentTranslations.rev3Role}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Accordion FAQ */}
        <section className="flex flex-col gap-12">
          <div className="text-center flex flex-col gap-3">
            <h2 className="text-2xl md:text-3xl font-bold text-white font-serif">{currentTranslations.faqTitle}</h2>
            <p className="text-slate-400 text-sm">{currentTranslations.faqSub}</p>
            <div className="w-16 h-1 bg-gradient-to-r from-violet-500 to-indigo-500 mx-auto mt-2 rounded-full"></div>
          </div>

          <div className="space-y-4 max-w-3xl mx-auto w-full">
            {[1, 2, 3, 4, 5, 6, 7, 8].map(id => {
              const qText = currentTranslations[`q${id}` as keyof typeof currentTranslations];
              const aText = currentTranslations[`a${id}` as keyof typeof currentTranslations];
              const isOpen = faqOpen === id;

              return (
                <div key={id} className="glass-panel rounded-2xl border border-white/5 overflow-hidden transition-all duration-300">
                  <button 
                    onClick={() => setFaqOpen(isOpen ? null : id)}
                    className="w-full px-6 py-4 text-left flex justify-between items-center text-white hover:text-violet-400 font-semibold transition-colors text-sm sm:text-base gap-4"
                  >
                    <span>{qText}</span>
                    <ChevronRight className={`w-4 h-4 text-violet-400 transition-transform duration-300 ${isOpen ? "rotate-90" : "rotate-0"}`} />
                  </button>
                  <div className={`transition-all duration-300 overflow-hidden bg-slate-950/20 ${isOpen ? "max-h-[300px] border-t border-white/5" : "max-h-0"}`}>
                    <div className="px-6 py-4 text-xs sm:text-sm text-slate-400 font-light leading-relaxed">
                      {aText}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Bottom CTA banner */}
        <section className="text-center mb-16 px-4 bg-gradient-to-r from-violet-950/40 via-indigo-950/20 to-violet-950/40 rounded-3xl border border-violet-500/25 p-12 md:p-16 flex flex-col items-center gap-6 shadow-2xl max-w-4xl mx-auto relative overflow-hidden">
          <div className="absolute top-[-50px] left-[-50px] w-48 h-48 bg-violet-600/10 rounded-full blur-3xl"></div>
          
          <h2 className="text-2xl md:text-3xl font-serif text-white font-bold leading-tight">
            {currentTranslations.bottomTitle}
          </h2>
          <button 
            onClick={() => {
              setWizardOpen(true);
              setCurrentStep(1);
            }}
            className="px-10 py-5 rounded-2xl bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-600 hover:from-amber-500 hover:via-yellow-400 hover:to-amber-500 text-black font-extrabold text-base shadow-[0_4px_30px_rgba(245,158,11,0.4)] transition-all hover:scale-[1.03] flex items-center gap-2 border border-yellow-300/40"
          >
            <Sparkles className="w-5 h-5 text-black" />
            <span>{currentTranslations.bottomCta}</span>
          </button>
        </section>

      </main>

      {/* Footer */}
      <footer className="w-full bg-[#03030b] border-t border-white/5 py-12 px-6 md:px-12 mt-20 relative z-10">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 text-slate-400 text-xs">
          
          {/* Brand description */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full border border-violet-500/50 flex items-center justify-center bg-gradient-to-b from-violet-900 to-indigo-950">
                <Moon className="w-4 h-4 text-yellow-300" />
              </div>
              <span className="font-bold text-base tracking-widest text-title-gradient font-serif">{currentTranslations.brand}</span>
            </div>
            <p className="leading-relaxed text-[11px] font-light">{currentTranslations.footerDesc}</p>
          </div>

          {/* Links 1 */}
          <div className="space-y-3">
            <h5 className="font-bold text-white uppercase tracking-widest text-[10px]">{currentTranslations.footerCol1}</h5>
            <ul className="space-y-2.5 font-light">
              <li><a href="dashboard.html" className="hover:text-white transition-colors">{currentTranslations.navDashboard}</a></li>
              <li><a href="chinese-calendar.html" className="hover:text-white transition-colors">{currentTranslations.navCalendar}</a></li>
              <li><a href="tarot.html" className="hover:text-white transition-colors">{currentTranslations.navTarot}</a></li>
              <li><a href="siemsi.html" className="hover:text-white transition-colors">เซียมซีนำทาง (Siemsi)</a></li>
            </ul>
          </div>

          {/* Links 2 */}
          <div className="space-y-3">
            <h5 className="font-bold text-white uppercase tracking-widest text-[10px]">{currentTranslations.footerCol2}</h5>
            <ul className="space-y-2.5 font-light">
              <li><a href="policy.html" target="_blank" className="hover:text-white transition-colors">นโยบายความเป็นส่วนตัว (Privacy)</a></li>
              <li><a href="terms.html" target="_blank" className="hover:text-white transition-colors">ข้อตกลงการใช้งาน (Terms)</a></li>
              <li><a href="donate.html" className="hover:text-white transition-colors">สนับสนุนผู้พัฒนา (Support Us)</a></li>
            </ul>
          </div>

          {/* Connect */}
          <div className="space-y-3">
            <h5 className="font-bold text-white uppercase tracking-widest text-[10px]">{currentTranslations.footerCol3}</h5>
            <p className="font-light">Email: support@likitfah.com</p>
            <div className="flex gap-4 pt-1.5 text-base">
              <a href="#" aria-label="Facebook" className="hover:text-white transition-colors"><Share2 className="w-4 h-4" /></a>
              <a href="#" aria-label="Email" className="hover:text-white transition-colors"><Mail className="w-4 h-4" /></a>
              <a href="#" aria-label="Website" className="hover:text-white transition-colors"><Globe className="w-4 h-4" /></a>
            </div>
          </div>

        </div>

        <div className="border-t border-white/5 mt-10 pt-6 text-center text-[10px] text-slate-500 font-medium">
          <p>&copy; 2026 LikitFah.com • The Mystic Oracle. All Rights Reserved.</p>
        </div>
      </footer>

      {/* Floating Live Activity Widget */}
      <div id="live-activity-widget" className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-[80] glass-panel px-4 py-2.5 rounded-full border border-emerald-500/30 shadow-[0_4px_20px_rgba(16,185,129,0.15)] flex items-center gap-2.5 transition-all hover:scale-[1.03] bg-[#05050f]/90">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
        <span className="text-[10px] sm:text-xs text-slate-300 font-medium">
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
        className={`fixed bottom-0 left-0 right-0 z-[90] bg-[#05050f]/95 backdrop-blur-md border-t border-violet-500/25 px-4 py-3.5 shadow-[0_-5px_25px_rgba(0,0,0,0.6)] flex sm:hidden justify-center items-center transition-all duration-300 ${showStickyCta ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"}`}
      >
        <button 
          onClick={() => {
            setWizardOpen(true);
            setCurrentStep(1);
          }}
          className="w-full py-3.5 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 text-black font-extrabold text-sm rounded-xl shadow-md flex justify-center items-center gap-1.5"
        >
          <span>{lang === "th" ? "🔮 วิเคราะห์ดวงชะตาฟรี →" : "🔮 Free Reading →"}</span>
        </button>
      </div>

      {/* Interactive Step Wizard Modal (Overlay Dialog) */}
      {wizardOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#05050f]/90 backdrop-blur-sm">
          <div className="absolute inset-0" onClick={() => setWizardOpen(false)}></div>
          
          <div className="glass-panel w-full max-w-md rounded-2xl p-6 md:p-8 relative border border-violet-500/30 shadow-2xl z-10 flex flex-col gap-6">
            
            {/* Close Button */}
            <button 
              onClick={() => setWizardOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
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
                            ? "bg-violet-600 border-violet-400 text-white shadow-lg shadow-violet-500/30" 
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
                        <h3 className="text-lg font-bold text-white">{currentTranslations.wizardStep1}</h3>
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
                        <h3 className="text-lg font-bold text-white">{currentTranslations.wizardStep2}</h3>
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
                        <h3 className="text-lg font-bold text-white">{currentTranslations.wizardStep3}</h3>
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
                        className="flex-1 py-3 border border-slate-800 hover:bg-slate-900 text-slate-300 font-bold text-sm rounded-xl transition-all"
                      >
                        {currentTranslations.btnPrev}
                      </button>
                    )}
                    {currentStep < 3 ? (
                      <button 
                        type="button" 
                        onClick={handleNextStep}
                        className="flex-1 py-3 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-bold text-sm rounded-xl shadow-lg transition-all"
                      >
                        {currentTranslations.btnNext}
                      </button>
                    ) : (
                      <button 
                        type="submit"
                        className="flex-1 py-3 bg-gradient-to-r from-amber-600 to-yellow-500 text-black font-extrabold text-sm rounded-xl shadow-lg hover:scale-[1.02] transition-all"
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
                  <h3 className="text-base font-bold text-white mt-1">{currentTranslations.loadingTitle}</h3>
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
