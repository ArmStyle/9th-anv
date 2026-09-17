// สร้างรูป placeholder แบบ SVG เข้าธีมท่องเที่ยว (ใช้ชั่วคราวก่อนใส่รูปจริง)
// รันด้วย: node scripts/gen-placeholders.mjs
// โครงสร้าง: public/media/hero.svg + public/media/trips/<slug>/photo-N.svg, clip-N.svg
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const mediaDir = join(__dirname, "..", "public", "media");

// เฉดหม่นๆ สบายตา (บน, กลาง, ล่าง)
const palettes = {
  hero: ["#2a2740", "#7a5563", "#dd9070"],
  taiwan: ["#332e50", "#7d6ba0", "#e6b184"],
  fukuoka: ["#3a3357", "#c98a86", "#f0d3b0"],
  shanghai: ["#42283a", "#b06a63", "#e0b878"],
  fuji: ["#33566b", "#82b0be", "#e6eeee"],
  hongkong: ["#26283f", "#5a7ba6", "#dd9070"],
  osaka: ["#3a3357", "#caa0a0", "#f2dcc0"],
  lijiang: ["#3d3450", "#9a7fa6", "#e6c79b"],
};

function svg({ w, h, top, mid, bottom, label, sub, seed = 0 }) {
  const hill = (y, color, opacity) =>
    `<path d="M0 ${y} Q ${w * 0.25} ${y - 60 - seed * 8} ${w * 0.5} ${y - 20} T ${w} ${y - 40} V ${h} H0 Z" fill="${color}" opacity="${opacity}"/>`;

  const stars = Array.from({ length: 18 })
    .map((_, i) => {
      const x = ((i * 97 + seed * 53) % w) + 5;
      const y = ((i * 61 + seed * 29) % (h * 0.5)) + 8;
      const r = (i % 3) * 0.6 + 0.6;
      return `<circle cx="${x}" cy="${y}" r="${r}" fill="#fff" opacity="${0.4 + (i % 3) * 0.12}"/>`;
    })
    .join("");

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <defs>
    <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${top}"/>
      <stop offset="55%" stop-color="${mid}"/>
      <stop offset="100%" stop-color="${bottom}"/>
    </linearGradient>
    <linearGradient id="fade" x1="0" y1="0" x2="0" y2="1">
      <stop offset="60%" stop-color="#000" stop-opacity="0"/>
      <stop offset="100%" stop-color="#000" stop-opacity="0.42"/>
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#sky)"/>
  ${stars}
  <circle cx="${w * 0.72}" cy="${h * 0.3}" r="${h * 0.1}" fill="#fff" opacity="0.8"/>
  <circle cx="${w * 0.72}" cy="${h * 0.3}" r="${h * 0.1 + 10}" fill="#fff" opacity="0.1"/>
  ${hill(h * 0.78, mid, 0.5)}
  ${hill(h * 0.9, bottom, 0.75)}
  ${hill(h * 1.02, top, 0.5)}
  <rect width="${w}" height="${h}" fill="url(#fade)"/>
  <text x="28" y="${h - 46}" fill="#fff" font-family="Georgia, serif" font-size="34" font-weight="700" opacity="0.95">${label}</text>
  <text x="30" y="${h - 20}" fill="#fff" font-family="Helvetica, Arial, sans-serif" font-size="15" letter-spacing="3" opacity="0.78">${sub}</text>
</svg>`;
}

let seedCounter = 0;
function writeSvg(path, { w, h, pal, label, sub }) {
  const [top, mid, bottom] = palettes[pal];
  const content = svg({ w, h, top, mid, bottom, label, sub, seed: seedCounter++ });
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, content, "utf8");
}

// ---- Hero ----
writeSvg(join(mediaDir, "hero.svg"), {
  w: 1600,
  h: 1000,
  pal: "hero",
  label: "9 ปีของเรา",
  sub: "OUR JOURNEY TOGETHER",
});

// ---- Trips (เรียงตาม timeline) ----
const trips = [
  { slug: "taipei-1", pal: "taiwan", label: "ไทเป", sub: "TAIPEI · TAIWAN", photos: 5, clips: 1 },
  { slug: "fukuoka", pal: "fukuoka", label: "ฟุกุโอกะ", sub: "FUKUOKA · JAPAN", photos: 5, clips: 1 },
  { slug: "taipei-2", pal: "taiwan", label: "ไทเป", sub: "TAIPEI · TAIWAN", photos: 5, clips: 1 },
  { slug: "shanghai", pal: "shanghai", label: "เซี่ยงไฮ้", sub: "SHANGHAI · CHINA", photos: 4, clips: 1 },
  { slug: "tokyo-fuji", pal: "fuji", label: "โตเกียว · ฟูจิ", sub: "TOKYO · FUJI · JAPAN", photos: 4, clips: 1 },
  { slug: "hongkong", pal: "hongkong", label: "ฮ่องกง", sub: "HONG KONG", photos: 4, clips: 1 },
  { slug: "nagoya-osaka", pal: "osaka", label: "นาโกย่า · โอซาก้า", sub: "NAGOYA · OSAKA · JAPAN", photos: 5, clips: 1 },
  { slug: "taipei-3", pal: "taiwan", label: "ไทเป", sub: "TAIPEI · TAIWAN", photos: 1, clips: 1 },
  { slug: "lijiang", pal: "lijiang", label: "ลี่เจียง", sub: "LIJIANG · CHINA", photos: 4, clips: 1 },
];

let total = 1;
for (const trip of trips) {
  const dir = join(mediaDir, "trips", trip.slug);
  for (let i = 1; i <= trip.photos; i++) {
    // รูปแรกแนวนอน รูปถัดไปสลับจัตุรัส/แนวตั้งเพื่อความหลากหลายใน masonry
    const shape = i === 1 ? [1200, 900] : i % 3 === 0 ? [1000, 1250] : [1000, 1000];
    writeSvg(join(dir, `photo-${i}.svg`), {
      w: shape[0],
      h: shape[1],
      pal: trip.pal,
      label: trip.label,
      sub: `${trip.sub} · ${i}`,
    });
    total++;
  }
  for (let i = 1; i <= trip.clips; i++) {
    // โปสเตอร์วิดีโอแนวตั้ง 9:16
    writeSvg(join(dir, `clip-${i}.svg`), {
      w: 720,
      h: 1280,
      pal: trip.pal,
      label: trip.label,
      sub: `${trip.sub} · CLIP ${i}`,
    });
    total++;
  }
}

console.log(`Done. Generated ${total} placeholder images (hero + ${trips.length} trips) in public/media/`);
