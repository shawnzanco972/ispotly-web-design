"use client";
import { motion } from "framer-motion";
import { Drum, Guitar, Mic2, Piano } from "lucide-react";

const packs = [
  { name: "Classics Mix", url: "https://ispotly.com/pack/1", icon: Mic2, color: "from-pink-500 via-fuchsia-500 to-purple-500" },
  { name: "Millennial Groove", url: "https://ispotly.com/pack/2", icon: Guitar, color: "from-indigo-500 via-violet-500 to-purple-600" },
  { name: "Love is in the Air", url: "https://ispotly.com/pack/3", icon: Piano, color: "from-rose-500 via-pink-500 to-orange-500" },
  { name: "Oldies (but Goldies)", url: "https://ispotly.com/pack/10", icon: Drum, color: "from-amber-500 via-orange-500 to-red-500" },
];

export default function FreePlayPicks() {
  return (
    <section className="relative py-12 md:py-24 bg-[#07060d] overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="inline-block text-orange-400 font-bold tracking-[0.25em] uppercase mb-3 text-xs">Free play picks</span>
            <h3 className="text-3xl md:text-5xl font-extrabold tracking-tighter">Jump straight into a <span className="gradient-text">pack.</span></h3>
          </div>
          <a href="https://ispotly.com/free-play" className="text-sm font-bold text-purple-300 hover:text-white">All free packs →</a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
          {packs.map((p, i) => (
            <motion.a
              key={p.name}
              href={p.url}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -6 }}
              className={`relative rounded-3xl overflow-hidden p-6 aspect-[4/5] flex flex-col justify-between bg-gradient-to-br ${p.color}`}
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.3),transparent_60%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(0,0,0,0.4),transparent_60%)]" />
              <div className="relative w-12 h-12 rounded-2xl bg-black/30 backdrop-blur-sm flex items-center justify-center">
                <p.icon className="w-6 h-6 text-white" />
              </div>
              <div className="relative">
                <div className="text-white/70 text-[10px] uppercase tracking-widest font-bold mb-1">Free Play</div>
                <div className="text-white font-extrabold text-lg leading-tight">{p.name}</div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
