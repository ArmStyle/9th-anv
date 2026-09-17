import { content } from "@/content/story";
import { Hero } from "@/components/sections/Hero";
import { Story } from "@/components/sections/Story";
import { JourneyMap } from "@/components/sections/JourneyMap";
import { Closing } from "@/components/sections/Closing";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { JourneyGauge } from "@/components/ui/JourneyGauge";
import { IntroExperience } from "@/components/experience/IntroExperience";

export default function Home() {
  // รวมรายชื่อเสียงบรรยากาศที่ใช้ในเนื้อหา (ไม่ซ้ำ) เพื่อเตรียมไฟล์เสียงล่วงหน้า
  const ambientTracks = Array.from(
    new Set(
      content.sections.flatMap((s) =>
        "ambient" in s && s.ambient ? [s.ambient] : [],
      ),
    ),
  );

  return (
    <IntroExperience
      intro={content.intro}
      music={content.music}
      ambientTracks={ambientTracks}
    >
      <ScrollProgress />
      <JourneyGauge />
      <main>
        <Hero data={content.hero} />
        <Story sections={content.sections} />
        <JourneyMap sections={content.sections} />
        <Closing data={content.closing} />
      </main>
      <footer className="bg-night px-6 py-8 text-center text-xs text-cream/40">
        made with love · {content.hero.date}
      </footer>
    </IntroExperience>
  );
}
