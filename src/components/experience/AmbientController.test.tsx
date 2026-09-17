import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { AmbientController } from "./AmbientController";

describe("AmbientController", () => {
  it("สร้าง <audio> หนึ่งตัวต่อหนึ่ง track", () => {
    const { container } = render(
      <AmbientController tracks={["city", "wind"]} enabled={false} />,
    );
    expect(container.querySelectorAll("audio")).toHaveLength(2);
  });

  it("ไม่ render อะไรเมื่อไม่มี track", () => {
    const { container } = render(<AmbientController tracks={[]} enabled />);
    expect(container.firstChild).toBeNull();
  });
});
