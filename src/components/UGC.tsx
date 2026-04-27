"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X, Instagram } from "lucide-react";

type Video =
  | { id: string; platform: "tiktok"; videoId: string; url: string; tint: string; tag: string }
  | { id: string; platform: "instagram"; shortcode: string; url: string; tint: string; tag: string };

const videos: Video[] = [
  { id: "tt-1", platform: "tiktok", videoId: "7603571668564380936", url: "https://www.tiktok.com/@ispotly.com/video/7603571668564380936", tint: "from-fuchsia-600 via-pink-600 to-rose-500", tag: "Daily reveal" },
  { id: "tt-2", platform: "tiktok", videoId: "7632054317469469960", url: "https://www.tiktok.com/@ispotly.com/video/7632054317469469960", tint: "from-purple-600 via-violet-600 to-indigo-600", tag: "Streak run" },
  { id: "tt-3", platform: "tiktok", videoId: "7608265736120700167", url: "https://www.tiktok.com/@ispotly.com/video/7608265736120700167", tint: "from-orange-500 via-amber-500 to-yellow-500", tag: "First try" },
  { id: "tt-4", platform: "tiktok", videoId: "7629110847318592789", url: "https://www.tiktok.com/@ispotly.com/video/7629110847318592789", tint: "from-cyan-500 via-blue-500 to-indigo-500", tag: "Stem reveal" },
  { id: "ig-1", platform: "instagram", shortcode: "DVifNnDDBFf", url: "https://www.instagram.com/p/DVifNnDDBFf/", tint: "from-rose-500 via-pink-500 to-purple-500", tag: "From the gram" },
];

const TikTokIcon = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
    <path d="M19.6 6.6a5.4 5.4 0 0 1-3.2-1V15a5.6 5.6 0 1 1-5.6-5.6c.3 0 .6 0 .9.1v2.7a3 3 0 1 0 2.1 2.8V2h2.6a5.4 5.4 0 0 0 3.2 4.6v0z" />
  </svg>
);

export default function UGC() {
  const [active, setActive] = useState<Video | null>(null);

  return (
    <>
      <section id="ugc" className="relative py-32 bg-[#07060d] overflow-hidden">
        <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-pink-600/15 rounded-full blur-[160px] pointer-events-none" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-14">
            <span className="inline-block text-pink-400 font-bold tracking-[0.25em] uppercase mb-4 text-xs">From the feed</span>
            <h2 className="text-4xl md:text-6xl font-extrabold tracking-tighter">
              <span className="gradient-text">Watch the misses.</span> Then beat them.
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-5">
            {videos.map((v, i) => (
              <motion.button
                key={v.id}
                onClick={() => setActive(v)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ y: -6 }}
                className={`group relative rounded-3xl overflow-hidden aspect-[9/16] bg-gradient-to-br ${v.tint} text-left`}
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.35),transparent_60%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(0,0,0,0.55),transparent_50%)]" />

                <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-full bg-black/40 backdrop-blur text-white text-[10px] font-bold uppercase tracking-widest">
                    {v.tag}
                  </span>
                  <span className="w-8 h-8 rounded-full bg-black/40 backdrop-blur flex items-center justify-center text-white">
                    {v.platform === "tiktok" ? <TikTokIcon className="w-4 h-4" /> : <Instagram className="w-4 h-4" />}
                  </span>
                </div>

                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="w-14 h-14 rounded-full bg-white/95 backdrop-blur-sm flex items-center justify-center text-black shadow-[0_0_30px_rgba(255,255,255,0.4)] group-hover:scale-110 transition">
                    <Play className="w-6 h-6 ml-0.5 fill-current" />
                  </span>
                </div>

                <div className="absolute bottom-3 left-3 right-3 text-white text-xs font-bold">
                  @ispotly.com
                </div>
              </motion.button>
            ))}
          </div>

          <p className="mt-8 text-center text-sm text-[color:var(--color-mute)]">
            Tap a clip to watch it inline · One plays at a time
          </p>
        </div>
      </section>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-black/85 backdrop-blur-sm"
          >
            <motion.div
              key={active.id}
              initial={{ y: 30, scale: 0.96, opacity: 0 }}
              animate={{ y: 0, scale: 1, opacity: 1 }}
              exit={{ y: 30, scale: 0.96, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-[420px] aspect-[9/16] rounded-3xl overflow-hidden border border-white/10 bg-black"
            >
              <button
                onClick={() => setActive(null)}
                className="absolute -top-3 -right-3 z-10 w-10 h-10 rounded-full bg-white text-black flex items-center justify-center shadow-lg hover:scale-105 transition"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>

              {active.platform === "tiktok" ? (
                <iframe
                  key={active.id}
                  src={`https://www.tiktok.com/embed/v2/${active.videoId}?lang=en`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              ) : (
                <iframe
                  key={active.id}
                  src={`https://www.instagram.com/p/${active.shortcode}/embed`}
                  allow="autoplay; encrypted-media; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              )}

              <a
                href={active.url}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-3 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-black/70 backdrop-blur text-white text-xs font-bold border border-white/20 hover:bg-black"
              >
                Open on {active.platform === "tiktok" ? "TikTok" : "Instagram"} ↗
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
