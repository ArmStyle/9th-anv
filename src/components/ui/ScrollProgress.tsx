"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/** แถบบอกความคืบหน้าการเลื่อน ติดขอบบนสุดของจอ */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-50 h-1 origin-left bg-gradient-to-r from-sunset via-rose to-gold"
    />
  );
}

export default ScrollProgress;
