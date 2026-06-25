import { useState } from "react";
import Quiz from "./components/Quiz";
import ResultScreen from "./components/ResultScreen";
import Landing from "./pages/Landing";

export default function App() {
  const [phase, setPhase] = useState("start");
  const [chaosLevel, setChaosLevel] = useState(0);
  const [questionsCompleted, setQuestionsCompleted] = useState(0);

  function handleStart() {
    setPhase("quiz");
  }

  function handleQuizFinish(finalChaos, completed) {
    setChaosLevel(finalChaos);
    setQuestionsCompleted(completed);
    setPhase("result");
  }

  function handleRestart() {
    setChaosLevel(0);
    setQuestionsCompleted(0);
    setPhase("start");
  }

  if (phase === "quiz") {
    return <Quiz onFinish={handleQuizFinish} />;
  }

  if (phase === "result") {
    return (
      <ResultScreen
        chaosLevel={chaosLevel}
        questionsCompleted={questionsCompleted}
        onRestart={handleRestart}
      />
    );
  }

  return <Landing onStart={handleStart} />;
}
