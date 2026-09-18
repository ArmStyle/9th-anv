/**
 * โครงสร้างข้อมูลของเนื้อหาทั้งหมด (config-driven)
 * แก้ไข/เพิ่มเนื้อหาได้ที่ src/content/story.ts โดยไม่ต้องแตะ component
 */

export type MediaImage = {
  /** พาธรูปใน public เช่น "/media/tokyo-1.svg" */
  src: string;
  /** คำอธิบายรูปสำหรับการเข้าถึง (alt) */
  alt: string;
  /** อัตราส่วน (กว้าง/สูง) เผื่อ layout ป้องกันภาพกระตุก */
  width?: number;
  height?: number;
};

/** แนวของวิดีโอ: portrait = แนวตั้ง (9:16), landscape = แนวนอน (16:9) */
export type Orientation = "portrait" | "landscape";

/** ข้อมูลวิดีโอ 1 คลิป */
export type MediaVideo = {
  /** พาธวิดีโอใน public เช่น "/media/clip-1.mp4" */
  src: string;
  /** รูป poster ระหว่างยังไม่เล่น */
  poster: MediaImage;
  /** แนววิดีโอ (ค่าเริ่มต้น landscape) */
  orientation?: Orientation;
};

/**
 * ไอเทมในแกลเลอรีรวม (media-grid) — เป็นได้ทั้งรูปหรือวิดีโอ
 * เหมาะกับการวางรูปเยอะๆ ปนวิดีโอแนวตั้งในเลย์เอาต์แบบ masonry
 */
export type MediaItem =
  | ({ kind: "image" } & MediaImage)
  | ({ kind: "video" } & MediaVideo & { alt?: string });

/** ข้อมูลสถานที่/ช่วงเวลาของแต่ละ chapter การเดินทาง */
export type Place = {
  /** ชื่อเมือง/สถานที่ เช่น "โตเกียว" */
  city?: string;
  /** ประเทศ เช่น "ญี่ปุ่น" */
  country?: string;
  /** ช่วงเวลา เช่น "2560 · ทริปแรกของเรา" */
  period?: string;
};

/**
 * ลูกเล่น animation ประจำสถานที่ (แสดงเป็นเลเยอร์ตกแต่งลอยอยู่ในฉาก)
 * - sakura: กลีบซากุระร่วง (ญี่ปุ่น)
 * - lantern: โคมแดง/ทองลอย (จีน)
 * - sky-lantern: โคมลอยผิงซีลอยขึ้น (ไต้หวัน)
 * - neon: แสงนีออนวูบวาบ (ฮ่องกง)
 * - snow: หิมะตก (สวิตเซอร์แลนด์)
 * - aurora: แสงเหนือเรืองรอง (ไอซ์แลนด์)
 * - leaves: ใบไม้ร่วง (เกาหลี/ฤดูใบไม้เปลี่ยนสี)
 * - beach: แสงแดด/ฟองอากาศ (ทะเล/บาหลี)
 * - sparkle: ประกายไฟระยิบ (ปารีส/หอไอเฟล)
 * - none: ไม่มีลูกเล่น
 */
export type SceneEffect =
  | "sakura"
  | "lantern"
  | "sky-lantern"
  | "neon"
  | "snow"
  | "aurora"
  | "leaves"
  | "beach"
  | "sparkle"
  | "none";

/**
 * เสียงบรรยากาศประจำฉาก (ไฟล์อยู่ที่ public/media/audio/<name>.wav)
 * city = เมือง, waves = คลื่นทะเล, wind = ลมภูเขา, forest = ป่า/นก, soft = เบาๆ อบอุ่น
 */
export type Ambient = "city" | "waves" | "wind" | "forest" | "soft";

/** section แบบข้อความ + รูปเดียว วางซ้าย/ขวา */
export type TextImageSection = {
  type: "text-image";
  id: string;
  place?: Place;
  title: string;
  body: string;
  image: MediaImage;
  /** วางรูปด้านไหน (สลับกันไปเพื่อความน่าสนใจ) — ใช้เมื่อ layout = "side" */
  side: "left" | "right";
  /**
   * รูปแบบ layout
   * - "side" (ค่าเริ่มต้น): รูปซ้าย/ขวา ข้อความอีกฝั่ง
   * - "overlay": ข้อความซ้อนทับอยู่บนรูป (gradient overlay)
   */
  layout?: "side" | "overlay";
  /** ข้อความหลังการ์ด (โชว์ตอน hover/แตะพลิกเป็นตั๋วเครื่องบิน) */
  note?: string;
  /** ลูกเล่น animation ประจำสถานที่ (ออปชัน) */
  effect?: SceneEffect;
  /** เสียงบรรยากาศประจำฉาก (ออปชัน) */
  ambient?: Ambient;
};

/** section วิดีโอเดี่ยว */
export type VideoSection = {
  type: "video";
  id: string;
  place?: Place;
  /** พาธวิดีโอใน public เช่น "/media/paris.mp4" */
  src: string;
  /** รูป poster ระหว่างยังไม่เล่น */
  poster: MediaImage;
  caption?: string;
  /** แนววิดีโอ (ค่าเริ่มต้น landscape); ตั้ง "portrait" สำหรับวิดีโอแนวตั้ง */
  orientation?: Orientation;
  /** ลูกเล่น animation ประจำสถานที่ (ออปชัน) */
  effect?: SceneEffect;
  /** เสียงบรรยากาศประจำฉาก (ออปชัน) */
  ambient?: Ambient;
};

/** section แกลเลอรีรวมรูป+วิดีโอ (masonry) — รองรับหลายรูปและวิดีโอแนวตั้งปนกัน */
export type MediaGridSection = {
  type: "media-grid";
  id: string;
  place?: Place;
  title?: string;
  items: MediaItem[];
  /** ข้อความหลังการ์ดตั๋ว (โชว์ตอนกดพลิก) — ถ้าไม่ใส่จะไม่แสดงการ์ดพลิก */
  note?: string;
  /** วิดีโอ (portrait) อยู่คอลัมน์ซ้ายหรือขวา (ค่าเริ่มต้น "right") */
  videoSide?: "left" | "right";
  /** ลูกเล่น animation ประจำสถานที่ (ออปชัน) */
  effect?: SceneEffect;
  /** เสียงบรรยากาศประจำฉาก (ออปชัน) */
  ambient?: Ambient;
};

/** section แกลเลอรีหลายรูป */
export type GallerySection = {
  type: "gallery";
  id: string;
  place?: Place;
  title?: string;
  images: MediaImage[];
  /** ข้อความหลังการ์ดตั๋ว (โชว์ตอนกดพลิก) — ถ้าไม่ใส่จะไม่แสดงการ์ดพลิก */
  note?: string;
  /** ลูกเล่น animation ประจำสถานที่ (ออปชัน) */
  effect?: SceneEffect;
  /** เสียงบรรยากาศประจำฉาก (ออปชัน) */
  ambient?: Ambient;
};

/** section ข้อความคำคม/ประโยคซึ้งๆ คั่นระหว่างทริป */
export type QuoteSection = {
  type: "quote";
  id: string;
  text: string;
  /** ผู้พูด/ที่มา (ออปชัน) */
  attribution?: string;
};

/**
 * section ทริปแบบ "Photo Reel" — layout B
 * โครงสร้าง: ชื่อ → FlipCard (hero image) → Video เต็มแถว → Photo Strip
 */
export type TripSection = {
  type: "trip";
  id: string;
  place?: Place;
  /** ชื่อทริป */
  title: string;
  /** ข้อความหลังตั๋ว (boarding pass) */
  note?: string;
  /** รูปหลัก (FlipCard) — ควรเป็น portrait 4:5 */
  cover: MediaImage;
  /** วิดีโอหลัก เต็มแถว (autoplay เมื่อเลื่อนถึง) */
  video?: MediaVideo;
  /**
   * aspect ratio ของวิดีโอบน mobile (ค่าเริ่มต้น "9/16")
   * ใส่ตรงๆ ได้เลย เช่น "9/16", "3/4", "4/5", "16/9"
   * sm+ จะใช้ "4/5" เสมอ (ยกเว้น landscape จะยังคง ratio เดิม)
   */
  videoAspect?: string;
  /** รูปเพิ่มเติม (horizontal scroll strip) */
  photos?: MediaImage[];
  /** ลูกเล่น animation ประจำสถานที่ (ออปชัน) */
  effect?: SceneEffect;
  /** เสียงบรรยากาศประจำฉาก (ออปชัน) */
  ambient?: Ambient;
};

export type StorySection =
  | TextImageSection
  | VideoSection
  | GallerySection
  | MediaGridSection
  | TripSection
  | QuoteSection;

/** ข้อมูลหน้า Hero (หน้าเปิด) */
export type HeroContent = {
  eyebrow: string;
  title: string;
  subtitle: string;
  date: string;
};

/** ข้อความหน้า Intro Gate (ก่อนเข้าเว็บ) */
export type IntroContent = {
  eyebrow: string;
  title: string;
  subtitle: string;
  buttonLabel: string;
};

/** ข้อความปิดท้าย (จดหมาย) */
export type ClosingContent = {
  eyebrow: string;
  title: string;
  /** ย่อหน้าของจดหมาย เรียงตามลำดับ */
  paragraphs: string[];
  signature: string;
};

/** เพลงบรรเลงประกอบ */
export type MusicContent = {
  src: string;
  title: string;
};

/** ข้อมูลภาพรวมการเดินทาง (ใช้คำนวณสถิติ count-up) */
export type JourneyMeta = {
  /** วันที่เริ่มคบกัน (ISO เช่น "2017-02-14") ใช้คำนวณจำนวนวันที่อยู่ด้วยกัน */
  startDate: string;
};

/** รวมทุกอย่างของเว็บไว้ที่เดียว */
export type SiteContent = {
  intro: IntroContent;
  hero: HeroContent;
  journey: JourneyMeta;
  sections: StorySection[];
  closing: ClosingContent;
  music: MusicContent;
};
