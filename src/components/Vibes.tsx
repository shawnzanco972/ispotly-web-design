"use client";
import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const vibes = [
  { name: "Rap & Hip-Hop", url: "https://ispotly.com/pack/13", color: "from-orange-500 to-red-500" },
  { name: "Classic Rock", url: "https://ispotly.com/pack/11", color: "from-amber-500 to-rose-600" },
  { name: "EDM", url: "https://ispotly.com/pack/25", color: "from-purple-500 to-blue-500" },
  { name: "2020's", url: "https://ispotly.com/pack/4", color: "from-fuchsia-500 to-violet-600" },
  { name: "2010's", url: "https://ispotly.com/pack/5", color: "from-blue-500 to-cyan-500" },
  { name: "2000's", url: "https://ispotly.com/pack/6", color: "from-emerald-500 to-teal-500" },
  { name: "1990's", url: "https://ispotly.com/pack/7", color: "from-pink-500 to-purple-500" },
  { name: "1980's", url: "https://ispotly.com/pack/8", color: "from-rose-500 to-orange-500" },
  { name: "1970's", url: "https://ispotly.com/pack/9", color: "from-yellow-500 to-amber-600" },
];

export default function Vibes() {
  const ref = useRef<HTMLDivElement>(null);

  const scroll = (dir: -1 | 1) => {
    const el = ref.current;
    if (!el) return;
    const card = el.querySelector("a");
    const step = (card?.clientWidth ?? 160) + 16;
    el.scrollBy({ left: dir * step * 3, behavior: "smooth" });
  };

  return (
    <section className="relative py-20 md:py-24 bg-[#07060d] overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex items-end justify-between mb-8 gap-4">
          <div>
            <span className="inline-block text-purple-400 font-bold tracking-[0.25em] uppercase mb-3 text-xs">More vibes</span>
            <h3 className="text-2xl md:text-4xl font-extrabold tracking-tighter">Pick a mood.</h3>
          </div>
          <div className="hidden md:flex items-center gap-2">
            <button onClick={() => scroll(-1)} aria-label="Scroll left" className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center transition">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button onClick={() => scroll(1)} aria-label="Scroll right" className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center transition">
              <ChevronRight className="w-5 h-5" />
            </button>
            <a href="https://ispotly.com/free-play" className="ml-3 text-sm font-bold text-purple-300 hover:text-white">All packs →</a>
          </div>
        </div>
      </div>

      <div
        ref={ref}
        className="flex gap-4 overflow-x-auto px-6 md:px-[max(1.5rem,calc((100vw-1280px)/2+1.5rem))] pb-4 snap-x snap-mandatory scrollbar-none"
        style={{ scrollbarWidth: "none" }}
      >
        {vibes.map((v) => (
          <a
            key={v.name}
            href={v.url}
            className={`shrink-0 w-[150px] md:w-[170px] aspect-square rounded-2xl overflow-hidden p-4 flex flex-col justify-end relative snap-start bg-gradient-to-br ${v.color} hover:scale-[1.03] transition`}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.25),transparent_60%)]" />
            <div className="relative text-white font-extrabold text-sm leading-tight">{v.name}</div>
          </a>
        ))}
        <div className="shrink-0 w-2" />
      </div>
    </section>
  );
}
