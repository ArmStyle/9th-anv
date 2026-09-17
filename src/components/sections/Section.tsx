import type { StorySection } from "@/content/types";
import { TextImageBlock } from "./TextImageBlock";
import { GalleryBlock } from "./GalleryBlock";
import { VideoBlock } from "./VideoBlock";
import { MediaGridBlock } from "./MediaGridBlock";
import { TripBlock } from "./TripBlock";
import { QuoteBlock } from "./QuoteBlock";
import { SceneEffects } from "@/components/effects/SceneEffects";

/**
 * ตัวกลาง: รับ section 1 อันแล้วเลือก render ตาม type
 * เพิ่ม type ใหม่ = เพิ่ม case ที่นี่ (TypeScript จะเตือนถ้าลืม)
 */
export function Section({ data }: { data: StorySection }) {
  const inner = renderBlock(data);
  const isQuote = data.type === "quote";
  const isTrip = data.type === "trip";
  const effect = "effect" in data ? data.effect : undefined;
  const ambient = "ambient" in data ? data.ambient : undefined;

  return (
    <section
      id={data.id}
      data-ambient={ambient}
      className={`relative overflow-hidden px-4 sm:px-6 ${
        isQuote
          ? "bg-sand/50 py-12 sm:py-16"
          : isTrip
          ? "py-12 sm:py-16 md:py-20"
          : "py-14 sm:py-20 md:py-28"
      }`}
    >
      <SceneEffects effect={effect} />
      <div className="relative z-10">{inner}</div>
    </section>
  );
}

function renderBlock(data: StorySection) {
  switch (data.type) {
    case "text-image":
      return <TextImageBlock data={data} />;
    case "gallery":
      return <GalleryBlock data={data} />;
    case "video":
      return <VideoBlock data={data} />;
    case "media-grid":
      return <MediaGridBlock data={data} />;
    case "trip":
      return <TripBlock data={data} />;
    case "quote":
      return <QuoteBlock data={data} />;
    default: {
      const _never: never = data;
      throw new Error(`unknown section type: ${JSON.stringify(_never)}`);
    }
  }
}

export default Section;
