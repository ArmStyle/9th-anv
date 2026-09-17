"use client";

import { useState, type ReactNode } from "react";

function TicketIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M3 8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2 2 2 0 0 0 0 4 2 2 0 0 1-2 2H5a2 2 0 0 1-2-2 2 2 0 0 0 0-4Z" />
      <path d="M15 6v12" strokeDasharray="2 2" />
    </svg>
  );
}

/**
 * การ์ดพลิกได้ (3D flip) แบบตั๋วเครื่องบิน
 * - คลิก/แตะเพื่อพลิก คลิกอีกครั้งเพื่อพลิกกลับ (toggle เท่านั้น ไม่ flip เมื่อ hover)
 * ด้านหน้า = รูป, ด้านหลัง = ข้อความบันทึกความทรงจำ (boarding pass)
 */
export function FlipCard({
  front,
  note,
  ticketLabel,
}: {
  front: ReactNode;
  note: string;
  ticketLabel?: string;
}) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div className="[perspective:1400px]">
      <button
        type="button"
        onClick={() => setFlipped((f) => !f)}
        aria-label={flipped ? "พลิกกลับไปดูรูป" : "พลิกดูบันทึกความทรงจำ"}
        aria-pressed={flipped}
        className="relative block min-h-48 w-full rounded-2xl text-left transition-transform duration-700 [transform-style:preserve-3d] sm:rounded-3xl"
        style={{ transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)" }}
      >
        {/* ด้านหน้า: รูป */}
        <div className="overflow-hidden rounded-2xl shadow-lg shadow-night/10 ring-1 ring-black/5 [backface-visibility:hidden] sm:rounded-3xl sm:shadow-xl">
          {front}
          <span className="pointer-events-none absolute bottom-2.5 right-2.5 flex items-center gap-1 rounded-full bg-night/70 px-2 py-0.5 text-[10px] text-cream backdrop-blur sm:bottom-3 sm:right-3 sm:px-2.5 sm:py-1 sm:text-[11px]">
            <TicketIcon />
            <span className="hidden xs:inline">พลิกดูบันทึก</span>
            <span className="xs:hidden">บันทึก</span>
          </span>
        </div>

        {/* ด้านหลัง: ตั๋ว/บันทึก */}
        <div className="absolute inset-0 min-h-[200px] flex flex-col justify-between rounded-2xl bg-cream p-4 text-night shadow-lg ring-1 ring-black/5 [backface-visibility:hidden] [transform:rotateY(180deg)] sm:rounded-3xl sm:p-6 sm:shadow-xl">
          <div className="flex items-center justify-between gap-2 text-[10px] uppercase tracking-[0.18em] text-sunset sm:text-xs sm:tracking-[0.2em]">
            <span className="flex items-center gap-1.5">
              <TicketIcon />
              boarding pass
            </span>
            {ticketLabel && (
              <span className="truncate text-foreground/50">{ticketLabel}</span>
            )}
          </div>

          <div className="my-2.5 border-t-2 border-dashed border-foreground/15 sm:my-3" />

          <p className="flex-1 font-display text-base leading-relaxed text-foreground/85 sm:text-lg">
            {note}
          </p>

          <div className="mt-2.5 flex items-center justify-between text-[10px] uppercase tracking-[0.18em] text-foreground/40 sm:mt-3 sm:text-[11px] sm:tracking-[0.2em]">
            <span>9 ปีของเรา</span>
            <span>♥ boarding</span>
          </div>
        </div>
      </button>
    </div>
  );
}

export default FlipCard;
