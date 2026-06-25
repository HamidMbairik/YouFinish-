import { useState, useCallback, useEffect, useRef, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import allQuestions from "../data/questions";
import ChaosProvider, { useChaos } from "./ChaosEngine";
import QuestionCard from "./QuestionCard";
import RandomEvents from "./RandomEvents";
import UIChaosLayer from "./UIChaosLayer";
import Background from "./Background";
import FloatingEmojis from "./FloatingEmojis";
import MemeStorm from "./MemeStorm";
import Logo from "./Logo";

function getTimerDuration(chaosLevel) {
  return Math.max(6, 20 - chaosLevel * 2);
}

function Timer({ timeLeft, total, chaosLevel }) {
  const pct = (timeLeft / total) * 100;
  const urgent = timeLeft <= 4;
  const critical = timeLeft <= 2;

  const color = critical ? "#ef4444" : urgent ? "#f59e0b" : "#22d55e";

  return (
    <motion.div
      className="w-full max-w-lg mx-auto"
      animate={critical ? { x: [0, 2, -2, 1, -1, 0] } : urgent ? { x: [0, 1, -1, 0] } : {}}
      transition={{ duration: 0.15, repeat: Infinity }}
    >
      <div className="flex items-center gap-3">
        <motion.span
          className="text-xs font-mono font-bold w-8 text-right"
          animate={{ color, scale: critical ? [1, 1.2, 1] : 1 }}
          transition={{ duration: 0.3, repeat: critical ? Infinity : 0 }}
        >
          {Math.ceil(timeLeft)}s
        </motion.span>
        <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{ background: `linear-gradient(90deg, ${color}, ${urgent ? "#ef4444" : "#22d55e"})` }}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 0.3, ease: "linear" }}
          />
        </div>
        <motion.span
          className="text-[10px] font-mono opacity-40"
          animate={critical ? { opacity: [0.2, 0.8, 0.2] } : {}}
          transition={{ duration: 0.4, repeat: critical ? Infinity : 0 }}
        >
          {critical ? "!!!" : urgent ? " hurry" : ""}
        </motion.span>
      </div>
    </motion.div>
  );
}

function QuizInner({ onFinish }) {
  const [qIndex, setQIndex] = useState(0);
  const { chaosLevel, questionsAnswered, recordAnswer } = useChaos();
  const [timeLeft, setTimeLeft] = useState(getTimerDuration(chaosLevel));
  const timerRef = useRef(null);
  const totalTime = getTimerDuration(chaosLevel);

  const quizQuestions = useMemo(() => {
    const shuffled = [...allQuestions].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 20);
  }, []);

  useEffect(() => {
    setTimeLeft(getTimerDuration(chaosLevel));
  }, [qIndex, chaosLevel]);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0.5) return 0;
        return prev - 0.1;
      });
    }, 100);
    return () => clearInterval(timerRef.current);
  }, [qIndex]);

  useEffect(() => {
    if (timeLeft <= 0) {
      recordAnswer();
      if (qIndex + 1 >= quizQuestions.length) {
        onFinish(chaosLevel, questionsAnswered + 1);
      } else {
        setQIndex((i) => i + 1);
      }
    }
  }, [timeLeft, qIndex, chaosLevel, questionsAnswered, onFinish, recordAnswer]);

  const handleAnswer = useCallback(() => {
    recordAnswer();
    if (qIndex + 1 >= quizQuestions.length) {
      onFinish(chaosLevel, questionsAnswered + 1);
    } else {
      setQIndex((i) => i + 1);
    }
  }, [qIndex, chaosLevel, questionsAnswered, onFinish, recordAnswer]);

  const question = quizQuestions[qIndex];
  const progress = ((qIndex) / quizQuestions.length) * 100;

  return (
    <UIChaosLayer>
      <Background speed={chaosLevel} />
      {chaosLevel >= 1 && <FloatingEmojis intensity={chaosLevel} />}
      <RandomEvents />
      <MemeStorm intensity={Math.min(1, chaosLevel / 7)} enabled={chaosLevel >= 1} />
      <div className="min-h-screen flex flex-col p-4 relative z-10">
        <div className="flex items-center justify-between px-2 py-3 max-w-4xl mx-auto w-full">
          <div className="flex items-center gap-3">
            <Logo size={28} />
            <span className="text-white/80 font-bold text-sm tracking-widest uppercase">
              YouFinish
            </span>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <span className="text-white/60">
              {qIndex + 1}/{quizQuestions.length}
            </span>
            <motion.span
              className="font-bold"
              animate={{
                color: chaosLevel >= 5 ? ["#ef4444", "#f59e0b", "#ef4444"] : chaosLevel >= 3 ? "#f59e0b" : "#94a3b8",
              }}
              transition={{ duration: 0.5, repeat: chaosLevel >= 5 ? Infinity : 0 }}
            >
              🔥 {chaosLevel}/7
            </motion.span>
          </div>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center gap-4 px-4 -mt-16">
          <Timer timeLeft={timeLeft} total={totalTime} chaosLevel={chaosLevel} />

          <div className="w-full max-w-lg h-1 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-yellow-400 via-pink-500 to-cyan-400 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            />
          </div>

          <AnimatePresence mode="wait">
            <QuestionCard
              key={question.id}
              question={question}
              onAnswer={handleAnswer}
            />
          </AnimatePresence>
        </div>
      </div>
    </UIChaosLayer>
  );
}

export default function Quiz({ onFinish }) {
  return (
    <ChaosProvider>
      <QuizInner onFinish={onFinish} />
    </ChaosProvider>
  );
}
