import Image from "next/image";
import type { MediaImage } from "@/content/types";
import { BLUR_DATA_URL } from "./blur";

type SmartImageProps = {
  image: MediaImage;
  className?: string;
  sizes?: string;
  priority?: boolean;
  /** เติมเต็มกล่องพ่อแม่ (ต้องมี position:relative + ขนาดที่กล่อง) */
  fill?: boolean;
};

/**
 * ห่อ next/image ให้ใช้กับ config ของเราง่ายๆ
 * - lazy load อัตโนมัติ (ยกเว้น priority) เพื่อให้โหลดเฉพาะรูปที่กำลังจะเห็น
 * - มี blur placeholder โทนอุ่นระหว่างโหลด กันภาพเด้ง
 * - โหมด fill: ใช้กับกล่องที่กำหนดขนาดเอง (เช่นแกลเลอรี)
 * - โหมดปกติ: ใช้ width/height จาก config เพื่อกันภาพกระตุก (layout shift)
 */
export function SmartImage({
  image,
  className,
  sizes = "100vw",
  priority = false,
  fill = false,
}: SmartImageProps) {
  const common = {
    src: image.src,
    sizes,
    priority,
    placeholder: "blur" as const,
    blurDataURL: BLUR_DATA_URL,
    className,
  };

  if (fill) {
    return <Image alt={image.alt} {...common} fill />;
  }

  return (
    <Image
      alt={image.alt}
      {...common}
      width={image.width ?? 1200}
      height={image.height ?? 900}
    />
  );
}

export default SmartImage;
