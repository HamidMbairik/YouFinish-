import { useState, useEffect, useRef, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { getRandomMeme } from "../utils/memeImages";

const glitchFilters = [
  "none",
  "hue-rotate(90deg)",
  "hue-rotate(180deg)",
  "contrast(2) saturate(1.5)",
  "brightness(1.4) saturate(2)",
  "blur(1px)",
  "hue-rotate(270deg) contrast(1.3)",
];

const borderColors = [
  "#ef4444", "#f59e0b", "#22d55e", "#3b82f6", "#a855f7", "#ec4899",
  "#06b6d4", "#f97316", "#14b8a6", "#8b5cf6",
];

function rng(min, max) {
  return min + Math.random() * (max - min);
}

export default function MemeStorm({ intensity = 0.5, enabled = true }) {
  const [active, setActive] = useState([]);
  const idRef = useRef(0);

  const spawn = useCallback(() => {
    if (!enabled) return;
    const id = ++idRef.current;
    const size = rng(80 + intensity * 100, 120 + intensity * 200);
    const lifetime = Math.max(700, rng(4000, 8000) - intensity * 1200);
    const x = rng(1, 76);
    const y = rng(1, 66);
    const rot = rng(-intensity * 70, intensity * 70);
    const filter = intensity > 0.3 ? glitchFilters[Math.floor(Math.random() * glitchFilters.length)] : "none";
    const z = Math.floor(rng(0, intensity * 50));
    const flipH = Math.random() < 0.25;
    const aspect = rng(0.55, 1.4);
    const border = borderColors[Math.floor(Math.random() * borderColors.length)];

    const entry = {
      id,
      url: getRandomMeme(),
      x, y, size, rot, flipH, filter, z, aspect, border,
    };

    setActive((p) => [...p, entry]);
    setTimeout(() => setActive((p) => p.filter((m) => m.id !== id)), lifetime);
  }, [enabled, intensity]);

  useEffect(() => {
    if (!enabled) return;
    const interval = Math.max(350, 3000 - intensity * 2800);
    const timer = setInterval(spawn, interval + rng(-600, 600));
    return () => clearInterval(timer);
  }, [spawn, enabled, intensity]);

  if (!enabled) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      <AnimatePresence>
        {active.map((m) => (
          <motion.img
            key={m.id}
            src={m.url}
            loading="lazy"
            initial={{ opacity: 0, scale: 0.3, rotate: rng(-30, 30), x: rng(-100, 100) }}
            animate={{ opacity: [0, 1, 1, 0], scale: 1, x: 0, rotate: m.rot }}
            exit={{ opacity: 0, scale: 1.5, rotate: rng(-45, 45) }}
            transition={{ duration: rng(0.3, 0.7), ease: "easeOut" }}
            className="absolute rounded-xl shadow-2xl border-2"
            style={{
              left: `${m.x}%`,
              top: `${m.y}%`,
              width: m.size,
              height: m.size * m.aspect,
              zIndex: m.z,
              filter: m.filter,
              transform: m.flipH ? `scaleX(-1) rotate(${m.rot}deg)` : undefined,
              objectFit: "cover",
              borderColor: m.border,
              boxShadow: `0 0 ${30 + intensity * 50}px ${m.border}44, 0 8px 32px rgba(0,0,0,0.5)`,
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
