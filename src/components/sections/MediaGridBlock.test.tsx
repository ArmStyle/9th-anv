import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MediaGridBlock } from "./MediaGridBlock";
import type { MediaGridSection } from "@/content/types";

const data: MediaGridSection = {
  type: "media-grid",
  id: "grid",
  title: "คลิปสั้นๆ",
  items: [
    { kind: "image", src: "/media/a.svg", alt: "รูปเอ", width: 1200, height: 900 },
    {
      kind: "video",
      src: "/media/v1.mp4",
      poster: { src: "/media/v1.svg", alt: "โปสเตอร์วิดีโอ", width: 720, height: 1280 },
      orientation: "portrait",
    },
    {
      kind: "video",
      src: "/media/v2.mp4",
      poster: { src: "/media/v2.svg", alt: "โปสเตอร์สอง", width: 1280, height: 720 },
      orientation: "landscape",
    },
  ],
};

describe("MediaGridBlock", () => {
  it("แสดงรูปและปุ่มเล่นของวิดีโอครบทุกชิ้น", () => {
    render(<MediaGridBlock data={data} />);
    expect(screen.getByText("คลิปสั้นๆ")).toBeInTheDocument();
    expect(screen.getByAltText("รูปเอ")).toBeInTheDocument();
    // วิดีโอ 2 ชิ้น -> ปุ่มเล่น 2 ปุ่ม
    expect(screen.getAllByLabelText("เล่นวิดีโอ")).toHaveLength(2);
    // poster ของวิดีโอแสดงเป็นรูป
    expect(screen.getByAltText("โปสเตอร์วิดีโอ")).toBeInTheDocument();
  });
});
