"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import type { HeroContent } from "@/content/types";
import { SmartImage } from "@/components/media/SmartImage";

const CABIN = "#211f33"; // สีผนังห้องโดยสารเครื่องบิน (มืดอบอุ่น)

function PlaneIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
      <path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L11 19v-5.5L21 16Z" />
    </svg>
  );
}

/**
 * หน้าเปิดเรื่อง: มองผ่าน "หน้าต่างเครื่องบิน"
 * เลื่อนลง → หน้าต่างค่อยๆ ขยายจนพาเรา "ทะลุ" ออกไปสู่เนื้อหา (parallax zoom-through)
 */
export function Hero({ data }: { data: HeroContent }) {
  const reduce = useReducedMotion() ?? false;
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // หน้าต่างขยายจนทะลุ + มุมโค้งลดลงจนเต็มจอ
  const winScale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 5.5]);
  const winRadius = useTransform(
    scrollYProgress,
    [0, 0.75],
    ["46%", reduce ? "46%" : "6%"],
  );
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.15, reduce ? 1.15 : 1.3]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.28], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.5], ["0%", reduce ? "0%" : "-14%"]);
  const hintOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0]);

  return (
    <section ref={ref} className="relative h-[180svh] bg-night sm:h-[240svh]">
      {/* พินไว้กลางจอระหว่างสไลด์ */}
      <div className="sticky top-0 flex h-[100svh] min-h-[560px] items-center justify-center overflow-hidden text-cream">
        {/* วิวนอกหน้าต่าง (พื้นหลังเต็มจอ) */}
        <motion.div style={{ scale: bgScale }} className="absolute inset-0">
          <SmartImage
            image={{ src: "/media/hero.svg", alt: "" }}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </motion.div>

        {/* หน้าต่างเครื่องบิน: กล่องโปร่งที่มีเงา (box-shadow) บังรอบๆ เป็นผนังห้องโดยสาร */}
        <motion.div
          aria-hidden="true"
          style={{
            scale: winScale,
            borderRadius: winRadius,
            boxShadow: `inset 0 0 70px rgba(0,0,0,0.55), 0 0 0 220vmax ${CABIN}`,
          }}
          className="relative h-[74vmin] w-[60vmin] border-[10px] border-white/12"
        />

        {/* ข้อความหัวเรื่อง (ลอยอยู่เหนือหน้าต่าง จางหายตอนเลื่อน) */}
        <motion.div
          style={{ opacity: contentOpacity, y: contentY }}
          className="pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-center gap-5 px-6 text-center"
        >
          <motion.span
            initial={{ opacity: 0, y: reduce ? 0 : 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.35em] text-gold drop-shadow"
          >
            <PlaneIcon />
            {data.eyebrow}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: reduce ? 0 : 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.35 }}
            className="font-display text-5xl font-bold leading-tight text-balance drop-shadow-lg sm:text-6xl lg:text-8xl"
          >
            {data.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: reduce ? 0 : 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.55 }}
            className="max-w-xl text-lg text-cream/90 drop-shadow sm:text-xl"
          >
            {data.subtitle}
          </motion.p>

          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.75 }}
            className="mt-2 rounded-full border border-gold/40 bg-night/30 px-4 py-1.5 text-sm text-gold backdrop-blur-sm"
          >
            {data.date}
          </motion.span>
        </motion.div>

        {/* ตัวชี้ให้เลื่อนลง */}
        <motion.div
          aria-hidden="true"
          style={{ opacity: hintOpacity }}
          className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-2"
        >
          <span className="text-[11px] uppercase tracking-[0.25em] text-cream/70">
            เลื่อนเพื่อออกเดินทาง
          </span>
          <motion.div
            animate={reduce ? undefined : { y: [0, 8, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className="flex h-10 w-6 items-start justify-center rounded-full border-2 border-cream/50 p-1.5"
          >
            <span className="h-2 w-1 rounded-full bg-cream/70" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;
