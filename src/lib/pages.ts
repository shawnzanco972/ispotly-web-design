// Server-only loader for editable page content (Hero, FAQ, etc).
// Defaults are baked in so the site keeps working even if the CMS file
// for that page doesn't exist yet.

import "server-only";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

const PAGES_DIR = path.join(process.cwd(), "content/pages");

function readMdFront<T extends Record<string, unknown>>(file: string, defaults: T): T {
  const full = path.join(PAGES_DIR, file);
  if (!fs.existsSync(full)) return defaults;
  try {
    const raw = fs.readFileSync(full, "utf-8");
    const { data } = matter(raw);
    return { ...defaults, ...(data as Partial<T>) };
  } catch {
    return defaults;
  }
}

// ---------- Home / Hero ----------
export type HomeContent = {
  heroBadge: string;
  heroLine1: string;
  heroLine2: string;
  heroLine3: string;
  heroSubtitle: string;
  ctaPrimary: string;
  ctaPrimaryUrl: string;
  ctaSecondary: string;
  ctaSecondaryUrl: string;
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    ogImage?: string;
    schemaJsonLd?: string;
  };
};

export const HOME_DEFAULTS: HomeContent = {
  heroBadge: "Daily song challenge",
  heroLine1: "GUESS",
  heroLine2: "THE SONG.",
  heroLine3: "BEAT THE DAILY.",
  heroSubtitle:
    "One track. Five instruments. Five minutes of hints. Strip it back to the drums, bass and synth — name the song before the timer does.",
  ctaPrimary: "Play Today's Track",
  ctaPrimaryUrl: "https://ispotly.com/daily",
  ctaSecondary: "See past dailies",
  ctaSecondaryUrl: "https://ispotly.com/archive",
};

export function getHome(): HomeContent {
  return readMdFront<HomeContent>("home.md", HOME_DEFAULTS);
}

// ---------- FAQ ----------
export type FaqItem = { q: string; a: string };
export type FaqContent = {
  title: string;
  items: FaqItem[];
  seo?: HomeContent["seo"];
};

export const FAQ_DEFAULTS: FaqContent = {
  title: "Everything you'd ask anyway.",
  items: [
    {
      q: "How does iSpotly work?",
      a: "Each round picks a track and splits it into 5 stems — drums, bass, synth, choir, vocal. You hear them one at a time. Guess the song with as few stems and hints as possible to bank max XP.",
    },
    {
      q: "Is the daily game free?",
      a: "Yes. One free daily for everyone, every day, forever. Premium packs unlock the 2,000+ track archive and survival mode.",
    },
    {
      q: "What's a streak?",
      a: "Win the daily on consecutive days and your streak counter ticks up. Miss a day, it resets. Streaks unlock cosmetics and pack discounts.",
    },
    {
      q: "Can I play on desktop?",
      a: "Mobile-first, but the web build at ispotly.com runs fine on desktop too. The native iOS and Android apps are already live on the App Store and Google Play.",
    },
    {
      q: "Where do the stems come from?",
      a: "Original masters, licensed source separation and a lot of taste. Audio is encoded in short clips — never full tracks — to respect rightsholders.",
    },
    {
      q: "Will there be more game modes?",
      a: "Survival, Versus and Live Battles are in the build. Expect drops every few weeks.",
    },
  ],
};

export function getFaq(): FaqContent {
  const data = readMdFront<FaqContent>("faq.md", FAQ_DEFAULTS);
  if (!data.items || data.items.length === 0) data.items = FAQ_DEFAULTS.items;
  return data;
}

// ---------- Blog index page ----------
export type BlogIndexContent = {
  title: string;
  subtitle: string;
  seo?: HomeContent["seo"];
};

export const BLOG_INDEX_DEFAULTS: BlogIndexContent = {
  title: "From the studio.",
  subtitle: "Notes on stems, song-guessing strategy and the music we can't stop listening to.",
};

export function getBlogIndex(): BlogIndexContent {
  return readMdFront<BlogIndexContent>("blog-index.md", BLOG_INDEX_DEFAULTS);
}
