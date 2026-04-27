"use client";
import { useRef, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { Play, ArrowRight, Sparkles } from "lucide-react";
import { AppStoreButton, GooglePlayButton } from "./AppStoreButtons";
import NotesField from "./NotesField";

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
      <NotesField count={32} />

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

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-5">
            <a href="https://ispotly.com/daily" className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-orange-500 rounded-full blur-[20px] opacity-50 group-hover:opacity-80 transition-all" />
              <div className="relative px-7 py-4 sm:px-10 sm:py-5 bg-gradient-to-r from-purple-500 to-orange-500 text-black font-extrabold text-base sm:text-lg rounded-full hover:scale-[1.03] active:scale-95 transition flex items-center gap-2 sm:gap-3 z-10">
                <Play className="w-5 h-5 fill-current" />
                Play Today's Track
              </div>
            </a>
            <a href="https://ispotly.com/archive" className="px-6 py-4 sm:px-8 sm:py-5 text-white font-bold text-sm sm:text-base rounded-full border border-white/15 hover:bg-white/5 transition flex items-center gap-2 sm:gap-3 backdrop-blur-sm">
              See past dailies
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* stats — mobile stacked, each word on its own line; desktop single row */}
          <div className="mt-10 sm:mt-14 max-w-xs sm:max-w-none mx-auto grid grid-cols-3 gap-2 sm:flex sm:items-center sm:justify-center sm:gap-8 text-[10px] sm:text-xs uppercase tracking-[0.22em] sm:tracking-[0.3em] text-white/40 font-bold leading-[1.2]">
            <span className="text-center sm:text-left flex flex-col sm:block">
              <span className="sm:inline">2000+</span>
              <span className="sm:inline sm:ml-1">packs</span>
            </span>
            <span className="hidden sm:block w-1 h-1 rounded-full bg-white/30" />
            <span className="text-center sm:text-left flex flex-col sm:block">
              <span className="sm:inline">Daily</span>
              <span className="sm:inline sm:ml-1">challenge</span>
            </span>
            <span className="hidden sm:block w-1 h-1 rounded-full bg-white/30" />
            <span className="text-center sm:text-left flex flex-col sm:block">
              <span className="sm:inline">Free</span>
              <span className="sm:inline sm:ml-1">to&nbsp;play</span>
            </span>
          </div>

          {/* store buttons — always horizontal, smaller on mobile */}
          <div className="mt-6 sm:mt-8 flex sm:hidden items-center justify-center gap-2">
            <AppStoreButton size="sm" />
            <GooglePlayButton size="sm" />
          </div>
          <div className="mt-8 hidden sm:flex items-center justify-center gap-3">
            <AppStoreButton size="md" />
            <GooglePlayButton size="md" />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
