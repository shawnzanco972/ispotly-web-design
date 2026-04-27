import { Instagram, Facebook } from "lucide-react";

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

export default function Footer() {
  return (
    <footer className="bg-black pt-24 pb-12 border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://ispotly.com/ispotly_logo_transperant.png"
              alt="iSpotly"
              className="h-10 w-auto mb-6"
            />
            <p className="text-[color:var(--color-mute)] font-light leading-relaxed mb-6">
              The daily song guessing game. Five stems. One track. One shot.
            </p>
            <div className="flex gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:border-purple-400 hover:text-purple-300 transition"
                >
                  <s.Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {[
            { title: "Play", links: [
              { l: "Daily Game", h: "https://ispotly.com/daily" },
              { l: "Free Play", h: "https://ispotly.com/free-play" },
              { l: "Random Play", h: "https://ispotly.com/random-play?from=%2F&gameType=random" },
              { l: "Archive", h: "https://ispotly.com/archive" },
            ]},
            { title: "Packs", links: [
              { l: "Classics Mix", h: "https://ispotly.com/pack/1" },
              { l: "Rap & Hip-Hop", h: "https://ispotly.com/pack/13" },
              { l: "Classic Rock", h: "https://ispotly.com/pack/11" },
              { l: "EDM", h: "https://ispotly.com/pack/25" },
            ]},
            { title: "Studio", links: [
              { l: "Blog", h: "#blog" },
              { l: "Collabs", h: "mailto:hello@ispotly.com" },
              { l: "Contact", h: "mailto:hello@ispotly.com" },
              { l: "Privacy", h: "#" },
            ]},
          ].map((c) => (
            <div key={c.title}>
              <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">{c.title}</h4>
              <ul className="space-y-3">
                {c.links.map((l) => (
                  <li key={l.l}>
                    <a href={l.h} className="text-[color:var(--color-mute)] hover:text-white transition font-light">
                      {l.l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-6 border-t border-white/5 text-[color:var(--color-mute)] text-sm">
          <p>© 2026 iSpotly. All tracks belong to their rightful owners.</p>
          <p>Built for the song hunters.</p>
        </div>
      </div>
    </footer>
  );
}
