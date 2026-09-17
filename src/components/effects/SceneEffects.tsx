"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { CSSProperties } from "react";
import type { SceneEffect } from "@/content/types";

/** สุ่มแบบคงที่ (ไม่สุ่มใหม่ทุก render) กัน hydration mismatch */
function rand(i: number, salt: number) {
  const x = Math.sin(i * 12.9898 + salt * 78.233) * 43758.5453;
  return x - Math.floor(x);
}

/** เลเยอร์คลุมฉาก: ตกแต่งลอยอยู่ ไม่ขวางการคลิก */
function Layer({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      {children}
    </div>
  );
}

/* ---------- อนุภาคที่ "ร่วง" ลงมา (ซากุระ / ใบไม้ / หิมะ) ---------- */
function FallingField({
  count,
  render,
  salt,
}: {
  count: number;
  salt: number;
  render: (i: number) => { node: React.ReactNode; size: number };
}) {
  return (
    <Layer>
      {Array.from({ length: count }).map((_, i) => {
        const left = rand(i, salt) * 100;
        const delay = rand(i, salt + 1) * 8;
        const duration = 7 + rand(i, salt + 2) * 7;
        const sway = 20 + rand(i, salt + 3) * 40;
        const { node } = render(i);
        return (
          <motion.span
            key={i}
            className="absolute"
            style={{ left: `${left}%`, top: "-8%" }}
            initial={{ top: "-8%", opacity: 0 }}
            animate={{
              top: "108%",
              opacity: [0, 1, 1, 0.7],
              x: [0, sway, -sway, 0],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration,
              delay,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {node}
          </motion.span>
        );
      })}
    </Layer>
  );
}

/* ---------- อนุภาคที่ "ลอยขึ้น" (โคมลอย / โคมแดง) ---------- */
function RisingField({
  count,
  render,
  salt,
}: {
  count: number;
  salt: number;
  render: (i: number) => React.ReactNode;
}) {
  return (
    <Layer>
      {Array.from({ length: count }).map((_, i) => {
        const left = 5 + rand(i, salt) * 90;
        const delay = rand(i, salt + 1) * 9;
        const duration = 10 + rand(i, salt + 2) * 8;
        const sway = 10 + rand(i, salt + 3) * 25;
        return (
          <motion.span
            key={i}
            className="absolute"
            style={{ left: `${left}%`, bottom: "-12%" }}
            initial={{ bottom: "-12%", opacity: 0 }}
            animate={{
              bottom: "112%",
              opacity: [0, 0.9, 0.9, 0],
              x: [0, sway, -sway * 0.6, 0],
            }}
            transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
          >
            {render(i)}
          </motion.span>
        );
      })}
    </Layer>
  );
}

/* ---------- รูปทรงของแต่ละธีม ---------- */
function Petal({ color }: { color: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path
        d="M7 0C9 4 13 5 13 8a6 6 0 1 1-12 0c0-3 4-4 6-8Z"
        fill={color}
        opacity="0.85"
      />
    </svg>
  );
}

function Leaf({ color }: { color: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path
        d="M2 14C2 6 8 2 14 2c0 8-6 12-12 12Z"
        fill={color}
        opacity="0.85"
      />
      <path d="M4 12C7 9 10 6 13 4" stroke="#00000022" strokeWidth="1" />
    </svg>
  );
}

function Lantern({ style }: { style?: CSSProperties }) {
  return (
    <span
      className="block h-6 w-5 rounded-[45%] bg-gradient-to-b from-rose to-sunset shadow-[0_0_14px_rgba(217,93,120,0.7)]"
      style={style}
    >
      <span className="mx-auto block h-1 w-2 rounded-b bg-gold/80" />
    </span>
  );
}

function SkyLantern() {
  return (
    <span className="block h-7 w-6 rounded-[40%_40%_50%_50%] bg-gradient-to-b from-gold via-sunset to-rose shadow-[0_0_18px_rgba(224,169,94,0.8)]" />
  );
}

/* ---------- เอฟเฟกต์ที่ไม่ใช่อนุภาค ---------- */
function Aurora() {
  return (
    <Layer>
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute -top-1/4 left-0 h-2/3 w-full blur-3xl"
          style={{
            background:
              i === 0
                ? "radial-gradient(60% 50% at 30% 40%, rgba(63,142,136,0.55), transparent)"
                : i === 1
                  ? "radial-gradient(55% 45% at 65% 30%, rgba(120,200,160,0.45), transparent)"
                  : "radial-gradient(50% 40% at 50% 50%, rgba(90,140,220,0.4), transparent)",
          }}
          animate={{ x: ["-8%", "8%", "-8%"], opacity: [0.4, 0.8, 0.4] }}
          transition={{
            duration: 8 + i * 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 1.2,
          }}
        />
      ))}
    </Layer>
  );
}

function Neon() {
  const colors = [
    "rgba(217,93,120,0.55)",
    "rgba(63,142,136,0.5)",
    "rgba(224,169,94,0.5)",
    "rgba(120,140,220,0.5)",
  ];
  return (
    <Layer>
      {colors.map((c, i) => (
        <motion.div
          key={i}
          className="absolute h-24 w-24 rounded-full blur-2xl"
          style={{
            background: `radial-gradient(circle, ${c}, transparent)`,
            left: `${10 + i * 22}%`,
            top: `${15 + (i % 2) * 45}%`,
          }}
          animate={{ opacity: [0.2, 0.9, 0.3, 0.8], scale: [1, 1.2, 1] }}
          transition={{
            duration: 2 + i * 0.6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.3,
          }}
        />
      ))}
    </Layer>
  );
}

function Sparkle({ salt }: { salt: number }) {
  return (
    <Layer>
      {Array.from({ length: 22 }).map((_, i) => {
        const left = rand(i, salt) * 100;
        const top = rand(i, salt + 1) * 100;
        const delay = rand(i, salt + 2) * 4;
        return (
          <motion.span
            key={i}
            className="absolute h-1.5 w-1.5 rounded-full bg-gold shadow-[0_0_6px_rgba(224,169,94,0.9)]"
            style={{ left: `${left}%`, top: `${top}%` }}
            animate={{ opacity: [0, 1, 0], scale: [0.5, 1.2, 0.5] }}
            transition={{
              duration: 1.6 + rand(i, salt + 3) * 1.5,
              repeat: Infinity,
              delay,
              ease: "easeInOut",
            }}
          />
        );
      })}
    </Layer>
  );
}

function Beach({ salt }: { salt: number }) {
  return (
    <Layer>
      {/* แสงแดดอบอุ่นมุมบน */}
      <motion.div
        className="absolute -right-10 -top-10 h-64 w-64 rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(224,169,94,0.5), transparent)",
        }}
        animate={{ opacity: [0.4, 0.7, 0.4], scale: [1, 1.1, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* ฟองอากาศลอยขึ้น */}
      {Array.from({ length: 12 }).map((_, i) => {
        const left = rand(i, salt) * 100;
        const size = 4 + rand(i, salt + 1) * 8;
        const delay = rand(i, salt + 2) * 6;
        const duration = 6 + rand(i, salt + 3) * 5;
        return (
          <motion.span
            key={i}
            className="absolute rounded-full border border-white/40 bg-white/10"
            style={{
              left: `${left}%`,
              bottom: "-6%",
              width: size,
              height: size,
            }}
            initial={{ bottom: "-6%", opacity: 0 }}
            animate={{ bottom: "106%", opacity: [0, 0.7, 0] }}
            transition={{ duration, delay, repeat: Infinity, ease: "easeIn" }}
          />
        );
      })}
    </Layer>
  );
}

/**
 * เลเยอร์ animation ประจำสถานที่
 * เคารพ prefers-reduced-motion: ถ้าผู้ใช้ปิดการเคลื่อนไหว จะไม่แสดงเลย
 */
export function SceneEffects({ effect }: { effect?: SceneEffect }) {
  const reduce = useReducedMotion() ?? false;
  if (!effect || effect === "none" || reduce) return null;

  switch (effect) {
    case "sakura":
      return (
        <FallingField
          count={16}
          salt={1}
          render={() => ({ node: <Petal color="#f7b6c8" />, size: 14 })}
        />
      );
    case "leaves":
      return (
        <FallingField
          count={14}
          salt={2}
          render={(i) => ({
            node: <Leaf color={i % 2 ? "#e0a95e" : "#e8825f"} />,
            size: 16,
          })}
        />
      );
    case "snow":
      return (
        <FallingField
          count={22}
          salt={3}
          render={() => ({
            node: <span className="block h-2 w-2 rounded-full bg-white/90" />,
            size: 8,
          })}
        />
      );
    case "lantern":
      return <RisingField count={10} salt={4} render={() => <Lantern />} />;
    case "sky-lantern":
      return <RisingField count={12} salt={5} render={() => <SkyLantern />} />;
    case "neon":
      return <Neon />;
    case "aurora":
      return <Aurora />;
    case "sparkle":
      return <Sparkle salt={6} />;
    case "beach":
      return <Beach salt={7} />;
    default:
      return null;
  }
}

export default SceneEffects;
