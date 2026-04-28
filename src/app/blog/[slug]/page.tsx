import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { posts, getPost } from "@/lib/posts";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Post not found" };
  const seo = post.seo;
  const title = seo?.metaTitle?.trim() || `${post.title} — iSpotly`;
  const description = seo?.metaDescription?.trim() || post.description;
  const ogImage = seo?.ogImage?.trim() || post.cover;
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      authors: [post.author],
      images: ogImage ? [ogImage] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ogImage ? [ogImage] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const others = posts.filter((p) => p.slug !== slug).slice(0, 2);

  const jsonLd = post.seo?.schemaJsonLd?.trim();

  return (
    <main className="relative bg-[#07060d] min-h-screen">
      {jsonLd ? (
        <script
          type="application/ld+json"
          // CMS-managed raw JSON-LD; trust the editor.
          dangerouslySetInnerHTML={{ __html: jsonLd }}
        />
      ) : null}
      <Navbar />

      <article className="relative pt-32 pb-20 px-6">
        <div className="max-w-3xl mx-auto">
          <Link
            href="/#blog"
            className="inline-flex items-center gap-2 text-sm font-bold text-purple-300 hover:text-white mb-8"
          >
            <ArrowLeft className="w-4 h-4" /> Back to blog
          </Link>

          <div className="flex items-center gap-3 mb-6 text-xs uppercase tracking-widest font-bold text-white/50">
            <span className="px-3 py-1 rounded-full bg-purple-500/15 border border-purple-400/30 text-purple-300">
              {post.tag}
            </span>
            <span>{post.date}</span>
            <span>·</span>
            <span>{post.readMin} min read</span>
          </div>

          <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tighter leading-[1.05] mb-6">
            {post.title}
          </h1>

          <p className="text-lg md:text-xl text-[color:var(--color-mute)] mb-10 font-light leading-relaxed">
            {post.description}
          </p>

          <div className={`relative w-full aspect-[16/8] rounded-3xl overflow-hidden border border-white/10 mb-12 bg-gradient-to-br ${post.gradient}`}>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.4),transparent_60%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(0,0,0,0.5),transparent_70%)]" />
          </div>

          <div
            className="prose-ispotly"
            dangerouslySetInnerHTML={{ __html: post.body }}
          />

          <div className="mt-16 p-8 rounded-3xl border border-purple-400/20 bg-gradient-to-br from-purple-500/15 via-fuchsia-500/10 to-orange-500/10 text-center">
            <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-3">
              Ready to put your ears to the test?
            </h3>
            <p className="text-white/70 mb-6">Today's daily is waiting. Five stems. One track. One shot.</p>
            <a
              href="https://ispotly.com/daily"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-purple-500 to-orange-500 text-black font-extrabold hover:scale-[1.03] transition glow-purple"
            >
              Play today's track
            </a>
          </div>
        </div>
      </article>

      {others.length > 0 && (
        <section className="px-6 pb-24">
          <div className="max-w-5xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-8">Keep reading</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {others.map((p) => (
                <Link
                  key={p.slug}
                  href={`/blog/${p.slug}`}
                  className="group relative rounded-3xl overflow-hidden border border-white/10 bg-white/[0.02] flex flex-col"
                >
                  <div className={`relative aspect-[4/3] bg-gradient-to-br ${p.gradient}`}>
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.35),transparent_60%)]" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(0,0,0,0.45),transparent_70%)]" />
                    <div className="absolute inset-0 p-6 flex flex-col justify-between">
                      <span className="self-start px-3 py-1 rounded-full bg-black/40 text-white text-[10px] font-bold uppercase tracking-widest backdrop-blur">
                        {p.tag}
                      </span>
                      <h4 className="text-xl md:text-2xl font-extrabold text-white leading-tight tracking-tight drop-shadow">
                        {p.title}
                      </h4>
                    </div>
                  </div>
                  <div className="px-6 py-4 flex items-center justify-between text-sm">
                    <span className="text-[color:var(--color-mute)]">{p.readMin} min read</span>
                    <ArrowUpRight className="w-5 h-5 text-purple-300 group-hover:rotate-45 transition" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </main>
  );
}
