"use client";

import { useEffect, useRef, useState } from "react";

const TARGET_VOL = 0.22; // ระดับเสียงบรรยากาศ (เบาๆ คลอ ไม่กลบเพลง)
const FADE_MS = 800;

const fadeRaf = new WeakMap<HTMLAudioElement, number>();

/** ค่อยๆ ไล่ระดับเสียงไปยังค่าเป้าหมาย แล้ว pause ถ้าเงียบสุด */
function fade(audio: HTMLAudioElement, to: number) {
  const prev = fadeRaf.get(audio);
  if (prev) cancelAnimationFrame(prev);
  const from = audio.volume;
  let startTs: number | null = null;
  const step = (ts: number) => {
    if (startTs == null) startTs = ts;
    const p = Math.min((ts - startTs) / FADE_MS, 1);
    audio.volume = Math.max(0, Math.min(1, from + (to - from) * p));
    if (p < 1) {
      fadeRaf.set(audio, requestAnimationFrame(step));
    } else {
      fadeRaf.delete(audio);
      if (to === 0 && !audio.paused) audio.pause();
    }
  };
  fadeRaf.set(audio, requestAnimationFrame(step));
}

/**
 * เสียงบรรยากาศต่อฉาก: เล่น/crossfade เสียงตาม section ที่กำลังเห็นในจอ
 * - tracks: รายชื่อเสียงที่ต้องเตรียม (เช่น ["city","wind"]) ไฟล์อยู่ที่ /media/audio/<name>.wav
 * - enabled: เปิดเสียงอยู่ไหม (ผูกกับปุ่มเปิด/ปิดเสียงรวม)
 * - ถ้าไฟล์เสียงหาย จะเงียบเฉยๆ ไม่ error
 */
export function AmbientController({
  tracks,
  enabled,
}: {
  tracks: string[];
  enabled: boolean;
}) {
  const [current, setCurrent] = useState<string | null>(null);
  const audios = useRef<Map<string, HTMLAudioElement>>(new Map());

  // สังเกตว่า section ไหนเห็นชัดสุด แล้วตั้งเป็นบรรยากาศปัจจุบัน
  useEffect(() => {
    const els = Array.from(
      document.querySelectorAll<HTMLElement>("[data-ambient]"),
    );
    if (els.length === 0) return;

    const ratios = new Map<Element, number>();
    const pickBest = () => {
      let best: string | null = null;
      let bestR = 0.15; // ต้องเห็นพอสมควรก่อนถึงเปลี่ยนเสียง
      for (const [el, r] of ratios) {
        if (r > bestR) {
          bestR = r;
          best = (el as HTMLElement).dataset.ambient ?? null;
        }
      }
      if (best) setCurrent(best);
    };

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          ratios.set(e.target, e.isIntersecting ? e.intersectionRatio : 0);
        }
        pickBest();
      },
      { threshold: [0, 0.15, 0.35, 0.6, 0.85, 1] },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // crossfade ตามบรรยากาศปัจจุบัน + สถานะเปิดเสียง
  useEffect(() => {
    const active = enabled ? current : null;
    audios.current.forEach((audio, name) => {
      const target = name === active ? TARGET_VOL : 0;
      if (target > 0 && audio.paused) {
        audio.volume = 0;
        audio.play().catch(() => {});
      }
      fade(audio, target);
    });
  }, [current, enabled, tracks]);

  if (tracks.length === 0) return null;

  return (
    <>
      {tracks.map((name) => (
        <audio
          key={name}
          ref={(el) => {
            if (el) audios.current.set(name, el);
            else audios.current.delete(name);
          }}
          src={`/media/audio/${name}.wav`}
          loop
          preload="auto"
        />
      ))}
    </>
  );
}

export default AmbientController;
