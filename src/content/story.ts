import type { MediaImage, MediaVideo, SiteContent } from "./types";

/**
 * เนื้อหาทั้งหมดของเว็บอยู่ที่นี่ที่เดียว
 *
 * โครงสร้างไฟล์:
 *   public/media/trips/<slug>/
 *     photo-1.jpg  photo-2.jpg ...  ← รูป (IG download)
 *     clip-1.mp4                    ← วิดีโอ
 *     clip-1.jpg                    ← poster ของวิดีโอ (รูปนิ่ง)
 *
 * ตอนนี้ path ชี้ไปไฟล์ .svg (placeholder) — เปลี่ยนนามสกุลเป็น .jpg/.mp4 ได้เลย
 *
 * วันที่: ยังไม่ระบุ — เติม place.period ภายหลังได้
 */

// ─── content ──────────────────────────────────────────────────────────────────

export const content: SiteContent = {
  intro: {
    eyebrow: "ครบรอบ 9 ปี",
    title: "ก่อนจะเริ่มเดินทาง...",
    subtitle:
      "นี่คือของขวัญเล็กๆ ที่อยากเล่าเรื่องราว 9 ปีของเราผ่านทุกที่ที่เราไปด้วยกัน เปิดเสียงเบาๆ แล้วค่อยๆ เลื่อนดูนะ",
    buttonLabel: "เริ่มการเดินทางของเรา",
  },

  hero: {
    eyebrow: "OUR JOURNEY",
    title: "9 ปีของเรา",
    subtitle: "หลายเมือง หลายฤดู แต่คนข้างๆ ยังเป็นคนเดิม",
    date: "ครบรอบ 9 ปี",
  },

  journey: { startDate: "2017-01-01" },

  sections: [
    // ─── 1) ไทเป ครั้งแรก ──────────────────────────────────────────────────
    {
      type: "trip",
      id: "taipei-1",
      title: "ไทเป ครั้งแรกของเรา",
      place: { city: "ไทเป", country: "ไต้หวัน" },
      effect: "leaves",
      ambient: "city",
      // ── ของจริง ──
      cover: { src: "/media/trips/taipei-1/photo-1.jpg", alt: "ไทเป ไต้หวัน", width: 1440, height: 1800 },
      note: "บินไปเที่ยวต่างประเทศครั้งแรกของเรา ทริปครบรอบ 7 ปี ได้เปิดหูเปิดตาเปิดโลกมาก สถานที่ใหม่ๆ ผู้คนใหม่ๆ ไปเที่ยวตามรีวิว กินอาหารอร่อยๆ กินชานมแทนน้ำเปล่า ไหว้พระขอพร ไปหลงบ้าง ถูกบ้าง ทะเลาะกันระหว่างทางบ้าง แต่ก็เป็นทริปที่สนุกมากเลย และเป็นประเทศที่ได้ขอหนูแต่งานด้วย ตอนนั้นตื่นเต้นมากๆ อยากจะขอในสถานที่ที่สวยๆ ดีๆ กว่านี้อยู่นะ แต่คนก็เยอะ พี่ก็เขิน จนสุดท้ายก็รวบรวมความกล้าขอหนูแต่งงานตอนก่อนจะเก็บของบินกลับบ้าน <3",
      video: {
        src: "/media/trips/taipei-1/clip-1.mp4",
        poster: { src: "/media/trips/taipei-1/clip-1.jpg", alt: "ไทเป ไต้หวัน คลิป", width: 1440, height: 1800 },
      },
      photos: [
        { src: "/media/trips/taipei-1/photo-2.jpg", alt: "ไทเป ไต้หวัน (2)", width: 1440, height: 1800 },
        { src: "/media/trips/taipei-1/photo-3.jpg", alt: "ไทเป ไต้หวัน (3)", width: 1440, height: 1800 },
        { src: "/media/trips/taipei-1/photo-4.jpg", alt: "ไทเป ไต้หวัน (4)", width: 1440, height: 1080 },
        { src: "/media/trips/taipei-1/photo-5.jpg", alt: "ไทเป ไต้หวัน (5)", width: 1440, height: 1800 },
      ],
    },

    // ─── 2) ฟุกุโอกะ ────────────────────────────────────────────────────────
    {
      type: "trip",
      id: "fukuoka",
      title: "ฟุกุโอกะ เมืองสงบ ชิลๆ",
      place: { city: "ฟุกุโอกะ", country: "ญี่ปุ่น" },
      effect: "beach",
      ambient: "city",
      cover: { src: "/media/trips/fukuoka/photo-1.jpg", alt: "ฟุกุโอกะ ญี่ปุ่น", width: 1440, height: 1800 },
      note: "ทริปญี่ปุ่นหลังแต่งงาน ประเทศที่อยากไปเป็นอันดับหนึ่งของพี่และน่าจะเป็นอันดับต้นๆของหนูเหมือนกัน เป็นประเทศที่ของกินใช้คำว่าอร่อยได้เปลืองมาก เดินทางก็ง่าย ผู้คนน่ารัก ห้องน้ำก็ดีแบบดีเกิ๊นคุณพี่ แต่ถังขยะหายากมากกกกกกกกกกกกกกกกกกกก ขนาดเป็นเมืองที่ตอนนั้นยังไม่ค่อยฮิต จนตอนนี้ราคาแรงแซงโตเดียว-โอซาก้าไปแล้ว แต่ตอนนั้นตั๋วถูกที่สุดใน 4 เมืองใหญ่แล้ว ก็เลยได้มาญี่ปุ่นเมืองฟุกุเป็นที่แรก มีความสุขมาก อยากไปเที่ยวกับหนูอีกหลายๆ ที่เลย",
      video: { src: "/media/trips/fukuoka/clip-1.mp4", poster: { src: "/media/trips/fukuoka/clip-1.jpg", alt: "คลิปฟุกุโอกะ", width: 1440, height: 1800 } },
      photos: [
        { src: "/media/trips/fukuoka/photo-2.jpg", alt: "ฟุกุโอกะ ญี่ปุ่น (2)", width: 1440, height: 1800 },
        { src: "/media/trips/fukuoka/photo-3.jpg", alt: "ฟุกุโอกะ ญี่ปุ่น (3)", width: 1440, height: 1800 },
        { src: "/media/trips/fukuoka/photo-4.jpg", alt: "ฟุกุโอกะ ญี่ปุ่น (4)", width: 1440, height: 1800 },
        { src: "/media/trips/fukuoka/photo-5.jpg", alt: "ฟุกุโอกะ ญี่ปุ่น (5)", width: 1440, height: 1800 },
      ],
    },

    { type: "quote", id: "quote-1", text: "ไม่ว่าจะไปไกลแค่ไหน บ้านของพี่ก็คือตรงที่มีหนูอยู่" },

    // ─── 3) ไทเป ครั้งที่ 2 ────────────────────────────────────────────────
    // ⬇ วางไฟล์จริง: photo-1..5.jpg + clip-1.mp4 + clip-1.jpg แล้ว uncomment
    {
      type: "trip",
      id: "taipei-2",
      title: "กลับไปไทเปอีกครั้ง",
      place: { city: "ไทเป", country: "ไต้หวัน" },
      effect: "sky-lantern",
      ambient: "city",
      cover: { src: "/media/trips/taipei-2/photo-1.jpg", alt: "ไทเป 2", width: 1440, height: 1800 },
      note: "ทริปไทเป ไต้หวันรอบที่สอง รอบนี้มาแก้บนวัดหลงซาน ที่ไปรอบแรกท่านประทานพรให้ไวเกินกลับไปวัดไม่ทันต้องบินมาใหม่รอบสองพร้อมซื้อเครื่องรางมา Activate แบบเบิ้มๆ รอบนี้ซื้อเยอะมาก มารอบนี้ก็มาเก็บแลนมาร์คเพิ่มเติมที่รอบก่อนไปไม่ทัน เก็บได้ไม่หมด ก็ได้ลองไปสถานที่ใหม่ๆ ถึงแม้จะเป็นประเทศเดิม หลังจากเที่ยวรอบนี้ก็ทำให้เรา 2 คนอยากบินไปเที่ยวอีกหลายๆประเทศมากขึ้นไปอีก จนเกิดเป็นทริปต่อไปอย่างไว",
      video: { src: "/media/trips/taipei-2/clip-1.mp4", poster: { src: "/media/trips/taipei-2/clip-1.jpg", alt: "คลิปไทเป 2", width: 1440, height: 1800 } },
      photos: [
        { src: "/media/trips/taipei-2/photo-2.jpg", alt: "ไทเป 2 (2)", width: 1440, height: 1800 },
        { src: "/media/trips/taipei-2/photo-3.jpg", alt: "ไทเป 2 (3)", width: 1440, height: 1800 },
        { src: "/media/trips/taipei-2/photo-44.jpg", alt: "ไทเป 2 (4)", width: 1440, height: 1800 },
        { src: "/media/trips/taipei-2/photo-5.jpg", alt: "ไทเป 2 (5)", width: 1440, height: 1800 },
      ],
    },

    // ─── 4) เซี่ยงไฮ้ ────────────────────────────────────────────────────────
    // ⬇ วางไฟล์จริง: photo-1..5.jpg + clip-1.mp4 + clip-1.jpg แล้ว uncomment
    {
      type: "trip",
      id: "shanghai",
      title: "เซี่ยงไฮ้ เมืองที่ไม่เคยหลับ",
      place: { city: "เซี่ยงไฮ้", country: "จีน" },
      effect: "lantern",
      ambient: "city",
      cover: { src: "/media/trips/shanghai/photo-1.jpg", alt: "shanghai", width: 1440, height: 1800 },
      note: "2024 - 2025 ปีนี้มาเคาท์ดาวน์ที่เซี่ยงไฮ้ ประเทศจีน ในใจตอนแรกแอบกลัวนิดๆ เพราะเสียงลือเสียงเล่าอ้าง แต่เราก็ตัดสินใจบินมาเที่ยวจีนในเมืองก่อน เพราะหลายๆอย่างที่เขาลือกันน่าจะซอฟต์ลง ซึ่งก็ซอฟต์ลงจริงๆ เป็นทริปที่ต้องใส่เสื้อกันหนาวเลย อากาศดีมาก เมืองแสงสี เมืองเทคโนโลยี สถาปัตย์-บ้านเมืองสวยมาก แต่แอบเดินทางยากเพราะต้องใช้ map จีนและเราไม่ค่อยถูกปากกับอาหารจีน แต่โดยรวมก็ดียังมี Holiland ที่อร่อยจนต้องซื้อกลับกับ Miniso ใหญ่ นอกจากในเมืองยังเป็นทริปที่ได้ไป Disney Land ครั้งแรก ใส่หมวกการ์ตูนเดินเที่ยวถ่ายรูปปราสาทและเล่นเครื่องเล่นที่หวาดเสียวที่แรกในชีวิตของเราสองคน",
      video: { src: "/media/trips/shanghai/clip-1.mp4", poster: { src: "/media/trips/shanghai/clip-1.jpg", alt: "คลิปเซี่ยงไฮ้", width: 1440, height: 1800 } },
      photos: [
        { src: "/media/trips/shanghai/photo-2.jpg", alt: "shanghai (2)", width: 1440, height: 1800 },
        { src: "/media/trips/shanghai/photo-3.jpg", alt: "shanghai (3)", width: 1440, height: 1800 },
        { src: "/media/trips/shanghai/photo-4.jpg", alt: "shanghai (4)", width: 1440, height: 1800 },
        { src: "/media/trips/shanghai/photo-5.jpg", alt: "shanghai (5)", width: 1440, height: 1800 },
        { src: "/media/trips/shanghai/photo-6.jpg", alt: "shanghai (6)", width: 1440, height: 1800 },
        { src: "/media/trips/shanghai/photo-7.jpg", alt: "shanghai (7)", width: 1440, height: 1800 },
      ],
    },

    // ─── 5) โตเกียว · ฟูจิ ─────────────────────────────────────────────────
    // ⬇ วางไฟล์จริง: photo-1..5.jpg + clip-1.mp4 + clip-1.jpg แล้ว uncomment
    {
      type: "trip",
      id: "tokyo-fuji",
      title: "โตเกียว & ภูเขาไฟฟูจิ",
      place: { city: "โตเกียว · ฟูจิ", country: "ญี่ปุ่น" },
      effect: "sakura",
      ambient: "wind",
      cover: { src: "/media/trips/tokyo-fuji/photo-1.jpg", alt: "tokyo-fuji", width: 1440, height: 1800 },
      note: "ทริปหยุดยาวเดือน 4 ได้บินตรง Full-Service ครั้งแรกและเป็นสายการบิน ANA ด้วย ไปญี่ปุ่นไม่เคยผิดหวังเลย ของกินอร่อย บ้านเมือง ผู้คน ห้องน้ำ การเดินทาง ทุกอย่างดีเหมือนเดิม เป็นทริปที่ตั้งใจไปดูคุณลุงฟูจิมากๆ แต่คุณลุงขี้อายมากๆ ได้เห็นไม่เต็มเลย ฟ้าไม่เปิดเลย(วันฟ้าเปิดก็ไม่ได้ไป เพราะจองรถไฟไปที่อื่น พอกลับไปอีกวันแทนฟ้าปิดเหมือนเดิม) แต่ก็ยังโชคดีที่ได้เห็น ขนาดไปทั้งอาทิตย์ก็ยังเก็บที่เที่ยว ที่กินไม่ครบ ยังมีอีกหลายที่ที่อยากไป หลายร้านที่อยากกิน เป็นทริปที่เที่ยวแบบใช้เงินเยอะที่สุดตั้งแต่บินมาเลยและเป็นทริปที่เปย์ภรรยาหนักมาก ไว้ไปกันอีกนะ รักมากๆ นะ",
      video: { src: "/media/trips/tokyo-fuji/clip-1.mp4", poster: { src: "/media/trips/tokyo-fuji/clip-1.jpg", alt: "คลิปโตเกียว ฟูจิ", width: 1440, height: 1800 } },
      photos: [
        { src: "/media/trips/tokyo-fuji/photo-2.jpg", alt: "tokyo-fuji (2)", width: 1440, height: 1800 },
        { src: "/media/trips/tokyo-fuji/photo-3.jpg", alt: "tokyo-fuji (3)", width: 1440, height: 1800 },
        { src: "/media/trips/tokyo-fuji/photo-4.jpg", alt: "tokyo-fuji (4)", width: 1440, height: 1800 },
        { src: "/media/trips/tokyo-fuji/photo-5.jpg", alt: "tokyo-fuji (5)", width: 1440, height: 1800 },
        { src: "/media/trips/tokyo-fuji/photo-6.jpg", alt: "tokyo-fuji (6)", width: 1440, height: 1800 },
        { src: "/media/trips/tokyo-fuji/photo-7.jpg", alt: "tokyo-fuji (7)", width: 1440, height: 1800 },
      ],    
    },

    { type: "quote", id: "quote-2", text: "ทุกที่ที่ไป แค่อยากถ่ายรูปหนูไว้ให้ครบทุกมุม" },

    // ─── 6) ฮ่องกง ──────────────────────────────────────────────────────────
    // ⬇ วางไฟล์จริง: photo-1..5.jpg + clip-1.mp4 + clip-1.jpg แล้ว uncomment
    {
      type: "trip",
      id: "hongkong",
      title: "แสงสีฮ่องกง",
      place: { city: "ฮ่องกง", country: "จีน" },
      effect: "neon",
      ambient: "city",
      cover: { src: "/media/trips/hongkong/photo-1.jpg", alt: "hongkong", width: 1440, height: 1800 },
      note: "ฮ่องกงเดือนธันวาเลย หลังจากช๊อตยาวจากโตเกียว 55555 ไปมูวัดหลงซานรอบก่อนแล้วยังไม่ได้ มามูมาเสริมดวงเพิ่มที่ฮ่องกงวัดกังหัน วัดเจ้าแม่กวนอิมและมาเที่ยว Disney Land ที่สุดท้ายในเอเชีย และหวังว่าอนาคตเราจะได้ไป Disney Land ที่อื่นอีกเก็บให้ครบทุกที่ในโลก แอบเสียดายนิดหน่อยที่เราไปช่วงที่เขาไว้อาลัยพอดีเลยไม่ได้ดูพลุเลย ไว้ไปกันใหม่นะ จะกี่ทริปๆ แค่ได้มาเที่ยวด้วยกันกับหนูก็มีความสุขมากทุกทริป",
      // video: { src: "/media/trips/hongkong/clip-1.mp4", poster: { src: "/media/trips/hongkong/clip-1.jpg", alt: "คลิปฮ่องกง", width: 1440, height: 1800 } },
      photos: [
        { src: "/media/trips/hongkong/photo-2.jpg", alt: "hongkong (2)", width: 1440, height: 1800 },
        { src: "/media/trips/hongkong/photo-3.jpg", alt: "hongkong (3)", width: 1440, height: 1800 },
        { src: "/media/trips/hongkong/photo-4.jpg", alt: "hongkong (4)", width: 1440, height: 1800 },
        { src: "/media/trips/hongkong/photo-5.jpg", alt: "hongkong (5)", width: 1440, height: 1800 },
        { src: "/media/trips/hongkong/photo-6.jpg", alt: "hongkong (6)", width: 1440, height: 1800 },
        { src: "/media/trips/hongkong/photo-7.jpg", alt: "hongkong (7)", width: 1440, height: 1800 },
      ],  
    },

    // ─── 7) นาโกย่า · โอซาก้า ──────────────────────────────────────────────
    // ⬇ วางไฟล์จริง: photo-1..5.jpg + clip-1.mp4 + clip-1.jpg แล้ว uncomment
    {
      type: "trip",
      id: "nagoya-osaka",
      title: "นาโกย่า สู่ โอซาก้า",
      place: { city: "นาโกย่า · โอซาก้า", country: "ญี่ปุ่น" },
      effect: "snow",
      ambient: "city",
      cover: { src: "/media/trips/nagoya-osaka/photo-1.jpg", alt: "nagoya-osaka", width: 1440, height: 1800 },
      note: "2025 - 2026 ปีนี้ได้มาเคาท์ดาวน์ที่ญี่ปุ่น เป็นญี่ปุ่นรอบที่ 3 แต่เมืองใหม่ ทริปที่ทรหดที่สุดแต่ได้เที่ยวหลายที่ที่สุด ใช้พาสคุ้มมาก เดินทางเยอะไปหน่อยเลยได้เที่ยวแต่ละที่น้อย เดินทางตั้งแต่ นาโกย่าไป-ทาคายาม่า-ชิราคาวาโกะ-โทยามะ-โอซาก้า-เกียวโต ได้เห็นหิมะ ได้เที่ยวหลายเมือง หาของกินของขึ้นชื่ออร่อยๆ ของแต่ละเมือง กับภรรยาก็เป็นอีกทริปที่มีความสุขมาก ไว้มากันอีกนะ ยังมีอีกหลายที่ที่อยากไป หลายร้านที่อยากกินเหมือนตอนโตเกียวเลย",      // video: { src: "/media/trips/nagoya-osaka/clip-1.mp4", poster: { src: "/media/trips/nagoya-osaka/clip-1.jpg", alt: "คลิปนาโกย่า โอซาก้า", width: 1440, height: 1800 } },
      photos: [
        { src: "/media/trips/nagoya-osaka/photo-2.jpg", alt: "nagoya-osaka (2)", width: 1440, height: 1800 },
        { src: "/media/trips/nagoya-osaka/photo-3.jpg", alt: "nagoya-osaka (3)", width: 1440, height: 1800 },
        { src: "/media/trips/nagoya-osaka/photo-4.jpg", alt: "nagoya-osaka (4)", width: 1440, height: 1800 },
        { src: "/media/trips/nagoya-osaka/photo-5.jpg", alt: "nagoya-osaka (5)", width: 1440, height: 1800 },
        { src: "/media/trips/nagoya-osaka/photo-6.jpg", alt: "nagoya-osaka (6)", width: 1440, height: 1800 },
        { src: "/media/trips/nagoya-osaka/photo-7.jpg", alt: "nagoya-osaka (7)", width: 1440, height: 1800 },
        { src: "/media/trips/nagoya-osaka/photo-8.jpg", alt: "nagoya-osaka (8)", width: 1440, height: 1800 },
        { src: "/media/trips/nagoya-osaka/photo-9.jpg", alt: "nagoya-osaka (9)", width: 1440, height: 1800 },
      ],   
    },

    // ─── 8) ไทเป ครั้งที่ 3 ─────────────────────────────────────────────────
    {
      type: "trip",
      id: "taipei-3",
      // side: "right",
      // layout: "overlay",
      place: { city: "ไทเป", country: "ไต้หวัน" },
      effect: "aurora",
      ambient: "city",
      title: "ไทเป ที่คุ้นเคยเหมือนบ้าน",
      cover: { src: "/media/trips/taipei-3/photo-1.jpg", alt: "taipei-3", width: 1440, height: 1800 },
      note: "กลับมาที่เดิมเป็นครั้งที่สาม เหมือนเป็นบ้านหลังที่สอง ทริปนี้เน้นกิน ไม่ถ่ายรูปตัวเอง ไม่ค่อยลงสตอรี่ ไม่เอาอะไรเลย เดินชิล เดินหาของกิน ถ่ายแต่รูปของกิน หาของช้อปปิ้งนิดๆ หน่อยๆ ได้เดินย่านใหม่ เป็นอีกทริปชิลมากๆ แต่ก็ดีมากๆ เลยนะ",
      video: { src: "/media/trips/taipei-3/clip-1.mp4", poster: { src: "/media/trips/taipei-3/clip-1.jpg", alt: "ไทเป", width: 720, height: 960 } },
      photos: []
    },

    // ─── 9) ลี่เจียง ────────────────────────────────────────────────────────
    // ⬇ วางไฟล์จริง: photo-1..5.jpg + clip-1.mp4 + clip-1.jpg แล้ว uncomment
    {
      type: "trip",
      id: "lijiang",
      title: "เมืองเก่าลี่เจียง",
      place: { city: "ลี่เจียง", country: "จีน" },
      effect: "sparkle",
      ambient: "wind",
      cover: { src: "/media/trips/lijiang/photo-1.jpg", alt: "lijiang", width: 1440, height: 1800 },
      note: "เที่ยวจีนรอบที่สอง ทริปปุบปับ ทริปที่จองล่วงหน้าแค่เดือนกว่าๆ ภรรยาหยุดยาวเดือน 8 แต่ยังไม่มีทริปและก็ไม่อยากเที่ยวไทย เพราะราคาแทบไม่ต่างจากไปต่างประเทศ 55555 เลยได้มาที่ คุนหมือง-ลี่เจียง เป็นทริปที่เริ่มต้นทริปไม่ค่อยดีเท่าไร(โดยเฉพาะตอนเดินทางไปลี่เจียง) มีอะไรผิดพลาดเยอะหน่อยเพราะพี่ทำแพลน จองตั๋ว แต่ก็ผ่านไปได้ด้วยดี ระหว่างทางก็ต้องยอมรับว่าวิว สถานที่ของจีนมันสวยจริงๆ แต่ถ้าถามว่ามาอีกมั้ย ก็อาจจะยังก่อน ขอไปที่อื่นกับภรรยาก่อนนะ",
      // video: { src: "/media/trips/lijiang/clip-1.mp4", poster: { src: "/media/trips/lijiang/clip-1.jpg", alt: "คลิปลี่เจียง", width: 1440, height: 1800 } },
      photos: [
        { src: "/media/trips/lijiang/photo-2.jpg", alt: "lijiang (2)", width: 1440, height: 1800 },
        { src: "/media/trips/lijiang/photo-3.jpg", alt: "lijiang (3)", width: 1440, height: 1800 },
        { src: "/media/trips/lijiang/photo-4.jpg", alt: "lijiang (4)", width: 1440, height: 1800 },
        { src: "/media/trips/lijiang/photo-5.jpg", alt: "lijiang (5)", width: 1440, height: 1800 },
      ],   
    },

    { type: "quote", id: "quote-3", text: "9 ปี กับอีกหลายเมืองที่เรายังไม่ได้ไป... ขอจองที่ข้างๆ เธอไว้ทุกทริปนะ" },
  ],

  closing: {
    eyebrow: "ถึงออย",
    title: "ขอบคุณที่เดินทางมาด้วยกันตลอด 9 ปี",
    paragraphs: [
      "เก้าปีที่ผ่านมา เราผ่านสนามบินมามากมาย ผ่านทั้งทริปที่วางแผนดีและทริปที่วางแผนไม่ดี",
      "ขอบคุณที่อดทน ที่หัวเราะ ที่ยังอยู่ข้างๆ และที่ยังเลือกพี่ในทุกๆ วัน",
      "ยังมีอีกหลายเมืองรอเราอยู่ และอยากไปให้ครบทุกที่ ตราบใดที่คนที่นั่งข้างๆ ยังเป็นหนู",
    ],
    signature: "รักเสมอนะ",
  },

  music: { src: "/media/audio/audio.webm", title: "เพลงบรรเลงประกอบ" },
};

export default content;
