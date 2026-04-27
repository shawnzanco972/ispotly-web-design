"use client";
import { motion } from "framer-motion";
import { Crown, ChevronLeft, ChevronRight } from "lucide-react";

type Day = { d: number; status: "won" | "lost" | "unfinished" | "today" | "future" | "empty" };

const days: Day[] = [
  ...Array.from({ length: 4 }, () => ({ d: 0, status: "empty" as const })),
  ...[1, 2, 3, 4].map((d) => ({ d, status: "future" as const })),
  ...[5, 6, 7, 8, 9, 10, 11].map((d) => ({ d, status: "future" as const })),
  ...[12].map((d) => ({ d, status: "future" as const })),
  ...[13, 14, 15, 16, 17, 18].map((d) => ({ d, status: "won" as const })),
  { d: 19, status: "won" },
  ...[20, 21, 22, 23, 24, 25].map((d) => ({ d, status: "lost" as const })),
  { d: 26, status: "unfinished" },
  { d: 27, status: "today" },
  ...[28, 29, 30].map((d) => ({ d, status: "future" as const })),
];

const dot = (s: Day["status"]) => {
  if (s === "won") return "bg-emerald-400";
  if (s === "lost") return "bg-rose-400";
  if (s === "unfinished") return "bg-amber-400";
  if (s === "today") return "ring-2 ring-purple-400";
  return "";
};

export default function Archive() {
  return (
    <section id="archive" className="relative py-16 md:py-32 bg-gradient-to-b from-[#07060d] via-[#0d0a1a] to-[#07060d] overflow-hidden">
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-purple-700/15 rounded-full blur-[180px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          <div>
            <span className="inline-block text-orange-400 font-bold tracking-[0.25em] uppercase mb-3 md:mb-4 text-xs">The archive</span>
            <h2 className="text-3xl md:text-6xl font-extrabold tracking-tighter mb-4 md:mb-6">
              Miss a daily? <br />
              <span className="gradient-text">Catch up. Crown up.</span>
            </h2>
            <p className="text-base md:text-lg text-[color:var(--color-mute)] mb-6 md:mb-8 font-light leading-relaxed">
              Every track, every day, since launch. Replay missed dailies, hunt streaks, beat your past self.
            </p>
            <div className="grid grid-cols-4 gap-1.5 md:flex md:flex-wrap md:gap-3 text-[10px] md:text-sm">
              <span className="flex items-center justify-center gap-1.5 md:gap-2 px-2 py-1.5 md:px-4 md:py-2 rounded-full bg-white/5 border border-white/10 font-semibold uppercase tracking-wider md:tracking-normal md:normal-case">
                <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-emerald-400" /> Won
              </span>
              <span className="flex items-center justify-center gap-1.5 md:gap-2 px-2 py-1.5 md:px-4 md:py-2 rounded-full bg-white/5 border border-white/10 font-semibold uppercase tracking-wider md:tracking-normal md:normal-case">
                <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-rose-400" /> Lost
              </span>
              <span className="flex items-center justify-center gap-1.5 md:gap-2 px-2 py-1.5 md:px-4 md:py-2 rounded-full bg-white/5 border border-white/10 font-semibold uppercase tracking-wider md:tracking-normal md:normal-case">
                <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-amber-400" /> Open
              </span>
              <span className="flex items-center justify-center gap-1.5 md:gap-2 px-2 py-1.5 md:px-4 md:py-2 rounded-full bg-white/5 border border-white/10 font-semibold uppercase tracking-wider md:tracking-normal md:normal-case">
                <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full ring-2 ring-purple-400" /> Today
              </span>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative rounded-[28px] md:rounded-[32px] bg-[#11102a] border border-white/10 p-5 md:p-8 backdrop-blur-xl"
          >
            <div className="flex items-center justify-between mb-6">
              <button className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <h3 className="text-2xl font-extrabold">April 2026</h3>
              <button className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-7 gap-2 text-center text-xs uppercase tracking-widest text-purple-300/70 font-bold mb-3">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
                <div key={d}>{d}</div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-2">
              {days.map((day, i) => {
                const dateStr = `2026-04-${String(day.d).padStart(2, "0")}`;
                const href =
                  day.status === "today"
                    ? "https://ispotly.com/daily"
                    : day.status === "future" || day.status === "empty"
                    ? undefined
                    : `https://ispotly.com/archive/${dateStr}`;
                const crownColor =
                  day.status === "won" ? "text-emerald-400" : day.status === "lost" ? "text-rose-400" : "text-amber-400";
                const showCrown = day.status === "won" || day.status === "lost" || day.status === "unfinished";
                const inner = (
                  <>
                    {showCrown && (
                      <Crown className={`w-3 h-3 mb-0.5 ${crownColor}`} />
                    )}
                    <div className={`w-8 h-8 md:w-9 md:h-9 rounded-xl flex items-center justify-center font-bold text-xs md:text-sm transition ${day.status === "today" ? "ring-2 ring-purple-400 text-purple-300" : day.status === "future" ? "text-white/30" : "text-white"} ${day.status === "won" ? "bg-emerald-500/15" : day.status === "lost" ? "bg-rose-500/10" : day.status === "unfinished" ? "bg-amber-500/10" : ""} ${href ? "group-hover:scale-110" : ""}`}>
                      {day.d}
                    </div>
                  </>
                );
                return (
                  <div key={i} className="aspect-square flex flex-col items-center justify-center relative">
                    {day.status === "empty" ? null : href ? (
                      <a href={href} className="group flex flex-col items-center justify-center relative w-full h-full">{inner}</a>
                    ) : (
                      <div className="flex flex-col items-center justify-center relative w-full h-full">{inner}</div>
                    )}
                  </div>
                );
              })}
            </div>

            <a href="https://ispotly.com/daily" className="mt-6 md:mt-8 block w-full text-center px-6 py-3.5 md:py-4 rounded-2xl bg-purple-500 text-white font-extrabold hover:bg-purple-400 transition glow-purple">
              Play today's track
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
