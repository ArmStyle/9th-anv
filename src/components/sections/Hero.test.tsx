import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Hero } from "./Hero";

vi.stubGlobal("matchMedia", () => ({
  matches: false,
  addEventListener: () => {},
  removeEventListener: () => {},
  addListener: () => {},
  removeListener: () => {},
}));

describe("Hero", () => {
  it("แสดงหัวข้อ, eyebrow และวันที่", () => {
    render(
      <Hero
        data={{
          eyebrow: "OUR JOURNEY",
          title: "9 ปีของเรา",
          subtitle: "คำโปรย",
          date: "ครบรอบ 9 ปี",
        }}
      />,
    );
    expect(screen.getByRole("heading", { name: "9 ปีของเรา" })).toBeInTheDocument();
    expect(screen.getByText("OUR JOURNEY")).toBeInTheDocument();
    expect(screen.getByText("ครบรอบ 9 ปี")).toBeInTheDocument();
  });
});
