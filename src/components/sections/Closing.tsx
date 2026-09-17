"use client";

import { useMemo, useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import type { ClosingContent } from "@/content/types";
import { Reveal } from "@/components/ui/Reveal";
import { Typewriter } from "@/components/ui/Typewriter";
import { HeartBurst } from "@/components/effects/HeartBurst";

const TYPE_SPEED = 32; // ms ต่อตัวอักษร
const PARA_GAP = 500; // หน่วงระหว่างย่อหน้า (ms)

function HeartIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M12 21s-6.7-4.3-9.3-8.2C.9 10 1.7 6.4 4.6 5.2 6.8 4.3 9 5.1 12 8c3-2.9 5.2-3.7 7.4-2.8 2.9 1.2 3.7 4.8 1.9 7.6C18.7 16.7 12 21 12 21Z" />
    </svg>
  );
}

/** section ปิดท้าย: จดหมายถึงเธอ + หัวใจค่อยๆ ปรากฏ */
export function Closing({ data }: { data: ClosingContent }) {
  const reduce = useReducedMotion() ?? false;
  const letterRef = useRef<HTMLDivElement>(null);
  const letterInView = useInView(letterRef, { once: true, amount: 0.3 });

  // หน่วงเวลาเริ่มพิมพ์ของแต่ละย่อหน้า = เวลาพิมพ์ของย่อหน้าก่อนหน้ารวมกัน + ช่องว่าง
  const paragraphDelays = useMemo(() => {
    const delays: number[] = [];
    let acc = 0;
    for (const p of data.paragraphs) {
      delays.push(acc);
      acc += p.length * TYPE_SPEED + PARA_GAP;
    }
    return delays;
  }, [data.paragraphs]);

  return (
    <section
      id="closing"
      className="relative overflow-hidden bg-night-gradient px-6 py-28 text-cream sm:py-36"
    >
      {/* หัวใจลอยเป็นพื้นหลังบางๆ */}
      {!reduce &&
        Array.from({ length: 8 }).map((_, i) => (
          <motion.span
            key={i}
            className="pointer-events-none absolute text-rose/15"
            style={{ left: `${8 + i * 11}%`, bottom: "-8%" }}
            animate={{ y: ["0%", "-110vh"], opacity: [0, 0.5, 0] }}
            transition={{
              duration: 11 + i * 1.3,
              repeat: Infinity,
              delay: i * 1.1,
              ease: "easeInOut",
            }}
          >
            <HeartIcon className="h-5 w-5" />
          </motion.span>
        ))}

      <HeartBurst />

      <div className="relative mx-auto flex max-w-2xl flex-col items-center gap-6 text-center">
        <Reveal>
          <motion.span
            className="inline-flex text-rose"
            animate={reduce ? undefined : { scale: [1, 1.12, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          >
            <HeartIcon className="h-10 w-10" />
          </motion.span>
        </Reveal>

        <Reveal delay={0.1}>
          <span className="text-xs uppercase tracking-[0.35em] text-gold">
            {data.eyebrow}
          </span>
        </Reveal>

        <Reveal delay={0.15}>
          <h2 className="font-display text-3xl font-bold leading-snug text-balance sm:text-4xl">
            {data.title}
          </h2>
        </Reveal>

        <div ref={letterRef} className="flex flex-col gap-4">
          {data.paragraphs.map((p, i) => (
            <Reveal key={i} delay={0.2 + i * 0.12}>
              <p className="text-lg leading-relaxed text-cream/85">
                <Typewriter
                  text={p}
                  active={letterInView}
                  speed={TYPE_SPEED}
                  delay={paragraphDelays[i]}
                />
              </p>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2 + data.paragraphs.length * 0.12}>
          <p className="font-display mt-4 text-2xl text-gold">{data.signature}</p>
        </Reveal>
      </div>

      {/*
        TODO (interactive ในอนาคต): จุดนี้เหมาะจะเสียบลูกเล่นเพิ่ม เช่น
        - ปุ่ม "เปิดของขวัญ" ที่กดแล้วมี effect / เผยข้อความลับ
        - easter egg เช่น กดหัวใจครบ 9 ครั้งแล้วมี surprise
        - แกลเลอรีรูปเพิ่มเติม หรือปุ่มดาวน์โหลดการ์ด
        โครงสร้างรองรับได้เลย เพียงเพิ่ม component ใหม่ต่อจากบล็อกนี้
      */}
    </section>
  );
}

export default Closing;
