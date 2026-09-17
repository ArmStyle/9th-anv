import type { Metadata, Viewport } from "next";
import { Noto_Sans_Thai, Noto_Serif_Thai } from "next/font/google";
import "./globals.css";

const notoSansThai = Noto_Sans_Thai({
  variable: "--font-body",
  subsets: ["thai", "latin"],
  display: "swap",
});

const notoSerifThai = Noto_Serif_Thai({
  variable: "--font-display",
  subsets: ["thai", "latin"],
  display: "swap",
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  title: "9 ปีของเรา 💕",
  description: "ของขวัญครบรอบ 9 ปีที่เดินทางมาด้วยกัน ผ่านหลายเมือง หลายประเทศ แต่คนข้างๆ ยังเป็นคนเดิม",
  openGraph: {
    title: "9 ปีของเรา 💕",
    description: "ของขวัญครบรอบ 9 ปีที่เดินทางมาด้วยกัน ผ่านหลายเมือง หลายประเทศ แต่คนข้างๆ ยังเป็นคนเดิม",
    type: "website",
    locale: "th_TH",
    images: [
      {
        url: "/media/hero.svg",
        width: 1600,
        height: 1000,
        alt: "9 ปีของเรา",
      },
    ],
  },
  robots: {
    index: false,   // ไม่อยากให้ Google index (เว็บส่วนตัว)
    follow: false,
  },
};

export const viewport: Viewport = {
  themeColor: "#2a2740",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="th"
      className={`${notoSansThai.variable} ${notoSerifThai.variable} h-full antialiased`}
    >
      <body className="min-h-full">{children}</body>
    </html>
  );
}
