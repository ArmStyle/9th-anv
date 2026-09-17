// สร้างเสียงบรรยากาศ placeholder แบบสังเคราะห์ (WAV) ใช้ชั่วคราวก่อนใส่เสียงจริง
// รันด้วย: node scripts/gen-ambient.mjs
// ไฟล์จริงควรเป็นเสียง royalty-free แล้ววางทับชื่อเดิมใน public/media/audio/
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, "..", "public", "media", "audio");
mkdirSync(outDir, { recursive: true });

const SR = 22050; // sample rate
const DUR = 6; // วินาที (วนซ้ำ)
const N = SR * DUR;

// สุ่มแบบ deterministic (ให้ผลเหมือนเดิมทุกครั้ง)
let seed = 1234567;
function rnd() {
  seed = (seed * 1103515245 + 12345) & 0x7fffffff;
  return (seed / 0x7fffffff) * 2 - 1; // -1..1
}

function onePoleLP(input, a) {
  const out = new Float32Array(input.length);
  let y = 0;
  for (let i = 0; i < input.length; i++) {
    y += a * (input[i] - y);
    out[i] = y;
  }
  return out;
}

function makeNoise() {
  const n = new Float32Array(N);
  for (let i = 0; i < N; i++) n[i] = rnd();
  return n;
}

// เฟดหัว-ท้ายให้ต่อวน (loop) เนียนขึ้น
function applyLoopFade(buf, fadeSec = 0.25) {
  const f = Math.floor(SR * fadeSec);
  for (let i = 0; i < f; i++) {
    const g = i / f;
    buf[i] *= g;
    buf[N - 1 - i] *= g;
  }
  return buf;
}

function generators(name) {
  const t = (i) => i / SR;
  const out = new Float32Array(N);

  if (name === "waves") {
    const noise = onePoleLP(makeNoise(), 0.02); // ทุ้มๆ เหมือนคลื่น
    for (let i = 0; i < N; i++) {
      const env = 0.55 + 0.45 * Math.sin(2 * Math.PI * 0.14 * t(i) - 1);
      out[i] = noise[i] * env * 0.9 + Math.sin(2 * Math.PI * 70 * t(i)) * 0.04;
    }
  } else if (name === "wind") {
    const noise = onePoleLP(makeNoise(), 0.05);
    for (let i = 0; i < N; i++) {
      const env = 0.5 + 0.5 * Math.sin(2 * Math.PI * 0.09 * t(i));
      out[i] = noise[i] * (0.5 + 0.5 * env) * 0.8;
    }
  } else if (name === "city") {
    const noise = onePoleLP(makeNoise(), 0.08);
    for (let i = 0; i < N; i++) {
      const hum =
        Math.sin(2 * Math.PI * 110 * t(i)) * 0.05 +
        Math.sin(2 * Math.PI * 175 * t(i)) * 0.03;
      out[i] = hum + noise[i] * 0.18;
    }
  } else if (name === "forest") {
    const bed = onePoleLP(makeNoise(), 0.15);
    for (let i = 0; i < N; i++) out[i] = bed[i] * 0.12;
    // เสียงนกจิ๊บๆ เป็นระยะ
    const chirpEvery = SR * 1.3;
    for (let start = SR * 0.4; start < N; start += chirpEvery) {
      const base = 2200 + rnd() * 1600;
      const len = Math.floor(SR * 0.12);
      for (let k = 0; k < 3; k++) {
        const s0 = Math.floor(start + k * SR * 0.13);
        for (let j = 0; j < len && s0 + j < N; j++) {
          const e = Math.exp(-j / (len * 0.35));
          out[s0 + j] +=
            Math.sin(2 * Math.PI * (base + k * 300) * (j / SR)) * e * 0.14;
        }
      }
    }
  } else {
    // soft pad โทนอุ่นเบาๆ (default)
    const freqs = [220, 277.18, 329.63];
    for (let i = 0; i < N; i++) {
      let s = 0;
      for (const f of freqs) s += Math.sin(2 * Math.PI * f * t(i));
      const trem = 0.6 + 0.4 * Math.sin(2 * Math.PI * 0.12 * t(i));
      out[i] = (s / freqs.length) * 0.09 * trem;
    }
  }

  // normalize กันดังเกิน
  let peak = 0;
  for (let i = 0; i < N; i++) peak = Math.max(peak, Math.abs(out[i]));
  if (peak > 0) {
    const g = 0.7 / peak;
    for (let i = 0; i < N; i++) out[i] *= g;
  }
  return applyLoopFade(out);
}

function writeWav(name, samples) {
  const bytesPerSample = 2;
  const dataSize = samples.length * bytesPerSample;
  const buf = Buffer.alloc(44 + dataSize);
  buf.write("RIFF", 0);
  buf.writeUInt32LE(36 + dataSize, 4);
  buf.write("WAVE", 8);
  buf.write("fmt ", 12);
  buf.writeUInt32LE(16, 16);
  buf.writeUInt16LE(1, 20); // PCM
  buf.writeUInt16LE(1, 22); // mono
  buf.writeUInt32LE(SR, 24);
  buf.writeUInt32LE(SR * bytesPerSample, 28);
  buf.writeUInt16LE(bytesPerSample, 32);
  buf.writeUInt16LE(16, 34);
  buf.write("data", 36);
  let off = 44;
  for (let i = 0; i < samples.length; i++) {
    let s = Math.max(-1, Math.min(1, samples[i]));
    buf.writeInt16LE(Math.round(s * 32767), off);
    off += bytesPerSample;
  }
  const path = join(outDir, `${name}.wav`);
  writeFileSync(path, buf);
  console.log("wrote", `audio/${name}.wav`, `(${(buf.length / 1024).toFixed(0)} KB)`);
}

for (const name of ["waves", "wind", "city", "forest", "soft"]) {
  writeWav(name, generators(name));
}
console.log("\nDone. Generated ambient placeholders in public/media/audio/");
