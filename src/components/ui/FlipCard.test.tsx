import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { FlipCard } from "./FlipCard";

describe("FlipCard", () => {
  it("แสดงบันทึก และสลับ aria-label เมื่อคลิกพลิก", () => {
    render(<FlipCard front={<div>รูป</div>} note="ความทรงจำทดสอบ" ticketLabel="ไทเป" />);
    expect(screen.getByText("ความทรงจำทดสอบ")).toBeInTheDocument();

    const btn = screen.getByRole("button", { name: "พลิกดูบันทึกความทรงจำ" });
    fireEvent.click(btn);
    expect(
      screen.getByRole("button", { name: "พลิกกลับไปดูรูป" }),
    ).toBeInTheDocument();
  });
});
