"use client";
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronDown, Music, Youtube } from "lucide-react";

const GENRES = [
  "Pop",
  "Rock",
  "Dance & Electro",
  "Indie & Alternative",
  "Soul & R&B",
  "Soft & Pop Rock",
  "Latin",
  "Hip-Hop & Rap",
  "Hard Rock & Punk",
  "House & Techno",
  "Country & Folk",
  "Reggae & Afro",
  "Jazz & Blues",
  "South Asian",
];
const YEARS = ["1960s", "1970s", "1980s", "1990s", "2000s", "2010s", "2020s"];
const POPULARITY = [
  { label: "Viral", note: "+500M views" },
  { label: "Popular", note: "500M–100M" },
  { label: "Rising", note: "100M–10M" },
  { label: "Underground", note: "<10M" },
];
const LANGUAGES = [
  { label: "English", code: "GB" },
  { label: "Spanish", code: "ES" },
  { label: "French", code: "FR" },
  { label: "Portuguese", code: "BR" },
  { label: "Korean", code: "KR" },
  { label: "Italian", code: "IT" },
  { label: "German", code: "DE" },
  { label: "Hebrew", code: "IL" },
];

const slug = (s: string) =>
  s
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

type Props = { open: boolean; onClose: () => void };

export default function RandomPlayModal({ open, onClose }: Props) {
  const [genres, setGenres] = useState<string[]>([...GENRES]);
  const [yearFrom, setYearFrom] = useState("1960s");
  const [yearTo, setYearTo] = useState("2020s");
  const [popularity, setPopularity] = useState<string[]>(POPULARITY.map((p) => p.label));
  const [languages, setLanguages] = useState<string[]>(LANGUAGES.map((l) => l.code));
  const [openSection, setOpenSection] = useState<string | null>(null);

  const possible = useMemo(() => {
    const base = 2000;
    const factor =
      (genres.length / GENRES.length) *
      (popularity.length / POPULARITY.length) *
      (languages.length / LANGUAGES.length);
    const yearSpan =
      (YEARS.indexOf(yearTo) - YEARS.indexOf(yearFrom) + 1) / YEARS.length;
    return Math.max(50, Math.round(base * factor * Math.max(yearSpan, 0.1)));
  }, [genres, popularity, languages, yearFrom, yearTo]);

  const url = useMemo(() => {
    const p = new URLSearchParams();
    p.set("from", "/");
    p.set("gameType", "random");
    if (genres.length && genres.length < GENRES.length) p.set("genres", genres.map(slug).join(","));
    p.set("yearFrom", yearFrom.replace("s", ""));
    p.set("yearTo", yearTo.replace("s", ""));
    if (popularity.length && popularity.length < POPULARITY.length)
      p.set("popularity", popularity.map((s) => s.toLowerCase()).join(","));
    if (languages.length && languages.length < LANGUAGES.length)
      p.set("languages", languages.join(",").toLowerCase());
    return `https://ispotly.com/random-play?${p.toString()}`;
  }, [genres, yearFrom, yearTo, popularity, languages]);

  const toggle = (arr: string[], setter: (v: string[]) => void, val: string) =>
    setter(arr.includes(val) ? arr.filter((x) => x !== val) : [...arr, val]);

  const Section = ({
    id,
    label,
    summary,
    icon,
    children,
  }: {
    id: string;
    label: string;
    summary: string;
    icon?: React.ReactNode;
    children: React.ReactNode;
  }) => {
    const isOpen = openSection === id;
    return (
      <div>
        <div className="text-[11px] uppercase tracking-[0.25em] text-white/40 font-bold mb-2">{label}</div>
        <button
          type="button"
          onClick={() => setOpenSection(isOpen ? null : id)}
          className="w-full flex items-center justify-between gap-3 px-5 py-4 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-white/20 transition text-left"
        >
          <div className="flex items-center gap-3 min-w-0">
            {icon}
            <span className="font-bold truncate">{summary}</span>
          </div>
          <ChevronDown className={`w-5 h-5 text-white/60 transition ${isOpen ? "rotate-180" : ""}`} />
        </button>
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="pt-3">{children}</div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-black/70 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: 30, opacity: 0, scale: 0.96 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 30, opacity: 0, scale: 0.96 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md max-h-[90vh] overflow-y-auto rounded-3xl border border-white/10 bg-[#0d0a1a] p-6"
          >
            {/*
              Daily play count ("X/3 today") and the live catalog size are user/app data.
              Once Google sign-in is wired through the iSpotly app API, fetch them from:
                GET /api/me/quota   -> { used, limit }
                GET /api/catalog/count?<filters>  -> { total }
              Until then we keep the UI clean rather than show fake numbers.
            */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <h3 className="text-2xl font-extrabold tracking-tight">Random Song</h3>
              </div>
              <button onClick={onClose} className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-5">
              <Section
                id="genres"
                label="Genres"
                summary={
                  genres.length === GENRES.length
                    ? "All genres"
                    : genres.length === 0
                    ? "None selected"
                    : `${genres[0]}${genres.length > 1 ? ` · +${genres.length - 1} more` : ""}`
                }
              >
                <div className="flex flex-wrap gap-2">
                  {GENRES.map((g) => {
                    const on = genres.includes(g);
                    return (
                      <button
                        key={g}
                        type="button"
                        onClick={() => toggle(genres, setGenres, g)}
                        className={`px-3 py-1.5 rounded-full text-sm font-medium border transition ${
                          on
                            ? "bg-purple-500/20 border-purple-400/60 text-white"
                            : "bg-white/[0.02] border-white/10 text-white/60 hover:text-white"
                        }`}
                      >
                        {g}
                      </button>
                    );
                  })}
                </div>
              </Section>

              <div>
                <div className="text-[11px] uppercase tracking-[0.25em] text-white/40 font-bold mb-2">Years</div>
                <div className="grid grid-cols-2 gap-3 items-center">
                  <div>
                    <div className="text-[10px] uppercase tracking-widest text-white/40 mb-1">From</div>
                    <select
                      value={yearFrom}
                      onChange={(e) => setYearFrom(e.target.value)}
                      className="w-full px-4 py-3 rounded-2xl bg-white/[0.04] border border-white/10 font-bold appearance-none"
                    >
                      {YEARS.map((y) => (
                        <option key={y} value={y} className="bg-[#0d0a1a]">{y}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-widest text-white/40 mb-1">To</div>
                    <select
                      value={yearTo}
                      onChange={(e) => setYearTo(e.target.value)}
                      className="w-full px-4 py-3 rounded-2xl bg-white/[0.04] border border-white/10 font-bold appearance-none"
                    >
                      {YEARS.map((y) => (
                        <option key={y} value={y} className="bg-[#0d0a1a]">{y}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <Section
                id="pop"
                label="YouTube popularity"
                icon={<Youtube className="w-5 h-5 text-rose-500" />}
                summary={`${popularity.length} tier${popularity.length === 1 ? "" : "s"} selected`}
              >
                <div className="space-y-2">
                  {POPULARITY.map((p) => {
                    const on = popularity.includes(p.label);
                    return (
                      <button
                        key={p.label}
                        type="button"
                        onClick={() => toggle(popularity, setPopularity, p.label)}
                        className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl border transition ${
                          on
                            ? "bg-purple-500/15 border-purple-400/50"
                            : "bg-white/[0.02] border-white/10"
                        }`}
                      >
                        <div className="text-left">
                          <div className="font-bold">{p.label}</div>
                          <div className="text-xs text-white/50">{p.note}</div>
                        </div>
                        <span className={`w-5 h-5 rounded-md border flex items-center justify-center ${on ? "bg-purple-400 border-purple-400" : "border-white/30"}`}>
                          {on && <span className="text-black text-xs font-black">✓</span>}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </Section>

              <Section
                id="lang"
                label="Language"
                summary={`${languages.join(" ")} (${languages.length})`}
              >
                <div className="flex flex-wrap gap-2">
                  {LANGUAGES.map((l) => {
                    const on = languages.includes(l.code);
                    return (
                      <button
                        key={l.code}
                        type="button"
                        onClick={() => toggle(languages, setLanguages, l.code)}
                        className={`px-3 py-1.5 rounded-full text-sm font-medium border transition ${
                          on
                            ? "bg-orange-500/20 border-orange-400/60 text-white"
                            : "bg-white/[0.02] border-white/10 text-white/60"
                        }`}
                      >
                        {l.code} · {l.label}
                      </button>
                    );
                  })}
                </div>
              </Section>

              <div className="flex items-center justify-center gap-2 pt-2">
                <Music className="w-4 h-4 text-white/50" />
                <span className="px-3 py-1 rounded-full bg-white/5 font-bold">{possible.toLocaleString()}</span>
                <span className="text-white/50 text-sm">possible songs</span>
              </div>

              <a
                href={url}
                className="block text-center px-6 py-4 rounded-2xl bg-gradient-to-r from-orange-400 to-amber-500 text-white font-extrabold text-lg glow-orange hover:scale-[1.02] transition"
              >
                Play Now!
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
