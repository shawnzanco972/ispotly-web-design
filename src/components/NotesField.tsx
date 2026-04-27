"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Music, Music2, Music3, Music4, Headphones, Disc3, Mic2, Guitar } from "lucide-react";

const GLYPHS = ["♪", "♫", "♩", "♬", "𝅗𝅥", "𝅘𝅥𝅮"];
const ICONS = [Music, Music2, Music3, Music4, Headphones, Disc3, Mic2, Guitar];

type Note = {
  id: number;
  kind: "glyph" | "icon";
  char: string;
  iconIdx: number;
  size: number;
  x: number;
  y: number;
  duration: number;
  delay: number;
  opacity: number;
  drift: number;
  rotate: number;
  spin: number;
};

export default function NotesField({ count = 55 }: { count?: number }) {
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    setNotes(
      Array.from({ length: count }).map((_, i) => {
        const isGlyph = Math.random() < 0.75;
        return {
          id: i,
          kind: isGlyph ? "glyph" : "icon",
          char: GLYPHS[Math.floor(Math.random() * GLYPHS.length)],
          iconIdx: Math.floor(Math.random() * ICONS.length),
          size: Math.random() * 14 + (isGlyph ? 14 : 12),
          x: Math.random() * 100,
          y: Math.random() * 100,
          duration: 12 + Math.random() * 24,
          delay: Math.random() * -24,
          opacity: 0.05 + Math.random() * 0.16,
          drift: Math.random() * 40 - 20,
          rotate: Math.random() * 40 - 20,
          spin: Math.random() * 30 - 15,
        };
      })
    );
  }, [count]);

  return (
    <div className="absolute inset-0 z-[1] overflow-hidden pointer-events-none">
      {notes.map((n) => {
        const Icon = ICONS[n.iconIdx];
        return (
          <motion.div
            key={n.id}
            className="absolute text-white will-change-transform"
            style={{
              left: `${n.x}%`,
              top: `${n.y}%`,
              fontSize: `${n.size}px`,
              opacity: n.opacity,
            }}
            animate={{
              opacity: [n.opacity, n.opacity * 1.8, n.opacity],
              y: [0, -28, 0],
              x: [0, n.drift, 0],
              rotate: [n.rotate, n.rotate + n.spin, n.rotate],
            }}
            transition={{
              duration: n.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: n.delay,
            }}
          >
            {n.kind === "glyph" ? (
              <span style={{ lineHeight: 1 }}>{n.char}</span>
            ) : (
              <Icon style={{ width: n.size, height: n.size }} />
            )}
          </motion.div>
        );
      })}
    </div>
  );
}
