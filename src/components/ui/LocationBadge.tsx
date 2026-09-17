import type { Place } from "@/content/types";

function PinIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4 shrink-0"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

/** ป้ายบอกสถานที่ + ช่วงเวลาของแต่ละ chapter การเดินทาง */
export function LocationBadge({
  place,
  tone = "light",
}: {
  place?: Place;
  tone?: "light" | "dark";
}) {
  if (!place) return null;
  const { city, country, period } = place;
  const label = [city, country].filter(Boolean).join(", ");

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <span
          className={`inline-flex w-fit items-center gap-1.5 rounded-full px-3 py-1 text-sm font-medium ${
            tone === "light"
              ? "bg-sunset/15 text-sunset"
              : "bg-white/10 text-gold"
          }`}
        >
          <PinIcon />
          {label}
        </span>
      )}
      {period && (
        <span
          className={`text-xs uppercase tracking-[0.2em] ${
            tone === "light" ? "text-foreground/50" : "text-cream/60"
          }`}
        >
          {period}
        </span>
      )}
    </div>
  );
}

export default LocationBadge;
