import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "iSpotly — Guess the song. Beat the daily.",
  description:
    "iSpotly is the daily music guessing game. Listen to drums, bass, synth, choir or vocals and name that track before your hints run out.",
  metadataBase: new URL("https://ispotly.com"),
  openGraph: {
    title: "iSpotly",
    description: "Guess the song. Beat the daily.",
    url: "https://ispotly.com",
    siteName: "iSpotly",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#07060d",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
