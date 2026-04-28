"use client";

const APPLE_URL = "https://apps.apple.com/us/app/ispotly-guess-the-song/id6759221584";
const GOOGLE_URL = "https://play.google.com/store/apps/details?id=com.ispotly.app";

const sizes = {
  sm: { px: "px-4", py: "py-2.5", icon: "w-5 h-5", top: "text-[9px]", main: "text-sm" },
  md: { px: "px-5", py: "py-3", icon: "w-6 h-6", top: "text-[10px]", main: "text-base" },
  lg: { px: "px-7", py: "py-4", icon: "w-7 h-7", top: "text-[11px]", main: "text-lg" },
};

type Size = keyof typeof sizes;

export function AppStoreButton({ size = "md", fullWidth }: { size?: Size; fullWidth?: boolean }) {
  const s = sizes[size];
  return (
    <a
      href={APPLE_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`group inline-flex items-center justify-center gap-3 ${s.px} ${s.py} rounded-2xl border border-white/20 bg-white/5 backdrop-blur-sm hover:bg-white/10 hover:border-white/40 transition ${fullWidth ? "w-full" : ""}`}
    >
      <svg viewBox="0 0 24 24" fill="currentColor" className={`${s.icon} text-white`}>
        <path d="M17.05 12.04c-.03-2.62 2.14-3.88 2.24-3.94-1.22-1.79-3.13-2.03-3.81-2.06-1.62-.16-3.17.95-3.99.95-.83 0-2.1-.93-3.45-.9-1.78.03-3.43 1.04-4.34 2.62-1.85 3.21-.47 7.97 1.34 10.59.88 1.28 1.93 2.72 3.31 2.67 1.33-.05 1.84-.86 3.45-.86 1.61 0 2.06.86 3.46.83 1.43-.03 2.34-1.31 3.22-2.6 1.01-1.49 1.43-2.94 1.45-3.02-.03-.01-2.78-1.07-2.81-4.21zM14.34 4.36c.73-.89 1.22-2.13 1.09-3.36-1.05.04-2.32.7-3.07 1.59-.68.78-1.27 2.04-1.11 3.25 1.17.09 2.36-.59 3.09-1.48z" />
      </svg>
      <div className="text-left whitespace-nowrap">
        <div className={`${s.top} uppercase tracking-widest text-white/60`}>Download on</div>
        <div className={`${s.main} font-bold text-white`}>App Store</div>
      </div>
    </a>
  );
}

export function GooglePlayButton({ size = "md", fullWidth }: { size?: Size; fullWidth?: boolean }) {
  const s = sizes[size];
  return (
    <a
      href={GOOGLE_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`group inline-flex items-center justify-center gap-3 ${s.px} ${s.py} rounded-2xl border border-white/20 bg-white/5 backdrop-blur-sm hover:bg-white/10 hover:border-white/40 transition ${fullWidth ? "w-full" : ""}`}
    >
      <svg viewBox="0 0 24 24" className={s.icon}>
        <path fill="#34A853" d="M3.6 20.6c.2.4.6.7 1 .8l9.6-9.4-3.2-3.1L3.6 20.6z" />
        <path fill="#FBBC04" d="M17.6 13.6l3-1.7c.6-.3.6-1.2 0-1.5l-3-1.7-3.4 3.4 3.4 1.5z" />
        <path fill="#4285F4" d="M4.6 2.6c-.4.1-.8.4-1 .8L11 12l3.2-3.1L4.6 2.6z" />
        <path fill="#EA4335" d="M11 12L3.6 3.4c-.1.2-.1.4-.1.6v16c0 .2 0 .4.1.6L11 12z" />
      </svg>
      <div className="text-left whitespace-nowrap">
        <div className={`${s.top} uppercase tracking-widest text-white/60`}>Get it on</div>
        <div className={`${s.main} font-bold text-white`}>Google Play</div>
      </div>
    </a>
  );
}
