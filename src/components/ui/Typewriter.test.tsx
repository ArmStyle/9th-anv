import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, act } from "@testing-library/react";
import { Typewriter } from "./Typewriter";

vi.stubGlobal("matchMedia", () => ({
  matches: false,
  addEventListener: () => {},
  removeEventListener: () => {},
  addListener: () => {},
  removeListener: () => {},
}));

describe("Typewriter", () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it("ยังไม่พิมพ์เมื่อ active = false", () => {
    render(<Typewriter text="สวัสดี" active={false} />);
    expect(screen.queryByText(/สวัสดี/)).not.toBeInTheDocument();
  });

  it("พิมพ์ข้อความจนครบเมื่อ active", () => {
    render(<Typewriter text="รักนะ" active speed={10} delay={0} />);
    act(() => {
      vi.advanceTimersByTime(500);
    });
    expect(screen.getByText(/รักนะ/)).toBeInTheDocument();
  });
});
