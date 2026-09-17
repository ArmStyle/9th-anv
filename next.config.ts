import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // อนุญาตให้ next/image แสดงไฟล์ SVG (ใช้กับรูป placeholder ของเรา ซึ่งเป็นไฟล์ในโปรเจคเอง จึงปลอดภัย)
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
