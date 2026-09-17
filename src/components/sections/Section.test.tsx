import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Section } from "./Section";
import type { StorySection } from "@/content/types";

// framer-motion ใช้ IntersectionObserver / matchMedia ที่ jsdom ไม่มี — mock ให้พอทดสอบ render ได้
vi.stubGlobal(
  "IntersectionObserver",
  class {
    observe() {}
    unobserve() {}
    disconnect() {}
    takeRecords() {
      return [];
    }
  },
);
vi.stubGlobal("matchMedia", () => ({
  matches: false,
  addEventListener: () => {},
  removeEventListener: () => {},
  addListener: () => {},
  removeListener: () => {},
}));

describe("Section dispatcher", () => {
  it("render text-image พร้อมหัวข้อและรูป", () => {
    const data: StorySection = {
      type: "text-image",
      id: "t1",
      side: "left",
      title: "หัวข้อทดสอบ",
      body: "เนื้อหาทดสอบ",
      image: { src: "/media/x.svg", alt: "รูปทดสอบ" },
    };
    render(<Section data={data} />);
    expect(screen.getByText("หัวข้อทดสอบ")).toBeInTheDocument();
    expect(screen.getByAltText("รูปทดสอบ")).toBeInTheDocument();
  });

  it("render gallery ครบทุกรูป", () => {
    const data: StorySection = {
      type: "gallery",
      id: "g1",
      images: [
        { src: "/media/a.svg", alt: "รูป A" },
        { src: "/media/b.svg", alt: "รูป B" },
      ],
    };
    render(<Section data={data} />);
    expect(screen.getByAltText("รูป A")).toBeInTheDocument();
    expect(screen.getByAltText("รูป B")).toBeInTheDocument();
  });

  it("render quote เป็น blockquote", () => {
    const data: StorySection = { type: "quote", id: "q1", text: "คำคมทดสอบ" };
    render(<Section data={data} />);
    expect(screen.getByText("คำคมทดสอบ")).toBeInTheDocument();
  });

  it("render video พร้อมปุ่มเล่น", () => {
    const data: StorySection = {
      type: "video",
      id: "v1",
      src: "/media/x.mp4",
      poster: { src: "/media/x.svg", alt: "โปสเตอร์" },
    };
    render(<Section data={data} />);
    expect(screen.getByLabelText("เล่นวิดีโอ")).toBeInTheDocument();
  });
});
