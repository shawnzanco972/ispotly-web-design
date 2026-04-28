"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";

export type FaqItem = { q: string; a: string };

const DEFAULT_TITLE = "Everything you'd ask anyway.";
const DEFAULT_ITEMS: FaqItem[] = [
  {
    q: "How does iSpotly work?",
    a: "Each round picks a track and splits it into 5 stems — drums, bass, synth, choir, vocal. You hear them one at a time. Guess the song with as few stems and hints as possible to bank max XP.",
  },
  {
    q: "Is the daily game free?",
    a: "Yes. One free daily for everyone, every day, forever. Premium packs unlock the 2,000+ track archive and survival mode.",
  },
  {
    q: "What's a streak?",
    a: "Win the daily on consecutive days and your streak counter ticks up. Miss a day, it resets. Streaks unlock cosmetics and pack discounts.",
  },
  {
    q: "Can I play on desktop?",
    a: "Mobile-first, but the web build at ispotly.com runs fine on desktop too. The native iOS and Android apps are already live on the App Store and Google Play.",
  },
  {
    q: "Where do the stems come from?",
    a: "Original masters, licensed source separation and a lot of taste. Audio is encoded in short clips — never full tracks — to respect rightsholders.",
  },
  {
    q: "Will there be more game modes?",
    a: "Survival, Versus and Live Battles are in the build. Expect drops every few weeks.",
  },
];

export default function FAQ({
  title,
  items,
}: {
  title?: string;
  items?: FaqItem[];
} = {}) {
  const heading = title || DEFAULT_TITLE;
  const list = items && items.length > 0 ? items : DEFAULT_ITEMS;

  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="relative py-32 bg-[#07060d] overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-600/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="container mx-auto px-6 max-w-4xl relative z-10">
        <div className="text-center mb-14">
          <span className="inline-block text-purple-400 font-bold tracking-[0.25em] uppercase mb-4 text-xs">FAQ</span>
          <h2 className="text-4xl md:text-6xl font-extrabold tracking-tighter">
            {(() => {
              const parts = heading.split(" ");
              if (parts.length <= 2) return <span className="gradient-text">{heading}</span>;
              const tail = parts.slice(-2).join(" ");
              const head = parts.slice(0, -2).join(" ");
              return (
                <>
                  {head}{" "}
                  <span className="gradient-text">{tail}</span>
                </>
              );
            })()}
          </h2>
        </div>

        <div className="space-y-3">
          {list.map((f, i) => {
            const isOpen = open === i;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                className="border border-white/10 rounded-2xl bg-white/[0.02] overflow-hidden"
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span className="font-bold text-base md:text-lg">{f.q}</span>
                  <Plus className={`w-5 h-5 text-purple-400 transition-transform ${isOpen ? "rotate-45" : ""}`} />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-6 text-[color:var(--color-mute)] font-light leading-relaxed">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
