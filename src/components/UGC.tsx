"use client";
import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X, Instagram, ChevronLeft, ChevronRight } from "lucide-react";

type Video =
  | { id: string; platform: "tiktok"; videoId: string; url: string; tint: string; handle: string }
  | { id: string; platform: "instagram"; shortcode: string; url: string; tint: string; handle: string };

const TIKTOK_HANDLE = "ispotly.com";
const INSTAGRAM_HANDLE = "ispotlygame";

const videos: Video[] = [
  { id: "tt-1", platform: "tiktok", videoId: "7603571668564380936", url: "https://www.tiktok.com/@ispotly.com/video/7603571668564380936", tint: "from-fuchsia-600 via-pink-600 to-rose-500", handle: TIKTOK_HANDLE },
  { id: "tt-2", platform: "tiktok", videoId: "7632054317469469960", url: "https://www.tiktok.com/@ispotly.com/video/7632054317469469960", tint: "from-purple-600 via-violet-600 to-indigo-600", handle: TIKTOK_HANDLE },
  { id: "tt-3", platform: "tiktok", videoId: "7608265736120700167", url: "https://www.tiktok.com/@ispotly.com/video/7608265736120700167", tint: "from-orange-500 via-amber-500 to-yellow-500", handle: TIKTOK_HANDLE },
  { id: "tt-4", platform: "tiktok", videoId: "7629110847318592789", url: "https://www.tiktok.com/@ispotly.com/video/7629110847318592789", tint: "from-cyan-500 via-blue-500 to-indigo-500", handle: TIKTOK_HANDLE },
  { id: "ig-1", platform: "instagram", shortcode: "DVifNnDDBFf", url: "https://www.instagram.com/p/DVifNnDDBFf/", tint: "from-rose-500 via-pink-500 to-purple-500", handle: INSTAGRAM_HANDLE },
];

const TikTokIcon = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
    <path d="M19.6 6.6a5.4 5.4 0 0 1-3.2-1V15a5.6 5.6 0 1 1-5.6-5.6c.3 0 .6 0 .9.1v2.7a3 3 0 1 0 2.1 2.8V2h2.6a5.4 5.4 0 0 0 3.2 4.6v0z" />
  </svg>
);

function VideoCard({ v, onOpen }: { v: Video; onOpen: () => void }) {
  return (
    <button
      onClick={onOpen}
      className={`group relative rounded-3xl overflow-hidden aspect-[9/16] bg-gradient-to-br ${v.tint} text-left w-full`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.35),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(0,0,0,0.55),transparent_50%)]" />

      <div className="absolute top-3 right-3">
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
        @{v.handle}
      </div>
    </button>
  );
}

export default function UGC() {
  const [active, setActive] = useState<Video | null>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: -1 | 1) => {
    const el = sliderRef.current;
    if (!el) return;
    const card = el.querySelector("button");
    const step = (card?.clientWidth ?? 240) + 16;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <>
      <section id="ugc" className="relative py-24 md:py-32 bg-[#07060d] overflow-hidden">
        <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-pink-600/15 rounded-full blur-[160px] pointer-events-none" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-10 md:mb-14">
            <span className="inline-block text-pink-400 font-bold tracking-[0.25em] uppercase mb-3 md:mb-4 text-xs">From the feed</span>
            <h2 className="text-4xl md:text-6xl font-extrabold tracking-tighter mb-3 md:mb-4">
              Hear it. <span className="gradient-text">Guess it.</span> Post it.
            </h2>
            <p className="text-base md:text-lg text-[color:var(--color-mute)] font-light max-w-2xl mx-auto">
              Real plays, real misses, real wins from the iSpotly community. Tap any clip to watch — then go beat it on the daily.
            </p>
          </div>

          {/* Desktop / tablet — grid */}
          <div className="hidden sm:grid grid-cols-3 lg:grid-cols-5 gap-4 md:gap-5">
            {videos.map((v, i) => (
              <motion.div
                key={v.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ y: -6 }}
              >
                <VideoCard v={v} onOpen={() => setActive(v)} />
              </motion.div>
            ))}
          </div>

          {/* Mobile — horizontal slider */}
          <div className="sm:hidden -mx-6">
            <div
              ref={sliderRef}
              className="flex gap-4 overflow-x-auto px-6 pb-4 snap-x snap-mandatory scroll-smooth"
              style={{ scrollbarWidth: "none" }}
            >
              {videos.map((v) => (
                <div key={v.id} className="shrink-0 w-[78%] snap-center">
                  <VideoCard v={v} onOpen={() => setActive(v)} />
                </div>
              ))}
              <div className="shrink-0 w-2" />
            </div>
            <div className="flex items-center justify-center gap-3 mt-4">
              <button
                onClick={() => scroll(-1)}
                aria-label="Previous"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <span className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Swipe</span>
              <button
                onClick={() => scroll(1)}
                aria-label="Next"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
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
