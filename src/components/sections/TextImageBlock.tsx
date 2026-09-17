"use client";

import type { TextImageSection } from "@/content/types";
import { Reveal } from "@/components/ui/Reveal";
import { LocationBadge } from "@/components/ui/LocationBadge";
import { SmartImage } from "@/components/media/SmartImage";
import { FlipCard } from "@/components/ui/FlipCard";

/**
 * section: ข้อความ + รูปเดียว — รองรับ 2 layout:
 *
 * layout "side" (ค่าเริ่มต้น):
 *   - mobile: รูปบน ข้อความล่าง
 *   - sm+: สองคอลัมน์ side-by-side
 *
 * layout "overlay":
 *   - ข้อความซ้อนทับบนรูปพร้อม gradient ด้านล่าง
 *   - เหมาะกับ section ที่อยากให้รูปโดดเด่น ข้อความกลมกลืน
 */
export function TextImageBlock({ data }: { data: TextImageSection }) {
  const layout = data.layout ?? "side";

  if (layout === "overlay") {
    return <OverlayLayout data={data} />;
  }
  return <SideLayout data={data} />;
}

/* ─────────────────── layout: side ─────────────────── */
function SideLayout({ data }: { data: TextImageSection }) {
  const imageFirst = data.side === "left";
  const ticketLabel = [data.place?.city, data.place?.country]
    .filter(Boolean)
    .join(" · ");

  const imageEl = (
    <div className="aspect-[4/5] w-full overflow-hidden rounded-2xl shadow-xl shadow-night/10 ring-1 ring-black/5 sm:rounded-3xl">
      <SmartImage
        image={data.image}
        sizes="(max-width: 640px) 100vw, 50vw"
        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      />
    </div>
  );

  return (
    <div className="mx-auto max-w-3xl">
      {/* ① ชื่อ + ป้ายสถานที่ — อยู่บนสุดเสมอ */}
      {(data.title || data.place) && (
        <Reveal className="mb-5 flex flex-col items-center gap-2 text-center sm:mb-7">
          {data.title && (
            <h2 className="font-display text-2xl font-bold text-balance sm:text-3xl md:text-4xl">
              {data.title}
            </h2>
          )}
          <LocationBadge place={data.place} />
        </Reveal>
      )}

      {/* ② รูป + ข้อความ (2 คอลัมน์ sm+, single col mobile) */}
      <div className="grid items-center gap-6 sm:grid-cols-2 sm:gap-10 md:gap-14">
        <Reveal
          direction={imageFirst ? "left" : "right"}
          className={imageFirst ? "sm:order-1" : "sm:order-2"}
        >
          {data.note ? (
            <FlipCard front={imageEl} note={data.note} ticketLabel={ticketLabel} />
          ) : (
            <div className="group">{imageEl}</div>
          )}
        </Reveal>

        <Reveal
          direction={imageFirst ? "right" : "left"}
          delay={0.1}
          className={imageFirst ? "sm:order-2" : "sm:order-1"}
        >
          <p className="text-base leading-relaxed text-foreground/75 sm:text-lg">
            {data.body}
          </p>
        </Reveal>
      </div>
    </div>
  );
}

/* ─────────────────── layout: overlay ─────────────────── */
function OverlayLayout({ data }: { data: TextImageSection }) {
  return (
    <Reveal className="mx-auto max-w-5xl" direction="up">
      <div className="group relative overflow-hidden rounded-2xl shadow-2xl shadow-night/20 ring-1 ring-black/5 sm:rounded-3xl">
        {/* รูปพื้นหลัง */}
        <div className="aspect-[4/3] w-full sm:aspect-[16/9]">
          <SmartImage
            image={data.image}
            sizes="(max-width: 640px) 100vw, 80vw"
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        </div>

        {/* gradient overlay ด้านล่าง */}
        <div className="absolute inset-0 bg-gradient-to-t from-night/85 via-night/30 to-transparent" />

        {/* ข้อความซ้อนทับ */}
        <div className="absolute inset-x-0 bottom-0 p-5 sm:p-8">
          <LocationBadge place={data.place} tone="dark" />
          <h2 className="font-display mt-2 text-2xl font-bold leading-snug text-cream text-balance sm:mt-3 sm:text-3xl md:text-4xl">
            {data.title}
          </h2>
          {data.body && (
            <p className="mt-2 text-sm leading-relaxed text-cream/80 sm:mt-3 sm:text-base">
              {data.body}
            </p>
          )}
        </div>
      </div>
    </Reveal>
  );
}

export default TextImageBlock;
