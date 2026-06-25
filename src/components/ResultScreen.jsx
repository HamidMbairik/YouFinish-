import { motion } from "framer-motion";
import { calculateSurvivalScore, getResultTitle } from "../utils/chaosLogic";
import Logo from "./Logo";
import MemeStorm from "./MemeStorm";

const bgColors = [
  "from-pink-500 via-purple-500 to-indigo-500",
  "from-yellow-400 via-orange-500 to-red-500",
  "from-green-400 via-teal-500 to-cyan-500",
  "from-blue-400 via-indigo-500 to-violet-500",
  "from-red-500 via-pink-500 to-yellow-500",
];

const chaosEmojis = ["🧘", "😬", "🤪", "🔥", "💀", "👻", "🌀", "?"];

export default function ResultScreen({ chaosLevel, questionsCompleted, onRestart }) {
  const survival = calculateSurvivalScore(chaosLevel, questionsCompleted);
  const title = getResultTitle(chaosLevel);
  const bg = bgColors[Math.floor(Math.random() * bgColors.length)];
  const emoji = chaosEmojis[Math.min(chaosLevel, chaosEmojis.length - 1)];

  return (
    <div className={`min-h-screen bg-gradient-to-br ${bg} flex flex-col relative overflow-hidden`}>
      <MemeStorm intensity={chaosLevel / 7} enabled={chaosLevel >= 1} />
      <div className="flex items-center gap-3 px-6 py-4 relative z-10">
        <Logo size={28} />
        <span className="text-white/60 font-bold text-xs tracking-widest uppercase">
          YouFinish
        </span>
      </div>

      <div className="flex-1 flex items-center justify-center p-6 relative z-10">
        <motion.div
          initial={{ scale: 0.5, opacity: 0, rotate: -10 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={{ type: "spring", damping: 12, stiffness: 120 }}
          className="bg-white/10 backdrop-blur-md rounded-3xl p-10 max-w-md w-full text-center shadow-2xl border border-white/20"
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.2, 1] }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-7xl mb-4"
          >
            {emoji}
          </motion.div>

          <h1 className="text-4xl font-black text-white mb-2 drop-shadow-lg">
            You Survived!
          </h1>

          <div className="bg-white/10 rounded-xl p-4 my-6 space-y-2">
            <p className="text-3xl font-black text-white">{survival}%</p>
            <p className="text-white/80">Survival score</p>
            <p className="text-white/60 text-sm">
              Chaos level reached: {chaosLevel}/7 &middot; Questions: {questionsCompleted}
            </p>
          </div>

          <motion.p
            className="text-lg font-bold text-white mb-8 drop-shadow"
            animate={{ scale: [1, 1.03, 1], opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {title}
          </motion.p>

          <motion.button
            onClick={onRestart}
            className="bg-white/20 hover:bg-white/30 text-white font-black text-xl py-4 px-10 rounded-2xl border-2 border-white/30 cursor-pointer backdrop-blur-sm"
            whileHover={{ scale: 1.08, rotate: [0, -2, 2, 0] }}
            whileTap={{ scale: 0.95 }}
          >
            🔄 Try again (bad idea)
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
