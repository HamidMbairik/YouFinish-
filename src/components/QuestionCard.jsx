import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useChaos } from "./ChaosEngine";

const cardColors = [
  "from-pink-500 via-purple-500 to-indigo-500",
  "from-yellow-400 via-orange-500 to-red-500",
  "from-green-400 via-teal-500 to-cyan-500",
  "from-blue-400 via-indigo-500 to-violet-500",
  "from-red-500 via-pink-500 to-yellow-500",
];

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function getJitterMultiplier(level) {
  if (level >= 7) return 18;
  if (level >= 6) return 14;
  if (level >= 5) return 10;
  if (level >= 4) return 7;
  if (level >= 3) return 4;
  if (level >= 2) return 2;
  return 0;
}

function getJitterInterval(level) {
  if (level >= 7) return 80;
  if (level >= 6) return 100;
  if (level >= 5) return 130;
  if (level >= 4) return 170;
  if (level >= 3) return 220;
  if (level >= 2) return 300;
  return 0;
}

export default function QuestionCard({ question, onAnswer }) {
  const { chaosLevel, activeEvents } = useChaos();
  const [swappedOptions, setSwappedOptions] = useState(null);
  const [jitter, setJitter] = useState({ x: 0, y: 0 });

  const options = useMemo(
    () => swappedOptions || (question.options ? shuffle(question.options) : []),
    [question, swappedOptions]
  );

  const shouldSwap = activeEvents.some((e) => e.type === "swap_buttons");
  useEffect(() => {
    if (shouldSwap && question.options) {
      setSwappedOptions(shuffle(question.options));
      const t = setTimeout(() => setSwappedOptions(null), 2000);
      return () => clearTimeout(t);
    }
  }, [shouldSwap, question]);

  useEffect(() => {
    if (chaosLevel < 2) return;
    const mult = getJitterMultiplier(chaosLevel);
    const interval = setInterval(() => {
      setJitter({
        x: (Math.random() - 0.5) * mult,
        y: (Math.random() - 0.5) * mult * 0.6,
      });
    }, getJitterInterval(chaosLevel));
    return () => clearInterval(interval);
  }, [chaosLevel]);

  const cardGradient = cardColors[(question.id * 7) % cardColors.length];

  const hueRotateSpeed = chaosLevel >= 5 ? 0.04 : chaosLevel >= 3 ? 0.02 : 0.01;
  const hueShift = chaosLevel > 0
    ? { filter: `hue-rotate(${chaosLevel * 25 + Date.now() * hueRotateSpeed}deg)` }
    : {};

  function handleAnswer() {
    onAnswer(true);
  }

  const btnDrift = (base) => chaosLevel >= 2 ? base + (chaosLevel - 2) * 3 : 0;

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0, rotate: -5 }}
      animate={{
        scale: 1,
        opacity: 1,
        rotate: chaosLevel >= 3 ? [0, 1.5, -1.5, 2, -2, 0] : 0,
        x: jitter.x,
        y: jitter.y,
      }}
      exit={{ scale: 0.8, opacity: 0, rotate: 5 }}
      className={`bg-gradient-to-br ${cardGradient} rounded-3xl p-8 shadow-2xl max-w-lg w-full mx-auto`}
      style={hueShift}
    >
      <motion.h2
        className="text-2xl font-black text-white mb-6 drop-shadow-lg text-center"
        animate={
          chaosLevel >= 2
            ? {
                rotate: [(Math.random() - 0.5) * chaosLevel * 2.5, (Math.random() - 0.5) * chaosLevel * 2.5],
                scale: [1, 1 + chaosLevel * 0.008, 1],
              }
            : {}
        }
        transition={{ duration: Math.max(0.2, 0.6 - chaosLevel * 0.05), repeat: Infinity, repeatType: "reverse" }}
      >
        {question.question}
      </motion.h2>

      {question.type === "click" ? (
        <motion.button
          onClick={handleAnswer}
          className="w-full bg-white/20 backdrop-blur-sm text-white font-bold py-6 px-6 rounded-xl border-2 border-white/30 hover:bg-white/40 transition-colors cursor-pointer text-lg"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          animate={
            chaosLevel >= 2
              ? { x: (Math.random() - 0.5) * btnDrift(8), y: (Math.random() - 0.5) * btnDrift(5) }
              : {}
          }
          transition={{ duration: Math.max(0.08, 0.25 - chaosLevel * 0.02), repeat: chaosLevel >= 2 ? Infinity : 0, repeatType: "reverse" }}
        >
          Click anywhere here
        </motion.button>
      ) : question.type === "emoji" ? (
        <div className="flex justify-center gap-4 flex-wrap">
          {question.emojis.map((emoji, i) => (
            <motion.button
              key={`${emoji}-${i}`}
              onClick={handleAnswer}
              className="text-5xl bg-white/20 backdrop-blur-sm p-4 rounded-2xl border-2 border-white/30 hover:bg-white/40 transition-colors cursor-pointer"
              whileHover={{ scale: 1.2, rotate: [0, -15, 15, 0] }}
              whileTap={{ scale: 0.9 }}
              animate={
                chaosLevel >= 2
                  ? {
                      x: (Math.random() - 0.5) * btnDrift(10),
                      y: (Math.random() - 0.5) * btnDrift(7),
                      rotate: [0, chaosLevel * 4, -chaosLevel * 4, 0],
                    }
                  : {}
              }
              transition={{ duration: Math.max(0.08, 0.2 - chaosLevel * 0.015), repeat: chaosLevel >= 2 ? Infinity : 0, repeatType: "reverse" }}
            >
              {emoji}
            </motion.button>
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          <AnimatePresence mode="popLayout">
            {options.map((opt, i) => (
              <motion.button
                key={`${opt}-${i}`}
                layout
                onClick={handleAnswer}
                className="bg-white/20 backdrop-blur-sm text-white font-bold py-3 px-6 rounded-xl border-2 border-white/30 hover:bg-white/40 transition-colors cursor-pointer text-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                animate={
                  chaosLevel >= 2
                    ? {
                        x: (Math.random() - 0.5) * btnDrift(6),
                        y: (Math.random() - 0.5) * btnDrift(4),
                        scale: [1, 1 + chaosLevel * 0.015, 1],
                      }
                    : {}
                }
                transition={{ duration: Math.max(0.08, 0.2 - chaosLevel * 0.015), repeat: chaosLevel >= 2 ? Infinity : 0, repeatType: "reverse" }}
              >
                {opt}
              </motion.button>
            ))}
          </AnimatePresence>
        </div>
      )}
    </motion.div>
  );
}
