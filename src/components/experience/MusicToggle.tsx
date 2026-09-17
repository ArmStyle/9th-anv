"use client";

import { motion } from "framer-motion";

function SpeakerOn() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M11 5 6 9H2v6h4l5 4V5Z" />
      <path d="M15.5 8.5a5 5 0 0 1 0 7" />
      <path d="M18.5 5.5a9 9 0 0 1 0 13" />
    </svg>
  );
}

function SpeakerOff() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M11 5 6 9H2v6h4l5 4V5Z" />
      <line x1="22" y1="9" x2="16" y2="15" />
      <line x1="16" y1="9" x2="22" y2="15" />
    </svg>
  );
}

/** ปุ่มเปิด/ปิดเพลงลอยมุมจอ */
export function MusicToggle({
  playing,
  onToggle,
}: {
  playing: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.button
      type="button"
      onClick={onToggle}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.4 }}
      aria-label={playing ? "ปิดเพลง" : "เปิดเพลง"}
      aria-pressed={playing}
      className="fixed bottom-5 right-5 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-night/80 text-cream shadow-lg ring-1 ring-white/15 backdrop-blur transition-colors hover:bg-night"
    >
      {/* วงกลมเต้นเบาๆ เมื่อเพลงเล่นอยู่ */}
      {playing && (
        <motion.span
          className="absolute inset-0 rounded-full ring-2 ring-gold/50"
          animate={{ scale: [1, 1.25], opacity: [0.6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut" }}
        />
      )}
      {playing ? <SpeakerOn /> : <SpeakerOff />}
    </motion.button>
  );
}

export default MusicToggle;
