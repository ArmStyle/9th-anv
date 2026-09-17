/**
 * สร้าง blur placeholder (data URL) โทนอุ่นๆ ไว้แสดงระหว่างรูปยังโหลดไม่เสร็จ
 * ใช้ SVG ไล่เฉดสี base64 เพื่อให้ next/image ทำ transition เบลอ -> ชัด ได้เนียน
 */
const shimmerSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="12">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#37324f"/>
      <stop offset="60%" stop-color="#7a5563"/>
      <stop offset="100%" stop-color="#dd9070"/>
    </linearGradient>
  </defs>
  <rect width="16" height="12" fill="url(#g)"/>
</svg>`;

function toBase64(str: string): string {
  if (typeof window === "undefined") {
    return Buffer.from(str).toString("base64");
  }
  return window.btoa(str);
}

export const BLUR_DATA_URL = `data:image/svg+xml;base64,${toBase64(shimmerSvg)}`;
