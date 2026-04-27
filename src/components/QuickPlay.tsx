"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Shuffle, Crown } from "lucide-react";
import RandomPlayModal from "./RandomPlayModal";

export default function QuickPlay() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <section id="play" className="relative py-24 md:py-32 bg-[#07060d] overflow-hidden">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-purple-600/15 rounded-full blur-[140px] pointer-events-none" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <span className="inline-block text-purple-400 font-bold tracking-[0.25em] uppercase mb-4 text-xs">Quick Play</span>
              <h2 className="text-4xl md:text-6xl font-extrabold tracking-tighter">
                Daily one. Or <span className="gradient-text">2,000+ packs.</span>
              </h2>
            </div>
            <p className="text-lg text-[color:var(--color-mute)] max-w-md font-light">
              Tap into today's challenge for streaks and XP, or shuffle the entire library.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-6 gap-5">
            <motion.a
              href="https://ispotly.com/daily"
              whileHover={{ scale: 0.99 }}
              className="md:col-span-3 group relative rounded-[32px] overflow-hidden p-10 min-h-[320px] flex flex-col justify-between bg-gradient-to-br from-orange-500 via-amber-500 to-orange-600"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.25),transparent_60%)]" />
              <div className="relative">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/30 text-white text-xs font-bold uppercase tracking-widest mb-4">
                  <Crown className="w-3 h-3" /> Today
                </div>
                <h3 className="text-4xl md:text-5xl font-extrabold text-black tracking-tight">Daily Game</h3>
                <p className="text-black/80 text-base mt-3 max-w-sm">It's here. What are you waiting for?</p>
              </div>
              <div className="relative flex items-center justify-between">
                <div className="text-black/70 text-xs uppercase tracking-[0.3em] font-bold">Apr 27 · Track #437</div>
                <div className="px-5 py-2.5 rounded-full bg-black text-white font-bold text-sm group-hover:scale-105 transition">Play now</div>
              </div>
            </motion.a>

            <motion.button
              type="button"
              onClick={() => setOpen(true)}
              whileHover={{ scale: 0.99 }}
              className="md:col-span-3 group relative rounded-[32px] overflow-hidden p-10 min-h-[320px] flex flex-col justify-between bg-gradient-to-br from-purple-600 to-violet-700 text-left"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(236,72,153,0.45),transparent_60%)]" />
              <div className="relative">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/30 text-white text-xs font-bold uppercase tracking-widest mb-4">
                  <Shuffle className="w-3 h-3" /> Random
                </div>
                <h3 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">Quick Play</h3>
                <p className="text-white/80 text-base mt-3 max-w-sm">Pick the filters. We pick the song.</p>
              </div>
              <div className="relative flex items-center justify-between">
                <div className="text-white/70 text-xs uppercase tracking-[0.3em] font-bold">2000+ tracks</div>
                <div className="px-5 py-2.5 rounded-full bg-white text-black font-bold text-sm group-hover:scale-105 transition">Configure</div>
              </div>
            </motion.button>
          </div>
        </div>
      </section>

      <RandomPlayModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
