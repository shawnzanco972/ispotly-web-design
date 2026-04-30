"use client";
import { motion } from "framer-motion";
import { Sparkles, Mail, ArrowUpRight } from "lucide-react";

export default function Collab() {
  return (
    <section className="relative py-12 md:py-28 bg-[#07060d] overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-[36px] overflow-hidden p-10 md:p-16 border border-white/10 bg-gradient-to-br from-purple-700/30 via-pink-600/15 to-orange-500/20"
        >
          <div className="absolute -top-20 -right-20 w-[400px] h-[400px] bg-pink-500/30 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute -bottom-32 -left-20 w-[400px] h-[400px] bg-purple-500/30 rounded-full blur-[120px] pointer-events-none" />

          <div className="relative grid grid-cols-1 md:grid-cols-5 gap-10 items-center">
            <div className="md:col-span-3">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur text-white text-xs font-bold uppercase tracking-widest mb-5">
                <Sparkles className="w-3 h-3" /> Open for collabs
              </span>
              <h2 className="text-4xl md:text-5xl font-extrabold tracking-tighter mb-4 leading-[1.05]">
                Creator, label, brand? <br />
                <span className="gradient-text">Let's make noise.</span>
              </h2>
              <p className="text-base md:text-lg text-white/70 max-w-xl font-light">
                Custom packs, sponsored dailies, integrations, content swaps — pitch us anything that sounds like fun. We reply to every email.
              </p>
            </div>

            <div className="md:col-span-2 flex flex-col gap-3">
              <a
                href="mailto:hello@ispotly.com?subject=Collab%20with%20iSpotly"
                className="group inline-flex items-center justify-between gap-4 px-6 py-4 rounded-2xl bg-white text-black font-extrabold hover:scale-[1.02] transition"
              >
                <span className="flex items-center gap-3">
                  <Mail className="w-5 h-5" />
                  hello@ispotly.com
                </span>
                <ArrowUpRight className="w-5 h-5 group-hover:rotate-45 transition" />
              </a>
              <a
                href="https://www.tiktok.com/@ispotly.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-between gap-4 px-6 py-4 rounded-2xl border border-white/15 text-white font-bold hover:bg-white/5 transition"
              >
                <span>DM us on TikTok</span>
                <ArrowUpRight className="w-5 h-5 group-hover:rotate-45 transition" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
