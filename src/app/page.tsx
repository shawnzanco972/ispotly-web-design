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

export default function Home() {
  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <Reveal />
      <QuickPlay />
      <FreePlayPicks />
      <Archive />
      <Vibes />
      <UGC />
      <Collab />
      <DownloadCTA />
      <FAQ />
      <Blog />
      <Footer />
    </main>
  );
}
