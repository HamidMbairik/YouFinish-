import { useState, useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";

const texts = [
  "Start",
  "No",
  "Are you sure?",
  "Too late",
  "Click me",
  "Stop",
  "Maybe?",
  "DO NOT PRESS",
  "Try again",
  "Yes?",
];

export default function ChaosButton({ onStart }) {
  const [text, setText] = useState(texts[0]);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const [teleporting, setTeleporting] = useState(false);
  const btnRef = useRef(null);
  const textIntervalRef = useRef(null);

  const teleport = useCallback(() => {
    setTeleporting(true);
    setPos({
      x: (Math.random() - 0.5) * 140,
      y: (Math.random() - 0.5) * 100,
    });
    setTimeout(() => setTeleporting(false), 300);
  }, []);

  useEffect(() => {
    textIntervalRef.current = setInterval(() => {
      setText(texts[Math.floor(Math.random() * texts.length)]);
    }, 2000 + Math.random() * 3000);
    return () => clearInterval(textIntervalRef.current);
  }, []);

  useEffect(() => {
    const teleportInterval = setInterval(() => {
      if (!hovered) teleport();
    }, 5000 + Math.random() * 6000);
    return () => clearInterval(teleportInterval);
  }, [hovered, teleport]);

  function handleMouseEnter() {
    setHovered(true);
    const angle = Math.random() * Math.PI * 2;
    const distance = 60 + Math.random() * 100;
    setPos({
      x: Math.cos(angle) * distance,
      y: Math.sin(angle) * distance,
    });
  }

  function handleMouseLeave() {
    setHovered(false);
    setPos({ x: 0, y: 0 });
  }

  function handleClick() {
    if (text !== "Start" && text !== "Click me" && text !== "Yes?") {
      setText("Start");
      teleport();
      return;
    }
    onStart();
  }

  return (
    <motion.div
      className="relative"
      animate={{ x: pos.x, y: pos.y }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 15,
        duration: teleporting ? 0.05 : 0.3,
      }}
    >
      <motion.button
        ref={btnRef}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="bg-gradient-to-r from-yellow-400 via-pink-500 to-cyan-400 text-white font-black text-2xl py-5 px-12 rounded-2xl shadow-2xl cursor-pointer relative z-20 whitespace-nowrap"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.9 }}
        animate={
          hovered
            ? { rotate: [0, -2, 2, -1, 0], boxShadow: "0 0 40px rgba(255,255,255,0.4)" }
            : { boxShadow: ["0 0 20px rgba(255,255,255,0.3)", "0 0 40px rgba(255,255,255,0.6)", "0 0 20px rgba(255,255,255,0.3)"] }
        }
        transition={
          hovered
            ? { duration: 0.3, repeat: Infinity }
            : { duration: 1.5, repeat: Infinity }
        }
      >
        {text}
      </motion.button>
    </motion.div>
  );
}
