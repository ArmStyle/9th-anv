import "@testing-library/jest-dom/vitest";
import { vi } from "vitest";

// jsdom ไม่มี IntersectionObserver / matchMedia ที่ framer-motion ต้องใช้ — mock ให้ทุกเทสต์
if (!("IntersectionObserver" in globalThis)) {
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
}

// jsdom ไม่ได้ implement scrollTo/scrollBy — ใส่ noop กัน warning
if (typeof window !== "undefined") {
  window.scrollTo = () => {};
  window.scrollBy = () => {};
}

if (!("matchMedia" in globalThis)) {
  vi.stubGlobal("matchMedia", () => ({
    matches: false,
    media: "",
    onchange: null,
    addEventListener: () => {},
    removeEventListener: () => {},
    addListener: () => {},
    removeListener: () => {},
    dispatchEvent: () => false,
  }));
}
