import { describe, it, expect } from "vitest";
import { content } from "./story";
import type { StorySection } from "./types";

describe("content config", () => {
  it("มี intro, hero, closing, music ครบ", () => {
    expect(content.intro.buttonLabel).toBeTruthy();
    expect(content.hero.title).toBeTruthy();
    expect(content.closing.paragraphs.length).toBeGreaterThan(0);
    expect(content.music.src).toMatch(/^\/media\//);
  });

  it("มี section อย่างน้อย 1 อัน และทุก id ไม่ซ้ำ", () => {
    expect(content.sections.length).toBeGreaterThan(0);
    const ids = content.sections.map((s) => s.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("ทุก section มี field ครบตาม type", () => {
    for (const s of content.sections) {
      expect(s.id).toBeTruthy();
      assertSectionShape(s);
    }
  });

  it("ทุกพาธรูป/วิดีโอชี้ไปที่ /media/", () => {
    for (const s of content.sections) {
      for (const src of collectMediaSrc(s)) {
        expect(src, `${s.id}: ${src}`).toMatch(/^\/media\//);
      }
    }
  });
});

function assertSectionShape(s: StorySection) {
  switch (s.type) {
    case "text-image":
      expect(s.title).toBeTruthy();
      expect(s.body).toBeTruthy();
      expect(s.image.src).toBeTruthy();
      expect(s.image.alt).toBeTruthy();
      expect(["left", "right"]).toContain(s.side);
      break;
    case "video":
      expect(s.src).toBeTruthy();
      expect(s.poster.src).toBeTruthy();
      expect(s.poster.alt).toBeTruthy();
      break;
    case "gallery":
      expect(s.images.length).toBeGreaterThan(0);
      s.images.forEach((img) => {
        expect(img.src).toBeTruthy();
        expect(img.alt).toBeTruthy();
      });
      break;
    case "media-grid":
      expect(s.items.length).toBeGreaterThan(0);
      s.items.forEach((item) => {
        expect(item.src).toBeTruthy();
        if (item.kind === "image") expect(item.alt).toBeTruthy();
        if (item.kind === "video") expect(item.poster.src).toBeTruthy();
      });
      break;
    case "trip":
      expect(s.title).toBeTruthy();
      expect(s.cover.src).toBeTruthy();
      expect(s.cover.alt).toBeTruthy();
      break;
    case "quote":
      expect(s.text).toBeTruthy();
      break;
    default: {
      const _never: never = s;
      throw new Error(`unknown section type: ${JSON.stringify(_never)}`);
    }
  }
}

function collectMediaSrc(s: StorySection): string[] {
  switch (s.type) {
    case "text-image":
      return [s.image.src];
    case "video":
      return [s.src, s.poster.src];
    case "gallery":
      return s.images.map((i) => i.src);
    case "media-grid":
      return s.items.flatMap((item) =>
        item.kind === "video" ? [item.src, item.poster.src] : [item.src],
      );
    case "trip": {
      const srcs: string[] = [s.cover.src];
      if (s.video) { srcs.push(s.video.src, s.video.poster.src); }
      if (s.photos) srcs.push(...s.photos.map((p) => p.src));
      return srcs;
    }
    case "quote":
      return [];
  }
}
