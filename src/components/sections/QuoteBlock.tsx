import type { QuoteSection } from "@/content/types";
import { Reveal } from "@/components/ui/Reveal";

/** section: ประโยคซึ้งๆ คั่นระหว่างทริป */
export function QuoteBlock({ data }: { data: QuoteSection }) {
  return (
    <Reveal className="mx-auto max-w-3xl text-center">
      <span className="font-display text-5xl leading-none text-sunset/40 sm:text-6xl" aria-hidden="true">
        &ldquo;
      </span>
      <blockquote className="font-display text-xl font-medium leading-relaxed text-balance text-foreground/85 sm:text-2xl md:text-3xl">
        {data.text}
      </blockquote>
      {data.attribution && (
        <cite className="mt-4 block text-sm not-italic uppercase tracking-[0.2em] text-foreground/50">
          {data.attribution}
        </cite>
      )}
    </Reveal>
  );
}

export default QuoteBlock;
