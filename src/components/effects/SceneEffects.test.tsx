import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { SceneEffects } from "./SceneEffects";

describe("SceneEffects", () => {
  it("ไม่แสดงอะไรเมื่อไม่มี effect หรือ effect = none", () => {
    const { container: c1 } = render(<SceneEffects />);
    expect(c1.firstChild).toBeNull();
    const { container: c2 } = render(<SceneEffects effect="none" />);
    expect(c2.firstChild).toBeNull();
  });

  it("แสดงเลเยอร์ตกแต่ง (aria-hidden) สำหรับ effect ที่กำหนด", () => {
    for (const effect of [
      "sakura",
      "leaves",
      "snow",
      "lantern",
      "sky-lantern",
      "neon",
      "aurora",
      "sparkle",
      "beach",
    ] as const) {
      const { container } = render(<SceneEffects effect={effect} />);
      expect(
        container.querySelector('[aria-hidden="true"]'),
        `effect ${effect} ควร render เลเยอร์`,
      ).not.toBeNull();
    }
  });
});
