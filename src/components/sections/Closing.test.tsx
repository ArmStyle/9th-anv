import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Closing } from "./Closing";

vi.stubGlobal("matchMedia", () => ({
  matches: false,
  addEventListener: () => {},
  removeEventListener: () => {},
  addListener: () => {},
  removeListener: () => {},
}));

describe("Closing", () => {
  it("แสดงหัวข้อและลายเซ็น (ย่อหน้าเป็นเอฟเฟกต์พิมพ์ดีดตอนเลื่อนเข้ามา)", () => {
    render(
      <Closing
        data={{
          eyebrow: "ถึงเธอ",
          title: "ขอบคุณที่อยู่ด้วยกัน",
          paragraphs: ["ย่อหน้าหนึ่ง", "ย่อหน้าสอง"],
          signature: "รักเธอเสมอ",
        }}
      />,
    );
    expect(screen.getByText("ขอบคุณที่อยู่ด้วยกัน")).toBeInTheDocument();
    expect(screen.getByText("ถึงเธอ")).toBeInTheDocument();
    expect(screen.getByText("รักเธอเสมอ")).toBeInTheDocument();
  });
});
