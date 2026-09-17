"use client";

import { Fragment, useRef } from "react";
import type { StorySection } from "@/content/types";
import { Section } from "./Section";
import { RouteRail } from "./RouteRail";

function TripDivider() {
  return (
    <div
      aria-hidden="true"
      className="mx-auto flex max-w-sm items-center gap-3 px-4 py-2 sm:px-6"
    >
      <div className="h-px flex-1 bg-foreground/10" />
      <svg
        viewBox="0 0 24 24"
        className="h-3.5 w-3.5 shrink-0 text-sunset/50"
        fill="currentColor"
      >
        <path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L11 19v-5.5L21 16Z" />
      </svg>
      <div className="h-px flex-1 bg-foreground/10" />
    </div>
  );
}

/**
 * เรียง chapter ทั้งหมดตามลำดับใน config
 * มีเส้นทางเดินทางแนวตั้ง (RouteRail) พร้อมไอคอนเครื่องบินวิ่งตามการเลื่อนตลอดทั้ง Story
 */
export function Story({ sections }: { sections: StorySection[] }) {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div ref={ref} className="relative bg-background">
      {/* ไล่เฉดเชื่อมจาก Hero (โทนกลางคืน) เข้าสู่เนื้อหา (โทนครีม) ให้เนียน */}
      <div className="h-24 w-full bg-gradient-to-b from-night to-background" />

      <RouteRail targetRef={ref} />

      {sections.map((section, i) => {
        const prev = sections[i - 1];
        const showDivider =
          i > 0 &&
          section.type === "trip" &&
          prev?.type === "trip";

        return (
          <Fragment key={section.id}>
            {showDivider && <TripDivider />}
            <Section data={section} />
          </Fragment>
        );
      })}
    </div>
  );
}

export default Story;
