import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { JourneyMap } from "./JourneyMap";
import { content } from "@/content/story";

describe("JourneyMap", () => {
  it("แสดงหมุดเมืองจากเนื้อหา", () => {
    render(<JourneyMap sections={content.sections} />);
    // ไทเปปรากฏทั้งใน mobile timeline และ desktop map (2 view ใน DOM พร้อมกัน)
    const taipeiEls = screen.getAllByText("ไทเป");
    expect(taipeiEls.length).toBeGreaterThanOrEqual(1);
    // ฮ่องกงก็เช่นกัน
    const hkEls = screen.getAllByText("ฮ่องกง");
    expect(hkEls.length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText("เส้นทางการเดินทางของเรา")).toBeInTheDocument();
  });

  it("ไม่แสดงถ้ามีสถานที่น้อยกว่า 2", () => {
    const { container } = render(
      <JourneyMap sections={[{ type: "quote", id: "q", text: "x" }]} />,
    );
    expect(container.firstChild).toBeNull();
  });
});
