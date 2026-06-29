import type { Metadata } from "next";
import { Kanit, Cinzel } from "next/font/google";
import "./globals.css";

const kanit = Kanit({
  variable: "--font-sans",
  subsets: ["thai", "latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const cinzel = Cinzel({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "ลิขิตฟ้า (Likit Fah) - พลิกชะตาฟ้าลิขิต ด้วยศาสตร์แห่งตัวเลขและพยากรณ์",
  description: "ศูนย์รวมศาสตร์พยากรณ์ ตรวจหวย ทำนายฝัน เซียมซี ไพ่ทาโรต์ และวิเคราะห์ตัวเลขมงคลครบวงจร แม่นยำด้วยสถิติและระบบคำนวณโหราศาสตร์",
  keywords: "ดูดวง, ตรวจหวย, ทำนายฝัน, เซียมซี, ไพ่ทาโรต์, เบอร์มงคล, ลิขิตฟ้า, ปาจื่อ, บาจื่อ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="th"
      className={`${kanit.variable} ${cinzel.variable} h-full antialiased`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Kanit:wght@300;400;500;600;700;800&family=Cinzel:wght@400;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-full flex flex-col bg-[#05050f] text-slate-200">
        {children}
      </body>
    </html>
  );
}
