"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

type Direction = "up" | "left" | "right" | "none";

const offset = 28;

function makeVariants(direction: Direction, reduce: boolean): Variants {
  const hiddenOffset =
    reduce || direction === "none"
      ? {}
      : direction === "up"
        ? { y: offset, scale: 0.98 }
        : direction === "left"
          ? { x: -offset }
          : { x: offset };

  return {
    hidden: { opacity: 0, ...hiddenOffset },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      transition: {
        duration: reduce ? 0 : 0.65,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };
}

type RevealProps = {
  children: ReactNode;
  direction?: Direction;
  /** หน่วงเวลาก่อนเริ่ม (วินาที) สำหรับ stagger */
  delay?: number;
  className?: string;
  /** เล่นครั้งเดียวเมื่อเลื่อนเข้ามา (ค่าเริ่มต้น true) */
  once?: boolean;
};

/**
 * ห่อเนื้อหาให้ค่อยๆ ปรากฏ (fade + เลื่อน) ตอนเลื่อนเข้ามาในจอ
 * เคารพผู้ใช้ที่ตั้งค่า prefers-reduced-motion (จะแค่ fade ไม่ขยับ)
 */
export function Reveal({
  children,
  direction = "up",
  delay = 0,
  className,
  once = true,
}: RevealProps) {
  const reduce = useReducedMotion() ?? false;
  const variants = makeVariants(direction, reduce);

  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.2, margin: "0px 0px -6% 0px" }}
      transition={{ delay: reduce ? 0 : delay }}
    >
      {children}
    </motion.div>
  );
}

export default Reveal;
