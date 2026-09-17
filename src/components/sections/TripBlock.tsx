"use client";

import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { TripSection, MediaImage } from "@/content/types";
import { Reveal } from "@/components/ui/Reveal";
import { LocationBadge } from "@/components/ui/LocationBadge";
import { FlipCard } from "@/components/ui/FlipCard";
import { SmartImage } from "@/components/media/SmartImage";

// ─── icons ────────────────────────────────────────────────────────────────────

// ─── ส่วนที่ 2: Video เต็มความกว้าง autoplay เมื่อเลื่อนถึง ──────────────────

// ─── TripVideo — silent autoplay loop ────────────────────────────────────────

function TripVideo({
  src,
  posterSrc,
  posterAlt,
}: {
  src: string;
  posterSrc: string;
  posterAlt: string;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // เล่นอัตโนมัติเมื่อเลื่อนเข้ามา ≥ 30%, หยุดเมื่อออก
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          videoRef.current?.play().catch(() => {});
        } else {
          videoRef.current?.pause();
        }
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [src]);

  return (
    <div ref={wrapRef} className="relative w-full overflow-hidden rounded-2xl bg-sunset-gradient sm:rounded-3xl">
      {/* aspect portrait 9:16 mobile, 4:5 sm+ */}
      <div className="aspect-[9/16] w-full  sm:aspect-[4/5]">
        <video
          ref={videoRef}
          className="w-full"
          src={src}
          poster={posterSrc}
          muted
          loop
          playsInline
          preload="auto"
          aria-label={posterAlt}
        />
      </div>
    </div>
  );
}

// ─── ส่วนที่ 3: Photo Grid — 2-col mobile / 3-col desktop fit จอ ──────────────

function TripPhotos({ photos }: { photos: MediaImage[] }) {
  const reduce = useReducedMotion() ?? false;

  return (
    <div className="grid grid-cols-2 gap-2 sm:gap-3 md:gap-4">
      {photos.map((photo, i) => (
        <motion.div
          key={photo.src}
          className="relative aspect-[4/5] overflow-hidden rounded-xl shadow-md shadow-night/10 ring-1 ring-black/5 sm:rounded-2xl"
          initial={{ opacity: 0, y: reduce ? 0 : 20, scale: reduce ? 1 : 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{
            duration: 0.55,
            delay: reduce ? 0 : i * 0.08,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <SmartImage
            image={photo}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 33vw"
            className="object-cover transition-transform duration-700 hover:scale-105"
          />
        </motion.div>
      ))}
    </div>
  );
}

// ─── TripBlock — หลัก ────────────────────────────────────────────────────────

/**
 * layout B — 3 ส่วนชัดเจน เลื่อนปกติ ไม่มี carousel:
 *
 * ส่วนที่ 1 — ชื่อทริป + ป้ายสถานที่ + FlipCard (รูปหลัก)
 * ส่วนที่ 2 — วิดีโอเต็มความกว้าง autoplay เมื่อเลื่อนถึง
 * ส่วนที่ 3 — grid รูปภาพ 2-col / 3-col fit จอ ไม่แหว่ง
 */
export function TripBlock({ data }: { data: TripSection }) {
  const ticketLabel = [data.place?.city, data.place?.country]
    .filter(Boolean)
    .join(" · ");

  return (
    <div className="mx-auto flex w-full max-w-md flex-col gap-5 sm:max-w-lg sm:gap-6 md:max-w-xl lg:max-w-2xl">

      {/* ──── ส่วนที่ 1: ชื่อ + FlipCard ──────────────────────────────────── */}
      <div className="flex flex-col gap-4">
        <Reveal className="flex flex-col items-center gap-2 text-center">
          <h2 className="font-display text-2xl font-bold text-balance sm:text-3xl">
            {data.title}
          </h2>
          <LocationBadge place={data.place} />
        </Reveal>

        <Reveal delay={0.08}>
          {data.note ? (
            <FlipCard
              front={
                <div className="aspect-[4/5] overflow-hidden rounded-2xl sm:rounded-3xl">
                  <SmartImage
                    image={data.cover}
                    sizes="(max-width: 640px) 100vw, 512px"
                    className="h-full w-full object-cover"
                  />
                </div>
              }
              note={data.note}
              ticketLabel={ticketLabel}
            />
          ) : (
            <div className="aspect-[4/5] overflow-hidden rounded-2xl shadow-xl shadow-night/10 ring-1 ring-black/5 sm:rounded-3xl">
              <SmartImage
                image={data.cover}
                sizes="(max-width: 640px) 100vw, 512px"
                className="h-full w-full object-cover"
              />
            </div>
          )}
        </Reveal>
      </div>

      {/* ──── ส่วนที่ 2: Video ─────────────────────────────────────────────── */}
      {data.video && (
        <Reveal delay={0.05}>
          <TripVideo
            src={data.video.src}
            posterSrc={data.video.poster.src}
            posterAlt={data.video.poster.alt}
          />
        </Reveal>
      )}

      {/* ──── ส่วนที่ 3: รูปภาพ grid ──────────────────────────────────────── */}
      {data.photos && data.photos.length > 0 && (
        <TripPhotos photos={data.photos} />
      )}
    </div>
  );
}

export default TripBlock;
