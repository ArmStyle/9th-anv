import { describe, it, expect, vi, beforeAll } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { IntroExperience } from "./IntroExperience";

vi.stubGlobal("matchMedia", () => ({
  matches: false,
  addEventListener: () => {},
  removeEventListener: () => {},
  addListener: () => {},
  removeListener: () => {},
}));

// jsdom ไม่มี play/pause ของ media element — mock ให้
beforeAll(() => {
  let paused = true;
  Object.defineProperty(HTMLMediaElement.prototype, "paused", {
    configurable: true,
    get: () => paused,
  });
  HTMLMediaElement.prototype.play = vi.fn(function (this: HTMLMediaElement) {
    paused = false;
    return Promise.resolve();
  });
  HTMLMediaElement.prototype.pause = vi.fn(function (this: HTMLMediaElement) {
    paused = true;
  });
});

const intro = {
  eyebrow: "ครบรอบ 9 ปี",
  title: "ก่อนจะเริ่ม",
  subtitle: "คำโปรย",
  buttonLabel: "เริ่มการเดินทางของเรา",
};
const music = { src: "/media/music.mp3", title: "เพลง" };

describe("IntroExperience", () => {
  it("แสดง intro gate ก่อน และซ่อนเนื้อหาปุ่มเพลง", () => {
    render(
      <IntroExperience intro={intro} music={music}>
        <div>เนื้อหาหลัก</div>
      </IntroExperience>,
    );
    expect(screen.getByText("ก่อนจะเริ่ม")).toBeInTheDocument();
    expect(screen.queryByLabelText(/เพลง/)).not.toBeInTheDocument();
  });

  it("กดเริ่มแล้ว overlay หาย + เริ่มเล่นเพลง + มีปุ่มปิดเพลง", async () => {
    render(
      <IntroExperience intro={intro} music={music}>
        <div>เนื้อหาหลัก</div>
      </IntroExperience>,
    );
    fireEvent.click(screen.getByRole("button", { name: "เริ่มการเดินทางของเรา" }));

    expect(HTMLMediaElement.prototype.play).toHaveBeenCalled();
    await waitFor(() =>
      expect(screen.getByLabelText("ปิดเพลง")).toBeInTheDocument(),
    );
  });

  it("ปุ่มเพลงสลับเปิด/ปิดได้", async () => {
    render(
      <IntroExperience intro={intro} music={music}>
        <div>เนื้อหาหลัก</div>
      </IntroExperience>,
    );
    fireEvent.click(screen.getByRole("button", { name: "เริ่มการเดินทางของเรา" }));

    const toggle = await screen.findByLabelText("ปิดเพลง");
    fireEvent.click(toggle);
    await waitFor(() =>
      expect(screen.getByLabelText("เปิดเพลง")).toBeInTheDocument(),
    );
  });
});
