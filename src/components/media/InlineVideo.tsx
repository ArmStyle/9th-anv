"use client";

import { useEffect, useRef, useState } from "react";
import type { MediaImage } from "@/content/types";
import { SmartImage } from "./SmartImage";

function PlayIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M8 5.14v13.72a1 1 0 0 0 1.54.84l10.29-6.86a1 1 0 0 0 0-1.68L9.54 4.3A1 1 0 0 0 8 5.14Z" />
    </svg>
  );
}

/**
 * ตัวเล่นวิดีโอในกล่อง (parent ต้องเป็น relative + กำหนดอัตราส่วนเอง)
 * - autoplay เมื่อเลื่อนเข้ามาในจอ ≥ 50% (muted, loop, playsInline)
 * - แสดงปุ่ม play overlay ให้กดเปิดเสียงได้
 * - ถ้ายังไม่มีไฟล์จะแสดง poster แทน (ไม่พัง)
 */
export function InlineVideo({
  src,
  poster,
  sizes = "100vw",
  buttonSize = "lg",
}: {
  src: string;
  poster: MediaImage;
  sizes?: string;
  buttonSize?: "sm" | "lg";
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [active, setActive] = useState(false);
  const [failed, setFailed] = useState(false);
  const [muted, setMuted] = useState(true);

  // autoplay เมื่อเลื่อนเข้ามา ≥ 50%, pause เมื่อออก
  useEffect(() => {
    const container = containerRef.current;
    if (!container || !src) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
        }
        // pause เมื่อออกจากจอ
        if (!entry.isIntersecting && videoRef.current) {
          videoRef.current.pause();
        }
      },
      { threshold: 0.5 },
    );
    io.observe(container);
    return () => io.disconnect();
  }, [src]);

  // เล่นวิดีโอหลัง activate
  useEffect(() => {
    if (!active || !videoRef.current || failed) return;
    videoRef.current.play().catch(() => {});
  }, [active, failed]);

  const btn = buttonSize === "lg" ? "h-14 w-14" : "h-10 w-10";
  const icon = buttonSize === "lg" ? "h-6 w-6" : "h-4 w-4";

  return (
    <div ref={containerRef} className="absolute inset-0">
      {/* poster อยู่ด้านหลังเสมอ (แสดงก่อนโหลด / fallback) */}
      <SmartImage image={poster} fill sizes={sizes} className="object-cover" />
      <div className="absolute inset-0 bg-night/20" />

      {/* วิดีโอ — render เมื่อ active (เลื่อนเข้าจอ) */}
      {active && !failed && (
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          src={src}
          poster={poster.src}
          muted={muted}
          loop
          playsInline
          preload="metadata"
          onError={() => setFailed(true)}
        />
      )}

      {/* ปุ่มเปิดเสียง / หยุด */}
      {active && !failed && (
        <button
          type="button"
          onClick={() => setMuted((m) => !m)}
          aria-label={muted ? "เปิดเสียงวิดีโอ" : "ปิดเสียงวิดีโอ"}
          className={`group absolute bottom-2 right-2 flex ${btn} items-center justify-center rounded-full bg-night/60 text-cream backdrop-blur-sm transition-transform duration-200 hover:scale-110 sm:bottom-3 sm:right-3`}
        >
          {muted ? <MuteIcon className={icon} /> : <SoundIcon className={icon} />}
        </button>
      )}

      {/* ปุ่ม play ตอนยังไม่ active (ก่อนเลื่อนถึง) */}
      {!active && !failed && (
        <button
          type="button"
          onClick={() => setActive(true)}
          aria-label="เล่นวิดีโอ"
          className="group absolute inset-0 flex items-center justify-center"
        >
          <span
            className={`flex ${btn} items-center justify-center rounded-full bg-cream/85 pl-0.5 text-night shadow-lg transition-transform duration-300 group-hover:scale-110`}
          >
            <PlayIcon className={icon} />
          </span>
        </button>
      )}

      {/* fallback message */}
      {failed && (
        <div className="absolute inset-x-0 bottom-0 bg-night/70 px-3 py-1.5 text-center text-xs text-cream/80">
          ยังไม่มีไฟล์วิดีโอ — วางไฟล์ที่ {src}
        </div>
      )}
    </div>
  );
}

function MuteIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M11 5 6 9H2v6h4l5 4V5Z" />
      <line x1="23" y1="9" x2="17" y2="15" />
      <line x1="17" y1="9" x2="23" y2="15" />
    </svg>
  );
}

function SoundIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M11 5 6 9H2v6h4l5 4V5Z" />
      <path d="M15.5 8.5a5 5 0 0 1 0 7" />
    </svg>
  );
}

export default InlineVideo;
