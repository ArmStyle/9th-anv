"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";

const TOTAL_KM = 38000; // ระยะทางรวมโดยประมาณของการเดินทาง (ปรับได้)

function PlaneIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 rotate-180" fill="currentColor" aria-hidden="true">
      <path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L11 19v-5.5L21 16Z" />
    </svg>
  );
}

/**
 * มาตรวัด "ไมล์การเดินทาง" ริมขวาจอ — เติมขึ้นตามการเลื่อน
 * บอกคร่าวๆ ว่าเดินทางมาแล้วกี่กิโลเมตร (แปรผันตาม scroll ทั้งหน้า)
 */
export function JourneyGauge() {
  const { scrollYProgress } = useScroll();
  const p = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  const fillHeight = useTransform(p, [0, 1], ["0%", "100%"]);
  const markerTop = useTransform(p, [0, 1], ["0%", "100%"]);
  const kmText = useTransform(p, (v) => `${Math.round(v * TOTAL_KM).toLocaleString("th-TH")} กม.`);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed right-3 top-1/2 z-40 hidden -translate-y-1/2 items-center gap-2 sm:flex"
    >
      {/* ป้ายกิโลเมตร */}
      <motion.span
        className="rounded-full bg-night/80 px-2.5 py-1 text-[11px] font-medium tabular-nums text-cream shadow ring-1 ring-white/10 backdrop-blur"
      >
        {kmText}
      </motion.span>

      {/* แถบมาตรวัดแนวตั้ง + หมุดเครื่องบินไล่ตามความคืบหน้า */}
      <div className="relative h-[42vh] w-1.5 rounded-full bg-foreground/10">
        <motion.div
          style={{ height: fillHeight }}
          className="absolute inset-x-0 top-0 rounded-full bg-gradient-to-b from-sunset via-rose to-gold"
        />
        <motion.div
          style={{ top: markerTop }}
          className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-cream text-sunset shadow ring-2 ring-sunset/30">
            <PlaneIcon />
          </span>
        </motion.div>
      </div>
    </div>
  );
}

export default JourneyGauge;
