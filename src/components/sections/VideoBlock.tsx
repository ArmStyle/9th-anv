import type { VideoSection } from "@/content/types";
import { Reveal } from "@/components/ui/Reveal";
import { LocationBadge } from "@/components/ui/LocationBadge";
import { InlineVideo } from "@/components/media/InlineVideo";

/** section: วิดีโอเดี่ยว — รองรับทั้งแนวนอน (16:9) และแนวตั้ง (9:16) */
export function VideoBlock({ data }: { data: VideoSection }) {
  const portrait = data.orientation === "portrait";

  return (
    <div className={`mx-auto ${portrait ? "max-w-sm" : "max-w-4xl"}`}>
      <Reveal>
        <div className={`relative overflow-hidden rounded-2xl bg-night shadow-2xl shadow-night/30 ring-1 ring-white/10 sm:rounded-3xl ${
          portrait ? "mx-auto max-h-[80svh]" : ""
        }`}>
          <div className={`relative w-full ${portrait ? "aspect-[9/16]" : "aspect-video"}`}>
            <InlineVideo
              src={data.src}
              poster={data.poster}
              sizes={portrait ? "(max-width: 640px) 100vw, 384px" : "(max-width: 896px) 100vw, 896px"}
            />
          </div>
        </div>
      </Reveal>

      {(data.place || data.caption) && (
        <Reveal delay={0.1} className="mt-5 flex flex-col items-center gap-2 text-center">
          <div className="flex justify-center">
            <LocationBadge place={data.place} />
          </div>
          {data.caption && (
            <p className="max-w-xl text-lg italic text-foreground/70">
              {data.caption}
            </p>
          )}
        </Reveal>
      )}
    </div>
  );
}

export default VideoBlock;
