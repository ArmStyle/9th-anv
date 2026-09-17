import type { GallerySection } from "@/content/types";
import { Reveal } from "@/components/ui/Reveal";
import { LocationBadge } from "@/components/ui/LocationBadge";
import { SmartImage } from "@/components/media/SmartImage";
import { FlipCard } from "@/components/ui/FlipCard";

/**
 * section: แกลเลอรีหลายรูปแบบ grid
 * ① ชื่อ/ป้ายสถานที่อยู่ก่อนเสมอ
 * ② FlipCard (ถ้ามี note) รูปแรก
 * ③ กริดรูปที่เหลือ — aspect-[4/3] ทุกช่อง (ไม่แหว่ง)
 */
export function GalleryBlock({ data }: { data: GallerySection }) {
  const ticketLabel = [data.place?.city, data.place?.country]
    .filter(Boolean)
    .join(" · ");

  const gridImgs = data.note ? data.images.slice(1) : data.images;

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
          <div className="flex justify-center">
            <LocationBadge place={data.place} />
          </div>
        </Reveal>
      )}

      {/* ② FlipCard */}
      {data.note && data.images[0] && (
        <Reveal className="mb-3 sm:mb-4">
          <FlipCard
            front={
              <div className="aspect-[4/5] overflow-hidden rounded-2xl sm:rounded-3xl">
                <SmartImage
                  image={data.images[0]}
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

      {/* ③ Grid รูปที่เหลือ — aspect-[4/3] เท่ากันทุกช่อง ไม่มีแหว่ง */}
      {gridImgs.length > 0 && (
        <div className="grid grid-cols-2 gap-2 sm:gap-3 md:gap-4">
          {gridImgs.map((image, i) => {
            // รูปสุดท้ายที่เหลือช่องว่าง: span เต็มแถวเพื่อไม่แหว่ง
            const isLast = i === gridImgs.length - 1;
            const isOddCount = gridImgs.length % 2 !== 0;
            // mobile 2-col: span ถ้าเป็นรูปสุดท้ายและจำนวนคี่
            // md 3-col: span ถ้าเหลือ 1 จาก 3
            const spanFull =
              isLast && (isOddCount || gridImgs.length % 3 === 1);

            return (
              <Reveal
                key={image.src}
                delay={Math.min(i * 0.08, 0.35)}
                className={spanFull ? "col-span-2 md:col-span-1 last:md:col-span-full" : ""}
              >
                <div
                  className={`group relative w-full overflow-hidden rounded-xl shadow-md shadow-night/10 ring-1 ring-black/5 sm:rounded-2xl ${
                    spanFull ? "aspect-[2/1]" : "aspect-[4/5]"
                  }`}
                >
                  <SmartImage
                    image={image}
                    fill
                    sizes={spanFull
                      ? "(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 50vw"
                      : "(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 33vw"}
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-night/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                </div>              </Reveal>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default GalleryBlock;
