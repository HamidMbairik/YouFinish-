import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const emojis = ["🍺", "🤯", "😂", "💀", "🧠", "🔥", "👀", "💫", "🌀", "🎯", "💥", "🤡", "👾", "😭", "🎉"];

function Emoji({ emoji, id, intensity }) {
  const x = Math.random() * 90 + 5;
  const y = Math.random() * 90 + 5;
  const baseDuration = Math.max(1.5, 5 - intensity * 0.4);
  const duration = baseDuration + Math.random() * 2;
  const delay = Math.random() * 4;
  const size = 16 + Math.random() * 20 + intensity * 2;

  const drift = 10 + intensity * 5;

  return (
    <motion.div
      className="absolute pointer-events-none select-none"
      style={{ left: `${x}%`, top: `${y}%`, fontSize: size }}
      animate={{
        y: [0, -drift * 2, drift * 0.5, -drift, 0],
        x: [0, drift, -drift * 0.7, drift * 0.5, 0],
        rotate: [0, intensity * 5, -intensity * 5, intensity * 3, 0],
        opacity: [0.2, 0.8, 0.3, 0.7, 0.2],
      }}
      transition={{
        duration,
        repeat: Infinity,
        delay,
        ease: "easeInOut",
      }}
    >
      {emoji}
    </motion.div>
  );
}

export default function FloatingEmojis({ intensity = 1 }) {
  const [items, setItems] = useState(() =>
    emojis.slice(0, 8).map((e, i) => ({ emoji: e, id: i }))
  );

  useEffect(() => {
    const swapRate = Math.max(800, 4000 - intensity * 400);
    const interval = setInterval(() => {
      setItems((prev) => {
        const copy = [...prev];
        const swaps = 1 + Math.floor(intensity / 2);
        for (let k = 0; k < swaps; k++) {
          const idx = Math.floor(Math.random() * copy.length);
          copy[idx] = {
            emoji: emojis[Math.floor(Math.random() * emojis.length)],
            id: Date.now() + idx + k,
          };
        }
        return copy;
      });
    }, swapRate);
    return () => clearInterval(interval);
  }, [intensity]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {items.map((item) => (
        <Emoji key={item.id} emoji={item.emoji} id={item.id} intensity={intensity} />
      ))}
    </div>
  );
}
