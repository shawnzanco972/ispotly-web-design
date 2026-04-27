"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { Play, ArrowRight, Sparkles } from "lucide-react";
import { AppStoreButton, GooglePlayButton } from "./AppStoreButtons";

type Star = { id: number; size: number; x: number; y: number; duration: number; delay: number; opacity: number };

const StarField = () => {
  const [stars, setStars] = useState<Star[]>([]);
  useEffect(() => {
    setStars(
      Array.from({ length: 90 }).map((_, i) => ({
        id: i,
        size: Math.random() * 2 + 1,
        x: Math.random() * 100,
        y: Math.random() * 100,
        duration: 10 + Math.random() * 20,
        delay: Math.random() * -20,
        opacity: 0.1 + Math.random() * 0.5,
      }))
    );
  }, []);
  return (
    <div className="absolute inset-0 z-[1] overflow-hidden pointer-events-none">
      {stars.map((s) => (
        <motion.div
          key={s.id}
          className="absolute rounded-full bg-white"
          style={{ width: s.size, height: s.size, left: `${s.x}%`, top: `${s.y}%`, opacity: s.opacity }}
          animate={{ opacity: [s.opacity, s.opacity * 2, s.opacity], y: [0, -20, 0] }}
          transition={{ duration: s.duration, repeat: Infinity, ease: "linear", delay: s.delay }}
        />
      ))}
    </div>
  );
};

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const [mp, setMp] = useState({ x: 0, y: 0 });
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);

  const onMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    setMp({ x: (e.clientX - r.left) / r.width - 0.5, y: (e.clientY - r.top) / r.height - 0.5 });
  };

  const sx = useSpring(mp.x, { damping: 20, stiffness: 100, mass: 0.5 });
  const sy = useSpring(mp.y, { damping: 20, stiffness: 100, mass: 0.5 });
  const tx = useTransform(sx, [-0.5, 0.5], [-15, 15]);
  const ty = useTransform(sy, [-0.5, 0.5], [-15, 15]);
  const rx = useTransform(sy, [-0.5, 0.5], [4, -4]);
  const ry = useTransform(sx, [-0.5, 0.5], [-4, 4]);
  const orbX1 = useTransform(sx, [-0.5, 0.5], [-50, 50]);
  const orbX2 = useTransform(sx, [-0.5, 0.5], [50, -50]);

  return (
    <section
      ref={ref}
      onMouseMove={onMove}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#07060d] pt-28"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(30,15,55,1)_0%,rgba(7,6,13,1)_70%)] z-0" />
      <div className="absolute inset-0 bg-grid z-0 opacity-60" />
      <StarField />

      <div className="absolute inset-0 z-0 pointer-events-none">
        <motion.div
          style={{ x: orbX1, y: y1 }}
          className="absolute top-0 -left-[10%] w-[700px] h-[700px] bg-purple-600 rounded-full blur-[220px] opacity-25"
        />
        <motion.div
          style={{ x: orbX2, y: y2 }}
          className="absolute bottom-0 -right-[10%] w-[600px] h-[600px] bg-orange-500 rounded-full blur-[200px] opacity-20"
        />
        <motion.div
          style={{ y: y1 }}
          className="absolute top-1/3 left-1/2 w-[500px] h-[500px] bg-pink-500 rounded-full blur-[200px] opacity-15"
        />
      </div>

      <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-[#07060d] to-transparent z-[5] pointer-events-none" />

      <motion.div
        style={{ x: tx, y: ty, rotateX: rx, rotateY: ry, perspective: 1000 }}
        className="relative z-10 container mx-auto px-6 text-center"
      >
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7 }}>
          <span className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 rounded-full border border-purple-400/30 bg-purple-500/10 text-purple-300 text-xs font-bold uppercase tracking-[0.25em] backdrop-blur-md">
            <Sparkles className="w-3 h-3 fill-current" />
            Daily song challenge
          </span>

          <h1 className="text-6xl md:text-[120px] font-extrabold leading-[0.85] tracking-tighter mb-8 text-white">
            GUESS <br />
            <span className="gradient-text">THE SONG.</span> <br />
            <span className="text-white/90">BEAT THE DAILY.</span>
          </h1>

          <p className="text-lg md:text-2xl text-[color:var(--color-mute)] max-w-2xl mx-auto mb-12 font-light leading-relaxed">
            One track. Five instruments. Five minutes of hints. Strip it back to the drums, bass and synth — name the song before the timer does.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
            <a href="https://ispotly.com/daily" className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-orange-500 rounded-full blur-[20px] opacity-50 group-hover:opacity-80 transition-all" />
              <div className="relative px-10 py-5 bg-gradient-to-r from-purple-500 to-orange-500 text-black font-extrabold text-lg rounded-full hover:scale-[1.03] active:scale-95 transition flex items-center gap-3 z-10">
                <Play className="w-5 h-5 fill-current" />
                Play Today's Track
              </div>
            </a>
            <a href="https://ispotly.com/archive" className="px-8 py-5 text-white font-bold text-base rounded-full border border-white/15 hover:bg-white/5 transition flex items-center gap-3 backdrop-blur-sm">
              See past dailies
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          <div className="mt-14 flex items-center justify-center gap-8 text-xs uppercase tracking-[0.3em] text-white/40 font-bold">
            <span>2000+ packs</span>
            <span className="w-1 h-1 rounded-full bg-white/30" />
            <span>Daily challenge</span>
            <span className="w-1 h-1 rounded-full bg-white/30" />
            <span>Free to play</span>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <AppStoreButton size="md" />
            <GooglePlayButton size="md" />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
