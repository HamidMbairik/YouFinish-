const MEME_EVENTS = [
  "meme_youfinish",
  "meme_drunk",
  "meme_tweaking",
  "meme_notthatguy",
  "meme_pressf",
  "meme_skillissue",
  "meme_getrekt",
  "meme_shaking",
  "meme_thisisfine",
  "meme_average",
  "meme_touchgrass",
  "meme_doinggreat",
  "meme_ratio",
  "meme_mainchar",
  "meme_cooked",
  "meme_gg",
];

const CHAOS_EVENTS = [
  "popup_system_thinking",
  "popup_still_there",
  "popup_reality_failed",
  "blur_ui",
  "swap_buttons",
  "invert_colors",
  "fake_lag",
  "spawn_glitch",
  ...MEME_EVENTS,
];

export function getRandomEvent() {
  return CHAOS_EVENTS[Math.floor(Math.random() * CHAOS_EVENTS.length)];
}

export function getNextChaosLevel(current, questionsAnswered) {
  if (current >= 7) return 7;
  if (questionsAnswered > 0 && questionsAnswered % 2 === 0) {
    const jump = 1 + Math.floor(questionsAnswered / 6);
    return Math.min(current + jump, 7);
  }
  return current;
}

export function getResultTitle(chaosLevel) {
  if (chaosLevel <= 0) return "Stable Mind (unlikely)";
  if (chaosLevel <= 1) return "Barely Holding Reality Together";
  if (chaosLevel <= 2) return "Certified Glitch Human";
  if (chaosLevel <= 3) return "System Overheated";
  if (chaosLevel <= 4) return "Reality.exe has stopped working";
  if (chaosLevel <= 5) return "Dimensional Drift Detected";
  if (chaosLevel <= 6) return "Your Brain is Now a UI Element";
  return "Total Dimensional Collapse";
}

export function calculateSurvivalScore(chaosLevel, questionsCompleted) {
  const survival = Math.max(10, 100 - chaosLevel * 13);
  const perseverance = questionsCompleted * 4;
  return Math.min(100, survival + perseverance);
}
