import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const gradients = [
  ["#4f46e5", "#7c3aed", "#ec4899"],
  ["#ec4899", "#f59e0b", "#10b981"],
  ["#06b6d4", "#8b5cf6", "#ef4444"],
  ["#f97316", "#e11d48", "#6366f1"],
  ["#14b8a6", "#a855f7", "#f43f5e"],
];

export default function Background({ speed = 0 }) {
  const [gradient, setGradient] = useState(gradients[0]);
  const [index, setIndex] = useState(0);

  const cycleTime = speed > 0 ? Math.max(600, 3000 - speed * 350) : 3000;

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % gradients.length);
    }, cycleTime);
    return () => clearInterval(interval);
  }, [cycleTime]);

  useEffect(() => {
    setGradient(gradients[index]);
  }, [index]);

  const bgDuration = speed > 0 ? Math.max(1.5, 5 - speed * 0.5) : 5;

  return (
    <motion.div
      className="fixed inset-0 -z-10"
      animate={{
        background: `linear-gradient(135deg, ${gradient[0]}, ${gradient[1]}, ${gradient[2]})`,
        backgroundSize: "400% 400%",
        backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
      }}
      transition={{ duration: bgDuration, repeat: Infinity, ease: "linear" }}
    >
      <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px]" />
    </motion.div>
  );
}
