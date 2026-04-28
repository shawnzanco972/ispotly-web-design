import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { posts } from "@/lib/posts";
import { ArrowUpRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog — iSpotly",
  description:
    "Field notes from the iSpotly studio: ear training, viral pop culture trends and the future of music trivia in 2026.",
};

export default function BlogIndexPage() {
  return (
    <main className="relative bg-[#07060d] min-h-screen">
      <Navbar />

      <section className="relative pt-32 pb-12 md:pb-20 px-6">
        <div className="max-w-5xl mx-auto">
          <span className="inline-block text-orange-400 font-bold tracking-[0.25em] uppercase mb-4 text-xs">Field notes</span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tighter leading-[1.05] mb-4">
            From the <span className="gradient-text">studio.</span>
          </h1>
          <p className="text-lg md:text-xl text-[color:var(--color-mute)] max-w-2xl font-light">
            Notes on ear training, viral hits, and what makes a music trivia game worth your time.
          </p>
        </div>
      </section>

      <section className="px-6 pb-32">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {posts.map((p, i) => (
            <Link
              key={p.slug}
              href={`/blog/${p.slug}`}
              className={`group relative rounded-3xl overflow-hidden border border-white/10 bg-white/[0.02] flex flex-col ${i === 0 ? "md:col-span-2" : ""}`}
            >
              <div className={`relative ${i === 0 ? "aspect-[16/8]" : "aspect-[4/3]"} bg-gradient-to-br ${p.grad} overflow-hidden`}>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.35),transparent_60%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(0,0,0,0.45),transparent_70%)]" />
                <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-between">
                  <span className="self-start px-3 py-1 rounded-full bg-black/40 text-white text-[10px] font-bold uppercase tracking-widest backdrop-blur">
                    {p.tag}
                  </span>
                  <h2 className={`font-extrabold text-white leading-tight tracking-tight drop-shadow-lg ${i === 0 ? "text-3xl md:text-5xl" : "text-2xl md:text-3xl"}`}>
                    {p.title}
                  </h2>
                </div>
              </div>
              <div className="px-6 py-5 flex items-center justify-between text-sm">
                <div className="flex items-center gap-3 text-[color:var(--color-mute)]">
                  <span>{p.date}</span>
                  <span>·</span>
                  <span>{p.readMin} min read</span>
                </div>
                <ArrowUpRight className="w-5 h-5 text-purple-300 group-hover:rotate-45 transition" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
