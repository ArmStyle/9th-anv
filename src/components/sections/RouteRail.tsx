"use client";

import type { RefObject } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";

function PlaneIcon() {
  // เครื่องบินหันหัวลง (วิ่งตามเส้นทางจากบนลงล่าง)
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 rotate-180" fill="currentColor" aria-hidden="true">
      <path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L11 19v-5.5L21 16Z" />
    </svg>
  );
}

/**
 * เส้นทางเดินทางแนวตั้งตลอดหน้า Story + ไอคอนเครื่องบินวิ่งตามการเลื่อน
 * - เส้นประ = เส้นทางทั้งหมด, เส้นทึบ = ระยะที่เดินทางมาแล้ว
 * - วางไว้ริมซ้าย (เลเยอร์หลังเนื้อหา) ไม่ขวางการคลิก
 */
export function RouteRail({ targetRef }: { targetRef: RefObject<HTMLElement | null> }) {
  const reduce = useReducedMotion() ?? false;
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });
  const p = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  const traveled = useTransform(p, [0, 1], ["0%", "100%"]);
  const planeTop = useTransform(p, [0, 1], ["0%", "100%"]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-y-0 left-1 z-0 w-7 sm:left-6"
    >
      {/* เส้นทางทั้งหมด (เส้นประ) */}
      <div className="absolute inset-y-0 left-1/2 w-[2px] -translate-x-1/2 opacity-35 [background:repeating-linear-gradient(to_bottom,var(--color-sunset)_0_8px,transparent_8px_18px)]" />
      {/* ระยะที่เดินทางมาแล้ว (เส้นทึบ) */}
      <motion.div
        style={{ height: reduce ? "100%" : traveled }}
        className="absolute left-1/2 top-0 w-[3px] -translate-x-1/2 rounded-full bg-sunset/70"
      />
      {/* ไอคอนเครื่องบินวิ่งตาม scroll */}
      <motion.div
        style={{ top: reduce ? "50%" : planeTop }}
        className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-cream text-sunset shadow-md ring-2 ring-sunset/30">
          <PlaneIcon />
        </span>
      </motion.div>
    </div>
  );
}

export default RouteRail;
