"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * เอฟเฟกต์พิมพ์ดีด: ค่อยๆ พิมพ์ข้อความทีละตัวเมื่อ active = true
 * - delay: หน่วงก่อนเริ่มพิมพ์ (ms) ใช้ทำให้พิมพ์ทีละย่อหน้าตามลำดับ
 * - เคารพ prefers-reduced-motion: แสดงข้อความเต็มทันที ไม่พิมพ์
 */
export function Typewriter({
  text,
  active,
  speed = 30,
  delay = 0,
  className,
}: {
  text: string;
  active: boolean;
  speed?: number;
  delay?: number;
  className?: string;
}) {
  const reduce = useReducedMotion() ?? false;
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active || reduce) return;
    let i = 0;
    let interval: ReturnType<typeof setInterval> | undefined;
    const startTimer = setTimeout(() => {
      interval = setInterval(() => {
        i += 1;
        setCount(i);
        if (i >= text.length && interval) clearInterval(interval);
      }, speed);
    }, delay);
    return () => {
      clearTimeout(startTimer);
      if (interval) clearInterval(interval);
    };
  }, [active, reduce, text, speed, delay]);

  const display = reduce ? text : text.slice(0, count);
  const typing = active && !reduce && count < text.length;

  return (
    <span className={className}>
      {display}
      {typing && (
        <span className="ml-0.5 inline-block w-px animate-pulse align-baseline text-current">
          |
        </span>
      )}
    </span>
  );
}

export default Typewriter;
