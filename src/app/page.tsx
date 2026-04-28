import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Reveal from "@/components/Reveal";
import QuickPlay from "@/components/QuickPlay";
import FreePlayPicks from "@/components/FreePlayPicks";
import Archive from "@/components/Archive";
import Vibes from "@/components/Vibes";
import UGC from "@/components/UGC";
import Collab from "@/components/Collab";
import DownloadCTA from "@/components/DownloadCTA";
import FAQ from "@/components/FAQ";
import Blog from "@/components/Blog";
import Footer from "@/components/Footer";
import { getHome, getFaq } from "@/lib/pages";

export default function Home() {
  const home = getHome();
  const faq = getFaq();
  const jsonLd = home.seo?.schemaJsonLd?.trim();

  return (
    <main className="relative">
      {jsonLd ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd }}
        />
      ) : null}
      <Navbar />
      <Hero content={home} />
      <Reveal />
      <QuickPlay />
      <FreePlayPicks />
      <Archive />
      <Vibes />
      <UGC />
      <Collab />
      <DownloadCTA />
      <FAQ title={faq.title} items={faq.items} />
      <Blog />
      <Footer />
    </main>
  );
}
