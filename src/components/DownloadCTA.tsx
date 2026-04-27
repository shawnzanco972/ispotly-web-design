"use client";
import { motion } from "framer-motion";
import { Globe, Star } from "lucide-react";
import { AppStoreButton, GooglePlayButton } from "./AppStoreButtons";

const reviews = [
  { quote: "It's challenging but addicting!", author: "App Store · Apr 6", x: "5%", y: "8%", rotate: -6, size: "text-3xl md:text-5xl" },
  { quote: "I can't stop!", author: "App Store · Mar 6", x: "62%", y: "14%", rotate: 4, size: "text-2xl md:text-4xl" },
  { quote: "Such a great addition to our group hangouts!", author: "App Store · Feb 26", x: "8%", y: "62%", rotate: 3, size: "text-xl md:text-3xl" },
  { quote: "I love it really, it's unique and fun!", author: "App Store · Feb 28", x: "55%", y: "70%", rotate: -3, size: "text-2xl md:text-4xl" },
  { quote: "Play all the time. So much fun with friends or alone.", author: "App Store · Mar 6", x: "30%", y: "40%", rotate: 1, size: "text-lg md:text-2xl" },
];

export default function DownloadCTA() {
  return (
    <section id="download" className="relative min-h-screen flex items-center justify-center py-32 bg-[#07060d] overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-purple-600/20 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-orange-500/15 rounded-full blur-[160px] pointer-events-none" />

      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
        {reviews.map((r, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.8 }}
            style={{ left: r.x, top: r.y, transform: `rotate(${r.rotate}deg)` }}
            className="absolute max-w-[280px] md:max-w-[420px]"
          >
            <div className={`font-extrabold text-white/[0.07] leading-tight tracking-tighter ${r.size}`}>
              "{r.quote}"
            </div>
            <div className="mt-1 flex items-center gap-2 text-white/[0.12] text-[10px] md:text-xs uppercase tracking-widest font-bold">
              <span className="flex">
                {Array.from({ length: 5 }).map((_, k) => (
                  <Star key={k} className="w-3 h-3 fill-current" />
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
          className="inline-flex items-center gap-2 px-3 py-1 mb-5 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm text-xs uppercase tracking-widest font-bold text-white/70"
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
          className="text-5xl md:text-7xl font-extrabold tracking-tighter mb-6"
        >
          Take iSpotly <span className="gradient-text">everywhere.</span>
        </motion.h2>
        <p className="text-lg md:text-xl text-[color:var(--color-mute)] max-w-2xl mx-auto mb-12 font-light">
          Pocket the daily challenge. Same packs, same streaks, same XP — synced across every device.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
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
