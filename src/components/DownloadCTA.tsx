"use client";
import { motion } from "framer-motion";
import { Globe, Star } from "lucide-react";
import { AppStoreButton, GooglePlayButton } from "./AppStoreButtons";

type Review = {
  quote: string;
  author: string;
  // Position uses left/right/top/bottom so quotes can intentionally bleed off the section edges.
  pos: { left?: string; right?: string; top?: string; bottom?: string };
  rotate: number;
  size: string;
  hideOnMobile?: boolean;
};

const reviews: Review[] = [
  { quote: "It's challenging but addicting!", author: "App Store · Apr 6",  pos: { left: "4%",  top: "18%" },    rotate: -5, size: "text-lg md:text-4xl" },
  { quote: "I can't stop!",                    author: "App Store · Mar 6",  pos: { right: "5%", top: "22%" },    rotate: 4,  size: "text-lg md:text-4xl" },
  { quote: "Such a unique game",               author: "App Store · Feb 28", pos: { left: "36%", top: "8%" },     rotate: -2, size: "text-base md:text-3xl" },
  { quote: "A great addition to our hangouts!", author: "App Store · Feb 26", pos: { left: "5%",  bottom: "18%" }, rotate: 3,  size: "text-base md:text-3xl" },
  { quote: "Play all the time. So much fun.",   author: "App Store · Mar 6",  pos: { right: "4%", bottom: "10%" }, rotate: -3, size: "text-base md:text-3xl" },
];

export default function DownloadCTA() {
  return (
    <section
      id="download"
      className="relative min-h-screen flex items-center justify-center py-12 md:py-20 bg-[#07060d] overflow-hidden"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-purple-600/20 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-orange-500/15 rounded-full blur-[160px] pointer-events-none" />

      {/* Background quotes — allowed to bleed off-edge for the cinematic look. */}
      <div className="absolute inset-0 pointer-events-none select-none">
        {reviews.map((r, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.8 }}
            style={{ ...r.pos, transform: `rotate(${r.rotate}deg)` }}
            className="absolute max-w-[150px] md:max-w-[440px]"
          >
            <div className={`font-extrabold text-white/[0.14] md:text-white/[0.10] leading-[0.95] tracking-tighter ${r.size}`}>
              &ldquo;{r.quote}&rdquo;
            </div>
            <div className="mt-1 flex items-center gap-1.5 text-white/25 md:text-white/20 text-[8px] md:text-[11px] uppercase tracking-widest font-bold">
              <span className="flex">
                {Array.from({ length: 5 }).map((_, k) => (
                  <Star key={k} className="w-2.5 h-2.5 md:w-3 md:h-3 fill-current" />
                ))}
              </span>
              <span>{r.author}</span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center items-center gap-3 mb-5"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://ispotly.com/ispotly_logo_transperant.png"
            alt="iSpotly"
            className="h-12 md:h-16 w-auto"
          />
          <span className="text-3xl md:text-5xl font-extrabold tracking-tight text-white">iSpotly</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm text-[10px] md:text-xs uppercase tracking-widest font-bold text-white/70"
        >
          <span className="flex text-amber-400">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="w-3 h-3 fill-current" />
            ))}
          </span>
          Loved on the App Store
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-7xl font-extrabold tracking-tighter mb-4 md:mb-6"
        >
          Take iSpotly <span className="gradient-text">everywhere.</span>
        </motion.h2>
        <p className="text-sm md:text-xl text-[color:var(--color-mute)] max-w-2xl mx-auto mb-6 md:mb-10 font-light">
          Pocket the daily challenge. Same packs, same streaks, same XP — synced across every device.
        </p>

        {/* Mobile: stores side-by-side, browser as a thinner row underneath */}
        <div className="flex flex-col sm:hidden items-stretch gap-2 max-w-sm mx-auto px-2">
          <div className="grid grid-cols-2 gap-2">
            <AppStoreButton size="md" fullWidth />
            <GooglePlayButton size="md" fullWidth />
          </div>
          <a
            href="https://ispotly.com/free-play"
            className="inline-flex items-center justify-center gap-2 py-2 rounded-xl border border-white/20 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition"
          >
            <Globe className="w-4 h-4 text-white" />
            <span className="text-sm font-bold text-white">Or play in browser</span>
          </a>
        </div>

        {/* Desktop: full-size buttons */}
        <div className="hidden sm:flex items-center justify-center gap-4">
          <AppStoreButton size="lg" />
          <GooglePlayButton size="lg" />
          <a
            href="https://ispotly.com/free-play"
            className="group inline-flex items-center gap-3 px-7 py-4 rounded-2xl border border-white/20 bg-white/5 backdrop-blur-sm hover:bg-white/10 hover:border-white/40 transition"
          >
            <Globe className="w-7 h-7 text-white" />
            <div className="text-left">
              <div className="text-[11px] uppercase tracking-widest text-white/60">Play in</div>
              <div className="text-lg font-bold text-white">Browser</div>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
