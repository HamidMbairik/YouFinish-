import { createContext, useContext, useState, useEffect, useCallback, useRef } from "react";
import { getNextChaosLevel, getRandomEvent } from "../utils/chaosLogic";

const ChaosContext = createContext(null);

export function useChaos() {
  const ctx = useContext(ChaosContext);
  if (!ctx) throw new Error("useChaos must be used within ChaosProvider");
  return ctx;
}

export default function ChaosProvider({ children }) {
  const [chaosLevel, setChaosLevel] = useState(0);
  const [activeEvents, setActiveEvents] = useState([]);
  const [questionsAnswered, setQuestionsAnswered] = useState(0);
  const eventIdRef = useRef(0);

  const triggerEvent = useCallback((eventType) => {
    const id = ++eventIdRef.current;
    setActiveEvents((prev) => [...prev, { id, type: eventType }]);
    const duration = eventType === "blur_ui" || eventType === "invert_colors" ? 1000 : 2000;
    setTimeout(() => {
      setActiveEvents((prev) => prev.filter((e) => e.id !== id));
    }, duration);
  }, []);

  const recordAnswer = useCallback(() => {
    setQuestionsAnswered((prev) => {
      const next = prev + 1;
      const newLevel = getNextChaosLevel(chaosLevel, next);
      if (newLevel > chaosLevel) setChaosLevel(newLevel);
      return next;
    });
  }, [chaosLevel]);

  useEffect(() => {
    const eventCount = 1 + Math.min(chaosLevel, 4);
    const timers = [];
    for (let i = 0; i < eventCount; i++) {
      const baseInterval = Math.max(1500, 5000 - chaosLevel * 500);
      const timer = setInterval(() => {
        triggerEvent(getRandomEvent());
      }, baseInterval + Math.random() * 2000);
      timers.push(timer);
    }
    return () => timers.forEach(clearInterval);
  }, [chaosLevel, triggerEvent]);

  return (
    <ChaosContext.Provider
      value={{ chaosLevel, activeEvents, questionsAnswered, triggerEvent, recordAnswer }}
    >
      {children}
    </ChaosContext.Provider>
  );
}
