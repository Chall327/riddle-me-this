import React, { useState, useEffect } from "react";
import {useAuthentication} from "../authService";
import Header from "./Header.jsx";
import './App.css';
import { getScore, saveScore } from "../scoreService.js";

function RiddleApp() {
  const [riddleAnswer, setRiddleAnswer] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setscore] = useState(0)
  const user = useAuthentication();

  const fetchRiddle = async () => {
    setShowAnswer(false);
    try {
      const response = await fetch("https://riddles-api.vercel.app/random");
      const data = await response.json();
      setRiddleAnswer(data);
    } catch (error) {
      console.error("Error fetching riddle:", error);
    }
  };

  function startOver() {

  }

  async function incrementScore() {
    const currentScore = await getScore(user.uid)
    const newScore = currentScore + 1
    setscore(newScore)
    await saveScore(newScore, user.uid)
  }

  useEffect(() => {
    fetchRiddle();
    if (user) {
      getScore(user.uid).then(setscore)
    }
  }, [user]);

  if (!riddleAnswer) {
    return <p>Loading...</p>;
  }

  return (
    <>
    <Header action={startOver} user={user} score={score} />      
      <main>
        <p><strong>Riddle:</strong> {riddleAnswer.riddle}</p>
        {showAnswer ? (
          <>
            <p><strong>Answer:</strong> {riddleAnswer.answer}</p>
            <button onClick={() => {
              fetchRiddle()
              incrementScore()
              }} style={{ margin: "10px" }}>
              Right
            </button>
            <button onClick={() => fetchRiddle()} style={{ margin: "10px" }}>
              Wrong
            </button>
          </>
        ) : (
          <button onClick={() => setShowAnswer(true)}>Reveal Answer</button>
        )}
      </main>
      <footer>
        <a href="https://riddles-api.vercel.app/random/">Riddle API</a>
      </footer>
    </>
  );
}
 
export default RiddleApp;
