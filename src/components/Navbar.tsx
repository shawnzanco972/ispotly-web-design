"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Instagram, Facebook } from "lucide-react";

const TikTokIcon = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
    <path d="M19.6 6.6a5.4 5.4 0 0 1-3.2-1V15a5.6 5.6 0 1 1-5.6-5.6c.3 0 .6 0 .9.1v2.7a3 3 0 1 0 2.1 2.8V2h2.6a5.4 5.4 0 0 0 3.2 4.6v0z" />
  </svg>
);

const socials = [
  { Icon: TikTokIcon, href: "https://www.tiktok.com/@ispotly.com", label: "TikTok" },
  { Icon: Instagram, href: "https://www.instagram.com/ispotlygame/", label: "Instagram" },
  { Icon: Facebook, href: "https://www.facebook.com/profile.php?id=61579447937518", label: "Facebook" },
];

const links = [
  { label: "Play online", href: "https://ispotly.com/daily", external: true },
  { label: "Archive", href: "/#archive" },
  { label: "Feed", href: "/#ugc" },
  { label: "Blog", href: "/blog" },
  { label: "FAQ", href: "/#faq" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "top-4 mx-4 md:mx-auto md:max-w-5xl rounded-full bg-black/70 backdrop-blur-xl border border-white/10"
            : "top-0 px-6 py-5 bg-transparent"
        }`}
      >
        <div className={`relative flex items-center justify-between ${scrolled ? "px-5 py-3" : "max-w-7xl mx-auto"}`}>
          <Link href="/" className="flex items-center gap-2 group shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://ispotly.com/ispotly_logo_transperant.png"
              alt="iSpotly"
              className={`transition-all ${scrolled ? "h-8" : "h-10"} w-auto group-hover:scale-105`}
            />
            <span className={`hidden sm:inline font-extrabold tracking-tight text-white transition-all ${scrolled ? "text-base" : "text-xl"}`}>
              iSpotly
            </span>
          </Link>

          {/* center wordmark / game tag — only when scrolled */}
          {scrolled && (
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:flex items-center gap-2 pointer-events-none">
              <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/50">The daily song game</span>
            </div>
          )}

          <div className="hidden md:flex items-center gap-7">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                {...(l.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="text-sm font-medium text-[color:var(--color-mute)] hover:text-white transition-colors relative group"
              >
                {l.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-400 transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
            <a
              href="/#download"
              className={`bg-gradient-to-r from-purple-500 to-orange-500 text-black font-bold text-sm rounded-full hover:scale-105 transition-all active:scale-95 ${scrolled ? "px-4 py-2" : "px-6 py-2.5"}`}
            >
              Download Now
            </a>
          </div>

          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-white p-2 relative z-50"
            aria-label="Toggle menu"
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col items-center justify-center h-full gap-8 px-6">
              {links.map((l, i) => (
                <motion.a
                  key={l.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  href={l.href}
                  {...(l.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  onClick={() => setOpen(false)}
                  className="text-3xl font-bold text-white hover:text-purple-400 transition-colors"
                >
                  {l.label}
                </motion.a>
              ))}
              <a
                href="/#download"
                onClick={() => setOpen(false)}
                className="mt-4 px-10 py-4 bg-gradient-to-r from-purple-500 to-orange-500 text-black font-bold text-lg rounded-full"
              >
                Download Now
              </a>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="mt-8 flex items-center gap-4"
              >
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    onClick={() => setOpen(false)}
                    className="w-12 h-12 rounded-full border border-white/15 flex items-center justify-center text-white hover:border-purple-400 hover:text-purple-300 transition"
                  >
                    <s.Icon className="w-5 h-5" />
                  </a>
                ))}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
