import { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import Background from "../components/Background";
import GlitchTitle from "../components/GlitchTitle";
import Logo from "../components/Logo";
import MemeStorm from "../components/MemeStorm";

const taglines = [
  "Definitely not a scientific tool",
  "Good luck staying focused",
  "Zero nutritional value",
  "No animals were harmed",
  "Probably bug-free (lol)",
  "Reality not included",
  "May cause dizziness",
];

const badges = [
  "SYSTEM: ONLINE", "FOCUS: 12%", "CPU: 🔥",
  "MEME: ACTIVE", "STABILITY: ???",
];

const landingMemes = [
  "just start already 💀",
  "stop staring 🙄",
  "you know you want to 👀",
  "what are you waiting for? ⏰",
  "do it. no balls. 😤",
  "your mom played this 💪",
  "click the button 🔴",
  "fomo is real 📈",
  "trust me bro 🤝",
  "its not a scam (probably) 🤡",
  "fine i'll wait 🧍",
];

function Particle({ i }) {
  const x = useMemo(() => Math.random() * 100, []);
  const y = useMemo(() => Math.random() * 100, []);
  const size = useMemo(() => 2 + Math.random() * 4, []);
  const delay = useMemo(() => Math.random() * 5, []);
  const duration = useMemo(() => 3 + Math.random() * 4, []);

  return (
    <motion.div
      className="absolute rounded-full bg-white pointer-events-none"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        width: size,
        height: size,
      }}
      animate={{ opacity: [0, 0.6, 0], scale: [0, 1, 0] }}
      transition={{ duration, repeat: Infinity, delay, ease: "easeInOut" }}
    />
  );
}

function DecorativeBlob({ color, x, y, size, delay, duration }) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none blur-3xl"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        width: size,
        height: size,
        background: color,
        opacity: 0.15,
      }}
      animate={{ scale: [1, 1.3, 0.9, 1.2, 1], rotate: [0, 30, -20, 10, 0] }}
      transition={{ duration, repeat: Infinity, delay, ease: "easeInOut" }}
    />
  );
}

function FloatingEmoji({ emoji, x, y, delay, size = "2xl" }) {
  return (
    <motion.div
      className={`absolute pointer-events-none select-none text-${size} z-0`}
      style={{ left: `${x}%`, top: `${y}%` }}
      animate={{
        y: [0, -30 - Math.random() * 30, 10, -15, 0],
        rotate: [0, 15, -20, 10, 0],
        opacity: [0.15, 0.5, 0.2, 0.4, 0.15],
      }}
      transition={{ duration: 5 + Math.random() * 5, repeat: Infinity, delay, ease: "easeInOut" }}
    >
      {emoji}
    </motion.div>
  );
}

function StatusBadge({ text, x, y, color }) {
  return (
    <motion.div
      className="absolute pointer-events-none select-none text-[10px] font-mono font-bold tracking-wider px-2 py-1 rounded border border-white/10 bg-black/30 backdrop-blur-sm z-0"
      style={{ left: `${x}%`, top: `${y}%`, color }}
      animate={{ opacity: [0.3, 0.7, 0.3] }}
      transition={{ duration: 2 + Math.random() * 2, repeat: Infinity, ease: "easeInOut" }}
    >
      {text}
    </motion.div>
  );
}

function OrbitingRing({ radius, color, delay }) {
  return (
    <motion.div
      className="absolute rounded-full border pointer-events-none"
      style={{
        width: radius * 2,
        height: radius * 2,
        borderColor: color,
        opacity: 0.12,
      }}
      animate={{ rotate: 360 }}
      transition={{ duration: 20 + Math.random() * 10, repeat: Infinity, delay, ease: "linear" }}
    >
      <motion.div
        className="absolute w-2 h-2 rounded-full"
        style={{ background: color, top: -1, left: "50%", marginLeft: -4 }}
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
    </motion.div>
  );
}

const emojis = [
  { emoji: "🎯", x: 5, y: 10, delay: 0, size: "3xl" },
  { emoji: "🌀", x: 88, y: 8, delay: 1.5, size: "2xl" },
  { emoji: "🔥", x: 3, y: 70, delay: 2, size: "3xl" },
  { emoji: "💀", x: 90, y: 75, delay: 0.5, size: "4xl" },
  { emoji: "👀", x: 45, y: 5, delay: 1, size: "xl" },
  { emoji: "🍺", x: 50, y: 92, delay: 3, size: "2xl" },
  { emoji: "😂", x: 92, y: 45, delay: 2.5, size: "xl" },
  { emoji: "🤯", x: 2, y: 45, delay: 0.8, size: "2xl" },
  { emoji: "💥", x: 95, y: 90, delay: 1.2, size: "xl" },
  { emoji: "🧠", x: 8, y: 88, delay: 3.5, size: "2xl" },
  { emoji: "🎉", x: 80, y: 50, delay: 4, size: "xl" },
  { emoji: "👾", x: 20, y: 92, delay: 2.8, size: "2xl" },
];

const particles = Array.from({ length: 30 }, (_, i) => i);

const blobs = [
  { color: "#ec4899", x: -10, y: -10, size: 400, delay: 0, duration: 8 },
  { color: "#06b6d4", x: 70, y: 60, size: 350, delay: 2, duration: 10 },
  { color: "#facc15", x: 50, y: -5, size: 250, delay: 4, duration: 7 },
  { color: "#a855f7", x: 80, y: 10, size: 300, delay: 1, duration: 9 },
];

function EqualizerBars() {
  const bars = useMemo(() =>
    Array.from({ length: 40 }, (_, i) => ({
      height: 20 + Math.random() * 120,
      delay: Math.random() * 2,
      speed: 0.4 + Math.random() * 0.8,
    })), []
  );

  return (
    <div className="absolute inset-x-0 bottom-20 h-32 flex items-end justify-center gap-[3px] z-0 pointer-events-none overflow-hidden">
      {bars.map((bar, i) => (
        <motion.div
          key={i}
          className="w-[6px] rounded-t-sm"
          style={{
            background: `linear-gradient(to top, ${["#facc15", "#ec4899", "#06b6d4", "#a855f7"][i % 4]}, transparent)`,
            opacity: 0.15,
          }}
          animate={{
            height: [bar.height * 0.1, bar.height, bar.height * 0.3, bar.height * 0.7, bar.height * 0.1],
          }}
          transition={{
            duration: bar.speed,
            repeat: Infinity,
            delay: bar.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

export default function Landing({ onStart }) {
  const [ready, setReady] = useState(false);
  const [tagline, setTagline] = useState(taglines[0]);
  const [landingMeme, setLandingMeme] = useState(0);

  useEffect(() => { setReady(true); }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTagline(taglines[Math.floor(Math.random() * taglines.length)]);
    }, 3500);
    const memeInterval = setInterval(() => {
      setLandingMeme((p) => (p + 1) % landingMemes.length);
    }, 2500);
    return () => { clearInterval(interval); clearInterval(memeInterval); };
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden">
      <Background />

      <MemeStorm intensity={0.55} enabled={true} />

      <EqualizerBars />

      {blobs.map((b, i) => <DecorativeBlob key={i} {...b} />)}

      {particles.map((i) => <Particle key={i} i={i} />)}

      {emojis.map((e, i) => <FloatingEmoji key={i} {...e} />)}

      {badges.map((text, i) => (
        <StatusBadge
          key={i}
          text={text}
          x={[3, 75, 6, 80, 45][i]}
          y={[6, 12, 85, 88, 50][i]}
          color={[`#facc15`, `#ef4444`, `#22d3ee`, `#a855f7`, `#34d399`][i]}
        />
      ))}

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0">
        <OrbitingRing radius={180} color="#ec4899" delay={0} />
        <OrbitingRing radius={220} color="#06b6d4" delay={3} />
        <OrbitingRing radius={150} color="#facc15" delay={5} />
      </div>

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-6">
        <motion.div
          className="flex flex-col items-center gap-8 max-w-lg w-full"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: ready ? 1 : 0, y: ready ? 0 : 30 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <div className="flex flex-col items-center gap-5">
            <Logo size={88} />
            <GlitchTitle />
          </div>

          <motion.p
            className="text-base text-white/50 font-bold text-center h-6"
            key={tagline}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.3 }}
          >
            {tagline}
          </motion.p>

          <motion.div
            className="text-sm font-black h-6 text-center"
            key={landingMeme}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
            style={{ color: ["#ef4444", "#f59e0b", "#22d55e", "#3b82f6", "#a855f7", "#ec4899"][landingMeme % 6] }}
          >
            {landingMemes[landingMeme]}
          </motion.div>

          <motion.button
            onClick={onStart}
            className="bg-gradient-to-r from-yellow-400 via-pink-500 to-cyan-400 text-white font-black text-xl py-5 px-16 rounded-2xl shadow-2xl cursor-pointer tracking-wider mt-2 relative overflow-hidden"
            whileHover={{ scale: 1.08, boxShadow: "0 0 70px rgba(255,255,255,0.35)" }}
            whileTap={{ scale: 0.92 }}
            animate={{
              boxShadow: [
                "0 0 20px rgba(255,255,255,0.2)",
                "0 0 50px rgba(255,255,255,0.4)",
                "0 0 20px rgba(255,255,255,0.2)",
              ],
            }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <motion.span
              className="absolute inset-0 bg-white/10"
              animate={{ x: ["-100%", "100%"] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
            START CHAOS
          </motion.button>

          <div className="flex gap-4 text-[11px] text-white/20 font-mono mt-6">
            <span>v1.0</span>
            <span>|</span>
            <span>{new Date().getFullYear()}</span>
            <span>|</span>
            <span>no refunds</span>
            <span>|</span>
            <span>enjoy :)</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
