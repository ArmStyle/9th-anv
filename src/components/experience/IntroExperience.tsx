"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { IntroContent, MusicContent } from "@/content/types";
import { MusicToggle } from "./MusicToggle";
import { AmbientController } from "./AmbientController";
import { HeartCursorTrail } from "@/components/effects/HeartCursorTrail";

function HeartIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden="true">
      <path d="M12 21s-6.7-4.3-9.3-8.2C.9 10 1.7 6.4 4.6 5.2 6.8 4.3 9 5.1 12 8c3-2.9 5.2-3.7 7.4-2.8 2.9 1.2 3.7 4.8 1.9 7.6C18.7 16.7 12 21 12 21Z" />
    </svg>
  );
}

/**
 * ครอบทั้งเว็บ: จัดการหน้า Intro Gate + เพลงบรรเลง
 * - ก่อนกดเริ่ม: แสดง overlay เต็มจอ + ล็อกไม่ให้เลื่อน
 * - กดเริ่ม: overlay จางหาย และเริ่มเล่นเพลง (ต้องมี user gesture ก่อน browser ถึงยอมให้เล่นเสียง)
 * - หลังเริ่ม: มีปุ่มเปิด/ปิดเพลงลอยมุมจอ
 * - ถ้าไม่มีไฟล์เพลง ทุกอย่างยังทำงานได้ปกติ (แค่ไม่มีเสียง)
 */
export function IntroExperience({
  intro,
  music,
  ambientTracks = [],
  children,
}: {
  intro: IntroContent;
  music: MusicContent;
  /** รายชื่อเสียงบรรยากาศที่ต้องเตรียม (เช่น ["city","wind"]) */
  ambientTracks?: string[];
  children: ReactNode;
}) {
  const reduce = useReducedMotion() ?? false;
  const [started, setStarted] = useState(false);
  // playing = "เปิดเสียงอยู่ไหม" (คุมทั้งเพลงคลอและเสียงบรรยากาศ)
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // ล็อกการเลื่อนขณะยังไม่กดเริ่ม
  useEffect(() => {
    document.body.style.overflow = started ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [started]);

  const start = useCallback(() => {
    setStarted(true);
    setPlaying(true); // เปิดเสียงไว้ (เสียงบรรยากาศจะเล่นแม้ยังไม่มีไฟล์เพลงคลอ)
    const audio = audioRef.current;
    if (audio) {
      audio.volume = 0.8;
      audio.play().catch(() => {}); // ไม่มีไฟล์/ถูกบล็อก ก็ไม่เป็นไร
    }
  }, []);

  const toggleMusic = useCallback(() => {
    setPlaying((prev) => {
      const next = !prev;
      const audio = audioRef.current;
      if (audio) {
        if (next) audio.play().catch(() => {});
        else audio.pause();
      }
      return next;
    });
  }, []);

  return (
    <>
      {/* เพลงบรรเลง (วนซ้ำ) — ถ้ายังไม่มีไฟล์ music.src จะเงียบเฉยๆ ไม่ error */}
      <audio ref={audioRef} src={music.src} loop preload="auto" />

      {children}

      {started && (
        <AmbientController tracks={ambientTracks} enabled={playing} />
      )}
      {started && <MusicToggle playing={playing} onToggle={toggleMusic} />}
      {started && <HeartCursorTrail />}

      <AnimatePresence>
        {!started && (
          <motion.div
            key="intro-gate"
            className="fixed inset-0 z-[60] flex items-center justify-center overflow-hidden bg-sunset-gradient px-6 text-center text-cream"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.9, ease: "easeInOut" }}
          >
            {/* หัวใจลอยเบาๆ เป็นพื้นหลัง */}
            {!reduce &&
              Array.from({ length: 6 }).map((_, i) => (
                <motion.span
                  key={i}
                  className="absolute text-rose/30"
                  style={{ left: `${12 + i * 15}%`, bottom: "-10%" }}
                  animate={{ y: ["0%", "-120vh"], opacity: [0, 0.6, 0] }}
                  transition={{
                    duration: 9 + i * 1.5,
                    repeat: Infinity,
                    delay: i * 1.2,
                    ease: "easeInOut",
                  }}
                >
                  <HeartIcon />
                </motion.span>
              ))}

            <motion.div
              className="flex max-w-md flex-col items-center gap-5"
              initial={{ opacity: 0, y: reduce ? 0 : 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.35em] text-gold">
                <HeartIcon />
                {intro.eyebrow}
              </span>
              <h1 className="font-display text-4xl font-bold text-balance sm:text-5xl">
                {intro.title}
              </h1>
              <p className="leading-relaxed text-cream/85">{intro.subtitle}</p>
              <button
                type="button"
                onClick={start}
                className="mt-3 rounded-full bg-cream px-8 py-3.5 font-medium text-night shadow-xl transition-transform duration-300 hover:scale-105 active:scale-95"
              >
                {intro.buttonLabel}
              </button>
              <span className="text-xs text-cream/60">🎧 เปิดเสียงเพื่อประสบการณ์ที่ดีที่สุด</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default IntroExperience;
