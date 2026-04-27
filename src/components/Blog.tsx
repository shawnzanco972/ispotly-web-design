"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { posts } from "@/lib/posts";

export default function Blog() {
  return (
    <section id="blog" className="relative py-32 bg-[#07060d] overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div>
            <span className="inline-block text-orange-400 font-bold tracking-[0.25em] uppercase mb-4 text-xs">Field notes</span>
            <h2 className="text-4xl md:text-6xl font-extrabold tracking-tighter">
              From the <span className="gradient-text">studio.</span>
            </h2>
          </div>
          <Link href="/blog" className="text-sm font-bold text-purple-300 hover:text-white inline-flex items-center gap-2 self-start md:self-auto">
            All posts <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((p, i) => (
            <motion.div
              key={p.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -6 }}
              className="group relative rounded-3xl overflow-hidden border border-white/10 bg-white/[0.02] flex flex-col"
            >
              <Link href={`/blog/${p.slug}`} className="contents">
                <div className={`relative aspect-[4/3] bg-gradient-to-br ${p.grad} overflow-hidden`}>
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.35),transparent_60%)]" />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(0,0,0,0.45),transparent_70%)]" />
                  <div className="absolute inset-0 p-6 flex flex-col justify-between">
                    <span className="self-start px-3 py-1 rounded-full bg-black/40 text-white text-[10px] font-bold uppercase tracking-widest backdrop-blur">
                      {p.tag}
                    </span>
                    <h3 className="text-2xl md:text-3xl font-extrabold text-white leading-tight tracking-tight drop-shadow-lg">
                      {p.title}
                    </h3>
                  </div>
                </div>
                <div className="px-6 py-5 flex items-center justify-between text-sm">
                  <span className="text-[color:var(--color-mute)]">{p.readMin} min read</span>
                  <ArrowUpRight className="w-5 h-5 text-purple-300 group-hover:rotate-45 transition" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
