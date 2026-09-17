"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

function rand(i: number, salt: number) {
  const x = Math.sin(i * 12.9898 + salt * 78.233) * 43758.5453;
  return x - Math.floor(x);
}

function Heart({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 24 24" className="h-full w-full" fill={color} aria-hidden="true">
      <path d="M12 21s-6.7-4.3-9.3-8.2C.9 10 1.7 6.4 4.6 5.2 6.8 4.3 9 5.1 12 8c3-2.9 5.2-3.7 7.4-2.8 2.9 1.2 3.7 4.8 1.9 7.6C18.7 16.7 12 21 12 21Z" />
    </svg>
  );
}

const COLORS = ["#d95d78", "#e8825f", "#e0a95e", "#f7b6c8"];

/**
 * หัวใจระเบิดกระจายครั้งเดียวเมื่อเลื่อนเข้ามาในจอ (เอฟเฟกต์ฉลอง)
 * ปิดตัวเองถ้าผู้ใช้ตั้งค่าลดการเคลื่อนไหว
 */
export function HeartBurst({ count = 26 }: { count?: number }) {
  const reduce = useReducedMotion() ?? false;
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <div
      ref={ref}
      className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden"
      aria-hidden="true"
    >
      {!reduce &&
        inView &&
        Array.from({ length: count }).map((_, i) => {
          const angle = (i / count) * Math.PI * 2 + rand(i, 1) * 0.5;
          const dist = 120 + rand(i, 2) * 260;
          const size = 14 + rand(i, 3) * 22;
          const dx = Math.cos(angle) * dist;
          const dy = Math.sin(angle) * dist - 60; // เอนขึ้นด้านบนเล็กน้อย
          const duration = 1.4 + rand(i, 4) * 1.2;
          return (
            <motion.span
              key={i}
              className="absolute"
              style={{ width: size, height: size }}
              initial={{ x: 0, y: 0, opacity: 0, scale: 0.2 }}
              animate={{
                x: dx,
                y: dy,
                opacity: [0, 1, 1, 0],
                scale: [0.2, 1, 1, 0.8],
                rotate: rand(i, 5) * 120 - 60,
              }}
              transition={{ duration, ease: "easeOut" }}
            >
              <Heart color={COLORS[i % COLORS.length]} />
            </motion.span>
          );
        })}
    </div>
  );
}

export default HeartBurst;
