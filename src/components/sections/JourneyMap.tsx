"use client";

import { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { StorySection } from "@/content/types";
import { Reveal } from "@/components/ui/Reveal";

type Place = { x: number; y: number; city: string };

function smoothPath(points: Place[]): string {
  if (points.length === 0) return "";
  if (points.length === 1) return `M ${points[0].x} ${points[0].y}`;
  let d = `M ${points[0].x} ${points[0].y}`;
  for (let i = 1; i < points.length; i++) {
    const prev = points[i - 1];
    const cur = points[i];
    const midX = (prev.x + cur.x) / 2;
    const midY = (prev.y + cur.y) / 2;
    d += ` Q ${prev.x} ${prev.y} ${midX} ${midY}`;
  }
  const last = points[points.length - 1];
  d += ` T ${last.x} ${last.y}`;
  return d;
}

function PinDot({ delay = 0 }: { delay?: number }) {
  const reduce = useReducedMotion() ?? false;
  return (
    <motion.span
      className="relative flex h-3.5 w-3.5 shrink-0 items-center justify-center"
      initial={{ opacity: 0, scale: reduce ? 1 : 0 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.35, delay: reduce ? 0 : delay, type: "spring", stiffness: 260, damping: 18 }}
    >
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sunset/40" />
      <span className="relative h-2.5 w-2.5 rounded-full bg-sunset ring-2 ring-background" />
    </motion.span>
  );
}

/**
 * แผนที่เส้นทางการเดินทาง
 * - mobile (< sm): แสดงเป็น timeline แนวตั้ง (เมืองเรียงจากบนลงล่าง) ไม่มีป้ายชนกัน
 * - sm+: SVG map แนวนอน เส้นบินวาดตัวเองตอน scroll
 */
export function JourneyMap({ sections }: { sections: StorySection[] }) {
  const reduce = useReducedMotion() ?? false;

  const places = useMemo(() => {
    const seen = new Set<string>();
    const out: { city: string; country?: string }[] = [];
    for (const s of sections) {
      if ("place" in s && s.place?.city && !seen.has(s.place.city)) {
        seen.add(s.place.city);
        out.push({ city: s.place.city, country: s.place.country });
      }
    }
    return out;
  }, [sections]);

  const mapPoints = useMemo<Place[]>(() => {
    const n = places.length;
    const margin = 8;
    const span = 100 - margin * 2;
    return places.map((p, i) => ({
      x: n === 1 ? 50 : margin + (span * i) / (n - 1),
      y: 50 + Math.sin(i * 0.9) * 22,
      city: p.city,
    }));
  }, [places]);

  const d = useMemo(() => smoothPath(mapPoints), [mapPoints]);

  if (places.length < 2) return null;

  return (
    <section className="bg-gradient-to-b from-background to-sand/60 px-5 py-16 sm:px-6 sm:py-24">
      <Reveal className="mx-auto mb-8 max-w-2xl text-center sm:mb-12">
        <span className="text-xs uppercase tracking-[0.3em] text-sunset">our map</span>
        <h2 className="font-display mt-2 text-2xl font-bold text-balance sm:text-3xl md:text-4xl">
          เส้นทางการเดินทางของเรา
        </h2>
        <p className="mt-2 text-sm text-foreground/60 sm:mt-3 sm:text-base">
          ทุกหมุดคือความทรงจำที่เราสร้างด้วยกัน
        </p>
      </Reveal>

      {/* Mobile: vertical timeline */}
      <div className="mx-auto max-w-sm sm:hidden">
        <div className="relative pl-8">
          {/* เส้นแนวตั้ง */}
          <div className="absolute left-3 top-1 h-full w-0.5 rounded-full bg-sunset/25" />
          {places.map((p, i) => (
            <Reveal
              key={p.city}
              delay={reduce ? 0 : i * 0.08}
              className="relative mb-5 last:mb-0"
            >
              {/* หมุด */}
              <div className="absolute -left-5">
                <PinDot delay={i * 0.08} />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">{p.city}</p>
                {p.country && (
                  <p className="text-xs text-foreground/50">{p.country}</p>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Desktop: SVG map */}
      <div className="relative mx-auto hidden aspect-[16/9] w-full max-w-4xl sm:block lg:aspect-[16/7]">
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="absolute inset-0 h-full w-full"
          aria-hidden="true"
        >
          <motion.path
            d={d}
            fill="none"
            stroke="var(--color-sunset)"
            strokeWidth={0.7}
            strokeDasharray="2 2"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            initial={{ pathLength: reduce ? 1 : 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: reduce ? 0 : 2.2, ease: "easeInOut" }}
          />
        </svg>

        {mapPoints.map((p, i) => (
          <motion.div
            key={p.city}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${p.x}%`, top: `${p.y}%` }}
            initial={{ opacity: 0, scale: reduce ? 1 : 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{
              duration: 0.4,
              delay: reduce ? 0 : 0.3 + (i / mapPoints.length) * 1.8,
              type: "spring",
              stiffness: 260,
              damping: 18,
            }}
          >
            <div className="relative flex flex-col items-center">
              <span className="relative flex h-3.5 w-3.5 items-center justify-center">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sunset/40" />
                <span className="relative h-2.5 w-2.5 rounded-full bg-sunset ring-2 ring-background" />
              </span>
              <span
                className={`absolute whitespace-nowrap rounded-full bg-night/85 px-2 py-0.5 text-[10px] text-cream shadow ${
                  i % 2 === 0 ? "top-4" : "bottom-4"
                }`}
              >
                {p.city}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default JourneyMap;
