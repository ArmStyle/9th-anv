"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

type FloatingHeart = { id: number; x: number; y: number; hue: string; drift: number };

const COLORS = ["#d95d78", "#e8825f", "#e0a95e", "#f7b6c8"];

function HeartShape({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 24 24" className="h-full w-full" fill={color} aria-hidden="true">
      <path d="M12 21s-6.7-4.3-9.3-8.2C.9 10 1.7 6.4 4.6 5.2 6.8 4.3 9 5.1 12 8c3-2.9 5.2-3.7 7.4-2.8 2.9 1.2 3.7 4.8 1.9 7.6C18.7 16.7 12 21 12 21Z" />
    </svg>
  );
}

/**
 * หัวใจเล็กๆ โปรยตามเมาส์ (เฉพาะเมาส์ ไม่ทำงานตอนสัมผัสเพื่อไม่ให้รกบนมือถือ)
 * ปิดตัวเองถ้าผู้ใช้ตั้งค่าลดการเคลื่อนไหว
 */
export function HeartCursorTrail() {
  const reduce = useReducedMotion() ?? false;
  const [hearts, setHearts] = useState<FloatingHeart[]>([]);
  const lastRef = useRef(0);
  const idRef = useRef(0);

  useEffect(() => {
    if (reduce) return;
    const onMove = (e: PointerEvent) => {
      if (e.pointerType === "touch") return; // ข้ามการสัมผัส
      const now = performance.now();
      if (now - lastRef.current < 60) return; // throttle ~16 หัวใจ/วินาที
      lastRef.current = now;
      const id = idRef.current++;
      const hue = COLORS[id % COLORS.length];
      const drift = (id % 2 === 0 ? 1 : -1) * (10 + (id % 3) * 8);
      setHearts((prev) => [...prev.slice(-16), { id, x: e.clientX, y: e.clientY, hue, drift }]);
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduce]);

  const remove = useCallback((id: number) => {
    setHearts((prev) => prev.filter((h) => h.id !== id));
  }, []);

  if (reduce) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[55] overflow-hidden"
      aria-hidden="true"
    >
      <AnimatePresence>
        {hearts.map((h) => (
          <motion.span
            key={h.id}
            className="absolute h-4 w-4"
            style={{ left: h.x, top: h.y }}
            initial={{ opacity: 0.9, scale: 0.5, x: "-50%", y: "-50%" }}
            animate={{ opacity: 0, scale: 1.1, x: `calc(-50% + ${h.drift}px)`, y: "-160%" }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.1, ease: "easeOut" }}
            onAnimationComplete={() => remove(h.id)}
          >
            <HeartShape color={h.hue} />
          </motion.span>
        ))}
      </AnimatePresence>
    </div>
  );
}

export default HeartCursorTrail;
