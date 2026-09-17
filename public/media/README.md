# โฟลเดอร์รูป วิดีโอ และเสียง (media)

ไฟล์ `.svg` ในนี้เป็นรูป **placeholder ชั่วคราว** ที่ระบบสร้างให้อัตโนมัติ
เพื่อให้เว็บมีของโชว์ก่อนใส่รูป/วิดีโอจริง

## โครงสร้างโฟลเดอร์

```
public/media/
├─ hero.svg                     ← รูปพื้นหลังหน้าเปิด (Hero)
├─ music.mp3                    ← เพลงคลอหลัก (ยังไม่มี วางเพิ่มได้)
├─ audio/                       ← เสียงบรรยากาศต่อฉาก (placeholder)
│  ├─ city.wav  waves.wav  wind.wav  forest.wav  soft.wav
└─ trips/                       ← รูป/วิดีโอ แยกตามทริป (เรียงตาม timeline)
   ├─ taipei-1/     photo-1..4.svg
   ├─ fukuoka/      photo-1.svg
   ├─ taipei-2/     photo-1..5.svg, clip-1.svg   (clip = โปสเตอร์วิดีโอ)
   ├─ shanghai/     photo-1..4.svg
   ├─ tokyo-fuji/   photo-1..4.svg
   ├─ hongkong/     photo-1..4.svg, clip-1.svg
   ├─ nagoya-osaka/ photo-1..5.svg
   ├─ taipei-3/     photo-1.svg
   └─ lijiang/      photo-1..4.svg
```

ลำดับทริปทั้งหมดกำหนดไว้ที่ `src/content/story.ts` (แก้ลำดับ/เพิ่ม/ลบได้ที่นั่น)

## วิธีใส่รูปจริง

1. วางไฟล์รูป (`.jpg/.png/.webp`) ลงในโฟลเดอร์ทริปที่ต้องการ เช่น `trips/taipei-1/`
2. เปิด `src/content/story.ts` แล้วแก้ `src` ให้ตรงชื่อไฟล์จริง
   เช่น `"/media/trips/taipei-1/photo-1.svg"` → `"/media/trips/taipei-1/photo-1.jpg"`
3. อัปเดต `alt` ให้ตรงกับรูป (ช่วยเรื่องการเข้าถึง)
4. เพิ่มรูปได้ไม่จำกัด — เพิ่มไฟล์แล้วเพิ่มรายการใน `images`/`items` ของทริปนั้น

## วิดีโอ (รวมแนวตั้ง)

- วิดีโอวางเป็น `.mp4` ในโฟลเดอร์ทริป เช่น `trips/taipei-2/clip-1.mp4`
- ตั้ง `poster` เป็นรูปนิ่งของคลิป (เช่น `clip-1.svg` หรือรูปจริง)
- วิดีโอแนวตั้งใส่ `orientation: "portrait"` / แนวนอนไม่ต้องใส่ (ค่าเริ่มต้น)
- ถ้ายังไม่มีไฟล์วิดีโอ เว็บจะแสดง poster แทน (ไม่พัง)
- แนะนำย่อขนาดวิดีโอก่อน (1080p, บิตเรตพอประมาณ) ให้โหลดไว

## เพลง + เสียงบรรยากาศ

- เพลงคลอหลัก: วางไฟล์ `music.mp3` ในโฟลเดอร์นี้
- เสียงบรรยากาศต่อฉาก (เลือกใน `story.ts` ผ่านฟิลด์ `ambient`):
  `city` / `waves` / `wind` / `forest` / `soft` — ไฟล์อยู่ที่ `audio/<name>.wav`
  ตอนนี้เป็นเสียงสังเคราะห์ placeholder เปลี่ยนเป็นเสียง royalty-free จริงได้โดยวางทับชื่อเดิม

## สร้าง placeholder ใหม่

- รูป: `node scripts/gen-placeholders.mjs`
- เสียง: `node scripts/gen-ambient.mjs`
