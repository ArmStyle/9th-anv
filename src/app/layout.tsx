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
  title: "9 ปีของเรา",
  description: "บันทึกการเดินทางของเราสองคน ครบรอบ 9 ปี",
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
