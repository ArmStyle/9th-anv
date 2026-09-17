import type { MediaGridSection, MediaItem } from "@/content/types";
import { Reveal } from "@/components/ui/Reveal";
import { LocationBadge } from "@/components/ui/LocationBadge";
import { SmartImage } from "@/components/media/SmartImage";
import { InlineVideo } from "@/components/media/InlineVideo";
import { FlipCard } from "@/components/ui/FlipCard";

export function MediaGridBlock({ data }: { data: MediaGridSection }) {
  const ticketLabel = [data.place?.city, data.place?.country]
    .filter(Boolean)
    .join(" · ");

  const firstImage = data.note
    ? data.items.find((it) => it.kind === "image")
    : undefined;

  let gridItems = data.items;
  if (firstImage) {
    let skipped = false;
    gridItems = data.items.filter((it) => {
      if (!skipped && it === firstImage) { skipped = true; return false; }
      return true;
    });
  }

  return (
    <div className="mx-auto max-w-3xl">
      {(data.title || data.place) && (
        <Reveal className="mb-5 flex flex-col items-center gap-2 text-center sm:mb-7">
          {data.title && (
            <h2 className="font-display text-2xl font-bold text-balance sm:text-3xl md:text-4xl">
              {data.title}
            </h2>
          )}
          <div className="flex justify-center">
            <LocationBadge place={data.place} />
          </div>
        </Reveal>
      )}

      {data.note && firstImage && firstImage.kind === "image" && (
        <Reveal className="mb-3 sm:mb-4">
          <FlipCard
            front={
              <div className="aspect-[4/5] overflow-hidden rounded-2xl sm:rounded-3xl">
                <SmartImage
                  image={firstImage}
                  sizes="(max-width: 640px) 100vw, 80vw"
                  className="h-full w-full object-cover"
                />
              </div>
            }
            note={data.note}
            ticketLabel={ticketLabel}
          />
        </Reveal>
      )}

      {gridItems.length > 0 && (
        <BalancedGrid items={gridItems} videoSide={data.videoSide ?? "right"} />
      )}
    </div>
  );
}

// ─── types ───────────────────────────────────────────────────────────────────

type GridEntry = {
  item: MediaItem;
  /** video/image span 2 แถว (2-col) */
  mob2Row: boolean;
  /** item เดี่ยวสุดท้ายที่จะแหว่ง span 2 คอลัมน์ */
  mob2Col: boolean;
  // ไม่ใช้ 3-col อีกต่อไป — 2-col ตลอดทั้ง layout
  desk3Row: false;
  desk3ColSpan2: false;
  desk3ColSpan3: false;
};

// ─── layout calculator ───────────────────────────────────────────────────────

/**
 * คำนวณ CSS grid-span classes สำหรับ 2-col เท่านั้น (mobile และ desktop)
 *
 * layout ตามจำนวน items (หลัง FlipCard):
 *   n=2: R | VIDEO↕(2)   → สมดุล
 *   n=3: R | VIDEO↕(2), R | col-span-2  → สมดุล
 *   n=4: R | VIDEO↕(2), R | R, last→col-span-2  → สมดุล
 *   n≥5: ปกติ, คี่→สุดท้าย col-span-2
 */
function buildEntries(
  items: MediaItem[],
  videoSide: "left" | "right",
): GridEntry[] {
  const pIdx = items.findIndex(
    (it) => it.kind === "video" && it.orientation === "portrait",
  );

  const def = (item: MediaItem): GridEntry => ({
    item,
    mob2Row: false, mob2Col: false,
    desk3Row: false, desk3ColSpan2: false, desk3ColSpan3: false,
  });

  // ไม่มี portrait video
  if (pIdx < 0) {
    const entries = items.map(def);
    const n = entries.length;
    if (n % 2 !== 0) entries[n - 1].mob2Col = true;
    return entries;
  }

  const portrait = items[pIdx];
  const rest = items.filter((_, i) => i !== pIdx);
  const n = rest.length;

  const entries: GridEntry[] = [];

  if (videoSide === "right") {
    // layout: R0, VIDEO↕, R1, R2?, R3?, ...
    if (rest[0]) entries.push(def(rest[0]));
    entries.push({ ...def(portrait), mob2Row: true });
    for (let i = 1; i < rest.length; i++) entries.push(def(rest[i]));
  } else {
    // layout: VIDEO↕, R0, R1?, R2?, ...
    entries.push({ ...def(portrait), mob2Row: true });
    for (const r of rest) entries.push(def(r));
  }

  // รูปสุดท้ายที่จะเหลือช่องว่าง: col-span-2
  const total = n + 1; // รวม video
  if (total % 2 !== 0) {
    entries[entries.length - 1].mob2Col = true;
  }

  return entries;
}

// ─── span class helpers ───────────────────────────────────────────────────────

function spanClasses(e: GridEntry): string {
  const cls: string[] = [];
  if (e.mob2Row) cls.push("row-span-2");
  if (e.mob2Col) cls.push("col-span-2");
  return cls.join(" ");
}

function spanAspect(e: GridEntry): string {
  // spanning cell = สูงเท่า 2 แถวรูป portrait (4:5 × 2 ≈ 9:16)
  if (e.mob2Row || e.desk3Row) return "aspect-[9/16]";
  // non-spanning: IG portrait fixed ratio
  return "aspect-[4/5]";
}

/** aspect สำหรับ video โดยเฉพาะ (landscape ต่างจากรูป) */
function videoAspect(e: GridEntry, portrait: boolean): string {
  if (e.mob2Row || e.desk3Row) return "aspect-[9/16]";
  return portrait ? "aspect-[9/16]" : "aspect-video";
}

// ─── BalancedGrid ─────────────────────────────────────────────────────────────

function BalancedGrid({
  items,
  videoSide,
}: {
  items: MediaItem[];
  videoSide: "left" | "right";
}) {
  const entries = buildEntries(items, videoSide);

  return (
    <div className="grid grid-cols-2 gap-2 sm:gap-3 md:gap-4">
      {entries.map((entry, i) => (
        <Reveal
          key={itemKey(entry.item, i)}
          delay={Math.min(i * 0.07, 0.35)}
          className={spanClasses(entry)}
        >
          <GridCell entry={entry} />
        </Reveal>
      ))}
    </div>
  );
}

// ─── GridCell ─────────────────────────────────────────────────────────────────

function GridCell({ entry }: { entry: GridEntry }) {
  const { item } = entry;
  const wideSpan = entry.mob2Col || entry.desk3ColSpan2 || entry.desk3ColSpan3;
  const sizes = wideSpan
    ? "(max-width: 640px) 100vw, (max-width: 1024px) 66vw, 50vw"
    : "(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw";

  if (item.kind === "image") {
    const aspectCls = spanAspect(entry);
    return (
      <div
        className={`group relative w-full overflow-hidden rounded-xl shadow-md shadow-night/10 ring-1 ring-black/5 sm:rounded-2xl ${aspectCls}`}
      >
        <SmartImage
          image={item}
          fill
          sizes={sizes}
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-night/30 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      </div>
    );
  }

  const portrait = item.orientation === "portrait";
  const videoCls = videoAspect(entry, portrait);

  return (
    <div
      className={`relative overflow-hidden rounded-xl bg-night shadow-md shadow-night/20 ring-1 ring-white/10 sm:rounded-2xl ${videoCls}`}
    >
      <InlineVideo src={item.src} poster={item.poster} sizes={sizes} buttonSize="sm" />
    </div>
  );
}

function itemKey(item: MediaItem, i: number) {
  return item.kind === "image" ? item.src : `${item.src}-${i}`;
}

export default MediaGridBlock;
