"use client";
import { useEffect, useMemo, useRef, useState } from "react";

type Shape = "spike" | "rolling" | "smooth" | "jagged";
type Stem = {
  color: string;
  shape: Shape;
  speed: number;
  amp: number;
  freq: number;
  jitter: number;
  lineWidth: number;
};
type Item = {
  name: string;
  img: string;
  stems: [Stem, Stem, Stem, Stem];
};

const ITEMS: Item[] = [
  {
    name: "Classic Rock",
    img: "https://res.cloudinary.com/dyvgrd762/image/upload/q_auto/f_auto/v1768739331/ClassicRock_Square",
    stems: [
      { color: "#ffc857", shape: "spike",   speed: 6.0, amp: 0.95, freq: 8,   jitter: 0.55, lineWidth: 2.2 },
      { color: "#ff8a3d", shape: "rolling", speed: 1.8, amp: 0.85, freq: 1.9, jitter: 0.30, lineWidth: 3.6 },
      { color: "#ffd166", shape: "rolling", speed: 2.2, amp: 0.65, freq: 2.6, jitter: 0.18, lineWidth: 2.6 },
      { color: "#ff6b00", shape: "rolling", speed: 1.3, amp: 0.55, freq: 1.5, jitter: 0.12, lineWidth: 2.6 },
    ],
  },
  {
    name: "1990s",
    img: "https://res.cloudinary.com/dyvgrd762/image/upload/q_auto/f_auto/v1768739331/1990s_Square",
    stems: [
      { color: "#c084fc", shape: "spike",   speed: 2.4, amp: 0.85, freq: 3.4, jitter: 0.12, lineWidth: 2.6 },
      { color: "#3b82f6", shape: "rolling", speed: 1.0, amp: 0.95, freq: 1.0, jitter: 0.36, lineWidth: 5.2 },
      { color: "#a78bfa", shape: "rolling", speed: 1.4, amp: 0.6,  freq: 1.7, jitter: 0.08, lineWidth: 2.4 },
      { color: "#60a5fa", shape: "rolling", speed: 0.8, amp: 0.5,  freq: 1.2, jitter: 0.06, lineWidth: 2.4 },
    ],
  },
  {
    name: "Rap & Hip-Hop",
    img: "https://res.cloudinary.com/dyvgrd762/image/upload/q_auto/f_auto/v1768739331/RapHipHop_Square",
    stems: [
      { color: "#39ff14", shape: "spike",   speed: 11,  amp: 0.98, freq: 18,  jitter: 0.06, lineWidth: 2 },
      { color: "#fde047", shape: "spike",   speed: 7.5, amp: 0.7,  freq: 11,  jitter: 0.05, lineWidth: 1.8 },
      { color: "#86efac", shape: "rolling", speed: 1.6, amp: 0.55, freq: 1.7, jitter: 0,    lineWidth: 2.4 },
      { color: "#facc15", shape: "rolling", speed: 0.5, amp: 1.0,  freq: 0.6, jitter: 0,    lineWidth: 7 },
    ],
  },
  {
    name: "Love is in the Air",
    img: "https://res.cloudinary.com/dyvgrd762/image/upload/q_auto/f_auto/v1768739331/LoveisIntheAir_Square",
    stems: [
      { color: "#ff6b9a", shape: "smooth", speed: 1.0, amp: 0.65, freq: 1.1, jitter: 0, lineWidth: 3.4 },
      { color: "#ff8fa3", shape: "smooth", speed: 0.8, amp: 0.6,  freq: 0.9, jitter: 0, lineWidth: 3.4 },
      { color: "#ff4d6d", shape: "smooth", speed: 0.6, amp: 0.55, freq: 0.7, jitter: 0, lineWidth: 3.4 },
      { color: "#ffc4d6", shape: "smooth", speed: 0.45, amp: 0.5, freq: 0.5, jitter: 0, lineWidth: 3.4 },
    ],
  },
  {
    name: "EDM",
    img: "https://res.cloudinary.com/dyvgrd762/image/upload/q_auto/f_auto/v1768739331/EDM_Square",
    stems: [
      { color: "#22d3ee", shape: "jagged", speed: 9.5, amp: 0.98, freq: 14, jitter: 0.22, lineWidth: 2.4 },
      { color: "#f0abfc", shape: "spike",  speed: 8.0, amp: 0.92, freq: 11, jitter: 0.18, lineWidth: 2.4 },
      { color: "#38bdf8", shape: "jagged", speed: 6.5, amp: 0.9,  freq: 9,  jitter: 0.12, lineWidth: 2.4 },
      { color: "#ec4899", shape: "spike",  speed: 5.0, amp: 0.96, freq: 6,  jitter: 0.06, lineWidth: 3.4 },
    ],
  },
];

const CYCLES = 3;

function shapeY(shape: Shape, phase: number) {
  switch (shape) {
    case "spike": {
      const s = Math.sin(phase);
      return Math.sign(s) * Math.pow(Math.abs(s), 0.26);
    }
    case "rolling":
      return Math.sin(phase) * 0.9 + Math.sin(phase * 0.4) * 0.1;
    case "jagged":
      return (2 / Math.PI) * Math.asin(Math.sin(phase));
    case "smooth":
    default:
      return Math.sin(phase);
  }
}

function drawWaves(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  t: number,
  stems: Item["stems"]
) {
  ctx.clearRect(0, 0, w, h);
  ctx.globalCompositeOperation = "lighter";

  const points = Math.min(260, Math.max(90, Math.round(w / 2.5)));

  stems.forEach((stem, idx) => {
    const yMid = (h * (idx + 0.5)) / 4;
    const trackH = h / 4;
    const maxA = stem.amp * (trackH * 0.46);

    ctx.beginPath();
    for (let i = 0; i <= points; i++) {
      const u = i / points;
      const x = u * w;
      const phase = u * Math.PI * 2 * stem.freq + t * stem.speed;
      let y = shapeY(stem.shape, phase);
      if (stem.jitter) {
        y += (Math.sin(phase * 17.3 + t * 9.1) * 0.6 + Math.sin(phase * 41.7 + t * 13.2) * 0.4) * stem.jitter;
      }
      if (y > 1) y = 1;
      else if (y < -1) y = -1;
      const py = yMid + y * maxA;
      if (i === 0) ctx.moveTo(x, py);
      else ctx.lineTo(x, py);
    }

    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    // outer halo
    ctx.shadowColor = stem.color;
    ctx.shadowBlur = 32;
    ctx.strokeStyle = stem.color;
    ctx.lineWidth = stem.lineWidth * 2.6;
    ctx.globalAlpha = 0.28;
    ctx.stroke();

    // mid glow
    ctx.shadowBlur = 18;
    ctx.lineWidth = stem.lineWidth * 1.4;
    ctx.globalAlpha = 0.55;
    ctx.stroke();

    // bright core
    ctx.shadowBlur = 8;
    ctx.lineWidth = stem.lineWidth;
    ctx.globalAlpha = 1;
    ctx.stroke();
  });

  ctx.globalCompositeOperation = "source-over";
  ctx.globalAlpha = 1;
  ctx.shadowBlur = 0;
}

export default function Reveal() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const canvasRefs = useRef<(HTMLCanvasElement | null)[]>([]);
  const drag = useRef({ active: false, lastX: 0, current: 0, target: 0, vel: 0 });
  const autoRef = useRef({ enabled: true, speed: -0.35 });

  const [dims, setDims] = useState<{ w: number; gap: number }>({ w: 320, gap: 24 });

  const RENDER = useMemo(
    () =>
      Array.from({ length: ITEMS.length * CYCLES }, (_, i) => ({
        ...ITEMS[i % ITEMS.length],
        _key: i,
      })),
    []
  );

  useEffect(() => {
    const calc = () => {
      const sw = window.innerWidth;
      if (sw < 640) setDims({ w: 220, gap: 14 });
      else if (sw < 1024) setDims({ w: 300, gap: 22 });
      else setDims({ w: 380, gap: 28 });
    };
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);

  useEffect(() => {
    const resizeCanvases = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvasRefs.current.forEach((c) => {
        if (!c) return;
        const r = c.getBoundingClientRect();
        const W = Math.max(1, Math.round(r.width * dpr));
        const H = Math.max(1, Math.round(r.height * dpr));
        if (c.width !== W || c.height !== H) {
          c.width = W;
          c.height = H;
        }
        const ctx = c.getContext("2d");
        if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      });
    };
    resizeCanvases();
    window.addEventListener("resize", resizeCanvases);

    let raf = 0;
    const t0 = performance.now();
    const tick = (now: number) => {
      const t = (now - t0) / 1000;
      const d = drag.current;
      const advance = dims.w + dims.gap;
      const cycleW = advance * ITEMS.length;

      // gentle auto-drift while idle
      if (autoRef.current.enabled && !d.active && Math.abs(d.vel) < 0.2) {
        d.target += autoRef.current.speed;
      }

      if (!d.active) {
        d.target += d.vel;
        d.vel *= 0.92;
        if (Math.abs(d.vel) < 0.05) d.vel = 0;
      }

      d.current += (d.target - d.current) * 0.16;

      // infinite wrap (invisible because content repeats every cycleW)
      while (d.current > cycleW / 2) {
        d.current -= cycleW;
        d.target -= cycleW;
      }
      while (d.current < -cycleW / 2) {
        d.current += cycleW;
        d.target += cycleW;
      }

      if (trackRef.current) {
        trackRef.current.style.transform = `translate(-50%, -50%) translate3d(${d.current.toFixed(2)}px, 0, 0)`;
      }

      const sec = sectionRef.current?.getBoundingClientRect();
      if (sec) {
        const sx = sec.left + sec.width / 2;
        itemRefs.current.forEach((el) => {
          if (!el) return;
          const r = el.getBoundingClientRect();
          const local = sx - r.left;
          const cut = Math.max(0, Math.min(r.width, local));
          const cutPct = (cut / Math.max(1, r.width)) * 100;
          el.style.setProperty("--cut", `${cutPct}%`);
          el.style.setProperty("--invcut", `${100 - cutPct}%`);
        });
      }

      canvasRefs.current.forEach((c, i) => {
        if (!c) return;
        const ctx = c.getContext("2d");
        if (!ctx) return;
        const r = c.getBoundingClientRect();
        if (r.width <= 0 || r.height <= 0) return;
        if (r.right < 0 || r.left > window.innerWidth) return; // skip offscreen
        const stems = ITEMS[i % ITEMS.length].stems;
        drawWaves(ctx, r.width, r.height, t, stems);
      });

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resizeCanvases);
    };
  }, [dims]);

  const onPointerDown = (e: React.PointerEvent) => {
    const d = drag.current;
    d.active = true;
    d.lastX = e.clientX;
    d.vel = 0;
    autoRef.current.enabled = false;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    const d = drag.current;
    if (!d.active) return;
    const dx = e.clientX - d.lastX;
    d.target += dx;
    d.vel = dx * 0.7;
    d.lastX = e.clientX;
  };
  const onPointerEnd = (e: React.PointerEvent) => {
    drag.current.active = false;
    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {}
  };

  return (
    <section className="relative py-24 md:py-32 bg-black overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 text-center mb-16">
        <h2 className="text-4xl md:text-7xl font-extrabold tracking-tighter mb-6 leading-[1.05]">
          We strip the song down to <br />
          <span className="gradient-text">drums, bass, synth.</span>
        </h2>
        <p className="text-lg md:text-2xl text-white/50 font-light max-w-3xl mx-auto">
          Cover on the left. Stems on the right. Drag to scan through.
        </p>
      </div>

      <div
        ref={sectionRef}
        className="relative w-full select-none cursor-grab active:cursor-grabbing"
        style={{ height: dims.w + 80, touchAction: "pan-y" }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerEnd}
        onPointerCancel={onPointerEnd}
      >
        {/* edge fades */}
        <div className="absolute inset-y-0 left-0 w-24 md:w-48 bg-gradient-to-r from-black via-black/80 to-transparent z-30 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-24 md:w-48 bg-gradient-to-l from-black via-black/80 to-transparent z-30 pointer-events-none" />

        {/* track */}
        <div
          ref={trackRef}
          className="absolute top-1/2 left-1/2 flex items-center will-change-transform"
          style={{ gap: dims.gap }}
        >
          {RENDER.map((item, i) => (
            <div
              key={item._key}
              ref={(el) => {
                itemRefs.current[i] = el;
              }}
              className="relative shrink-0"
              style={{ width: dims.w, height: dims.w }}
            >
              {/* bottom layer — stems */}
              <canvas
                ref={(el) => {
                  canvasRefs.current[i] = el;
                }}
                className="absolute inset-0 w-full h-full block"
                style={{ clipPath: "inset(0 0 0 var(--cut, 50%))" }}
              />

              {/* top layer — album cover */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.img}
                alt=""
                draggable={false}
                className="absolute inset-0 w-full h-full object-cover pointer-events-none rounded-2xl"
                style={{ clipPath: "inset(0 var(--invcut, 50%) 0 0)" }}
              />
            </div>
          ))}
        </div>

        {/* scanner line */}
        <div className="absolute top-[10%] bottom-[10%] left-1/2 -translate-x-1/2 w-px z-20 pointer-events-none">
          <div className="absolute inset-y-0 -left-[6px] w-3 blur-2xl bg-gradient-to-b from-fuchsia-400 via-pink-400 to-orange-400 opacity-80" />
          <div className="absolute inset-y-0 -left-[2px] w-[5px] blur-[2px] bg-gradient-to-b from-fuchsia-300 via-pink-300 to-orange-300 opacity-90" />
          <div className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-white to-transparent" />
        </div>
      </div>
    </section>
  );
}
