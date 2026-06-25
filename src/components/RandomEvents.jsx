import { useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useChaos } from "./ChaosEngine";

const popupContent = {
  popup_system_thinking: { title: "SYSTEM THINKING...", emoji: "🤔", badge: false },
  popup_still_there: { title: "ARE YOU STILL THERE?", emoji: "👀", badge: false },
  popup_reality_failed: { title: "REALITY CHECK FAILED", emoji: "💫", badge: false },
  swap_buttons: { title: "♻️ SWAPPING BUTTONS", emoji: "", badge: false },
  invert_colors: { title: "🎨 INVERTING...", emoji: "", badge: false },
  fake_lag: { title: "⚠️ LAG DETECTED", emoji: "🐌", badge: false },
  spawn_glitch: { title: "GLITCH.EXE LAUNCHED", emoji: "🌀", badge: false },
  blur_ui: { title: "FOCUS LOST", emoji: "👁️", badge: false },
  meme_youfinish: { title: "You Finish.", emoji: "🏁", badge: true },
  meme_drunk: { title: "Ngg you hella drunk", emoji: "🍺", badge: true },
  meme_tweaking: { title: "Bro you tweaking?", emoji: "🤨", badge: true },
  meme_notthatguy: { title: "You're NOT that guy", emoji: "🚫", badge: true },
  meme_pressf: { title: "Press F to pay respects", emoji: "🫡", badge: true },
  meme_skillissue: { title: "Skill issue tbh", emoji: "😬", badge: true },
  meme_getrekt: { title: "Get rekt", emoji: "💀", badge: true },
  meme_shaking: { title: "You're literally shaking rn", emoji: "😰", badge: true },
  meme_thisisfine: { title: "This is fine 🔥", emoji: "", badge: true },
  meme_average: { title: "Average YouFinish player", emoji: "📸", badge: true },
  meme_touchgrass: { title: "Touch grass maybe?", emoji: "🌿", badge: true },
  meme_doinggreat: { title: "You're doing great! (lie)", emoji: "👍", badge: true },
  meme_ratio: { title: "L + ratio + you fell off", emoji: "📉", badge: true },
  meme_mainchar: { title: "Main character? nah.", emoji: "🎬", badge: true },
  meme_cooked: { title: "You're cooked gang", emoji: "🍳", badge: true },
  meme_gg: { title: "GG go next", emoji: "🎮", badge: true },
};

const popupPositions = [
  { top: "20%", left: "10%" },
  { top: "15%", right: "15%" },
  { bottom: "25%", left: "20%" },
  { bottom: "20%", right: "10%" },
  { top: "40%", left: "5%" },
  { top: "35%", right: "5%" },
];

const memePositions = [
  { top: "10%", left: "5%" },
  { top: "5%", right: "8%" },
  { bottom: "15%", left: "3%" },
  { bottom: "10%", right: "5%" },
  { top: "50%", left: "2%" },
  { top: "45%", right: "2%" },
  { bottom: "35%", left: "8%" },
  { bottom: "40%", right: "10%" },
  { top: "60%", left: "12%" },
  { top: "55%", right: "12%" },
];

const memeColors = [
  "#ef4444", "#f59e0b", "#22d55e", "#3b82f6",
  "#a855f7", "#ec4899", "#06b6d4", "#f97316",
];

export default function RandomEvents() {
  const { activeEvents } = useChaos();

  const popups = useMemo(
    () => activeEvents.filter((e) => e.type.startsWith("popup")),
    [activeEvents]
  );

  const memes = useMemo(
    () => activeEvents.filter((e) => e.type.startsWith("meme")),
    [activeEvents]
  );

  return (
    <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
      <AnimatePresence>
        {popups.map((event, i) => {
          const content = popupContent[event.type] || { title: "???", emoji: "❓" };
          const pos = popupPositions[i % popupPositions.length];
          return (
            <motion.div
              key={event.id}
              initial={{ scale: 0, opacity: 0, rotate: -20 }}
              animate={{
                scale: 1,
                opacity: 1,
                rotate: [0, 5, -5, 3, -3, 0],
                x: [0, 10, -10, 0],
              }}
              exit={{ scale: 1.5, opacity: 0, rotate: 10 }}
              transition={{ duration: 0.3 }}
              className="absolute bg-black/80 backdrop-blur-sm text-white font-black text-lg px-5 py-3 rounded-2xl border-2 border-white/20 shadow-2xl whitespace-nowrap"
              style={pos}
            >
              {content.emoji && <span className="mr-2">{content.emoji}</span>}
              {content.title}
            </motion.div>
          );
        })}
      </AnimatePresence>

      <AnimatePresence>
        {memes.map((event, i) => {
          const content = popupContent[event.type] || { title: "???", emoji: "❓" };
          const pos = memePositions[i % memePositions.length];
          const color = memeColors[i % memeColors.length];
          return (
            <motion.div
              key={event.id}
              initial={{ x: -100, opacity: 0, rotate: -15 }}
              animate={{
                x: 0,
                opacity: 1,
                rotate: [0, 3, -3, 2, -2, 0],
                scale: [1, 1.05, 0.95, 1],
              }}
              exit={{ x: 100, opacity: 0, rotate: 10 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="absolute font-black text-base px-4 py-2 rounded-xl border-2 shadow-2xl whitespace-nowrap backdrop-blur-sm"
              style={{
                ...pos,
                background: `${color}22`,
                borderColor: `${color}66`,
                color,
                textShadow: `0 0 10px ${color}44`,
              }}
            >
              {content.emoji && <span className="mr-2">{content.emoji}</span>}
              {content.title}
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
