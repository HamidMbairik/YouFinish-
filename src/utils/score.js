import { calculateSurvivalScore, getResultTitle } from "./chaosLogic";

export function calculateScore(results, chaosLevel) {
  const total = results.length;
  const maxChaos = chaosLevel;
  const survival = calculateSurvivalScore(maxChaos, total);
  return { total, maxChaos, survival };
}

export { getResultTitle };
