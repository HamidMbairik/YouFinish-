import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function GlitchTitle() {
  const [glitched, setGlitched] = useState(false);
  const [jitter, setJitter] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setGlitched(true);
      setJitter({
        x: (Math.random() - 0.5) * 8,
        y: (Math.random() - 0.5) * 6,
      });
      setTimeout(() => {
        setGlitched(false);
        setJitter({ x: 0, y: 0 });
      }, 150 + Math.random() * 100);
    }, 2000 + Math.random() * 2500);
    return () => clearInterval(glitchInterval);
  }, []);

  const variants = [
    "YOUF!N!$H",
    "Y0UF1N!5H",
    "YOU_FIN_ISH",
    "Y0U_F!N£$H",
  ];
  const title = glitched
    ? variants[Math.floor(Math.random() * variants.length)]
    : "YOUFINISH";

  return (
    <div className="relative inline-block">
      <motion.h1
        className="text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-pink-400 to-cyan-400 drop-shadow-[0_0_30px_rgba(255,255,255,0.3)] relative z-10 leading-none"
        animate={{
          x: jitter.x,
          y: jitter.y,
          scale: glitched ? [1, 1.03, 0.97, 1] : 1,
          skewX: glitched ? [0, -2, 2, 0] : 0,
        }}
        transition={{ duration: 0.1 }}
      >
        {title}
      </motion.h1>

      {glitched && (
        <>
          <motion.span
            className="absolute inset-0 text-8xl font-black text-red-500/40 z-0 leading-none pointer-events-none"
            style={{ clipPath: "inset(0 0 60% 0)" }}
            animate={{ x: jitter.x + 4, y: jitter.y - 3, opacity: [0, 0.5, 0] }}
            transition={{ duration: 0.1 }}
          >
            {title}
          </motion.span>
          <motion.span
            className="absolute inset-0 text-8xl font-black text-cyan-400/40 z-0 leading-none pointer-events-none"
            style={{ clipPath: "inset(60% 0 0 0)" }}
            animate={{ x: jitter.x - 4, y: jitter.y + 3, opacity: [0, 0.5, 0] }}
            transition={{ duration: 0.1 }}
          >
            {title}
          </motion.span>
        </>
      )}
    </div>
  );
}
