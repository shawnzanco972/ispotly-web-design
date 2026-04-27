"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const links = [
  { label: "Play online", href: "https://ispotly.com/daily", external: true },
  { label: "Archive", href: "#archive" },
  { label: "Feed", href: "#ugc" },
  { label: "Blog", href: "#blog" },
  { label: "FAQ", href: "#faq" },
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
        <div className={`flex items-center justify-between ${scrolled ? "px-6 py-3" : "max-w-7xl mx-auto"}`}>
          <a href="#" className="flex items-center gap-2 group">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://ispotly.com/ispotly_logo_transperant.png"
              alt="iSpotly"
              className={`transition-all ${scrolled ? "h-8" : "h-10"} w-auto group-hover:scale-105`}
            />
          </a>

          <div className="hidden md:flex items-center gap-8">
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
              href="#download"
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
                href="#download"
                onClick={() => setOpen(false)}
                className="mt-4 px-10 py-4 bg-gradient-to-r from-purple-500 to-orange-500 text-black font-bold text-lg rounded-full"
              >
                Download Now
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
