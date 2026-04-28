// Server-only post loader. NEVER import this from a client component —
// it uses fs/path. The Blog section + per-post pages are server components
// and pass the resulting data down to client components as props.

import "server-only";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";

export type Post = {
  slug: string;
  title: string;
  description: string;
  tag: string;
  readMin: number;
  author: string;
  date: string; // formatted display string
  rawDate: string; // ISO
  gradient: string;
  cover?: string;
  body: string; // rendered HTML
  draft: boolean;
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    ogImage?: string;
    schemaJsonLd?: string;
  };
};

const POSTS_DIR = path.join(process.cwd(), "content/blog");

marked.setOptions({
  gfm: true,
  breaks: false,
});

function fmtDate(iso: string | undefined): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
}

function loadPosts(): Post[] {
  if (!fs.existsSync(POSTS_DIR)) return [];

  const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".md"));
  const items: Post[] = files.map((file) => {
    const raw = fs.readFileSync(path.join(POSTS_DIR, file), "utf-8");
    const { data, content } = matter(raw);
    const slug = (data.slug as string | undefined) ?? file.replace(/\.md$/, "");
    const rawDate = (data.date as string | undefined) ?? "";
    return {
      slug,
      title: (data.title as string) ?? slug,
      description: (data.description as string) ?? "",
      tag: (data.tag as string) ?? "iSpotly",
      readMin: typeof data.readMin === "number" ? data.readMin : Number(data.readMin) || 5,
      author: (data.author as string) ?? "iSpotly studio",
      rawDate,
      date: fmtDate(rawDate),
      gradient: (data.gradient as string) ?? "from-purple-600 via-fuchsia-600 to-pink-500",
      cover: (data.cover as string) || undefined,
      draft: Boolean(data.draft),
      seo: data.seo as Post["seo"],
      body: marked.parse(content, { async: false }) as string,
    };
  });

  return items
    .filter((p) => !p.draft)
    .sort((a, b) => (b.rawDate || "").localeCompare(a.rawDate || ""));
}

export const posts: Post[] = loadPosts();
export const getPost = (slug: string) => posts.find((p) => p.slug === slug);
