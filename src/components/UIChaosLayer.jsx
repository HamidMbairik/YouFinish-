import { useMemo } from "react";
import { motion } from "framer-motion";
import { useChaos } from "./ChaosEngine";

export default function UIChaosLayer({ children }) {
  const { chaosLevel, activeEvents } = useChaos();

  const invert = activeEvents.some((e) => e.type === "invert_colors");
  const blur = activeEvents.some((e) => e.type === "blur_ui") || chaosLevel >= 5;
  const lag = activeEvents.some((e) => e.type === "fake_lag");

  const { shakeIntensity, shakeSpeed, blurAmount } = useMemo(() => {
    if (chaosLevel >= 7) return { shakeIntensity: 14, shakeSpeed: 0.06, blurAmount: 5 };
    if (chaosLevel >= 6) return { shakeIntensity: 11, shakeSpeed: 0.08, blurAmount: 4 };
    if (chaosLevel >= 5) return { shakeIntensity: 8, shakeSpeed: 0.1, blurAmount: 3 };
    if (chaosLevel >= 4) return { shakeIntensity: 6, shakeSpeed: 0.14, blurAmount: 2 };
    if (chaosLevel >= 3) return { shakeIntensity: 4, shakeSpeed: 0.18, blurAmount: 0 };
    if (chaosLevel >= 2) return { shakeIntensity: 2, shakeSpeed: 0.22, blurAmount: 0 };
    return { shakeIntensity: 0, shakeSpeed: 0, blurAmount: 0 };
  }, [chaosLevel]);

  const filterStyles = [
    blur || blurAmount > 0 ? `blur(${blurAmount}px)` : "none",
    invert ? "invert(1) hue-rotate(180deg)" : "none",
    lag ? "brightness(1.4) contrast(0.6) saturate(2)" : "none",
  ]
    .filter((s) => s !== "none")
    .join(" ");

  return (
    <motion.div
      className="relative min-h-screen"
      style={{
        filter: filterStyles || "none",
        transition: "filter 0.2s ease",
      }}
      animate={
        shakeIntensity > 0
          ? {
              x: [0, shakeIntensity, -shakeIntensity * 0.8, shakeIntensity * 0.5, -shakeIntensity * 0.3, shakeIntensity * 0.7, -shakeIntensity * 0.5, 0],
              y: [0, -shakeIntensity * 0.5, shakeIntensity * 0.6, -shakeIntensity * 0.3, shakeIntensity * 0.4, -shakeIntensity * 0.6, shakeIntensity * 0.3, 0],
              rotate: [0, shakeIntensity * 0.4, -shakeIntensity * 0.3, shakeIntensity * 0.2, -shakeIntensity * 0.4, shakeIntensity * 0.3, -shakeIntensity * 0.2, 0],
            }
          : {}
      }
      transition={
        shakeIntensity > 0
          ? { duration: shakeSpeed, repeat: Infinity, ease: "linear" }
          : {}
      }
    >
      {children}
    </motion.div>
  );
}
